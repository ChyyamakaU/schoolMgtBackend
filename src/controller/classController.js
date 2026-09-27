/* eslint-disable no-undef */
const classes = require("../../database/class");

const createClass = (req, res, next) => {
    try {
        const { name, level } = req.body;

        const existingClass = classes.find(
            (schoolClass) =>
                schoolClass.name.toLowerCase() === name.toLowerCase()
        );

        if (existingClass) {
            return res.status(409).json({
                status: "error",
                message: "This class already exists"
            });
        }

        const newClass = {
            id: classes.length + 1,
            name,
            level,
            createdAt: new Date().toISOString()
        };

        classes.push(newClass);

        return res.status(201).json({
            status: "successful",
            message: "Class created successfully",
            class: newClass
        });
    } catch (error) {
        next(error);
    }
};

const getClasses = (req, res, next) => {
    try {
        return res.status(200).json({
            status: "successful",
            classes
        });
    } catch (error) {
        next(error);
    }
};

const getClassById = (req, res, next) => {
    try {
        const classId = Number(req.params.id);

        const schoolClass = classes.find(
            (schoolClass) => schoolClass.id === classId
        );

        if (!schoolClass) {
            return res.status(404).json({
                status: "error",
                message: "Class not found"
            });
        }

        return res.status(200).json({
            status: "successful",
            class: schoolClass
        });
    } catch (error) {
        next(error);
    }
};

const updateClass = (req, res, next) => {
    try {
        const classId = Number(req.params.id);

        const schoolClass = classes.find(
            (schoolClass) => schoolClass.id === classId
        );

        if (!schoolClass) {
            return res.status(404).json({
                status: "error",
                message: "Class not found"
            });
        }

        const { name, level } = req.body;

        if (name) schoolClass.name = name;
        if (level) schoolClass.level = level;

        return res.status(200).json({
            status: "successful",
            message: "Class updated successfully",
            class: schoolClass
        });
    } catch (error) {
        next(error);
    }
};

const deleteClass = (req, res, next) => {
    try {
        const classId = Number(req.params.id);

        const classIndex = classes.findIndex(
            (schoolClass) => schoolClass.id === classId
        );

        if (classIndex === -1) {
            return res.status(404).json({
                status: "error",
                message: "Class not found"
            });
        }

        classes.splice(classIndex, 1);

        return res.status(200).json({
            status: "successful",
            message: "Class deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createClass,
    getClasses,
    getClassById,
    updateClass,
    deleteClass
};