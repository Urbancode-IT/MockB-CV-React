const LETTERS_KEY = 'mockb.cv.userCoverLetters';
const CL_TEMPLATES_KEY = 'mockb.cv.userCoverLetterTemplates';

const readJson = (key, fallback) => {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
};

const clone = (value) => JSON.parse(JSON.stringify(value || {}));

export const listUserCoverLetters = () => {
    const list = readJson(LETTERS_KEY, []);
    return Array.isArray(list) ? list : [];
};

export const coverLetterDisplayName = (title, data, baseName) => {
    const typed = (title || '').trim();
    if (typed && typed.toLowerCase() !== 'untitled cover letter') return typed;
    const person = (data?.personal?.name || '').trim();
    if (person) return `${person} – Cover letter`;
    return `${baseName || 'Cover letter'} – Your cover letter`;
};

export const upsertUserCoverLetter = ({
    id,
    title,
    selectedTemplate,
    letterData,
    baseName,
    userTemplateId,
    userTemplateName,
}) => {
    const list = listUserCoverLetters();
    const existing = list.find((item) => id && item.id === id);
    const entry = {
        id: existing?.id || `cl-${Date.now()}`,
        name: coverLetterDisplayName(title, letterData, baseName),
        title: title || 'Untitled Cover Letter',
        selectedTemplate,
        userTemplateId: userTemplateId || existing?.userTemplateId || null,
        userTemplateName: userTemplateName || existing?.userTemplateName || '',
        letterData: clone(letterData),
        createdAt: existing?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    const next = existing
        ? list.map((item) => (item.id === existing.id ? entry : item))
        : [entry, ...list];
    localStorage.setItem(LETTERS_KEY, JSON.stringify(next));
    return entry;
};

export const deleteUserCoverLetter = (id) => {
    const next = listUserCoverLetters().filter((item) => item.id !== id);
    localStorage.setItem(LETTERS_KEY, JSON.stringify(next));
    return next;
};

export const getUserCoverLetter = (id) =>
    listUserCoverLetters().find((item) => item.id === id) || null;

export const listUserCoverLetterTemplates = () => {
    const list = readJson(CL_TEMPLATES_KEY, []);
    return Array.isArray(list) ? list : [];
};

export const saveUserCoverLetterTemplate = ({ name, baseTemplate, design }) => {
    const list = listUserCoverLetterTemplates();
    const trimmed = (name || '').trim() || 'My cover letter template';
    const existingIndex = list.findIndex(
        (item) => item.name.toLowerCase() === trimmed.toLowerCase()
            && item.baseTemplate === baseTemplate,
    );
    const entry = {
        id: existingIndex >= 0 ? list[existingIndex].id : `clt-${Date.now()}`,
        name: trimmed,
        baseTemplate,
        design: clone(design),
        createdAt: existingIndex >= 0 ? list[existingIndex].createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    const next = existingIndex >= 0
        ? list.map((item, index) => (index === existingIndex ? entry : item))
        : [entry, ...list];
    localStorage.setItem(CL_TEMPLATES_KEY, JSON.stringify(next));
    return entry;
};

export const updateUserCoverLetterTemplate = (id, patch) => {
    if (!id) return null;
    const list = listUserCoverLetterTemplates();
    let updated = null;
    const next = list.map((item) => {
        if (item.id !== id) return item;
        updated = {
            ...item,
            ...patch,
            id: item.id,
            design: patch.design ? clone(patch.design) : item.design,
            updatedAt: new Date().toISOString(),
        };
        return updated;
    });
    if (!updated) return null;
    localStorage.setItem(CL_TEMPLATES_KEY, JSON.stringify(next));
    return updated;
};

export const deleteUserCoverLetterTemplate = (id) => {
    const next = listUserCoverLetterTemplates().filter((item) => item.id !== id);
    localStorage.setItem(CL_TEMPLATES_KEY, JSON.stringify(next));
    return next;
};
