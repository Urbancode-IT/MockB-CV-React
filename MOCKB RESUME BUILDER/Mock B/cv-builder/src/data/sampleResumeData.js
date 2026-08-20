// ======================================
// Sample Resume Data
//
// Used for template cards, preview modal,
// and a new resume before the user edits.
// Each template preview uses a different person.
// ======================================

import { getTemplateById, isTwoColumnTemplate } from '../config/templates';

const sampleResumeData = {
    personal: {
        name: "Alex Morgan",
        jobTitle: "Senior Product Manager",
        email: "alex.morgan@email.com",
        phone: "+91 98765 43210",
        location: "Bengaluru, India",
        website: "alexmorgan.dev",
        linkedin: "linkedin.com/in/alexmorgan",
        github: "github.com/alexmorgan",
    },

    summary:
        "Product Manager with 7+ years leading cross-functional teams. Grew engagement 40% and revenue through research-backed roadmaps that engineering and design can ship.",

    experience: [
        {
            company: "Innovate Tech Solutions",
            role: "Senior Product Manager",
            startDate: "Jan 2021",
            endDate: "Present",
            location: "Bengaluru, India",
            description:
                "Led the product lifecycle for a SaaS platform serving 200K+ users.\nGrew ARR 28% through pricing experiments and onboarding improvements.",
        },
        {
            company: "StartupHub India",
            role: "Product Manager",
            startDate: "Mar 2018",
            endDate: "Dec 2020",
            location: "Mumbai, India",
            description:
                "Prioritized the roadmap from research and business goals.\nRaised retention 35% with a redesigned onboarding flow.",
        },
    ],

    education: [
        {
            institution: "Indian Institute of Management",
            degree: "MBA",
            field: "Product & Innovation",
            startYear: "2016",
            endYear: "2018",
            gpa: "",
        },
        {
            institution: "VIT University",
            degree: "B.Tech",
            field: "Computer Science",
            startYear: "2012",
            endYear: "2016",
            gpa: "8.7 / 10",
        },
    ],

    skills: [
        { name: "Product Strategy", level: "Expert" },
        { name: "Agile / Scrum", level: "Expert" },
        { name: "Data Analysis", level: "Proficient" },
        { name: "SQL", level: "Proficient" },
        { name: "Figma / UX", level: "Competent" },
    ],

    projects: [
        {
            name: "AI-Powered Resume Builder",
            description:
                "MERN SaaS that generates ATS-optimized resumes. 5,000 users in the first month.",
            technologies: ["React", "Node.js", "MongoDB", "OpenAI"],
            link: "https://mockb.io",
        },
    ],

    certifications: [
        {
            name: "Certified Scrum Product Owner (CSPO)",
            issuer: "Scrum Alliance",
            date: "2022",
            link: "",
        },
        {
            name: "Google Analytics Certified",
            issuer: "Google",
            date: "2021",
            link: "",
        },
    ],

    languages: [
        { name: "English", proficiency: "Native/Bilingual" },
        { name: "Hindi", proficiency: "Native/Bilingual" },
        { name: "Tamil", proficiency: "Proficient" },
    ],
};

const cloneSample = () => JSON.parse(JSON.stringify(sampleResumeData));

