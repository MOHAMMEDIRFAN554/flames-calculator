const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://flamedb:flamedb@cluster0.pd1tf83.mongodb.net/flames";

async function run() {
    const client = new MongoClient(uri);
    try {
        console.log("Attempting to connect with MongoClient...");
        await client.connect();
        console.log("✅ MongoClient Connected successfully");
        await client.db("flames").command({ ping: 1 });
        console.log("✅ Pinged database successfully");
    } catch (err) {
        console.error("❌ MongoClient connection failed:");
        console.error(err);
    } finally {
        await client.close();
    }
}

run();
