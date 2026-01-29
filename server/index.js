require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('../server/config/database');
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/authRoutes");
const notesRouter = require("./routes/notesRoutes");

const app = express();

app.use(cors());          // allows frontend to talk to backend
app.use(express.json()); // lets server read JSON data you send
app.use(cookieParser()); // lets server read cookies from browser

//routes
app.use("/api/auth",authRouter);
app.use("/api/notes",notesRouter);

//database
connectDB()
.then(()=>{
    app.listen(3000,()=>console.log("server is running.."))
})