const DRAFT_KEY = 'mockb.cv.resumeDraft';
const TEMPLATES_KEY = 'mockb.cv.userTemplates';

const readJson = (key, fallback) => {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
};

export const saveResumeDraft = (payload) => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({
        ...payload,
        updatedAt: new Date().toISOString(),
    }));
};

export const loadResumeDraft = () => readJson(DRAFT_KEY, null);

export const clearResumeDraft = () => localStorage.removeItem(DRAFT_KEY);

export const listUserTemplates = () => {
    const list = readJson(TEMPLATES_KEY, []);
    return Array.isArray(list) ? list : [];
};

export const yourWorkNameFor = (baseName, existingNames = []) => {
    const root = `${baseName || 'Template'} – Your work`;
    const taken = new Set(existingNames.map((name) => String(name).toLowerCase()));
    if (!taken.has(root.toLowerCase())) return root;
    let n = 2;
    while (taken.has(`${root} ${n}`.toLowerCase())) n += 1;
    return `${root} ${n}`;
};

const isYourWorkItem = (item, baseTemplate) =>
    item.baseTemplate === baseTemplate
    && (item.kind === 'your-work' || / – Your work( \d+)?$/i.test(item.name || ''));

export const upsertYourWorkTemplate = ({
    baseTemplate,
    baseName,
    design,
    themeColor,
    sectionOrder,
    columnSections,
    existingId,
}) => {
    const list = listUserTemplates();
    const existing = (existingId && list.find((item) => item.id === existingId))
        || list.find((item) => isYourWorkItem(item, baseTemplate));
    const payload = {
        name: existing?.name || yourWorkNameFor(baseName, list.map((item) => item.name)),
        baseTemplate,
        design: design ? JSON.parse(JSON.stringify(design)) : {},
        themeColor: themeColor || design?.accentColor,
        sectionOrder: Array.isArray(sectionOrder) ? [...sectionOrder] : [],
        columnSections: columnSections
            ? JSON.parse(JSON.stringify(columnSections))
            : null,
        kind: 'your-work',
        updatedAt: new Date().toISOString(),
    };
    if (existing) {
        const entry = {
            ...existing,
            ...payload,
            id: existing.id,
            createdAt: existing.createdAt,
        };
        localStorage.setItem(
            TEMPLATES_KEY,
            JSON.stringify(list.map((item) => (item.id === existing.id ? entry : item))),
        );
        return entry;
    }
    const entry = {
        id: `mine-${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...payload,
    };
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify([entry, ...list]));
    return entry;
};

export const saveUserTemplate = ({
    name,
    baseTemplate,
    design,
    themeColor,
    sectionOrder,
    columnSections,
}) => {
    const list = listUserTemplates();
    const trimmed = (name || '').trim() || 'My template';
    const existingIndex = list.findIndex(
        (item) => item.name.toLowerCase() === trimmed.toLowerCase()
            && item.baseTemplate === baseTemplate,
    );
    const entry = {
        id: existingIndex >= 0 ? list[existingIndex].id : `mine-${Date.now()}`,
        name: trimmed,
        baseTemplate,
        design: design ? JSON.parse(JSON.stringify(design)) : {},
        themeColor: themeColor || design?.accentColor,
        sectionOrder: Array.isArray(sectionOrder) ? [...sectionOrder] : [],
        columnSections: columnSections
            ? JSON.parse(JSON.stringify(columnSections))
            : null,
        createdAt: existingIndex >= 0 ? list[existingIndex].createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    const next = existingIndex >= 0
        ? list.map((item, index) => (index === existingIndex ? entry : item))
        : [entry, ...list];
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(next));
    return entry;
};

export const updateUserTemplate = (id, patch) => {
    if (!id) return null;
    const list = listUserTemplates();
    let updated = null;
    const next = list.map((item) => {
        if (item.id !== id) return item;
        updated = {
            ...item,
            ...patch,
            id: item.id,
            design: patch.design
                ? JSON.parse(JSON.stringify(patch.design))
                : item.design,
            columnSections: patch.columnSections
                ? JSON.parse(JSON.stringify(patch.columnSections))
                : item.columnSections,
            sectionOrder: Array.isArray(patch.sectionOrder)
                ? [...patch.sectionOrder]
                : item.sectionOrder,
            updatedAt: new Date().toISOString(),
        };
        return updated;
    });
    if (!updated) return null;
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(next));
    return updated;
};

export const deleteUserTemplate = (id) => {
    const next = listUserTemplates().filter((item) => item.id !== id);
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(next));
    return next;
};
