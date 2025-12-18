const express = require('express');
const router = express.Router();

const {
    mentorApplication,
    acceptMentorApplication,
    postUpcomingSession,
    getMentors,
    getUpcomingSessions,
    getPreviousSessions
} = require('../controller/mentorController');

// Mentor applies to become a mentor
router.post('/mentor-applications', mentorApplication);

// Admin accepts mentor application
router.post('/mentor-applications/:id/accept', acceptMentorApplication);

// Sessions
router.get('/sessions/upcoming', getUpcomingSessions);
router.get('/sessions/previous', getPreviousSessions);

// Mentor posts an upcoming session
router.post('/sessions/upcoming/:id', postUpcomingSession);

// Mentors
router.get('/allmentors', getMentors);

module.exports = router;
