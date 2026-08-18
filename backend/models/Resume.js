const mongoose = require("mongoose");

// ======================================
// Allowed Template Identifiers
// These must match the frontend template map
// ======================================

const ALLOWED_TEMPLATES = [
    "classic-professional",
    "modern-professional",
    "minimal-ats",
    "executive",
    "creative-professional",
    "elegant",
    "corporate",
    "clean-resume",
];

const resumeSchema = new mongoose.Schema(
    {
        // ======================================
        // Owner
        // ======================================

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },


        // ======================================
        // Resume Title
        // ======================================

        title: {
            type: String,
            default: "Untitled Resume",
            trim: true,
        },


        // ======================================
        // Template Identifier
        // Maps to a React component on the frontend.
        // The actual visual design lives in the frontend.
        // MongoDB only stores the identifier string.
        // ======================================

        template: {
            type: String,
            required: true,
            default: "classic-professional",
            enum: {
                values: ALLOWED_TEMPLATES,
                message: "Invalid resume template: {VALUE}",
            },
        },


        // ======================================
        // Resume Content Data
        // All user-entered content is stored here.
        // This same data object is passed to every
        // frontend template component as props.
        // ======================================

        data: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);


// Export the allowed templates list so routes can use it
resumeSchema.statics.ALLOWED_TEMPLATES = ALLOWED_TEMPLATES;

module.exports = mongoose.model("Resume", resumeSchema);