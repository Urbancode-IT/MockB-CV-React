/** Content fields accepted by Upload JSON (form data only — not design/layout). */
export const RESUME_JSON_CONTENT_KEYS = [
    'personal',
    'summary',
    'experience',
    'education',
    'skills',
    'projects',
    'certifications',
    'languages',
    'interests',
    'courses',
    'awards',
    'organisations',
    'publications',
    'references',
    'declaration',
    'custom',
    'profileBullets',
    'competencies',
];

const PERSONAL_KEYS = [
    'name',
    'jobTitle',
    'email',
    'phone',
    'location',
    'website',
    'linkedin',
    'github',
];

const cleanValue = (value) => {
    if (value == null) return undefined;
    if (typeof value === 'string') {
        const trimmed = value.trim();
        return trimmed === '' ? undefined : trimmed;
    }
    if (Array.isArray(value)) {
        const next = value
            .map((item) => {
                if (item == null) return null;
                if (typeof item !== 'object') return cleanValue(item);
                const obj = {};
                Object.entries(item).forEach(([key, val]) => {
                    if (key === 'id') return;
                    const cleaned = cleanValue(val);
                    if (cleaned !== undefined) obj[key] = cleaned;
                });
                return Object.keys(obj).length ? obj : null;
            })
            .filter(Boolean);
        return next.length ? next : undefined;
    }
    if (typeof value === 'object') {
        const obj = {};
        Object.entries(value).forEach(([key, val]) => {
            const cleaned = cleanValue(val);
            if (cleaned !== undefined) obj[key] = cleaned;
        });
        return Object.keys(obj).length ? obj : undefined;
    }
    return value;
};

/**
 * Build import JSON that mirrors the current resume content exactly
 * (no design, pagination, or UI-only fields).
 */
export const toResumeImportJson = (resumeData = {}) => {
    const out = {};

    const personal = resumeData.personal || {};
    const personalOut = {};
    PERSONAL_KEYS.forEach((key) => {
        const cleaned = cleanValue(personal[key]);
        if (cleaned !== undefined) personalOut[key] = cleaned;
    });
    if (Object.keys(personalOut).length) out.personal = personalOut;

    const summary = cleanValue(resumeData.summary);
    if (summary !== undefined) out.summary = summary;

    RESUME_JSON_CONTENT_KEYS.forEach((key) => {
        if (key === 'personal' || key === 'summary') return;
        const cleaned = cleanValue(resumeData[key]);
        if (cleaned !== undefined) out[key] = cleaned;
    });

    return out;
};

export const resumeImportJsonString = (resumeData, space = 2) =>
    JSON.stringify(toResumeImportJson(resumeData), null, space);

/**
 * Prompt users can paste into ChatGPT / Claude / etc. with the schema pattern.
 */
export const buildAiResumeJsonPrompt = (resumeData) => {
    const example = resumeImportJsonString(resumeData, 2);
    return `You are helping me fill a resume for MockB CV.

Return ONLY valid JSON (no markdown fences, no commentary) that follows this exact schema and field names.
Keep the same keys, nesting, and array shapes. Replace every example value with MY real details.
Use \\n inside description strings when there are multiple bullet lines.
Omit a section only if I have nothing for it. Do not invent design, themeColor, pageSections, or layout fields.

Schema example (pattern to follow — replace with my details):
${example}

My details / notes:
[Paste your experience, education, skills, projects, and contact info here]`;
};

/** Merge uploaded JSON into existing resume without wiping design/layout. */
export const mergeResumeImportJson = (prev = {}, parsed = {}) => {
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return prev;
    const next = { ...prev };
    RESUME_JSON_CONTENT_KEYS.forEach((key) => {
        if (parsed[key] === undefined) return;
        next[key] = parsed[key];
    });
    if (parsed.personal && typeof parsed.personal === 'object') {
        next.personal = { ...(prev.personal || {}), ...parsed.personal };
    }
    return next;
};
