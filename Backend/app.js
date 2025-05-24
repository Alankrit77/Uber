const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./database/db");

connectDB();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", require("./routes/index.js"));

module.exports = app;
