const express = require("express");
const { userauth } = require("../middlewares/auth");
const {validateEditProfileData} = require('../utils/validation')
const profileRouter = express.Router();

profileRouter.get("/profile/view", userauth, async (req, res) => {
    const user = req.user;
    
    res.send(user);
    
})

profileRouter.patch("/profile/edit", userauth, async(req, res) => {
    try{
       if(!validateEditProfileData(req)){
        throw new Error("Invalid Edit request");
       }

       const loggedInUser = req.user;

       Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
       await loggedInUser.save();

       //res.send("Profile Edit SuccessFully");
       res.json({
        message: `${loggedInUser.firstName}, your profile has been updated successfully`,
        data: loggedInUser,
       });
    } catch(err){
        res.status(400).send("ERROR :" + err.message);
    }
})

profileRouter.patch("/profile/password", async(req, res) => {
    
})
module.exports = profileRouter;