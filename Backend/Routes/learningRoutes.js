const express = require("express");
const router = express.Router();

const authMiddleware = require("../MiddleWares/authMiddleware");
const { requireRole } = require("../MiddleWares/roleMiddleware");
const { upsertLearningTrack, getAllLearningTracks } = require("../controller/learningController");

router.post("/upsert", authMiddleware, requireRole("alumni"), upsertLearningTrack);
router.get("/gettracks", getAllLearningTracks);

module.exports = router;
