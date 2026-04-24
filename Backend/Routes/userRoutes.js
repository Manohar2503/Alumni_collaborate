const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getReviews,
  postReview,
  getCurrentUser,
} = require("../controller/userController");
const authMiddleware = require("../MiddleWares/authMiddleware");
const { authLimiter, forgotPasswordLimiter } = require("../MiddleWares/rateLimiters");

router.post("/", registerUser);
router.post("/login", authLimiter, loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/getReviews", getReviews);
router.post("/postReview", authMiddleware, postReview);
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;
