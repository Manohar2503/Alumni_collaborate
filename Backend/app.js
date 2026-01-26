const express = require("express");
const {userAuth} = require('./MiddleWares/authMiddleware');
const dotenv = require("dotenv").config();
const { errorHandler } = require('./MiddleWares/goalMiddleware');
const cookieParser = require('cookie-parser');
const connectionDB = require("./config/database");
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 5001; // Changed default port to 5001
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
    credentials: true,              
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/users", require('./Routes/userRoutes'));
app.use("/api/profile", require('./Routes/profileRoutes')); // Profile routes
app.use("/api/request",require('./Routes/requestRoutes')); // Request routes
app.use("/api/posts", require('./Routes/postRoutes')); // Post routes
app.use('/api/mentors', require('./Routes/mentorRoutes'));
app.use('/api/oppurtunities', require('./Routes/JobsInternshipsBlogsRoutes'))

app.use(errorHandler);

(async () => {
    try {
        await connectionDB();
        app.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (err) {
        console.error("Failed to connect to the database. Server not started.", err.message);
    }
})();
