const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// Register user
const registerUser = asyncHandler(async (req, res) => {
    const { name, collegeMail, email, password } = req.body;

    if (!name || !collegeMail || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const collegeMailRegex = /^\d{2}bq[15]a[\da-zA-Z]{4}@vvit\.net$/;
    if (!collegeMailRegex.test(collegeMail)) {
        res.status(400);
        throw new Error("Invalid college email. Please enter a valid credential.");
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("User with this email already exists");
    }

    const collegeMailExist = await User.findOne({ collegeMail });
    if (collegeMailExist) {
        res.status(400);
        throw new Error("College email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        const user = await User.create({
            name,
            collegeMail,
            email,
            password: hashedPassword,
            verificationCode,
            verificationCodeExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });

        if (user) {
            return res.status(200).json({
                _id: user.id,
                name: user.name,
                collegeMail: user.collegeMail,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((val) => val.message);
            res.status(400).json({ message: messages.join(", ") });
        } else {
            res.status(500).json({ message: error.message || "Server Error" });
        }
    }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const isPassword = await bcrypt.compare(password, user.password);
    if (user && isPassword) {
        const token = generateToken(user._id);
        console.log(token);
        res.cookie("token", token, {
            httpOnly: true,         // ensures the cookie can't be accessed via JS
            secure: false,  // should be true in production
            sameSite: "strict",     // ensures cookies are only sent in same-site requests
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        console.log("Set-Cookie:", res.getHeaders()["set-cookie"]);
        
        res.status(201).json({
            message: "User logged in successfully",
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.json({ message: 'User logged out' });
});


const getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            collegeMail: user.collegeMail,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// Generate JWT token
const generateToken =(id) => {
    
   return jwt.sign({_id:id}, process.env.JWT_SECRET, {
        expiresIn: '7d', 
    });
    
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe,
};
