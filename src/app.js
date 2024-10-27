const express = require('express')
const connectDB = require("./config/database")
const app = express();
const cookie = require("cookie");
const cookieParser = require('cookie-parser')
const { userauth } = require("./middlewares/auth");

app.use(express.json()); // we are using it as middleware to read json data and log it here on console
app.use(cookieParser());

const authRouter = require('./router/auth')
const profileRouter = require('./router/profileRouter')
const requestRouter = require('./router/requests')

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);

connectDB().then(()=>{
    console.log("Database connection is established");
    app.listen(7777, () => {
        console.log("Server is successfully listening on 7777...");
    })
}).catch((err)=>{
    console.error("Database cannot be connected");
});

