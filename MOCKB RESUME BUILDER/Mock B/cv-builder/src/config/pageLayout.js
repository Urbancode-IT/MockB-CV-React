import { isCustomSectionId, listCustomSections } from './customSections';

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

export const ALL_BODY_SECTIONS = [...TWO_PAGE_PAGE1, ...TWO_PAGE_PAGE2];

/** Expand legacy `custom` token into real cs_* ids (does not invent ids from other pages). */
export const expandPageSectionList = (list = [], data = {}) => {
    const customs = listCustomSections(data).map((block) => block.id);
    const out = [];
    const seen = new Set();
    list.forEach((id) => {
        if (id === 'custom') {
            if (customs.length) {
                customs.forEach((cid) => {
                    if (seen.has(cid)) return;
                    out.push(cid);
                    seen.add(cid);
                });
            } else if (!seen.has('custom')) {
                out.push('custom');
                seen.add('custom');
            }
            return;
        }
        if (seen.has(id)) return;
        out.push(id);
        seen.add(id);
    });
    return out;
};

/** Page-1 packing list including dynamic custom section ids (cs_*). */
export const bodySectionsForData = (data = {}) => {
    const base = ALL_BODY_SECTIONS.filter((id) => id !== 'custom');
    const customs = listCustomSections(data).map((block) => block.id);
    if (customs.length) return [...base, ...customs];
    return [...ALL_BODY_SECTIONS];
};

/**
 * Expand `custom` → cs_*, claim each custom id on at most one page, and park
 * any unassigned custom blocks on page 1.
 */
const normalizePagesWithCustoms = (pages, data = {}) => {
    const customs = listCustomSections(data).map((block) => block.id);
    const explicitPage = new Map();
    pages.forEach((list, pageIndex) => {
        (list || []).forEach((id) => {
            if (String(id).startsWith('cs_') && !explicitPage.has(id)) {
                explicitPage.set(id, pageIndex);
            }
        });
    });

    const expanded = pages.map((list, pageIndex) => {
        const out = [];
        const seen = new Set();
        (list || []).forEach((id) => {
            if (id === 'custom') {
                customs.forEach((cid) => {
                    const owner = explicitPage.get(cid);
                    if (owner != null && owner !== pageIndex) return;
                    if (seen.has(cid)) return;
                    out.push(cid);
                    seen.add(cid);
                });
                return;
            }
            if (seen.has(id)) return;
            out.push(id);
            seen.add(id);
        });
        return out;
    });

    const claimed = new Set();
    const next = expanded.map((list) => {
        const page = [];
        list.forEach((id) => {
            if (String(id).startsWith('cs_')) {
                if (claimed.has(id)) return;
                claimed.add(id);
            }
            page.push(id);
        });
        return page;
    });
    if (!next.length) next.push([]);
    customs.forEach((cid) => {
        if (claimed.has(cid)) return;
        next[0].push(cid);
        claimed.add(cid);
    });
    return next;
};

/** Soft cap for auto-created continuation pages (no template CSS changes). */
export const MAX_AUTO_PAGES = 12;

const GOLD_RULE_PAGE1_ONLY = ['languages'];

export const pageKey = (pageIndex) => `page${pageIndex + 1}`;

const listsEqual = (a = [], b = []) =>
    a.length === b.length && a.every((id, i) => id === b[i]);

const rangeEqual = (a, b) => {
    if (!Array.isArray(a) && !Array.isArray(b)) return true;
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    return a.length === b.length && a.every((v, i) => v === b[i]);
};

const slicesEqual = (a = {}, b = {}) => {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const key of keys) {
        const left = a[key] || {};
        const right = b[key] || {};
        const idxs = new Set([...Object.keys(left), ...Object.keys(right)]);
        for (const idx of idxs) {
            if (!rangeEqual(left[idx], right[idx])) return false;
        }
    }
    return true;
};

