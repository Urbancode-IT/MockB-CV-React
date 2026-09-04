import { resolveTemplateId, isTwoColumnTemplate, getTemplateBodyOrder } from './templates';

export const ALL_SECTION_IDS = [
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
];

export const DEFAULT_COLUMN_SECTIONS = {
    left: [
        'skills',
        'education',
        'certifications',
        'languages',
        'courses',
        'awards',
        'organisations',
        'publications',
        'interests',
    ],
    right: [
        'summary',
        'experience',
        'projects',
        'references',
        'declaration',
        'custom',
    ],
};

export const normalizeColumnSections = (data = {}, allIds = ALL_SECTION_IDS) => {
    const stored = data.columnSections;
    const hasStored = stored && Array.isArray(stored.left) && Array.isArray(stored.right);

    if (hasStored) {
        const allowed = new Set(allIds);
        const left = stored.left.filter((id, index, list) => allowed.has(id) && list.indexOf(id) === index);
        const right = stored.right.filter(
            (id, index, list) => allowed.has(id) && list.indexOf(id) === index && !left.includes(id)
        );
        return { left, right };
    }

    const left = [...DEFAULT_COLUMN_SECTIONS.left];
    const right = [...DEFAULT_COLUMN_SECTIONS.right];
    const placed = new Set([...left, ...right]);
    allIds.forEach((id) => {
        if (placed.has(id)) return;
        if (DEFAULT_COLUMN_SECTIONS.left.includes(id)) left.push(id);
        else right.push(id);
    });

    const allowed = new Set(allIds);
    return {
        left: left.filter((id, index, list) => allowed.has(id) && list.indexOf(id) === index),
        right: right.filter((id, index, list) => allowed.has(id) && list.indexOf(id) === index && !left.includes(id)),
    };
};

export const flattenColumnSections = (data = {}, allIds = ALL_SECTION_IDS) => {
    const { left, right } = normalizeColumnSections(data, allIds);
    return [...left, ...right];
};

export const suggestedColumnForSection = (sectionId) => {
    if (String(sectionId || '').startsWith('cs_') || sectionId === 'custom') return 'right';
    return DEFAULT_COLUMN_SECTIONS.left.includes(sectionId) ? 'left' : 'right';
};

export const columnSuggestionCopy = (sectionId) => {
    const side = suggestedColumnForSection(sectionId);
    if (side === 'left') {
        return {
            side,
            label: 'Suggested: Left column',
            reason: 'Short lists (skills, languages, certificates) read better in the sidebar.',
        };
    }
    return {
        side,
        label: 'Suggested: Right column',
            reason: 'Story sections (experience, projects, custom write-ups) fit the wider main column.',
    };
};

/** Active sections placed in left/right. Unplaced items go to the suggested column. */
export const columnsWithActiveSections = (data = {}, allIds) => {
    const extra = (data.customSections || []).map((block) => block.id).filter(Boolean);
    const ids = [...(allIds || ALL_SECTION_IDS), ...extra].filter((id, index, list) => list.indexOf(id) === index);
    const active = getActiveSectionIds(data, ids);
    const { left, right } = normalizeColumnSections(data, ids);
    const nextLeft = left.filter((id) => active.includes(id));
    const nextRight = right.filter((id) => active.includes(id));
    const placed = new Set([...nextLeft, ...nextRight]);
    active.forEach((id) => {
        if (placed.has(id)) return;
        if (suggestedColumnForSection(id) === 'left') nextLeft.push(id);
        else nextRight.push(id);
        placed.add(id);
    });
    return { left: nextLeft, right: nextRight };
};

export const placeSectionInColumn = (data, sectionId, column) => {
    const extra = (data.customSections || []).map((block) => block.id).filter(Boolean);
    const ids = [...ALL_SECTION_IDS, ...extra, sectionId].filter((id, index, list) => list.indexOf(id) === index);
    const cols = normalizeColumnSections(data, ids);
    return moveColumnSection(cols, sectionId, column === 'left' ? 'left' : 'right');
};

