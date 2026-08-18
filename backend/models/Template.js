const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
    {
        // ======================================
        // Template Name
        // ======================================

        title: {
            type: String,
            required: true,
            trim: true,
        },


        // ======================================
        // Template Description
        // ======================================

        description: {
            type: String,
            default: "",
            trim: true,
        },


        // ======================================
        // Unique Template Slug
        // Example: flow-cv
        // ======================================

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },


        // ======================================
        // React Template Type
        // Example:
        // flow-cv
        // enhance-cv
        // modern-cv
        // ======================================

        templateType: {
            type: String,
            required: true,
            trim: true,
        },


        // ======================================
        // Template Category
        // ======================================

        category: {
            type: String,

            enum: [
                "professional",
                "modern",
                "creative",
                "minimal",
                "ats",
            ],

            default: "professional",
        },


        // ======================================
        // Template Preview Image
        // ======================================

        thumbnail: {
            type: String,
            default: "",
        },


        // ======================================
        // Template Design Configuration
        // ======================================

        config: {
            type: mongoose.Schema.Types.Mixed,

            default: {},
        },


        // ======================================
        // Template Tags
        // ======================================

        tags: [
            {
                type: String,
                trim: true,
            },
        ],


        // ======================================
        // Active / Inactive
        // ======================================

        isActive: {
            type: Boolean,
            default: true,
        },


        // ======================================
        // Premium Template
        // ======================================

        isPremium: {
            type: Boolean,
            default: false,
        },


        // ======================================
        // OLD HTML CONTENT
        // ======================================
        // Keep this temporarily if old templates
        // are already using it.
        //
        // New React templates should NOT use this.
        // ======================================

        htmlContent: {
            type: String,
            default: "",
        },
    },

    {
        timestamps: true,
    }
);


module.exports = mongoose.model(
    "Template",
    templateSchema
);