const pageMapsEqual = (left = {}, right = {}) => {
    const keys = new Set([...Object.keys(left || {}), ...Object.keys(right || {})]);
    for (const key of keys) {
        if (!/^page\d+$/.test(key)) continue;
        if (!listsEqual(left[key] || [], right[key] || [])) return false;
    }
    return true;
};

export const pageLayoutEqual = (left = {}, right = {}) =>
    pageMapsEqual(left, right)
    && slicesEqual(left.pageEntrySlices, right.pageEntrySlices);

/** Normalize stored pageSections into consecutive page1..pageN arrays. */
export const getPageSectionLists = (data = {}, templateId = '') => {
    const stored = data.pageSections || {};
    const storedKeys = Object.keys(stored)
        .filter((k) => /^page\d+$/.test(k))
        .sort((a, b) => Number(a.slice(4)) - Number(b.slice(4)));
    const hasStored = storedKeys.some((k) => Array.isArray(stored[k]));

    let pages = [];

    if (hasStored) {
        const maxIdx = Math.max(
            2,
            ...storedKeys.map((k) => Number(k.slice(4))),
        );
        const slices = data.pageEntrySlices || {};
        const seenWhole = new Set();
        for (let n = 1; n <= maxIdx; n += 1) {
            const key = `page${n}`;
            let raw = [];
            if (Array.isArray(stored[key])) raw = [...stored[key]];
            else if (n === 1) raw = [...bodySectionsForData(data)];
            const page = [];
            raw.forEach((id) => {
                // Allow the same section on multiple pages only when entries are split.
                if (seenWhole.has(id) && !slices[id]) return;
                page.push(id);
                if (!slices[id]) seenWhole.add(id);
            });
            pages.push(page);
        }
        while (pages.length > 2 && pages[pages.length - 1].length === 0) pages.pop();
        if (!pages.length) pages = [[...bodySectionsForData(data)], []];
        if (pages.length === 1) pages.push([]);
    } else {
        // One-page and multipage: fill from page 1; auto-pagination spills to 2, 3, …
        pages = [[...bodySectionsForData(data)], []];
    }

    pages = normalizePagesWithCustoms(pages, data);

    const isGold = String(templateId) === 'gold-rule';
    if (isGold) {
        pages = pages.map((list, idx) => {
            if (idx === 0) {
                const p1 = list.filter((id) => !GOLD_RULE_PAGE1_ONLY.includes(id));
                GOLD_RULE_PAGE1_ONLY.forEach((id) => {
                    if (!p1.includes(id)) p1.push(id);
                });
                return p1;
            }
            return list.filter((id) => !GOLD_RULE_PAGE1_ONLY.includes(id));
        });
    }

    const result = {};
    pages.forEach((list, i) => {
        result[pageKey(i)] = list;
    });
    if (!result.page1) result.page1 = [];
    if (!result.page2) result.page2 = [];
    return result;
};

export const getPageListsArray = (data = {}, templateId = '') => {
    const lists = getPageSectionLists(data, templateId);
    const keys = Object.keys(lists)
        .filter((k) => /^page\d+$/.test(k))
        .sort((a, b) => Number(a.slice(4)) - Number(b.slice(4)));
    return keys.map((k) => lists[k] || []);
};

export const movePageSection = (data = {}, sourceId, targetPage, targetId, templateId = '') => {
    const tpl = templateId || '';
    if (!sourceId || !/^page\d+$/.test(String(targetPage || ''))) {
        return { pageSections: getPageSectionLists(data, tpl), sectionOrder: data.sectionOrder };
    }
    const lists = getPageSectionLists(data, tpl);
    const next = {};
    Object.keys(lists).forEach((key) => {
        next[key] = (lists[key] || []).filter((id) => id !== sourceId);
    });
    if (!next[targetPage]) next[targetPage] = [];
    const list = next[targetPage];
    const targetIndex = targetId ? list.indexOf(targetId) : -1;
    if (targetIndex >= 0) list.splice(targetIndex, 0, sourceId);
    else list.push(sourceId);
    const pageEntrySlices = { ...(data.pageEntrySlices || {}) };
    delete pageEntrySlices[sourceId];
    const sectionOrder = Object.keys(next)
        .sort((a, b) => Number(a.slice(4)) - Number(b.slice(4)))
        .flatMap((k) => next[k]);
    return {
        pageSections: next,
        sectionOrder: [...new Set(sectionOrder)],
        pageEntrySlices,
    };
};

