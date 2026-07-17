document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.rt-slider-track');
    const btnPrev = document.querySelector('.rt-slider-btn.prev');
    const btnNext = document.querySelector('.rt-slider-btn.next');

    if (track && btnPrev && btnNext) {
        // Adjust the scroll amount based on card width + gap
        const scrollAmount = 300; 

        btnPrev.addEventListener('click', () => {
            track.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        btnNext.addEventListener('click', () => {
            track.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }

    // Advanced Filter Bar Logic
    const dropdownBtns = document.querySelectorAll('.rt-filter-pill.has-dropdown');

    // Inject dummy keywords into cards for mockup filtering so all options show results
    const grid = document.querySelector('.rt-grid');
    if (grid) {
        // Duplicate existing 6 cards to make 24 cards total for a richer mockup
        const initialHTML = grid.innerHTML;
        grid.innerHTML += initialHTML + initialHTML + initialHTML;
    }

    const cards = document.querySelectorAll('.rt-grid .rt-card');

    const dummyKeywords = [
        ['top picks', 'ats'],
        ['modern', 'traditional', 'simple', 'creative', 'minimalist', 'infographic', 'photo'],
        ['one page', 'two page', 'one column', 'two column', 'timeline'],
        ['entry level', 'mid level', 'senior'],
        ['chronological', 'functional', 'hybrid'],
        ['blue', 'gray', 'green', 'red', 'navy'],
        ['photo', 'no photo'],
        ['single', 'double']
    ];

    cards.forEach((card, index) => {
        let dummyText = "";
        dummyKeywords.forEach((group, gIndex) => {
            // Use different math for different groups to ensure mixed distribution
            dummyText += group[(index + gIndex) % group.length] + " ";
            if (index % 3 === 0) {
                dummyText += group[(index + gIndex + 1) % group.length] + " ";
            }
        });
        card.setAttribute('data-dummy-tags', dummyText.toLowerCase());
    });

    // Filter Function
    function filterCards() {
        // Collect active filters
        let activeFilters = [];

        // Check top pills (All, Top Picks, ATS)
        const activeTopPill = document.querySelector('.rt-filter-row-1 > .rt-filter-pill:not(.has-dropdown).active');
        if (activeTopPill && activeTopPill.id !== 'filter-all') {
            activeFilters.push(activeTopPill.textContent.trim().toLowerCase());
        }

        // Check dropdowns (Styles, Layout, Exp, Format)
        document.querySelectorAll('.rt-filter-pill.has-dropdown.active').forEach(dd => {
            const selectedText = dd.getAttribute('data-selected-text');
            if (selectedText && !selectedText.includes('All')) {
                activeFilters.push(selectedText.toLowerCase());
            }
        });

        // Check Color
        const activeColor = document.querySelector('.rt-color-btn.active:not(#color-all)');
        if (activeColor) {
            activeFilters.push(activeColor.getAttribute('data-color').toLowerCase());
        }

        // Check Photo
        const activePhoto = document.querySelector('.rt-toggle-group .rt-toggle-btn.active[id^="photo-"]:not(#photo-all)');
        if (activePhoto) {
            activeFilters.push(activePhoto.textContent.trim().toLowerCase());
        }

        // Check Columns
        const activeCol = document.querySelector('.rt-toggle-group .rt-toggle-btn.active[id^="col-"]:not(#col-all)');
        if (activeCol) {
            activeFilters.push(activeCol.textContent.trim().toLowerCase());
        }

        // Apply filters to cards
        cards.forEach(card => {
            const cardText = (card.innerText + " " + card.getAttribute('data-dummy-tags')).toLowerCase();
            let isMatch = true;

            for (let filter of activeFilters) {
                if (!cardText.includes(filter)) {
                    isMatch = false;
                    break;
                }
            }

            if (isMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Toggle dropdowns
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownBtns.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    otherBtn.nextElementSibling.classList.remove('show');
                }
            });
            btn.nextElementSibling.classList.toggle('show');
        });
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.rt-dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
        });
    });

    // Handle dropdown item selection
    document.querySelectorAll('.rt-dd-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const parentMenu = item.closest('.rt-dropdown-menu');
            const parentBtn = parentMenu.previousElementSibling;
            
            // Remove active from all items in this menu
            parentMenu.querySelectorAll('.rt-dd-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // If "All" is selected, remove active state from pill, else add it
            const selectedText = item.textContent.trim();
            if (selectedText.includes('All')) {
                parentBtn.classList.remove('active');
                parentBtn.removeAttribute('data-selected-text');
            } else {
                parentBtn.classList.add('active');
                parentBtn.setAttribute('data-selected-text', selectedText);
            }
            
            parentMenu.classList.remove('show');
            filterCards();
        });
    });

    // Category pills logic (All, Top Picks, ATS)
    const categoryPills = document.querySelectorAll('.rt-filter-row-1 > .rt-filter-pill:not(.has-dropdown)');
    categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
            categoryPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            // If "All" is clicked, reset everything else
            if (pill.id === 'filter-all') {
                // Reset dropdowns
                document.querySelectorAll('.rt-filter-pill.has-dropdown').forEach(dd => {
                    dd.classList.remove('active');
                    dd.removeAttribute('data-selected-text');
                    const menu = dd.nextElementSibling;
                    if (menu) {
                        menu.querySelectorAll('.rt-dd-item').forEach(item => item.classList.remove('active'));
                    }
                });
                
                // Reset colors
                document.querySelectorAll('.rt-color-btn').forEach(btn => btn.classList.remove('active'));
                const colorAll = document.getElementById('color-all');
                if (colorAll) colorAll.classList.add('active');
                
                // Reset toggles
                document.querySelectorAll('.rt-toggle-group').forEach(group => {
                    group.querySelectorAll('.rt-toggle-btn').forEach(btn => btn.classList.remove('active'));
                    const allBtn = group.querySelector('.rt-toggle-btn[id$="-all"]');
                    if (allBtn) allBtn.classList.add('active');
                });
            }

            filterCards();
        });
    });

    // Color selector logic
    const colorBtns = document.querySelectorAll('.rt-color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            colorBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterCards();
        });
    });

    // Toggle group logic (Photo, Columns)
    const toggleGroups = document.querySelectorAll('.rt-toggle-group');
    toggleGroups.forEach(group => {
        const btns = group.querySelectorAll('.rt-toggle-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterCards();
            });
        });
    });

    // Modal HTML Injection for Preview
    const modalHTML = `
    <div id="preview-modal" class="rt-modal">
        <div class="rt-modal-content">
            <span class="rt-close-modal">&times;</span>
            <img id="preview-image" src="" alt="Resume Preview">
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Attach event listeners for Preview and Use Template using Event Delegation
    document.addEventListener('click', (e) => {
        // Preview logic
        if (e.target.classList.contains('btn-secondary') && e.target.textContent.trim() === 'Preview') {
            const cardImg = e.target.closest('.rt-card-img').querySelector('img');
            if (cardImg) {
                document.getElementById('preview-image').src = cardImg.src;
                document.getElementById('preview-modal').style.display = 'flex';
            }
        }
        
        // Use Template logic
        if (e.target.classList.contains('btn-primary') && e.target.textContent.trim() === 'Use Template') {
            const cardImg = e.target.closest('.rt-card-img').querySelector('img');
            if (cardImg) {
                // Encode the image source to pass to the editor
                // Get the relative path or filename
                const imgSrc = new URL(cardImg.src, window.location.href).pathname;
                window.location.href = `../../RESUME CUSTOMIZER/HTML/editor.html?template=${encodeURIComponent(imgSrc)}`;
            }
        }
        
        // Close modal logic
        if (e.target.classList.contains('rt-close-modal') || e.target.id === 'preview-modal') {
            document.getElementById('preview-modal').style.display = 'none';
        }
    });

});
