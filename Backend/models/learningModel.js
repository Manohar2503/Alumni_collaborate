const mongoose = require("mongoose");

const linksSchema = new mongoose.Schema(
  {
    paid: {
      type: [String],
      default: [],
    },
    unpaid: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const categorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    links: {
      type: linksSchema,
      required: true,
    },
  },
  { _id: false }
);

const learningSchema = new mongoose.Schema(
  {
    trackId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    categories: {
      type: [categorySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LearningTrack", learningSchema);
