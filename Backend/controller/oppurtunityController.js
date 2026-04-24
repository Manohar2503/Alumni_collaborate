const Oppurtunity = require("../models/OppurtunityModel");
const { getCache, setCache, deleteByPattern } = require("../services/cacheService");
const { getPagination } = require("../utils/pagination");

const getJobs = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const cacheKey = `jobs:list:${page}:${limit}`;
    const cached = await getCache(cacheKey);

    if (cached) {
      return res.status(200).json(cached);
    }

    const jobs = await Oppurtunity.find({ type: "job" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const payload = { page, limit, data: jobs };
    await setCache(cacheKey, payload, 300);
    res.status(200).json(payload);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInternships = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const cacheKey = `internships:list:${page}:${limit}`;
    const cached = await getCache(cacheKey);

    if (cached) {
      return res.status(200).json(cached);
    }

    const internships = await Oppurtunity.find({ type: "internship" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const payload = { page, limit, data: internships };
    await setCache(cacheKey, payload, 300);
    res.status(200).json(payload);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postOppurtunity = async (req, res) => {
  try {
    const { company, role, link, type } = req.body;

    if (!company || !role || !link || !type) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const oppurtunity = new Oppurtunity({ company, role, link, type });
    const data = await oppurtunity.save();
    await deleteByPattern("jobs:list:*");
    await deleteByPattern("internships:list:*");

    res.status(201).json({
      message: "Oppurtunity created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating Oppurtunity",
      error: error.message,
    });
  }
};

module.exports = {
  getJobs,
  getInternships,
  postOppurtunity,
};
