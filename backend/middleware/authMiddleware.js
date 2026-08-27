const jwt = require("jsonwebtoken");

const { error } = require("../utils/apiResponse");

const JWT_SECRET = process.env.JWT_SECRET;

function readToken(req) {
    const cookieToken = req.cookies?.token;
    const header = req.headers.authorization || "";
    const bearer = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
    return bearer || cookieToken || "";
}

module.exports = (req, res, next) => {
    try {
        const token = readToken(req);

        if (!token) {
            return error(
                res,
                "Authentication required. Please login.",
                401
            );
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch {
        return error(res, "Invalid or expired token", 401);
    }
};

module.exports.readToken = readToken;
