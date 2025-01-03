const mongoose = require("mongoose");

const newMentorSchema = new mongoose.Schema({
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
}, {
    timestamps: true, 
});

module.exports = mongoose.model("NewMentor", newMentorSchema);

