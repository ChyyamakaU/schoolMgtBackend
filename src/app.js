/* eslint-disable no-undef */
const express = require("express");

const authRouter = require("./routes/authRoute");
const studentRouter = require("./routes/studentRoute")

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/student", studentRouter);


module.exports = app;
