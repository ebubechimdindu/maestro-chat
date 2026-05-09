import mongoose from 'mongoose';

const URL = process.env.MONGODB_URI

export const ConnectDB = async () => {
    try {
        if (!URL) {
            throw new Error("MONGODB_URI environment variable is not defined");
        }
        await mongoose.connect(URL);
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1)
    }
}