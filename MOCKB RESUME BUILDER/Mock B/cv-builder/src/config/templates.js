// ======================================
// Resume Template Configuration
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
        supportsPhoto: false,
    },
    {
        id: "portrait-profile",
        name: "Portrait Profile",
        category: "modern",
        description: "One-page sidebar layout with a profile photo.",
        accentColor: "#2A7A6D",
        layout: "two-column",
        tags: ["photo", "sidebar", "one-page"],
        supportsPhoto: true,
        onePage: true,
    },
    {
        id: "structured-split",
        name: "Structured Split",
        category: "modern",
        description: "Two-column editorial layout that fills one A4 page.",
        accentColor: "#8B3A3A",
        layout: "split",
        tags: ["two-column", "compact", "one-page"],
        supportsPhoto: false,
        onePage: true,
    },
    {
        id: "centered-minimal",
        name: "Centered Minimal",
        category: "professional",
        description: "Centered name, gray contact bar, and single-column ATS layout.",
        accentColor: "#0E7490",
        layout: "single",
        tags: ["ats", "centered", "one-page"],
        supportsPhoto: false,
        onePage: true,
    },
];

export const DEFAULT_TEMPLATE = "classic-professional";

const LEGACY_TEMPLATE_MAP = {
    "balanced-column": "classic-professional",
    "modern-professional": "classic-professional",
    "minimal-ats": "classic-professional",
    "executive": "portrait-profile",
    "creative-professional": "portrait-profile",
};

export const resolveTemplateId = (id) => {
    if (RESUME_TEMPLATES.some((t) => t.id === id)) return id;
    return LEGACY_TEMPLATE_MAP[id] || DEFAULT_TEMPLATE;
};

export const templateSupportsPhoto = (id) =>
    Boolean(RESUME_TEMPLATES.find((t) => t.id === resolveTemplateId(id))?.supportsPhoto);

export const getTemplateById = (id) =>
    RESUME_TEMPLATES.find((t) => t.id === resolveTemplateId(id)) || RESUME_TEMPLATES[0];

export const isTwoColumnTemplate = (id) => getTemplateById(id).layout === "two-column";

export const isOnePageTemplate = (id) => Boolean(getTemplateById(id).onePage);
