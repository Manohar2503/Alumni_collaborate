const { Worker } = require("bullmq");
const redis = require("../config/redis");
const { sendForgotPasswordEmail } = require("../services/emailService");

const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    if (job.name === "forgot-password") {
      await sendForgotPasswordEmail(job.data);
    }
  },
  {
    connection: redis,
  }
);

emailWorker.on("completed", (job) => {
  console.log(`Email job completed: ${job.id}`);
});

emailWorker.on("failed", (job, err) => {
  console.error(`Email job failed: ${job?.id}`, err.message);
});

module.exports = emailWorker;
