const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    name: String,
    headline: String,
    about: String,
    location: String,
    phone: String,
    email: String,
    college: String,
    branch: String,
    batch: String,
    profileImage: String,
    coverImage: String,

    skills: {
      technical: [String],
      soft: [String],
    },

    experience: [
      {
        jobTitle: String,
        company: String,
        startDate: String,
        endDate: String,
        description: String,
        current: Boolean,
      },
    ],

    achievements: [
      {
        text: String,
        media: [
          {
            // 👇 THIS IS THE CRITICAL FIX
            type: {
              type: String,
              enum: ["image", "video"],
            },
            url: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
