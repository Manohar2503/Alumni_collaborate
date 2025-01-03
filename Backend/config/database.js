
const mongoose = require("mongoose");

const connectionDB = async () => {
    try {
await mongoose.connect(process.env.MONGO_URI);
        
console.log("Database connection established!");
    } catch (err) {
        console.error("Error connecting to the database:", err);
        throw err; 
    }
};

module.exports = connectionDB;
