// ── METRICS CONFIG ──
const METRICS = [
    { id: 'ats_parse',      icon: 'fa-microchip',         name: 'ATS Parse Rate',                 tip: 'How well ATS software can read and extract your resume data.' },
    { id: 'keyword_match',  icon: 'fa-key',               name: 'Keywords Match',                  tip: 'Relevant industry keywords found in your resume.' },
    { id: 'impact',         icon: 'fa-chart-line',        name: 'Quantifying Impact',              tip: 'Use of numbers, percentages, and measurable achievements.' },
    { id: 'repetition',     icon: 'fa-rotate',            name: 'Repetition',                      tip: 'Repeated words or phrases that weaken your resume.' },
    { id: 'spelling',       icon: 'fa-spell-check',       name: 'Spelling Check',                  tip: 'Spelling errors detected across all sections.' },
    { id: 'grammar',        icon: 'fa-font',              name: 'Grammar Check',                   tip: 'Grammatical issues and sentence structure problems.' },
    { id: 'formatting',     icon: 'fa-table-columns',     name: 'Formatting & Layout',             tip: 'ATS-friendly layout with clean sections and standard fonts.' },
    { id: 'skills_match',   icon: 'fa-code',              name: 'Skills Match',                    tip: 'Technical and soft skills matching the target role.' },
    { id: 'certs',          icon: 'fa-certificate',       name: 'Certifications & Internships',    tip: 'Presence and relevance of certificates and experience.' },
    { id: 'projects',       icon: 'fa-diagram-project',   name: 'Projects',                        tip: 'Quality and relevance of project descriptions.' },
    { id: 'length',         icon: 'fa-ruler-vertical',    name: 'Resume Length & Density',         tip: 'Ideal resume length and white space balance.' },
    { id: 'bullets',        icon: 'fa-list-ul',           name: 'Bullet Points',                   tip: 'Strong, action-verb-led bullet points per section.' },
    { id: 'summary',        icon: 'fa-file-lines',        name: 'Summary Mistakes',                tip: 'Professional summary effectiveness and common pitfalls.' },
];

// ── DEMO ANALYSIS RESULTS ──
// In a real product this would come from the backend/AI API
function generateAnalysis() {
    return {
        score: Math.floor(Math.random() * 36) + 48, // 48-83 for realism
        metrics: {
            ats_parse:    Math.floor(Math.random()*25)+65,
            keyword_match:Math.floor(Math.random()*35)+40,
            impact:       Math.floor(Math.random()*40)+30,
            repetition:   Math.floor(Math.random()*30)+60,
            spelling:     Math.floor(Math.random()*20)+75,
            grammar:      Math.floor(Math.random()*20)+72,
            formatting:   Math.floor(Math.random()*30)+55,
            skills_match: Math.floor(Math.random()*40)+35,
            certs:        Math.floor(Math.random()*50)+25,
            projects:     Math.floor(Math.random()*45)+30,
            length:       Math.floor(Math.random()*30)+60,
            bullets:      Math.floor(Math.random()*40)+35,
            summary:      Math.floor(Math.random()*40)+30,
        }
    };
}

function getBarColor(pct) {
    if (pct >= 75) return 'var(--green)';
    if (pct >= 50) return 'var(--primary)';
    if (pct >= 30) return 'var(--orange)';
    return 'var(--red)';
}

function getNote(name, pct) {
    if (pct >= 75) return `✓ Strong ${name}`;
    if (pct >= 50) return `⚠ Moderate — room for improvement`;
    return `✗ Needs attention — significant gap detected`;
}

// ── DOM REFS ──
const dropZone    = document.getElementById('drop-zone');
const fileInput   = document.getElementById('resume-file');
const browseBtn   = document.getElementById('browse-btn');
const removeBtn   = document.getElementById('remove-file');
const fileDisplay = document.getElementById('file-selected');
const fileNameEl  = document.getElementById('file-name-display');
const checkBtn    = document.getElementById('check-ats-btn');
const resultsEl   = document.getElementById('results-section');
const regenBtn    = document.getElementById('regen-btn');
const dlSection   = document.getElementById('download-section');

let uploadedFile = null;
let analysisData = null;

// ── FILE UPLOAD HANDLERS ──
browseBtn.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('click', (e) => { if (e.target !== browseBtn && !browseBtn.contains(e.target)) fileInput.click(); });

fileInput.addEventListener('change', (e) => {
    if (e.target.files[0]) handleFile(e.target.files[0]);
});

dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', (e) => {
    e.preventDefault(); dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
});

removeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    uploadedFile = null;
    fileInput.value = '';
    fileDisplay.style.display = 'none';
    checkBtn.disabled = true;
    resultsEl.style.display = 'none';
});

function handleFile(file) {
    const allowed = ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type)) {
        alert('Please upload a PDF or Word document (.pdf / .doc / .docx)');
        return;
    }
    if (file.size > 5 * 1024 * 1024) {
        alert('File size must be under 5MB');
        return;
    }
    uploadedFile = file;
    fileNameEl.textContent = file.name;
    fileDisplay.style.display = 'flex';
    checkBtn.disabled = false;
}

// ── CHECK ATS SCORE ──
checkBtn.addEventListener('click', () => {
    if (!uploadedFile) return;
    showLoading('Scanning your resume with AI...', 'Checking 13 ATS parameters...');
    setTimeout(() => {
        analysisData = generateAnalysis();
        hideLoading();
        renderResults(analysisData);
    }, 3000);
});

// ── RENDER RESULTS ──
function renderResults(data) {
    resultsEl.style.display = 'block';
    dlSection.style.display = 'none';
    setTimeout(() => resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);

    // Animate speedometer
    animateSpeedometer(data.score);

    // Set score label
    const scoreLabel = document.getElementById('score-label');
    if (data.score < 40) { scoreLabel.textContent = '⚠ Poor — Needs Major Improvement'; scoreLabel.className = 'score-label label-poor'; }
    else if (data.score < 60) { scoreLabel.textContent = '🔶 Average — Several Issues Found'; scoreLabel.className = 'score-label label-average'; }
    else if (data.score < 80) { scoreLabel.textContent = '🟡 Good — A Few Improvements Needed'; scoreLabel.className = 'score-label label-good'; }
    else { scoreLabel.textContent = '✅ Excellent — ATS-Ready Resume!'; scoreLabel.className = 'score-label label-excellent'; }

    // Animate score counter
    animateCount(document.getElementById('score-number'), 0, data.score, 1500);

    // Render metric cards
    const grid = document.getElementById('metrics-grid');
    grid.innerHTML = '';
    METRICS.forEach((m, i) => {
        const pct = data.metrics[m.id];
        const color = getBarColor(pct);
        const card = document.createElement('div');
        card.className = 'metric-card';
        card.style.animationDelay = `${i * 0.06}s`;
        card.innerHTML = `
            <div class="metric-content">
                <div class="metric-text-box">
                    <span class="metric-name">${m.name}</span>
                    <p class="metric-note">${getNote(m.name, pct)}</p>
                </div>
                <div class="metric-circle-box">
                    <svg class="metric-svg" viewBox="0 0 80 80">
                        <circle class="metric-bg" cx="40" cy="40" r="35"></circle>
                        <circle class="metric-fill" cx="40" cy="40" r="35" 
                            style="stroke: var(--primary)" 
                            data-pct="${pct}">
                        </circle>
                    </svg>
                    <div class="metric-pct-val">${pct}%</div>
                </div>
            </div>`;
        grid.appendChild(card);
    });

    // Trigger circle animations after paint
    setTimeout(() => {
        const circumference = 2 * Math.PI * 35;
        document.querySelectorAll('.metric-fill').forEach(circle => {
            const pct = circle.dataset.pct;
            const offset = circumference - (pct / 100) * circumference;
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = offset;
        });
    }, 200);

    // Build Strengths & Weaknesses
    buildSW(data.metrics);
}

function buildSW(metrics) {
    const sorted = Object.entries(metrics).sort((a,b)=>b[1]-a[1]);
    const strongList = document.getElementById('strengths-list');
    const weakList   = document.getElementById('weaknesses-list');
    strongList.innerHTML = '';
    weakList.innerHTML = '';

    const top3    = sorted.slice(0, 4);
    const bottom3 = sorted.slice(-4);

    top3.forEach(([id, pct]) => {
        const m = METRICS.find(x=>x.id===id);
        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-solid fa-circle-check"></i><span><strong>${m.name}</strong> — ${m.tip} <em style="color:#fff">(${pct}%)</em></span>`;
        strongList.appendChild(li);
    });

    bottom3.forEach(([id, pct]) => {
        const m = METRICS.find(x=>x.id===id);
        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-solid fa-circle-xmark"></i><span><strong>${m.name}</strong> — ${m.tip} <em style="color:#fff">(${pct}%)</em></span>`;
        weakList.appendChild(li);
    });
}

