export const hasContent = (arr) => Array.isArray(arr) && arr.length > 0;

export const visibleList = (list, hiddenIds = []) =>
    (list || []).filter((_, index) => !(hiddenIds || []).includes(index));

export const isEntryVisible = (resumeData, section, index = 0) =>
    !((resumeData?.hiddenEntries?.[section] || []).includes(index));

export const getInitials = (name = '') =>
    name.split(' ').filter(Boolean).map((word) => word[0]).slice(0, 2).join('').toUpperCase() || 'YN';

export const formatRange = (start, end) => {
    if (!start && !end) return '';
    if (start && end) return `${start} – ${end}`;
    return start || end;
};

export const toBullets = (text) => {
    if (!text) return [];
    if (Array.isArray(text)) return text.filter(Boolean);
    const lines = String(text).split(/\n+/).map((line) => line.trim()).filter(Boolean);
    return lines.length ? lines : [String(text).trim()];
};

export const proficiencyDots = (level) => {
    const map = {
        'native/bilingual': 5,
        native: 5,
        fluent: 5,
        bilingual: 5,
        proficient: 4,
        advanced: 4,
        competent: 3,
        intermediate: 3,
        conversational: 3,
        amateur: 2,
        elementary: 2,
        basic: 2,
        beginner: 1,
    };
    if (typeof level === 'number') return Math.min(5, Math.max(1, level));
    return map[String(level || '').toLowerCase()] || 3;
};

export const orderStyle = (section, sectionOrder) => ({
    order: Math.max(0, Array.isArray(sectionOrder) ? sectionOrder.indexOf(section) : 0),
    marginBottom: 'var(--resume-section-spacing, 18px)',
});

export const sectionTitle = (resumeData, id, fallback) =>
    resumeData?.sectionTitles?.[id] || fallback;

export const getVisibleResume = (resumeData = {}) => {
    const hidden = resumeData.hiddenEntries || {};
    const personal = resumeData.personal || {};
    return {
        personal,
        themeColor: resumeData.themeColor,
        photo: resumeData.photo || personal.photo,
        summary: isEntryVisible(resumeData, 'summary') ? (resumeData.summary || '') : '',
        experience: visibleList(resumeData.experience, hidden.experience),
        education: visibleList(resumeData.education, hidden.education),
        skills: visibleList(resumeData.skills, hidden.skills),
        projects: visibleList(resumeData.projects, hidden.projects),
        certifications: visibleList(resumeData.certifications, hidden.certifications),
        languages: visibleList(resumeData.languages, hidden.languages),
        interests: visibleList(resumeData.interests, hidden.interests),
        awards: visibleList(resumeData.awards, hidden.awards),
        organisations: visibleList(resumeData.organisations, hidden.organisations),
        publications: visibleList(resumeData.publications, hidden.publications),
        t: (id, fallback) => sectionTitle(resumeData, id, fallback),
        sectionOrder: resumeData.sectionOrder,
    };
};
