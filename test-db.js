const mongoose = require('mongoose');

const uri = "mongodb+srv://flamedb:flamedb@cluster0.pd1tf83.mongodb.net/";

async function test() {
    console.log("Testing connection with exact user URI...");
    try {
        await mongoose.connect(uri);
        console.log("✅ Successfully connected to MongoDB Atlas!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Connection failed:");
        console.error(err);
        process.exit(1);
    }
}

test();
