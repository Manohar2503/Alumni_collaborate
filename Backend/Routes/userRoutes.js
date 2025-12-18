const express = require("express");
const router = express.Router();
const {registerUser,loginUser,logoutUser} = require("../controller/userController"); 

const authMiddleware = require("../MiddleWares/authMiddleware");
router.post("/",registerUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.get("/me", authMiddleware, (req, res) => {
  res.json(req.user);
});

module.exports = router;