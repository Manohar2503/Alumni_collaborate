const LearningTrack = require("../models/learningModel");
const { getCache, setCache, deleteByPattern } = require("../services/cacheService");
const { getPagination } = require("../utils/pagination");

const upsertLearningTrack = async (req, res) => {
  try {
    const {
      trackId,
      title,
      description,
      categoryId,
      categoryTitle,
      paidLinks = [],
      unpaidLinks = [],
    } = req.body;

    if (!trackId || !title || !categoryTitle) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (paidLinks.length === 0 && unpaidLinks.length === 0) {
      return res.status(400).json({ message: "At least one link required" });
    }

    let track = await LearningTrack.findOne({ trackId });

    if (!track) {
      track = new LearningTrack({
        trackId,
        title,
        description: description || "",
        categories: [],
      });
    }

    const finalCategoryId = categoryId || categoryTitle.toLowerCase().replace(/\s+/g, "-");

    const existingCategory = track.categories.find((c) => c.categoryId === finalCategoryId);

    if (existingCategory) {
      existingCategory.links.paid.push(...paidLinks);
      existingCategory.links.unpaid.push(...unpaidLinks);
    } else {
      track.categories.push({
        categoryId: finalCategoryId,
        title: categoryTitle,
        links: {
          paid: paidLinks,
          unpaid: unpaidLinks,
        },
      });
    }

    await track.save();
    await deleteByPattern("learningtracks:list:*");

    res.status(200).json({
      message: "Category updated successfully",
      data: track,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getAllLearningTracks = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const cacheKey = `learningtracks:list:${page}:${limit}`;
    const cached = await getCache(cacheKey);

    if (cached) {
      return res.status(200).json(cached);
    }

    const tracks = await LearningTrack.find()
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const payload = { page, limit, data: tracks };
    await setCache(cacheKey, payload, 300);

    res.status(200).json(payload);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  upsertLearningTrack,
  getAllLearningTracks,
};
