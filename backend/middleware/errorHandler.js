const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
    logger.error(err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Don't leak raw Google API JSON blobs to the client
    if (typeof message === "string" && message.trim().startsWith("{")) {
        try {
            const parsed = JSON.parse(message);
            message = parsed?.error?.message || "AI service error";
            if (parsed?.error?.details?.[0]?.reason === "API_KEY_INVALID") {
                statusCode = 503;
                message =
                    "Invalid Gemini API key. Update GEMINI_API_KEY in backend/.env";
            }
        } catch {
            message = "AI service error";
        }
    }

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
            .map((e) => e.message)
            .join(", ");
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
};
