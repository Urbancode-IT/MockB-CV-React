const express = require("express");

const router = express.Router();

const Resume = require("../models/Resume");

const authMiddleware = require("../middleware/authMiddleware");
const asyncHandler = require("../middleware/asyncHandler");
const validate = require("../middleware/validate");

const { success, error } = require("../utils/apiResponse");

const {
    createResumeValidation,
    ALLOWED_TEMPLATES,
} = require("../validators/resumeValidator");


// ======================================
// Get All Resumes
// GET /api/resumes
// Private — requires auth cookie
// ======================================

router.get(
    "/",
    authMiddleware,
    asyncHandler(async (req, res) => {

        const resumes = await Resume.find({
            user: req.user.id,
        })
            .select("_id title template createdAt updatedAt")
            .sort({ createdAt: -1 });

        return success(
            res,
            resumes,
            "Resumes fetched successfully",
            200,
            { count: resumes.length }
        );

    })
);


// ======================================
// Get Resume By ID
// GET /api/resumes/:id
// Private — requires auth cookie
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
// Private — requires auth cookie
//
// Body: { title, template, data }
// ======================================

router.post(
    "/",
    authMiddleware,
    createResumeValidation,
    validate,
    asyncHandler(async (req, res) => {

        const { title, template, data } = req.body;

        // Security: validate template against allowed list
        // (belt-and-suspenders in addition to validator)
        if (template && !ALLOWED_TEMPLATES.includes(template)) {
            return error(
                res,
                `Invalid resume template. Allowed values: ${ALLOWED_TEMPLATES.join(", ")}`,
                400
            );
        }

        const resume = await Resume.create({
            user: req.user.id,
            title: title || "Untitled Resume",
            template: template || "classic-professional",
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
// Private — requires auth cookie
//
// Body: { title?, template?, data? }
// NOTE: Changing `template` does NOT change `data`.
//       The same resume content appears in the new design.
// ======================================

router.put(
    "/:id",
    authMiddleware,
    createResumeValidation,
    validate,
    asyncHandler(async (req, res) => {

        const { title, template, data } = req.body;

        // Security: validate template against allowed list
        if (template && !ALLOWED_TEMPLATES.includes(template)) {
            return error(
                res,
                `Invalid resume template. Allowed values: ${ALLOWED_TEMPLATES.join(", ")}`,
                400
            );
        }

        // Build update object — only update fields that were sent
        const updateFields = {};
        if (title !== undefined) updateFields.title = title;
        if (template !== undefined) updateFields.template = template;
        if (data !== undefined) updateFields.data = data;

        const resume = await Resume.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id,
            },
            updateFields,
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
// Private — requires auth cookie
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