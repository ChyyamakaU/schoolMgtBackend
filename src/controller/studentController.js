/* eslint-disable no-undef */
const students = require("../../database/students");
const classes = require("../../database/classes");

const createStudent = (req, res, next) => {
    try {
        const { name, email, phone, classId, userId } = req.body;

        const existingStudent = students.find(
            (student) => student.email === email
        );

        if (existingStudent) {
            return res.status(409).json({
                status: "error",
                message: "A student with this email already exists"
            });
        }

        const existingClass = classes.find(
            (schoolClass) => schoolClass.id === Number(classId)
        );

        if (!existingClass) {
            return res.status(404).json({
                status: "error",
                message: "Class not found"
            });
        }

        const newStudent = {
            id: students.length + 1,
            userId: userId || null,
            name,
            email,
            phone,
            classId: Number(classId),
            createdAt: new Date().toISOString()
        };

        students.push(newStudent);

        return res.status(201).json({
            status: "successful",
            message: "Student created successfully",
            student: newStudent
        });
    } catch (error) {
        next(error);
    }
};

const getStudents = (req, res, next) => {
    try {
        return res.status(200).json({
            status: "successful",
            students
        });
    } catch (error) {
        next(error);
    }
};

const getStudentById = (req, res, next) => {
    try {
        const studentId = Number(req.params.id);

        const student = students.find(
            (student) => student.id === studentId
        );

        if (!student) {
            return res.status(404).json({
                status: "error",
                message: "Student not found"
            });
        }

        // view profile
        if (
            req.user.role === "student" &&
            student.userId !== req.user.id
        ) {
            return res.status(403).json({
                status: "error",
                message: "You can only view your own profile"
            });
        }

        return res.status(200).json({
            status: "successful",
            student
        });
    } catch (error) {
        next(error);
    }
};

const updateStudent = (req, res, next) => {
    try {
        const studentId = Number(req.params.id);

        const student = students.find(
            (student) => student.id === studentId
        );

        if (!student) {
            return res.status(404).json({
                status: "error",
                message: "Student not found"
            });
        }

        const { name, email, phone, classId } = req.body;

        if (email && email !== student.email) {
            const existingStudent = students.find(
                (student) =>
                    student.email === email &&
                    student.id !== studentId
            );

            if (existingStudent) {
                return res.status(409).json({
                    status: "error",
                    message: "A student with this email already exists"
                });
            }
        }

        if (classId) {
            const existingClass = classes.find(
                (schoolClass) => schoolClass.id === Number(classId)
            );

            if (!existingClass) {
                return res.status(404).json({
                    status: "error",
                    message: "Class not found"
                });
            }

            student.classId = Number(classId);
        }

        if (name) student.name = name;
        if (email) student.email = email;
        if (phone) student.phone = phone;

        return res.status(200).json({
            status: "successful",
            message: "Student updated successfully",
            student
        });
    } catch (error) {
        next(error);
    }
};

const deleteStudent = (req, res, next) => {
    try {
        const studentId = Number(req.params.id);

        const studentIndex = students.findIndex(
            (student) => student.id === studentId
        );

        if (studentIndex === -1) {
            return res.status(404).json({
                status: "error",
                message: "Student not found"
            });
        }

        students.splice(studentIndex, 1);

        return res.status(200).json({
            status: "successful",
            message: "Student deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};