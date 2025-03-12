const express = require("express");
const app = express();
const errorMiddleware = require("./middleWare/error");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload"); // used for image and other files
const path = require("path");
const cors = require("cors");
require("dotenv").config({ path: "./config/config.env" });

// Importing Testimonial Routes
const testimonial = require("./route/testimonialRoute");

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());
app.use(cors());
app.use(errorMiddleware);

// Route for Testimonials
app.use("/api/v1", testimonial);

// Serving static files (Frontend)
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "/Frontend/build")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname1, "Frontend", "build", "index.html"))
);

module.exports = app;
