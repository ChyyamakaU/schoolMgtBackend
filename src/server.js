/* eslint-disable no-undef */
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.on("close", () => {
    console.log("SERVER WAS CLOSED");
});

server.on("error", (error) => {
    console.error("SERVER ERROR:", error);
});