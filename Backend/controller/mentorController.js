const Mentor = require('../models/mentorModel');
const asyncHandler = require('express-async-handler');

const createMentor = asyncHandler(async (req, res) => {
const {image,topic, video} = req.body;
if (!image || !topic || !video) {
res.status(400);
throw new Error("Please fill all fields");
}
try {
    const mentor = await Mentor.create({
        image,
        topic,
        video
    });
if(mentor){
    return res.status(200).json({
        _id: mentor.id,
        image: mentor.image,
        topic: mentor.topic,
        video: mentor.video
    });
} 
}
catch (error) {
    console.error("Error creating mentor:", error);
    res.status(500).json({ message: "Server error" });
    
}

});

const getAllMentors = asyncHandler(async (req, res) => {
    try {
        const allData = await Mentor.find({});
        res.status(200).json({ success:true, data : allData });
       } catch (error) {
        console.error("Error getting all startups:", error);
        res.status(500).json({ success:false, message: "Server error" });
       }


}); 

const deleteMentor = asyncHandler(async (req, res) => {     
res.status(200).json({ message: "Delete Mentor" });
});

module.exports = {createMentor,getAllMentors,deleteMentor};
