// Sticky Header on Scroll
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Simple Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize cards for animation
document.querySelectorAll('.feature-card, .highlight-section, .split-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mega Menu Toggle Logic
const resumeTrigger = document.getElementById('resume-builder-trigger');
const resumeMegaMenu = document.getElementById('resume-mega-menu');
const resumeParent = resumeTrigger ? resumeTrigger.closest('.has-mega-menu') : null;

const langTrigger = document.getElementById('languages-trigger');
const langMegaMenu = document.getElementById('languages-mega-menu');
const langParent = document.getElementById('lang-menu-parent');

const clTrigger = document.getElementById('cover-letter-trigger');
const clMegaMenu = document.getElementById('cover-letter-mega-menu');
const clParent = clTrigger ? clTrigger.closest('.has-mega-menu') : null;

const portfolioTrigger = document.getElementById('portfolio-trigger');
const portfolioMegaMenu = document.getElementById('portfolio-mega-menu');
const portfolioParent = portfolioTrigger ? portfolioTrigger.closest('.has-mega-menu') : null;

const templatesTrigger = document.getElementById('templates-trigger');
const templatesMegaMenu = document.getElementById('templates-mega-menu');
const templatesParent = templatesTrigger ? templatesTrigger.closest('.has-mega-menu') : null;

function closeAllMegaMenus() {
    if (resumeMegaMenu) resumeMegaMenu.classList.remove('active');
    if (resumeParent) resumeParent.classList.remove('active');
    if (langMegaMenu) langMegaMenu.classList.remove('active');
    if (langParent) langParent.classList.remove('active');
    if (clMegaMenu) clMegaMenu.classList.remove('active');
    if (clParent) clParent.classList.remove('active');
    if (portfolioMegaMenu) portfolioMegaMenu.classList.remove('active');
    if (portfolioParent) portfolioParent.classList.remove('active');
    if (templatesMegaMenu) templatesMegaMenu.classList.remove('active');
    if (templatesParent) templatesParent.classList.remove('active');
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

if (portfolioTrigger && portfolioMegaMenu) {
    portfolioTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = portfolioMegaMenu.classList.contains('active');
        closeAllMegaMenus();
        if (!isActive) {
            portfolioMegaMenu.classList.add('active');
            if (portfolioParent) portfolioParent.classList.add('active');
        }
    });
}

if (templatesTrigger && templatesMegaMenu) {
    templatesTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = templatesMegaMenu.classList.contains('active');
        closeAllMegaMenus();
        if (!isActive) {
            templatesMegaMenu.classList.add('active');
            if (templatesParent) templatesParent.classList.add('active');
        }
    });
}

// Close mega menus when clicking outside
document.addEventListener('click', (e) => {
    let clickedInsideMenu = false;
    if (resumeMegaMenu && (resumeMegaMenu.contains(e.target) || resumeTrigger.contains(e.target))) clickedInsideMenu = true;
    if (langMegaMenu && (langMegaMenu.contains(e.target) || langTrigger.contains(e.target))) clickedInsideMenu = true;
    if (clMegaMenu && (clMegaMenu.contains(e.target) || clTrigger.contains(e.target))) clickedInsideMenu = true;
    if (portfolioMegaMenu && (portfolioMegaMenu.contains(e.target) || portfolioTrigger.contains(e.target))) clickedInsideMenu = true;
    if (templatesMegaMenu && (templatesMegaMenu.contains(e.target) || templatesTrigger.contains(e.target))) clickedInsideMenu = true;
    
    if (!clickedInsideMenu) {
        closeAllMegaMenus();
    }
});

// Close mega menus when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllMegaMenus();
    }
});

// Templates Gallery Slider & Filtering
const slider = document.getElementById('template-slider');
const prevBtn = document.getElementById('slider-prev');
const nextBtn = document.getElementById('slider-next');
const tabBtns = document.querySelectorAll('.tab-btn');
const templateCards = document.querySelectorAll('.template-card');

if (slider && prevBtn && nextBtn) {
    let autoPlayInterval;

    const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
            if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 10) {
                slider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: 350, behavior: 'smooth' });
            }
        }, 2000);
    };

    const stopAutoPlay = () => clearInterval(autoPlayInterval);

    nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        slider.scrollBy({ left: 400, behavior: 'smooth' });
        startAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        slider.scrollBy({ left: -400, behavior: 'smooth' });
        startAutoPlay();
    });

    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);

    // Initial start
    startAutoPlay();

    // Tab Filtering Logic
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            stopAutoPlay();
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            templateCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Scroll to start after filtering
            setTimeout(() => {
                slider.scrollTo({ left: 0, behavior: 'smooth' });
                startAutoPlay();
            }, 350);
        });
    });
}
