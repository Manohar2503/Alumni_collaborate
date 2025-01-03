const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require('./MiddleWares/goalMiddleware');
const cookieParser = require('cookie-parser');
const connectionDB = require("./config/database");
const cors = require('cors');
const port = process.env.PORT || 5000;


const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,              // Enable sending cookies
}));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require('./Routes/goalsRoutes'));
app.use("/api/users", require('./Routes/userRoutes'));
app.use("/api/startup", require('./Routes/startupRoutes'));
app.use("/api/mentor", require('./Routes/mentorRoutes'));
app.use("/api/newMentor", require('./Routes/newMentorRoutes'));
app.use(errorHandler);

(async () => {
    try {
        await connectionDB();
        app.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (err) {
        console.error("Failed to connect to the database. Server not started.", err.message);
    }
})();

