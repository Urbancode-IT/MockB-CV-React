import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './RoleBasedCoverLetterBuilder.css';
import Navbar from '../components/home/navbar/Navbar';

const categories = [
  { id: 'fullstack', label: 'Fullstack Development', icon: 'fa-layer-group', desc: 'Narratives focusing on end-to-end integration.' },
  { id: 'manual-testing', label: 'Manual Testing', icon: 'fa-user-check', desc: 'Focus on precision, QA, and user advocacy.' },
  { id: 'automation-testing', label: 'Automation Testing', icon: 'fa-robot', desc: 'Efficiency-driven scripting and framework logic.' },
  { id: 'ai-data', label: 'AI and Data Science', icon: 'fa-brain', desc: 'Data-driven storytelling and ML impact.' },
  { id: 'cloud-devops', label: 'Cloud and DevOps', icon: 'fa-cloud', desc: 'Infrastructure scalability and CI/CD mastery.' },
  { id: 'languages', label: 'Programming Languages', icon: 'fa-code', desc: 'Core logic and software engineering foundations.' },
  { id: 'ui-ux', label: 'UI UX Designing', icon: 'fa-pen-nib', desc: 'User-centric design thinking and visual impact.' },
  { id: 'database', label: 'Database', icon: 'fa-database', desc: 'Data architecture and management narratives.' },
  { id: 'data-eng', label: 'Data Engineering', icon: 'fa-server', desc: 'Big data pipelines and infrastructure focus.' },
  { id: 'networking', label: 'Net Working', icon: 'fa-network-wired', desc: 'Network security and connectivity expert talk.' },
  { id: 'marketing', label: 'Digital Marketing', icon: 'fa-bullseye', desc: 'Growth, SEO, and engagement strategies.' },
  { id: 'crm', label: 'CRM', icon: 'fa-users-gear', desc: 'Customer relationship management platform focus.' },
  { id: 'automation', label: 'Automation', icon: 'fa-gears', desc: 'Workflow automation and business processes.' },
];

