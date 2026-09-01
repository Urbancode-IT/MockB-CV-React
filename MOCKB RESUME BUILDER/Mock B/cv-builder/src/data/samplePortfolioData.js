export const samplePortfolioData = {
    name: 'Meera Krishnan',
    role: 'Power BI Developer',
    tagline: 'I turn messy data into dashboards teams actually use every week.',
    bio: 'Power BI developer with 6+ years building semantic models, certified datasets, and executive reporting packs for finance and operations teams.',
    email: 'meera.krishnan@workmail.in',
    phone: '+91 98401 22876',
    location: 'Bengaluru, India',
    linkedin: 'https://linkedin.com/in/meerakrishnan',
    github: 'https://github.com/meerakrishnan',
    website: 'https://mockb.cv',
    skills: ['Power BI', 'DAX', 'SQL', 'Snowflake', 'Semantic modelling', 'Power Query', 'Stakeholder workshops'],
    projects: [
        {
            name: 'Finance certified dataset',
            description: 'One semantic model for P&L and cash, published as a certified dataset for FP&A.',
            tech: ['Power BI', 'Snowflake', 'DAX'],
            live: '#',
            github: '#',
        },
        {
            name: 'Store exception workspace',
            description: 'Inventory and stockout app for 28 stores with overnight Oracle refresh.',
            tech: ['Power BI', 'Oracle', 'RLS'],
            live: '#',
            github: '#',
        },
        {
            name: 'Ops pack redesign',
            description: 'Replaced a 14-file Excel pack with one Service app used by leadership every Monday.',
            tech: ['Power BI Service', 'Deployment pipelines'],
            live: '#',
            github: '#',
        },
    ],
    experience: [
        {
            role: 'Business Analyst',
            company: 'Lumen Analytics',
            period: 'Jun 2024 – Present',
            description: 'Own the weekly ops pack from semantic model to Service app for a 90-person product org.',
        },
        {
            role: 'Power BI Trainer',
            company: 'Harbor Data',
            period: 'Aug 2020 – Apr 2024',
            description: 'Designed a six-week clinic that took analysts from Excel dumps to published apps.',
        },
    ],
    education: 'M.E. Computer Science, Anna University',
    stats: { years: '6+', projects: '12+', clients: '8+', satisfaction: '99%' },
};

export const blankPortfolioData = () => ({
    name: '',
    role: '',
    tagline: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
    skills: [],
    projects: [],
    experience: [],
    education: '',
    stats: { years: '0+', projects: '0+', clients: '0+', satisfaction: '100%' },
});

export const sampleForPortfolioTemplate = () => ({ ...samplePortfolioData });
