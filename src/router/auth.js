const express = require("express")
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation")
const User = require("../models/user")
const bcrypt = require("bcrypt")

authRouter.post("/signup", async (req, res) => {
    try{
        // Validation of Data
        validateSignUpData(req);
        
        const {firstName, lastName, emailId, password} = req.body;

        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        // creating a new insatance of User Model
        const user = new User({
            firstName,
            lastName, 
            emailId,
            password: passwordHash,
        });
    await user.save();
    res.send("User added Successfully!")
    } catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try{
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid Credentials of MAIL ID");
        }
        const isCorrectPassword = await user.validatePassword(password);
        if(isCorrectPassword){
            // Create a JWT Token
            const token = await user.getJWT();
            console.log(token);
            
            //Add the token to cookie and send the response back to user
            res.cookie("token", token, {expires: new Date(Date.now() + 90000*24292)});
            res.send("Login successful!");
        } else{
            throw new Error("Invalid Credentials of PASSWORD");
        }
    } catch(err){
        res.status(400).send("ERROR :" + err.message);
    }
})

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {expires: new Date(Date.now())})
    res.send("Logout successfull !!");
})

module.exports = authRouter;