const TEMPLATE_SAMPLES = {
    "classic-professional": {
        personal: sampleResumeData.personal,
    },
    "portrait-profile": {
        personal: {
            name: "Priya Sharma",
            jobTitle: "Lead Product Designer",
            email: "priya.sharma@email.com",
            phone: "+91 98401 22810",
            location: "Hyderabad, India",
            website: "priyasharma.design",
            linkedin: "linkedin.com/in/priyasharma",
            github: "github.com/priyasharma",
        },
        summary:
            "Product designer with 8 years shipping research-led experiences. I partner with PMs and engineers to turn messy problems into clear, shippable product bets.",
    },
    "structured-split": {
        personal: {
            name: "Jordan Hale",
            jobTitle: "Engineering Manager",
            email: "jordan.hale@email.com",
            phone: "+91 97654 11022",
            location: "Pune, India",
            website: "jordanhale.dev",
            linkedin: "linkedin.com/in/jordanhale",
            github: "github.com/jordanhale",
        },
        summary:
            "Engineering manager with 9+ years building reliable product platforms. I grow teams, set a weekly shipping cadence, and keep architecture simple enough to ship.",
        skills: [
            { name: "Team Leadership", level: "Expert" },
            { name: "System Design", level: "Expert" },
            { name: "Node.js / React", level: "Proficient" },
            { name: "Cloud / AWS", level: "Proficient" },
            { name: "Mentoring", level: "Expert" },
            { name: "Agile Delivery", level: "Proficient" },
        ],
        projects: [
            {
                name: "Realtime Ops Dashboard",
                description:
                    "Built a live incident board used by 40 on-call engineers across platform and product squads.\nStreamed service health, paging, and owner context so the first responder could act without hunting Slack threads.\nCut mean time to detect from 18 minutes to 4 and reduced duplicate pages during regional failovers.",
                technologies: ["React", "WebSocket", "AWS"],
                link: "ops.jordanhale.dev",
            },
            {
                name: "Internal Design System",
                description:
                    "Created a shared React UI kit with tokens, docs, and Storybook examples for six product squads.\nReplaced one-off CSS and duplicate form patterns so new screens shipped with the same spacing, type, and states.\nCut duplicate front-end work by 30% and dropped visual bugs reported in QA by about half.",
                technologies: ["React", "Storybook", "Figma"],
                link: "",
            },
            {
                name: "Hiring Pipeline Tool",
                description:
                    "Built an internal tracker for take-home reviews, panel feedback, and offer stages.\nGave hiring managers one place to see blockers instead of spreadsheets and email threads.\nShortened time-to-offer from 28 days to 16 and made interview load visible per interviewer.",
                technologies: ["Node.js", "PostgreSQL", "React"],
                link: "",
            },
        ],
        awards: [
            {
                name: "Engineering Excellence",
                issuer: "Innovate Tech Solutions",
                date: "2023",
                description: "",
            },
        ],
        interests: [
            { name: "Open source" },
            { name: "Trail running" },
            { name: "Mentoring" },
        ],
        custom: [
            { title: "Delivery reliability", description: "Incidents down 40%." },
            { title: "Team growth", description: "Two seniors promoted to tech lead." },
            { title: "Platform scale", description: "p95 API latency under 200ms." },
        ],
        sectionTitles: {
            custom: "Key Achievements",
        },
        organisations: [
            {
                name: "Pune JS Meetup",
                role: "Organiser",
                startDate: "2022",
                endDate: "Present",
                description: "Monthly talks for 120+ local engineers.",
            },
        ],
        publications: [
            {
                name: "From incidents to insight",
                publisher: "InfoQ",
                date: "2023",
                description: "How a live ops board cut detect time from 18 minutes to 4.",
            },
        ],
        experience: [
            {
                company: "Innovate Tech Solutions",
                role: "Engineering Manager",
                startDate: "Jan 2021",
                endDate: "Present",
                location: "Pune, India",
                description:
                    "Led a 12-person platform team serving 200K+ users.\nCut production incidents 40% with better on-call and release checks.\nGrew two senior engineers into tech leads.",
            },
            {
                company: "StartupHub India",
                role: "Senior Software Engineer",
                startDate: "Mar 2017",
                endDate: "Dec 2020",
                location: "Mumbai, India",
                description:
                    "Built the core API that onboarded 80K customers.\nRaised p95 latency from 900ms to 180ms.",
            },
        ],
    },
    "centered-minimal": {
        personal: {
            name: "Kabir Nair",
            jobTitle: "Software Developer",
            email: "kabir.nair@email.com",
            phone: "",
            location: "Kochi, Kerala",
            website: "kabirnair.dev",
            linkedin: "linkedin.com/in/kabirnair",
            github: "github.com/kabirnair",
        },
        summary:
            "Software developer focused on clean, reliable product work. I build web applications with a practical mix of backend logic and frontend craft, and I look for roles where I can ship features, learn from code review, and grow into stronger engineering ownership. Comfortable working in small teams, writing clear documentation, and turning a ticket into a tested change.",
        skills: [
            { name: "Python & Java" },
            { name: "HTML & CSS" },
            { name: "JavaScript Basics" },
            { name: "React" },
            { name: "Git" },
            { name: "Problem Solving" },
        ],
        awards: [
            {
                name: "Department Project Showcase",
                issuer: "",
                date: "2024",
                description:
                    "Selected for a campus showcase after building a tool that automated attendance tracking and reporting for 300+ students.",
            },
        ],
        experience: [
            {
                company: "Northline Systems",
                role: "IT Intern",
                startDate: "Jun 2024",
                endDate: "Aug 2024",
                location: "Kochi, India",
                description:
                    "Supported internal tools and documentation for a software team. Helped test features, fix small UI bugs, and write setup notes so new interns could start without waiting on a walkthrough.",
            },
        ],
        education: [
            {
                institution: "Cochin University of Science and Technology",
                degree: "Bachelor of Technology",
                field: "Information Technology",
                startYear: "Aug 2020",
                endYear: "May 2024",
                gpa: "CGPA: 8.4 / 10",
                location: "Kochi, India",
            },
            {
                institution: "St. Thomas Higher Secondary School",
                degree: "Higher Secondary",
                field: "Computer Science",
                startYear: "Jun 2018",
                endYear: "Mar 2020",
                gpa: "91%",
                location: "Kochi, India",
            },
        ],
        certifications: [
            {
                name: "Programming Foundations",
                issuer: "NPTEL",
                date: "2023",
                link: "",
            },
        ],
        projects: [],
        languages: [],
        sectionTitles: {
            summary: "Summary",
            skills: "Area of Expertise",
            awards: "Key Achievements",
            experience: "Professional Experience",
            education: "Education",
            certifications: "Certifications",
        },
        design: {
            applyAccentToName: true,
            applyAccentToHeadings: false,
            applyAccentToJob: false,
            applyAccentToLines: false,
            headerAlignment: 'center',
            linkUnderline: false,
            linkIcon: false,
            accentColor: '#0E7490',
            fontSize: 11,
            lineHeight: 1.5,
            nameSize: 'l',
            roleSize: 'l',
            headingSize: 13,
            sectionSpacing: 28,
            headerGap: 18,
            topMargin: 16,
            bottomMargin: 16,
            sideMargin: 18,
            entrySpacing: 1.4,
        },
    },
};

export const sampleForTemplate = (templateId) => {
    const next = cloneSample();
    const overlay = TEMPLATE_SAMPLES[templateId];
    if (!overlay) return next;
    return {
        ...next,
        ...overlay,
        personal: { ...next.personal, ...(overlay.personal || {}) },
        design: { ...(next.design || {}), ...(overlay.design || {}) },
        startBlank: false,
    };
};

export const blankForTemplate = (templateId) => {
    const meta = getTemplateById(templateId);
    const twoCol = isTwoColumnTemplate(templateId);
    return {
        startBlank: true,
        personal: {
            name: '',
            jobTitle: '',
            email: '',
            phone: '',
            location: '',
            website: '',
            linkedin: '',
            github: '',
        },
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: [],
        interests: [],
        awards: [],
        organisations: [],
        publications: [],
        references: [],
        declaration: [],
        courses: [],
        custom: [],
        sectionTitles: {},
        themeColor: meta.accentColor,
        design: {
            accentColor: meta.accentColor,
            applyAccentToName: true,
            columns: twoCol ? 'two' : 'one',
            headerPos: twoCol ? 'left' : 'top',
        },
        columnSections: twoCol ? { left: [], right: [] } : undefined,
    };
};

export default sampleResumeData;
