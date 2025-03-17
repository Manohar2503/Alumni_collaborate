const express = require("express");
const router = express.Router();
const {createNewMentor,updateNewMentor,getNewMentor,deleteNewMentor} = require("../controller/newController");
const { Tocheck,userAuth } = require("../MiddleWares/authMiddleware");

router.post("/",createNewMentor);
router.get("/", getNewMentor);
router.put("/:id", updateNewMentor);
router.delete("/:id", deleteNewMentor);

module.exports = router;