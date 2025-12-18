const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");


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



const generateToken =(id) => {
    
   return jwt.sign({_id:id}, process.env.JWT_SECRET, {
        expiresIn: '1d', 
    });
    
};


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    // getProfileInfo,
    // updateProfile
};
