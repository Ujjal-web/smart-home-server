const { MongoClient } = require("mongodb");
require("dotenv").config();
const { featuredProducts } = require("./mockData");

async function seedDatabase() {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.DB_NAME;

    if (!uri) {
        console.error("❌ MONGODB_URI missing in .env file");
        process.exit(1);
    }

    if (!dbName) {
        console.error("❌ DB_NAME missing in .env file");
        process.exit(1);
    }

    const client = new MongoClient(uri);

    try {
        console.log("🔌 Connecting to MongoDB...");
        await client.connect();
        console.log("✅ Connected to MongoDB");

        const db = client.db(dbName);
        const itemsCollection = db.collection("items");

        // Check if collection already has data
        const existingCount = await itemsCollection.countDocuments();

        if (existingCount > 0) {
            console.log(`⚠️  Database already contains ${existingCount} items`);
            const readline = require("readline").createInterface({
                input: process.stdin,
                output: process.stdout
            });

            const answer = await new Promise((resolve) => {
                readline.question("Do you want to clear existing data and reseed? (yes/no): ", resolve);
            });
            readline.close();

            if (answer.toLowerCase() !== "yes") {
                console.log("❌ Seeding cancelled");
                process.exit(0);
            }

            console.log("🗑️  Clearing existing data...");
            await itemsCollection.deleteMany({});
            console.log("✅ Existing data cleared");
        }

        // Add createdAt timestamp to all products
        const productsWithTimestamp = featuredProducts.map(product => ({
            ...product,
            createdAt: new Date()
        }));

        console.log(`📦 Inserting ${productsWithTimestamp.length} products...`);
        const result = await itemsCollection.insertMany(productsWithTimestamp);

        console.log(`✅ Successfully inserted ${result.insertedCount} products`);
        console.log("\n📊 Database seeded with the following products:");

        productsWithTimestamp.forEach((product, index) => {
            console.log(`   ${index + 1}. ${product.name} - $${product.price} (${product.vendorName})`);
        });

        console.log("\n🎉 Database seeding completed successfully!");

    } catch (error) {
        console.error("❌ Error seeding database:", error.message);
        process.exit(1);
    } finally {
        await client.close();
        console.log("🔌 MongoDB connection closed");
    }
}

// Run the seed function
seedDatabase();
