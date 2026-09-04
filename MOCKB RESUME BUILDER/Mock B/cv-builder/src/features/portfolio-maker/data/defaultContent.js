import { PORTFOLIO_ASSETS, projectImageAt } from '../config/portfolioAssets';

export const folioOneSample = {
  name: 'Alex Mercer',
  initials: 'AM',
  role: 'Full-Stack Software Engineer',
  headlineSegments: [
    { text: 'Engineering ', bold: false },
    { text: 'scalable architecture', bold: true },
    { text: ' for modern ', bold: false },
    { text: 'enterprises', bold: true },
  ],
  tagline:
    'Full-Stack Software Engineer specializing in performant React applications, robust Node.js backend systems, and cloud optimization.',
  introQuote: 'Quality engineering starts with clarity, discipline, and maintainable systems.',
  bio:
    'I design and ship production systems for teams that need reliability at scale. My work spans API platforms, data-intensive dashboards, and cloud infrastructure with measurable impact on latency, uptime, and delivery velocity.',
  email: 'alex.mercer@workmail.com',
  phone: '+1 (415) 555-0184',
  whatsapp: '+1 (415) 555-0184',
  location: 'San Francisco, California',
  linkedin: 'https://linkedin.com/in/alexmercer',
  github: 'https://github.com/alexmercer',
  website: 'https://alexmercer.dev',
  education: 'B.S. Computer Science, Stanford University',
  profileImage: PORTFOLIO_ASSETS.profile,
  experiencePortrait: PORTFOLIO_ASSETS.experiencePortrait,
  philosophyVideo: PORTFOLIO_ASSETS.philosophyVideo,
  techStack: ['Node.js', 'Redis', 'Next.js', 'AWS', 'GraphQL', 'TypeScript', 'PostgreSQL'],
  skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'GraphQL', 'Redis', 'Kafka'],
  stats: { years: '8', projects: '64', clients: '22', satisfaction: '98%' },
  features: [
    {
      title: 'Production-Grade Reliability',
      description:
        'Clean, thoroughly tested, enterprise-ready source code with full observability baked in from day one.',
      variant: 'reliability',
    },
    {
      title: 'Performance First Mindset',
      description:
        'Core Web Vitals, ultra-fast render, and aggressive asset optimization across every critical path.',
      variant: 'performance',
    },
    {
      title: 'Business-Driven Decisions',
      description:
        'Cross-functional alignment, clear technical communication, and product strategy that ships outcomes.',
      variant: 'business',
    },
  ],
  philosophy: {
    label: 'THE ENGINEER BEHIND THE CODE',
    title: 'A short film on my engineering philosophy',
  },
  services: [
    {
      title: 'Application Development',
      description: 'End-to-end delivery of responsive web applications with API integration and CI/CD pipelines.',
      count: '42',
    },
    {
      title: 'Frontend Architecture',
      description: 'Design systems, component libraries, and performance work for scaling product teams.',
      count: '28',
    },
    {
      title: 'Technical Consulting',
      description: 'Stack evaluations, code reviews, and delivery planning for engineering organizations.',
      count: '15',
    },
  ],
  projects: [
    {
      name: 'Fintech Ledger API',
      category: 'Fintech',
      year: '2024',
      roleTag: 'Lead Engineer',
      description:
        'High-throughput transactional data engine processing 40M+ daily events with sub-10ms latency.',
      image: projectImageAt(0),
      tech: ['Node.js', 'Postgres', 'Kafka'],
      live: 'https://example.com',
      github: 'https://github.com',
    },
    {
      name: 'SaaS Analytics Dashboard',
      category: 'Enterprise SaaS',
      year: '2024',
      roleTag: 'Full-Stack',
      description:
        'Real-time event monitoring system with complex data visualization for enterprise ops teams.',
      image: projectImageAt(1),
      tech: ['Next.js', 'TypeScript', 'ClickHouse'],
      live: 'https://example.com',
      github: 'https://github.com',
    },
    {
      name: 'E-Commerce Orchestrator',
      category: 'Commerce',
      year: '2023',
      roleTag: 'Lead Engineer',
      description:
        'Headless commerce platform coordinating inventory, payments, and fulfillment across three regions.',
      image: projectImageAt(2),
      tech: ['React', 'GraphQL', 'AWS'],
      live: 'https://example.com',
      github: 'https://github.com',
    },
    {
      name: 'Ops Monitor Console',
      category: 'Developer Tools',
      year: '2023',
      roleTag: 'Full-Stack',
      description:
        'Unified observability workspace consolidating metrics, logs, and alerts for platform engineering teams.',
      image: projectImageAt(3),
      tech: ['Vue', 'D3', 'WebSockets'],
      live: 'https://example.com',
      github: 'https://github.com',
    },
  ],
  experience: [
    {
      role: 'UX/UI & Frontend Architecture Lead',
      company: 'SM Technology',
      period: 'Sept 2024 – Present',
      description:
        'Spearheaded the development of performant web architectures serving 200k+ monthly users. Established design system standards adopted across four product squads.',
      expanded: true,
    },
    {
      role: 'Full-Stack Developer',
      company: 'Artificer',
      period: '2022 – 2024',
      description:
        'Built customer-facing dashboards and internal tooling. Reduced API response times by 45% through query optimization and caching strategy.',
      expanded: false,
    },
    {
      role: 'Full-Stack Developer',
      company: 'Surwave',
      period: '2019 – 2022',
      description:
        'Delivered fourteen client engagements from technical discovery through production launch. Introduced automated deployment workflows.',
      expanded: false,
    },
  ],
};

