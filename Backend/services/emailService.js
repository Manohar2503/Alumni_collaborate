const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendForgotPasswordEmail = async ({ email, resetLink }) => {
  await transporter.sendMail({
    to: email,
    subject: "Password Reset Request",
    html: `
      <p>You requested to reset your password.</p>
      <p>Click the link below (valid for 15 minutes):</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  });
};

module.exports = {
  sendForgotPasswordEmail,
};
