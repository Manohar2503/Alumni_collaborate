const jobs = require('../models/jobModel');

const createJobs = async (req, res) => {
   //console.log(req.body); 
    const { company, location, role, type, link, skills } = req.body;

    if (!company || !location || !role || !type || !link || !skills) {
        return res.status(400).json({ message: "Please enter all fields" });
    }
    try {
        const newJob = await jobs.create({
            company,
            location,
            role,
            type,
            link,
            skills
        });

        if (newJob) {
            return res.status(201).json({
                _id: newJob.id,
                company: newJob.company,
                location: newJob.location,
                role: newJob.role,
                type: newJob.type,
    
                link: newJob.link,
                skills: newJob.skills
            });
        } else {
            res.status(400);
            throw new Error("Invalid job data");
        }
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((val) => val.message);
            res.status(400).json({ message: messages.join(", ") });
        } else {
            res.status(500).json({ message: error.message || "Server Error" });
        }
    }
};
const getJobs = async (req, res) => {
    try {
        const jobData = await jobs.find({});
        //console.log(jobData);
        res.status(200).json({ success:true, data : jobData });
       } catch (error) {
        console.error("Error getting all startups:", error);
        res.status(500).json({ success:false, message: "Server error" });
       }

}

const updateJobs = async (req, res) => {
    res.status(200).json({ message: "updateJobs" });
};

const deleteJobs = async (req, res) => {
    res.status(200).json({ message: "deleteJobs" });
};



module.exports = { createJobs, updateJobs, deleteJobs ,getJobs};