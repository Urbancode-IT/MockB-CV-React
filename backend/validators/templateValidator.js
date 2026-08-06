const { body } = require("express-validator");

exports.templateValidation = [

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Template title is required"),

    body("htmlContent")
        .trim()
        .notEmpty()
        .withMessage("HTML content is required"),

    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),

    body("tags")
        .optional()
        .isArray()
        .withMessage("Tags must be an array")

];