/** Sections that currently have visible content on the resume. */
export const getActiveSectionIds = (data = {}, ids = ALL_SECTION_IDS) => {
    const extra = (data.customSections || []).map((block) => block.id).filter(Boolean);
    const allIds = [...ids, ...extra].filter((id, index, list) => list.indexOf(id) === index);
    const hidden = data.hiddenEntries || {};
    return allIds.filter((id) => {
        if (id === 'summary') {
            if ((hidden.summary || []).includes(0)) return false;
            // Keep an added-but-empty summary visible in the editor (build from scratch).
            if ((data.sectionOrder || []).includes('summary')) return true;
            return Boolean(String(data.summary || '').trim());
        }
        if (id === 'custom' || String(id).startsWith('cs_')) {
            const block = (data.customSections || []).find((item) => item.id === id);
            const list = block?.items || data.custom || [];
            if (!Array.isArray(list) || list.length === 0) return false;
            const hiddenIdx = hidden[id] || [];
            return list.some((_, index) => !hiddenIdx.includes(index));
        }
        const list = data[id];
        if (!Array.isArray(list) || list.length === 0) return false;
        const hiddenIdx = hidden[id] || [];
        return list.some((_, index) => !hiddenIdx.includes(index));
    });
};

export const orderedActiveSectionIds = (data = {}, sectionOrder = [], ids = ALL_SECTION_IDS) => {
    const active = getActiveSectionIds(data, ids);
    const seen = new Set();
    const next = [];
    (sectionOrder || []).forEach((id) => {
        if (!active.includes(id) || seen.has(id)) return;
        seen.add(id);
        next.push(id);
    });
    active.forEach((id) => {
        if (seen.has(id)) return;
        next.push(id);
    });
    return next;
};

/** Keep existing order and put a newly added section at the end. */
export const appendSectionToOrder = (data, placedId) => {
    const isCustom = (id) => id === 'custom' || String(id).startsWith('cs_');
    const current = (data.sectionOrder || []).filter((id) => id && id !== placedId);
    const activeRest = getActiveSectionIds(data).filter((id) => id !== placedId);
    const next = [];
    current.forEach((id) => {
        if (!activeRest.includes(id) || next.includes(id)) return;
        next.push(id);
    });
    activeRest.forEach((id) => {
        if (!next.includes(id)) next.push(id);
    });
    const firstCore = next.findIndex((id) => !isCustom(id));
    const repaired = firstCore > 0
        ? [...next.slice(firstCore), ...next.slice(0, firstCore)]
        : next;
    return [...repaired, placedId].filter((id, index, list) => list.indexOf(id) === index);
};

export const moveColumnSection = (columns, sourceId, targetColumn, targetId) => {
    if (!sourceId || (targetColumn !== 'left' && targetColumn !== 'right')) return columns;
    const next = {
        left: columns.left.filter((id) => id !== sourceId),
        right: columns.right.filter((id) => id !== sourceId),
    };
    const list = next[targetColumn];
    const targetIndex = targetId ? list.indexOf(targetId) : -1;
    if (targetIndex >= 0) list.splice(targetIndex, 0, sourceId);
    else list.push(sourceId);
    return next;
};

/** Sections shown in the editor, matching what is on the resume and in preview order. */
export const getEditorSectionIds = (templateId, data = {}) => {
    const resolved = resolveTemplateId(templateId);
    if (isTwoColumnTemplate(resolved)) {
        const { left, right } = columnsWithActiveSections(data);
        return [...left, ...right];
    }
    const preferred = (data.sectionOrder || []).length
        ? data.sectionOrder
        : getTemplateBodyOrder(resolved);
    const active = getActiveSectionIds(data);
    const seen = new Set();
    const next = [];
    preferred.forEach((id) => {
        if (!active.includes(id) || seen.has(id)) return;
        seen.add(id);
        next.push(id);
    });
    active.forEach((id) => {
        if (seen.has(id)) return;
        if (id === 'custom' || String(id).startsWith('cs_')) {
            seen.add(id);
            next.push(id);
        }
    });
    return next;
};
