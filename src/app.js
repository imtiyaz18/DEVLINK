const express = require('express')

const app = express();

app.get("/user", (req, res, next) => {
    console.log("Route handled successfully");
    //res.send("Response")
    next();
},
[(req, res, next) => {
    console.log("2nd Route handled successfully");
    //res.send("2nd Response!")
    next();
},
(req, res, next) => {
    console.log("3rd Route handled successfully");
    //res.send("3rd Response!")
    next();
}],
(req, res, next) => {
    console.log("4th Route handled successfully");
    //res.send("4th Response!")
    next();
},
(req, res, next) => {
    console.log("5th Route handled successfully");
    res.send("5th Response!")
    //next();
})















// // ORDER MATTERS otherwise only this response would be printed in each of the HTTP methods
// // app.use("/user", (req, res)=>{
// //     res.send("hello from the server")
// // })

// // this will handle only GET call to /user
// app.get("/user", (req, res) => {
//     res.send("This is GET Method")
// })

// //this will call only POST method
// app.post("/user", (req, res) => {
//     // saving data to DB
//     res.send("Data sent to DATABASE successfully");
// })
 
// app.delete("/user", (req, res) => {
//     res.send("Deleted successfully");
// })

// // this will match all the HTTP method API calls to /user
// app.use("/user", (req, res)=>{
//     res.send("hello from the server")
// })

// // app.use("/", (req, res)=>{
// //     res.send("HELLO WORLD!")
// // })

app.listen(7777, () => {
    console.log("Server is successfully listening on 7777...");
})