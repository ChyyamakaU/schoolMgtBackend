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

const resultValidator = [
    body("studentId")
        .notEmpty()
        .withMessage("Student ID is required")
        .isInt({ min: 1 })
        .withMessage("Student ID must be a valid number"),

    body("subjectId")
        .notEmpty()
        .withMessage("Subject ID is required")
        .isInt({ min: 1 })
        .withMessage("Subject ID must be a valid number"),

    body("score")
        .notEmpty()
        .withMessage("Score is required")
        .isFloat({ min: 0, max: 100 })
        .withMessage("Score must be between 0 and 100"),

    body("grade")
        .trim()
        .notEmpty()
        .withMessage("Grade is required"),

    body("term")
        .trim()
        .notEmpty()
        .withMessage("Term is required"),

    body("session")
        .trim()
        .notEmpty()
        .withMessage("Session is required"),

    validateRequest
];

module.exports = resultValidator;