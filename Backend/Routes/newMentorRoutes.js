const express = require("express");
const router = express.Router();
const {createNewMentor,getNewMentor,deleteNewMentor} = require("../controller/newController");
const { Tocheck,userAuth } = require("../MiddleWares/authMiddleware");

router.post("/",createNewMentor);
router.get("/", getNewMentor);
router.delete("/:id", deleteNewMentor);

module.exports = router;