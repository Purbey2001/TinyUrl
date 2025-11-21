const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;