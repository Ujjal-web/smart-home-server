const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { MongoClient, ObjectId } = require("mongodb");
const { featuredProducts } = require("./mockData");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// ---------- Mongo setup (native driver) ----------
let client;
let db;

function serializeItem(doc) {
    if (!doc) return doc;
    return { ...doc, _id: doc._id.toString() };
}

async function connectMongo() {
    if (db) return db;

    const uri = process.env.MONGODB_URI;
    const dbName = process.env.DB_NAME;

    if (!uri) throw new Error("MONGODB_URI missing in server/.env");
    if (!dbName) throw new Error("DB_NAME missing in server/.env");

    client = new MongoClient(uri);
    await client.connect();

    db = client.db(dbName);
    console.log("MongoDB connected to DB:", dbName);

    // Optional indexes (safe to run)
    await db.collection("items").createIndex({ createdAt: -1 });
    await db.collection("items").createIndex({ category: 1 });
    await db.collection("items").createIndex({ vendorName: 1 });

    return db;
}

function itemsCollection() {
    if (!db) throw new Error("MongoDB not connected yet.");
    return db.collection("items");
}

// ---------- Routes ----------

// GET all items
app.get("/api/items", async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) filter.category = req.query.category;
        if (req.query.vendorName) filter.vendorName = req.query.vendorName;

        const items = await itemsCollection()
            .find(filter)
            .sort({ createdAt: -1 })
            .toArray();

        res.json(items.map(serializeItem));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single item by id
app.get("/api/items/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid item id" });
        }

        const item = await itemsCollection().findOne({ _id: new ObjectId(id) });
        if (!item) return res.status(404).json({ message: "Item not found" });

        res.json(serializeItem(item));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create item
app.post("/api/items", async (req, res) => {
    try {
        const payload = req.body;

        // required fields
        if (!payload?.name || !payload?.price || !payload?.vendorName) {
            return res
                .status(400)
                .json({ message: "name, price, vendorName are required" });
        }

        const doc = {
            name: String(payload.name),
            description: String(payload.description || ""),
            price: Number(payload.price),
            oldPrice: payload.oldPrice ? Number(payload.oldPrice) : null,

            image: String(payload.image || ""),
            category: String(payload.category || "Others"),
            brand: String(payload.brand || "Unknown"),

            // Multi-vendor
            vendorName: String(payload.vendorName),

            // optional extras
            features: Array.isArray(payload.features) ? payload.features : [],
            compatibility: Array.isArray(payload.compatibility)
                ? payload.compatibility
                : [],
            stock: payload.stock === undefined ? 0 : Number(payload.stock),

            createdAt: new Date(),
        };

        const result = await itemsCollection().insertOne(doc);
        const created = await itemsCollection().findOne({ _id: result.insertedId });

        res.status(201).json(serializeItem(created));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST seed database with mock data
app.post("/api/seed", async (req, res) => {
    try {
        const existingCount = await itemsCollection().countDocuments();

        if (existingCount > 0) {
            return res.status(400).json({
                message: `Database already contains ${existingCount} items. Clear the database first or use force=true query parameter.`,
                existingCount
            });
        }

        // Add createdAt timestamp to all products
        const productsWithTimestamp = featuredProducts.map(product => ({
            ...product,
            createdAt: new Date()
        }));

        const result = await itemsCollection().insertMany(productsWithTimestamp);

        res.status(201).json({
            message: `Successfully seeded database with ${result.insertedCount} products`,
            insertedCount: result.insertedCount,
            products: productsWithTimestamp.map(p => ({ name: p.name, price: p.price, vendor: p.vendorName }))
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE clear all items (use with caution)
app.delete("/api/items/clear", async (req, res) => {
    try {
        const result = await itemsCollection().deleteMany({});
        res.json({
            message: `Cleared ${result.deletedCount} items from database`,
            deletedCount: result.deletedCount
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ---------- Start server after DB connect ----------
module.exports = async (req, res) => {
    await connectMongo();
    return app(req, res);
};

process.on("SIGINT", async () => {
    try {
        if (client) await client.close();
    } finally {
        process.exit(0);
    }
});