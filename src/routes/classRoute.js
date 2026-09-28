/* eslint-disable no-undef */
const express = require("express");

const {
    createClass,
    getClasses,
    getClassById,
    updateClass,
    deleteClass
} = require("../controller/classController");

const authenticate = require("../middleware/authenticate");
const authorise = require("../middleware/authorise");

const classValidator = require("../validators/classValidators");

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorise("admin"),
    classValidator,
    createClass
);

router.get(
    "/",
    authenticate,
    authorise("admin", "teacher", "student"),
    getClasses
);

router.get(
    "/:id",
    authenticate,
    authorise("admin", "teacher", "student"),
    getClassById
);

router.put(
    "/:id",
    authenticate,
    authorise("admin"),
    classValidator,
    updateClass
);

router.delete(
    "/:id",
    authenticate,
    authorise("admin"),
    deleteClass
);

module.exports = router;