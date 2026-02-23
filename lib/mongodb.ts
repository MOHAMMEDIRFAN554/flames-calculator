import mongoose from "mongoose";
import dns from "dns";

// Set custom DNS to resolve SRV records properly in some environments
if (typeof window === "undefined") {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
}


const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        console.log("DB: Using cached connection");
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            family: 4,
        };

        console.log("DB: Initiating new connection to", MONGODB_URI.split("@")[1]); // Log host only for safety
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log("DB: Connection established successfully");
            return mongoose;
        }).catch(err => {
            console.error("DB: Connection error:", err);
            cached.promise = null; // Reset promise on error to allow retry
            throw err;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null; // Ensure retry on next call
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
