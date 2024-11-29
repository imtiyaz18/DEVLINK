const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // The environment variables are already loaded by app.js
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        throw error;
    }
};

module.exports = connectDB;


