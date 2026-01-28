require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const database = require('../server/config/database');

const app = express();

//inbuilt-middleware
app.use(cors());
app.use(express.json());

//database
database()
.then(()=>{
    app.listen(5000,()=>console.log("server is running.."))
})

//routes