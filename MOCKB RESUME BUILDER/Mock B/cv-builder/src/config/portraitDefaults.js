export const PORTRAIT_COLOR = '#2A7A6D';

export const PORTRAIT_DEFAULT_AWARDS = [
    {
        name: 'Product Excellence Award',
        issuer: 'Innovate Tech Solutions',
        date: '2023',
        description: 'Shipped the workspace launch that added 40K users.',
    },
    {
        name: 'Rising Talent in Product',
        issuer: 'Product Community India',
        date: '2022',
        description: 'Mentored associate PMs and raised discovery quality.',
    },
];

export const PORTRAIT_DEFAULT_COURSES = [
    {
        name: 'Product Strategy',
        institution: 'Reforge',
        date: '2022',
    },
];

export const PORTRAIT_DEFAULT_INTERESTS = [
    { name: 'Product communities' },
    { name: 'Mentoring PMs' },
    { name: 'Travel photography' },
];

export const PORTRAIT_DEFAULT_ORGS = [
    {
        name: 'Product Community India',
        role: 'Mentor',
        startDate: '2021',
        endDate: 'Present',
        description: 'Host monthly product critiques for early-career PMs.',
    },
];

export const PORTRAIT_EXTRA_EXPERIENCE = {
    company: 'Nimbus Digital',
    role: 'Associate Product Manager',
    startDate: 'Jun 2016',
    endDate: 'Feb 2018',
    location: 'Hyderabad, India',
    description:
        'Owned the mobile discovery experience used by 80K monthly active users.\nShipped personalized recommendations that lifted CTR by 18%.',
};

export const PORTRAIT_EXTRA_PROJECT = {
    name: 'E-Commerce Analytics Dashboard',
    description: 'Real-time analytics dashboard for an e-commerce platform processing 50K+ daily transactions.',
    technologies: ['React', 'D3.js', 'Python'],
    link: '',
};

export const PORTRAIT_DEFAULT_PUBS = [
    {
        name: 'From research to roadmap',
        publisher: 'Product Talks',
        date: '2023',
        description: 'A short playbook on turning qualitative insight into a quarterly bet.',
    },
];

export const getPortraitLayout = (design = {}) => {
    const columns = design.columns === 'one' ? 'one' : design.columns === 'mix' ? 'mix' : 'two';
    const headerPos = columns === 'mix' || design.headerPos === 'top'
        ? 'top'
        : design.headerPos === 'right' ? 'right' : 'left';
    const layoutMode = columns === 'one'
        ? 'stack'
        : headerPos === 'top' ? 'top' : headerPos === 'right' ? 'right' : 'left';
    return {
        columns,
        headerPos,
        layoutMode,
        leftWidth: design.leftWidth || 35,
    };
};

export const withPortraitDefaults = (data = {}) => {
    if (data.startBlank) return data;
    const next = { ...data };
    if (!(next.awards || []).length) next.awards = PORTRAIT_DEFAULT_AWARDS;
    if (!(next.interests || []).length) next.interests = PORTRAIT_DEFAULT_INTERESTS;
    if (!(next.courses || []).length) next.courses = PORTRAIT_DEFAULT_COURSES;
    if (!(next.organisations || []).length) next.organisations = PORTRAIT_DEFAULT_ORGS;
    next.publications = (next.publications || []).filter(
        (item) => item.name !== 'From research to roadmap'
    );
    next.experience = (next.experience || []).filter(
        (job) => !(job.company === PORTRAIT_EXTRA_EXPERIENCE.company && job.role === PORTRAIT_EXTRA_EXPERIENCE.role)
    );
    if ((next.projects || []).length < 2) {
        next.projects = [...(next.projects || []), PORTRAIT_EXTRA_PROJECT];
    }
    return next;
};
