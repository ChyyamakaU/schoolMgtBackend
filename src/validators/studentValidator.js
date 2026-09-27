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

const studentValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Student name is required"),

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

    body("classId")
        .notEmpty()
        .withMessage("Class ID is required")
        .isInt({ min: 1 })
        .withMessage("Class ID must be a valid number"),

    validateRequest
];

module.exports = studentValidator;