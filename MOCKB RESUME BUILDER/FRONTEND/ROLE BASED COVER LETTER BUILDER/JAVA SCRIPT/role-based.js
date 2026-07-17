document.addEventListener('DOMContentLoaded', () => {
    // Hero Slider Logic
    const sliderContainer = document.querySelector('.hero-slider-container');
    const dots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;

    function goToSlide(index) {
        if (!sliderContainer) return;
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
    if (sliderContainer) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % 3;
            goToSlide(currentSlide);
        }, 5000);
    }

    // Scroll Triggered Animations
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

    // 3D Card Parallax Effect
    function initCardParallax() {
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
            
            // Make entire card clickable
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                const onclickAttr = card.getAttribute('onclick') || '';
                const urlMatch = onclickAttr.match(/'([^']+)'/);
                const targetUrl = urlMatch ? urlMatch[1] : null;

                if (targetUrl && targetUrl !== '#') {
                    window.smoothNavigate(targetUrl);
                } else {
                    // Fallback for dynamically generated cards
                    const btn = card.querySelector('.generate-btn');
                    if (btn) btn.click();
                }
            });
        });
    }

    initCardParallax();

    // Airtight Page Transition Logic
    setTimeout(() => {
        document.body.classList.remove('page-loading');
    }, 100);

    window.smoothNavigate = (url) => {
        document.body.classList.add('page-loading');
        setTimeout(() => {
            window.location.href = url;
        }, 500); 
    };

    // Infinite Marquee Slideshow for Categories
    const slideshow = document.querySelector('.categories-slideshow');
    if (slideshow) {
        const catMap = {
            'Fullstack Development': 'fullstack',
            'Manual Testing': 'manual-testing',
            'Automation Testing': 'automation-testing',
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

        const items = Array.from(slideshow.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            slideshow.appendChild(clone);
        });

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
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
});
