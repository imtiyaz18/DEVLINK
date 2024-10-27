const express = require('express')
const { userauth } = require("../middlewares/auth");
const ConnectionRequest = require('../models/connectionRequest')
const requestRouter = express.Router();
const User = require('../models/user')

requestRouter.post("/request/send/:status/:toUserId", userauth, async (req, res) => {
    try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const isAllowedStatus = ["ignored", "interested"];
    if(!isAllowedStatus.includes(status)){
        return res.status(404).json({message: "Status is Invalid"});
    }

    const toUser = await User.findById(toUserId);
    if(!toUser){
        return res.status(404).json({message: "Invalid User found"})
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
            {fromUserId, toUserId},
            {fromUserId: toUserId, toUserId: fromUserId},
        ]
    });

    if(existingConnectionRequest){
        throw new Error("Connection Request Already Exists");
    }

    const connectionRequest = new ConnectionRequest({
        fromUserId, toUserId, status,
    });

    const data = await connectionRequest.save();

    res.json({
        message: req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
    })
    } catch(err){
        res.status(400).send("ERR : " + err.message);
    }
})

module.exports = requestRouter;