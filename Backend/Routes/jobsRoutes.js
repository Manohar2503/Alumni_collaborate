const express = require("express");
const router = express.Router();
const { createJobs, updateJobs, deleteJobs ,getJobs} = require("../controller/jobController");

router.post("/", createJobs);
router.get("/getJobs", getJobs);
router.post("/updateJobs", updateJobs);
router.post("/deleteJobs", deleteJobs);

module.exports = router; 
