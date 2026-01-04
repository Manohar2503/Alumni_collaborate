const Profile = require("../models/profileModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

/* 🔥 Cloudinary Upload Helper (same as posts) */
const uploadToCloudinary = (file, folder, resourceType = "image") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

/* ✅ GET MY PROFILE */
const getMyProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  console.log("Fetching profile for userId:", userId);

  let profile = await Profile.findOne({ userId });

  if (!profile) {
    profile = await Profile.create({ userId });
  }

  res.status(200).json(profile);
});

/* ✅ CREATE / UPDATE PROFILE */
const upsertProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  let profile = await Profile.findOne({ userId });
  if (!profile) profile = new Profile({ userId });

  /* TEXT DATA */
  const fields = [
    "name",
    "headline",
    "about",
    "location",
    "phone",
    "email",
    "college",
    "branch",
    "batch",
    "skills",
    "experience",
    "achievements",
  ];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      profile[field] = req.body[field];
    }
  });

  /* 🔥 PROFILE IMAGE */
  if (req.files?.profileImage) {
    const result = await uploadToCloudinary(
      req.files.profileImage[0],
      "alumni/profile",
      "image"
    );
    profile.profileImage = result.secure_url;
  }

  /* 🔥 COVER IMAGE */
  if (req.files?.coverImage) {
    const result = await uploadToCloudinary(
      req.files.coverImage[0],
      "alumni/cover",
      "image"
    );
    profile.coverImage = result.secure_url;
  }

  await profile.save();

  res.status(200).json({
    message: "Profile updated successfully",
    profile,
  });
});

/* ✅ GET OTHER USER PROFILE */
const getUserProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const profile = await Profile.findOne({ userId }).populate(
    "userId",
    "name email"
  );

  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  res.status(200).json(profile);
});

module.exports = {
  getMyProfile,
  upsertProfile,
  getUserProfile,
};
