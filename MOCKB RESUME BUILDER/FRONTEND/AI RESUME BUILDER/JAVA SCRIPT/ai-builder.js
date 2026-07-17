// ============================================================
//  AI RESUME BUILDER — Script
// ============================================================

// ------- Navbar: Mega Menu & Hamburger -------
const trigger = document.getElementById('resume-builder-trigger');
const megaMenu = document.getElementById('resume-mega-menu');
const hasMegaMenu = document.querySelector('.has-mega-menu');
if (trigger && megaMenu) {
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        megaMenu.classList.toggle('active');
        if (hasMegaMenu) hasMegaMenu.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
        if (!megaMenu.contains(e.target) && !trigger.contains(e.target)) {
            megaMenu.classList.remove('active');
            if (hasMegaMenu) hasMegaMenu.classList.remove('active');
        }
    });
}
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('mobile-open');
    });
}

// ------- Core: AI Builder Logic -------
const userPrompt = document.getElementById('user-prompt');
const charCount = document.getElementById('char-count');
if (userPrompt && charCount) {
    userPrompt.addEventListener('input', () => {
        charCount.textContent = `${userPrompt.value.length} / 3000`;
    });
}

const btnGenerate = document.getElementById('btn-generate');
const btnUpdate = document.getElementById('btn-update');
const followupCard = document.getElementById('followup-card');
const previewEmpty = document.getElementById('preview-empty');
const previewLoading = document.getElementById('preview-loading');
const previewWrapper = document.getElementById('resume-preview-wrapper');
const resumeDoc = document.getElementById('resume-doc');

let generatedData = null;

/**
 * FUZZY SECTION PARSER
 * Identifies sections even with messy formatting or variations.
 */
