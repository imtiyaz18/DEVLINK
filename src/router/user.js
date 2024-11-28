const express = require("express");
const userRouter = express.Router();
const { userauth }  = require('../middlewares/auth')
const connectionRequest = require('../models/connectionRequest');
const USER_SAFE_DATA = ["firstName", "lastName", "age", "skills", "about", "photoUrl", "gender"]
const User = require('../models/user')

userRouter.get('/user/requests/received', userauth, async(req, res) => {
    try{
    const loggedInUser = req.user;

    const connectionrequests = await connectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({
        message: "Data fetched successfully",
        data : connectionrequests,
    })
}    catch(err){
    res.status(400).send("ERR : " + err.message);
}

});

userRouter.get('/user/connections', userauth, async(req, res) => {
    try{
        const loggedInUser = req.user;

        const connectionrequests = await connectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"},
            ],
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA)

        const data = connectionrequests.map((row) => {
            if(row.fromUserId._id.toString() == loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });
        res.json({data});
    } catch(err){
        res.status(400).send("ERR : " + err.message);
    }
})

userRouter.get('/feed', userauth, async (req, res) => {
    try{
    const loggedInUser = req.user;
    
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page-1)*limit;

    const connectionrequests = await connectionRequest.find({
        $or: [{fromUserId: loggedInUser._id}, {toUserId: loggedInUser._id}]
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionrequests.forEach(req => {
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString());
    });

    console.log(hideUsersFromFeed);

    const users = await User.find({
        $and: [
            {_id : {$nin: Array.from(hideUsersFromFeed)}},
            {_id: {$ne : loggedInUser._id}}
        ]
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);

    res.send(users);
}  catch(err){
    res.status(400).send("ERR : " + err.message);
}
})

module.exports = userRouter;