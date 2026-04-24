require("dotenv").config();
require("./emailWorker");

const connectionDB = require("../config/database");
const { startMoveCompletedSessionsJob } = require("../jobs/moveCompletedSessions");

(async () => {
  try {
    await connectionDB();
    startMoveCompletedSessionsJob();
    console.log("Worker started successfully");
  } catch (error) {
    console.error("Worker failed to start:", error.message);
    process.exit(1);
  }
})();
