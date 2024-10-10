const express = require('express')

const app = express();
app.use("/hello", (req, res)=>{
    res.send("hello hello hello")
})

app.use("/test", (req, res)=>{
    res.send("hello from the server")
})
app.listen(7777, () => {
    console.log("Server is successfully listening on 7777...");
})