const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const app = express()
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./config/passport"); 
const cors = require("cors")
app.use(cors({origin: "http://localhost:5173",
  credentials: true}))
app.use(express.json());
app.use(cookieParser());


app.use(session({
    secret: process.env.SESSION_SECRET || "supersecret", 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true }
}));

app.use(passport.initialize());
app.use(passport.session());


const authRoute = require("./routes/auth")
const adminRoutes = require("./routes/admin")
const todoRoute = require("./routes/todo")
const notificationRoute = require("./routes/notifications")
app.use("/api/auth",authRoute)
app.use("/api/admin", adminRoutes);
app.use("/api/todo",todoRoute)
app.use("/api/notifications",notificationRoute)

app.get("/",(req,res)=>{
    res.send("Hello World")
})

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("Server is running on port 3000");
})