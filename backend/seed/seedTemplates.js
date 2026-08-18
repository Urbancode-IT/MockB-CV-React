require("dotenv").config();

const connectDB = require("../config/db");
const Template = require("../models/Template");
const logger = require("../utils/logger");


// ======================================
// Template Metadata Seed
//
// Seeds the 5 core resume templates.
// NOTE: Only metadata is stored in MongoDB.
//       The actual visual designs live as
//       React components on the frontend.
//       templateType maps to the frontend component.
// ======================================

const templates = [
    {
        title: "Classic Professional",
        slug: "classic-professional",
        templateType: "classic-professional",
        description: "A clean, timeless single-column layout. ATS-friendly and perfect for traditional industries.",
        category: "professional",
        thumbnail: "/templates/classic-professional.png",
        config: {
            layout: "single-column",
            accentColor: "#1A3A5C",
        },
        tags: ["professional", "ats", "clean", "single-column"],
        isActive: true,
        isPremium: false,
    },
    {
        title: "Modern Professional",
        slug: "modern-professional",
        templateType: "modern-professional",
        description: "A sleek two-column layout with a sidebar for skills and contact. Perfect for modern industries.",
        category: "modern",
        thumbnail: "/templates/modern-professional.png",
        config: {
            layout: "two-column",
            accentColor: "#2563EB",
        },
        tags: ["modern", "two-column", "professional", "sidebar"],
        isActive: true,
        isPremium: false,
    },
    {
        title: "Minimal ATS",
        slug: "minimal-ats",
        templateType: "minimal-ats",
        description: "Ultra-clean, ATS-optimized layout. No design distractions — just your content.",
        category: "ats",
        thumbnail: "/templates/minimal-ats.png",
        config: {
            layout: "single-column",
            accentColor: "#374151",
        },
        tags: ["ats", "minimal", "clean", "simple"],
        isActive: true,
        isPremium: false,
    },
    {
        title: "Executive",
        slug: "executive",
        templateType: "executive",
        description: "A premium executive resume with a bold dark header and refined typography. Built for senior professionals.",
        category: "professional",
        thumbnail: "/templates/executive.png",
        config: {
            layout: "single-column",
            accentColor: "#0F172A",
        },
        tags: ["executive", "premium", "professional", "bold"],
        isActive: true,
        isPremium: false,
    },
    {
        title: "Creative Professional",
        slug: "creative-professional",
        templateType: "creative-professional",
        description: "A vibrant two-column layout with a color sidebar. Ideal for creative roles.",
        category: "creative",
        thumbnail: "/templates/creative-professional.png",
        config: {
            layout: "two-column",
            accentColor: "#7C3AED",
        },
        tags: ["creative", "two-column", "colorful", "sidebar"],
        isActive: true,
        isPremium: false,
    },
];


const seed = async () => {

    try {

        await connectDB();

        logger.info("🌱 Seeding template metadata...");

        for (const tmpl of templates) {

            const existing = await Template.findOne({ slug: tmpl.slug });

            if (existing) {
                // Update metadata but never touch htmlContent
                await Template.findByIdAndUpdate(
                    existing._id,
                    {
                        title: tmpl.title,
                        description: tmpl.description,
                        templateType: tmpl.templateType,
                        category: tmpl.category,
                        thumbnail: tmpl.thumbnail,
                        config: tmpl.config,
                        tags: tmpl.tags,
                        isActive: tmpl.isActive,
                        isPremium: tmpl.isPremium,
                    },
                    { runValidators: true }
                );
                logger.info(`✅ Updated: ${tmpl.title}`);

            } else {

                await Template.create(tmpl);
                logger.info(`✅ Created: ${tmpl.title}`);

            }

        }

        logger.info("🎉 Template seed complete.");
        process.exit(0);

    } catch (err) {

        logger.error("❌ Seed failed:", err);
        process.exit(1);

    }

};

seed();
