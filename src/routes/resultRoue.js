const express = require("express");

const {
    createResult,
    getResults,
    getResultById,
    updateResult,
    deleteResult
} = require("../controller/resultController");

const authenticate = require("../middleware/authenticate");
const authorise = require("../middleware/authorise");

const resultValidator = require("../validator/resultValidator");

const router = express.Router();

// Admin and teacher can create results
router.post(
    "/",
    authenticate,
    authorise("admin", "teacher"),
    resultValidator,
    createResult
);

// Admin, teacher and student can view results
router.get(
    "/",
    authenticate,
    authorise("admin", "teacher", "student"),
    getResults
);


router.get(
    "/:id",
    authenticate,
    authorise("admin", "teacher", "student"),
    getResultById
);

// Admin and teacher can update results
router.put(
    "/:id",
    authenticate,
    authorise("admin", "teacher"),
    resultValidator,
    updateResult
);

// Admin only can delete 
router.delete(
    "/:id",
    authenticate,
    authorise("admin"),
    deleteResult
);

module.exports = router;