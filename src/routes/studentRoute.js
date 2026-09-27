/* eslint-disable no-undef */
const express = require("express");

const {
    createStudent, getStudents, getStudentById, updateStudent, deleteStudent} = require("../controller/studentController");

const authenticate = require("../middleware/authenticate");
const authorise = require("../middleware/authorise");

const studentValidator = require("../validator/studentValidator");

const router = express.Router();

// Create a student - Admin only
router.post("/", authenticate, authorise("admin"), studentValidator, createStudent);

// View all students - Admin and Teacher
router.get("/", authenticate, authorise("admin", "teacher"), getStudents);

// View one student - Admin, Teacher, or the Student themselves
router.get("/:id", authenticate, authorise("admin", "teacher", "student"),  getStudentById );

// Update - Admin
router.put("/:id", authenticate, authorise("admin"), studentValidator, updateStudent);

// Delete Admin only
router.delete( "/:id", authenticate, authorise("admin"), deleteStudent);

module.exports = router;