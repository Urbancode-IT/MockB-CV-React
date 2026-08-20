const { body } = require("express-validator");

// ======================================
// Allowed Templates
// Must stay in sync with Resume model
// ======================================

const ALLOWED_TEMPLATES = [
    "classic-professional",
    "portrait-profile",
    "structured-split",
    "centered-minimal",
    "balanced-column",
    "modern-professional",
    "minimal-ats",
    "executive",
    "creative-professional",
    "elegant",
    "corporate",
    "clean-resume",
];


// ======================================
// Create / Update Resume Validation
// ======================================

exports.createResumeValidation = [

    body("title")
        .optional()
        .isString()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters"),

    body("template")
        .optional()
        .isString()
        .isIn(ALLOWED_TEMPLATES)
        .withMessage(
            `Invalid template. Allowed: ${ALLOWED_TEMPLATES.join(", ")}`
        ),

    body("data")
        .optional()
        .isObject()
        .withMessage("Resume data must be an object"),

];

exports.ALLOWED_TEMPLATES = ALLOWED_TEMPLATES;