const applyEntrySlice = (list = [], slice) => {
    if (!Array.isArray(slice) || slice.length < 2) return list;
    const start = Math.max(0, slice[0]);
    const end = Math.max(start, slice[1]);
    return list.slice(start, end);
};

const keepForPage = (data, pageIndex, templateId = '') => {
    const pages = getPageListsArray(data, templateId);
    return pages[pageIndex] || [];
};

export const resumeDataForPage = (data = {}, pageIndex = 0, pageCount = 2, templateId = '') => {
    const keep = new Set(keepForPage(data, pageIndex, templateId));
    const slices = data.pageEntrySlices || {};
    const next = {
        ...data,
        pageMeta: { page: pageIndex + 1, pages: pageCount },
    };
    next.summary = keep.has('summary') ? (data.summary || '') : '';
    LIST_KEYS.forEach((key) => {
        if (key === 'custom') return;
        if (!keep.has(key)) {
            next[key] = [];
            return;
        }
        const full = data[key] || [];
        const slice = slices[key]?.[pageIndex] ?? slices[key]?.[String(pageIndex)];
        next[key] = slice ? applyEntrySlice(full, slice) : full;
    });

    // Custom blocks use ids like cs_*. Prefer explicit cs_* page assignments;
    // fall back to legacy `custom` token = all blocks on that page.
    const explicitCustomIds = [...keep].filter((id) => String(id).startsWith('cs_'));
    const blocks = listCustomSections(data);
    const keptBlocks = explicitCustomIds.length
        ? blocks.filter((block) => explicitCustomIds.includes(block.id))
        : (keep.has('custom') ? blocks : []);
    next.customSections = keptBlocks.map((block) => {
        const slice = slices[block.id]?.[pageIndex] ?? slices[block.id]?.[String(pageIndex)];
        const items = Array.isArray(block.items) ? block.items : [];
        return {
            ...block,
            items: slice ? applyEntrySlice(items, slice) : items,
        };
    });

    if (keep.has('custom') && !explicitCustomIds.length && !next.customSections.length) {
        const slice = slices.custom?.[pageIndex] ?? slices.custom?.[String(pageIndex)];
        next.custom = slice ? applyEntrySlice(data.custom || [], slice) : (data.custom || []);
    } else {
        next.custom = [];
    }

    return next;
};

export const pageHasContent = (data = {}, pageIndex = 0, templateId = '') => {
    if (pageIndex === 0) return true;
    const pages = getPageListsArray(data, templateId);
    if (!(pages[pageIndex] || []).length) return false;
    const slice = resumeDataForPage(data, pageIndex, Math.max(2, pages.length), templateId);
    if (String(slice.summary || '').trim()) return true;
    if ((slice.customSections || []).length) return true;
    return LIST_KEYS.some((key) => Array.isArray(slice[key]) && slice[key].length > 0);
};

export const getActivePageCount = (data = {}, templateId = '', maxPages = MAX_AUTO_PAGES) => {
    const pages = getPageListsArray(data, templateId);
    let count = 1;
    for (let i = 0; i < Math.min(pages.length, maxPages); i += 1) {
        if (i === 0 || pageHasContent(data, i, templateId)) count = i + 1;
    }
    return Math.min(maxPages, Math.max(1, count));
};

const ENTRY_SELECTORS = [
    '[data-entry]',
    '.cp-entry',
    '.cd-job',
    '.ns-job',
    '.gr-job',
    '.fg-entry',
    '.pp-entry',
    '.ss-entry',
    '.ss-block',
    '.cm-entry',
    '.ib-entry',
    '.ce-entry',
    '.ex-split-entry',
    '.rx-entry',
].join(',');

