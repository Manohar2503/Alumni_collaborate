const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema(
  {
    mentorId: {
      type: mongoose.Schema.Types.ObjectId
    },

    name: {
      type: String,
      required: [true, 'Mentor name is required'],
      trim: true
    },

    smallIntro: {
      type: String,
      required: [true, 'Small introduction is required'],
      trim: true,
      maxlength: 300
    },

    image: {
      type: String, // image URL
      required: [true, 'Mentor image is required']
    },

    linkedin: {
      type: String,
      required: [true, 'LinkedIn profile is required']
    },

    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true
    },

    experience: {
      type: Number, // years of experience
      required: [true, 'Experience is required'],
      min: 0
    },

    technologies: {
      type: [String],
      required: [true, 'Technologies are required']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Mentor', mentorSchema);
