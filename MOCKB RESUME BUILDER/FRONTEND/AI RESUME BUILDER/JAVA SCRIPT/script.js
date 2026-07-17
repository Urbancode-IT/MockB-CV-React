document.addEventListener('DOMContentLoaded', () => {
    const navTabs = document.querySelectorAll('.nav-tab');
    const editorView = document.getElementById('editor-view');
    const templatesView = document.getElementById('templates-view');
    const previewColumn = document.querySelector('.preview-column');
    const appBody = document.body;

    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '238, 195, 12';
    }

    // ─── Tab Switching ───────────────────────────────────────────────
    function switchTab(tabName) {
        if (tabName === 'Templates') {
            editorView.style.display = 'none';
            previewColumn.style.display = 'none';
            templatesView.style.setProperty('display', 'block', 'important');
        } else {
            editorView.style.display = 'flex';
            previewColumn.style.display = 'flex';
            templatesView.style.display = 'none';
        }
    }

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            switchTab(tab.innerText.trim());
        });
    });

    // ─── Wizard Navigation ───────────────────────────────────────────
    const sectionsOrder = ['Personal info', 'Experience', 'Education', 'Skills'];
    let currentSectionIndex = 0;

    const btnBack = document.getElementById('btn-back');
    const btnNext = document.getElementById('btn-next');
    const btnCancelFinal = document.getElementById('btn-cancel-final');
    const btnSubmit = document.getElementById('btn-submit');
    const navItems = document.querySelectorAll('.nav-item');
    const sectionContents = document.querySelectorAll('.section-content');

    function updateWizardUI() {
        const currentSection = sectionsOrder[currentSectionIndex];
        navItems.forEach(item => {
            item.classList.toggle('active', item.querySelector('span').innerText.trim() === currentSection);
        });
        sectionContents.forEach(section => {
            section.style.display = (section.getAttribute('data-section') === currentSection) ? 'block' : 'none';
        });
        const headerTitle = document.querySelector('.card-header h2');
        if (headerTitle) headerTitle.innerText = `${currentSection} Content`;

        if (currentSection === 'Skills') {
            btnBack.style.display = 'block';
            btnNext.style.display = 'none';
            btnCancelFinal.style.display = 'block';
            btnSubmit.style.display = 'block';
        } else {
            btnBack.style.display = (currentSectionIndex === 0) ? 'none' : 'block';
            btnNext.style.display = 'block';
            btnCancelFinal.style.display = 'none';
            btnSubmit.style.display = 'none';
        }
    }

    btnNext.addEventListener('click', () => {
        if (currentSectionIndex < sectionsOrder.length - 1) { currentSectionIndex++; updateWizardUI(); }
    });
    btnBack.addEventListener('click', () => {
        if (currentSectionIndex > 0) { currentSectionIndex--; updateWizardUI(); }
    });
    btnSubmit.addEventListener('click', () => alert('Resume submitted successfully!'));
    btnCancelFinal.addEventListener('click', () => { if (confirm('Discard changes?')) window.location.reload(); });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const idx = sectionsOrder.indexOf(item.querySelector('span').innerText.trim());
            if (idx !== -1) { currentSectionIndex = idx; updateWizardUI(); }
        });
    });

    // ─── Real-Time Sync: Personal Info ──────────────────────────────
    function bindSync(selector, previewIds, transform) {
        const input = document.querySelector(selector);
        if (!input) return;
        const update = () => {
            const val = transform ? transform(input.value) : input.value;
            previewIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.textContent = val;
            });
        };
        input.addEventListener('input', update);
        update(); // run once on load
    }

    bindSync('[data-sync="p-name"]',      ['p-name'],         v => v.toUpperCase());
    bindSync('[data-sync="p-name"]',      ['p-name-contact'], v => v);
    bindSync('[data-sync="p-email"]',     ['p-email']);
    bindSync('[data-sync="p-phone"]',     ['p-phone']);
    bindSync('[data-sync="p-location"]',  ['p-location']);

    // ─── Real-Time Sync: Experience (first / Stripe entry) ──────────
    function bindExpField(itemId, inputLabel, previewTargetId) {
        const item = document.getElementById(itemId);
        if (!item) return;
        // find input whose preceding label text matches
        const labels = item.querySelectorAll('label');
        labels.forEach(label => {
            if (label.textContent.trim().toLowerCase() === inputLabel.toLowerCase()) {
                const input = label.nextElementSibling;
                if (!input) return;
                const update = () => {
                    const el = document.getElementById(previewTargetId);
                    if (el) el.textContent = input.value;
                };
                input.addEventListener('input', update);
                update();
            }
        });
    }

    bindExpField('exp-stripe', 'Company',    'preview-stripe-company');
    bindExpField('exp-stripe', 'Job Title',  'preview-stripe-title');
    bindExpField('exp-stripe', 'Start Date', 'preview-stripe-start');
    bindExpField('exp-stripe', 'End Date',   'preview-stripe-end');
    // Description textarea sync
    const stripeDesc = document.getElementById('main-editor-area');
    if (stripeDesc) {
        stripeDesc.addEventListener('input', () => {
            const el = document.getElementById('preview-stripe-desc');
            if (el) el.textContent = stripeDesc.value;
        });
    }

    // ─── Real-Time Sync: Education (first entry) ────────────────────
    bindExpField('edu-main', 'Degree',     'preview-edu-degree');
    bindExpField('edu-main', 'School',     'preview-edu-school');
    bindExpField('edu-main', 'Start Date', 'preview-edu-start');
    bindExpField('edu-main', 'End Date',   'preview-edu-end');

    // ─── Real-Time Sync: Skills (tags reflect in preview) ───────────
    function syncSkills() {
        const tags = document.querySelectorAll('.section-content[data-section="Skills"] .skill-tag');
        const previewSkills = document.getElementById('preview-skills-list');
        if (!previewSkills) return;
        previewSkills.innerHTML = '';
        tags.forEach(tag => {
            const name = tag.textContent.replace('×', '').trim();
            const span = document.createElement('span');
            span.className = 'preview-skill-tag';
            span.textContent = name;
            previewSkills.appendChild(span);
        });
    }

    // ─── Font Dropdown ───────────────────────────────────────────────
    const fontSelector = document.getElementById('font-selector');
    const fontDropdown = document.getElementById('font-dropdown');
    const currentFontSpan = document.getElementById('current-font');
    if (fontSelector && fontDropdown) {
        fontSelector.addEventListener('click', e => { e.stopPropagation(); fontDropdown.classList.toggle('active'); });
        document.addEventListener('click', () => fontDropdown.classList.remove('active'));
        document.querySelectorAll('.font-option').forEach(opt => {
            opt.addEventListener('click', () => {
                currentFontSpan.innerText = opt.innerText + ' Font';
                document.querySelector('.preview-wrapper').style.fontFamily = opt.getAttribute('data-font');
            });
        });
    }

    // ─── Interaction Delegation ──────────────────────────────────────
    document.addEventListener('click', e => {
        // Toggle collapsible experience forms
        const summary = e.target.closest('.exp-summary');
        if (summary) {
            const form = summary.nextElementSibling;
            const icon = summary.querySelector('.fa-solid');
            if (form && form.classList.contains('exp-form')) {
                const isHidden = form.style.display === 'none';
                form.style.display = isHidden ? 'block' : 'none';
                if (icon) { icon.classList.toggle('fa-chevron-up', isHidden); icon.classList.toggle('fa-chevron-down', !isHidden); }
            }
        }
        // Remove experience/education item
        const removeBtn = e.target.closest('.remove-item');
        if (removeBtn) { const item = removeBtn.closest('.experience-item'); if (item) item.remove(); }
        // Remove skill tag
        const removeSkill = e.target.closest('.skill-tag .fa-times');
        if (removeSkill) { removeSkill.parentElement.remove(); syncSkills(); }
    });

    // ─── Skills Input ────────────────────────────────────────────────
    const skillInput = document.querySelector('.section-content[data-section="Skills"] .form-input');
    const skillContainer = document.querySelector('.section-content[data-section="Skills"] div[style*="flex-wrap"]');
    if (skillInput && skillContainer) {
        skillInput.addEventListener('keypress', e => {
            if (e.key === 'Enter' && skillInput.value.trim()) {
                const newTag = document.createElement('span');
                newTag.className = 'skill-tag';
                newTag.innerHTML = `${skillInput.value.trim()} <i class="fa-solid fa-times"></i>`;
                skillContainer.appendChild(newTag);
                skillInput.value = '';
                syncSkills();
            }
        });
    }

    // ─── Template Selection ──────────────────────────────────────────
    document.addEventListener('click', e => {
        if (e.target.classList.contains('btn-select')) {
            const templateCard = e.target.closest('.template-card-dash');
            const accentColor = templateCard.getAttribute('data-accent');
            appBody.style.setProperty('--theme-color', accentColor);
            appBody.style.setProperty('--theme-rgb', hexToRgb(accentColor));
            appBody.setAttribute('data-theme-color', accentColor);
            document.querySelectorAll('.preview-section h2').forEach(h => { h.style.color = accentColor; });
            const previewWrapper = document.querySelector('.preview-wrapper');
            if (previewWrapper) previewWrapper.style.borderColor = accentColor;
            const resumesTab = Array.from(navTabs).find(t => t.innerText.trim() === 'Resumes');
            if (resumesTab) resumesTab.click();
        }
    });

    // ─── Toolbar (Bold / Italic) ─────────────────────────────────────
    let activeTextArea = document.getElementById('main-editor-area');
    document.addEventListener('focusin', e => { if (e.target.tagName === 'TEXTAREA') activeTextArea = e.target; });
    document.querySelectorAll('.toolbar-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.innerText.trim();
            if ((action.includes('Bold') || action.includes('Italic')) && activeTextArea) {
                const s = activeTextArea.selectionStart, en = activeTextArea.selectionEnd;
                const selected = activeTextArea.value.substring(s, en);
                if (selected) {
                    const tag = action.includes('Bold') ? '**' : '*';
                    activeTextArea.value = activeTextArea.value.substring(0, s) + tag + selected + tag + activeTextArea.value.substring(en);
                }
            }
        });
    });

    // ─── Add Experience / Education ──────────────────────────────────
    const addExpBtn = document.getElementById('add-experience-btn');
    const addEduBtn = document.getElementById('add-education-btn');

    if (addExpBtn) {
        addExpBtn.addEventListener('click', () => {
            const section = document.querySelector('.section-content[data-section="Experience"]');
            const newItem = document.createElement('div');
            newItem.className = 'experience-item';
            newItem.innerHTML = `
                <div class="remove-item"><i class="fa-solid fa-times"></i></div>
                <div class="form-grid">
                    <div class="form-group"><label>Job Title</label><input type="text" class="form-input" placeholder="Role"></div>
                    <div class="form-group"><label>Company</label><input type="text" class="form-input" placeholder="Company"></div>
                    <div class="form-group"><label>Start Date</label><input type="text" class="form-input" placeholder="MM/YYYY"></div>
                    <div class="form-group"><label>End Date</label><input type="text" class="form-input" placeholder="MM/YYYY"></div>
                </div>
                <div class="form-group" style="margin-top:12px;">
                    <label>Description</label>
                    <textarea class="form-input" style="min-height:80px;resize:vertical;" placeholder="Briefly describe your responsibilities..."></textarea>
                </div>`;
            section.insertBefore(newItem, addExpBtn);
        });
    }

    if (addEduBtn) {
        addEduBtn.addEventListener('click', () => {
            const section = document.querySelector('.section-content[data-section="Education"]');
            const newItem = document.createElement('div');
            newItem.className = 'experience-item';
            newItem.innerHTML = `
                <div class="remove-item"><i class="fa-solid fa-times"></i></div>
                <div class="form-grid">
                    <div class="form-group"><label>Degree</label><input type="text" class="form-input" placeholder="Degree"></div>
                    <div class="form-group"><label>School</label><input type="text" class="form-input" placeholder="University"></div>
                    <div class="form-group"><label>Start Date</label><input type="text" class="form-input" placeholder="YYYY"></div>
                    <div class="form-group"><label>End Date</label><input type="text" class="form-input" placeholder="YYYY"></div>
                </div>`;
            section.insertBefore(newItem, addEduBtn);
        });
    }

    // ─── Init ────────────────────────────────────────────────────────
    syncSkills();
    updateWizardUI();
});
