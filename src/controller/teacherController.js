/* eslint-disable no-undef */
const teachers = require("../../database/teachers");

const createTeacher = (req, res, next) => {
    try {
        const { name, email, phone, subject, userId } = req.body;

        const existingTeacher = teachers.find(
            (teacher) => teacher.email === email
        );

        if (existingTeacher) {
            return res.status(409).json({
                status: "error",
                message: "A teacher with this email already exists"
            });
        }

        const newTeacher = {
            id: teachers.length + 1,
            userId: userId || null,
            name,
            email,
            phone,
            subject,
            createdAt: new Date().toISOString()
        };

        teachers.push(newTeacher);

        return res.status(201).json({
            status: "successful",
            message: "Teacher created successfully",
            teacher: newTeacher
        });
    } catch (error) {
        next(error);
    }
};

const getTeachers = (req, res, next) => {
    try {
        return res.status(200).json({
            status: "successful",
            teachers
        });
    } catch (error) {
        next(error);
    }
};

const getTeacherById = (req, res, next) => {
    try {
        const teacherId = Number(req.params.id);

        const teacher = teachers.find(
            (teacher) => teacher.id === teacherId
        );

        if (!teacher) {
            return res.status(404).json({
                status: "error",
                message: "Teacher not found"
            });
        }

        return res.status(200).json({
            status: "successful",
            teacher
        });
    } catch (error) {
        next(error);
    }
};

const updateTeacher = (req, res, next) => {
    try {
        const teacherId = Number(req.params.id);

        const teacher = teachers.find(
            (teacher) => teacher.id === teacherId
        );

        if (!teacher) {
            return res.status(404).json({
                status: "error",
                message: "Teacher not found"
            });
        }

        const { name, email, phone, subject } = req.body;

        if (email && email !== teacher.email) {
            const existingTeacher = teachers.find(
                (teacher) =>
                    teacher.email === email &&
                    teacher.id !== teacherId
            );

            if (existingTeacher) {
                return res.status(409).json({
                    status: "error",
                    message: "A teacher with this email already exists"
                });
            }
        }

        if (name) teacher.name = name;
        if (email) teacher.email = email;
        if (phone) teacher.phone = phone;
        if (subject) teacher.subject = subject;

        return res.status(200).json({
            status: "successful",
            message: "Teacher updated successfully",
            teacher
        });
    } catch (error) {
        next(error);
    }
};

const deleteTeacher = (req, res, next) => {
    try {
        const teacherId = Number(req.params.id);

        const teacherIndex = teachers.findIndex(
            (teacher) => teacher.id === teacherId
        );

        if (teacherIndex === -1) {
            return res.status(404).json({
                status: "error",
                message: "Teacher not found"
            });
        }

        teachers.splice(teacherIndex, 1);

        return res.status(200).json({
            status: "successful",
            message: "Teacher deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createTeacher,
    getTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
};