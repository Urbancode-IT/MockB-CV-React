const { body } = require("express-validator");

exports.portfolioValidation = [

    body("title")

        .optional()

        .isString(),

    body("data")

        .optional()

        .isObject()

];