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

const subjectValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Subject name is required"),

    body("code")
        .trim()
        .notEmpty()
        .withMessage("Subject code is required"),

    validateRequest
];

module.exports = subjectValidator;