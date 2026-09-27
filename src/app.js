/* eslint-disable no-undef */
const express = require ("express")
const authRouter = require("./routes/authRoute");

const app = express()
app.use(express.json()) 
app.use("/auth", authRouter)

module.exports=app