const dns = require('dns');
const mongoose = require('mongoose');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const uri = "mongodb+srv://flamedb:flamedb@cluster0.pd1tf83.mongodb.net/flames";

async function test() {
    console.log("Testing connection with custom DNS (8.8.8.8)...");
    try {
        await mongoose.connect(uri);
        console.log("✅ Custom DNS worked! Successfully connected to MongoDB Atlas!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Connection still failed even with custom DNS:");
        console.error(err);
        process.exit(1);
    }
}

test();
