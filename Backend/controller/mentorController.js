const BecomeMentor = require("../models/Mentors/becomeMentorModel");
const Mentor = require("../models/Mentors/mentorModel");
const UpcomingSession = require("../models/Mentors/upcomingModel");
const PreviousSession = require("../models/Mentors/previousModel");
const { getCache, setCache, deleteByPattern } = require("../services/cacheService");
const { getPagination } = require("../utils/pagination");

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
      motivation,
    } = req.body;

    if (!name || !experience || !sessionType || !motivation) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    const application = new BecomeMentor({
      name,
      smallIntro,
      image,
      linkedin,
      company,
      experience,
      technologies,
      sessionType,
      motivation,
    });

    const data = await application.save();

    res.status(201).json({
      message: "Mentor application submitted successfully",
      applicationId: data._id,
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error submitting mentor application",
      error: err.message,
    });
  }
};

const acceptMentorApplication = async (req, res) => {
  try {
    const application = await BecomeMentor.findById(req.params.id);
    if (!application) {
      return res.status(404).json({
        message: "Mentor application not found",
      });
    }

    const mentor = new Mentor({
      name: application.name,
      smallIntro: application.smallIntro,
      image: application.image,
      linkedin: application.linkedin,
      company: application.company,
      experience: application.experience,
      technologies: application.technologies,
      sessionType: application.sessionType,
      motivation: application.motivation,
    });

    await mentor.save();
    await BecomeMentor.findByIdAndDelete(req.params.id);
    await deleteByPattern("mentors:list:*");

    res.status(201).json({
      message: "Mentor approved successfully",
      mentor,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error approving mentor",
      error: err.message,
    });
  }
};

const postUpcomingSession = async (req, res) => {
  try {
    const mentorId = req.params.id;
    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    const { title, description, dateTime, mode, topics, registerLink } = req.body;

    if (!title || !description || !dateTime || !mode || !registerLink) {
      return res.status(400).json({
        message: "All required fields must be provided",
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
          linkedin: mentor.linkedin,
        },
      ],
    });

    const data = await upcomingSession.save();
    await deleteByPattern("sessions:upcoming:*");

    res.status(201).json({
      message: "Upcoming session created successfully",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating upcoming session",
      error: err.message,
    });
  }
};

const moveCompletedSessions = async () => {
  const now = new Date();

  const completedSessions = await UpcomingSession.find({
    dateTime: { $lt: now },
  });

  if (completedSessions.length === 0) {
    return;
  }

  for (const session of completedSessions) {
    await PreviousSession.create({
      title: session.title,
      description: session.description,
      date: session.dateTime,
      duration: session.duration || 60,
      topics: session.topics,
      recordingLink: session.recordingLink || "",
      mentor: session.mentor.map((m) => ({
        name: m.name,
        role: m.role || "Mentor",
        company: m.company || "N/A",
      })),
    });

    await UpcomingSession.findByIdAndDelete(session._id);
  }

  await deleteByPattern("sessions:upcoming:*");
  await deleteByPattern("sessions:previous:*");
};

const getMentors = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const cacheKey = `mentors:list:${page}:${limit}`;
    const cached = await getCache(cacheKey);

    if (cached) {
      return res.status(200).json(cached);
    }

    const mentors = await Mentor.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const payload = { page, limit, data: mentors };
    await setCache(cacheKey, payload, 300);
    res.status(200).json(payload);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUpcomingSessions = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const cacheKey = `sessions:upcoming:${page}:${limit}`;
    const cached = await getCache(cacheKey);

    if (cached) {
      return res.status(200).json(cached);
    }

    const sessions = await UpcomingSession.find()
      .sort({ dateTime: 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const payload = { page, limit, data: sessions };
    await setCache(cacheKey, payload, 300);
    res.status(200).json(payload);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPreviousSessions = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const cacheKey = `sessions:previous:${page}:${limit}`;
    const cached = await getCache(cacheKey);

    if (cached) {
      return res.status(200).json(cached);
    }

    const sessions = await PreviousSession.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const payload = { page, limit, data: sessions };
    await setCache(cacheKey, payload, 300);
    res.status(200).json(payload);
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
  getPreviousSessions,
};
