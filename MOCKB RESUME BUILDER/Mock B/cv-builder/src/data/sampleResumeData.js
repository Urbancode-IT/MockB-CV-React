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
            name: "Meera Krishnan",
            jobTitle: "Power BI Developer – 6+ years",
            email: "meera.krishnan@workmail.in",
            phone: "+91 98401 22876",
            location: "Bengaluru",
            website: "",
            linkedin: "linkedin.com/in/meerakrishnan",
            github: "",
        },
        summary:
            "Power BI developer who turns messy warehouse tables into reports that a manager can read without a walkthrough. I have built semantic models and service workspaces for finance, supply chain, and HR, and I look for teams that treat a dataset as a product.",
        profileBullets: [
            "Owned semantic models used weekly by finance and operations leadership.",
            "Built incremental refresh and row-level security for a 40-million-row fact table.",
            "Trained analysts to self-serve in Power BI Service without opening a ticket.",
            "Cut a 12-file Excel pack into one workspace with certified datasets.",
            "Partnered with SQL and Snowflake owners so DAX stayed thin and correct.",
            "Wrote deployment pipelines so a certified dataset reached UAT without a weekend copy.",
            "Documented a model guide that new joiners could use without a live walkthrough.",
        ],
        competencies: [
            "Semantic modelling",
            "DAX and Power Query",
            "Row-level security",
            "Power BI Service administration",
            "SQL (Oracle, Snowflake)",
            "Stakeholder workshops",
            "Incremental refresh",
            "Certified datasets",
        ],
        education: [
            {
                institution: "VIT University",
                degree: "B.Tech",
                field: "Computer Science & Engineering",
                startYear: "2014",
                endYear: "2018",
                location: "Vellore",
            },
            {
                institution: "Anna University",
                degree: "M.E.",
                field: "Computer Science",
                startYear: "2018",
                endYear: "2020",
                location: "Chennai",
            },
        ],
        skills: [
            { name: "Power BI Desktop", detail: "Star-schema models, composite models, and performance analyser for large fact tables." },
            { name: "Power Query Editor", detail: "Parameterized queries, incremental patterns, and clean staging before DAX." },
            { name: "DAX Functions", detail: "Time intelligence, iterators, and calculation groups used in finance packs." },
            { name: "Data Visualization", detail: "Executive pages that answer one question each, not a dashboard of charts." },
            { name: "Power BI Service", detail: "Workspaces, apps, deployment pipelines, and certified datasets." },
            { name: "SQL (Oracle, Snowflake)", detail: "Source queries that keep DAX thin and refresh times predictable." },
            { name: "Microsoft Excel", detail: "Power Query and pivot packs used as a fallback for teams not yet on Service." },
            { name: "Git / deployment pipelines", detail: "Promoting a dataset from Dev to Test without a weekend file copy." },
        ],
        experience: [
            {
                company: "Lumen Analytics",
                role: "Business Analyst",
                startDate: "Jun 2024",
                endDate: "Present",
                location: "Bengaluru",
                description:
                    "Own the weekly ops pack for a 90-person product org, from semantic model to Service app.\nRun a Monday review that finance and CS can sit through without a pre-read.\nKey Contribution: Cut first-response reporting from a 14-file Excel pack to one certified dataset.",
            },
            {
                company: "Harbor Data, Bengaluru",
                role: "Power BI Trainer",
                startDate: "Aug 2020",
                endDate: "Apr 2024",
                location: "Bengaluru",
                description:
                    "Designed a six-week clinic that took analysts from Excel dumps to a published app.\nCoached three cohorts on DAX that would still refresh overnight.\nKey Contribution: 40 analysts shipped a workspace without opening a developer ticket.",
            },
            {
                company: "Northline Tech, Bengaluru",
                role: "Power BI Developer",
                startDate: "Nov 2018",
                endDate: "Aug 2020",
                location: "Bengaluru",
                description:
                    "Built sales and inventory models on Oracle extracts for a regional retail desk.\nWrote Power Query that survived a source-column rename without a fire drill.\nPartnered with store ops so the pack landed before the Monday huddle.\nKey Contribution: Weekend stockout pack adopted by 28 stores as the Monday default.",
            },
        ],
        certifications: [
            { name: "PL-300 Power BI Data Analyst", issuer: "Microsoft", date: "2022" },
            { name: "DA-100 (legacy)", issuer: "Microsoft", date: "2021" },
            { name: "Snowflake Hands-on Essentials", issuer: "Snowflake", date: "2023" },
        ],
        projects: [
            {
                name: "Finance certified dataset",
                date: "2024 – Present",
                description: "One semantic model for P&L and cash, published as a certified dataset so FP&A stopped maintaining a shadow Excel cube.",
            },
            {
                name: "Store exception workspace",
                date: "2019 – 2020",
                description: "Inventory and stockout app for 28 stores, refreshed overnight from Oracle with a simple RLS map by region.",
            },
        ],
        awards: [
            {
                name: "Internal analytics prize",
                issuer: "Lumen Analytics",
                date: "2025",
                description: "For replacing the 14-file ops pack with one Service app.",
            },
            {
                name: "Trainer of the year",
                issuer: "Harbor Data",
                date: "2022",
                description: "Clinic completion rate above 90 percent across three cohorts.",
            },
        ],
        languages: [
            { name: "English", proficiency: "Professional" },
            { name: "Tamil", proficiency: "Native" },
            { name: "Kannada", proficiency: "Conversational" },
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
        pageSections: overlay.pageSections || next.pageSections,
        sectionTitles: { ...(next.sectionTitles || {}), ...(overlay.sectionTitles || {}) },
        profileBullets: overlay.profileBullets || next.profileBullets,
        competencies: overlay.competencies || next.competencies,
        courses: overlay.courses !== undefined ? overlay.courses : next.courses,
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
