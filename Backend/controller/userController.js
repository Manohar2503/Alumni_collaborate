const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");


const registerUser = asyncHandler(async (req, res) => {
    const { name,phone, batch, branch, collegeMail, email, password } = req.body;

    if (!name || !collegeMail || !email || !password  || !phone || !batch || !branch) {
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
            phone,
             batch, 
             branch, 
            password: hashedPassword,
            verificationCode,
            verificationCodeExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });

        if (user) {
            return res.status(200).json({
                _id: user.id,
                name: user.name,
                phone:phone,
                 batch : batch,
                branch : branch, 
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
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPassword = await bcrypt.compare(password, user.password);
    if (user && isPassword) {
        const token = generateToken(user._id);
       // console.log(token);
       res.cookie("token", token, {
        httpOnly: true,         
        secure: process.env.NODE_ENV === "production", 
        sameSite: "lax",  
        maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
    

        res.status(201).json({
            message: "User logged in successfully",token:token
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


const getProfileInfo = asyncHandler(async (req, res) => {
  //  const user = await User.findById(req.user._id);
  const {token} = req.cookies;
const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
 const { _id } = decodedToken;
 const user = await User.findById(_id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const updateProfile = async(req, res) => {
    try {
        const {token} = req.cookies;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = decodedToken;
        const user = await User.findById(_id);
        const data = req.body;
        
        if(!user) {
            return res.status(400).json({message: "User not found"});
        }

        // Prepare update data
        const updateData = {
            name: data.name || user.name,
            phone: data.phone || user.phone,
            batch: data.batch || user.batch,
            branch: data.branch || user.branch,
            email: data.email || user.email,
            // Note: You shouldn't store plain text passwords
            password: data.password || user.password
        };

       
        const updatedUser = await User.findByIdAndUpdate(_id, updateData, {new: true}).lean();
        
        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({message: "Error updating profile", error: error.message});
    }
}

const generateToken =(id) => {
    
   return jwt.sign({_id:id}, process.env.JWT_SECRET, {
        expiresIn: '1d', 
    });
    
};


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getProfileInfo,
    updateProfile
};
