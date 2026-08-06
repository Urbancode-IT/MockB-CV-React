
const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {

logger.error(err);
    let statusCode = err.statusCode || 500;

    let message = err.message || "Internal Server Error";

    if (err.name === "CastError") {

        statusCode = 404;

        message = "Resource not found";

    }

    if (err.code === 11000) {

        statusCode = 400;

        message = "Duplicate value entered";

    }

    if (err.name === "ValidationError") {

        statusCode = 400;

        message = Object.values(err.errors)
            .map(e => e.message)
            .join(", ");

    }

    res.status(statusCode).json({

        success: false,

        message

    });

};