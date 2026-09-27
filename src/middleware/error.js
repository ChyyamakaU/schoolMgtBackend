/* eslint-disable no-undef */
const errorHandler = (err, req, res) => {
    console.error(err.stack);

    return res.status(500).json({
        status: "error",
        message: "Something went wrong on the server"
    });
};

module.exports = errorHandler;