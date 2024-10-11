const express = require('express')

const app = express();

// ORDER MATTERS otherwise only this response would be printed in each of the HTTP methods
// app.use("/user", (req, res)=>{
//     res.send("hello from the server")
// })

// this will handle only GET call to /user
app.get("/user", (req, res) => {
    res.send("This is GET Method")
})

//this will call only POST method
app.post("/user", (req, res) => {
    // saving data to DB
    res.send("Data sent to DATABASE successfully");
})

app.delete("/user", (req, res) => {
    res.send("Deleted successfully");
})

// this will match all the HTTP method API calls to /user
app.use("/user", (req, res)=>{
    res.send("hello from the server")
})

// app.use("/", (req, res)=>{
//     res.send("HELLO WORLD!")
// })

app.listen(7777, () => {
    console.log("Server is successfully listening on 7777...");
})