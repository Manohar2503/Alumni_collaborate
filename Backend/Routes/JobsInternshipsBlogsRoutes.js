const express = require("express");
const router = express.Router();

const authMiddleware = require("../MiddleWares/authMiddleware");
const { requireRole } = require("../MiddleWares/roleMiddleware");
const { getJobs, postOppurtunity, getInternships } = require("../controller/oppurtunityController");

router.get("/getJobs", getJobs);
router.post("/postOppurtunity", authMiddleware, requireRole("alumni"), postOppurtunity);
router.get("/getInternships", getInternships);

module.exports = router;