function parsePrompt(text) {
    const data = {
        name: '', title: '', email: '', phone: '', location: '', linkedin: '', website: '',
        summary: '', experience: [], education: [], skills: [], certifications: [],
        projects: [], awards: [], languages: [], internships: []
    };

    // Label variations for better detection
    const sectionMap = {
        name: ['full name', 'name', 'applicant name'],
        phone: ['phone number', 'phone', 'contact number', 'mobile'],
        email: ['email', 'e-mail', 'email address'],
        linkedin: ['linkedin', 'linkedin profile'],
        website: ['portfolio/website', 'website', 'portfolio', 'personal website'],
        title: ['target job role', 'job title', 'role', 'desired position', 'applying for'],
        summary: ['professional summary', 'summary', 'profile', 'objective', 'about me'],
        skills: ['skills', 'core skills', 'technical skills', 'key skills', 'competencies', 'technologies'],
        experience: ['work experience', 'experience', 'work history', 'professional experience', 'employment history', 'previous role'],
        education: ['education', 'academic background', 'academic history', 'qualifications'],
        projects: ['projects', 'key projects', 'personal projects', 'portfolio projects'],
        certifications: ['certifications', 'certification', 'courses', 'certificates'],
        languages: ['languages', 'language skills'],
        internships: ['internships', 'internship'],
        awards: ['awards', 'honors', 'achievements', 'awards & honors'],
        instructions: ['formatting instructions', 'instructions', 'tone', 'formatting']
    };

    // 1. Locate all section boundaries
    const foundSections = [];
    Object.keys(sectionMap).forEach(key => {
        sectionMap[key].forEach(alias => {
            // Find label followed by colon or newline, anywhere on a line
            const regex = new RegExp(`(?:^|\\n)\\s*${alias}[:\\-]?\\s*(?:\\n|$)`, 'im');
            const m = text.match(regex);
            if (m) {
                foundSections.push({ key, index: m.index, length: m[0].length });
            }
        });
    });

    // Sort by position
    foundSections.sort((a, b) => a.index - b.index);

    // Extract content blocks
    const contentBlocks = {};
    for (let i = 0; i < foundSections.length; i++) {
        const start = foundSections[i].index + foundSections[i].length;
        const end = (i + 1 < foundSections.length) ? foundSections[i + 1].index : text.length;
        const blockText = text.substring(start, end).trim();
        // Avoid overwriting if multiple aliases found (take the first/longest one)
        if (!contentBlocks[foundSections[i].key]) {
            contentBlocks[foundSections[i].key] = blockText;
        }
    }

    // 2. Map blocks to Data
    const getB = (k) => contentBlocks[k] || '';
    
    data.name = getB('name').split('\n')[0];
    data.email = getB('email').split('\n')[0] || (text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0]);
    data.phone = getB('phone').split('\n')[0] || (text.match(/(?:\+?\d[\d\s\-().]{7,15}\d)/)?.[0]);
    data.linkedin = getB('linkedin').split('\n')[0];
    data.website = getB('website').split('\n')[0];
    data.title = getB('title').split('\n')[0];

    // Summary (Filter out instruction-like sentences)
    const rawSum = getB('summary');
    if (rawSum) {
        data.summary = rawSum.split('\n').filter(l => !l.toLowerCase().includes('3-4 line') && !l.toLowerCase().includes('position me')).join('\n').trim();
    }

    // Skills
    const sText = getB('skills');
    if (sText) {
        data.skills = sText.split(/[\n,;]/).map(s => s.trim().replace(/^[-•*]\s*/, '')).filter(s => s.length > 1);
    }

    // Experience
    const eText = getB('experience');
    if (eText) {
        // Split by Job Title or by new Job entries
        const jobs = eText.split(/Job Title:?/i).filter(j => j.trim().length > 5);
        jobs.forEach(jb => {
            const company = jb.match(/Company Name:?\s*(.*)/i)?.[1]?.trim() || 'Company';
            const duration = jb.match(/Duration:?\s*(.*)/i)?.[1]?.trim() || 'Present';
            const resp = jb.match(/(?:Responsibilities & Achievements|Responsibilities|Achievements):?\s*([\s\S]*?)(?=\n[A-Z][a-z]+:?|$)/i);
            data.experience.push({
                company: capitaliseWords(company),
                role: jb.split('\n')[0].trim() || 'Role',
                start: duration.split(/[–-]/)[0].trim(),
                end: duration.split(/[–-]/)[1] || 'Present',
                bullets: resp ? resp[1].split('\n').map(b => b.trim().replace(/^[-•*]\s*/, '')).filter(b => b.length > 5) : []
            });
        });
    }

    // Education
    const edu = getB('education');
    if (edu) {
        const deg = edu.match(/Degree:?\s*(.*)/i)?.[1];
        const inst = edu.match(/Institution:?\s*(.*)/i)?.[1];
        const yr = edu.match(/Year:?\s*(\d{4})/i)?.[1];
        if (deg || inst) {
            data.education.push({ degree: capitaliseWords(deg || 'Degree'), school: capitaliseWords(inst || 'University'), end: yr || '' });
        }
    }

    // Projects
    const projects = getB('projects');
    if (projects) {
        const pBlocks = projects.split(/Project Name:?/i).filter(p => p.trim().length > 5);
        pBlocks.forEach(pb => {
            const name = pb.split('\n')[0].trim();
            const desc = pb.match(/Description:?\s*([\s\S]*?)(?=\n[A-Z][a-z]+:?|$)/i);
            if (name) {
                data.projects.push({
                    name: capitaliseWords(name),
                    description: desc ? desc[1].split('\n').map(d => d.trim().replace(/^[-•*]\s*/, '')).filter(d => d.length > 3) : []
                });
            }
        });
    }

    // Misc
    const mapMisc = (k, target) => {
        if (contentBlocks[k]) data[target] = contentBlocks[k].split('\n').map(s => s.trim().replace(/^[-•*]\s*/, '')).filter(s => s.length > 3);
    };
    mapMisc('certifications', 'certifications');
    mapMisc('languages', 'languages');
    mapMisc('internships', 'internships');
    mapMisc('awards', 'awards');

    // Name Fallback
    if (!data.name) {
        data.name = text.split('\n').find(l => l.trim() && l.trim().split(' ').length <= 4) || "Applicant Name";
    }
    if (!data.summary) data.summary = buildSummary(data);

    return data;
}

