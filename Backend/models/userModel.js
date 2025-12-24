// models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  collegeMail: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["student", "alumni"],
    required: true,
  },

  isProfileCompleted: {
    type: Boolean,
    default: false,
  },
   resetPasswordToken: String,
  resetPasswordExpires: Date

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
