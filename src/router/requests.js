const express = require('express')
const { userauth } = require("../middlewares/auth");
const ConnectionRequest = require('../models/connectionRequest')
const requestRouter = express.Router();
const User = require('../models/user');
const { connection } = require('mongoose');

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

requestRouter.post("/request/review/:status/:requestId", userauth, async (req, res) => {
    try{
    const{ status, requestId} = req.params;
    const loggedInUser = req.user;

    const allowedStatus = ["accepted", "rejected"];
    if(!allowedStatus.includes(status)){
        return res.status(404).json({message : "Status is not valid"});
    }

    const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
    })

    if(!connectionRequest){
        return res.status(404).json({message : "Invalid Request"});
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();

    res.json({ message: "Connection Request " + status, data});
    } catch(err){
        res.status(400).send("ERR : " + err.message);
    }
})

module.exports = requestRouter;