function capitaliseWords(str) {
    if (!str) return '';
    return str.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

function buildSummary(data) {
    return `Highly skilled ${data.title || 'Professional'} with experience in ${data.skills.slice(0,3).join(', ')}. Proven track record of excellence.`;
}

function renderResume(data) {
    const name = data.name || 'Your Name';
    const title = data.title || 'Professional';
    let html = `
      <div class="r-name">${name.toUpperCase()}</div>
      <div class="r-title">${title}</div>
      <div class="r-contact">
        ${data.email ? `<span>✉ ${data.email}</span>` : ''}
        ${data.phone ? `<span>📞 ${data.phone}</span>` : ''}
        ${data.linkedin ? `<span>🔗 LinkedIn</span>` : ''}
        ${data.website ? `<span>🌐 Portfolio</span>` : ''}
      </div>
      <div class="r-section"><div class="r-section-title">Summary</div><p class="r-summary">${data.summary}</p></div>
    `;

    if (data.experience.length) {
        html += `<div class="r-section"><div class="r-section-title">Experience</div>`;
        data.experience.forEach(exp => {
            html += `
              <div class="r-item">
                <div class="r-item-header"><span class="r-item-title">${exp.company}</span><span class="r-item-date">${exp.start} – ${exp.end}</span></div>
                <div class="r-item-sub">${exp.role}</div>
                <ul>${exp.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
              </div>`;
        });
        html += `</div>`;
    }

    if (data.projects.length) {
        html += `<div class="r-section"><div class="r-section-title">Projects</div>`;
        data.projects.forEach(p => {
            html += `<div class="r-item"><div class="r-item-title">${p.name}</div><ul>${p.description.map(d => `<li>${d}</li>`).join('')}</ul></div>`;
        });
        html += `</div>`;
    }

    if (data.education.length) {
        html += `<div class="r-section"><div class="r-section-title">Education</div>`;
        data.education.forEach(edu => {
            html += `<div class="r-item"><div class="r-item-header"><span class="r-item-title">${edu.degree}</span><span class="r-item-date">${edu.end}</span></div><div class="r-item-sub">${edu.school}</div></div>`;
        });
        html += `</div>`;
    }

    if (data.skills.length) {
        html += `<div class="r-section"><div class="r-section-title">Skills</div><div class="r-skills-wrap">${data.skills.map(s => `<span class="r-skill">${s}</span>`).join('')}</div></div>`;
    }

    if (data.certifications.length) {
        html += `<div class="r-section"><div class="r-section-title">Certifications</div><ul>${data.certifications.map(c => `<li>${c}</li>`).join('')}</ul></div>`;
    }

    if (data.internships.length) {
        html += `<div class="r-section"><div class="r-section-title">Internships</div><ul>${data.internships.map(i => `<li>${i}</li>`).join('')}</ul></div>`;
    }

    if (data.awards.length) {
        html += `<div class="r-section"><div class="r-section-title">Awards</div><ul>${data.awards.map(a => `<li>${a}</li>`).join('')}</ul></div>`;
    }

    if (data.languages.length) {
        html += `<div class="r-section"><div class="r-section-title">Languages</div><p>${data.languages.join(' • ')}</p></div>`;
    }

    resumeDoc.innerHTML = html;
}

function runLoadingSteps(cb) {
    const steps = ['ls1','ls2','ls3','ls4','ls5'];
    let i = 0;
    function nextStep() {
        if (i < steps.length) {
            document.getElementById(steps[i]).className = 'load-step done';
            const icon = document.getElementById(steps[i]).querySelector('i');
            if (icon) icon.className = 'fa-solid fa-check-circle';
            i++;
            setTimeout(nextStep, 350);
        } else {
            cb();
        }
    }
    steps.forEach(id => {
        document.getElementById(id).className = 'load-step';
        const icon = document.getElementById(id).querySelector('i');
        if (icon) icon.className = 'fa-solid fa-circle-notch fa-spin';
    });
    nextStep();
}

if (btnGenerate) {
    btnGenerate.addEventListener('click', () => {
        const text = userPrompt.value.trim();
        if (!text) return;
        previewEmpty.style.display = 'none';
        previewLoading.style.display = 'flex';
        previewWrapper.style.display = 'none';
        runLoadingSteps(() => {
            generatedData = parsePrompt(text);
            renderResume(generatedData);
            previewLoading.style.display = 'none';
            previewWrapper.style.display = 'block';
            followupCard.style.display = 'block';
        });
    });
}
document.getElementById('btn-pdf') && document.getElementById('btn-pdf').addEventListener('click', () => window.print());
