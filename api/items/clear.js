const { connectMongo } = require('../_lib/mongo');

module.exports = async (req, res) => {
    if (req.method !== 'DELETE') {
        res.setHeader('Allow', 'DELETE');
        return res.status(405).end('Method Not Allowed');
    }

    try {
        const db = await connectMongo();
        const result = await db.collection('items').deleteMany({});

        res.status(200).json({
            message: `Cleared ${result.deletedCount} items from database`,
            deletedCount: result.deletedCount
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
