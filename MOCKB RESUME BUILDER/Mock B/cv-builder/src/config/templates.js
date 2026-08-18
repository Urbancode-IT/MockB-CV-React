// ======================================
// Resume Template Configuration
//
// This is the single source of truth for
// all available resume templates.
//
// To add a new template:
// 1. Add an entry here
// 2. Create the React component in ./components/resume/templates/
// 3. Add it to ResumeTemplateRenderer.jsx templateMap
// 4. Add the id to ALLOWED_TEMPLATES in the backend
// ======================================

export const RESUME_TEMPLATES = [
    {
        id: "classic-professional",
        name: "Classic Professional",
        category: "professional",
        description: "Clean, timeless single-column layout. ATS-friendly.",
        accentColor: "#1A3A5C",
        layout: "single",
        tags: ["ats", "professional", "clean"],
    },
    {
        id: "modern-professional",
        name: "Modern Professional",
        category: "modern",
        description: "Sleek two-column layout with sidebar. Modern look.",
        accentColor: "#2563EB",
        layout: "two-column",
        tags: ["modern", "sidebar", "professional"],
    },
    {
        id: "minimal-ats",
        name: "Minimal ATS",
        category: "ats",
        description: "Ultra-clean, ATS-optimized. Zero design distractions.",
        accentColor: "#374151",
        layout: "single",
        tags: ["ats", "minimal", "simple"],
    },
    {
        id: "executive",
        name: "Executive",
        category: "professional",
        description: "Bold dark header and refined typography. For senior professionals.",
        accentColor: "#0F172A",
        layout: "single",
        tags: ["executive", "premium", "bold"],
    },
    {
        id: "creative-professional",
        name: "Creative Professional",
        category: "creative",
        description: "Vibrant two-column with color sidebar. Perfect for creative roles.",
        accentColor: "#7C3AED",
        layout: "two-column",
        tags: ["creative", "colorful", "sidebar"],
    },
];

// Default template used when none is specified
export const DEFAULT_TEMPLATE = "classic-professional";

// For quick lookup by id
export const getTemplateById = (id) =>
    RESUME_TEMPLATES.find((t) => t.id === id) || RESUME_TEMPLATES[0];
