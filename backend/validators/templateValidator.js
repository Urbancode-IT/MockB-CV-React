const { body } = require("express-validator");


// ======================================
// Template Validation
// ======================================

const templateValidation = [

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Template title is required")
        .isLength({ max: 100 })
        .withMessage("Template title cannot exceed 100 characters"),


    body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),


    body("slug")
        .trim()
        .notEmpty()
        .withMessage("Template slug is required")
        .matches(/^[a-z0-9-]+$/)
        .withMessage(
            "Slug can only contain lowercase letters, numbers and hyphens"
        ),


    body("templateType")
        .trim()
        .notEmpty()
        .withMessage("Template type is required"),


    body("category")
        .optional()
        .isIn([
            "professional",
            "modern",
            "creative",
            "minimal",
            "ats",
        ])
        .withMessage("Invalid template category"),


    body("thumbnail")
        .optional()
        .isString()
        .withMessage("Thumbnail must be a string"),


    body("config")
        .optional()
        .isObject()
        .withMessage("Config must be an object"),


    body("tags")
        .optional()
        .isArray()
        .withMessage("Tags must be an array"),


    body("isPremium")
        .optional()
        .isBoolean()
        .withMessage("isPremium must be a boolean"),

];


module.exports = {
    templateValidation,
};