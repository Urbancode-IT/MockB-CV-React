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
        description: "Education-first one-page layout for internships and campus hiring.",
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
    {
        id: "role-frontend",
        name: "Frontend Developer",
        category: "role",
        description: "Chip-skill layout for React / UI engineers — unique from Classic.",
        accentColor: "#2563EB",
        layout: "single",
        tags: ["ats", "frontend", "react", "one-page", "role"],
        supportsPhoto: false,
        onePage: true,
    },
    {
        id: "role-backend",
        name: "Backend Developer",
        category: "role",
        description: "Dark header band and monospace titles for API / services roles.",
        accentColor: "#0F766E",
        layout: "single",
        tags: ["ats", "backend", "api", "one-page", "role"],
        supportsPhoto: false,
        onePage: true,
    },
    {
        id: "role-fullstack",
        name: "Full Stack Developer",
        category: "role",
        description: "Single-column accent layout for full-stack roles.",
        accentColor: "#0369A1",
        layout: "single",
        tags: ["fullstack", "ats", "one-page", "role"],
        supportsPhoto: false,
        onePage: true,
    },
    {
        id: "role-data-analyst",
        name: "Data Analyst",
        category: "role",
        description: "Centered ledger layout for SQL, dashboards, and insight roles.",
        accentColor: "#B45309",
        layout: "single",
        tags: ["ats", "data", "analyst", "one-page", "role"],
        supportsPhoto: false,
        onePage: true,
    },
    {
        id: "role-ux-designer",
        name: "UX Designer",
        category: "role",
        description: "Soft accent header and pill skills for product design roles.",
        accentColor: "#9D174D",
        layout: "single",
        tags: ["ux", "design", "figma", "one-page", "role"],
        supportsPhoto: false,
        onePage: true,
    },
    {
        id: "role-devops",
        name: "DevOps / Cloud",
        category: "role",
        description: "Technical badge layout for cloud, CI/CD, and platform roles.",
        accentColor: "#334155",
        layout: "single",
        tags: ["devops", "cloud", "aws", "one-page", "role"],
        supportsPhoto: false,
        onePage: true,
    },
    {
        id: "role-ml-engineer",
        name: "ML / AI Engineer",
        category: "role",
        description: "Academic serif header for ML, LLM, and applied AI roles.",
        accentColor: "#4C1D95",
        layout: "single",
        tags: ["ml", "ai", "python", "one-page", "role"],
        supportsPhoto: false,
        onePage: true,
    },
    {
        id: "role-product",
        name: "Product Manager",
        category: "role",
        description: "Name–role header row for product and growth PM resumes.",
        accentColor: "#0E7490",
        layout: "single",
        tags: ["product", "pm", "strategy", "one-page", "role"],
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
    'fresh-graduate': [
        'summary', 'experience', 'education', 'skills', 'projects', 'certifications',
        'languages', 'interests', 'courses', 'awards', 'organisations', 'publications',
        'references', 'declaration', 'custom',
    ],
    'campus-entry': [
        'summary', 'experience', 'education', 'skills', 'projects', 'certifications',
        'languages', 'interests', 'courses', 'awards', 'organisations', 'publications',
        'references', 'declaration', 'custom',
    ],
    'intern-banner': [
        'summary', 'experience', 'education', 'skills', 'projects', 'certifications',
        'languages', 'interests', 'courses', 'awards', 'organisations', 'publications',
        'references', 'declaration', 'custom',
    ],
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
    'role-frontend': [
        'summary', 'experience', 'education', 'skills', 'projects', 'certifications',
        'languages', 'interests', 'courses', 'awards', 'organisations', 'publications',
        'references', 'declaration', 'custom',
    ],
    'role-backend': [
        'summary', 'experience', 'education', 'skills', 'projects', 'certifications',
        'languages', 'interests', 'courses', 'awards', 'organisations', 'publications',
        'references', 'declaration', 'custom',
    ],
    'role-fullstack': [
        'summary', 'experience', 'education', 'skills', 'projects', 'certifications',
        'languages', 'interests', 'courses', 'awards', 'organisations', 'publications',
        'references', 'declaration', 'custom',
    ],
    'role-data-analyst': [
        'summary', 'experience', 'education', 'skills', 'projects', 'certifications',
        'languages', 'interests', 'courses', 'awards', 'organisations', 'publications',
        'references', 'declaration', 'custom',
    ],
    'role-ux-designer': [
        'summary', 'experience', 'education', 'skills', 'projects', 'certifications',
        'languages', 'interests', 'courses', 'awards', 'organisations', 'publications',
        'references', 'declaration', 'custom',
    ],
    'role-devops': [
        'summary', 'experience', 'education', 'skills', 'projects', 'certifications',
        'languages', 'interests', 'courses', 'awards', 'organisations', 'publications',
        'references', 'declaration', 'custom',
    ],
    'role-ml-engineer': [
        'summary', 'experience', 'education', 'skills', 'projects', 'certifications',
        'languages', 'interests', 'courses', 'awards', 'organisations', 'publications',
        'references', 'declaration', 'custom',
    ],
    'role-product': [
        'summary', 'experience', 'education', 'skills', 'projects', 'certifications',
        'languages', 'interests', 'courses', 'awards', 'organisations', 'publications',
        'references', 'declaration', 'custom',
    ],
};

export const getTemplateBodyOrder = (id) =>
    TEMPLATE_BODY_ORDER[resolveTemplateId(id)] || TEMPLATE_BODY_ORDER['classic-professional'];
