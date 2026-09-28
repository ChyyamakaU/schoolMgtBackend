/* eslint-disable no-undef */
const express = require("express");

const {
    createSubject,
    getSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject
} = require("../controller/subjectController");

const authenticate = require("../middleware/authenticate");
const authorise = require("../middleware/authorise");

const subjectValidator = require("../validators/subjectValidator");

const router = express.Router();

// Admin: create subject
router.post("/", authenticate, authorise("admin"), subjectValidator,    createSubject);

// Admin, teacher, student: view subjects
router.get(  "/",  authenticate,  authorise("admin", "teacher", "student"),  getSubjects);

// Admin, teacher, student: view one subject
router.get( "/:id", authenticate, authorise("admin", "teacher", "student"), getSubjectById);

// Admin: update 
router.put( "/:id", authenticate, authorise("admin"), subjectValidator, updateSubject);

// Admin: delete 
router.delete( "/:id", authenticate, authorise("admin"),  deleteSubject);

module.exports = router;