/** Two-column roots — overflow must be measured per column, not document order. */
const COLUMN_ROOT_SELECTORS = '.ss-col, .pp-sidebar, .pp-main';

const pagesToMap = (pages) => {
    const map = {};
    pages.forEach((list, i) => {
        map[pageKey(i)] = list;
    });
    if (!map.page1) map.page1 = [];
    if (!map.page2) map.page2 = [];
    return map;
};

const sectionNodes = (root) =>
    [...root.querySelectorAll('[data-section]')].filter((el) => {
        const id = el.getAttribute('data-section');
        return id && id !== 'personal';
    });

/**
 * Decide which sections in one vertical flow must move past limitY.
 * Returns { moveIds: Set, splits: { [id]: keepEntryCount } }.
 */
const planColumnOverflow = (sections, limitY) => {
    const moveIds = new Set();
    const splits = {};

    let overflowAt = -1;
    for (let i = 0; i < sections.length; i += 1) {
        if (sections[i].getBoundingClientRect().bottom > limitY + 0.5) {
            overflowAt = i;
            break;
        }
    }
    if (overflowAt < 0) return { moveIds, splits };

    const overflowSection = sections[overflowAt];
    const overflowId = overflowSection.getAttribute('data-section');
    const startsOnPage = overflowSection.getBoundingClientRect().top < limitY - 8;
    const entries = startsOnPage
        ? [...overflowSection.querySelectorAll(ENTRY_SELECTORS)]
        : [];

    let keepEntryCount = 0;
    if (entries.length > 1) {
        for (let i = 0; i < entries.length; i += 1) {
            if (entries[i].getBoundingClientRect().bottom <= limitY - 1) {
                keepEntryCount = i + 1;
            } else {
                break;
            }
        }
    }

    for (let i = overflowAt; i < sections.length; i += 1) {
        const id = sections[i].getAttribute('data-section');
        if (!id) continue;
        if (i === overflowAt && keepEntryCount > 0 && keepEntryCount < entries.length) {
            splits[id] = keepEntryCount;
            moveIds.add(id);
        } else {
            moveIds.add(id);
        }
    }

    // If the overflow section itself couldn't keep any entries, move it wholly.
    if (overflowId && !splits[overflowId]) moveIds.add(overflowId);

    return { moveIds, splits };
};

/**
 * Measure one rendered sheet and spill overflowing sections/entries onto the next page.
 * Two-column templates are measured per column so the main column is not emptied when
 * the sidebar overflows (keeps editor preview matching the gallery).
 */
