const app = require("./src/app")
const connectDB = require("./src/db/db")
const express = require('express');
require('dotenv').config(); 

connectDB();
const PORT =  process.env.PORT || 3002;

app.listen(PORT,()=>{
    console.log("server running on port "+PORT);
})
    