const mongoose = require("mongoose");
require("dotenv").config({ path: "backend/config/config.env" }); // ✅ Load the correct env file

const connectDB = async () => {
  try {
    console.log(`🔍 Checking MONGO_URI: ${process.env.MONGO_URI}`); // ✅ Debug log

    if (!process.env.MONGO_URI) {
      throw new Error("❌ MONGO_URI not found in environment variables.");
    }

    mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
