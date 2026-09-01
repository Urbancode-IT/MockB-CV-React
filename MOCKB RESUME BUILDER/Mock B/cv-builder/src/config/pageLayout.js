const LIST_KEYS = [
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
];

export const TWO_PAGE_PAGE1 = [
    'summary',
    'experience',
    'education',
    'skills',
    'projects',
    'certifications',
];
export const TWO_PAGE_PAGE2 = [
    'languages',
    'awards',
    'organisations',
    'publications',
    'courses',
    'interests',
    'references',
    'declaration',
    'custom',
];

const GOLD_RULE_PAGE1_ONLY = ['languages'];

const keepForPage = (data, pageIndex, templateId = '') => {
    const { page1, page2 } = getPageSectionLists(data, templateId);
    return pageIndex === 0 ? page1 : page2;
};

export const getPageSectionLists = (data = {}, templateId = '') => {
    const stored1 = data.pageSections?.page1;
    const stored2 = data.pageSections?.page2;
    const page1 = Array.isArray(stored1) && stored1.length ? [...stored1] : [...TWO_PAGE_PAGE1];
    const seen = new Set(page1);
    const page2Base = Array.isArray(stored2) && stored2.length ? [...stored2] : [...TWO_PAGE_PAGE2];
    const page2 = page2Base.filter((id) => {
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
    });
    const isGold = String(templateId) === 'gold-rule';
    if (!isGold) return { page1, page2 };
    const p1 = page1.filter((id) => !GOLD_RULE_PAGE1_ONLY.includes(id));
    GOLD_RULE_PAGE1_ONLY.forEach((id) => {
        if (!p1.includes(id)) p1.push(id);
    });
    const p2 = page2.filter((id) => !GOLD_RULE_PAGE1_ONLY.includes(id));
    return { page1: p1, page2: p2 };
};

export const movePageSection = (data = {}, sourceId, targetPage, targetId, templateId = '') => {
    const tpl = templateId || '';
    if (!sourceId || (targetPage !== 'page1' && targetPage !== 'page2')) {
        return { pageSections: getPageSectionLists(data, tpl), sectionOrder: data.sectionOrder };
    }
    const { page1, page2 } = getPageSectionLists(data, tpl);
    const next = {
        page1: page1.filter((id) => id !== sourceId),
        page2: page2.filter((id) => id !== sourceId),
    };
    const list = next[targetPage];
    const targetIndex = targetId ? list.indexOf(targetId) : -1;
    if (targetIndex >= 0) list.splice(targetIndex, 0, sourceId);
    else list.push(sourceId);
    return {
        pageSections: next,
        sectionOrder: [...next.page1, ...next.page2],
    };
};

export const resumeDataForPage = (data = {}, pageIndex = 0, pageCount = 2, templateId = '') => {
    const keep = new Set(keepForPage(data, pageIndex, templateId));
    const next = {
        ...data,
        pageMeta: { page: pageIndex + 1, pages: pageCount },
    };
    next.summary = keep.has('summary') ? (data.summary || '') : '';
    LIST_KEYS.forEach((key) => {
        next[key] = keep.has(key) ? (data[key] || []) : [];
    });
    if (!keep.has('custom')) {
        next.customSections = [];
    }
    return next;
};

export const pageHasContent = (data = {}, pageIndex = 0, templateId = '') => {
    if (pageIndex === 0) return true;
    const slice = resumeDataForPage(data, pageIndex, 2, templateId);
    if (String(slice.summary || '').trim()) return true;
    if ((slice.customSections || []).length) return true;
    return LIST_KEYS.some((key) => Array.isArray(slice[key]) && slice[key].length > 0);
};
