const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const asyncHandler = require("../middleware/asyncHandler");
const validate = require("../middleware/validate");

const { success } = require("../utils/apiResponse");

const aiService = require("../services/aiService");

const {
    resumeGenerationValidation,
    atsValidation,
    coverLetterValidation,
} = require("../validators/aiValidator");


// ======================================
// Generate Resume
// POST /api/ai/generate-resume
// ======================================

router.post(
    "/generate-resume",
    authMiddleware,
    resumeGenerationValidation,
    validate,
    asyncHandler(async (req, res) => {

        const result = await aiService.generateResume(req.body);

        return success(
            res,
            result,
            "Resume generated successfully"
        );

    })
);


// ======================================
// Check ATS Score
// POST /api/ai/check-ats
// ======================================

router.post(
    "/check-ats",
    authMiddleware,
    atsValidation,
    validate,
    asyncHandler(async (req, res) => {

        const result = await aiService.checkATS(req.body);

        return success(
            res,
            result,
            "ATS score generated successfully"
        );

    })
);


// ======================================
// Generate Cover Letter
// POST /api/ai/generate-cover-letter
// ======================================

router.post(
    "/generate-cover-letter",
    authMiddleware,
    coverLetterValidation,
    validate,
    asyncHandler(async (req, res) => {

        const result = await aiService.generateCoverLetter(req.body);

        return success(
            res,
            result,
            "Cover letter generated successfully"
        );

    })
);

module.exports = router;