export const folioTwoSample = {
  name: 'Madelyn Torff',
  initials: 'MT',
  role: 'UI/UX DESIGNER',
  headlineSegments: [
    { text: 'Hello, my name is Madelyn Torff', bold: false },
  ],
  tagline:
    'I design calm, usable product experiences — from discovery workshops to high-fidelity interfaces that feel effortless.',
  bio:
    'Short text with details about you, what you do or your professional career. You can add more information on the title, or change the title icon by applying from the title menu.',
  email: 'madelyn.torff@workmail.com',
  phone: '+1 (415) 555-0199',
  whatsapp: '+1 (415) 555-0199',
  location: 'Los Angeles, California',
  linkedin: 'https://linkedin.com/in/madelyntorff',
  website: 'https://instagram.com',
  profileImage:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=720&h=720&fit=crop&q=85',
  philosophyVideo:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=720&h=720&fit=crop&q=85',
  techStack: ['Figma', 'FigJam', 'Notion', 'Miro', 'Framer', 'Principle', 'Adobe XD', 'Webflow'],
  skills: ['Figma', 'FigJam', 'Notion', 'Miro', 'Framer'],
  stats: { years: '6', projects: '48', clients: '18', satisfaction: '99%' },
  features: [],
  philosophy: { label: 'About', title: 'About me' },
  services: [],
  projects: [
    {
      name: 'Mindful Motion',
      description:
        'A wellness product case study focused on calm motion, clear hierarchy, and a soft visual language for daily practice.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&h=900&q=85',
      tech: ['Figma', 'Research'],
      live: 'https://example.com',
      github: '#',
      roleTag: 'Product Design',
    },
    {
      name: 'Planner Studio',
      description:
        'Personal project crafted to demonstrate rapid interface exploration for planning tools. Content is placeholder storytelling.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&h=900&q=85',
      tech: ['UX', 'Planning'],
      live: 'https://example.com',
      github: '#',
      roleTag: 'UX Design',
    },
    {
      name: 'Pocket Companion',
      description:
        'A mobile product case study focused on clarity, hierarchy, and soft visual language for everyday users on the go.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&h=900&q=85',
      tech: ['Mobile', 'UI'],
      live: 'https://example.com',
      github: '#',
      roleTag: 'UI Design',
    },
  ],
  experience: [
    {
      role: 'Senior Product Designer',
      company: 'Studio North',
      period: '2022 – Present',
      description: 'Led end-to-end product design for SaaS platforms used by 80k+ monthly users.',
    },
  ],
};

export const folioOneBlank = () => ({
  name: '',
  initials: '',
  role: '',
  headlineSegments: [{ text: '', bold: false }],
  tagline: '',
  introQuote: '',
  bio: '',
  email: '',
  phone: '',
  whatsapp: '',
  resumeFileName: '',
  resumeFileData: '',
  location: '',
  linkedin: '',
  github: '',
  website: '',
  education: '',
  profileImage: '',
  experiencePortrait: '',
  philosophyVideo: '',
  techStack: [],
  skills: [],
  stats: { years: '0', projects: '0', clients: '0', satisfaction: '100%' },
  features: [],
  philosophy: { label: '', title: '' },
  services: [],
  projects: [],
  experience: [],
});

export const contentForTemplate = (templateId, mode = 'sample') => {
  if (mode === 'blank') return folioOneBlank();
  if (templateId === 'folio-two') return { ...folioTwoSample };
  return { ...folioOneSample };
};