const categoryData = {
  'fullstack': {
    title: 'Fullstack Development Roles',
    desc: 'Select your specialized tech stack to generate a precision-targeted cover letter.',
    roles: [
      { name: 'Java Full Stack', desc: 'Spring Boot, Hibernate, and Angular/React focus.', icon: 'fa-brands fa-java' },
      { name: 'Angular', desc: 'TypeScript, RxJS, and enterprise-scale SPA focus.', icon: 'fa-brands fa-angular' },
      { name: 'MERN Stack', desc: 'MongoDB, Express.js, React, and Node.js specialization.', icon: 'fa-solid fa-layer-group' },
      { name: 'MEAN Stack', desc: 'MongoDB, Express.js, Angular, and Node.js solutions.', icon: 'fa-solid fa-code' },
      { name: 'Microsoft SharePoint', desc: 'Office 365, Power Automate, and custom SPFx focus.', icon: 'fa-brands fa-microsoft' },
      { name: 'React Native', desc: 'Cross-platform mobile apps with React Native.', icon: 'fa-brands fa-react' },
      { name: '.NET Angular', desc: 'ASP.NET Core APIs with Angular frontend.', icon: 'fa-solid fa-gear' },
      { name: 'React JS', desc: 'Modern React, Hooks, Redux, and Next.js focus.', icon: 'fa-brands fa-react' },
      { name: 'Python Full Stack', desc: 'Django or Flask backends with modern frontends.', icon: 'fa-brands fa-python' },
      { name: 'Next.js Development', desc: 'Server-side rendering and Static site generation.', icon: 'fa-solid fa-bolt' }
    ]
  },
  'manual-testing': {
    title: 'Manual Testing Roles',
    desc: 'Specialized roles focused on quality assurance and test execution narratives.',
    roles: [
      { name: 'Manual Tester', desc: 'SDLC/STLC, Test Cases, JIRA, and Agile focus.', icon: 'fa-solid fa-user-check' },
      { name: 'QA Analyst', desc: 'Functional Testing, Defect Tracking, and UAT focus.', icon: 'fa-solid fa-clipboard-check' },
      { name: 'Junior Test Engineer', desc: 'Manual Testing, Bug Reporting, and Documentation.', icon: 'fa-solid fa-vial-circle-check' }
    ]
  },
  'automation-testing': {
    title: 'Automation Testing Roles',
    desc: 'Technical roles focused on building scalable automation frameworks.',
    roles: [
      { name: 'Selenium Automation Tester', desc: 'Selenium, Java, TestNG, and Framework focus.', icon: 'fa-solid fa-robot' },
      { name: 'Playwright Automation Tester', desc: 'Playwright, TypeScript, and API Testing focus.', icon: 'fa-solid fa-microchip' },
      { name: 'API Tester', desc: 'Postman, REST API, JSON, and Authentication focus.', icon: 'fa-solid fa-cloud-arrow-down' },
      { name: 'SDET', desc: 'Automation Framework, CI/CD, and UI Automation.', icon: 'fa-solid fa-gears' }
    ]
  },
  'ai-data': {
    title: 'AI and Data Science Roles',
    desc: 'Data-driven insights and machine learning model narratives.',
    roles: [
      { name: 'Data Analytics', desc: 'Statistical analysis and data interpretation.', icon: 'fa-solid fa-chart-simple' },
      { name: 'AI and ML', desc: 'Machine learning algorithms and AI solutions.', icon: 'fa-solid fa-robot' },
      { name: 'Gen AI', desc: 'Generative models and LLM applications.', icon: 'fa-solid fa-brain' },
      { name: 'Python plus Chat GPT', desc: 'AI-assisted development and scripting.', icon: 'fa-brands fa-python' },
      { name: 'Power BI', desc: 'Business intelligence and data visualization.', icon: 'fa-solid fa-chart-pie' },
      { name: 'Tableau', desc: 'Interactive data visualization and dashboards.', icon: 'fa-solid fa-table-columns' },
      { name: 'SAS', desc: 'Statistical software for advanced analytics.', icon: 'fa-solid fa-database' },
      { name: 'R Programming', desc: 'Statistical computing and graphics.', icon: 'fa-solid fa-r' }
    ]
  },
  'cloud-devops': {
    title: 'Cloud and DevOps Roles',
    desc: 'Infrastructure and automation at scale narratives.',
    roles: [
      { name: 'AWS', desc: 'Amazon Web Services cloud infrastructure focus.', icon: 'fa-brands fa-aws' },
      { name: 'Google Cloud', desc: 'GCP infrastructure and services focus.', icon: 'fa-brands fa-google' },
      { name: 'Microsoft Azure', desc: 'Azure cloud solutions and integration focus.', icon: 'fa-brands fa-microsoft' },
      { name: 'DevOps', desc: 'CI/CD, automation, and site reliability focus.', icon: 'fa-solid fa-infinity' },
      { name: 'Kubernetes', desc: 'Container orchestration and management.', icon: 'fa-solid fa-dharmachakra' },
      { name: 'Jenkins', desc: 'Continuous integration and delivery pipelines.', icon: 'fa-brands fa-jenkins' },
      { name: 'Terraform', desc: 'Infrastructure as Code (IaC) solutions.', icon: 'fa-solid fa-mountain' }
    ]
  },
  'languages': {
    title: 'Programming Language Roles',
    desc: 'Core logic and software development narratives.',
    roles: [
      { name: 'Core Java', desc: 'Java fundamentals and OOP focus.', icon: 'fa-brands fa-java' },
      { name: 'Advanced Java', desc: 'J2EE, Spring, and enterprise Java features.', icon: 'fa-solid fa-mug-hot' },
      { name: 'Core Python', desc: 'Python basics and scripting fundamentals.', icon: 'fa-brands fa-python' },
      { name: 'Advance Python', desc: 'Data science and web frameworks focus.', icon: 'fa-solid fa-snake' },
      { name: 'C and CPP programming', desc: 'System-level programming and performance.', icon: 'fa-solid fa-file-code' },
      { name: 'DSA', desc: 'Algorithms and core CS concepts focus.', icon: 'fa-solid fa-sitemap' },
      { name: 'HTML and CSS', desc: 'Web foundations and responsive design.', icon: 'fa-brands fa-html5' }
    ]
  },
  'ui-ux': {
    title: 'UI UX Designing Roles',
    desc: 'User-centric design and visual interface narratives.',
    roles: [
      { name: 'Figma', desc: 'UI/UX design and collaborative prototyping.', icon: 'fa-brands fa-figma' },
      { name: 'Photoshop', desc: 'Image editing and graphic design focus.', icon: 'fa-solid fa-image' },
      { name: 'Graphic Design', desc: 'Visual communication and branding focus.', icon: 'fa-solid fa-palette' },
      { name: 'Canva', desc: 'Quick and professional graphic creation.', icon: 'fa-solid fa-wand-magic-sparkles' }
    ]
  },
  'database': {
    title: 'Database Roles',
    desc: 'Data management and storage narratives.',
    roles: [
      { name: 'MongoDB Database', desc: 'NoSQL data modeling and management focus.', icon: 'fa-solid fa-leaf' },
      { name: 'MSSQL Database', desc: 'SQL Server administration and T-SQL.', icon: 'fa-solid fa-server' },
      { name: 'MySQL Database', desc: 'Relational database management focus.', icon: 'fa-solid fa-database' },
      { name: 'PostgreSQL Database', desc: 'Advanced relational database focus.', icon: 'fa-solid fa-elephant' }
    ]
  },
  'data-eng': {
    title: 'Data Engineering Roles',
    desc: 'Data pipelines and architecture narratives.',
    roles: [
      { name: 'Data Engineering', desc: 'ETL processes and big data systems focus.', icon: 'fa-solid fa-gears' }
    ]
  },
  'networking': {
    title: 'Networking Roles',
    desc: 'Network infrastructure and security narratives.',
    roles: [
      { name: 'CCNA', desc: 'Cisco certified network routing focus.', icon: 'fa-solid fa-network-wired' },
      { name: 'Cybersecurity', desc: 'Network defense and information security.', icon: 'fa-solid fa-shield-halved' },
      { name: 'Ethical Hacking', desc: 'Penetration testing and vulnerability focus.', icon: 'fa-solid fa-user-secret' }
    ]
  },
  'marketing': {
    title: 'Digital Marketing Roles',
    desc: 'Online presence and brand growth narratives.',
    roles: [
      { name: 'SEO', desc: 'Search engine optimization focus.', icon: 'fa-solid fa-magnifying-glass' },
      { name: 'Social Media', desc: 'Brand engagement across platforms.', icon: 'fa-solid fa-hashtag' },
      { name: 'LinkedIn Marketing', desc: 'B2B growth and personal branding.', icon: 'fa-brands fa-linkedin' },
      { name: 'Meta Campaign', desc: 'Facebook and Instagram advertising.', icon: 'fa-brands fa-meta' }
    ]
  },
  'crm': {
    title: 'CRM Roles',
    desc: 'Customer relationship management platform focus.',
    roles: [
      { name: 'Salesforce Administrator', desc: 'Salesforce config and user management.', icon: 'fa-brands fa-salesforce' },
      { name: 'Salesforce Developer', desc: 'Apex, LWC, and custom solutions.', icon: 'fa-solid fa-cloud-bolt' }
    ]
  },
  'automation': {
    title: 'Automation Roles',
    desc: 'Process automation and efficiency focus.',
    roles: [
      { name: 'Power Automate', desc: 'Workflow automation and business processes.', icon: 'fa-solid fa-bolt-lightning' }
    ]
  }
};

