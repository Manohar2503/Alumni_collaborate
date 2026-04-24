const cron = require("node-cron");
const { moveCompletedSessions } = require("../controller/mentorController");

const startMoveCompletedSessionsJob = () => {
  cron.schedule("*/10 * * * *", async () => {
    try {
      await moveCompletedSessions();
    } catch (error) {
      console.error("moveCompletedSessions job failed:", error.message);
    }
  });
};

module.exports = {
  startMoveCompletedSessionsJob,
};
