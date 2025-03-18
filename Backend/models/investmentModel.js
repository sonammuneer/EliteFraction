const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  manufacturer: { type: String },
  engine: { type: String },
  horsepower: { type: Number },
  topSpeed: { type: Number },
  fuelType: { type: String },
  transmission: { type: String },
  investmentType: { type: String, enum: ["fractional", "full"], required: true },
  sharesAvailable: { type: Number },
  roi: { type: String },
  features: { type: [String] },
  mainImage: { type: String },
  gallery: { type: [String] },
  videoUrl: { type: String },
  pdf: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Investment", investmentSchema);
