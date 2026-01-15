// models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,     // ✅ ADD THIS
      lowercase: true,
      trim: true,
    },

    collegeMail: {
      type: String,
      required: true,
      unique: true,
      index: true,     // ✅ ADD THIS
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,   // ✅ IMPORTANT (security + faster)
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
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

// ✅ Optional (recommended): force index creation
userSchema.index({ email: 1 });
userSchema.index({ collegeMail: 1 });

module.exports = mongoose.model("User", userSchema);
