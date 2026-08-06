const express = require("express");

const router = express.Router();

const Resume = require("../models/Resume");

const authMiddleware = require("../middleware/authMiddleware");
const asyncHandler = require("../middleware/asyncHandler");
const validate = require("../middleware/validate");

const { success, error } = require("../utils/apiResponse");

const {
    createResumeValidation,
} = require("../validators/resumeValidator");


// ======================================
// Get All Resumes
// GET /api/resumes
// ======================================

router.get(
    "/",
    authMiddleware,
    asyncHandler(async (req, res) => {

        const resumes = await Resume.find({
            user: req.user.id,
        }).sort({
            createdAt: -1,
        });

        return success(
            res,
            resumes,
            "Resumes fetched successfully",
            200,
            {
                count: resumes.length,
            }
        );

    })
);


// ======================================
// Get Resume By ID
// GET /api/resumes/:id
// ======================================

router.get(
    "/:id",
    authMiddleware,
    asyncHandler(async (req, res) => {

        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!resume) {
            return error(res, "Resume not found", 404);
        }

        return success(
            res,
            resume,
            "Resume fetched successfully"
        );

    })
);


// ======================================
// Create Resume
// POST /api/resumes
// ======================================

router.post(
    "/",
    authMiddleware,
    createResumeValidation,
    validate,
    asyncHandler(async (req, res) => {

        const { title, data } = req.body;

        const resume = await Resume.create({
            user: req.user.id,
            title: title || "Untitled Resume",
            data: data || {},
        });

        return success(
            res,
            resume,
            "Resume created successfully",
            201
        );

    })
);


// ======================================
// Update Resume
// PUT /api/resumes/:id
// ======================================

router.put(
    "/:id",
    authMiddleware,
    createResumeValidation,
    validate,
    asyncHandler(async (req, res) => {

        const { title, data } = req.body;

        const resume = await Resume.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id,
            },
            {
                title,
                data,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!resume) {
            return error(res, "Resume not found", 404);
        }

        return success(
            res,
            resume,
            "Resume updated successfully"
        );

    })
);


// ======================================
// Delete Resume
// DELETE /api/resumes/:id
// ======================================

router.delete(
    "/:id",
    authMiddleware,
    asyncHandler(async (req, res) => {

        const resume = await Resume.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!resume) {
            return error(res, "Resume not found", 404);
        }

        return success(
            res,
            null,
            "Resume deleted successfully"
        );

    })
);

module.exports = router;