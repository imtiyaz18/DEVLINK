const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
    },
    lastName: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid emailID: " + value)
            }
        },
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Very Weak Password: " + value)
            }
        },
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        enum: {
            values : ["male", "female", "others"],
            message: `{VALUE} is incorrect message type`,
        }
        // validate(value){
        //     if(!["male", "female", "others"].includes(value)){
        //         throw new Error("Gender Data is not valid");
        //     }
        // },
    },
    photoUrl: {
        type: String,
        default: "https://www.easyfix.in/public/images/dummy-user.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Enter a Valid Photo URL: " + value)
            }
        },
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

userSchema.methods.getJWT = async function(){
    const user = this;

    const token = await jwt.sign({_id: user._id}, "DEV@LINK38129", { 
        expiresIn: "7d"
    });

    return token;
}

userSchema.methods.validatePassword = async function(passwordInput){
    const user = this;
    const passwordHash = user.password;

    const isCorrectPassword = await bcrypt.compare(passwordInput, passwordHash);

    return isCorrectPassword;
}

module.exports = mongoose.model("User", userSchema);