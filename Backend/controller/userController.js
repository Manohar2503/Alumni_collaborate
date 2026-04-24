const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const Review = require("../models/ReviewsModel");
const emailQueue = require("../queues/emailQueue");
const { getCache, setCache, deleteCache } = require("../services/cacheService");

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
    $or: [{ email }, { collegeMail }],
  });

  if (exists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
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

  const user = await User.findOne({ email }).select("+password role isProfileCompleted");

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
    sameSite: "none",
    secure: true,
  });

  res.json({
    message: "Login successful",
    role: user.role,
    isProfileCompleted: user.isProfileCompleted,
  });
});

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.json({ message: "User logged out" });
});

const getReviews = asyncHandler(async (req, res) => {
  const cacheKey = "reviews:all";
  const cachedReviews = await getCache(cacheKey);

  if (cachedReviews) {
    return res.status(200).json({
      message: "Got all reviews successfully",
      data: cachedReviews,
      cached: true,
    });
  }

  const data = await Review.find().populate("user", "name profileImage").lean();

  await setCache(cacheKey, data, 300);

  res.status(200).json({
    message: "Got all reviews successfully",
    data,
  });
});

const postReview = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const profile = await Profile.findOne({ userId });

  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  const { review, stars } = req.body;

  const newReview = new Review({
    user: profile._id,
    review,
    stars,
  });

  await newReview.save();
  await deleteCache("reviews:all");

  res.status(201).json({
    message: "Successfully posted review",
    review: newReview,
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  const user = await User.findOne({
    $or: [{ email }, { collegeMail: email }],
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
  await user.save();

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  await emailQueue.add(
    "forgot-password",
    {
      email,
      resetLink,
    },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
      removeOnComplete: 50,
      removeOnFail: 50,
    }
  );

  res.json({ message: "Password reset link queued for delivery" });
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
    resetPasswordExpires: { $gt: Date.now() },
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

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  getReviews,
  postReview,
};
