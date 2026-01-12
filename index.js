const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { nanoid } = require("nanoid");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data (easy). Later you can move to a JSON file/DB.
let items = [
    {
        id: "p1",
        name: "Smart WiFi Bulb",
        description: "16M colors, app control, schedules.",
        price: 799,
        image: "https://i.ibb.co/placeholder/bulb.jpg",
        category: "Lighting",
        brand: "HomeLite",
        vendorName: "BrightHome Vendor",
        features: ["Voice control", "Energy saving"],
    },
    {
        id: "p2",
        name: "Smart Door Lock",
        description: "Fingerprint + PIN + mobile unlock.",
        price: 8990,
        image: "https://i.ibb.co/placeholder/lock.jpg",
        category: "Security",
        brand: "SecureX",
        vendorName: "SecureNest Vendor",
        features: ["Fingerprint", "Auto-lock"],
    },
];

app.get("/items", (req, res) => {
    res.json(items);
});

app.get("/items/:id", (req, res) => {
    const item = items.find((i) => i.id === req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
});

app.post("/items", (req, res) => {
    // (We’ll protect this from Next proxy side)
    const payload = req.body;

    if (!payload?.name || !payload?.price || !payload?.vendorName) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const newItem = {
        id: nanoid(10),
        name: payload.name,
        description: payload.description || "",
        price: Number(payload.price),
        image: payload.image || "",
        category: payload.category || "Others",
        brand: payload.brand || "Unknown",
        vendorName: payload.vendorName,
        features: payload.features || [],
    };

    items.unshift(newItem);
    res.status(201).json(newItem);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Express API running on port", port));