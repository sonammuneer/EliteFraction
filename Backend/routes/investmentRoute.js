const express = require("express");
const router = express.Router();
const multer = require("multer");
const Investment = require("../models/investmentModel");
const path = require("path");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for allowed types
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx|mp4|mov/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only images, documents, and videos are allowed!'));
  }
};

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter
});

// Create new investment with comprehensive file handling
router.post("/", upload.fields([
  { name: "images", maxCount: 10 },
  { name: "documents", maxCount: 5 },
  { name: "videos", maxCount: 3 }
]), async (req, res) => {
  try {
    // Process uploaded files
    const files = req.files || {};
    const images = files['images'] ? files['images'].map(f => f.path) : [];
    const videos = files['videos'] ? files['videos'].map(f => f.path) : [];
    const documents = files['documents'] ? files['documents'].map(f => ({
      name: f.originalname,
      url: f.path
    })) : [];

    // Parse specifications if provided
    let specifications = [];
    try {
      if (req.body.specifications) {
        specifications = JSON.parse(req.body.specifications);
      }
    } catch (e) {
      console.warn('Error parsing specifications:', e);
    }

    // Create investment object
    const investmentData = {
      ...req.body,
      images,
      videos,
      documents,
      specifications,
      // Convert string numbers to proper numbers
      price: parseFloat(req.body.price),
      discountPrice: req.body.discountPrice ? parseFloat(req.body.discountPrice) : undefined,
      sharesAvailable: req.body.sharesAvailable ? parseInt(req.body.sharesAvailable) : undefined,
      sharePrice: req.body.sharePrice ? parseFloat(req.body.sharePrice) : undefined,
      roi: req.body.roi ? parseFloat(req.body.roi) : undefined,
      minSharesRequired: req.body.minSharesRequired ? parseInt(req.body.minSharesRequired) : 1,
      // Convert features string to array
      features: req.body.features ? req.body.features.split(',').map(f => f.trim()) : []
    };

    // Handle category-specific fields
    switch (req.body.category) {
      case 'luxury-cars':
        investmentData.horsepower = req.body.horsepower ? parseInt(req.body.horsepower) : undefined;
        investmentData.topSpeed = req.body.topSpeed ? parseInt(req.body.topSpeed) : undefined;
        investmentData.year = req.body.year ? parseInt(req.body.year) : undefined;
        investmentData.mileage = req.body.mileage ? parseInt(req.body.mileage) : undefined;
        investmentData.seating = req.body.seating ? parseInt(req.body.seating) : undefined;
        break;
      
      case 'yachts':
        investmentData.length = req.body.length ? parseFloat(req.body.length) : undefined;
        investmentData.beam = req.body.beam ? parseFloat(req.body.beam) : undefined;
        investmentData.draft = req.body.draft ? parseFloat(req.body.draft) : undefined;
        investmentData.cabins = req.body.cabins ? parseInt(req.body.cabins) : undefined;
        investmentData.guests = req.body.guests ? parseInt(req.body.guests) : undefined;
        investmentData.crew = req.body.crew ? parseInt(req.body.crew) : undefined;
        break;
      
      case 'medical-equipment':
        // No special number conversions needed for medical equipment
        break;
    }

    const investment = new Investment(investmentData);
    await investment.save();

    res.status(201).json({ 
      success: true, 
      data: investment,
      message: 'Investment created successfully' 
    });

  } catch (error) {
    console.error('Error creating investment:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message || 'Failed to create investment',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get all investments
router.get("/", async (req, res) => {
  try {
    const investments = await Investment.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      count: investments.length,
      data: investments 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch investments' 
    });
  }
});

// Get single investment by ID
router.get("/:id", async (req, res) => {
  try {
    const investment = await Investment.findById(req.params.id);
    if (!investment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Investment not found' 
      });
    }
    res.status(200).json({ 
      success: true, 
      data: investment 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch investment' 
    });
  }
});

module.exports = router;