const { body } = require("express-validator");

exports.resumeGenerationValidation = [

    body("jobDescription")
        .trim()
        .notEmpty()
        .withMessage("Job description is required")

];

exports.atsValidation = [

    body("jobDescription")
        .trim()
        .notEmpty()
        .withMessage("Job description is required"),

    body("resumeData")
        .notEmpty()
        .withMessage("Resume data is required")

];

exports.coverLetterValidation = [

    body("jobDescription")
        .trim()
        .notEmpty()
        .withMessage("Job description is required")

];