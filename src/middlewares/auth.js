const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userauth = async (req, res, next) => {
    try{
    const { token } = req.cookies;
    if(!token){
        return res.status(401).send("Please Login again !!!")
    }
    const decodedMessage = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedMessage;

    const user = await User.findById(_id).exec();

    if(!user){
        throw new Error("User not Found");
    }
    req.user = user;
    next();
    } catch(err){
        res.status(400).send("ERROR :" + err.message);
    }
}

module.exports = {
    userauth,
};