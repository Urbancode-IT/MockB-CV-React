const express = require("express");

const router = express.Router();

const CoverLetter = require("../models/CoverLetter");

const authMiddleware = require("../middleware/authMiddleware");
const asyncHandler = require("../middleware/asyncHandler");
const validate = require("../middleware/validate");

const { success, error } = require("../utils/apiResponse");

const {
    coverLetterValidation,
} = require("../validators/coverLetterValidator");


// ======================================
// Get All Cover Letters
// GET /api/coverLetters
// ======================================

router.get(
    "/",
    authMiddleware,
    asyncHandler(async (req, res) => {

        const coverLetters = await CoverLetter.find({
            user: req.user.id,
        }).sort({
            createdAt: -1,
        });

        return success(
            res,
            coverLetters,
            "Cover Letters fetched successfully",
            200,
            {
                count: coverLetters.length,
            }
        );

    })
);


// ======================================
// Get Cover Letter By ID
// GET /api/coverLetters/:id
// ======================================

router.get(
    "/:id",
    authMiddleware,
    asyncHandler(async (req, res) => {

        const coverLetter = await CoverLetter.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!coverLetter) {
            return error(res, "Cover Letter not found", 404);
        }

        return success(
            res,
            coverLetter,
            "Cover Letter fetched successfully"
        );

    })
);


// ======================================
// Create Cover Letter
// POST /api/coverLetters
// ======================================

router.post(
    "/",
    authMiddleware,
    coverLetterValidation,
    validate,
    asyncHandler(async (req, res) => {

        const {
            title,
            content,
            company,
            jobTitle,
        } = req.body;

        const coverLetter = await CoverLetter.create({

            user: req.user.id,

            title: title || "Untitled Cover Letter",

            content: content || "",

            company: company || "",

            jobTitle: jobTitle || "",

        });

        return success(
            res,
            coverLetter,
            "Cover Letter created successfully",
            201
        );

    })
);


// ======================================
// Update Cover Letter
// PUT /api/coverLetters/:id
// ======================================

router.put(
    "/:id",
    authMiddleware,
    coverLetterValidation,
    validate,
    asyncHandler(async (req, res) => {

        const {
            title,
            content,
            company,
            jobTitle,
        } = req.body;

        const coverLetter = await CoverLetter.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id,
            },
            {
                title,
                content,
                company,
                jobTitle,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!coverLetter) {
            return error(res, "Cover Letter not found", 404);
        }

        return success(
            res,
            coverLetter,
            "Cover Letter updated successfully"
        );

    })
);


// ======================================
// Delete Cover Letter
// DELETE /api/coverLetters/:id
// ======================================

router.delete(
    "/:id",
    authMiddleware,
    asyncHandler(async (req, res) => {

        const coverLetter = await CoverLetter.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!coverLetter) {
            return error(res, "Cover Letter not found", 404);
        }

        return success(
            res,
            null,
            "Cover Letter deleted successfully"
        );

    })
);

module.exports = router;