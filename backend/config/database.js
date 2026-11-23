const mongoose = require("mongoose");

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.warn("⚠️ MONGO_URI is not set. Starting server without MongoDB connection.");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.warn("⚠️ MongoDB Connection Failed. Server will continue without MongoDB.");
        console.error(error.message);
    }
};

module.exports = connectDB;