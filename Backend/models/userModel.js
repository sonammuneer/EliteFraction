const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please Enter Your First Name"],
    maxLength: [30, "First Name cannot exceed 30 characters"],
    minLength: [2, "First Name should have more than 2 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please Enter Your Last Name"],
    maxLength: [30, "Last Name cannot exceed 30 characters"],
    minLength: [2, "Last Name should have more than 2 characters"],
  },
  position: {
    type: String,
    required: [true, "Please Enter Your Position"],
  },
  country: {
    type: String,
    required: [true, "Please Enter Your Country/City"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  phone: {
    type: String,
    required: [true, "Please Enter Your Phone Number"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should have at least 8 characters"],
    select: false,
  },
  invitationCode: {
    type: String,
  },
  avatar: {
    public_id: { type: String, required: false },
    url: { type: String, required: false },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Hash password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Generate JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password for login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate Reset Password Token
userSchema.methods.getResetPasswordToken = function () {
  const resetPassToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetPassToken)
    .toString("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetPassToken;
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
