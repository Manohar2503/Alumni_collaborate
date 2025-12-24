// database.js
const mongoose = require("mongoose");
const { moveCompletedSessions } = require('../controller/mentorController');

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection established!");

    moveCompletedSessions();

    setInterval(moveCompletedSessions, 5 * 60 * 1000);

  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err; 
  }
};

module.exports = connectionDB;
