const express = require("express");
const router = express.Router();
const {createMentor,getAllMentors,deleteMentor} = require("../controller/mentorController");

router.post("/",createMentor);
router.get("/",getAllMentors);
router.delete("/:id",deleteMentor); 

module.exports = router;
