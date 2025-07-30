const express = require("express");
const {userAuth} = require('./MiddleWares/authMiddleware');
const dotenv = require("dotenv").config();
const { errorHandler } = require('./MiddleWares/goalMiddleware');
const cookieParser = require('cookie-parser');
const connectionDB = require("./config/database");
const cors = require('cors');

const port = process.env.PORT || 5000;
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
    credentials: true,              
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require('./Routes/userRoutes'));
//app.use(userAuth)
app.use("/api/startup", require('./Routes/startupRoutes'));
app.use("/api/mentor", require('./Routes/mentorRoutes'));
app.use("/api/newMentor", require('./Routes/newMentorRoutes'));
app.use("/api/goals", require('./Routes/goalsRoutes'));
app.use("/api/jobs",require('./Routes/jobsRoutes'));
app.use("/api/request",require('./Routes/requestRoutes'));
app.use("/api/bookmarks",require('./Routes/bookMarksRoute'));
app.use(errorHandler);

(async () => {
    try {
        await connectionDB();
        app.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (err) {
        console.error("Failed to connect to the database. Server not started.", err.message);
    }
})();

