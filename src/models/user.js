const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
    },
    secondName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender Data is not valid");
            }
        },
    },
    photoUrl: {
        type: String,
        default: "https://www.easyfix.in/public/images/dummy-user.jpg",
    },
    about: {
        type: String,
        default: "This is default about of the user"
    },
    skills:{
        type: [String]
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);