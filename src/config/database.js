const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://imtiyazuddin959:wh8HdBLI7pcq90SQ@backendproject.yla1b.mongodb.net/devLink",
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        throw error; // Propagate the error to indicate failure
    }
};

module.exports = connectDB;

