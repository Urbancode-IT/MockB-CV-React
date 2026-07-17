document.addEventListener('DOMContentLoaded', () => {
    // Mega Menu Toggle Logic
    const resumeTrigger = document.getElementById('resume-builder-trigger');
    const megaMenu = document.getElementById('resume-mega-menu');
    const hasMegaMenu = document.querySelector('.has-mega-menu');

    if (resumeTrigger && megaMenu) {
        resumeTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            megaMenu.classList.toggle('active');
            hasMegaMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!megaMenu.contains(e.target) && !resumeTrigger.contains(e.target)) {
                megaMenu.classList.remove('active');
                hasMegaMenu.classList.remove('active');
            }
        });
    }

    // Hero Slider Logic
    const sliderContainer = document.querySelector('.hero-slider-container');
    const dots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;

    function goToSlide(index) {
        currentSlide = index;
        sliderContainer.style.transform = `translateX(-${index * 33.333}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goToSlide(i));
    });

    // Auto-slide every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % 3;
        goToSlide(currentSlide);
    }, 5000);

    // Scroll Triggered Animations (Simple implementation)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // Role Tabs Filtering
    const tabs = document.querySelectorAll('.role-tab');
    const templates = document.querySelectorAll('.template-item');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            templates.forEach(template => {
                if (filter === 'all' || template.getAttribute('data-role') === filter) {
                    template.style.display = 'block';
                    setTimeout(() => template.style.opacity = '1', 10);
                } else {
                    template.style.opacity = '0';
                    setTimeout(() => template.style.display = 'none', 300);
                }
            });
        });
    });

    // 3D Card Parallax Effect
    document.querySelectorAll('.role-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `translateY(0) rotateX(0) rotateY(0)`;
        });
    });

    // Button Click Interactions & Redirection
    const allButtons = document.querySelectorAll('.generate-btn, .hero-slide .btn-premium, .template-item .btn-primary');
    
    allButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const btnText = btn.innerText.toLowerCase();
            
            // Handle "View Templates" scrolling
            if (btnText.includes('view templates')) {
                const templateSection = document.querySelector('.templates-showcase');
                if (templateSection) {
                    templateSection.scrollIntoView({ behavior: 'smooth' });
                }
                return;
            }

            // Determine role for redirection
            let role = 'it-professional';
            const card = btn.closest('.role-card');
            const template = btn.closest('.template-item');
            
            if (card) {
                const title = card.querySelector('h3');
                if (title) role = title.innerText.toLowerCase().replace(/\s+/g, '-');
            } else if (template) {
                role = template.getAttribute('data-role') || 'it-professional';
            }
            
            // Redirect to the new exclusive generation page
            window.location.href = `generate.html?role=${role}`;
        });
    });

    // Airtight Page Transition Logic
    // Initial Fade In (Removes the static overlay state)
    setTimeout(() => {
        document.body.classList.remove('page-loading');
    }, 100);

    window.smoothNavigate = (url) => {
        document.body.classList.add('page-loading');
        // Give time for the overlay to fade in completely before redirecting
        setTimeout(() => {
            window.location.href = url;
        }, 500); 
    };

    // Infinite Marquee Slideshow for Categories
    const slideshow = document.querySelector('.categories-slideshow');
    if (slideshow) {
        // Name to Slug mapping for categories
        const catMap = {
            'Fullstack Development': 'fullstack',
            'Software Testing': 'testing',
            'AI and Data Science': 'ai-data',
            'Cloud and DevOps': 'cloud-devops',
            'Programming Languages': 'languages',
            'UI UX Designing': 'ui-ux',
            'Database': 'database',
            'Data Engineering': 'data-eng',
            'Net Working': 'networking',
            'Digital Marketing': 'marketing',
            'CRM': 'crm',
            'Automation': 'automation'
        };

        // Clone items for infinite effect
        const items = Array.from(slideshow.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            slideshow.appendChild(clone);
        });

        // Add Click Listeners to all tabs
        slideshow.querySelectorAll('.role-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                slideshow.querySelectorAll('.role-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const catSlug = catMap[tab.innerText.trim()];
                if (catSlug) {
                    smoothNavigate(`roles-list.html?cat=${catSlug}`);
                }
            });
        });

        let scrollSpeed = 0.5;
        let animationId;
        let currentScroll = 0;

        const animate = () => {
            currentScroll += scrollSpeed;
            const halfWidth = slideshow.scrollWidth / 2;
            if (currentScroll >= halfWidth) currentScroll = 0;
            slideshow.scrollLeft = currentScroll;
            animationId = requestAnimationFrame(animate);
        };

        animate();

        slideshow.addEventListener('mouseenter', () => cancelAnimationFrame(animationId));
        slideshow.addEventListener('mouseleave', () => animationId = requestAnimationFrame(animate));
    }

    // Update Role Card Click Logic (Entire Card Clickable)
    document.querySelectorAll('.role-card').forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', (e) => {
            // Check if we already have a target URL from onclick
            const onclickAttr = card.getAttribute('onclick') || '';
            const urlMatch = onclickAttr.match(/'([^']+)'/);
            const targetUrl = urlMatch ? urlMatch[1] : null;

            if (targetUrl && targetUrl !== '#') {
                e.preventDefault();
                e.stopPropagation();
                window.smoothNavigate(targetUrl);
            }
        });

        // Also ensure any buttons inside don't double-trigger
        card.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                card.click(); // Trigger the card click
            });
        });
    });
});
