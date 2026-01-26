const express = require("express");
const router = express.Router();
const {registerUser,loginUser,logoutUser,forgotPassword,resetPassword, getReviews, postReview } = require("../controller/userController"); 

const authMiddleware = require("../MiddleWares/authMiddleware");
router.post("/",registerUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/getReviews", getReviews);
router.post("/postReview", authMiddleware, postReview);
router.get("/me", authMiddleware, (req, res) => {
  res.json(req.user);
});

module.exports = router;