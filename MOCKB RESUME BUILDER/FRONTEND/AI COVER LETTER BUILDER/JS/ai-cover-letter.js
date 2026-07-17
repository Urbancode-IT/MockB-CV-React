// ============================================================
//  AI COVER LETTER BUILDER — Script
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // ------- Navbar: Mega Menu & Hamburger -------
    const resumeTrigger = document.getElementById('resume-builder-trigger');
    const resumeMegaMenu = document.getElementById('resume-mega-menu');
    const resumeParent = resumeTrigger ? resumeTrigger.closest('.has-mega-menu') : null;

    const langTrigger = document.getElementById('languages-trigger');
    const langMegaMenu = document.getElementById('languages-mega-menu');
    const langParent = document.getElementById('lang-menu-parent');

    const clTrigger = document.getElementById('cover-letter-trigger');
    const clMegaMenu = document.getElementById('cover-letter-mega-menu');
    const clParent = clTrigger ? clTrigger.closest('.has-mega-menu') : null;

    function closeAllMegaMenus() {
        if (resumeMegaMenu) resumeMegaMenu.classList.remove('active');
        if (resumeParent) resumeParent.classList.remove('active');
        if (langMegaMenu) langMegaMenu.classList.remove('active');
        if (langParent) langParent.classList.remove('active');
        if (clMegaMenu) clMegaMenu.classList.remove('active');
        if (clParent) clParent.classList.remove('active');
    }

    if (resumeTrigger && resumeMegaMenu) {
        resumeTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = resumeMegaMenu.classList.contains('active');
            closeAllMegaMenus();
            if (!isActive) {
                resumeMegaMenu.classList.add('active');
                if (resumeParent) resumeParent.classList.add('active');
            }
        });
    }

    if (langTrigger && langMegaMenu) {
        langTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = langMegaMenu.classList.contains('active');
            closeAllMegaMenus();
            if (!isActive) {
                langMegaMenu.classList.add('active');
                if (langParent) langParent.classList.add('active');
            }
        });
    }

    if (clTrigger && clMegaMenu) {
        clTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = clMegaMenu.classList.contains('active');
            closeAllMegaMenus();
            if (!isActive) {
                clMegaMenu.classList.add('active');
                if (clParent) clParent.classList.add('active');
            }
        });
    }

    document.addEventListener('click', (e) => {
        let clickedInsideMenu = false;
        if (resumeMegaMenu && (resumeMegaMenu.contains(e.target) || resumeTrigger.contains(e.target))) clickedInsideMenu = true;
        if (langMegaMenu && (langMegaMenu.contains(e.target) || langTrigger.contains(e.target))) clickedInsideMenu = true;
        if (clMegaMenu && (clMegaMenu.contains(e.target) || clTrigger.contains(e.target))) clickedInsideMenu = true;
        
        if (!clickedInsideMenu) {
            closeAllMegaMenus();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllMegaMenus();
        }
    });

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
    const followupPrompt = document.getElementById('followup-prompt');
    const followupCard = document.getElementById('followup-card');
    const previewEmpty = document.getElementById('preview-empty');
    const previewLoading = document.getElementById('preview-loading');
    const previewWrapper = document.getElementById('resume-preview-wrapper');
    const resumeDoc = document.getElementById('resume-doc');

    let generatedLetter = "";

    function parseCoverLetterPrompt(text) {
        const lines = text.split('\n');
        const data = {
            name: lines[0]?.trim() || "Applicant Name",
            role: "Target Role",
            company: "Target Company",
            highlights: []
        };

        const roleMatch = text.match(/applying for (?:the )?([\w\s]+) role/i) || text.match(/role of ([\w\s]+)/i);
        const companyMatch = text.match(/at ([\w\s]+)\./i) || text.match(/with ([\w\s]+)/i);

        if (roleMatch) data.role = roleMatch[1].trim();
        if (companyMatch) data.company = companyMatch[1].trim();

        const skillLines = lines.filter(l => l.toLowerCase().includes('skill') || l.toLowerCase().includes('experience') || l.toLowerCase().includes('worked'));
        data.highlights = skillLines.slice(0, 3).map(l => l.trim());

        return data;
    }

    function generateLetter(data) {
        const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        
        return `
            <div class="cl-header">
                <div class="cl-name">${data.name.toUpperCase()}</div>
                <div class="cl-contact">
                    <span>Email: contact@example.com</span>
                    <span>Phone: +1 234 567 890</span>
                    <span>Location: City, Country</span>
                </div>
            </div>
            
            <div class="cl-date">${today}</div>
            
            <div class="cl-recipient">
                <strong>Hiring Manager</strong><br>
                ${data.company}<br>
                Recruitment Department
            </div>
            
            <div class="cl-salutation">Dear Hiring Manager,</div>
            
            <div class="cl-body">
                <p>I am writing to express my strong interest in the <strong>${data.role}</strong> position at <strong>${data.company}</strong>, as advertised. With my extensive background and passion for excellence, I am confident that I would be a valuable asset to your team.</p>
                
                <p>During my career, I have consistently demonstrated a commitment to high-quality results. Specifically, ${data.highlights.length > 0 ? data.highlights.join(' ') : 'I have developed a strong foundation in my field through various professional challenges and successes.'} My ability to adapt and contribute to complex projects aligns perfectly with the goals of ${data.company}.</p>
                
                <p>I am particularly drawn to ${data.company} because of its reputation for innovation and its forward-thinking approach to the industry. I am eager to bring my unique perspective and problem-solving skills to help the company achieve its upcoming objectives.</p>
                
                <p>Thank you for considering my application. I have attached my resume for your review and look forward to the possibility of discussing how my experience and passion can contribute to the continued success of your team.</p>
            </div>
            
            <div class="cl-closing">
                Sincerely,<br><br>
                <strong>${data.name}</strong>
            </div>
        `;
    }

    function runLoadingSteps(cb) {
        const steps = ['ls1','ls2','ls3','ls4','ls5'];
        let i = 0;
        function nextStep() {
            if (i < steps.length) {
                const stepEl = document.getElementById(steps[i]);
                if (stepEl) {
                    stepEl.className = 'load-step done';
                    const icon = stepEl.querySelector('i');
                    if (icon) icon.className = 'fa-solid fa-check-circle';
                }
                i++;
                setTimeout(nextStep, 400);
            } else {
                cb();
            }
        }
        steps.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.className = 'load-step';
                const icon = el.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-circle-notch fa-spin';
            }
        });
        nextStep();
    }

    if (btnGenerate) {
        btnGenerate.addEventListener('click', () => {
            const text = userPrompt.value.trim();
            if (!text) {
                alert('Please enter your details in the prompt box first.');
                return;
            }
            
            previewEmpty.style.display = 'none';
            previewLoading.style.display = 'flex';
            previewWrapper.style.display = 'none';
            
            runLoadingSteps(() => {
                const data = parseCoverLetterPrompt(text);
                generatedLetter = generateLetter(data);
                resumeDoc.innerHTML = generatedLetter;
                
                previewLoading.style.display = 'none';
                previewWrapper.style.display = 'block';
                followupCard.style.display = 'block';
                
                // Scroll to preview on mobile
                if (window.innerWidth < 900) {
                    previewWrapper.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    if (btnUpdate) {
        btnUpdate.addEventListener('click', () => {
            const updateText = followupPrompt.value.trim();
            if (!updateText) return;

            previewWrapper.style.display = 'none';
            previewLoading.style.display = 'flex';

            runLoadingSteps(() => {
                // For demo: append a "Update" note to simulate changes
                resumeDoc.innerHTML += `<div style="margin-top:20px; color: #EEC30C; border-top: 1px dashed #EEC30C; padding-top:10px; font-style: italic;">Note: Letter updated based on request: "${updateText}"</div>`;
                
                previewLoading.style.display = 'none';
                previewWrapper.style.display = 'block';
                followupPrompt.value = "";
            });
        });
    }

    // PDF Download
    document.getElementById('btn-pdf') && document.getElementById('btn-pdf').addEventListener('click', () => {
        window.print();
    });

    // Word Download (.doc)
    document.getElementById('btn-word') && document.getElementById('btn-word').addEventListener('click', () => {
        if (!generatedLetter) return;
        
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
                "xmlns:w='urn:schemas-microsoft-com:office:word' "+
                "xmlns='http://www.w3.org/TR/REC-html40'>"+
                "<head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + document.getElementById("resume-doc").innerHTML + footer;
        
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'Cover_Letter.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);
    });

    // Simple FAQ toggle
    window.toggleFaq = function(el) {
        el.classList.toggle('open');
    };
});
