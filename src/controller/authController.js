/* eslint-disable no-undef */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = require("../../database/user");

const registerNew = async (req, res, next) => {
try {
const { fullName, email, phone, password, role } = req.body;

    const existingUser = users.find(
        (user) => user.email === email
    );

    if (existingUser) {
        return res.status(409).json({
            status: "error",
            message: "This email already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(
        password,
        Number(process.env.SALT_ROUNDS)
    );

    const newUser = {
        id: users.length + 1,
        fullName,
        email,
        phone,
        password: hashedPassword,
        role
    };

    users.push(newUser);

    return res.status(201).json({
        status: "successful",
        message: "You have registered successfully"
    });
} catch (error) {
    next(error);
}


};

const loginUser = async (req, res, next) => {
try {
const { email, password } = req.body;


    const existingUser = users.find(
        (user) => user.email === email
    );

    if (!existingUser) {
        return res.status(401).json({
            status: "error",
            message: "Invalid email or password"
        });
    }

    const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
    );

    if (!passwordMatch) {
        return res.status(401).json({
            status: "error",
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign(
        {
            id: existingUser.id,
            role: existingUser.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    return res.status(200).json({
        status: "successful",
        message: "You have been successfully logged in",
        token
    });
} catch (error) {
    next(error);
}

};

module.exports = {
registerNew,
loginUser
};
