// ======================================
// Sample Resume Data
//
// Used for template cards, preview modal,
// and a new resume before the user edits.
// Each template preview uses a different person.
// ======================================

import { ALL_BODY_SECTIONS } from '../config/pageLayout';
import { getTemplateById, isOnePageTemplate, isTwoColumnTemplate } from '../config/templates';

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
        columnSections: {
            left: ['skills', 'languages', 'interests', 'certifications'],
            right: ['summary', 'experience', 'education', 'projects', 'awards', 'organisations', 'courses'],
        },
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
        courses: [
            {
                name: "Staff Engineering Path",
                institution: "LeadDev",
                date: "2022",
                description: "Org design, technical strategy, and mentoring loops.",
            },
        ],
        columnSections: {
            left: [
                'skills',
                'education',
                'certifications',
                'languages',
                'courses',
                'awards',
                'organisations',
                'publications',
                'interests',
            ],
            right: ['summary', 'experience', 'projects', 'custom'],
        },
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
    "fresh-graduate": {
        personal: {
            name: "Mira Sen",
            jobTitle: "Junior UI Designer",
            email: "mira.sen@inbox.com",
            phone: "+91 98112 44067",
            location: "Jaipur, India",
            website: "mirasen.studio",
            linkedin: "linkedin.com/in/mirasen",
            github: "github.com/mirasen",
        },
        summary:
            "Design graduate who turns messy briefs into clear screens. I interned with product teams, hand off Figma files developers can build, and keep learning by rebuilding real websites. Comfortable running a short usability session, writing a one-page design note, and shipping a clickable prototype in the same week.",
        education: [
            {
                institution: "Northbridge Institute of Technology",
                degree: "B.Des",
                field: "Interaction Design",
                startYear: "2021",
                endYear: "2025",
                gpa: "8.4 / 10",
                description: "Visual systems, usability testing, and front-end prototypes. Capstone: campus events app used by 1,200 students across four departments.",
            },
            {
                institution: "Cedar Valley College",
                degree: "Diploma",
                field: "Digital Media",
                startYear: "2019",
                endYear: "2021",
                gpa: "A",
                description: "Typography, layout, photography, and HTML/CSS for portfolio sites.",
            },
        ],
        experience: [
            {
                company: "PixelForge Labs",
                role: "UI Design Intern",
                startDate: "Jun 2024",
                endDate: "Dec 2024",
                location: "Remote",
                description:
                    "Designed onboarding for a clinic booking tool and cut drop-off 18% in a four-week test.\nBuilt a 40-screen Figma kit with two engineers, including empty, error, and loading states.",
            },
            {
                company: "Campus Career Cell",
                role: "Student Design Volunteer",
                startDate: "Aug 2023",
                endDate: "May 2024",
                location: "Jaipur, India",
                description:
                    "Refreshed the internship portal so students could filter roles by skill, city, and stipend.\nRan weekly portfolio critiques for juniors and published a short Figma checklist.",
            },
            {
                company: "Kala Market",
                role: "Freelance UI Designer",
                startDate: "Jan 2023",
                endDate: "May 2023",
                location: "Jaipur, India",
                description:
                    "Redesigned a craft-seller landing page and mobile checkout.\nDelivered a style guide, icon set, and developer-ready specs in 12 days.",
            },
        ],
        skills: [
            { name: "Figma" },
            { name: "UI systems" },
            { name: "HTML / CSS" },
            { name: "Prototyping" },
            { name: "Usability tests" },
            { name: "Illustration" },
            { name: "SEO basics" },
            { name: "Presentation" },
            { name: "FigJam" },
            { name: "Accessibility" },
        ],
        projects: [
            {
                name: "Hostel Desk",
                description: "Hostel complaint tracker. Students file a ticket; wardens update status without a WhatsApp group.",
                technologies: ["Figma", "HTML", "CSS"],
                link: "mirasen.studio/hostel-desk",
            },
            {
                name: "Studio Hours",
                description: "Booking UI for the campus design lab. Cut no-shows with a same-day reminder screen.",
                technologies: ["Figma", "Prototyping"],
                link: "mirasen.studio/studio-hours",
            },
        ],
        languages: [],
        courses: [],
        awards: [],
        organisations: [],
        interests: [],
        certifications: [],
        custom: [],
        publications: [],
        references: [
            {
                name: "Kavya Nair",
                title: "Design Lead",
                company: "PixelForge Labs",
                email: "kavya.nair@pixelforge.dev",
                phone: "+91 98200 11834",
            },
            {
                name: "Rohit Banerjee",
                title: "Faculty Mentor",
                company: "Northbridge Institute",
                email: "r.banerjee@northbridge.edu",
                phone: "+91 97412 66301",
            },
        ],
        sectionTitles: {
            summary: "About Me",
            education: "Education",
            experience: "Experience",
            skills: "Skills",
            projects: "Projects",
            courses: "Courses",
            awards: "Awards",
            organisations: "Campus",
            interests: "Interests",
            languages: "Languages",
            references: "References",
        },
        design: {
            accentColor: "#111111",
            applyAccentToName: false,
            applyAccentToHeadings: false,
            applyAccentToJob: false,
            applyAccentToLines: false,
            headingStyle: "full-underline",
            headingTransform: "uppercase",
            headerAlignment: "left",
            nameSize: "l",
            fontSize: 10,
            lineHeight: 1.36,
            sectionSpacing: 13,
            headerGap: 10,
            topMargin: 11,
            bottomMargin: 14,
            sideMargin: 14,
            entrySpacing: 1,
            headingSize: 11,
            columns: "one",
            headerPos: "top",
        },
        themeColor: "#111111",
    },
    "campus-entry": {
        personal: {
            name: "Leela Iyer",
            jobTitle: "Computer Science Graduate",
            email: "leela.iyer@campusmail.in",
            phone: "+91 99021 44810",
            location: "Coimbatore, India",
            website: "leelaiyer.dev",
            linkedin: "linkedin.com/in/leelaiyer",
            github: "github.com/leelaiyer",
        },
        summary:
            "Final-year CS student who likes shipping small tools that save classmates time. I interned on a campus ERP team, write tests before I open a PR, and keep a public GitHub of class-project cleanups. Looking for a first software role where I can own a feature from ticket to release notes.",
        education: [
            {
                institution: "Harbour Technical University",
                degree: "B.E.",
                field: "Computer Science",
                startYear: "2021",
                endYear: "2025",
                gpa: "8.6 / 10",
            },
            {
                institution: "Riverbend Higher Secondary",
                degree: "HSC",
                field: "Computer Science",
                startYear: "2019",
                endYear: "2021",
                gpa: "92%",
            },
        ],
        experience: [
            {
                company: "Harbour ERP Lab",
                role: "Software Intern",
                startDate: "May 2024",
                endDate: "Aug 2024",
                location: "Coimbatore",
                description:
                    "Built attendance APIs used by 3 departments and 1,800 students.\nWrote test notes so the next intern could ship without a handover call.\nCut report generation from 40 seconds to 6 by indexing two SQL queries.",
            },
            {
                company: "LeafCart",
                role: "Backend Intern",
                startDate: "Dec 2023",
                endDate: "Feb 2024",
                location: "Remote",
                description:
                    "Added order-status webhooks and a retry queue for failed payments.\nDocumented the local setup so new hires could run the stack in under 20 minutes.",
            },
            {
                company: "Harbour Coding Club",
                role: "Teaching Assistant",
                startDate: "Aug 2023",
                endDate: "Apr 2024",
                location: "Coimbatore",
                description:
                    "Ran weekly Java labs for 40 first-years and graded assignments with a shared rubric.\nWrote 12 practice problems that are still in the club repo.",
            },
        ],
        skills: [
            { name: "Java" },
            { name: "Python" },
            { name: "SQL" },
            { name: "Git" },
            { name: "REST APIs" },
            { name: "Excel" },
            { name: "Spring Boot" },
            { name: "Postman" },
            { name: "JUnit" },
            { name: "Linux" },
        ],
        projects: [
            {
                name: "Slot Watch",
                description: "Notifies students when a cancelled lab slot opens. 600 installs in the first semester.",
                technologies: ["Java", "SQLite", "Android"],
                link: "github.com/leelaiyer/slot-watch",
            },
            {
                name: "Lab Queue",
                description: "Web queue for the campus computer lab. Faculty see wait time; students join from a QR code.",
                technologies: ["Python", "Flask", "PostgreSQL"],
                link: "github.com/leelaiyer/lab-queue",
            },
            {
                name: "Marksheet Cleaner",
                description: "CLI that turns messy CSV exports into a printable marksheet. Used by two department offices.",
                technologies: ["Python", "Pandas"],
                link: "github.com/leelaiyer/marksheet-cleaner",
            },
        ],
        interests: [
            { name: "Open source" },
            { name: "Chess" },
            { name: "Cycling" },
            { name: "Tamil cinema" },
        ],
        courses: [],
        awards: [],
        organisations: [],
        languages: [],
        certifications: [],
        publications: [],
        references: [],
        custom: [],
        sectionTitles: {
            summary: "Profile",
            experience: "Internships",
            education: "Education",
            skills: "Skills",
            projects: "Projects",
            courses: "Courses",
            awards: "Awards",
            organisations: "Campus",
            interests: "Interests",
        },
        design: {
            accentColor: "#1F4E5F",
            applyAccentToHeadings: true,
            applyAccentToLines: true,
            columns: "one",
            headerPos: "top",
            sectionSpacing: 12,
            fontSize: 10,
            lineHeight: 1.38,
            headerGap: 12,
            topMargin: 12,
            bottomMargin: 12,
            sideMargin: 14,
            entrySpacing: 1,
            headingSize: 11,
        },
        themeColor: "#1F4E5F",
    },
    "intern-banner": {
        personal: {
            name: "Samir Qureshi",
            jobTitle: "Marketing Intern",
            email: "samir.q@inbox.com",
            phone: "+91 97610 33218",
            location: "Lucknow, India",
            website: "samirq.work",
            linkedin: "linkedin.com/in/samirq",
        },
        summary:
            "Commerce graduate exploring brand and content internships. I ran a campus newsletter to 900 readers and like turning messy briefs into a weekly posting plan.",
        education: [
            {
                institution: "Maple Court College",
                degree: "B.Com",
                field: "Marketing",
                startYear: "2021",
                endYear: "2024",
            },
            {
                institution: "River Lane School",
                degree: "HSC",
                field: "Commerce",
                startYear: "2019",
                endYear: "2021",
            },
        ],
        experience: [
            {
                company: "Northlight Studio",
                role: "Content Intern",
                startDate: "Jan 2024",
                endDate: "Jun 2024",
                location: "Remote",
                description:
                    "Wrote product blurbs and scheduled eight social posts a week for a local cafe chain.\nGrew Instagram saves 22% with a before/after recipe series.",
            },
            {
                company: "Maple Court Placement Cell",
                role: "Campus Communications Intern",
                startDate: "Jul 2023",
                endDate: "Dec 2023",
                location: "Lucknow",
                description:
                    "Sent a weekly newsletter to 900 students covering internships, talks, and deadlines.\nDesigned posters and WhatsApp creatives for 14 placement drives.",
            },
            {
                company: "Gulzar Books",
                role: "Social Media Volunteer",
                startDate: "May 2023",
                endDate: "Aug 2023",
                location: "Lucknow",
                description:
                    "Shot and captioned 20 reels for a neighbourhood bookshop and tracked which posts brought weekend visits.",
            },
        ],
        skills: [
            { name: "Copywriting" },
            { name: "Canva" },
            { name: "Analytics" },
            { name: "Excel" },
            { name: "Research" },
            { name: "Instagram" },
            { name: "Caption writing" },
            { name: "Email newsletters" },
            { name: "Photography" },
            { name: "Google Sheets" },
        ],
        projects: [
            {
                name: "Campus Digest",
                description: "Student-run newsletter covering clubs, internships, and city events. Grew from 120 to 900 subscribers in two semesters.",
                technologies: ["MailerLite", "Canva"],
                link: "samirq.work/digest",
            },
            {
                name: "Cafe Week",
                description: "Seven-day content plan for Northlightâ€™s cafe client: recipes, staff stories, and a weekend offer.",
                technologies: ["Canva", "Sheets"],
                link: "samirq.work/cafe-week",
            },
            {
                name: "Alumni Notes",
                description: "Six short interviews with Maple Court graduates now in sales and brand roles. Used in placement orientation.",
                technologies: ["Docs", "Canva"],
            },
        ],
        courses: [],
        awards: [],
        organisations: [],
        interests: [],
        languages: [],
        certifications: [
            { name: "Google Digital Marketing", issuer: "Google", date: "2024", link: "" },
            { name: "HubSpot Content Marketing", issuer: "HubSpot", date: "2023", link: "" },
        ],
        publications: [],
        references: [],
        custom: [],
        sectionTitles: {
            summary: "About",
            experience: "Experience",
            education: "Education",
            skills: "Skills",
            certifications: "Certifications",
            projects: "Projects",
            courses: "Courses",
            awards: "Awards",
            organisations: "Campus",
            interests: "Interests",
        },
        design: {
            accentColor: "#3730A3",
            applyAccentToHeadings: true,
            applyAccentToLines: true,
            columns: "one",
            headerPos: "top",
            sectionSpacing: 18,
            fontSize: 10,
            lineHeight: 1.32,
            headerGap: 10,
            topMargin: 8,
            bottomMargin: 10,
            sideMargin: 14,
            entrySpacing: 1,
            headingSize: 11,
        },
        themeColor: "#3730A3",
    },
    "career-detail": {
        personal: {
            name: "Neha Kapoor",
            jobTitle: "Director of Operations",
            email: "neha.kapoor@workmail.in",
            phone: "+91 98400 22118",
            location: "Delhi, India",
            website: "nehakapoor.co",
            linkedin: "linkedin.com/in/nehakapoor",
            github: "",
        },
        summary:
            "Operations lead who turns messy delivery into a weekly plan. I have run support, billing, and onboarding for a 90-person SaaS team and look for roles where process work shows up in customer numbers.",
        experience: [
            {
                company: "Northbridge SaaS",
                role: "Director of Operations",
                startDate: "Mar 2021",
                endDate: "Present",
                location: "Delhi, India",
                description:
                    "Cut first-response time from 14 hours to 4 by rewriting the queue and hiring two leads.\nOwned weekly ops review with product, CS, and finance.",
            },
            {
                company: "ClearPath Logistics",
                role: "Operations Manager",
                startDate: "Jun 2017",
                endDate: "Feb 2021",
                location: "Noida, India",
                description:
                    "Scaled a 22-person warehouse desk without adding a third shift.\nBuilt a simple SLA board that sales could read without a walkthrough.",
            },
            {
                company: "Harbor Retail",
                role: "Operations Analyst",
                startDate: "Jul 2015",
                endDate: "May 2017",
                location: "Delhi, India",
                description:
                    "Tracked store-level stockouts and wrote the weekly exception report for 40 locations.\nFlagged three SKUs that were driving 60% of missed sales.",
            },
        ],
        education: [
            {
                institution: "Delhi School of Economics",
                degree: "M.A.",
                field: "Economics",
                startYear: "2015",
                endYear: "2017",
            },
            {
                institution: "Lady Shri Ram College",
                degree: "B.A.",
                field: "Economics",
                startYear: "2012",
                endYear: "2015",
            },
        ],
        skills: [
            { name: "Operations", level: "Expert" },
            { name: "Process design", level: "Expert" },
            { name: "Excel / Sheets", level: "Proficient" },
            { name: "Stakeholder mgmt", level: "Expert" },
            { name: "Hiring", level: "Proficient" },
            { name: "SLA design", level: "Proficient" },
            { name: "Vendor management", level: "Proficient" },
            { name: "Workforce planning", level: "Competent" },
        ],
        projects: [
            {
                name: "Queue Reset",
                description:
                    "Rewrote the support queue so urgent tickets surface before volume.\nTrained two leads to run the board without a daily standup.",
                technologies: ["Freshdesk", "Sheets"],
                link: "nehakapoor.co/queue",
            },
            {
                name: "Onboard Week",
                description: "Five-day plan that got new CS hires live without shadowing a lead for a month.",
                technologies: ["Notion", "Loom"],
            },
        ],
        certifications: [
            { name: "Lean Six Sigma Green Belt", issuer: "ASQ", date: "2022" },
            { name: "ITIL Foundation", issuer: "Axelos", date: "2020" },
        ],
        languages: [
            { name: "English", proficiency: "Native" },
            { name: "Hindi", proficiency: "Native" },
            { name: "Punjabi", proficiency: "Conversational" },
        ],
        awards: [
            {
                name: "Ops excellence award",
                issuer: "Northbridge SaaS",
                date: "2023",
                description: "For the queue reset that cut wait time by 70%.",
            },
            {
                name: "People manager of the quarter",
                issuer: "ClearPath Logistics",
                date: "2019",
                description: "Given after the warehouse desk held SLA through peak season.",
            },
            {
                name: "Internal process prize",
                issuer: "Harbor Retail",
                date: "2016",
                description: "Stockout report adopted by 40 stores as the Monday pack.",
            },
        ],
        organisations: [
            {
                name: "Women in Ops Delhi",
                role: "Co-host",
                date: "2022 - Present",
                description: "Monthly dinner for ops managers at mid-size SaaS firms.",
            },
            {
                name: "CS Ops Circle",
                role: "Mentor",
                date: "2020 - 2023",
                description: "Six-week clinic for first-time team leads on queue design.",
            },
        ],
        publications: [
            {
                name: "Make the queue visible",
                publisher: "Support Driven",
                date: "2023",
                description: "How we stopped hiding SLAs in a slide deck.",
            },
            {
                name: "Hire the desk, not the hero",
                publisher: "Ops Collective",
                date: "2021",
                description: "Why staffing plans fail when one person owns every exception.",
            },
        ],
        courses: [
            {
                name: "Workforce planning for services",
                institution: "ISB Executive",
                date: "2022",
                description: "Shift design and coverage math for 24/7 desks.",
            },
            {
                name: "Negotiation for operators",
                institution: "IIM Bangalore",
                date: "2018",
                description: "Vendor and stakeholder sessions used in the ClearPath years.",
            },
        ],
        interests: [
            { name: "Long-distance running" },
            { name: "Hindi theatre" },
            { name: "Weekend cooking" },
            { name: "City walking groups" },
            { name: "Amateur cricket" },
        ],
        references: [
            {
                name: "Arjun Mehta",
                title: "CEO",
                company: "Northbridge SaaS",
                email: "arjun.mehta@northbridge.example",
            },
            {
                name: "Priya Nair",
                title: "VP Customer Success",
                company: "Northbridge SaaS",
                email: "priya.nair@northbridge.example",
            },
        ],
        pageSections: {
            page1: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
            page2: ['languages', 'courses', 'awards', 'organisations', 'publications', 'interests', 'references'],
        },
        sectionTitles: {
            summary: "About",
            experience: "Work experience",
            education: "Education",
            skills: "Core skills",
            projects: "Projects",
            certifications: "Certificates",
            languages: "Languages",
            courses: "Courses",
            awards: "Awards",
            organisations: "Volunteer work",
            publications: "Publications",
            interests: "Interests",
            references: "References",
        },
        design: {
            accentColor: "#111111",
            applyAccentToHeadings: true,
            applyAccentToLines: true,
            columns: "one",
            headerPos: "top",
            footerPageNumbers: false,
            sectionSpacing: 14,
            headingSize: 13,
        },
        themeColor: "#111111",
    },
    "north-shore": {
        personal: {
            name: "Maya Sen",
            jobTitle: "Head of Product Operations",
            email: "maya.sen@workmail.in",
            phone: "+91 98200 11834",
            location: "Bengaluru, India",
            website: "mayasen.co",
            linkedin: "linkedin.com/in/mayasen",
            github: "",
        },
        summary:
            "Product operations lead who keeps roadmap, support, and finance on one calendar. I have shipped weekly operating reviews for a 70-person product org and look for roles where the plan is visible without a slide deck.",
        experience: [
            {
                company: "Lumen Apps",
                role: "Head of Product Operations",
                startDate: "Jan 2021",
                endDate: "Present",
                location: "Bengaluru, India",
                description:
                    "Cut launch slip from 18 days to 5 by putting a single intake board in front of engineering and GTM.\nRan a Monday review that product, CS, and finance could sit through without a pre-read.",
            },
            {
                company: "Kite Payments",
                role: "Program Manager",
                startDate: "Apr 2017",
                endDate: "Dec 2020",
                location: "Pune, India",
                description:
                    "Moved three payment rails onto one status page so sales stopped chasing Slack.\nStaffed a 14-person delivery pod without adding a fourth manager.",
            },
            {
                company: "Shoreline Retail",
                role: "Operations Associate",
                startDate: "Jun 2014",
                endDate: "Mar 2017",
                location: "Kolkata, India",
                description:
                    "Built the weekly stock exception pack for 28 stores.\nFlagged two SKUs that drove most missed weekend sales.",
            },
        ],
        education: [
            {
                institution: "IIM Calcutta",
                degree: "MBA",
                field: "Operations",
                startYear: "2012",
                endYear: "2014",
            },
            {
                institution: "Jadavpur University",
                degree: "B.E.",
                field: "Industrial Engineering",
                startYear: "2008",
                endYear: "2012",
            },
        ],
        skills: [
            { name: "Product ops", level: "Expert" },
            { name: "Roadmap hygiene", level: "Expert" },
            { name: "Jira / Linear", level: "Proficient" },
            { name: "Stakeholder mgmt", level: "Expert" },
            { name: "Launch planning", level: "Proficient" },
            { name: "OKR design", level: "Proficient" },
        ],
        projects: [
            {
                name: "Intake Board",
                description:
                    "One queue for feature asks so urgent work is not buried under volume.\nGave CS a public SLA they could quote without a PM.",
                technologies: ["Linear", "Notion"],
                link: "mayasen.co/intake",
            },
            {
                name: "Launch Week",
                description: "Five-day checklist that got GTM live without a war room.",
                technologies: ["Sheets", "Loom"],
            },
        ],
        certifications: [
            { name: "Pragmatic Management", issuer: "Pragmatic Institute", date: "2022" },
            { name: "CSPO", issuer: "Scrum Alliance", date: "2019" },
        ],
        languages: [
            { name: "English", proficiency: "Native" },
            { name: "Bengali", proficiency: "Native" },
            { name: "Hindi", proficiency: "Fluent" },
        ],
        awards: [
            {
                name: "Operating cadence award",
                issuer: "Lumen Apps",
                date: "2023",
                description: "For the Monday review that replaced three status meetings.",
            },
            {
                name: "Delivery prize",
                issuer: "Kite Payments",
                date: "2019",
                description: "Rails launch held date through a vendor change.",
            },
        ],
        organisations: [
            {
                name: "Women in Product Bengaluru",
                role: "Host",
                date: "2021 - Present",
                description: "Quarterly breakfast for ops leads at mid-size product firms.",
            },
            {
                name: "PM Ops Lab",
                role: "Mentor",
                date: "2019 - 2022",
                description: "Six-week clinic on intake design for first-time program managers.",
            },
        ],
        publications: [
            {
                name: "Stop hiding the board",
                publisher: "Mind the Product",
                date: "2023",
                description: "Why status lives in a queue, not a deck.",
            },
            {
                name: "One calendar, three teams",
                publisher: "Lenny’s Newsletter",
                date: "2021",
                description: "How we kept GTM and engineering on the same week.",
            },
        ],
        courses: [
            {
                name: "Systems thinking for operators",
                institution: "ISB Executive",
                date: "2022",
                description: "Constraint mapping for multi-team launches.",
            },
            {
                name: "Facilitation for product leads",
                institution: "IIM Bangalore",
                date: "2018",
                description: "Running reviews that end with owners, not notes.",
            },
        ],
        interests: [
            { name: "Open-water swimming" },
            { name: "Bengali cinema" },
            { name: "Trail walking" },
            { name: "Community radio" },
        ],
        references: [
            {
                name: "Kabir Rao",
                title: "CRO",
                company: "Lumen Apps",
                email: "kabir.rao@lumen.example",
            },
            {
                name: "Tara Menon",
                title: "VP Engineering",
                company: "Lumen Apps",
                email: "tara.menon@lumen.example",
            },
        ],
        pageSections: {
            page1: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
            page2: ['languages', 'courses', 'awards', 'organisations', 'publications', 'interests', 'references'],
        },
        sectionTitles: {
            summary: "Profile",
            experience: "Experience",
            education: "Education",
            skills: "Skills",
            projects: "Projects",
            certifications: "Certificates",
            languages: "Languages",
            courses: "Courses",
            awards: "Awards",
            organisations: "Community",
            publications: "Writing",
            interests: "Interests",
            references: "References",
        },
        design: {
            accentColor: "#0F4C5C",
            applyAccentToHeadings: true,
            applyAccentToLines: true,
            columns: "one",
            headerPos: "top",
            footerPageNumbers: false,
            sectionSpacing: 14,
            headingSize: 12,
        },
        themeColor: "#0F4C5C",
    },
    "gold-rule": {
        personal: {
            name: "Arjun Malhotra",
            jobTitle: "Analytics Engineer – 7+ years",
            email: "arjun.malhotra@workmail.in",
            phone: "+91 98120 44765",
            location: "Hyderabad",
            website: "",
            linkedin: "linkedin.com/in/arjunmalhotra",
            github: "",
        },
        summary:
            "Analytics engineer who builds warehouse-ready models and clear decision packs for product and finance. I have shipped dbt pipelines, Looker explores, and executive scorecards for growth and ops teams that need numbers they can defend.",
        profileBullets: [
            "Owned the core revenue mart used in weekly leadership reviews.",
            "Cut ad-hoc SQL tickets by publishing certified Looker explores with tests.",
            "Moved a brittle spreadsheet pack onto a scheduled warehouse job.",
            "Partnered with finance so margin definitions stayed consistent across teams.",
            "Added data tests that catch broken joins before the Monday pack goes out.",
            "Documented a metrics dictionary new analysts can use without a live walkthrough.",
            "Ran a small enablement clinic so PMs pull their own cohort views safely.",
        ],
        competencies: [
            "Dimensional modelling",
            "dbt and SQL",
            "Looker / LookML",
            "Warehouse performance",
            "Metrics definitions",
            "Stakeholder workshops",
            "Data testing",
            "Executive scorecards",
        ],
        education: [
            {
                institution: "BITS Pilani",
                degree: "B.E.",
                field: "Computer Science",
                startYear: "2013",
                endYear: "2017",
                location: "Hyderabad",
            },
            {
                institution: "IIIT Hyderabad",
                degree: "M.Tech",
                field: "Data Science",
                startYear: "2017",
                endYear: "2019",
                location: "Hyderabad",
            },
        ],
        skills: [
            { name: "SQL & dbt", detail: "Marts, incremental models, and tests that keep leadership packs stable overnight." },
            { name: "Looker / LookML", detail: "Explores and dashboards that answer one decision each, not a wall of charts." },
            { name: "Python", detail: "Light ETL helpers and validation scripts around warehouse jobs." },
            { name: "Data visualization", detail: "Scorecards for product and finance with clear owners and definitions." },
            { name: "Snowflake / BigQuery", detail: "Cost-aware models and scheduled refreshes for weekly packs." },
            { name: "Git & CI", detail: "Pull-request reviews and model tests before anything hits production." },
            { name: "Excel / Sheets", detail: "Fallback packs for teams still moving off local files." },
            { name: "Stakeholder enablement", detail: "Short clinics so PMs and analysts self-serve without breaking definitions." },
        ],
        experience: [
            {
                company: "Brightlane Commerce",
                role: "Analytics Engineer",
                startDate: "May 2023",
                endDate: "Present",
                location: "Hyderabad",
                description:
                    "Own the revenue and funnel marts that feed the Monday leadership scorecard.\nPartner with product and finance on one set of margin and retention definitions.\nKey Contribution: Replaced a 10-file spreadsheet pack with a tested dbt project and Looker app.",
            },
            {
                company: "Orbit Payments",
                role: "Data Analyst",
                startDate: "Jul 2019",
                endDate: "Apr 2023",
                location: "Bengaluru",
                description:
                    "Built payment success and settlement views used by ops and risk every morning.\nWrote SQL that survived source schema changes without a weekend fire drill.\nKey Contribution: Cut investigation time for failed batches from hours to a single explore.",
            },
            {
                company: "Cedar Retail Labs",
                role: "Junior Data Analyst",
                startDate: "Jun 2017",
                endDate: "Jun 2019",
                location: "Chennai",
                description:
                    "Supported store and category reporting for a regional retail desk.\nAutomated a weekly stock exception file that ops could read without a walkthrough.\nKey Contribution: Exception pack adopted by 22 stores as the Monday default.",
            },
        ],
        certifications: [
            { name: "dbt Analytics Engineering", issuer: "dbt Labs", date: "2023" },
            { name: "Google Data Analytics", issuer: "Google", date: "2021" },
            { name: "Snowflake Hands-on Essentials", issuer: "Snowflake", date: "2022" },
        ],
        projects: [
            {
                name: "Leadership scorecard mart",
                date: "2023 – Present",
                description: "One tested revenue mart and Looker app so FP&A and product stopped maintaining shadow spreadsheets.",
            },
            {
                name: "Settlement exception explore",
                date: "2020 – 2022",
                description: "Morning view of failed payment batches with owner and retry status for a 40-person ops desk.",
            },
        ],
        awards: [
            {
                name: "Data quality award",
                issuer: "Brightlane Commerce",
                date: "2024",
                description: "For the tested mart that removed the spreadsheet pack from Monday reviews.",
            },
            {
                name: "Ops partner award",
                issuer: "Orbit Payments",
                date: "2021",
                description: "Given after settlement explores cut morning triage time in half.",
            },
        ],
        languages: [
            { name: "English", proficiency: "Professional" },
            { name: "Hindi", proficiency: "Native" },
            { name: "Telugu", proficiency: "Conversational" },
        ],
        courses: [],
        pageSections: {
            page1: ['summary', 'education', 'certifications', 'languages'],
            page2: ['skills', 'experience', 'projects', 'awards'],
        },
        sectionTitles: {
            summary: "Profile",
            education: "Education",
            certifications: "Certifications",
            skills: "Skill",
            experience: "Professional Experience",
            projects: "Projects",
            awards: "Awards",
            languages: "Languages",
        },
        design: {
            accentColor: "#C9A227",
            applyAccentToHeadings: false,
            applyAccentToName: false,
            columns: "one",
            headerPos: "top",
            footerPageNumbers: false,
            sectionSpacing: 16,
            headingSize: 11,
        },
        themeColor: "#C9A227",
    },
    "role-frontend": {
        personal: {
            name: "Diya Menon",
            jobTitle: "Frontend Developer",
            email: "diya.menon@workmail.in",
            phone: "+91 98765 44120",
            location: "Bengaluru, India",
            website: "diyamenon.dev",
            linkedin: "linkedin.com/in/diyamenon",
            github: "github.com/diyamenon",
        },
        summary:
            "Frontend developer who ships accessible React interfaces and keeps design systems tidy. I partner with design and backend so product changes land without surprise regressions, and I care about measurable load times as much as clean components.",
        experience: [
            {
                company: "PixelForge Labs",
                role: "Frontend Developer",
                startDate: "Mar 2022",
                endDate: "Present",
                location: "Bengaluru",
                description:
                    "Built React + TypeScript screens for a B2B dashboard used by 8k weekly active users.\nCut LCP on the home route by 32% with route-level code splitting and image budgets.\nOwned Storybook coverage for shared button, form, and table primitives across three squads.",
            },
            {
                company: "Northwave Soft",
                role: "UI Engineer",
                startDate: "Jul 2020",
                endDate: "Feb 2022",
                location: "Kochi",
                description:
                    "Implemented design tokens and responsive layouts for a marketing site and app shell.\nStabilized visual regressions with Testing Library checks before each release train.\nMigrated class components to hooks without a customer-facing downtime window.",
            },
            {
                company: "Campus Labs",
                role: "Frontend Intern",
                startDate: "Jan 2020",
                endDate: "Jun 2020",
                location: "Kochi",
                description:
                    "Shipped a student portal module in React and documented the handoff for full-time engineers.",
            },
        ],
        education: [
            {
                institution: "NIT Calicut",
                degree: "B.Tech",
                field: "Computer Science",
                startYear: "2016",
                endYear: "2020",
                location: "Kozhikode",
            },
        ],
        skills: [
            { name: "React / TypeScript", level: "Expert" },
            { name: "HTML / CSS / Tailwind", level: "Expert" },
            { name: "Next.js", level: "Proficient" },
            { name: "Redux / Zustand", level: "Proficient" },
            { name: "Testing Library / Jest", level: "Proficient" },
            { name: "Figma handoff", level: "Proficient" },
        ],
        projects: [
            {
                name: "Design system kit",
                description: "Shared React component library with tokens, docs, and Storybook examples for three product squads.",
                technologies: ["React", "Storybook", "TypeScript"],
            },
            {
                name: "Checkout polish",
                description: "Rebuilt a multi-step checkout with clearer validation and keyboard flows; raised completion by 9%.",
                technologies: ["React", "Zustand"],
            },
        ],
        certifications: [
            { name: "Meta Front-End Developer", issuer: "Coursera", date: "2023" },
            { name: "Web Accessibility", issuer: "edX", date: "2022" },
        ],
        courses: [
            { name: "Advanced React Patterns", institution: "Frontend Masters", date: "2023" },
        ],
        awards: [
            { name: "Hack week winner", issuer: "PixelForge Labs", date: "2024", description: "For the checkout polish that raised completion." },
        ],
        interests: [
            { name: "Open source UI kits" },
            { name: "Web performance" },
            { name: "Design systems" },
        ],
        languages: [
            { name: "English", proficiency: "Professional" },
            { name: "Malayalam", proficiency: "Native" },
        ],
        design: {
            accentColor: "#2563EB",
            applyAccentToHeadings: true,
            applyAccentToLines: true,
            columns: "one",
            headerPos: "top",
            sectionSpacing: 8,
        },
        themeColor: "#2563EB",
    },
    "role-backend": {
        personal: {
            name: "Vikram Rao",
            jobTitle: "Backend Developer",
            email: "vikram.rao@workmail.in",
            phone: "+91 98200 77341",
            location: "Hyderabad, India",
            website: "vikramrao.dev",
            linkedin: "linkedin.com/in/vikramrao",
            github: "github.com/vikramrao",
        },
        summary:
            "Backend developer focused on reliable APIs, clear data models, and calm incident response. I ship services that stay readable when traffic and team size both grow, with tests and runbooks that on-call can trust.",
        experience: [
            {
                company: "Ledgerly Systems",
                role: "Backend Developer",
                startDate: "Jan 2021",
                endDate: "Present",
                location: "Hyderabad",
                description:
                    "Owned Node.js / PostgreSQL services for billing events processing ~2M events/day.\nAdded idempotent consumers and dead-letter handling that cut retry storms during peaks.\nWrote runbooks so on-call engineers could recover without a senior on the call.",
            },
            {
                company: "Cloudspan",
                role: "Software Engineer",
                startDate: "Jun 2018",
                endDate: "Dec 2020",
                location: "Pune",
                description:
                    "Built REST and gRPC APIs for partner integrations with contract tests.\nIntroduced schema reviews that caught breaking changes before staging.\nReduced p95 latency on the read path by adding Redis caching for hot keys.",
            },
            {
                company: "SoftNest",
                role: "Junior Backend Engineer",
                startDate: "Jul 2017",
                endDate: "May 2018",
                location: "Hyderabad",
                description:
                    "Maintained internal auth services and added audit logs for admin actions.",
            },
        ],
        education: [
            {
                institution: "IIIT Hyderabad",
                degree: "B.Tech",
                field: "Computer Science",
                startYear: "2014",
                endYear: "2018",
                location: "Hyderabad",
            },
        ],
        skills: [
            { name: "Node.js / TypeScript", level: "Expert" },
            { name: "PostgreSQL / Redis", level: "Expert" },
            { name: "System design", level: "Proficient" },
            { name: "Kafka / queues", level: "Proficient" },
            { name: "Docker / Kubernetes", level: "Proficient" },
            { name: "gRPC / OpenAPI", level: "Proficient" },
        ],
        projects: [
            {
                name: "Event settlement service",
                description: "Idempotent billing pipeline with replay-safe consumers and clear owner alerts.",
                technologies: ["Node.js", "PostgreSQL", "Kafka"],
            },
            {
                name: "Partner API gateway",
                description: "Rate-limited gateway with API keys, audit logs, and OpenAPI docs for three partners.",
                technologies: ["Go", "Redis", "OpenAPI"],
            },
        ],
        certifications: [
            { name: "AWS Developer Associate", issuer: "Amazon", date: "2022" },
            { name: "PostgreSQL for Developers", issuer: "Udemy", date: "2021" },
        ],
        courses: [
            { name: "Designing Data-Intensive Applications (study group)", institution: "Internal", date: "2023" },
        ],
        awards: [
            { name: "Reliability award", issuer: "Ledgerly Systems", date: "2023", description: "For the settlement pipeline that held SLA through peak season." },
        ],
        interests: [
            { name: "Distributed systems" },
            { name: "Database internals" },
            { name: "On-call craft" },
        ],
        languages: [
            { name: "English", proficiency: "Professional" },
            { name: "Hindi", proficiency: "Native" },
        ],
        design: {
            accentColor: "#0F766E",
            applyAccentToHeadings: true,
            applyAccentToLines: true,
            columns: "one",
            headerPos: "top",
            sectionSpacing: 8,
        },
        themeColor: "#0F766E",
    },
    "role-fullstack": {
        personal: {
            name: "Ananya Krish",
            jobTitle: "Full Stack Developer",
            email: "ananya.krish@workmail.in",
            phone: "+91 97412 88031",
            location: "Chennai, India",
            website: "ananyakrish.dev",
            linkedin: "linkedin.com/in/ananyakrish",
            github: "github.com/ananyakrish",
        },
        summary:
            "Full stack developer who owns features from schema to UI. I partner with product and design so releases ship with tests, feature flags, and clear owners — not surprise breakages on Monday.",
        experience: [
            {
                company: "Harbor Apps",
                role: "Full Stack Developer",
                startDate: "Apr 2021",
                endDate: "Present",
                location: "Chennai",
                description:
                    "Shipped React + NestJS features for a B2B workspace used by 180+ teams.\nCut onboarding support tickets 28% with a clearer first-run flow and checklist.\nBuilt a shared component kit reused across web and admin.\nAdded feature flags so risky changes ship behind a toggle.",
            },
            {
                company: "Softlane",
                role: "Software Engineer",
                startDate: "Aug 2018",
                endDate: "Mar 2021",
                location: "Bengaluru",
                description:
                    "Built dashboards and APIs for billing and usage analytics.\nAdded OpenAPI contract checks in CI before merge.\nMentored two juniors through their first production releases.",
            },
        ],
        education: [
            {
                institution: "Anna University",
                degree: "B.E.",
                field: "Computer Science",
                startYear: "2014",
                endYear: "2018",
                location: "Chennai",
            },
        ],
        skills: [
            { name: "React / TypeScript" },
            { name: "Node.js / NestJS" },
            { name: "PostgreSQL" },
            { name: "REST / GraphQL" },
            { name: "AWS" },
            { name: "Docker" },
            { name: "CI / CD" },
            { name: "Testing" },
        ],
        projects: [
            {
                name: "Workspace onboarding",
                date: "2023",
                description: "First-run flow that raised activation 14% and cut week-1 support tickets.",
                technologies: ["React", "NestJS", "Postgres"],
            },
            {
                name: "Admin console",
                date: "2022",
                description: "Billing overrides and user impersonation with audit trails.",
                technologies: ["React", "Node.js"],
            },
            {
                name: "Notify hub",
                date: "2022",
                description: "Email and in-app notifications with preference center and quiet hours.",
                technologies: ["NestJS", "Redis"],
            },
        ],
        certifications: [
            { name: "Full-Stack Web Development", issuer: "Udemy", date: "2020" },
            { name: "GraphQL Developer", issuer: "Apollo", date: "2022" },
        ],
        courses: [],
        awards: [
            { name: "Ship award", issuer: "Harbor Apps", date: "2023", description: "Onboarding reboot that lifted activation." },
        ],
        interests: [
            { name: "DX tooling" },
            { name: "Product analytics" },
            { name: "Mentoring" },
        ],
        languages: [
            { name: "English", proficiency: "Professional" },
            { name: "Tamil", proficiency: "Native" },
            { name: "Hindi", proficiency: "Conversational" },
        ],
        design: {
            accentColor: "#0369A1",
            applyAccentToHeadings: true,
            applyAccentToLines: true,
            applyAccentToDates: true,
            columns: "one",
            headerPos: "top",
            sectionSpacing: 8,
            fontSize: 9,
            lineHeight: 1.32,
            topMargin: 10,
            bottomMargin: 9,
            sideMargin: 14,
        },
        themeColor: "#0369A1",
    },
    "role-data-analyst": {
        personal: {
            name: "Isha Patel",
            jobTitle: "Data Analyst",
            email: "isha.patel@workmail.in",
            phone: "+91 98112 55028",
            location: "Ahmedabad, India",
            website: "",
            linkedin: "linkedin.com/in/ishapatel",
            github: "",
        },
        summary:
            "Data analyst who turns messy warehouse tables into decisions product and finance can defend. I build clear SQL models, tidy dashboards, and short write-ups that end with an owner — not a wall of charts.",
        experience: [
            {
                company: "Brightlane Retail",
                role: "Data Analyst",
                startDate: "Feb 2022",
                endDate: "Present",
                location: "Ahmedabad",
                description:
                    "Owned weekly sales and margin packs for 40 stores using SQL and Looker.\nReplaced a 12-file spreadsheet pack with one certified dashboard.\nPartnered with category leads so definitions stayed consistent across reviews.",
            },
            {
                company: "InsightWorks",
                role: "Junior Analyst",
                startDate: "Jun 2019",
                endDate: "Jan 2022",
                location: "Mumbai",
                description:
                    "Supported campaign reporting and A/B readouts for a growth team.\nAutomated recurring Excel extracts into scheduled SQL jobs.\nWrote a metrics dictionary new joiners could use without a live walkthrough.",
            },
        ],
        education: [
            {
                institution: "Nirma University",
                degree: "B.Tech",
                field: "Information Technology",
                startYear: "2015",
                endYear: "2019",
                location: "Ahmedabad",
            },
        ],
        skills: [
            { name: "SQL", level: "Expert", detail: "Warehouse extracts and marts" },
            { name: "Looker / Tableau", level: "Proficient", detail: "Certified explores and packs" },
            { name: "Python (pandas)", level: "Proficient", detail: "Cleanup and validation scripts" },
            { name: "Excel / Sheets", level: "Expert", detail: "Fallback packs for ops" },
            { name: "Statistics basics", level: "Competent", detail: "A/B readouts" },
            { name: "Stakeholder workshops", level: "Proficient", detail: "Definitions and owners" },
        ],
        projects: [
            {
                name: "Store margin pack",
                description: "One Looker explore that replaced the Monday spreadsheet pack for regional ops.",
                technologies: ["SQL", "Looker"],
            },
            {
                name: "Campaign readout kit",
                description: "Reusable notebook and slide outline for growth experiments.",
                technologies: ["Python", "Sheets"],
            },
        ],
        certifications: [
            { name: "Google Data Analytics", issuer: "Google", date: "2021" },
            { name: "SQL for Data Science", issuer: "Coursera", date: "2020" },
        ],
        courses: [
            { name: "Looker for Analysts", institution: "Google Cloud", date: "2022" },
        ],
        awards: [
            { name: "Insight award", issuer: "Brightlane Retail", date: "2023", description: "For retiring the spreadsheet pack." },
        ],
        interests: [
            { name: "Retail ops" },
            { name: "Data storytelling" },
            { name: "Metrics design" },
        ],
        languages: [
            { name: "English", proficiency: "Professional" },
            { name: "Gujarati", proficiency: "Native" },
        ],
        design: {
            accentColor: "#B45309",
            applyAccentToHeadings: true,
            applyAccentToLines: false,
            columns: "one",
            headerPos: "top",
            headerAlignment: "center",
            sectionSpacing: 8,
        },
        themeColor: "#B45309",
    },
    "role-ux-designer": {
        personal: {
            name: "Tara Sethi",
            jobTitle: "UX Designer",
            email: "tara.sethi@workmail.in",
            phone: "+91 98990 11234",
            location: "Gurugram, India",
            website: "tarasethi.design",
            linkedin: "linkedin.com/in/tarasethi",
            github: "",
        },
        summary:
            "UX designer who turns messy product bets into clear flows and prototypes. I partner with PMs and engineers so research shows up in the shipped UI — with measurable activation and fewer support tickets.",
        experience: [
            {
                company: "Brightpath Apps",
                role: "UX Designer",
                startDate: "May 2021",
                endDate: "Present",
                location: "Gurugram",
                description:
                    "Led discovery and UI for onboarding that lifted week-1 activation by 16%.\nRan moderated tests with 24 users and turned findings into a prioritized backlog.\nMaintained a Figma library used by three product squads.",
            },
            {
                company: "Studio North",
                role: "UI Designer",
                startDate: "Jul 2018",
                endDate: "Apr 2021",
                location: "Delhi",
                description:
                    "Designed marketing and in-app screens for two SaaS clients.\nBuilt responsive prototypes that survived handoff without a redesign pass.\nRan weekly critique sessions that kept spacing and type consistent.",
            },
            {
                company: "Freelance",
                role: "Product Designer",
                startDate: "Jan 2017",
                endDate: "Jun 2018",
                location: "Delhi",
                description:
                    "Delivered mobile and web wireframes for three early-stage startups.\nRan guerrilla tests in cafes to validate flows before build.",
            },
        ],
        education: [
            {
                institution: "NID Ahmedabad",
                degree: "B.Des",
                field: "Interaction Design",
                startYear: "2014",
                endYear: "2018",
                location: "Ahmedabad",
            },
        ],
        skills: [
            { name: "Figma" },
            { name: "User research" },
            { name: "Prototyping" },
            { name: "Design systems" },
            { name: "Usability testing" },
            { name: "FigJam" },
        ],
        projects: [
            {
                name: "Onboard Lite",
                date: "2023",
                description: "Three-screen first-run flow with clearer empty states; +16% week-1 activation.",
                technologies: ["Figma", "Maze"],
            },
            {
                name: "Component kit",
                date: "2022",
                description: "Shared UI kit with tokens and docs adopted by three squads.",
                technologies: ["Figma", "Storybook"],
            },
        ],
        certifications: [
            { name: "Google UX Design", issuer: "Coursera", date: "2020" },
            { name: "NN/g UX Certification", issuer: "Nielsen Norman", date: "2022" },
        ],
        courses: [
            { name: "Advanced Prototyping in Figma", institution: "IDF", date: "2023" },
        ],
        awards: [
            { name: "Design craft award", issuer: "Brightpath Apps", date: "2023", description: "Onboarding lift." },
        ],
        interests: [
            { name: "Service design" },
            { name: "Inclusive design" },
            { name: "Typography" },
        ],
        languages: [
            { name: "English", proficiency: "Professional" },
            { name: "Hindi", proficiency: "Native" },
        ],
        design: {
            accentColor: "#9D174D",
            applyAccentToHeadings: true,
            applyAccentToLines: true,
            applyAccentToDates: true,
            applyAccentToJob: true,
            columns: "one",
            headerPos: "top",
            sectionSpacing: 8,
            fontSize: 9,
        },
        themeColor: "#9D174D",
    },
    "role-devops": {
        personal: {
            name: "Karan Mehta",
            jobTitle: "DevOps / Cloud Engineer",
            email: "karan.mehta@workmail.in",
            phone: "+91 97654 20981",
            location: "Pune, India",
            website: "",
            linkedin: "linkedin.com/in/karanmehta",
            github: "github.com/karanmehta",
        },
        summary:
            "DevOps engineer who keeps deploy pipelines boring and production recoverable. I own CI/CD, cloud cost hygiene, and runbooks that on-call can follow without a senior on the call.",
        experience: [
            {
                company: "Nimbus Scale",
                role: "DevOps Engineer",
                startDate: "Mar 2020",
                endDate: "Present",
                location: "Pune",
                description:
                    "Moved release trains onto GitHub Actions with blue-green deploys on EKS.\nCut mean time to recover with clearer alerts and a shared incident checklist.\nOwned Terraform modules for VPC, RDS, and worker fleets.\nRan monthly cost reviews that trimmed idle spend without touching peak capacity.",
            },
            {
                company: "Stacklane",
                role: "SRE Associate",
                startDate: "Jun 2017",
                endDate: "Feb 2020",
                location: "Bengaluru",
                description:
                    "Ran Jenkins pipelines and Docker builds for five product services.\nWrote the first on-call playbook for payment outages.\nAdded Prometheus dashboards that made error budgets visible to product.\nHardened staging so QA stopped losing environments mid-sprint.",
            },
        ],
        education: [
            {
                institution: "VIT Vellore",
                degree: "B.Tech",
                field: "Information Technology",
                startYear: "2013",
                endYear: "2017",
                location: "Vellore",
            },
        ],
        skills: [
            { name: "AWS" },
            { name: "Kubernetes" },
            { name: "Terraform" },
            { name: "Docker" },
            { name: "GitHub Actions" },
            { name: "Prometheus / Grafana" },
            { name: "Linux" },
            { name: "Bash / Python" },
            { name: "Helm" },
            { name: "Argo CD" },
        ],
        projects: [
            {
                name: "Blue-green platform",
                date: "2023",
                description: "Zero-downtime deploy path for three APIs with automated rollback hooks.",
                technologies: ["EKS", "Terraform", "Actions"],
            },
            {
                name: "Cost guardrails",
                date: "2022",
                description: "Scheduled scale-down and budget alerts that cut idle spend safely.",
                technologies: ["AWS", "Terraform"],
            },
            {
                name: "On-call kit",
                date: "2021",
                description: "Shared incident checklist and Slack hooks used across five services.",
                technologies: ["PagerDuty", "Grafana"],
            },
        ],
        certifications: [
            { name: "AWS Solutions Architect Associate", issuer: "Amazon", date: "2022" },
            { name: "CKA", issuer: "CNCF", date: "2023" },
        ],
        courses: [
            { name: "Kubernetes in Production", institution: "Linux Foundation", date: "2022" },
            { name: "Terraform Deep Dive", institution: "HashiCorp", date: "2021" },
        ],
        awards: [
            { name: "Ops excellence", issuer: "Nimbus Scale", date: "2024", description: "For the blue-green platform rollout." },
        ],
        interests: [
            { name: "Platform engineering" },
            { name: "Incident reviews" },
            { name: "Home lab clusters" },
        ],
        languages: [
            { name: "English", proficiency: "Professional" },
            { name: "Hindi", proficiency: "Native" },
            { name: "Marathi", proficiency: "Conversational" },
        ],
        design: {
            accentColor: "#334155",
            applyAccentToHeadings: true,
            applyAccentToLines: true,
            columns: "one",
            headerPos: "top",
            sectionSpacing: 10,
            fontSize: 9.5,
            lineHeight: 1.38,
            topMargin: 11,
            bottomMargin: 10,
            sideMargin: 14,
        },
        themeColor: "#334155",
    },
    "role-ml-engineer": {
        personal: {
            name: "Nisha Varma",
            jobTitle: "ML / AI Engineer",
            email: "nisha.varma@workmail.in",
            phone: "+91 98100 44567",
            location: "Bengaluru, India",
            website: "nishavarma.ai",
            linkedin: "linkedin.com/in/nishavarma",
            github: "github.com/nishavarma",
        },
        summary:
            "ML engineer who ships models that stay maintainable in production. I work across feature pipelines, evaluation, and lightweight LLM apps with clear owners for drift, cost, and quality — not notebook demos that never leave research.",
        experience: [
            {
                company: "Signal Labs",
                role: "ML Engineer",
                startDate: "Aug 2021",
                endDate: "Present",
                location: "Bengaluru",
                description:
                    "Built ranking and retrieval features for a B2B search product.\nCut inference cost 28% with batching and a distilled model.\nOwned evaluation notebooks that product could read without a stats walkthrough.",
            },
            {
                company: "Datafold",
                role: "Data Scientist",
                startDate: "Jun 2018",
                endDate: "Jul 2021",
                location: "Hyderabad",
                description:
                    "Shipped churn models and weekly insight packs for CS leadership.\nMoved experiments from notebooks into scheduled training jobs.\nDocumented feature definitions so new joiners stopped reinventing labels.",
            },
        ],
        education: [
            {
                institution: "IISc Bangalore",
                degree: "M.Tech",
                field: "Computational Data Science",
                startYear: "2016",
                endYear: "2018",
                location: "Bengaluru",
            },
            {
                institution: "BITS Pilani",
                degree: "B.E.",
                field: "Computer Science",
                startYear: "2012",
                endYear: "2016",
                location: "Pilani",
            },
        ],
        skills: [
            { name: "Python", detail: "PyTorch, scikit-learn, pandas" },
            { name: "LLM apps", detail: "RAG, evaluation, prompt tooling" },
            { name: "Feature pipelines", detail: "Airflow / batch jobs" },
            { name: "SQL", detail: "Warehouse extracts for training sets" },
            { name: "MLOps basics", detail: "Model registry and monitoring" },
            { name: "Experiment tracking", detail: "MLflow / lightweight logs" },
        ],
        projects: [
            {
                name: "Retrieval assistant",
                description: "Internal RAG over support docs with cited answers and cost caps.",
                technologies: ["Python", "OpenAI", "Postgres"],
            },
            {
                name: "Ranking v2",
                description: "Re-ranker that lifted top-3 relevance without growing latency budget.",
                technologies: ["PyTorch", "Feast"],
            },
        ],
        certifications: [
            { name: "Deep Learning Specialization", issuer: "Coursera", date: "2019" },
            { name: "MLOps Fundamentals", issuer: "Duke / Coursera", date: "2022" },
        ],
        courses: [
            { name: "LLM Application Engineering", institution: "DeepLearning.AI", date: "2023" },
        ],
        awards: [
            { name: "Applied ML prize", issuer: "Signal Labs", date: "2024", description: "For the cost cut on inference." },
        ],
        interests: [
            { name: "Evaluation design" },
            { name: "Open research notes" },
            { name: "Teaching workshops" },
        ],
        languages: [
            { name: "English", proficiency: "Professional" },
            { name: "Hindi", proficiency: "Native" },
        ],
        design: {
            accentColor: "#4C1D95",
            applyAccentToHeadings: true,
            columns: "one",
            headerPos: "top",
            sectionSpacing: 8,
        },
        themeColor: "#4C1D95",
    },
    "role-product": {
        personal: {
            name: "Rohan Desai",
            jobTitle: "Product Manager",
            email: "rohan.desai@workmail.in",
            phone: "+91 98200 33410",
            location: "Mumbai, India",
            website: "",
            linkedin: "linkedin.com/in/rohandesai",
            github: "",
        },
        summary:
            "Product manager who ships weekly bets with clear owners and measurable outcomes. I keep engineering, design, and GTM on one plan so launches do not need a slide deck to explain — and I write specs that survive handoff.",
        experience: [
            {
                company: "Orbit SaaS",
                role: "Product Manager",
                startDate: "Jan 2021",
                endDate: "Present",
                location: "Mumbai",
                description:
                    "Owned activation and retention for a B2B workspace used by 12k accounts.\nCut time-to-value by rewriting onboarding with design and growth.\nRan a Monday review that replaced three status meetings.",
            },
            {
                company: "Paylane",
                role: "Associate PM",
                startDate: "Jul 2018",
                endDate: "Dec 2020",
                location: "Bengaluru",
                description:
                    "Shipped billing self-serve flows that reduced support tickets by 22%.\nWrote PRDs that engineering could implement without a follow-up walkthrough.\nRan discovery interviews that killed two features before they wasted a quarter.",
            },
        ],
        education: [
            {
                institution: "IIM Indore",
                degree: "MBA",
                field: "Product & Strategy",
                startYear: "2016",
                endYear: "2018",
                location: "Indore",
            },
            {
                institution: "Delhi University",
                degree: "B.Com (Hons)",
                field: "Commerce",
                startYear: "2013",
                endYear: "2016",
                location: "Delhi",
            },
        ],
        skills: [
            { name: "Roadmapping", level: "Expert" },
            { name: "Discovery / interviews", level: "Expert" },
            { name: "SQL basics", level: "Proficient" },
            { name: "Experiment design", level: "Proficient" },
            { name: "Stakeholder management", level: "Expert" },
            { name: "PRDs & specs", level: "Proficient" },
        ],
        projects: [
            {
                name: "Activation reboot",
                description: "Onboarding redesign that lifted week-1 activation without adding a sales assist step.",
                technologies: ["Amplitude", "Figma"],
            },
            {
                name: "Experiment board",
                description: "Shared board for hypothesis, owner, and outcome so growth stopped tracking wins in Slack.",
                technologies: ["Amplitude", "Notion"],
            },
        ],
        certifications: [
            { name: "Product School PM Certificate", issuer: "Product School", date: "2019" },
            { name: "Reforge Product Strategy", issuer: "Reforge", date: "2022" },
        ],
        courses: [
            { name: "Behavioral Product Management", institution: "Reforge", date: "2021" },
        ],
        awards: [
            { name: "Impact award", issuer: "Orbit SaaS", date: "2023", description: "For the activation reboot." },
        ],
        interests: [
            { name: "Growth loops" },
            { name: "Customer interviews" },
            { name: "Writing specs" },
        ],
        languages: [
            { name: "English", proficiency: "Professional" },
            { name: "Hindi", proficiency: "Native" },
        ],
        design: {
            accentColor: "#0E7490",
            applyAccentToHeadings: true,
            columns: "one",
            headerPos: "top",
            sectionSpacing: 8,
        },
        themeColor: "#0E7490",
    },
};

