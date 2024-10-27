const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userauth = async (req, res, next) => {
    try{
    const { token } = req.cookies;
    if(!token){
        throw new Error("Token Validation Failed!!!!")
    }
    const decodedMessage = await jwt.verify(token, "DEV@LINK38129");
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