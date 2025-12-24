const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const nodemailer = require("nodemailer");


// controller/userController.js
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, collegeMail, password, role } = req.body;

  if (!name || !email || !collegeMail || !password || !role) {
    res.status(400);
    throw new Error("All fields are required");
  }

  if (!["student", "alumni"].includes(role)) {
    res.status(400);
    throw new Error("Invalid role");
  }

  const exists = await User.findOne({
    $or: [{ email }, { collegeMail }]
  });

  if (exists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    collegeMail,
    password: hashedPassword,
    role,
  });

  res.status(201).json({
    message: "Registered successfully",
  });
});




const loginUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    res.status(400);
    throw new Error("All fields required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (user.role !== role) {
    res.status(403);
    throw new Error(`You are not registered as ${role}`);
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.json({
    message: "Login successful",
    role: user.role,
    isProfileCompleted: user.isProfileCompleted,
  });
});



const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.json({ message: 'User logged out' });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  // 🔥 FIX: Check BOTH email and collegeMail
  const user = await User.findOne({
    $or: [
      { email: email },
      { collegeMail: email }
    ]
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Generate token
  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
  await user.save();

  const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 🔥 Send mail to the SAME email user entered
  await transporter.sendMail({
    to: email, // important
    subject: "Password Reset Request",
    html: `
      <p>You requested to reset your password.</p>
      <p>Click the link below (valid for 15 minutes):</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  });

  res.json({ message: "Password reset link sent to email" });
});


const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    res.status(400);
    throw new Error("Password is required");
  }

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired token");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.json({ message: "Password reset successful" });
});


const generateToken =(id) => {
    
   return jwt.sign({_id:id}, process.env.JWT_SECRET, {
        expiresIn: '1d', 
    });
    
};


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword
    // getProfileInfo,
    // updateProfile
};
