export const PORTFOLIO_TEMPLATES = [
    {
        id: 'atlas-minimal',
        name: 'Atlas Minimal',
        category: 'portfolio',
        description: 'Clean one-page portfolio with hero, projects grid, experience timeline, and contact section. Inspired by modern ThemeWagon-style layouts.',
        tags: ['responsive', 'one-page', 'developer', 'designer'],
        accentColor: '#2563EB',
        layout: 'one-page',
        features: ['Sticky navigation', 'Hero header', 'Projects grid', 'Skills & experience', 'Contact section', 'ZIP download with README'],
    },
];

export const DEFAULT_PORTFOLIO_TEMPLATE = 'atlas-minimal';

export const PORTFOLIO_THEME_COLORS = {
    blue: { id: 'blue', color: '#2563EB', label: 'Royal Blue' },
    gold: { id: 'gold', color: '#C9A227', label: 'Gold' },
    teal: { id: 'teal', color: '#0F766E', label: 'Teal' },
    slate: { id: 'slate', color: '#334155', label: 'Slate' },
};

export const getPortfolioTemplateById = (id) =>
    PORTFOLIO_TEMPLATES.find((t) => t.id === id) || PORTFOLIO_TEMPLATES[0];
