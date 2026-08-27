import { getCoverLetterTemplateById } from '../config/coverLetterTemplates';

const baseDesign = {
    pageSize: 'a4',
    fontSize: 12,
    lineHeight: 1.72,
    sideMargin: 22,
    topMargin: 24,
    bottomMargin: 24,
    nameSize: 26,
    applyAccentToName: true,
    applyAccentToHeading: true,
};

export const SAMPLE_COVER_LETTERS = {
    'classic-letter': {
        title: 'Product Manager Cover Letter',
        personal: {
            name: 'Alex Morgan',
            jobTitle: 'Senior Product Manager',
            email: 'alex.morgan@email.com',
            phone: '+91 98765 43210',
            location: 'Bengaluru, India',
            linkedin: 'linkedin.com/in/alexmorgan',
        },
        date: '20 August 2026',
        recipientName: 'Priya Mehta',
        recipientTitle: 'Head of Product',
        company: 'Northline Systems',
        companyAddress: 'Koramangala, Bengaluru',
        greeting: 'Dear Priya Mehta,',
        body: 'I am writing to apply for the Senior Product Manager role at Northline Systems. Over the past seven years I have shipped SaaS products used by more than 200,000 customers, working closely with engineering, design, and go-to-market teams to turn research into a roadmap that actually ships.\n\nAt Innovate Tech I owned pricing, onboarding, and activation. Experiments I led grew annual recurring revenue by 28 percent and cut time-to-value for new teams from six weeks to under two. I am drawn to Northline because you are solving the same problem at a larger scale.\n\nThank you for considering my application. I would welcome a conversation about how I can help Northline ship a product your customers trust.',
        closing: 'Sincerely,',
        signature: 'Alex Morgan',
        design: {
            ...baseDesign,
            accentColor: '#1A3A5C',
            fontFamily: 'Inter',
            headerAlign: 'left',
        },
    },
    'minimal-letter': {
        title: 'Software Engineer Cover Letter',
        personal: {
            name: 'Sofia Alvarez',
            jobTitle: 'Software Engineer',
            email: 'sofia.alvarez@email.com',
            phone: '+1 415 555 0198',
            location: 'San Francisco, CA',
            linkedin: 'linkedin.com/in/sofiaalvarez',
        },
        date: '9 November 2026',
        recipientName: 'Marcus Hale',
        recipientTitle: 'Engineering Manager',
        company: 'Lumen Cloud',
        companyAddress: 'SoMa, San Francisco',
        greeting: 'Dear Marcus Hale,',
        body: 'I am writing to apply for the Software Engineer role at Lumen Cloud. I build reliable backend services and care about the details that make systems easy to operate in production.\n\nAt Riverbyte I owned the billing API that processes 2 million events a day. We cut p95 latency by 40 percent and removed a class of timeout incidents that had been a weekly page. I would like to bring that same focus on correctness and calm operations to Lumen.\n\nThank you for your time. I would welcome a conversation about how I can contribute to your platform team.',
        closing: 'Best regards,',
        signature: 'Sofia Alvarez',
        design: {
            ...baseDesign,
            accentColor: '#2563EB',
            fontFamily: 'Nunito',
            headerAlign: 'center',
            nameSize: 22,
        },
    },
    'editorial-letter': {
        title: 'Data Analyst Cover Letter',
        personal: {
            name: 'Kabir Nair',
            jobTitle: 'Senior Data Analyst',
            email: 'kabir.nair@email.com',
            phone: '+91 98112 77654',
            location: 'Mumbai, India',
            linkedin: 'linkedin.com/in/kabirnair',
        },
        date: '4 October 2026',
        recipientName: 'Ananya Shah',
        recipientTitle: 'Director of Analytics',
        company: 'Meridian Retail',
        companyAddress: 'Bandra Kurla Complex, Mumbai',
        greeting: 'Dear Ananya Shah,',
        body: 'I am writing to apply for the Senior Data Analyst position at Meridian Retail. I build models and dashboards that help operators act, not just report, and I am looking for a team that treats data as a product.\n\nAt Eastbay Commerce I owned store-level forecasting and a weekly executive pack. Forecast error dropped 18 percent, and the pack became the default view for inventory huddles across 120 stores. I would like to do similar work for Meridian’s growing network.\n\nThank you for reading. I would welcome the chance to discuss how I can support your analytics roadmap.',
        closing: 'Yours sincerely,',
        signature: 'Kabir Nair',
        design: {
            ...baseDesign,
            accentColor: '#8B3A3A',
            fontFamily: 'Lora',
            headerAlign: 'left',
            nameSize: 28,
        },
    },
    'split-letter': {
        title: 'Brand Strategist Cover Letter',
        personal: {
            name: 'Elena Rossi',
            jobTitle: 'Brand Strategist',
            email: 'elena.rossi@email.com',
            phone: '+44 7700 900214',
            location: 'London, UK',
            linkedin: 'linkedin.com/in/elenarossi',
        },
        date: '18 July 2026',
        recipientName: 'James Whitaker',
        recipientTitle: 'Chief Marketing Officer',
        company: 'Northstar Media',
        companyAddress: 'Shoreditch, London',
        greeting: 'Dear James Whitaker,',
        body: 'I am applying for the Brand Strategist role at Northstar Media. I help companies turn a clear point of view into campaigns, naming, and a visual system that sales and product can actually use.\n\nAt Fieldwork Studio I led the repositioning of a fintech brand across eight markets. Consideration rose 22 percent in brand tracking, and the new narrative became the default pitch deck for the commercial team. I would like to do that kind of work for Northstar’s next chapter.\n\nThank you for your consideration. I would be glad to share a few case studies and how I partner with creative and performance teams.',
        closing: 'With regards,',
        signature: 'Elena Rossi',
        design: {
            ...baseDesign,
            accentColor: '#0F172A',
            fontFamily: 'Source Sans 3',
            headerAlign: 'left',
            nameSize: 24,
        },
    },
};

export const sampleCoverLetter = SAMPLE_COVER_LETTERS['classic-letter'];

export const sampleForCoverLetter = (templateId) => {
    const meta = getCoverLetterTemplateById(templateId);
    const sample = SAMPLE_COVER_LETTERS[meta.id] || SAMPLE_COVER_LETTERS['classic-letter'];
    return {
        ...JSON.parse(JSON.stringify(sample)),
        selectedTemplate: meta.id,
        design: {
            ...sample.design,
            accentColor: meta.accentColor,
            fontFamily: meta.fontFamily || sample.design.fontFamily,
            headerAlign: meta.headerAlign || sample.design.headerAlign,
        },
    };
};

export const blankForCoverLetter = (templateId) => {
    const meta = getCoverLetterTemplateById(templateId);
    return {
        title: 'Untitled Cover Letter',
        startBlank: true,
        personal: {
            name: '',
            jobTitle: '',
            email: '',
            phone: '',
            location: '',
            linkedin: '',
        },
        date: '',
        recipientName: '',
        recipientTitle: '',
        company: '',
        companyAddress: '',
        greeting: 'Dear Hiring Manager,',
        body: '',
        closing: 'Sincerely,',
        signature: '',
        selectedTemplate: meta.id,
        design: {
            ...baseDesign,
            accentColor: meta.accentColor,
            fontFamily: meta.fontFamily || 'Inter',
            headerAlign: meta.headerAlign || 'left',
        },
    };
};
