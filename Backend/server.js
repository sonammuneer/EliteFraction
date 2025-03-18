require("dotenv").config({ path: "backend/config/config.env" }); // ✅ Load the correct env file

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Import database connection
const authRoutes = require("./routes/auth"); // Import authentication routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parses JSON requests

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000", // Allow frontend to communicate with backend
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes); // Include authentication routes

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
