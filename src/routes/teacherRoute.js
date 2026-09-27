/* eslint-disable no-undef */
const express = require("express");

const {
    createTeacher,
    getTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
} = require("../controller/teacherController");

const authenticate = require("../middleware/authenticate");
const authorise = require("../middleware/authorise");

const teacherValidator = require("../validator/teacherValidator");

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorise("admin"),
    teacherValidator,
    createTeacher
);

router.get(
    "/",
    authenticate,
    authorise("admin"),
    getTeachers
);

router.get(
    "/:id",
    authenticate,
    authorise("admin"),
    getTeacherById
);

router.put(
    "/:id",
    authenticate,
    authorise("admin"),
    teacherValidator,
    updateTeacher
);

router.delete(
    "/:id",
    authenticate,
    authorise("admin"),
    deleteTeacher
);

module.exports = router;