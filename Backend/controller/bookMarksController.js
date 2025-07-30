const jwt = require('jsonwebtoken');
const NewMentor = require('../models/newmentorModel');
const BookMarkModel = require('../models/bookMarkModel');

const bookmarks = async (req, res) => {
    try {
        const { event } = req.body;
        const { token } = req.cookies;
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Decode token to get userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded._id;

        if (!event || event.length === 0) {
            return res.status(400).json({ message: "No mentor IDs provided" });
        }

        // Extract mentor IDs
        const mentorIds = event.map(item => typeof item === 'object' ? item.id : item);

        // Fetch mentor details
        const mentors = await NewMentor.find({ _id: { $in: mentorIds } });

        if (mentors.length === 0) {
            return res.status(404).json({ message: "Mentors not found" });
        }

        // Fetch existing bookmarks for the user
        let existingBookmark = await BookMarkModel.findOne({ userId });

        if (existingBookmark) {
            // Filter out already bookmarked mentors
            const newMentors = mentors.filter(mentor => 
                !existingBookmark.marks.some(mark => mark.mentorId.equals(mentor._id))
            );

            if (newMentors.length > 0) {
                const newMarks = newMentors.map(mentor => ({
                    mentorId: mentor._id,
                    title: mentor.title,
                    time: mentor.time,
                    registration: mentor.registration
                }));

                existingBookmark.marks.push(...newMarks);
                await existingBookmark.save();
                return res.status(200).json({ message: "Bookmark updated successfully" });
            } else {
                return res.status(200).json({ message: "Mentor already bookmarked" });
            }
        } else {
            // Create a new bookmark entry
            await BookMarkModel.create({
                userId,
                marks: mentors.map(mentor => ({
                    mentorId: mentor._id,
                    title: mentor.title,
                    time: mentor.time,
                    registration: mentor.registration
                }))
            });

            return res.status(201).json({ message: "Bookmark created successfully" });
        }

    } catch (error) {
        console.error("Error in bookmarks:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = bookmarks;
