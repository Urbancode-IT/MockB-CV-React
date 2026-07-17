// Shared data for Role-Based Resume Builder components

export const categoryData = {
  fullstack: {
    title: 'Fullstack Development Roles',
    desc: 'Select your specialized tech stack to generate a precision-targeted resume.',
    roles: [
      { name: 'Java Full Stack', desc: 'Spring Boot, Hibernate, and Angular/React frontend.', icon: 'fa-brands fa-java' },
      { name: 'Angular', desc: 'TypeScript, RxJS, and enterprise-scale SPA development.', icon: 'fa-brands fa-angular' },
      { name: 'MERN Stack', desc: 'MongoDB, Express.js, React, and Node.js specialization.', icon: 'fa-solid fa-layer-group' },
      { name: 'MEAN Stack', desc: 'MongoDB, Express.js, Angular, and Node.js solutions.', icon: 'fa-solid fa-code' },
      { name: 'Microsoft SharePoint', desc: 'Office 365, Power Automate, and custom SPFx solutions.', icon: 'fa-brands fa-microsoft' },
      { name: 'React Native', desc: 'Cross-platform mobile apps with React Native and Expo.', icon: 'fa-brands fa-react' },
      { name: '.NET Angular', desc: 'ASP.NET Core APIs with Angular frontend architecture.', icon: 'fa-solid fa-gear' },
      { name: 'React JS', desc: 'Modern React, Hooks, Redux, and Next.js frontend.', icon: 'fa-brands fa-react' },
      { name: 'Python Full Stack', desc: 'Django or Flask backends with modern frontend frameworks.', icon: 'fa-brands fa-python' },
      { name: 'Next.js Development', desc: 'Server-side rendering, Static site generation, and Vercel.', icon: 'fa-solid fa-bolt' }
    ]
  },
  'manual-testing': {
    title: 'Manual Testing Roles',
    desc: 'Specialized roles focused on human-centric quality assurance and test execution.',
    roles: [
      { name: 'Manual Tester', desc: 'SDLC/STLC, Test Cases, JIRA, Regression Testing, Agile.', icon: 'fa-solid fa-user-check' },
      { name: 'QA Analyst', desc: 'Functional Testing, Defect Tracking, UAT, Smoke Testing.', icon: 'fa-solid fa-clipboard-check' },
      { name: 'Junior Test Engineer', desc: 'Manual Testing, Bug Reporting, Test Execution, Documentation.', icon: 'fa-solid fa-vial-circle-check' }
    ]
  },
  'automation-testing': {
    title: 'Automation Testing Roles',
    desc: 'Technical roles focused on building scalable automation frameworks and CI/CD integration.',
    roles: [
      { name: 'Selenium Automation Tester', desc: 'Selenium, Java, TestNG, POM, Framework.', icon: 'fa-solid fa-robot' },
      { name: 'Playwright Automation Tester', desc: 'Playwright, TypeScript, API Testing, Assertions, Fixtures.', icon: 'fa-solid fa-microchip' },
      { name: 'API Tester', desc: 'Postman, REST API, JSON, Authentication.', icon: 'fa-solid fa-cloud-arrow-down' },
      { name: 'SDET', desc: 'Automation Framework, CI/CD, API + UI Automation, Jenkins, Git.', icon: 'fa-solid fa-gears' }
    ]
  },
  'ai-data': {
    title: 'AI and Data Science Roles',
    desc: 'Data-driven insights and machine learning models.',
    roles: [
      { name: 'Data Analytics', desc: 'Statistical analysis and data interpretation.', icon: 'fa-solid fa-chart-simple' },
      { name: 'AI and ML', desc: 'Machine learning algorithms and AI solutions.', icon: 'fa-solid fa-robot' },
      { name: 'Gen AI', desc: 'Generative models and LLM applications.', icon: 'fa-solid fa-brain' },
      { name: 'Python plus Chat GPT', desc: 'AI-assisted development and scripting.', icon: 'fa-brands fa-python' },
      { name: 'Power BI', desc: 'Business intelligence and data visualization.', icon: 'fa-solid fa-chart-pie' },
      { name: 'Tableau', desc: 'Interactive data visualization and dashboarding.', icon: 'fa-solid fa-table-columns' },
      { name: 'SAS', desc: 'Statistical software for advanced analytics.', icon: 'fa-solid fa-database' },
      { name: 'R Programming', desc: 'Statistical computing and graphics.', icon: 'fa-solid fa-r' }
    ]
  },
  'cloud-devops': {
    title: 'Cloud and DevOps Roles',
    desc: 'Infrastructure and automation at scale.',
    roles: [
      { name: 'AWS', desc: 'Amazon Web Services cloud infrastructure.', icon: 'fa-brands fa-aws' },
      { name: 'Google Cloud', desc: 'GCP infrastructure and services.', icon: 'fa-brands fa-google' },
      { name: 'Microsoft Azure', desc: 'Azure cloud solutions and integration.', icon: 'fa-brands fa-microsoft' },
      { name: 'DevOps', desc: 'CI/CD, automation, and site reliability.', icon: 'fa-solid fa-infinity' },
      { name: 'Kubernetes', desc: 'Container orchestration and management.', icon: 'fa-solid fa-dharmachakra' },
      { name: 'Jenkins', desc: 'Continuous integration and delivery pipelines.', icon: 'fa-brands fa-jenkins' },
      { name: 'Terraform', desc: 'Infrastructure as Code (IaC) solutions.', icon: 'fa-solid fa-mountain' }
    ]
  },
  languages: {
    title: 'Programming Language Roles',
    desc: 'Core logic and software development foundations.',
    roles: [
      { name: 'Core Java', desc: 'Java fundamentals and object-oriented programming.', icon: 'fa-brands fa-java' },
      { name: 'Advanced Java', desc: 'J2EE, Spring, and enterprise Java features.', icon: 'fa-solid fa-mug-hot' },
      { name: 'Core Python', desc: 'Python basics and scripting fundamentals.', icon: 'fa-brands fa-python' },
      { name: 'Advance Python', desc: 'Data science, web frameworks, and advanced scripts.', icon: 'fa-solid fa-snake' },
      { name: 'C and CPP programming', desc: 'System-level programming and performance.', icon: 'fa-solid fa-file-code' },
      { name: 'Data Structures and Algorithm (DSA)', desc: 'Competitive programming and core CS concepts.', icon: 'fa-solid fa-sitemap' },
      { name: 'HTML and CSS', desc: 'Web foundations and responsive design.', icon: 'fa-brands fa-html5' }
    ]
  },
  'ui-ux': {
    title: 'UI UX Designing Roles',
    desc: 'User-centric design and visual interfaces.',
    roles: [
      { name: 'Figma', desc: 'UI/UX design and collaborative prototyping.', icon: 'fa-brands fa-figma' },
      { name: 'Photoshop', desc: 'Image editing and graphic design.', icon: 'fa-solid fa-image' },
      { name: 'Graphic Design', desc: 'Visual communication and branding.', icon: 'fa-solid fa-palette' },
      { name: 'Canva', desc: 'Easy and professional graphic creation.', icon: 'fa-solid fa-wand-magic-sparkles' }
    ]
  },
  database: {
    title: 'Database Roles',
    desc: 'Data management and storage solutions.',
    roles: [
      { name: 'MongoDB Database', desc: 'NoSQL data modeling and management.', icon: 'fa-solid fa-leaf' },
      { name: 'MSSQL Database', desc: 'SQL Server administration and T-SQL.', icon: 'fa-solid fa-server' },
      { name: 'MySQL Database', desc: 'Relational database management and optimization.', icon: 'fa-solid fa-database' },
      { name: 'PostgreSQL Database', desc: 'Advanced open-source relational database.', icon: 'fa-solid fa-elephant' }
    ]
  },
  'data-eng': {
    title: 'Data Engineering Roles',
    desc: 'Data pipelines and architecture.',
    roles: [
      { name: 'Data Engineering', desc: 'ETL processes and big data systems.', icon: 'fa-solid fa-gears' }
    ]
  },
  networking: {
    title: 'Networking Roles',
    desc: 'Network infrastructure and security.',
    roles: [
      { name: 'CCNA', desc: 'Cisco certified network associate routing.', icon: 'fa-solid fa-network-wired' },
      { name: 'Cybersecurity', desc: 'Network defense and information security.', icon: 'fa-solid fa-shield-halved' },
      { name: 'Ethical Hacking', desc: 'Penetration testing and vulnerability assessment.', icon: 'fa-solid fa-user-secret' }
    ]
  },
  marketing: {
    title: 'Digital Marketing Roles',
    desc: 'Online presence and brand growth.',
    roles: [
      { name: 'SEO', desc: 'Search engine optimization and content strategy.', icon: 'fa-solid fa-magnifying-glass' },
      { name: 'Social Media Management', desc: 'Brand engagement across social platforms.', icon: 'fa-solid fa-hashtag' },
      { name: 'LinkedIn Marketing and Personal Branding', desc: 'B2B growth and professional presence.', icon: 'fa-brands fa-linkedin' },
      { name: 'Meta Campaign', desc: 'Meta campaigns, Facebook and Instagram ads.', icon: 'fa-brands fa-meta' }
    ]
  },
  crm: {
    title: 'CRM Roles',
    desc: 'Customer relationship management platforms.',
    roles: [
      { name: 'Salesforce Administrator', desc: 'Salesforce config and user management.', icon: 'fa-brands fa-salesforce' },
      { name: 'Salesforce Developer', desc: 'Apex, LWC, and custom Salesforce solutions.', icon: 'fa-solid fa-cloud-bolt' }
    ]
  },
  automation: {
    title: 'Automation Roles',
    desc: 'Process automation and efficiency.',
    roles: [
      { name: 'Microsoft Power Automate', desc: 'Workflow automation and business processes.', icon: 'fa-solid fa-bolt-lightning' }
    ]
  }
};

