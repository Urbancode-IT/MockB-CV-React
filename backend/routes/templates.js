const express = require("express");

const router = express.Router();

const Template = require("../models/Template");

const asyncHandler = require("../middleware/asyncHandler");
const validate = require("../middleware/validate");

const { success, error } = require("../utils/apiResponse");

const {
    templateValidation,
} = require("../validators/templateValidator");


// ======================================
// Get All Templates
// GET /api/templates
// ======================================

router.get(
    "/",
    asyncHandler(async (req, res) => {

        const templates = await Template.find().sort({
            createdAt: -1,
        });

        return success(
            res,
            templates,
            "Templates fetched successfully",
            200,
            {
                count: templates.length,
            }
        );

    })
);


// ======================================
// Get Template By ID
// GET /api/templates/:id
// ======================================

router.get(
    "/:id",
    asyncHandler(async (req, res) => {

        const template = await Template.findById(req.params.id);

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
// Create Template
// POST /api/templates
// (Protect with admin middleware later)
// ======================================

router.post(
    "/",
    templateValidation,
    validate,
    asyncHandler(async (req, res) => {

        const {
            title,
            description,
            htmlContent,
            tags,
        } = req.body;

        const template = await Template.create({
            title,
            description,
            htmlContent,
            tags,
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
// Update Template
// PUT /api/templates/:id
// ======================================

router.put(
    "/:id",
    templateValidation,
    validate,
    asyncHandler(async (req, res) => {

        const template = await Template.findByIdAndUpdate(
            req.params.id,
            req.body,
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
// ======================================

router.delete(
    "/:id",
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