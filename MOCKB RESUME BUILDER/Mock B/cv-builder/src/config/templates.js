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
        tags: ["ats", "professional", "clean", "one-page"],
        supportsPhoto: false,
        onePage: true,
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
    {
        id: "fresh-graduate",
        name: "Starter Profile",
        category: "fresher",
        description: "One-page photo header with split dates — made for internships and first jobs.",
        accentColor: "#111111",
        layout: "single",
        tags: ["fresher", "photo", "internship", "one-page"],
        supportsPhoto: true,
        onePage: true,
    },
    {
        id: "campus-entry",
        name: "Campus Entry",
        category: "fresher",
        description: "Education-first one-page layout with a side accent for internships.",
        accentColor: "#1F4E5F",
        layout: "single",
        tags: ["fresher", "campus", "internship", "one-page"],
        supportsPhoto: false,
        onePage: true,
    },
    {
        id: "intern-banner",
        name: "Intern Banner",
        category: "fresher",
        description: "Color header, circular photo, and skill tags for a first-job resume.",
        accentColor: "#3730A3",
        layout: "single",
        tags: ["fresher", "photo", "internship", "one-page"],
        supportsPhoto: true,
        onePage: true,
    },
    {
        id: "career-detail",
        name: "Career Detail",
        category: "professional",
        description: "Two-page single-column resume in black and gray. Edit Page 1 and Page 2 separately.",
        accentColor: "#111111",
        layout: "single",
        tags: ["ats", "two-page", "professional", "mid-career"],
        supportsPhoto: false,
        onePage: false,
        maxPages: 2,
    },
    {
        id: "north-shore",
        name: "North Shore",
        category: "modern",
        description: "Two-page teal ledger with a serif header and dated entries. Distinct from Career Detail.",
        accentColor: "#0F4C5C",
        layout: "single",
        tags: ["ats", "two-page", "modern", "teal"],
        supportsPhoto: false,
        onePage: false,
        maxPages: 2,
    },
    {
        id: "gold-rule",
        name: "Gold Rule",
        category: "professional",
        description: "Two-page gold-and-black letter: spaced headings, profile, competencies, then skills and experience.",
        accentColor: "#C9A227",
        layout: "single",
        tags: ["ats", "two-page", "professional", "gold"],
        supportsPhoto: false,
        onePage: false,
        maxPages: 2,
    },
];

export const DEFAULT_TEMPLATE = "classic-professional";

const LEGACY_TEMPLATE_MAP = {
    "balanced-column": "classic-professional",
    "modern-professional": "classic-professional",
    "minimal-ats": "classic-professional",
    "executive": "portrait-profile",
    "creative-professional": "portrait-profile",
    "research-track": "career-detail",
};

export const resolveTemplateId = (id) => {
    if (RESUME_TEMPLATES.some((t) => t.id === id)) return id;
    return LEGACY_TEMPLATE_MAP[id] || DEFAULT_TEMPLATE;
};

export const templateSupportsPhoto = (id) =>
    Boolean(RESUME_TEMPLATES.find((t) => t.id === resolveTemplateId(id))?.supportsPhoto);

export const getTemplateById = (id) =>
    RESUME_TEMPLATES.find((t) => t.id === resolveTemplateId(id)) || RESUME_TEMPLATES[0];

export const isTwoColumnTemplate = (id) => {
    const layout = getTemplateById(id).layout;
    return layout === 'two-column' || layout === 'split';
};

export const isOnePageTemplate = (id) => getTemplateById(id).onePage !== false;

export const getTemplateMaxPages = (id) => {
    const meta = getTemplateById(id);
    // Content may spill across as many sheets as needed (soft-capped in pageLayout).
    return Math.max(meta.maxPages || 2, 12);
};

export const TEMPLATE_BODY_ORDER = {
    'classic-professional': [
        'summary', 'experience', 'education', 'skills', 'projects', 'certifications',
        'languages', 'interests', 'courses', 'awards', 'organisations', 'publications',
        'references', 'declaration', 'custom',
    ],
    'centered-minimal': [
        'summary', 'experience', 'education', 'skills', 'projects', 'certifications',
        'languages', 'interests', 'courses', 'awards', 'organisations', 'publications',
        'references', 'declaration', 'custom',
    ],
    'fresh-graduate': ['summary', 'education', 'experience', 'skills', 'projects', 'references'],
    'campus-entry': ['summary', 'education', 'experience', 'skills', 'projects', 'interests'],
    'intern-banner': ['summary', 'education', 'experience', 'skills', 'certifications', 'projects', 'interests', 'courses', 'awards', 'organisations'],
    'career-detail': [
        'summary', 'experience', 'education', 'skills', 'projects', 'certifications',
        'languages', 'interests', 'courses', 'awards', 'organisations', 'publications',
        'references', 'declaration', 'custom',
    ],
    'north-shore': [
        'summary', 'experience', 'education', 'skills', 'projects', 'certifications',
        'languages', 'interests', 'courses', 'awards', 'organisations', 'publications',
        'references', 'declaration', 'custom',
    ],
    'gold-rule': [
        'summary', 'experience', 'education', 'skills', 'projects', 'certifications',
        'languages', 'interests', 'awards', 'organisations', 'publications',
        'references', 'declaration', 'custom',
    ],
};

export const getTemplateBodyOrder = (id) =>
    TEMPLATE_BODY_ORDER[resolveTemplateId(id)] || TEMPLATE_BODY_ORDER['classic-professional'];
