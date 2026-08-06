const { body } = require("express-validator");

exports.coverLetterValidation = [

    body("title")

        .optional()

        .isString(),

    body("content")

        .optional()

        .isString(),

    body("company")

        .optional()

        .isString(),

    body("jobTitle")

        .optional()

        .isString()

];