// ── REGEN BUTTON ──
regenBtn.addEventListener('click', () => {
    regenBtn.classList.add('loading');
    regenBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Fixing Issues & Regenerating...</span>';
    showLoading('AI is fixing all detected issues...', 'Optimising keywords, grammar, formatting & more...');
    setTimeout(() => {
        hideLoading();
        regenBtn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Resume Regenerated!</span>';
        renderResumePreview();
        dlSection.style.display = 'block';
        setTimeout(() => dlSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }, 3500);
});

// ── RESUME PREVIEW RENDERER ──
function renderResumePreview() {
    const panel = document.getElementById('resume-preview-panel');
    if (!panel) return;
    panel.innerHTML = `
    <div class="rp-name">John Doe <span class="rp-badge">ATS Optimised ✓</span></div>
    <div class="rp-title">Senior Software Engineer</div>
    <div class="rp-contact">john.doe@email.com &nbsp;|&nbsp; +91 98765 43210 &nbsp;|&nbsp; Bangalore, India &nbsp;|&nbsp; linkedin.com/in/johndoe &nbsp;|&nbsp; github.com/johndoe</div>

    <div class="rp-section-title">Professional Summary</div>
    <p style="font-size:0.83rem;color:#333;margin-bottom:0.5rem;">
        Results-driven Senior Software Engineer with 5+ years of experience designing and delivering scalable, cloud-native applications. Proven track record of improving system performance by up to 52%, reducing API latency, and leading cross-functional teams. Proficient in JavaScript, React, Node.js, Python, and AWS. Strong advocate for ATS-friendly documentation and agile delivery practices.
    </p>

    <div class="rp-section-title">Work Experience</div>
    <div style="margin-bottom:1rem;">
        <div class="rp-exp-header">
            <span class="rp-exp-role">Senior Software Engineer</span>
            <span class="rp-exp-date">Jan 2022 – Present</span>
        </div>
        <div class="rp-exp-company">Tech Corp &nbsp;·&nbsp; Bangalore, India</div>
        <ul class="rp-bullets">
            <li>Led end-to-end development of 3 core product features, increasing user retention by <strong>34%</strong> within 2 quarters.</li>
            <li>Reduced API response time by <strong>52%</strong> through algorithmic optimisation and Redis caching strategies.</li>
            <li>Designed and implemented a microservices architecture serving <strong>2M+ daily active users</strong>.</li>
            <li>Mentored 5 junior engineers, improving team sprint velocity by <strong>20%</strong> and code review turnaround by 40%.</li>
            <li>Automated CI/CD pipelines using GitHub Actions, reducing deployment time from 45 min to 8 min.</li>
        </ul>
    </div>
    <div style="margin-bottom:1rem;">
        <div class="rp-exp-header">
            <span class="rp-exp-role">Software Engineer</span>
            <span class="rp-exp-date">Jun 2020 – Dec 2021</span>
        </div>
        <div class="rp-exp-company">StartupXYZ &nbsp;·&nbsp; Hyderabad, India</div>
        <ul class="rp-bullets">
            <li>Built RESTful APIs integrated with third-party payment gateways, processing <strong>$1.2M+ in monthly transactions</strong>.</li>
            <li>Improved front-end performance score from 62 to 94 (Lighthouse) by implementing lazy loading and code-splitting.</li>
            <li>Collaborated with UX teams to deliver a redesigned dashboard adopted by <strong>90% of enterprise clients</strong>.</li>
        </ul>
    </div>

    <div class="rp-section-title">Education</div>
    <div class="rp-edu-row">
        <span class="rp-edu-deg">B.Tech — Computer Science & Engineering</span>
        <span class="rp-edu-year">2016 – 2020</span>
    </div>
    <div class="rp-edu-inst">IIT Bombay &nbsp;·&nbsp; CGPA: 8.7 / 10.0</div>

    <div class="rp-section-title">Technical Skills</div>
    <div class="rp-skills-wrap">
        ${['JavaScript','TypeScript','React.js','Node.js','Python','AWS (EC2, S3, Lambda)','Docker','Kubernetes','PostgreSQL','MongoDB','Redis','REST APIs','GraphQL','Git','CI/CD','Agile / Scrum'].map(s=>`<span class="rp-skill-tag">${s}</span>`).join('')}
    </div>

    <div class="rp-section-title">Certifications</div>
    <ul class="rp-bullets">
        <li><strong>AWS Certified Solutions Architect – Associate</strong> (2023)</li>
        <li><strong>Google Professional Cloud Developer</strong> (2022)</li>
    </ul>

    <div class="rp-section-title">Projects</div>
    <ul class="rp-bullets">
        <li><strong>ResumeAI</strong> — AI-powered resume analysis tool built with Python & React; 12K+ users in beta. <em style="color:#aaa">(github.com/johndoe/resumeai)</em></li>
        <li><strong>ShopBot</strong> — WhatsApp chatbot for e-commerce order tracking using Node.js & Twilio; reduced support tickets by 38%.</li>
    </ul>`;
}

// ── DOWNLOAD FUNCTIONS ──
function downloadResumePDF() {
    const content = `
        <html><head><style>
            body{font-family:Arial,sans-serif;margin:40px;color:#000;}
            h1{color:#EEC30C;}h2{border-bottom:2px solid #EEC30C;padding-bottom:4px;}
        </style></head>
        <body>
            <h1>ATS-Optimised Resume</h1>
            <p><em>Generated by MockB CV ATS Checker — All issues fixed.</em></p>
            <h2>Professional Summary</h2>
            <p>Results-driven professional with a track record of delivering high-impact outcomes. Skilled in cross-functional collaboration, data-driven decision-making, and leveraging emerging technologies to solve complex business challenges.</p>
            <h2>Work Experience</h2>
            <p><strong>Senior Software Engineer</strong> — Tech Corp (2021–Present)</p>
            <ul>
                <li>Led development of 3 core product features, increasing user retention by 34%.</li>
                <li>Reduced API response time by 52% through algorithmic optimisation.</li>
                <li>Mentored a team of 5 junior engineers, improving sprint velocity by 20%.</li>
            </ul>
            <h2>Skills</h2>
            <p>JavaScript · React · Node.js · Python · AWS · Docker · SQL · REST APIs · Agile</p>
            <h2>Education</h2>
            <p><strong>B.Tech Computer Science</strong> — 2021 | 8.7 CGPA</p>
        </body></html>`;
    const blob = new Blob([content], { type: 'text/html' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'ATS_Optimised_Resume.pdf'; a.click();
    URL.revokeObjectURL(url);
}

function downloadResumeWord() {
    const content = `<html><head><style>body{font-family:Arial;margin:40px;}</style></head>
        <body>
            <h1>ATS-Optimised Resume</h1>
            <p><em>All issues fixed by MockB CV ATS Checker.</em></p>
            <h2>Professional Summary</h2>
            <p>Results-driven professional with proven impact across multiple domains.</p>
            <h2>Skills</h2>
            <p>JavaScript · React · Node.js · Python · AWS · Docker</p>
        </body></html>`;
    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'ATS_Optimised_Resume.doc'; a.click();
    URL.revokeObjectURL(url);
}

// ── SPEEDOMETER ANIMATION ──
function animateSpeedometer(score) {
    const totalLen = 267; // Arc length for the new thick ring
    const fillLen  = (score / 100) * totalLen;
    const arc = document.getElementById('speedo-arc');
    const needle = document.getElementById('speedo-needle');

    // Arc
    setTimeout(() => { 
        if (arc) arc.style.strokeDasharray = `${fillLen} ${267 - fillLen}`; 
    }, 100);

    // Needle: -90deg = 0, +90deg = 100
    const angle = -90 + (score / 100) * 180;
    setTimeout(() => { 
        if (needle) needle.style.transform = `rotate(${angle}deg)`; 
    }, 100);
}

// ── COUNTER ANIMATION ──
function animateCount(el, from, to, duration) {
    const start = performance.now();
    const update = (now) => {
        const elapsed = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(from + (to - from) * elapsed);
        if (elapsed < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

// ── LOADING OVERLAY ──
let loadingEl = null;
function showLoading(title, sub) {
    if (loadingEl) return;
    loadingEl = document.createElement('div');
    loadingEl.className = 'loading-overlay';
    loadingEl.innerHTML = `
        <div class="loading-spinner"></div>
        <p>${title}</p>
        <p class="loading-sub">${sub}</p>`;
    document.body.appendChild(loadingEl);
}
function hideLoading() {
    if (loadingEl) { loadingEl.remove(); loadingEl = null; }
}
