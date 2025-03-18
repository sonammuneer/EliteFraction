const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const router = express.Router();

/**
 * ✅ User Registration Route (Without bcrypt)
 */
router.post("/signup", async (req, res) => {
  try {
    console.log("➡️ Signup route hit");

    const { firstName, lastName, position, country, email, phone, password, invitationCode } = req.body;

    console.log("➡️ Received Data:", req.body);

    // ✅ Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log("⚠️ User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    // ❌ No hashing, store password as plain text (⚠️ Not Secure)
    const plainTextPassword = password;

    // ✅ Create a new user
    user = new User({
      firstName,
      lastName,
      position,
      country,
      email,
      phone,
      password: plainTextPassword, // Store plain text password
      invitationCode,
      avatar: { public_id: "", url: "" },
    });

    console.log("📝 Saving user:", user);
    await user.save();
    console.log("✅ User saved successfully");

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "1h",
    });

    console.log("✅ JWT token generated:", token);
    res.status(201).json({ token, userId: user._id, user });
  } catch (error) {
    console.error("❌ Signup Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/**
 * ✅ User Login Route (Without bcrypt)
 */
router.post("/login", async (req, res) => {
  try {
    console.log("➡️ Login route hit");

    const { email, password } = req.body;
    console.log("➡️ Received Data:", req.body);

    // ✅ Check if user exists
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ❌ No bcrypt, directly compare passwords (⚠️ NOT SECURE)
    if (password !== user.password) {
      console.log("❌ Incorrect password for:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "1h",
    });

    console.log("✅ Login successful for:", email);
    res.status(200).json({ token, userId: user._id, user });
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/**
 * ✅ Protected Route - Requires Login
 */
router.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Profile Fetch Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
