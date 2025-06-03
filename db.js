// db.js
const mongoose = require("mongoose");

let isConnected = false;

module.exports = async function connectDB(uri) {
  if (isConnected) return;

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Stop the server if connection fails
  }
};
