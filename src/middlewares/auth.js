const adminauth = (req, res,next) => {
    console.log("Admin auth handled successfully");
    const token = "xyz";
    const isAuthorized = token === "xyz";
    if(!isAuthorized){
        res.status(401).send("Unauthorized request");
    }
    else{
        next();
    }
}

const userauth = (req, res,next) => {
    console.log("User auth handled successfully");
    const token = "xyz";
    const isAuthorized = token === "xyz";
    if(!isAuthorized){
        res.status(401).send("Unauthorized request");
    }
    else{
        next();
    }
}

module.exports = {
    adminauth,
    userauth,
};