const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");

const connectionDB = require("./config/database");
const redis = require("./config/redis");
const { errorHandler } = require("./MiddleWares/goalMiddleware");
const { globalLimiter } = require("./MiddleWares/rateLimiters");

const port = process.env.PORT || 5001;
const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(globalLimiter);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get("/health", async (req, res) => {
  const mongoOk = mongoose.connection.readyState === 1;

  let redisOk = false;
  try {
    await redis.ping();
    redisOk = true;
  } catch (error) {
    redisOk = false;
  }

  if (mongoOk && redisOk) {
    return res.status(200).json({
      status: "ok",
      mongo: "connected",
      redis: "connected",
    });
  }

  return res.status(503).json({
    status: "degraded",
    mongo: mongoOk ? "connected" : "disconnected",
    redis: redisOk ? "connected" : "disconnected",
  });
});

app.get("/ping", (req, res) => {
  res.status(200).send("pong - Alumni backend is awake");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", require("./Routes/userRoutes"));
app.use("/api/profile", require("./Routes/profileRoutes"));
app.use("/api/request", require("./Routes/requestRoutes"));
app.use("/api/posts", require("./Routes/postRoutes"));
app.use("/api/mentors", require("./Routes/mentorRoutes"));
app.use("/api/learningtracks", require("./Routes/learningRoutes"));
app.use("/api/oppurtunities", require("./Routes/JobsInternshipsBlogsRoutes"));

app.use(errorHandler);

(async () => {
  try {
    await connectionDB();
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (err) {
    console.error("Failed to connect to the database. Server not started.", err.message);
  }
})();