export const categoriesList = [
  { id: 'fullstack', label: 'Fullstack Development', icon: 'fa-layer-group', desc: 'End-to-end development and integration.' },
  { id: 'manual-testing', label: 'Manual Testing', icon: 'fa-user-check', desc: 'Human-centric QA and execution.' },
  { id: 'automation-testing', label: 'Automation Testing', icon: 'fa-robot', desc: 'Framework building and scripting.' },
  { id: 'ai-data', label: 'AI and Data Science', icon: 'fa-robot', desc: 'ML models and data-driven insights.' },
  { id: 'cloud-devops', label: 'Cloud and DevOps', icon: 'fa-cloud', desc: 'CI/CD, Kubernetes, and Cloud Infra.' },
  { id: 'languages', label: 'Programming Languages', icon: 'fa-code', desc: 'Core languages and logic implementation.' },
  { id: 'ui-ux', label: 'UI UX Designing', icon: 'fa-pen-nib', desc: 'User research and high-fidelity design.' },
  { id: 'database', label: 'Database', icon: 'fa-database', desc: 'Data modeling and database management.' },
  { id: 'data-eng', label: 'Data Engineering', icon: 'fa-server', desc: 'Data pipelines and big data architecture.' },
  { id: 'networking', label: 'Net Working', icon: 'fa-network-wired', desc: 'Network security and infrastructure.' },
  { id: 'marketing', label: 'Digital Marketing', icon: 'fa-bullseye', desc: 'SEO, campaigns, and digital strategy.' },
  { id: 'crm', label: 'CRM', icon: 'fa-users-gear', desc: 'Customer relationship management tools.' },
  { id: 'automation', label: 'Automation', icon: 'fa-gears', desc: 'Process automation and scripting.' },
];

export const templateImages = [
  { role: 'frontend', label: 'Modern React Developer', img: '/images/RESUME TEMPLATES/file_00000000ca6c7208a76594f2e619499a.png' },
  { role: 'backend', label: 'Python Backend Pro', img: '/images/RESUME TEMPLATES/file_00000000f3207208b912c6c636a195a1.png' },
  { role: 'devops', label: 'Infrastructure Specialist', img: '/images/RESUME TEMPLATES/file_00000000f19472089c50ad245caa766f.png' },
  { role: 'data', label: 'ML Engineer Lead', img: '/images/RESUME TEMPLATES/file_000000009a2872089daf10c7b99ee68d.png' },
  { role: 'frontend', label: 'Sleek UI Engineer', img: '/images/RESUME TEMPLATES/file_00000000b96072089bcf803d41ea89ff.png' },
  { role: 'backend', label: 'Node.js Architect', img: '/images/RESUME TEMPLATES/file_00000000fe2872088873cdc9244f32f0.png' },
];
