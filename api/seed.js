const { connectMongo } = require('./_lib/mongo');
const { featuredProducts } = require('../mockData');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    try {
        const db = await connectMongo();
        const collection = db.collection('items');

        const existingCount = await collection.countDocuments();
        if (existingCount > 0) {
            return res.status(400).json({
                message: `Database already contains ${existingCount} items. Clear the database first or use force.`,
                existingCount
            });
        }

        const productsWithTimestamp = featuredProducts.map(product => ({
            ...product,
            createdAt: new Date()
        }));

        const result = await collection.insertMany(productsWithTimestamp);

        res.status(201).json({
            message: `Successfully seeded database with ${result.insertedCount} products`,
            insertedCount: result.insertedCount
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
