const express = require("express");
const router = express.Router();
const {registerUser,loginUser,logoutUser,getMe} = require("../controller/userController"); 


router.post("/",registerUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.get("/me",getMe);
module.exports = router;