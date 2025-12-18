const BecomeMentor = require('../models/Mentors/becomeMentorModel');
const Mentor = require('../models/Mentors/mentorModel');
const UpcomingSession = require('../models/Mentors/upcomingModel');
const PreviousSession = require('../models/Mentors/previousModel');

// Mentor applies to become a mentor
const mentorApplication = async (req, res) => {
    try {
        const {
            name,
            smallIntro,
            image,
            linkedin,
            company,
            experience,
            technologies,
            sessionType,
            motivation
        } = req.body;
        console.log('got details from postman in json format');
        // Basic validation
        if (!name || !smallIntro || !linkedin || !company || !experience) {
            return res.status(400).json({
                message: 'Required fields are missing'
            });
        }

        // Save mentor application
        const application = new BecomeMentor({
            name,
            smallIntro,
            image,
            linkedin,
            company,
            experience,
            technologies,
            sessionType,
            motivation
        });

        const data = await application.save();

        res.status(201).json({
            message: 'Mentor application submitted successfully',
            applicationId: data._id,
            data
        });

    } catch (err) {
        res.status(500).json({
            message: 'Error submitting mentor application',
            error: err.message
        });
    }
};

// Admin accepts mentor application
const acceptMentorApplication = async (req, res) => {
    try {
        console.log('running acceptMentorApplication')
        const application = await BecomeMentor.findById(req.params.id);
        if (!application) {
            return res.status(404).json({
                message: 'Mentor application not found'
            });
        }
        console.log('mentor found')
        // Create mentor from application
        const mentor = new Mentor({
            name: application.name,
            smallIntro: application.smallIntro,
            image: application.image,
            linkedin: application.linkedin,
            company: application.company,
            experience: application.experience,
            technologies: application.technologies,
            sessionType: application.sessionType,
            motivation: application.motivation
        });

        await mentor.save();
        await BecomeMentor.findByIdAndDelete(req.params.id);

        res.status(201).json({
            message: 'Mentor approved successfully',
            mentor
        });

    } catch (err) {
        res.status(500).json({
            message: 'Error approving mentor',
            error: err.message
        });
    }
};

// Mentor posts an upcoming session
const postUpcomingSession = async (req, res) => {
    try {
        const mentorId = req.params.id;
        const mentor = await Mentor.findById(mentorId);

        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        const {
            title,
            description,
            dateTime,
            mode,
            topics,
            registerLink
        } = req.body;

        if (!title || !description || !dateTime || !mode || !registerLink) {
            return res.status(400).json({
                message: 'All required fields must be provided'
            });
        }

        const upcomingSession = new UpcomingSession({
            title,
            description,
            dateTime,
            mode,
            topics,
            registerLink,
            mentor: [
                {
                    name: mentor.name,
                    photo: mentor.image,
                    linkedin: mentor.linkedin
                }
            ]
        });

        const data = await upcomingSession.save();

        res.status(201).json({
            message: 'Upcoming session created successfully',
            data
        });

    } catch (err) {
        res.status(500).json({
            message: 'Error creating upcoming session',
            error: err.message
        });
    }
};


// Automatically move completed sessions to previous
const moveCompletedSessions = async () => {
    try {
        const now = new Date();

        const completedSessions = await UpcomingSession.find({
            date: { $lt: now }
        });

        for (const session of completedSessions) {
            await PreviousSession.create({
                title: session.title,
                description: session.description,
                date: session.date,
                mentorId: session.mentorId,
                mentorName: session.mentorName,
                role: session.role,
                company: session.company,
                duration: session.duration,
                topics: session.topics,
                recordingLink: session.recordingLink
            });

            await UpcomingSession.findByIdAndDelete(session._id);
        }

        console.log('Completed sessions moved to previous sessions');

    } catch (err) {
        console.error('Error moving sessions:', err.message);
    }
};

// Get all mentors
const getMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find();
        res.status(200).json(mentors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all upcoming sessions
const getUpcomingSessions = async (req, res) => {
    try {
        const sessions = await UpcomingSession.find();
        res.status(200).json(sessions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all previous sessions
const getPreviousSessions = async (req, res) => {
    try {
        const sessions = await PreviousSession.find();
        res.status(200).json(sessions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    mentorApplication,
    acceptMentorApplication,
    postUpcomingSession,
    moveCompletedSessions,
    getMentors,
    getUpcomingSessions,
    getPreviousSessions
};
