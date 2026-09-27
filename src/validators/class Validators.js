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

const classValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Class name is required"),

    body("level")
        .trim()
        .notEmpty()
        .withMessage("Class level is required"),

    validateRequest
];

module.exports = classValidator;