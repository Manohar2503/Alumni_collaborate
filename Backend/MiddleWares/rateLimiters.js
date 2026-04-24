const rateLimit = require("express-rate-limit");

const buildLimiter = ({ windowMs, max, message }) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message },
  });

const globalLimiter = buildLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});

const authLimiter = buildLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Try again later.",
});

const forgotPasswordLimiter = buildLimiter({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: "Too many password reset requests. Try again later.",
});

const postActionLimiter = buildLimiter({
  windowMs: 60 * 1000,
  max: 30,
  message: "Too many post actions. Try again shortly.",
});

module.exports = {
  globalLimiter,
  authLimiter,
  forgotPasswordLimiter,
  postActionLimiter,
};
