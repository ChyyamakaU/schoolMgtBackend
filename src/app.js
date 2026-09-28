/* eslint-disable no-undef */
const express = require("express");

const authRouter = require("./routes/authRoute");
const studentRouter = require("./routes/studentRoute");
const classRouter = require("./routes/classRoute");
const teacherRouter = require("./routes/teacherRoute");
const subjectRouter = require("./routes/subjectRoute");
const resultRouter = require("./routes/resultRoue");

const errorHandler = require("./middleware/error");
const logger = require("./middleware/logger");

const app = express();

app.use(logger);
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/student", studentRouter);
app.use("/api/class", classRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/subject", subjectRouter);
app.use("/api/result", resultRouter);

app.use(errorHandler);

module.exports = app;