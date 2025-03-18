const express = require("express");
const router = express.Router();
const Investment = require("./models/investmentModel");

// 🛒 Create an Investment
router.post("/investment/new", async (req, res) => {
  try {
    const newInvestment = new Investment(req.body);
    await newInvestment.save();
    res.status(201).json({ success: true, investment: newInvestment });
  } catch (error) {
    res.status(500).json({ error: "Error creating investment", message: error.message });
  }
});

// 📜 Get All Investments
router.get("/investments", async (req, res) => {
  try {
    const investments = await Investment.find();
    res.status(200).json({ success: true, investments });
  } catch (error) {
    res.status(500).json({ error: "Error fetching investments" });
  }
});

// 📦 Get Investment by ID
router.get("/investment/:id", async (req, res) => {
  try {
    const investment = await Investment.findById(req.params.id);
    if (!investment) return res.status(404).json({ error: "Investment not found" });

    res.status(200).json({ success: true, investment });
  } catch (error) {
    res.status(500).json({ error: "Error fetching investment" });
  }
});

// 🗑 Delete an Investment
router.delete("/investment/:id", async (req, res) => {
  try {
    await Investment.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Investment deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting investment" });
  }
});

// 🛠 Update an Investment
router.put("/investment/:id", async (req, res) => {
  try {
    const updatedInvestment = await Investment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, investment: updatedInvestment });
  } catch (error) {
    res.status(500).json({ error: "Error updating investment" });
  }
});

module.exports = router;
