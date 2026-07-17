// ── PARTICLE ANIMATION ──
function initParticles(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const NUM = 120;
    const COLORS = ['#EEC30C', '#FFD700', '#FFA500', 'rgba(255,255,255,0.6)'];

    for (let i = 0; i < NUM; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2.5 + 0.5,
            dx: (Math.random() - 0.5) * 0.4,
            dy: (Math.random() - 0.5) * 0.4,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            alpha: Math.random() * 0.7 + 0.2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        });

        // Draw connecting lines between nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.save();
                    ctx.globalAlpha = (1 - dist / 100) * 0.15;
                    ctx.strokeStyle = '#EEC30C';
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }

        requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}

// ── INIT BOTH CANVASES (Disabled as requested) ──
window.addEventListener('load', () => {
    // initParticles('particle-canvas');
    // initParticles('cta-canvas');
});

// ── SOURCE TABS ──
document.querySelectorAll('.source-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.source-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const placeholders = {
            linkedin: "Paste the LinkedIn job description here...\n\nAbout the role:\nWe are looking for...\n\nResponsibilities:\n• Lead development of...\n\nRequirements:\n• 3+ years of experience in...",
            naukri: "Paste the Naukri job description here...\n\nJob Description:\nRole: Software Engineer\nExperience: 3-5 years\n\nKey Skills Required:\n•...",
            indeed: "Paste the Indeed job description here...\n\nJob Summary:\n...\n\nQualifications:\n...",
            other: "Paste any job description here...\n\nFeel free to paste from any job portal, company website, or email..."
        };
        document.getElementById('jd-input').placeholder = placeholders[tab.dataset.source] || 'Paste job description here...';
    });
});

// ── WORD COUNT ──
function updateWordCount() {
    const text = document.getElementById('jd-input').value.trim();
    const words = text ? text.split(/\s+/).length : 0;
    document.getElementById('jd-word-count').textContent = `${words} word${words !== 1 ? 's' : ''}`;
}
document.getElementById('jd-input').addEventListener('input', updateWordCount);

// ── SKILL TAGS ──
document.getElementById('skills-input').addEventListener('keydown', function(e) {
    if (e.key === ',' || e.key === 'Enter') {
        e.preventDefault();
        const val = this.value.replace(/,/g, '').trim();
        if (val) addSkillTag(val);
        this.value = '';
    }
});

function addSkillTag(skill) {
    const container = document.getElementById('skill-tags');
    const tag = document.createElement('div');
    tag.className = 'skill-tag';
    tag.innerHTML = `${skill} <i class="fa-solid fa-times" onclick="this.parentElement.remove()"></i>`;
    container.appendChild(tag);
}

