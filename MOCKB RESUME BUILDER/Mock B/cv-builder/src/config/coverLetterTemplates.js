export const COVER_LETTER_TEMPLATES = [
    {
        id: 'classic-letter',
        name: 'Classic Letter',
        description: 'Clean single-column cover letter. ATS-friendly and fully editable.',
        accentColor: '#1A3A5C',
        category: 'professional',
        headerAlign: 'left',
        fontFamily: 'Inter',
    },
    {
        id: 'minimal-letter',
        name: 'Minimal Letter',
        description: 'Airy layout with small-caps name and double rules. Quiet and precise.',
        accentColor: '#2563EB',
        category: 'modern',
        headerAlign: 'center',
        fontFamily: 'Nunito',
    },
    {
        id: 'editorial-letter',
        name: 'Editorial Letter',
        description: 'Serif type and a side accent for a distinctive, magazine-like letter.',
        accentColor: '#8B3A3A',
        category: 'professional',
        headerAlign: 'left',
        fontFamily: 'Lora',
    },
    {
        id: 'split-letter',
        name: 'Split Letter',
        description: 'Dark header panel with a crisp white letter body. Strong and executive.',
        accentColor: '#0F172A',
        category: 'modern',
        headerAlign: 'left',
        fontFamily: 'Source Sans 3',
    },
    {
        id: 'beacon-letter',
        name: 'Beacon Letter',
        description: 'Geometric cover letter with navy bars, a light-green mark, and a corner stripe.',
        accentColor: '#6EE7B7',
        category: 'modern',
        headerAlign: 'left',
        fontFamily: 'Inter',
    },
];

export const DEFAULT_COVER_LETTER_TEMPLATE = 'classic-letter';

export const getCoverLetterTemplateById = (id) => {
    if (id === 'modern-letter') {
        return COVER_LETTER_TEMPLATES.find((t) => t.id === 'minimal-letter') || COVER_LETTER_TEMPLATES[0];
    }
    return COVER_LETTER_TEMPLATES.find((t) => t.id === id) || COVER_LETTER_TEMPLATES[0];
};
