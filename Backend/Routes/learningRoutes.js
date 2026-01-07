const express = require("express");
const router = express.Router();

const {
  upsertLearningTrack,
  getAllLearningTracks,
  
} = require("../controller/learningController");

// CREATE TRACK
router.post("/upsert", upsertLearningTrack);

// GET ALL TRACKS
router.get("/gettracks", getAllLearningTracks);


module.exports = router;
