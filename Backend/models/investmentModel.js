const mongoose = require("mongoose");

const specificationSchema = new mongoose.Schema({
  name: String,
  value: String
});

const documentSchema = new mongoose.Schema({
  name: String,
  url: String
});

const investmentSchema = mongoose.Schema({
  // Basic Information
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ["luxury-cars", "yachts", "medical-equipment"],
    default: "luxury-cars"
  },
  type: { type: String, required: true },
  shortDescription: { type: String },
  fullDescription: { type: String },
  price: { type: Number, required: true },
  discountPrice: { type: Number },

  // Car Specific Fields
  make: { type: String },
  model: { type: String },
  year: { type: Number },
  mileage: { type: Number },
  color: { type: String },
  engine: { type: String },
  horsepower: { type: Number },
  topSpeed: { type: Number },
  fuelType: { type: String },
  transmission: { type: String },
  drivetrain: { type: String },
  seating: { type: Number },

  // Yacht Specific Fields
  length: { type: Number },
  beam: { type: Number },
  draft: { type: Number },
  cabins: { type: Number },
  guests: { type: Number },
  crew: { type: Number },

  // Medical Equipment Specific Fields
  equipmentType: { type: String },
  manufacturer: { type: String },
  modelNumber: { type: String },
  condition: { type: String },
  serviceHistory: { type: String },

  // Investment Details
  investmentType: { 
    type: String, 
    enum: ["fractional", "full"], 
    default: "fractional" 
  },
  sharesAvailable: { type: Number },
  sharePrice: { type: Number },
  roi: { type: Number },
  minSharesRequired: { type: Number, default: 1 },

  // Operational Details
  annualOperationCost: { type: Number },
  maintenanceCost: { type: Number },
  insuranceCost: { type: Number },
  storageCost: { type: Number },
  kmUsagePerYear: { type: Number },
  location: { type: String },

  // Media
  images: [String], // Array of image URLs
  videos: [String], // Array of video URLs
  documents: [documentSchema], // Array of documents with name and URL

  // Features & Specifications
  features: [String], // Array of features
  specifications: [specificationSchema], // Array of key specifications
  fullSpecifications: [specificationSchema], // Detailed specifications

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

}, { timestamps: true });

const Investment = mongoose.model("Investment", investmentSchema);

module.exports = Investment;