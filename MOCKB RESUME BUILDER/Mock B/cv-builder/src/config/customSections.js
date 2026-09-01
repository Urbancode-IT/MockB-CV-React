import { ALL_SECTION_IDS } from './columnLayout';

export const isCustomSectionId = (id) =>
    id === 'custom' || String(id || '').startsWith('cs_');

export const createCustomSectionId = () =>
    `cs_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export const listCustomSections = (data = {}) => {
    if (Array.isArray(data.customSections) && data.customSections.length) {
        return data.customSections.map((block, index) => ({
            id: block.id || `cs_${index}`,
            title: block.title || data.sectionTitles?.[block.id] || `Custom ${index + 1}`,
            items: Array.isArray(block.items) ? block.items : [],
            style: block.style || {},
        }));
    }
    if (Array.isArray(data.custom) && data.custom.length) {
        return [{
            id: 'custom',
            title: data.sectionTitles?.custom || 'Additional',
            items: data.custom,
            style: data.sectionStyles?.custom || {},
        }];
    }
    return [];
};

export const allSectionIdsForData = (data = {}) => {
    const base = ALL_SECTION_IDS.filter((id) => id !== 'custom');
    return [...base, ...listCustomSections(data).map((block) => block.id)];
};

export const getCustomSection = (data, id) =>
    listCustomSections(data).find((block) => block.id === id);

export const upsertCustomSection = (data, nextBlock) => {
    const list = listCustomSections(data);
    const index = list.findIndex((block) => block.id === nextBlock.id);
    const next = [...list];
    if (index >= 0) next[index] = { ...list[index], ...nextBlock };
    else next.push(nextBlock);
    return next;
};

export const removeCustomSection = (data, id) =>
    listCustomSections(data).filter((block) => block.id !== id);

export const CUSTOM_LAYOUTS = [
    { id: 'entries', label: 'Title + details' },
    { id: 'bullets', label: 'Bullet list' },
    { id: 'chips', label: 'Tags / chips' },
];

export const CUSTOM_LIST_STYLES = ['bullet', 'hyphen', 'number', 'none'];
