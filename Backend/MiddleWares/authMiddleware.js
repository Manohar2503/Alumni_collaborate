const jwt = require("jsonwebtoken");
//const Admin = require('../models/adminModel');
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: "Token is missing! Unauthorized access." });
        }

        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = decodedToken;

      
        const foundUser = await User.findById(_id);

        if (!foundUser) {
            return res.status(404).json({ message: "User not found!" });
        } 
        req.user = foundUser; 
        next(); 
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = authMiddleware;