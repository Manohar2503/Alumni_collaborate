const mongoose = require('mongoose');

const previousSessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    title: {
      type: String,
      required: [true, 'Session title is required'],
      trim: true
    },

    description: {
      type: String,
      required: [true, 'Session description is required'],
      trim: true
    },

    mentor: [
      {
        name: {
          type: String,
          required: [true, 'Name is required'],
          trim: true
        },
        role: {
          type: String,
          required: [true, 'Role is required'],
          trim: true
        },
        company: {
          type: String,
          required: [true, 'Company name is required'],
          trim: true
        }
      }
    ],

    date: {
      type: Date,
      required: [true, 'Date is required']
    },

    duration: {
      type: Number, // duration in minutes
      required: [true, 'Duration is required']
    },

    topics: {
      type: [String],
      default: []
    },

    recordingLink: {
      type: String,
      required: [true, 'Video link is required']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('PreviousSession', previousSessionSchema);
