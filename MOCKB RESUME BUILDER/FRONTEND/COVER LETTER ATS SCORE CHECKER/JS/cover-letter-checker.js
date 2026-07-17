/* ── COVER LETTER ATS CHECKER LOGIC ── */

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('cl-file');
    const browseBtn = document.getElementById('browse-btn');
    const checkBtn = document.getElementById('check-ats-btn');
    const fileSelected = document.getElementById('file-selected');
    const fileNameDisplay = document.getElementById('file-name-display');
    const removeFileBtn = document.getElementById('remove-file');
    const resultsSection = document.getElementById('results-detailed');

    // ── FILE UPLOAD HANDLERS ──
    browseBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    function handleFile(file) {
        fileNameDisplay.textContent = file.name;
        fileSelected.style.display = 'inline-flex';
        browseBtn.style.display = 'none';
        checkBtn.disabled = false;
    }

    removeFileBtn.addEventListener('click', () => {
        fileInput.value = '';
        fileSelected.style.display = 'none';
        browseBtn.style.display = 'inline-flex';
        checkBtn.disabled = true;
    });

    // ── ANALYZE LOGIC ──
    checkBtn.addEventListener('click', () => {
        checkBtn.disabled = true;
        checkBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing...';

        setTimeout(() => {
            showResults();
        }, 2500);
    });

    function showResults() {
        checkBtn.style.display = 'none';
        resultsSection.style.display = 'block';
        
        // Mock Score
        const score = 76;
        renderMetrics();
        renderFeedback(score);
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }


    function renderMetrics() {
        const grid = document.getElementById('metrics-grid');
        const metrics = [
            { name: "ATS Parse Rate", val: 89, note: "Strong ATS Parse Rate", icon: "fa-microchip" },
            { name: "Keywords Match", val: 45, note: "Needs attention — significant gap", icon: "fa-magnifying-glass" },
            { name: "Quantifying Impact", val: 63, note: "Moderate — room for improvement", icon: "fa-chart-line" },
            { name: "Repetition", val: 65, note: "Moderate — room for improvement", icon: "fa-repeat" },
            { name: "Spelling Check", val: 84, note: "Strong Spelling Check", icon: "fa-spell-check" },
            { name: "Grammar Check", val: 82, note: "Strong Grammar Check", icon: "fa-pen-nib" },
            { name: "Formatting & Layout", val: 70, note: "Moderate — room for improvement", icon: "fa-table-columns" },
            { name: "Skills Match", val: 71, note: "Moderate — room for improvement", icon: "fa-brain" },
            { name: "Certifications", val: 44, note: "Needs attention — gap detected", icon: "fa-certificate" },
            { name: "Opening Hook", val: 74, note: "Moderate — room for improvement", icon: "fa-anchor" },
            { name: "Letter Length", val: 69, note: "Moderate — room for improvement", icon: "fa-text-width" },
            { name: "Bullet Points", val: 59, note: "Moderate — room for improvement", icon: "fa-list-ul" },
            { name: "Summary Mistakes", val: 50, note: "Moderate — room for improvement", icon: "fa-triangle-exclamation" }
        ];

        grid.innerHTML = metrics.map(m => `
            <div class="metric-card">
                <div class="metric-content">
                    <div class="metric-text-box">
                        <div class="metric-name">${m.name}</div>
                        <div class="metric-note">${getPrefix(m.val)} ${m.note}</div>
                    </div>
                    <div class="metric-circle-box">
                        <svg class="metric-svg" viewBox="0 0 80 80">
                            <circle class="metric-bg" cx="40" cy="40" r="35"></circle>
                            <circle class="metric-fill" cx="40" cy="40" r="35" 
                                style="stroke-dashoffset: ${220 - (m.val / 100 * 220)}; stroke: var(--primary)">
                            </circle>
                        </svg>
                        <div class="metric-pct-val">${m.val}%</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function getColor(val) {
        if (val >= 80) return '#22c55e';
        if (val >= 50) return '#f97316';
        return '#ef4444';
    }

    function getPrefix(val) {
        if (val >= 80) return '<i class="fa-solid fa-check"></i>';
        if (val >= 50) return '<i class="fa-solid fa-triangle-exclamation"></i>';
        return '<i class="fa-solid fa-xmark"></i>';
    }

    function renderFeedback(score) {
        const strengthsList = document.getElementById('strengths-list');
        const weaknessesList = document.getElementById('weaknesses-list');

        const strengths = [
            { name: "ATS Parse Rate", tip: "How well ATS software can read and extract your data.", val: "89%" },
            { name: "Spelling Check", tip: "Spelling errors detected across all sections.", val: "84%" },
            { name: "Grammar Check", tip: "Grammatical issues and sentence structure problems.", val: "82%" }
        ];

        const weaknesses = [
            { name: "Bullet Points", tip: "Strong, action-verb-led bullet points per section.", val: "59%" },
            { name: "Summary Mistakes", tip: "Professional summary effectiveness and common pitfalls.", val: "50%" },
            { name: "Keywords Match", tip: "Relevant industry keywords found in your letter.", val: "45%" }
        ];

        strengthsList.innerHTML = strengths.map(s => `
            <li>
                <i class="fa-solid fa-check"></i>
                <strong>${s.name}</strong>
                <span>— ${s.tip} <em>(${s.val})</em></span>
            </li>
        `).join('');

        weaknessesList.innerHTML = weaknesses.map(w => `
            <li>
                <i class="fa-solid fa-xmark"></i>
                <strong>${w.name}</strong>
                <span>— ${w.tip} <em>(${w.val})</em></span>
            </li>
        `).join('');
    }
});
