const { MongoClient, ObjectId } = require('mongodb');

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

    if (!uri) throw new Error('MONGODB_URI missing in environment');
    if (!dbName) throw new Error('DB_NAME missing in environment');

    client = new MongoClient(uri);
    await client.connect();

    db = client.db(dbName);

    // Safe to ensure indexes on cold start
    try {
        await db.collection('items').createIndex({ createdAt: -1 });
        await db.collection('items').createIndex({ category: 1 });
        await db.collection('items').createIndex({ vendorName: 1 });
    } catch (err) {
        // non-fatal
        console.warn('Index creation warning:', err.message);
    }

    return db;
}

module.exports = { connectMongo, serializeItem, ObjectId };
