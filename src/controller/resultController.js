/* eslint-disable no-undef */
const results = require("../../database/results");
const students = require("../../database/students");
const subjects = require("../../database/subjects");

const createResult = (req, res, next) => {
    try {
        const {
            studentId,
            subjectId,
            score,
            grade,
            term,
            session
        } = req.body;

        const student = students.find(
            (student) => student.id === Number(studentId)
        );

        if (!student) {
            return res.status(404).json({
                status: "error",
                message: "Student not found"
            });
        }

        const subject = subjects.find(
            (subject) => subject.id === Number(subjectId)
        );

        if (!subject) {
            return res.status(404).json({
                status: "error",
                message: "Subject not found"
            });
        }

        const newResult = {
            id: results.length + 1,
            studentId: Number(studentId),
            subjectId: Number(subjectId),
            score: Number(score),
            grade,
            term,
            session,
            createdAt: new Date().toISOString()
        };

        results.push(newResult);

        return res.status(201).json({
            status: "successful",
            message: "Result created successfully",
            result: newResult
        });
    } catch (error) {
        next(error);
    }
};

const getResults = (req, res, next) => {
    try {
        let filteredResults = results;

        // Students can only see their own results
        if (req.user.role === "student") {
            const student = students.find(
                (student) => student.userId === req.user.id
            );

            if (!student) {
                return res.status(404).json({
                    status: "error",
                    message: "Student profile not found"
                });
            }

            filteredResults = results.filter(
                (result) => result.studentId === student.id
            );
        }

        return res.status(200).json({
            status: "successful",
            results: filteredResults
        });
    } catch (error) {
        next(error);
    }
};

const getResultById = (req, res, next) => {
    try {
        const resultId = Number(req.params.id);

        const result = results.find(
            (result) => result.id === resultId
        );

        if (!result) {
            return res.status(404).json({
                status: "error",
                message: "Result not found"
            });
        }

        // Students can only view their own result
        if (req.user.role === "student") {
            const student = students.find(
                (student) => student.userId === req.user.id
            );

            if (!student || result.studentId !== student.id) {
                return res.status(403).json({
                    status: "error",
                    message: "You can only view your own results"
                });
            }
        }

        return res.status(200).json({
            status: "successful",
            result
        });
    } catch (error) {
        next(error);
    }
};

const updateResult = (req, res, next) => {
    try {
        const resultId = Number(req.params.id);

        const result = results.find(
            (result) => result.id === resultId
        );

        if (!result) {
            return res.status(404).json({
                status: "error",
                message: "Result not found"
            });
        }

        const {
            studentId,
            subjectId,
            score,
            grade,
            term,
            session
        } = req.body;

        if (studentId) {
            const student = students.find(
                (student) => student.id === Number(studentId)
            );

            if (!student) {
                return res.status(404).json({
                    status: "error",
                    message: "Student not found"
                });
            }

            result.studentId = Number(studentId);
        }

        if (subjectId) {
            const subject = subjects.find(
                (subject) => subject.id === Number(subjectId)
            );

            if (!subject) {
                return res.status(404).json({
                    status: "error",
                    message: "Subject not found"
                });
            }

            result.subjectId = Number(subjectId);
        }

        if (score !== undefined) result.score = Number(score);
        if (grade) result.grade = grade;
        if (term) result.term = term;
        if (session) result.session = session;

        return res.status(200).json({
            status: "successful",
            message: "Result updated successfully",
            result
        });
    } catch (error) {
        next(error);
    }
};

const deleteResult = (req, res, next) => {
    try {
        const resultId = Number(req.params.id);

        const resultIndex = results.findIndex(
            (result) => result.id === resultId
        );

        if (resultIndex === -1) {
            return res.status(404).json({
                status: "error",
                message: "Result not found"
            });
        }

        results.splice(resultIndex, 1);

        return res.status(200).json({
            status: "successful",
            message: "Result deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createResult,
    getResults,
    getResultById,
    updateResult,
    deleteResult
};