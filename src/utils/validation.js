const validator = require('validator');
const { validate } = require('../models/user');

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid")
    } else if(!validator.isEmail(emailId)){
        throw new Error("Email Id is not valid");
    } else if(!validator.isStrongPassword(password)){
        throw new Error("Password is very weak");
    }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = [
        "firstName", 
        "lastName", 
        "emailId", 
        "photoUrl", 
        "gender", 
        "age", 
        "about", 
        "skills"]

    const isEditAllowed = Object.keys(req.body).every((field) => 
        allowedEditFields.includes(field)
    );

    return isEditAllowed;
}

module.exports = {
    validateSignUpData,
    validateEditProfileData
}