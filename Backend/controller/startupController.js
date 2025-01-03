const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Startup = require("../models/startupModel");
const asyncHandler = require("express-async-handler");

const createStartup = asyncHandler(async (req, res) => {
    const { ideaTitle, username, email,description, contact, idea } = req.body;

    if (!ideaTitle || !username || !email || !description|| !contact || !idea) {
        res.status(400);

        throw new Error("Please fill all the fields");
    }

    try {
        const startup = await Startup.create({
            ideaTitle,
            username,
            email,
            contact,
            description,
            idea
        });

        if (startup) {
            return res.status(200).json({
                _id: startup.id,
                ideaTitle: startup.ideaTitle,
                username: startup.username,
                email: startup.email,
                description: startup.description,
                contact: startup.contact,
                idea: startup.idea
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    } catch (error) {
        console.error("Error creating startup:", error);
        res.status(500).json({ message: "Server error" });
    }
});


const getAllStartups = asyncHandler(async (req, res) => {   
   try {
    const allData = await Startup.find({});
    
    res.status(200).json({ success:true, data : allData });
   } catch (error) {
    console.error("Error getting all startups:", error);
    res.status(500).json({ success:false, message: "Server error" });
   }

}
);

const deleteStartup = asyncHandler(async (req, res) => {
res.status(200).json({ message: "Delete Startup" });
}
);
module.exports = { createStartup, getAllStartups, deleteStartup };