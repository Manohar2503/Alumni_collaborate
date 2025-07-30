const express = require("express");
const router = express.Router();
const {registerUser,loginUser,logoutUser,getProfileInfo,updateProfile} = require("../controller/userController"); 


router.post("/",registerUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.get("/profile",getProfileInfo);
router.put("/update",updateProfile);
module.exports = router;