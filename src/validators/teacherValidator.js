/* eslint-disable no-undef */
const { body, validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "error",
            message: "Validation failed",
            errors: errors.array()
        });
    }

    next();
};

const teacherValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Teacher name is required"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email"),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required"),

    body("subject")
        .trim()
        .notEmpty()
        .withMessage("Subject is required"),

    validateRequest
];

module.exports = teacherValidator;