export default function RoleBasedCoverLetterBuilder() {
  const navigate = useNavigate();
  const [view, setView] = useState('landing'); // 'landing', 'roles-list', 'generate', 'preview'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  // Wizard state
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [achievements, setAchievements] = useState('');
  const [tone, setTone] = useState('professional');
  
  // New optional fields
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [education, setEducation] = useState('');
  const [oldCoverLetter, setOldCoverLetter] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  
  // Custom dropdown states
  const [isToneOpen, setIsToneOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  
  // Validation state
  const [errors, setErrors] = useState({});
  
  // Drag and drop & file upload
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  
  // Textarea auto-resize ref
  const letterRef = useRef(null);
  
  // Download modal state
  const [downloadingModal, setDownloadingModal] = useState({ show: false, type: '' });
  
  // Simulated AI loading & final generated text
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingText, setLoadingText] = useState('Analyzing requirements...');
  const [generatedLetter, setGeneratedLetter] = useState('');

  // 3D Parallax inline mousemove calculations
  const [cardTransform, setCardTransform] = useState({});

  const handleCardMouseMove = (e, index) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setCardTransform(prev => ({
      ...prev,
      [index]: `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }));
  };

  const handleCardMouseLeave = (index) => {
    setCardTransform(prev => ({
      ...prev,
      [index]: `translateY(0) rotateX(0) rotateY(0)`
    }));
  };

  // Auto-resize the cover letter textarea
  useEffect(() => {
    if (letterRef.current && view === 'preview') {
      letterRef.current.style.height = 'auto';
      letterRef.current.style.height = letterRef.current.scrollHeight + 'px';
    }
  }, [generatedLetter, view]);

  const handleCategorySelect = (categorySlug) => {
    const data = categoryData[categorySlug];
    if (data) {
      setSelectedCategory({ slug: categorySlug, ...data });
      setView('roles-list');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToRoles = () => {
    setView('landing');
    setTimeout(() => {
      const el = document.getElementById('features-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleRoleSelect = (roleName) => {
    setSelectedRole(roleName);
    setStep(1);
    setView('generate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextStep = () => {
    // Validation
    const newErrors = {};
    
    if (step === 1) {
      if (!fullName) newErrors.fullName = "Full Name is required.";
      if (!email) newErrors.email = "Email Address is required.";
      if (!phone) newErrors.phone = "Phone Number is required.";
    }
    if (step === 2 && !companyName) {
      newErrors.companyName = "Company Name is required.";
    }
    if (step === 3) {
      if (!experience) newErrors.experience = "Experience is required.";
      if (!skills) newErrors.skills = "Top Skills are required.";
      if (!achievements) newErrors.achievements = "Professional Wins are required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (step < 6) {
      setStep(step + 1);
    } else {
      triggerAIGeneration();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const triggerAIGeneration = () => {
    setIsGenerating(true);
    const statuses = [
      'Extracting core competencies for ' + selectedRole + '...',
      'Mapping semantic keywords for ATS compatibility...',
      'Structuring value proposition paragraph...',
      'Refining tone parameters to ' + tone + ' style...',
      'Finalizing tailored layout letterhead...'
    ];

    let currentStatusIdx = 0;
    const interval = setInterval(() => {
      if (currentStatusIdx < statuses.length - 1) {
        currentStatusIdx++;
        setLoadingText(statuses[currentStatusIdx]);
      }
    }, 600);

    setTimeout(() => {
      clearInterval(interval);
      generateCoverLetterText();
      setIsGenerating(false);
      setView('preview');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3200);
  };

  const generateCoverLetterText = () => {
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const uName = fullName.trim() || 'John Doe';
    const cName = companyName.trim() || 'your company';
    const roleTitle = selectedRole || 'the open position';
    const winText = achievements.trim();
    const expText = experience.trim();
    const skillsText = skills.trim();
    const eduText = education.trim();
    const oldText = oldCoverLetter.trim();

    let greeting = `Dear Hiring Manager${companyName ? ` at ${cName}` : ''},`;
    
    let opening = '';
    let background = '';
    let valueProp = '';
    let closing = '';

    // Tone variations for Opening & Closing
    if (tone === 'enthusiastic') {
      opening = `I am absolutely thrilled to submit my application for the ${roleTitle} position at ${cName}. Having followed your company's incredible trajectory, I am eager to bring my focused expertise directly to your team.`;
      closing = `I would love the opportunity to discuss how my skill set and enthusiasm can directly contribute to your team's objectives. Thank you so much for your time and consideration. I look forward to hearing from you!`;
    } else if (tone === 'creative') {
      opening = `Every company has a unique story, and the mission of ${cName} to transform industry standards is one I find deeply inspiring. I am writing to express my strong interest in joining you as a ${roleTitle}.`;
      closing = `I am eager to explore how we can collaborate to make a genuine impact. Thank you for reading my story, and I hope to connect with you soon.`;
    } else if (tone === 'minimalist') {
      opening = `Please accept this application for the ${roleTitle} role at ${cName}. I offer a proven track record of engineering clean solutions that fit the requirements of your open position.`;
      closing = `I look forward to discussing the role details and my qualifications in an interview. Thank you for your review.`;
    } else { 
      // professional default
      opening = `I am writing to formally express my interest in the ${roleTitle} position currently open at ${cName}. With a comprehensive background in industry standards and technical execution, I am well-prepared to contribute effectively to your organization's goals.`;
      closing = `I welcome the opportunity to discuss my background and how it matches your requirements in greater detail. Thank you for your time and consideration of my application.`;
    }

    // Dynamic Background (Experience & Education)
    if (expText) {
      background += `Building on ${expText} of dedicated experience in the industry, I have developed a strong foundation in driving technical and operational excellence. `;
    } else {
      background += `Throughout my career, I have consistently pushed boundaries to achieve high-impact outcomes. `;
    }

    if (eduText) {
      background += `Coupled with my solid background in ${eduText}, my professional journey has been defined by connecting the dots between complex problems and elegant, scalable solutions. `;
    }

    // Dynamic Value Proposition (Skills & Achievements & Legacy text)
    if (skillsText) {
      valueProp += `My core competencies include ${skillsText}, which I have consistently leveraged to ensure both performance and strategic perfection. `;
    }
    
    if (winText) {
      let cleanedWin = winText.charAt(0).toLowerCase() + winText.slice(1);
      valueProp += `A key milestone of my career includes when I ${cleanedWin}. This experience reinforced my ability to execute under pressure and deliver high-quality results ahead of schedule. `;
    } else if (!skillsText && !expText) {
      // Fallback if no fields were provided
      valueProp += `A key highlight of my career was leading project integrations and working with cross-functional teams to deliver stable features. `;
    }

    if (oldText) {
      valueProp += `As demonstrated throughout my prior professional engagements, my dedication to continuous improvement remains unwavering, allowing me to adapt to new technologies and drive immediate value. `;
    }
    
    valueProp += `Applying this same drive to your upcoming projects, I am confident in my ability to help ${cName} reach its key objectives.`;

    const fullText = `${dateStr}\n\n${greeting}\n\n${opening}\n\n${background}\n\n${valueProp}\n\n${closing}\n\nSincerely,\n\n${uName}`;
    setGeneratedLetter(fullText);
  };

  const handleDownloadPDF = () => {
    setDownloadingModal({ show: true, type: 'PDF Document' });
    setTimeout(() => {
      setDownloadingModal({ show: false, type: '' });
      
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      document.body.appendChild(iframe);
      
      const htmlContent = generatedLetter.replace(/\n/g, '<br>');
      const doc = iframe.contentWindow.document;
      
      doc.open();
      doc.write(`
        <html>
          <head>
            <title>${fullName || 'Cover Letter'}</title>
            <style>
              @page { margin: 0; }
              body { 
                font-family: 'Georgia', serif; 
                padding: 20mm; 
                color: #222; 
                line-height: 1.6; 
                font-size: 11pt;
                max-width: 800px;
                margin: 0 auto;
              }
              .header { margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 10px; }
              .header strong { font-size: 24pt; display: block; margin-bottom: 5px; color: #111; }
              .header span { color: #555; font-size: 11pt; }
            </style>
          </head>
          <body>
            <div class="header">
              <strong>${fullName || 'John Doe'}</strong>
              <span>${email || 'john@email.com'} &middot; ${phone || '+1 555 123 4567'}</span>
            </div>
            <div>${htmlContent}</div>
            <script>
              window.onload = function() { window.print(); }
            </script>
          </body>
        </html>
      `);
      doc.close();
      
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 5000); // Give ample time for print dialog before removing
      
    }, 2000);
  };

  const handleDownloadWord = () => {
    setDownloadingModal({ show: true, type: 'Word Document' });
    setTimeout(() => {
      setDownloadingModal({ show: false, type: '' });
      
      const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
            "xmlns:w='urn:schemas-microsoft-com:office:word' " +
            "xmlns='http://www.w3.org/TR/REC-html40'>" +
            "<head><meta charset='utf-8'><title>Cover Letter</title></head><body>";
      
      const headerInfo = `<div style="margin-bottom:20px;"><strong>${fullName || 'John Doe'}</strong><br/><span>${email || 'john@email.com'} &middot; ${phone || '+1 555 123 4567'}</span></div>`;
      const htmlContent = generatedLetter.replace(/\n/g, '<br>');
      const footer = "</body></html>";
      const sourceHTML = header + headerInfo + htmlContent + footer;
      
      const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
      const fileDownload = document.createElement("a");
      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = `${(fullName || 'Cover_Letter').replace(/\s+/g, '_')}.doc`;
      fileDownload.click();
      document.body.removeChild(fileDownload);
    }, 2000);
  };

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    alert('Cover letter text copied to clipboard!');
  };

  if (view === 'preview') {
    return (
      <>
        <main className="rbclb-page" style={{ position: 'relative' }}>
          <div className="container preview-cl-wrapper">
          
          {/* Start Over Button - Top Left */}
          <button 
            className="btn-start-over" 
            onClick={() => { setView('generate'); setStep(1); }}
          >
            <i className="fa-solid fa-arrow-left"></i> Start Over
          </button>
          
          <div className="section-header">
            <h2>Your Tailored Cover Letter</h2>
            <p>Perfectly optimized for the {selectedRole} role at {companyName}.</p>
          </div>

          <div className="preview-split">
            {/* White Paper Preview Sheet */}
            <div className="preview-cl-doc">
              <div className="cl-doc-header">
                <strong>{fullName || 'John Doe'}</strong>
                <span>{email || 'john@email.com'} · {phone || '+1 555 123 4567'}</span>
              </div>
              <div className="cl-doc-body">
                <textarea
                  ref={letterRef}
                  value={generatedLetter}
                  onChange={(e) => setGeneratedLetter(e.target.value)}
                />
              </div>
            </div>

            {/* Sidebar actions */}
            <div className="preview-features-sidebar">
              <div className="preview-actions-panel">
                <h4>Actions</h4>
                <p>Download your cover letter or copy the text to apply directly.</p>
                
                <button className="btn action-btn btn-block" onClick={handleDownloadPDF}>
                  <i className="fa-solid fa-file-pdf"></i> Download PDF
                </button>
                <button className="btn action-btn btn-block" onClick={handleDownloadWord}>
                  <i className="fa-solid fa-file-word"></i> Download Word
                </button>
                <button className="btn action-btn btn-block" onClick={handleCopyClipboard}>
                  <i className="fa-solid fa-copy"></i> Copy to Clipboard
                </button>
              </div>

              <div className="preview-features">
                {[
                  { icon: 'fa-pen-nib', text: 'Tailored greeting & dynamic opening paragraph' },
                  { icon: 'fa-list-check', text: 'Key wins and technical attributes integrated' },
                  { icon: 'fa-chart-line', text: 'Targeted call to action based on chosen tone' },
                  { icon: 'fa-handshake', text: 'ATS-optimized keywords built natively' },
                ].map((f, i) => (
                  <div key={i} className="preview-feature-row">
                    <div className="pf-icon"><i className={`fa-solid ${f.icon}`}></i></div>
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      </>
    );
  }

  if (view === 'generate') {
    return (
      <>
        <main className="rbclb-page">
          <section className="generator-container" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="absolute-back-nav" style={{ position: 'absolute', top: '100px', left: '5%' }}>
              <button className="back-link" onClick={() => setView('roles-list')}>
                <i className="fa-solid fa-arrow-left-long"></i> Back to Roles
              </button>
            </div>
          <div className="generator-card glass">
            {isGenerating ? (
              <div className="loading-screen">
                <div className="spinner"></div>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Generating Your <span style={{ color: 'var(--primary-color)' }}>Tailored Letter</span></h2>
                <p style={{ color: 'var(--text-gray)' }}>{loadingText}</p>
              </div>
            ) : (
              <div>
                <div className="step-indicator">
                  <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>1</div>
                  <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>2</div>
                  <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>3</div>
                  <div className={`step-dot ${step >= 4 ? 'active' : ''}`}>4</div>
                  <div className={`step-dot ${step >= 5 ? 'active' : ''}`}>5</div>
                  <div className={`step-dot ${step >= 6 ? 'active' : ''}`}>6</div>
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                  {step === 1 && (
                    <div className="form-step active">
                      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Personal <span style={{ color: 'var(--primary-color)' }}>Details</span></h2>
                      <p style={{ color: 'var(--text-gray)', marginBottom: '2.5rem' }}>Provide your contact information for the letterhead.</p>
                      
                      <div className="input-group">
                        <label>Full Name</label>
                        <input 
                          type="text" 
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if(errors.fullName) setErrors({...errors, fullName: null});
                          }}
                          style={errors.fullName ? { borderColor: '#ff4d4f' } : {}}
                          placeholder="e.g. John Doe" 
                        />
                        {errors.fullName && <div className="error-text">{errors.fullName}</div>}
                      </div>
                      <div className="input-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label>Email Address</label>
                          <input 
                            type="email" 
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if(errors.email) setErrors({...errors, email: null});
                            }}
                            style={errors.email ? { borderColor: '#ff4d4f' } : {}}
                            placeholder="john@example.com" 
                          />
                          {errors.email && <div className="error-text">{errors.email}</div>}
                        </div>
                        <div>
                          <label>Phone Number</label>
                          <input 
                            type="tel" 
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              if(errors.phone) setErrors({...errors, phone: null});
                            }}
                            style={errors.phone ? { borderColor: '#ff4d4f' } : {}}
                            placeholder="+1 234 567 8900" 
                          />
                          {errors.phone && <div className="error-text">{errors.phone}</div>}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="form-step active">
                      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Target <span style={{ color: 'var(--primary-color)' }}>Position</span></h2>
                      <p style={{ color: 'var(--text-gray)', marginBottom: '2.5rem' }}>Which role are you applying for?</p>
                      
                      <div className="input-group">
                        <label>Selected Role</label>
                        <input type="text" value={selectedRole} readOnly />
                      </div>
                      <div className="input-group">
                        <label>Company Name</label>
                        <input 
                          type="text" 
                          value={companyName}
                          onChange={(e) => {
                            setCompanyName(e.target.value);
                            if(errors.companyName) setErrors({...errors, companyName: null});
                          }}
                          style={errors.companyName ? { borderColor: '#ff4d4f' } : {}}
                          placeholder="e.g. Tech Corp Inc." 
                        />
                        {errors.companyName && <div className="error-text">{errors.companyName}</div>}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="form-step active">
                      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Professional <span style={{ color: 'var(--primary-color)' }}>Background</span></h2>
                      <p style={{ color: 'var(--text-gray)', marginBottom: '2.5rem' }}>Highlight your experience, skills, and key achievements.</p>
                      
                      <div className="input-group">
                        <label>Experience (Years & Summary)</label>
                        <input 
                          type="text" 
                          value={experience}
                          onChange={(e) => {
                            setExperience(e.target.value);
                            if(errors.experience) setErrors({...errors, experience: null});
                          }}
                          style={errors.experience ? { borderColor: '#ff4d4f' } : {}}
                          placeholder="e.g. 5+ years in full-stack development" 
                        />
                        {errors.experience && <div className="error-text">{errors.experience}</div>}
                      </div>
                      <div className="input-group">
                        <label>Top Skills</label>
                        <input 
                          type="text" 
                          value={skills}
                          onChange={(e) => {
                            setSkills(e.target.value);
                            if(errors.skills) setErrors({...errors, skills: null});
                          }}
                          style={errors.skills ? { borderColor: '#ff4d4f' } : {}}
                          placeholder="e.g. React, Node.js, Python" 
                        />
                        {errors.skills && <div className="error-text">{errors.skills}</div>}
                      </div>
                      <div className="input-group">
                        <label>Education (Optional)</label>
                        <input 
                          type="text" 
                          value={education}
                          onChange={(e) => setEducation(e.target.value)}
                          placeholder="e.g. B.S. Computer Science" 
                        />
                      </div>
                      <div className="input-group">
                        <label>Professional Wins (Achievements)</label>
                        <textarea 
                          value={achievements}
                          onChange={(e) => {
                            setAchievements(e.target.value);
                            if(errors.achievements) setErrors({...errors, achievements: null});
                          }}
                          style={errors.achievements ? { borderColor: '#ff4d4f' } : {}}
                          rows={4} 
                          placeholder="e.g. Led a team of 5 to deliver a critical project 2 weeks ahead of schedule..."
                        />
                        {errors.achievements && <div className="error-text">{errors.achievements}</div>}
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="form-step active">
                      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Letter <span style={{ color: 'var(--primary-color)' }}>Tone</span></h2>
                      <p style={{ color: 'var(--text-gray)', marginBottom: '2.5rem' }}>How should your cover letter sound?</p>
                      
                      <div className="input-group">
                        <label>Preferred Tone</label>
                        <div className={`custom-select-container ${isToneOpen ? 'open' : ''}`} onClick={() => setIsToneOpen(!isToneOpen)}>
                          <div className="custom-select-display">
                            {tone === 'professional' && 'Professional & Formal'}
                            {tone === 'enthusiastic' && 'Enthusiastic & Passionate'}
                            {tone === 'creative' && 'Creative & Unique'}
                            {tone === 'minimalist' && 'Minimalist & Direct'}
                            <i className={`fa-solid fa-chevron-${isToneOpen ? 'up' : 'down'}`}></i>
                          </div>
                          <div className="custom-select-options">
                            <div className={`custom-select-option ${tone === 'professional' ? 'selected' : ''}`} onClick={() => setTone('professional')}>Professional & Formal</div>
                            <div className={`custom-select-option ${tone === 'enthusiastic' ? 'selected' : ''}`} onClick={() => setTone('enthusiastic')}>Enthusiastic & Passionate</div>
                            <div className={`custom-select-option ${tone === 'creative' ? 'selected' : ''}`} onClick={() => setTone('creative')}>Creative & Unique</div>
                            <div className={`custom-select-option ${tone === 'minimalist' ? 'selected' : ''}`} onClick={() => setTone('minimalist')}>Minimalist & Direct</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div className="form-step active">
                      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Old <span style={{ color: 'var(--primary-color)' }}>Cover Letter</span></h2>
                      <p style={{ color: 'var(--text-gray)', marginBottom: '2.5rem' }}>Optionally upload or paste an existing cover letter we can use as a baseline.</p>
                      
                      <div className="input-group">
                        <label>Existing Cover Letter Content</label>
                        <div 
                          className={`drop-zone ${isDragging ? 'drag-over' : ''}`}
                          onClick={() => fileInputRef.current && fileInputRef.current.click()}
                          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
                          onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
                          onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }}
                          onDrop={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsDragging(false);
                            const file = e.dataTransfer.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (evt) => setOldCoverLetter(evt.target.result);
                              reader.readAsText(file);
                            }
                          }}
                        >
                          <input 
                            type="file" 
                            ref={fileInputRef} 
                            style={{ display: 'none' }} 
                            accept=".txt,.doc,.docx,.pdf"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (evt) => setOldCoverLetter(evt.target.result);
                                reader.readAsText(file);
                              }
                            }}
                          />
                          <i className="fa-solid fa-cloud-arrow-up"></i>
                          <p style={{ color: 'var(--text-gray)' }}>Drag & Drop your cover letter file here</p>
                          <p style={{ color: '#fff', fontSize: '0.9rem', marginTop: '0.5rem' }}>or click to browse</p>
                        </div>
                        <textarea 
                          value={oldCoverLetter}
                          onChange={(e) => setOldCoverLetter(e.target.value)}
                          rows={6} 
                          placeholder="Paste your old cover letter here..."
                        />
                      </div>
                    </div>
                  )}

                  {step === 6 && (
                    <div className="form-step active">
                      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Choose <span style={{ color: 'var(--primary-color)' }}>Template</span></h2>
                      <p style={{ color: 'var(--text-gray)', marginBottom: '2.5rem' }}>Select a visual style for your final cover letter.</p>
                      
                      <div className="input-group">
                        <label>Template Style</label>
                        <div className={`custom-select-container ${isTemplateOpen ? 'open' : ''}`} onClick={() => setIsTemplateOpen(!isTemplateOpen)}>
                          <div className="custom-select-display">
                            {selectedTemplate === 'modern' && 'Modern Professional'}
                            {selectedTemplate === 'creative' && 'Creative Edge'}
                            {selectedTemplate === 'minimalist' && 'Clean Minimalist'}
                            {selectedTemplate === 'executive' && 'Executive Formal'}
                            <i className={`fa-solid fa-chevron-${isTemplateOpen ? 'up' : 'down'}`}></i>
                          </div>
                          <div className="custom-select-options">
                            <div className={`custom-select-option ${selectedTemplate === 'modern' ? 'selected' : ''}`} onClick={() => setSelectedTemplate('modern')}>Modern Professional</div>
                            <div className={`custom-select-option ${selectedTemplate === 'creative' ? 'selected' : ''}`} onClick={() => setSelectedTemplate('creative')}>Creative Edge</div>
                            <div className={`custom-select-option ${selectedTemplate === 'minimalist' ? 'selected' : ''}`} onClick={() => setSelectedTemplate('minimalist')}>Clean Minimalist</div>
                            <div className={`custom-select-option ${selectedTemplate === 'executive' ? 'selected' : ''}`} onClick={() => setSelectedTemplate('executive')}>Executive Formal</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="btn-group">
                    <button 
                      type="button" 
                      className="btn btn-dark" 
                      onClick={handlePrevStep}
                      style={{ display: step === 1 ? 'none' : 'block' }}
                    >
                      Back
                    </button>
                    <div style={{ display: 'flex', gap: '1rem', marginLeft: 'auto' }}>
                      {(step === 5 || step === 6) && (
                        <button type="button" className="btn btn-dark" onClick={handleNextStep}>Skip</button>
                      )}
                      <button type="button" className="btn btn-primary" onClick={handleNextStep}>
                        {step === 6 ? 'Generate Letter' : 'Next Step'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
          </section>
          
          {/* Download Modal */}
          {downloadingModal.show && (
            <div className="download-modal-overlay">
              <div className="download-modal">
                <i className="fa-solid fa-cloud-arrow-down download-icon"></i>
                <h3>Downloading {downloadingModal.type}...</h3>
                <p>Please wait while we prepare your file.</p>
              </div>
            </div>
          )}
        </main>
      </>
    );
  }

  if (view === 'roles-list') {
    return (
      <>
        <main className="rbclb-page">
          <section className="roles-grid-section roles-list-section container">
          <div className="back-nav-wrapper">
            <button className="back-link" onClick={handleBackToRoles}>
              <i className="fa-solid fa-arrow-left-long"></i> Back to Role Selection
            </button>
          </div>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <h2 style={{ marginTop: 0, fontSize: '3rem', marginBottom: '0.1rem' }}>
              {selectedCategory?.title}
            </h2>
            <p style={{ marginTop: 0 }}>{selectedCategory?.desc}</p>
          </div>

          <div className="roles-container">
            {selectedCategory?.roles.map((role, idx) => {
              const num = (idx + 1).toString().padStart(2, '0');
              return (
                <div 
                  key={role.name} 
                  className="role-card role-orange"
                  onMouseMove={(e) => handleCardMouseMove(e, idx)}
                  onMouseLeave={() => handleCardMouseLeave(idx)}
                  style={{ transform: cardTransform[idx] || 'translateY(0) rotateX(0) rotateY(0)' }}
                  onClick={() => handleRoleSelect(role.name)}
                >
                  <div className="card-badge">
                    <span className="badge-text">OPTION</span>
                    <span className="badge-number">{num}</span>
                  </div>
                  <div className="card-inner">
                    <i className={`${role.icon} role-icon`}></i>
                    <h3>{role.name}</h3>
                    <p>{role.desc}</p>
                    <button className="generate-btn">Generate</button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      </>
    );
  }

  // view === 'landing'
  return (
    <>
      <main className="rbclb-page">
        {/* Hero Section */}
      <section className="image-layout-hero">
        <div className="container">
          <div className="hero-left" data-aos="fade-right">
            <div className="hero-badge-ribbon">
              Many Happy Faces Around The Globe
            </div>
            <h1 className="tiered-heading">
              <span className="top">Grow Your</span>
              <span className="mid">Career</span>
              <span className="bot">With Us</span>
            </h1>
            <p>Stop sending generic pitches. Our specialized AI engine crafts high-impact, role-specific cover letters that demonstrate deep industry expertise and perfectly align with modern recruiter expectations.</p>
            
            <div className="hero-btns">
              <button 
                className="btn btn-primary" 
                style={{ padding: '15px 30px', borderRadius: '12px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Select Your Role <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>

          <div className="hero-right" data-aos="fade-left">
            <div className="main-circle-bg"></div>
            
            {/* Overlapping Circles with Professional Images */}
            <div className="person-circle pc-1">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" alt="Professional 1" />
            </div>
            <div className="person-circle pc-2">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" alt="Professional 2" />
            </div>
            <div className="person-circle pc-3">
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop" alt="Professional 3" />
            </div>

            {/* Decorative elements */}
            <div className="floating-dots">
              <div className="deco-element dot-purple"></div>
              <div className="deco-element dot-blue"></div>
              <div className="deco-element dot-yellow"></div>
              <div className="deco-element dot-pink"></div>
              <div className="deco-element dot-cyan"></div>
              <div className="deco-element dot-white"></div>
              <div className="deco-element dot-purple-small"></div>
              <div className="deco-element dot-yellow-large"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section container">
        <div className="section-header" data-aos="fade-up">
          <h2>How It Works</h2>
          <p>Three simple steps to a perfectly tailored cover letter.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <div className="glass" style={{ padding: '2.5rem', textAlign: 'center' }} data-aos="fade-up" data-aos-delay="100">
            <div style={{ width: '50px', height: '50px', background: 'var(--primary-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#000', fontWeight: 800, fontSize: '1.2rem' }}>1</div>
            <h4>Choose Your Role</h4>
            <p style={{ color: 'var(--text-gray)' }}>Select your specific job category and technical stack from our extensive list.</p>
          </div>
          <div className="glass" style={{ padding: '2.5rem', textAlign: 'center' }} data-aos="fade-up" data-aos-delay="200">
            <div style={{ width: '50px', height: '50px', background: 'var(--primary-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#000', fontWeight: 800, fontSize: '1.2rem' }}>2</div>
            <h4>Personalize Content</h4>
            <p style={{ color: 'var(--text-gray)' }}>Provide a few details about your experience and the target company to personalize the narrative.</p>
          </div>
          <div className="glass" style={{ padding: '2.5rem', textAlign: 'center' }} data-aos="fade-up" data-aos-delay="300">
            <div style={{ width: '50px', height: '50px', background: 'var(--primary-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#000', fontWeight: 800, fontSize: '1.2rem' }}>3</div>
            <h4>Download & Apply</h4>
            <p style={{ color: 'var(--text-gray)' }}>Review your ATS-optimized cover letter and download it in your preferred format.</p>
          </div>
        </div>
      </section>

      {/* Infographic Section */}
      <section className="infographic-section container" data-aos="fade-up">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem' }}>The <span style={{ color: 'var(--primary-color)' }}>Precision Advantage</span>: Why Generic Isn't Enough</h2>
        </div>
        
        <div className="infographic-grid">
          {/* Card 01 */}
          <div className="info-card-wrapper">
            <div className="info-card glass">
              <div className="card-border-accent accent-cyan"></div>
              <div className="card-inner-content">
                <div className="icon-box"><i className="fa-solid fa-rocket"></i></div>
                <span className="card-label">STRATEGY</span>
                <h3>Precision Targeting</h3>
                <p style={{ marginBottom: '1.5rem' }}>In a competitive market, a general cover letter is often ignored. A role-based approach demonstrates that you aren't just looking for any job—you're the perfect fit for this specific role.</p>
                <ul style={{ listStyle: 'none', color: 'var(--text-gray)', textAlign: 'left', fontSize: '0.9rem' }}>
                  <li style={{ marginBottom: '0.8rem' }}><i className="fa-solid fa-check" style={{ color: 'var(--primary-color)', marginRight: '10px' }}></i> Role-Specific KPI Highlighting</li>
                  <li style={{ marginBottom: '0.8rem' }}><i className="fa-solid fa-check" style={{ color: 'var(--primary-color)', marginRight: '10px' }}></i> Industry-Standard Semantic Keywords</li>
                  <li style={{ marginBottom: '0.8rem' }}><i className="fa-solid fa-check" style={{ color: 'var(--primary-color)', marginRight: '10px' }}></i> Tailored Professional Tone & Voice</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Connector */}
          <div className="info-connector">
            <div className="line"></div>
            <div className="connector-circles">
              <div className="c-outer">
                <div className="c-inner"></div>
              </div>
            </div>
          </div>

          {/* Card 02 */}
          <div className="info-card-wrapper">
            <div className="info-card glass">
              <div className="card-border-accent accent-purple"></div>
              <div className="card-inner-content">
                <div className="icon-box"><i className="fa-solid fa-bullseye"></i></div>
                <span className="card-label">EXPERT INSIGHT</span>
                <h3>Strategic Engineering</h3>
                <p style={{ fontStyle: 'italic', fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-white)' }}>&ldquo;Recruiters decide in seconds. A cover letter that uses specific industry terminology and addresses role-specific pain points immediately signals that you are a high-value candidate who understands the business.&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection Grid */}
      <section className="roles-grid-section container" id="features-section">
        <div className="section-header" data-aos="fade-up">
          <h2>Select Your Job Role</h2>
          <p>Choose your specific career path to generate a tailored cover letter that speaks the language of your future employers.</p>
        </div>

        {/* Horizontal Categories Tab List */}
        <div className="tabs-slideshow-container" data-aos="fade-up" data-aos-delay="100">
          <div className="role-tabs categories-slideshow">
            <div className="marquee-track">
              {categories.map((cat) => (
                <div 
                  key={cat.id} 
                  className="role-tab" 
                  onClick={() => handleCategorySelect(cat.id)}
                >
                  {cat.label}
                </div>
              ))}
              {categories.map((cat) => (
                <div 
                  key={`${cat.id}-dup`} 
                  className="role-tab" 
                  onClick={() => handleCategorySelect(cat.id)}
                >
                  {cat.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="roles-container">
          {categories.map((cat, idx) => {
            const num = (idx + 1).toString().padStart(2, '0');
            return (
              <div 
                key={cat.id} 
                className="role-card role-orange"
                onMouseMove={(e) => handleCardMouseMove(e, idx)}
                onMouseLeave={() => handleCardMouseLeave(idx)}
                style={{ transform: cardTransform[idx] || 'translateY(0) rotateX(0) rotateY(0)' }}
                onClick={() => handleCategorySelect(cat.id)}
              >
                <div className="card-badge">
                  <span className="badge-text">OPTION</span>
                  <span className="badge-number">{num}</span>
                </div>
                <div className="card-inner">
                  <i className={`fa-solid ${cat.icon} role-icon`}></i>
                  <h3>{cat.label}</h3>
                  <p>{cat.desc}</p>
                  <button className="generate-btn">Open</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Content Section */}
      <section className="page-features-section container">
        <div className="section-header" data-aos="fade-up">
          <h2>Strategic Content Engineering</h2>
          <p>Our proprietary AI model goes beyond templates, engineering a narrative that positions you as an industry expert.</p>
        </div>

        {/* Feature 1 */}
        <div className="feature-row">
          <div className="feature-text" data-aos="fade-up">
            <div className="feat-icon-box"><i className="fa-solid fa-microchip"></i></div>
            <h3>Precision Context Mapping</h3>
            <p>Our AI doesn't just scan for keywords; it understands the specific technical challenges and KPIs of your target job role. Whether you're a Fullstack Developer or a Data Scientist, we align your narrative with the exact problems recruiters are trying to solve.</p>
            <ul className="feature-list">
              <li><i className="fa-solid fa-check"></i> Contextual integration of niche technical skills</li>
              <li><i className="fa-solid fa-check"></i> Outcome-oriented career storytelling</li>
            </ul>
          </div>
          <div className="feature-image" data-aos="fade-up" data-aos-delay="200">
            <img src="/images/RESUME TEMPLATES/file_00000000ca6c7208a76594f2e619499a.png" alt="Ecosystem Storytelling" style={{ objectFit: 'cover', height: '350px', objectPosition: 'top' }} />
            <div className="floating-badge badge-1"><i className="fa-solid fa-bolt"></i> Role Targeted</div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="feature-row reverse">
          <div className="feature-text" data-aos="fade-up">
            <div className="feat-icon-box"><i className="fa-solid fa-chart-pie"></i></div>
            <h3>Strategic Industry Positioning</h3>
            <p>Stand out by speaking the language of industry leaders. We use role-specific action verbs and sophisticated professional narrative structures that position you not just as a candidate, but as a specialist.</p>
            <ul className="feature-list">
              <li><i className="fa-solid fa-check"></i> Automatic generation of industry action verbs</li>
              <li><i className="fa-solid fa-check"></i> Tone-personality matching for your career field</li>
            </ul>
          </div>
          <div className="feature-image" data-aos="fade-up" data-aos-delay="200">
            <img src="/images/RESUME TEMPLATES/file_000000009a2872089daf10c7b99ee68d.png" alt="Value Proposition" style={{ objectFit: 'cover', height: '350px', objectPosition: 'top' }} />
            <div className="floating-badge badge-2"><i className="fa-solid fa-chart-line"></i> Higher Response Rate</div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
