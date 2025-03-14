const express = require('express')
const connectDB = require("./config/database")
const app = express();
const cookie = require("cookie");
const cookieParser = require('cookie-parser')
const { userauth } = require("./middlewares/auth");
const cors = require('cors')
require("dotenv").config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json()); // we are using it as middleware to read json data and log it here on console
app.use(cookieParser());

const authRouter = require('./router/auth')
const profileRouter = require('./router/profileRouter')
const requestRouter = require('./router/requests');
const userRouter = require('./router/user');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter)

connectDB().then(()=>{
    console.log("Database connection is established");
    app.listen(process.env.PORT, () => {
        console.log("Server is successfully listening on 7777...");
    })
}).catch((err)=>{
    console.error("Database cannot be connected");
});

