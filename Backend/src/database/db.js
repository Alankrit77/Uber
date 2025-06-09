const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.DB_CONNECT) {
      console.error("ERROR: DB_CONNECT environment variable is not defined!");
      process.exit(1);
    }

    await mongoose.connect(process.env.DB_CONNECT);
    console.log("DB connection successful!");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
