const jwt = require("jsonwebtoken");

const { error } = require("../utils/apiResponse");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {

    try {

        // Read token from HttpOnly Cookie
        const token = req.cookies.token;

        if (!token) {
            return error(
                res,
                "Authentication required. Please login.",
                401
            );
        }

        // Verify JWT
        const decoded = jwt.verify(
            token,
            JWT_SECRET
        );

        req.user = decoded.user;

        next();

    }

    catch (err) {

        return error(
            res,
            "Invalid or expired token",
            401
        );

    }

};