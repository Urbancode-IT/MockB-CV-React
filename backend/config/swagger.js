const swaggerJsdoc = require("swagger-jsdoc");

module.exports = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MockB Resume Builder API",
            version: "1.0.0",
        },
    },
    apis: ["./routes/*.js"],
});