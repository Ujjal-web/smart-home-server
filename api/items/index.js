const { connectMongo, serializeItem } = require('../_lib/mongo');

module.exports = async (req, res) => {
    try {
        const db = await connectMongo();
        const collection = db.collection('items');

        if (req.method === 'GET') {
            const filter = {};
            if (req.query.category) filter.category = req.query.category;
            if (req.query.vendorName) filter.vendorName = req.query.vendorName;

            const items = await collection.find(filter).sort({ createdAt: -1 }).toArray();
            return res.status(200).json(items.map(serializeItem));
        }

        if (req.method === 'POST') {
            const payload = req.body;

            if (!payload?.name || !payload?.price || !payload?.vendorName) {
                return res.status(400).json({ message: 'name, price, vendorName are required' });
            }

            const doc = {
                name: String(payload.name),
                description: String(payload.description || ''),
                price: Number(payload.price),
                oldPrice: payload.oldPrice ? Number(payload.oldPrice) : null,
                image: String(payload.image || ''),
                category: String(payload.category || 'Others'),
                brand: String(payload.brand || 'Unknown'),
                vendorName: String(payload.vendorName),
                features: Array.isArray(payload.features) ? payload.features : [],
                compatibility: Array.isArray(payload.compatibility) ? payload.compatibility : [],
                stock: payload.stock === undefined ? 0 : Number(payload.stock),
                createdAt: new Date()
            };

            const result = await collection.insertOne(doc);
            const created = await collection.findOne({ _id: result.insertedId });

            return res.status(201).json(serializeItem(created));
        }

        res.setHeader('Allow', 'GET,POST');
        res.status(405).end('Method Not Allowed');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
