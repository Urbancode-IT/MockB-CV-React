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
        title: "Portrait Profile",
        slug: "portrait-profile",
        templateType: "portrait-profile",
        description: "A one-page sidebar layout with a profile photo and aligned columns.",
        category: "modern",
        thumbnail: "/templates/portrait-profile.png",
        config: {
            layout: "two-column",
            accentColor: "#2A7A6D",
        },
        tags: ["photo", "sidebar", "one-page", "modern"],
        isActive: true,
        isPremium: false,
    },
    {
        title: "Structured Split",
        slug: "structured-split",
        templateType: "structured-split",
        description: "A two-column editorial layout that keeps every section on one A4 page.",
        category: "modern",
        thumbnail: "/templates/structured-split.png",
        config: {
            layout: "split",
            accentColor: "#8B3A3A",
        },
        tags: ["two-column", "compact", "one-page", "modern"],
        isActive: true,
        isPremium: false,
    },
    {
        title: "Centered Minimal",
        slug: "centered-minimal",
        templateType: "centered-minimal",
        description: "A centered header, light gray contact bar, and clean single-column ATS layout.",
        category: "professional",
        thumbnail: "/templates/centered-minimal.png",
        config: {
            layout: "single-column",
            accentColor: "#0E7490",
        },
        tags: ["professional", "ats", "centered", "one-page"],
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
