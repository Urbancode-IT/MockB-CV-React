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
    left: ['skills', 'languages', 'courses', 'interests'],
    right: [
        'summary',
        'experience',
        'education',
        'projects',
        'awards',
        'organisations',
        'certifications',
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

export const suggestedColumnForSection = (sectionId) =>
    DEFAULT_COLUMN_SECTIONS.left.includes(sectionId) ? 'left' : 'right';

/** Active sections placed in left/right. Unplaced items go to the suggested column. */
export const columnsWithActiveSections = (data = {}, allIds = ALL_SECTION_IDS) => {
    const active = getActiveSectionIds(data, allIds);
    const { left, right } = normalizeColumnSections(data, allIds);
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
    const cols = normalizeColumnSections(data);
    return moveColumnSection(cols, sectionId, column === 'left' ? 'left' : 'right');
};

/** Sections that currently have visible content on the resume. */
export const getActiveSectionIds = (data = {}, ids = ALL_SECTION_IDS) => {
    const hidden = data.hiddenEntries || {};
    return ids.filter((id) => {
        if (id === 'summary') {
            if ((hidden.summary || []).includes(0)) return false;
            return Boolean(String(data.summary || '').trim());
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