export const sampleForTemplate = (templateId) => {
    const next = cloneSample();
    const overlay = TEMPLATE_SAMPLES[templateId];
    if (!overlay) {
        return {
            ...next,
            pageSections: { page1: [...ALL_BODY_SECTIONS], page2: [] },
            pageEntrySlices: {},
            startBlank: false,
        };
    }
    // One-page templates stay packed on page 1 (gallery + pre-edit).
    // Multipage templates keep their designed page1/page2 split so thumbs show both sheets.
    const pageSections = isOnePageTemplate(templateId)
        ? { page1: [...ALL_BODY_SECTIONS], page2: [] }
        : (overlay.pageSections || { page1: [...ALL_BODY_SECTIONS], page2: [] });

    // Role samples must not inherit unused base lists (causes ExtraSections overflow).
    const roleClean = String(templateId).startsWith('role-')
        ? {
            interests: overlay.interests || [],
            courses: overlay.courses !== undefined ? overlay.courses : [],
            awards: overlay.awards || [],
            organisations: overlay.organisations || [],
            publications: overlay.publications || [],
            references: overlay.references || [],
            declaration: overlay.declaration || [],
            custom: overlay.custom || [],
            columnSections: undefined,
            design: {
                ...(next.design || {}),
                ...(overlay.design || {}),
                columns: 'one',
                headerPos: 'top',
                sectionSpacing: overlay.design?.sectionSpacing ?? 8,
                fontSize: overlay.design?.fontSize ?? 9,
            },
        }
        : {};

    return {
        ...next,
        ...overlay,
        personal: { ...next.personal, ...(overlay.personal || {}) },
        design: { ...(next.design || {}), ...(overlay.design || {}), ...(roleClean.design || {}) },
        pageSections,
        pageEntrySlices: {},
        columnSections: overlay.columnSections || next.columnSections,
        sectionTitles: { ...(next.sectionTitles || {}), ...(overlay.sectionTitles || {}) },
        profileBullets: overlay.profileBullets || next.profileBullets,
        competencies: overlay.competencies || next.competencies,
        courses: overlay.courses !== undefined ? overlay.courses : next.courses,
        ...roleClean,
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
        sectionOrder: [],
        pageSections: {
            page1: [...ALL_BODY_SECTIONS],
            page2: [],
        },
        pageEntrySlices: {},
        themeColor: meta.accentColor,
        design: {
            accentColor: meta.accentColor,
            applyAccentToName: false,
            columns: twoCol ? 'two' : 'one',
            headerPos: twoCol ? 'left' : 'top',
        },
        columnSections: twoCol ? { left: [], right: [] } : undefined,
    };
};