// ── TEMPLATE SELECTION ──
document.querySelectorAll('.template-option').forEach(opt => {
    opt.addEventListener('click', () => {
        document.querySelectorAll('.template-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
    });
});

// ── ADD EXPERIENCE ──
function addExperience() {
    const container = document.getElementById('experience-container');
    const div = document.createElement('div');
    div.className = 'experience-item';
    div.innerHTML = `<div class="form-grid">
        <div class="form-group"><label>Job Title</label><input type="text" placeholder="Software Engineer"></div>
        <div class="form-group"><label>Company</label><input type="text" placeholder="Tech Corp"></div>
        <div class="form-group"><label>Start Date</label><input type="text" placeholder="Jan 2022"></div>
        <div class="form-group"><label>End Date</label><input type="text" placeholder="Present"></div>
        <div class="form-group full-width"><label>Key Achievements / Responsibilities</label><textarea placeholder="• Led development of...&#10;• Improved performance by 40%..."></textarea></div>
    </div>`;
    container.appendChild(div);
    div.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ── GENERATE RESUME ──
function generateResume() {
    const btn = document.getElementById('generate-btn');
    const name = document.getElementById('full-name').value || 'Your Name';
    const title = document.getElementById('job-title').value || 'Professional';
    const email = document.getElementById('email').value || 'email@example.com';
    const phone = document.getElementById('phone').value || '';
    const location = document.getElementById('location').value || '';
    const linkedin = document.getElementById('linkedin').value || '';
    const summary = document.getElementById('summary').value || 'A highly motivated professional with expertise in the relevant field.';
    const skills = Array.from(document.querySelectorAll('.skill-tag')).map(t => t.textContent.trim().replace('×', '').trim());
    const skillsText = document.getElementById('skills-input').value;
    const allSkills = [...skills, ...skillsText.split(',').map(s => s.trim()).filter(Boolean)];

    // Animate button
    btn.classList.add('loading');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Generating with AI...</span>';

    setTimeout(() => {
        btn.classList.remove('loading');
        btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Resume Generated!</span>';

        const contact = [email, phone, location, linkedin].filter(Boolean).join(' | ');

        const preview = document.getElementById('resume-preview');
        preview.innerHTML = `
        <div class="generated-resume" id="generated-resume-content">
            <div class="resume-name">${name}</div>
            <div class="resume-contact">${title} | ${contact}</div>

            <div class="resume-section-title">Professional Summary</div>
            <p style="color:#333;font-size:0.8rem;line-height:1.6;margin-bottom:0.5rem">${summary}</p>

            <div class="resume-section-title">Work Experience</div>
            ${buildExperienceHTML()}

            <div class="resume-section-title">Education</div>
            ${buildEducationHTML()}

            ${allSkills.length ? `<div class="resume-section-title">Skills</div>
            <div class="resume-skills-grid">${allSkills.map(s => `<span class="resume-skill-tag">${s}</span>`).join('')}</div>` : ''}
        </div>`;

        setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> <span>Generate My Tailored Resume</span>';
        }, 3000);
    }, 2000);
}

function buildExperienceHTML() {
    const items = document.querySelectorAll('.experience-item');
    let html = '';
    items.forEach(item => {
        const inputs = item.querySelectorAll('input');
        const textarea = item.querySelector('textarea');
        const expTitle = inputs[0]?.value || 'Software Engineer';
        const company = inputs[1]?.value || 'Company Name';
        const start = inputs[2]?.value || '';
        const end = inputs[3]?.value || '';
        const bullets = textarea?.value || '';
        html += `<div class="resume-exp-item">
            <div class="resume-exp-header">
                <span class="resume-exp-title">${expTitle} — ${company}</span>
                <span class="resume-exp-date">${start}${end ? ' – ' + end : ''}</span>
            </div>
            <ul class="resume-exp-bullets">${bullets.split('\n').filter(Boolean).map(b => `<li>${b.replace(/^•\s*/, '')}</li>`).join('')}</ul>
        </div>`;
    });
    return html || '<p style="color:#777">No experience added.</p>';
}

function buildEducationHTML() {
    const inputs = document.querySelectorAll('#step-education input');
    const degree = inputs[0]?.value || '';
    const inst = inputs[1]?.value || '';
    const year = inputs[2]?.value || '';
    const grade = inputs[3]?.value || '';
    if (!degree && !inst) return '<p style="color:#777">No education added.</p>';
    return `<div class="resume-exp-item">
        <div class="resume-exp-header">
            <span class="resume-exp-title">${degree}</span>
            <span class="resume-exp-date">${year}</span>
        </div>
        <p style="color:#555;font-size:0.8rem">${inst}${grade ? ' | ' + grade : ''}</p>
    </div>`;
}

// ── DOWNLOAD FUNCTIONS ──
function downloadPDF() {
    const content = document.getElementById('generated-resume-content');
    if (!content) { alert('Please generate your resume first!'); return; }
    window.print();
}

function downloadWord() {
    const content = document.getElementById('generated-resume-content');
    if (!content) { alert('Please generate your resume first!'); return; }
    const html = `<html><head><style>body{font-family:Arial,sans-serif;margin:40px;}</style></head><body>${content.innerHTML}</body></html>`;
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'My_Resume.doc'; a.click();
    URL.revokeObjectURL(url);
}

// ── FAQ TOGGLE ──
function toggleFaq(item) {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
}

// ── SCROLL ANIMATIONS ──
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.step-card, .feat-card, .testimonial-card, .input-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
