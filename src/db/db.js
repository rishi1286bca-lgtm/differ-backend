const mongoose = require('mongoose');
const { setServers } = require("node:dns/promises");

async function connectDB() {
  try {
    setServers(["1.1.1.1", "8.8.8.8"]);
    const mongoURI = process.env.MONGO_URI || "mongodb+srv://rishibca:Rishi%401286@cluster0.kj2zjbf.mongodb.net/new";
   
    await mongoose.connect(mongoURI);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}


module.exports = connectDB;