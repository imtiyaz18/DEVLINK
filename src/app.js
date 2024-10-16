const express = require('express')
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")

app.use(express.json()); // we are using it as middleware to read json data and log it here on console
app.post("/signup", async (req, res) => {
    //console.log(req.body);
    
    // creating a new insatance of User Model
    const user = new User(req.body);
    try{
    await user.save();
    res.send("User added Successfully!")
    } catch(err){
        res.status(400).send("Error saving the user" + err.message);
    }
});

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try{
    const user = await User.find({emailId : userEmail});
    if(user.length === 0){
        res.status(404).send("User not found")
    } else{
        res.send(user);
    }
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
})

//feed - get all the users
app.get("/feed", async (req, res) => {
    try{
        const users = await User.find({});
        if(users.length === 0){
            res.status(404).send("User not found")
        } else{
            res.send(users);
        }
        }
        catch(err){
            res.status(400).send("Something went wrong");
        }
})

// delete a user from the database
app.delete("/user", async (req, res) => {
    const id = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(id);

        res.send("User deleted successfully")
    } catch(err){
        res.status(400).send("Something went wrong")
    }
})

// update details of the user
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try{
        const user = await User.findByIdAndUpdate({_id: userId}, data, {returnDocument: "after", runValidators: true, });
        console.log(user);
        
        res.send("User updated successfully")
    } catch(err){
        res.status(400).send("UPDATE FAILED:" + err.message);
    }
})

connectDB().then(()=>{
    console.log("Database connection is established");
    app.listen(7777, () => {
        console.log("Server is successfully listening on 7777...");
    })
}).catch((err)=>{
    console.error("Database cannot be connected");
});

