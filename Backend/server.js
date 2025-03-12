const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parses JSON requests
app.use(cors()); // Allows frontend to communicate with backend

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/testimonialsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define Testimonial Schema
const testimonialSchema = new mongoose.Schema({
  name: String,
  message: String,
  rating: Number, // Optional
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

// Routes

// 1. Get all testimonials
app.get("/api/testimonials", async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Error fetching testimonials" });
  }
});

// 2. Add a new testimonial
app.post("/api/testimonials", async (req, res) => {
  try {
    const { name, message, rating } = req.body;
    const newTestimonial = new Testimonial({ name, message, rating });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(500).json({ message: "Error saving testimonial" });
  }
});

// 3. Delete a testimonial
app.delete("/api/testimonials/:id", async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Testimonial deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting testimonial" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