/**
 * One-page Full Stack sample expanded into a true multipage resume (Career Detail).
 * Used to seed "Your resumes" for page-break demos.
 */
export const buildMultipageDemoResume = () => {
    const onePager = sampleForTemplate('role-fullstack');
    const multipageShell = sampleForTemplate('career-detail');
    return {
        ...multipageShell,
        personal: {
            ...onePager.personal,
            name: 'Ananya Krish',
            jobTitle: 'Full Stack Developer',
        },
        summary:
            `${onePager.summary} Across Harbor Apps and Softlane I have led schema design, API contracts, and UI delivery for workspace, billing, and admin surfaces — with runbooks the next engineer can follow.`,
        experience: [
            ...(onePager.experience || []),
            {
                company: 'Campus Works',
                role: 'Junior Developer',
                startDate: 'Jun 2017',
                endDate: 'Jul 2018',
                location: 'Chennai',
                description:
                    'Built internal tools in React and Express for campus booking.\nWrote integration tests that caught booking conflicts before go-live.\nDocumented the deploy checklist used by two student teams.',
            },
            {
                company: 'Freelance',
                role: 'Contract Engineer',
                startDate: 'Jan 2017',
                endDate: 'May 2017',
                location: 'Remote',
                description:
                    'Delivered two small NestJS APIs for local retailers.\nSet up basic CI with lint and unit tests before handoff.',
            },
        ],
        education: onePager.education,
        skills: [
            ...(onePager.skills || []),
            { name: 'System design', level: 'Proficient' },
            { name: 'Mentoring', level: 'Competent' },
        ],
        projects: [
            ...(onePager.projects || []),
            {
                name: 'Contract test harness',
                date: '2021',
                description: 'Shared OpenAPI fixture pack that blocked breaking API changes in CI.',
                technologies: ['Jest', 'OpenAPI'],
            },
            {
                name: 'Design token sync',
                date: '2023',
                description: 'CLI that pushed Figma tokens into the React component kit.',
                technologies: ['Node.js', 'Style Dictionary'],
            },
        ],
        certifications: onePager.certifications,
        courses: [
            { name: 'System Design for Full Stack', institution: 'Educative', date: '2023' },
            { name: 'Testing JavaScript Applications', institution: 'Frontend Masters', date: '2022' },
        ],
        awards: onePager.awards,
        interests: onePager.interests,
        languages: onePager.languages,
        organisations: [
            {
                name: 'Chennai JS Meetup',
                role: 'Volunteer organizer',
                date: '2022 - Present',
                description: 'Monthly talks on React testing and NestJS patterns.',
            },
            {
                name: 'Women Who Code Chennai',
                role: 'Mentor',
                date: '2021 - 2023',
                description: 'Pairing sessions for first production PRs.',
            },
        ],
        publications: [
            {
                name: 'Ship behind a flag',
                publisher: 'Harbor Eng Blog',
                date: '2023',
                description: 'How we rolled out risky billing changes without weekend fire drills.',
            },
            {
                name: 'Contract tests that stick',
                publisher: 'Softlane Notes',
                date: '2020',
                description: 'Why OpenAPI fixtures beat screenshot diffs for APIs.',
            },
        ],
        references: [
            {
                name: 'Priya Sharma',
                title: 'Engineering Manager',
                company: 'Harbor Apps',
                email: 'priya.sharma@harbor.example',
            },
            {
                name: 'Rahul Iyer',
                title: 'Staff Engineer',
                company: 'Softlane',
                email: 'rahul.iyer@softlane.example',
            },
        ],
        pageSections: {
            page1: ['summary', 'experience', 'education', 'skills'],
            page2: ['projects', 'certifications', 'courses', 'awards', 'languages', 'interests', 'organisations', 'publications', 'references'],
        },
        sectionTitles: {
            ...(multipageShell.sectionTitles || {}),
            summary: 'Summary',
            experience: 'Experience',
            education: 'Education',
            skills: 'Skills',
            projects: 'Projects',
            certifications: 'Certifications',
            courses: 'Courses',
            awards: 'Awards',
            languages: 'Languages',
            interests: 'Interests',
            organisations: 'Organisations',
            publications: 'Publications',
            references: 'References',
        },
        design: {
            ...(multipageShell.design || {}),
            accentColor: '#0369A1',
            applyAccentToHeadings: true,
            applyAccentToLines: true,
            columns: 'one',
            headerPos: 'top',
            footerPageNumbers: true,
            sectionSpacing: 14,
            fontSize: 10,
        },
        themeColor: '#0369A1',
        selectedTemplate: 'career-detail',
    };
};

export default sampleResumeData;
