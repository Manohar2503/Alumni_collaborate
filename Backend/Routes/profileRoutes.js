const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../MiddleWares/authMiddleware");
const {
  getMyProfile,
  upsertProfile,
  getUserProfile,
} = require("../controller/profileController");

// 🔥 Multer memory storage
const upload = multer({ storage: multer.memoryStorage() });

// ✅ GET logged-in user's profile
router.get("/me", authMiddleware, getMyProfile);

// ✅ CREATE / UPDATE profile (TEXT + IMAGES)
router.put(
  "/",
  authMiddleware,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  upsertProfile
);

// ✅ GET other user's profile
router.get("/:userId", getUserProfile);

module.exports = router;
