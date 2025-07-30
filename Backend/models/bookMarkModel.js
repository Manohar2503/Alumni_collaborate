const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Assuming this references a User model
    },
    marks: [{
        // mentorId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: 'NewMentor' // Assuming this references a NewMentor model
        // },
        title: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        registration: {
            type: String,
            required: true,
        },
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("BookMark", markSchema);
