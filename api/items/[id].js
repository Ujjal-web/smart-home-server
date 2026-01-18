const { connectMongo, serializeItem, ObjectId } = require('../_lib/mongo');

module.exports = async (req, res) => {
    try {
        const db = await connectMongo();
        const collection = db.collection('items');
        const { id } = req.query;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid item id' });
        }

        if (req.method === 'GET') {
            const item = await collection.findOne({ _id: new ObjectId(id) });
            if (!item) return res.status(404).json({ message: 'Item not found' });
            return res.status(200).json(serializeItem(item));
        }

        res.setHeader('Allow', 'GET');
        res.status(405).end('Method Not Allowed');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
