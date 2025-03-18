const express = require("express");
const app = express();
const errorMiddleware = require("./middleWare/error");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
require("dotenv").config({ path: "./config/config.env" });

// Importing Routes
const testimonial = require("./route/testimonialRoute");
const investment = require("./route/investmentRoute"); // ✅ Added investment routes

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());
app.use(cors());
app.use(errorMiddleware);

// Mount Routes
app.use("/api/v1", testimonial);
app.use("/api/v1", investment); // ✅ Mount investment API

// Serving static frontend files
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "/Frontend/build")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname1, "Frontend", "build", "index.html"))
);

module.exports = app;
