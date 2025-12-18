const mongoose = require('mongoose');

const upcomingSessionSchema = new mongoose.Schema(
  {
     sessionId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },

    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },

    mentor: [
      {
        name: {
          type: String,
          required: true,
          trim: true
        },
        photo: {
          type: String
        },
        linkedin: {
          type: String
        }
      }
    ],

    dateTime: {
      type: Date,
      required: [true, 'Date and time are required'],
      validate:{
        validator: function(value){
          const now=new Date();
          const diffInMs=value.getTime()-now.getTime();
          const diffInHours=diffInMs/(1000*60*60);
          return diffInHours>=24;
        },
        message:'Session must be scheduled atleast 24hourd in advance'
      }
    },

    mode: {
        type: String,
        required: [true, 'Mode is required'],
        enum: {
            values: ['Live', 'Webinar'],
            message: 'Mode must be either "Live" or "Webinar"'
        }
    },

    topics: {
      type: [String],
      required: [true, 'Topics are required']
    },

    registerLink: {
      type: String,
      required: [true, 'Register link is required']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('UpcomingSession', upcomingSessionSchema);
