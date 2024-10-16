const mongoose = require("mongoose");


const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://imtiyazuddin959:wh8HdBLI7pcq90SQ@backendproject.yla1b.mongodb.net/devLink"
    );
};

module.exports = connectDB;

