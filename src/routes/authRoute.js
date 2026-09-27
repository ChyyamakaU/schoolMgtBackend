/* eslint-disable no-undef */
const express = require("express");
const rateLimit = require("express-rate-limit");

const { registerNew, loginUser} = require("../controller/authController");

const { registerValidator, loginValidator} = require("../validators/authValidator");

const router = express.Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        status: "error",
        message: "Too many authentication attempts. Please try again later."
    }
});

router.post(
    "/register",  authLimiter, registerValidator, registerNew);

router.post(
    "/login", authLimiter, loginValidator, loginUser);

module.exports = router;