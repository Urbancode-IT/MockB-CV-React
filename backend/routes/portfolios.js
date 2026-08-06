const express = require("express");

const router = express.Router();

const Portfolio = require("../models/Portfolio");

const authMiddleware = require("../middleware/authMiddleware");
const asyncHandler = require("../middleware/asyncHandler");
const validate = require("../middleware/validate");

const { success, error } = require("../utils/apiResponse");

const {
    portfolioValidation,
} = require("../validators/portfolioValidator");


// ======================================
// Get All Portfolios
// GET /api/portfolios
// ======================================

router.get(
    "/",
    authMiddleware,
    asyncHandler(async (req, res) => {

        const portfolios = await Portfolio.find({
            user: req.user.id,
        }).sort({
            createdAt: -1,
        });

        return success(
            res,
            portfolios,
            "Portfolios fetched successfully",
            200,
            {
                count: portfolios.length,
            }
        );

    })
);


// ======================================
// Get Portfolio By ID
// GET /api/portfolios/:id
// ======================================

router.get(
    "/:id",
    authMiddleware,
    asyncHandler(async (req, res) => {

        const portfolio = await Portfolio.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!portfolio) {
            return error(res, "Portfolio not found", 404);
        }

        return success(
            res,
            portfolio,
            "Portfolio fetched successfully"
        );

    })
);


// ======================================
// Create Portfolio
// POST /api/portfolios
// ======================================

router.post(
    "/",
    authMiddleware,
    portfolioValidation,
    validate,
    asyncHandler(async (req, res) => {

        const { title, data } = req.body;

        const portfolio = await Portfolio.create({

            user: req.user.id,

            title: title || "My Portfolio",

            data: data || {},

        });

        return success(
            res,
            portfolio,
            "Portfolio created successfully",
            201
        );

    })
);


// ======================================
// Update Portfolio
// PUT /api/portfolios/:id
// ======================================

router.put(
    "/:id",
    authMiddleware,
    portfolioValidation,
    validate,
    asyncHandler(async (req, res) => {

        const { title, data } = req.body;

        const portfolio = await Portfolio.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id,
            },
            {
                title,
                data,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!portfolio) {
            return error(res, "Portfolio not found", 404);
        }

        return success(
            res,
            portfolio,
            "Portfolio updated successfully"
        );

    })
);


// ======================================
// Delete Portfolio
// DELETE /api/portfolios/:id
// ======================================

router.delete(
    "/:id",
    authMiddleware,
    asyncHandler(async (req, res) => {

        const portfolio = await Portfolio.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!portfolio) {
            return error(res, "Portfolio not found", 404);
        }

        return success(
            res,
            null,
            "Portfolio deleted successfully"
        );

    })
);

module.exports = router;