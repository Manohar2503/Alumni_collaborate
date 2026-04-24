const express = require("express");
const router = express.Router();

const authMiddleware = require("../MiddleWares/authMiddleware");
const { requireRole } = require("../MiddleWares/roleMiddleware");
const {
  mentorApplication,
  acceptMentorApplication,
  postUpcomingSession,
  getMentors,
  getUpcomingSessions,
  getPreviousSessions,
} = require("../controller/mentorController");

router.post("/mentor-applications", authMiddleware, requireRole("alumni"), mentorApplication);
router.post("/mentor-applications/:id/accept", authMiddleware, acceptMentorApplication);
router.get("/sessions/upcoming", getUpcomingSessions);
router.get("/sessions/previous", getPreviousSessions);
router.post("/sessions/upcoming/:id", authMiddleware, requireRole("alumni"), postUpcomingSession);
router.get("/allmentors", getMentors);

module.exports = router;
