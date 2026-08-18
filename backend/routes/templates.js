const express = require("express");

const router = express.Router();

const Template = require("../models/Template");

const authMiddleware = require("../middleware/authMiddleware");
const asyncHandler = require("../middleware/asyncHandler");
const validate = require("../middleware/validate");

const { success, error } = require("../utils/apiResponse");

const {
    templateValidation,
} = require("../validators/templateValidator");


// ======================================
// Get All Active Templates
// GET /api/templates
// PUBLIC — no auth required
//
// Returns template metadata only.
// The actual React component design lives
// on the frontend — identified by templateType.
// ======================================

router.get(
    "/",
    asyncHandler(async (req, res) => {

        const templates = await Template.find({ isActive: true })
            .select("-htmlContent -__v")
            .sort({ createdAt: 1 });

        return success(
            res,
            templates,
            "Templates fetched successfully",
            200,
            { count: templates.length }
        );

    })
);


// ======================================
// Get Template By Slug
// GET /api/templates/:slug
// PUBLIC — no auth required
// ======================================

router.get(
    "/:slug",
    asyncHandler(async (req, res) => {

        const template = await Template.findOne({
            slug: req.params.slug,
            isActive: true,
        }).select("-htmlContent -__v");

        if (!template) {
            return error(res, "Template not found", 404);
        }

        return success(
            res,
            template,
            "Template fetched successfully"
        );

    })
);


// ======================================
// Create Template Metadata
// POST /api/templates
// Private — admin use only
//
// Stores ONLY template metadata.
// Do NOT store React component code or
// complete HTML/CSS in htmlContent.
// The frontend owns the visual design.
// ======================================

router.post(
    "/",
    authMiddleware,
    templateValidation,
    validate,
    asyncHandler(async (req, res) => {

        const {
            title,
            description,
            slug,
            templateType,
            category,
            thumbnail,
            config,
            tags,
            isPremium,
        } = req.body;

        // Check for duplicate slug
        const existing = await Template.findOne({ slug });
        if (existing) {
            return error(
                res,
                "A template with this slug already exists",
                409
            );
        }

        const template = await Template.create({
            title,
            description,
            slug,
            templateType,
            category,
            thumbnail,
            config,
            tags,
            isPremium,
            // htmlContent intentionally omitted —
            // new templates use React components
        });

        return success(
            res,
            template,
            "Template created successfully",
            201
        );

    })
);


// ======================================
// Update Template Metadata
// PUT /api/templates/:id
// Private — admin use only
// ======================================

router.put(
    "/:id",
    authMiddleware,
    asyncHandler(async (req, res) => {

        const {
            title,
            description,
            slug,
            templateType,
            category,
            thumbnail,
            config,
            tags,
            isPremium,
            isActive,
        } = req.body;

        const template = await Template.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                slug,
                templateType,
                category,
                thumbnail,
                config,
                tags,
                isPremium,
                isActive,
                // Never update htmlContent via this route
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!template) {
            return error(res, "Template not found", 404);
        }

        return success(
            res,
            template,
            "Template updated successfully"
        );

    })
);


// ======================================
// Delete Template
// DELETE /api/templates/:id
// Private — admin use only
// ======================================

router.delete(
    "/:id",
    authMiddleware,
    asyncHandler(async (req, res) => {

        const template = await Template.findByIdAndDelete(req.params.id);

        if (!template) {
            return error(res, "Template not found", 404);
        }

        return success(
            res,
            null,
            "Template deleted successfully"
        );

    })
);


module.exports = router;