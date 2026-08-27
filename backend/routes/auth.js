const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("../models/User");

const { readToken } = require("../middleware/authMiddleware");
const asyncHandler = require("../middleware/asyncHandler");
const validate = require("../middleware/validate");

const { success, error } = require("../utils/apiResponse");

const {
    registerValidation,
    loginValidation,
} = require("../validators/authValidator");

const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");

const useCrossSiteCookies =
    process.env.NODE_ENV === "production" || Boolean(process.env.RENDER);

const cookieOptions = {
    httpOnly: true,
    secure: useCrossSiteCookies,
    sameSite: useCrossSiteCookies ? "none" : "lax",
    maxAge: 5 * 24 * 60 * 60 * 1000,
};

const userPayload = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
});


// ======================================
// Register
// POST /api/auth/register
// ======================================

router.post(
    "/register",
    registerValidation,
    validate,
    asyncHandler(async (req, res) => {

        const { name, email, password } = req.body;

        let user = await User.findOne({
            email: email.toLowerCase(),
        });

        if (user) {
            return error(res, "User already exists", 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        const token = generateToken(user._id);

        res.cookie("token", token, cookieOptions);

        return success(
            res,
            {
                token,
                user: userPayload(user),
            },
            "User registered successfully",
            201
        );

    })
);


// ======================================
// Login
// POST /api/auth/login
// ======================================

router.post(
    "/login",
    loginValidation,
    validate,
    asyncHandler(async (req, res) => {

        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if (!user) {
            return error(res, "Invalid email or password", 401);
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return error(res, "Invalid email or password", 401);
        }

        const token = generateToken(user._id);

        res.cookie("token", token, cookieOptions);

        return success(
            res,
            {
                token,
                user: userPayload(user),
            },
            "Login successful"
        );

    })
);


// ======================================
// Get Current User
// GET /api/auth/user
// ======================================

router.get(
    "/user",
    asyncHandler(async (req, res) => {
        const token = readToken(req);

        if (!token) {
            return success(res, null, "Not signed in");
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return success(res, null, "Not signed in");
        }

        const user = await User.findById(decoded.user.id).select("-password");

        if (!user) {
            return success(res, null, "Not signed in");
        }

        return success(
            res,
            userPayload(user),
            "User fetched successfully"
        );
    })
);


// ======================================
// Logout
// POST /api/auth/logout
// ======================================

router.post(
    "/logout",
    (req, res) => {

        res.clearCookie("token", cookieOptions);

        return success(
            res,
            null,
            "Logged out successfully"
        );

    }
);

module.exports = router;
