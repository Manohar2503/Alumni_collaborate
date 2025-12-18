const mongoose = require('mongoose');

const mentorApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },

    smallIntro: {
      type: String,
      required: [true, 'Small introduction is required'],
      trim: true,
      maxlength: 500
    },

    image: {
      type: String,
      trim: true
    },

    linkedin: {
      type: String,
      required: [true, 'LinkedIn profile is required'],
      trim: true
    },

    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true
    },

    experience: {
      type: Number,
      required: [true, 'Experience is required'],
      min: 0
    },

    technologies: {
      type: [String],
      default: []
    },

    sessionType: {
      type: String,
      enum: {
        values: ['Live', 'Webinar'],
        message: 'Session type must be either "Live" or "Webinar"'
      },
      required: [true, 'Session type is required']
    },

    motivation: {
      type: String,
      required: [true, 'Motivation is required'],
      trim: true,
      maxlength: 1000
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('MentorApplication', mentorApplicationSchema);
