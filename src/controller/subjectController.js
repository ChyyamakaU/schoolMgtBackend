/* eslint-disable no-undef */
const subjects = require("../../database/subjects");

const createSubject = (req, res, next) => {
    try {
        const { name, code } = req.body;

        const existingSubject = subjects.find(
            (subject) =>
                subject.code.toLowerCase() === code.toLowerCase()
        );

        if (existingSubject) {
            return res.status(409).json({
                status: "error",
                message: "A subject with this code already exists"
            });
        }

        const newSubject = {
            id: subjects.length + 1,
            name,
            code,
            createdAt: new Date().toISOString()
        };

        subjects.push(newSubject);

        return res.status(201).json({
            status: "successful",
            message: "Subject created successfully",
            subject: newSubject
        });
    } catch (error) {
        next(error);
    }
};

const getSubjects = (req, res, next) => {
    try {
        return res.status(200).json({
            status: "successful",
            subjects
        });
    } catch (error) {
        next(error);
    }
};

const getSubjectById = (req, res, next) => {
    try {
        const subjectId = Number(req.params.id);

        const subject = subjects.find(
            (subject) => subject.id === subjectId
        );

        if (!subject) {
            return res.status(404).json({
                status: "error",
                message: "Subject not found"
            });
        }

        return res.status(200).json({
            status: "successful",
            subject
        });
    } catch (error) {
        next(error);
    }
};

const updateSubject = (req, res, next) => {
    try {
        const subjectId = Number(req.params.id);

        const subject = subjects.find(
            (subject) => subject.id === subjectId
        );

        if (!subject) {
            return res.status(404).json({
                status: "error",
                message: "Subject not found"
            });
        }

        const { name, code } = req.body;

        if (code && code !== subject.code) {
            const existingSubject = subjects.find(
                (subject) =>
                    subject.code.toLowerCase() === code.toLowerCase() &&
                    subject.id !== subjectId
            );

            if (existingSubject) {
                return res.status(409).json({
                    status: "error",
                    message: "A subject with this code already exists"
                });
            }
        }

        if (name) subject.name = name;
        if (code) subject.code = code;

        return res.status(200).json({
            status: "successful",
            message: "Subject updated successfully",
            subject
        });
    } catch (error) {
        next(error);
    }
};

const deleteSubject = (req, res, next) => {
    try {
        const subjectId = Number(req.params.id);

        const subjectIndex = subjects.findIndex(
            (subject) => subject.id === subjectId
        );

        if (subjectIndex === -1) {
            return res.status(404).json({
                status: "error",
                message: "Subject not found"
            });
        }

        subjects.splice(subjectIndex, 1);

        return res.status(200).json({
            status: "successful",
            message: "Subject deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createSubject,
    getSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject
};