export const computeOverflowPagination = (sheetEl, data = {}, templateId = '', pageIndex = 0) => {
    const pages = normalizePagesWithCustoms(
        getPageListsArray(data, templateId).map((p) => [...p]),
        data,
    );
    while (pages.length <= pageIndex) pages.push([]);

    if (!sheetEl) {
        return {
            pageSections: pagesToMap(pages),
            pageEntrySlices: data.pageEntrySlices || {},
        };
    }

    const current = pages[pageIndex] || [];
    const sheetRect = sheetEl.getBoundingClientRect();
    const limitY = sheetRect.bottom - 2;

    const columnRoots = [...sheetEl.querySelectorAll(COLUMN_ROOT_SELECTORS)];
    const groups = columnRoots.length >= 2
        ? columnRoots.map((col) => sectionNodes(col))
        : [sectionNodes(sheetEl)];

    const moveIds = new Set();
    const splits = {};
    groups.forEach((sections) => {
        const plan = planColumnOverflow(sections, limitY);
        plan.moveIds.forEach((id) => moveIds.add(id));
        Object.assign(splits, plan.splits);
    });

    if (!moveIds.size) {
        return {
            pageSections: pagesToMap(pages),
            pageEntrySlices: data.pageEntrySlices || {},
        };
    }

    const nextSlices = { ...(data.pageEntrySlices || {}) };
    const nextPageIndex = pageIndex + 1;
    while (pages.length <= nextPageIndex) pages.push([]);

    const sectionItemCount = (id) => {
        if (isCustomSectionId(id)) {
            const block = listCustomSections(data).find((item) => item.id === id);
            return (block?.items || []).length;
        }
        return (data[id] || []).length;
    };

    const stayOnPage = [];
    const moveToNext = [];
    const seen = new Set();

    current.forEach((id) => {
        if (seen.has(id)) return;
        seen.add(id);

        if (splits[id] != null) {
            stayOnPage.push(id);
            moveToNext.push(id);
            const keepEntryCount = splits[id];
            const sectionSlices = { ...(nextSlices[id] || {}) };
            const fullLen = sectionItemCount(id) || keepEntryCount + 1;
            const existing = sectionSlices[pageIndex] || sectionSlices[String(pageIndex)];
            const absStart = Array.isArray(existing) ? existing[0] : 0;
            const absEnd = Array.isArray(existing) ? existing[1] : fullLen;
            const splitAt = absStart + keepEntryCount;
            sectionSlices[pageIndex] = [absStart, splitAt];
            sectionSlices[nextPageIndex] = [splitAt, absEnd];
            Object.keys(sectionSlices).forEach((k) => {
                if (Number(k) > nextPageIndex) delete sectionSlices[k];
            });
            nextSlices[id] = sectionSlices;
            return;
        }

        if (moveIds.has(id)) {
            moveToNext.push(id);
            const movedSlices = { ...(nextSlices[id] || {}) };
            const existing = movedSlices[pageIndex] || movedSlices[String(pageIndex)];
            if (Array.isArray(existing)) {
                movedSlices[nextPageIndex] = existing;
                delete movedSlices[pageIndex];
                delete movedSlices[String(pageIndex)];
                nextSlices[id] = movedSlices;
            }
            return;
        }

        stayOnPage.push(id);
    });

    // DOM may expose cs_* ids that were missing from the stored page list — still move them.
    [...moveIds, ...Object.keys(splits)].forEach((id) => {
        if (seen.has(id)) return;
        seen.add(id);
        if (splits[id] != null) {
            stayOnPage.push(id);
            moveToNext.push(id);
            const keepEntryCount = splits[id];
            const sectionSlices = { ...(nextSlices[id] || {}) };
            const fullLen = sectionItemCount(id) || keepEntryCount + 1;
            const existing = sectionSlices[pageIndex] || sectionSlices[String(pageIndex)];
            const absStart = Array.isArray(existing) ? existing[0] : 0;
            const absEnd = Array.isArray(existing) ? existing[1] : fullLen;
            const splitAt = absStart + keepEntryCount;
            sectionSlices[pageIndex] = [absStart, splitAt];
            sectionSlices[nextPageIndex] = [splitAt, absEnd];
            nextSlices[id] = sectionSlices;
            return;
        }
        moveToNext.push(id);
    });

    // Never leave the measured page empty of body sections.
    if (!stayOnPage.length && moveToNext.length) {
        stayOnPage.push(moveToNext.shift());
    }

    pages[pageIndex] = stayOnPage;

    const nextPage = pages[nextPageIndex] || [];
    const mergedNext = [];
    const nextSeen = new Set();
    moveToNext.forEach((id) => {
        if (nextSeen.has(id)) return;
        mergedNext.push(id);
        nextSeen.add(id);
    });
    nextPage.forEach((id) => {
        if (nextSeen.has(id)) return;
        mergedNext.push(id);
        nextSeen.add(id);
    });
    pages[nextPageIndex] = mergedNext;

    return {
        pageSections: pagesToMap(pages),
        pageEntrySlices: nextSlices,
    };
};

export const layoutSnapshotEqual = (data, next, templateId = '') => {
    const currentLists = getPageSectionLists(data, templateId);
    return pageLayoutEqual(
        { ...currentLists, pageEntrySlices: data?.pageEntrySlices || {} },
        { ...next.pageSections, pageEntrySlices: next.pageEntrySlices || {} },
    );
};
