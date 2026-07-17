// ============================================================
//  COVER LETTER TEMPLATES — Script
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    initCopyButtons();
    initPreviewModal();
});

// ============================================================
//  FILTERING LOGIC
// ============================================================
let activeColor = 'all';
let activeStyle = 'all';
let activeJob   = 'all';
let activeExp   = 'all';

function initFilters() {
    const cards = getAllCards();

    // --- Color dot buttons ---
    document.querySelectorAll('.color-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.color-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeColor = btn.getAttribute('data-color');
            applyFilters();
        });
    });

    // --- Style pill buttons ---
    document.querySelectorAll('.filter-btn[data-style]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn[data-style]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeStyle = btn.getAttribute('data-style');
            applyFilters();
        });
    });

    // --- Job Category dropdown ---
    const jobFilter = document.getElementById('job-filter');
    if (jobFilter) {
        jobFilter.addEventListener('change', () => {
            activeJob = jobFilter.value;
            applyFilters();
        });
    }

    // --- Experience Level dropdown ---
    const expFilter = document.getElementById('exp-filter');
    if (expFilter) {
        expFilter.addEventListener('change', () => {
            activeExp = expFilter.value;
            applyFilters();
        });
    }
}

function getAllCards() {
    return document.querySelectorAll('#cl-gallery .template-card');
}

function applyFilters() {
    const cards = getAllCards();
    let visible = 0;

    cards.forEach(card => {
        const cardColor = card.getAttribute('data-color') || 'all';
        const cardStyle = card.getAttribute('data-style') || 'all';
        const cardJob   = card.getAttribute('data-job')   || 'all';
        const cardExp   = card.getAttribute('data-exp')   || 'all';

        const colorMatch = activeColor === 'all' || cardColor === activeColor;
        const styleMatch = activeStyle === 'all' || cardStyle === activeStyle;
        const jobMatch   = activeJob   === 'all' || cardJob   === activeJob;
        const expMatch   = activeExp   === 'all' || cardExp   === activeExp;

        if (colorMatch && styleMatch && jobMatch && expMatch) {
            card.style.display = '';
            // Animate in
            card.style.opacity = '0';
            card.style.transform = 'translateY(16px)';
            requestAnimationFrame(() => {
                setTimeout(() => {
                    card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, visible * 40); // stagger effect
            });
            visible++;
        } else {
            card.style.display = 'none';
        }
    });

    // Update results count
    const countEl = document.getElementById('results-count');
    if (countEl) countEl.textContent = visible;

    // Show/hide no-results
    const noResults = document.getElementById('no-results');
    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
}

// ============================================================
//  COLOR DOT SWAP ON CARD
// ============================================================
function swapCardColor(dotEl, color, colorTag) {
    // Update all dots in this card
    const card = dotEl.closest('.template-card');
    if (!card) return;

    card.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active-dot'));
    dotEl.classList.add('active-dot');

    // Update the "Use Template" link with new color
    const useLink = card.querySelector('.overlay-btn-primary');
    if (useLink) {
        const href = useLink.getAttribute('href') || '';
        const updated = href.replace(/color=[^&]*/, 'color=' + encodeURIComponent(color));
        useLink.setAttribute('href', updated);
    }

    // Update card's data-color for filtering
    card.setAttribute('data-color', colorTag);
    card.setAttribute('data-primary-color', color);

    // Update the preview modal use-btn if it's currently showing this card
    const modalUseBtn = document.getElementById('preview-modal-use-btn');
    const modalTitle = document.getElementById('preview-modal-title');
    if (modalUseBtn && modalTitle && modalTitle.textContent === card.querySelector('h3').textContent) {
        const href = modalUseBtn.getAttribute('href') || '';
        const updated = href.replace(/color=[^&]*/, 'color=' + encodeURIComponent(color));
        modalUseBtn.setAttribute('href', updated);
    }
}

// ============================================================
//  PREVIEW MODAL
// ============================================================
function initPreviewModal() {
    const overlay = document.getElementById('preview-modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closePreview();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePreview();
    });
}

function openPreview(btn) {
    const card = btn.closest('.template-card');
    if (!card) return;

    const title = card.querySelector('h3')?.textContent || 'Template Preview';
    const useLink = card.querySelector('.overlay-btn-primary');
    const href = useLink ? useLink.getAttribute('href') : '../../COVER LETTER CUSTOMIZER/HTML/index.html';

    const overlay = document.getElementById('preview-modal-overlay');
    const titleEl = document.getElementById('preview-modal-title');
    const useBtnEl = document.getElementById('preview-modal-use-btn');

    if (titleEl) titleEl.textContent = title;
    if (useBtnEl) useBtnEl.setAttribute('href', href);
    if (overlay) overlay.classList.add('active');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closePreview() {
    const overlay = document.getElementById('preview-modal-overlay');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================================
//  COPY TO CLIPBOARD
// ============================================================
function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (!targetEl) return;

            const textToCopy = targetEl.innerText || targetEl.textContent;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.classList.remove('copied');
                }, 2500);
            }).catch(() => {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = textToCopy;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);

                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.classList.remove('copied');
                }, 2500);
            });
        });
    });
}

// ============================================================
//  FAQ ACCORDION
// ============================================================
function toggleFaq(id) {
    const item = document.getElementById(id);
    if (!item) return;
    const isActive = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.cl-faq .accordion-item').forEach(el => {
        el.classList.remove('open');
    });

    // Open clicked if it wasn't already open
    if (!isActive) {
        item.classList.add('open');
    }
}
