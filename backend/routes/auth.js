const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("../models/User");

const authMiddleware = require("../middleware/authMiddleware");
const asyncHandler = require("../middleware/asyncHandler");
const validate = require("../middleware/validate");

const { success, error } = require("../utils/apiResponse");

const {
    registerValidation,
    loginValidation,
} = require("../validators/authValidator");

const generateToken = require("../utils/generateToken");

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 5 * 24 * 60 * 60 * 1000,
};


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
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
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
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
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
    authMiddleware,
    asyncHandler(async (req, res) => {

        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {
            return error(res, "User not found", 404);
        }

        return success(
            res,
            {
                id: user._id,
                name: user.name,
                email: user.email,
            },
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

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        return success(
            res,
            null,
            "Logged out successfully"
        );

    }
);

module.exports = router;
