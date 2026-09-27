/* eslint-disable no-undef */
const express = require("express");

const authRouter = require("./routes/authRoute");
const studentRouter = require("./routes/studentRoute")
const classRouter =require("./routes/classRoute")
const teacherRouter = require("./routes/classRoute")
const subjectRouter = require("./routes/subjectRoute")
const result = require("./routes/resultRoue")

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/student", studentRouter);
app.use("/api/class", classRouter);
app.use("/api/teacher", teacherRouter);
app.use("/app/subject", subjectRouter)
app.use("/api/result", result)



module.exports = app;
