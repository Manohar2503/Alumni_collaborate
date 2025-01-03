const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const userAuth = async (req, res, next) => {
  try {
    console.log("Set-Cookie:", res.getHeaders()["set-cookie"]);

    const token = req.cookies.token;
    console.log("Token: ", token);

    if (!token) {
      return res.status(401).json({ message: "Token not valid!" });
    }

    // Verify the token
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decodedData;

    // Find the user by ID
    const user = await User.findById(_id);
    if (!user) {
      return res.status(403).json({ message: "Invalid credentials!" });
    }

    // Attach user to the request object
    req.user = user;
    next();
  } catch (err) {
    console.error("Error in userAuth middleware:", err.message);
    return res.status(401).json({ message: "Authentication failed!", error: err.message });
  }
};

const Tocheck = async (req, res, next) => {
  console.log("Tocheck Middleware Invoked");
  next();
};

module.exports = { userAuth, Tocheck };
