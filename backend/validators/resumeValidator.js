const { body } = require("express-validator");

exports.createResumeValidation = [

    body("title")

        .optional()

        .isString()

        .isLength({

            max:100

        }),

    body("data")

        .optional()

        .isObject()

];