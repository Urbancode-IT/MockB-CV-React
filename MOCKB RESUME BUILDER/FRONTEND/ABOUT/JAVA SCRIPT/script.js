document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger timeline specific animations
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('animated');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // 3D Roadmap Implementation
    const roadmapSvg = document.getElementById('roadmap-svg');
    const premiumRoadmap = document.querySelector('.premium-roadmap-section');
    
    if (roadmapSvg && premiumRoadmap) {
        // Project 3D cylinder step coordinates onto 2D viewport
        function project(radiusType, angleDeg, height) {
            const angleRad = angleDeg * Math.PI / 180;
            const R_h = radiusType === 'outer' ? 450 : 230;
            const R_v = radiusType === 'outer' ? 190 : 97;
            
            const x = 500 + R_h * Math.cos(angleRad);
            const y = 510 - R_v * Math.sin(angleRad) - height;
            return { x, y };
        }

        // Generate coordinates along the arc curve
        function getArcPoints(radiusType, angleStart, angleEnd, height) {
            const points = [];
            const segments = 12;
            for (let i = 0; i <= segments; i++) {
                const angle = angleStart + (angleEnd - angleStart) * (i / segments);
                points.push(project(radiusType, angle, height));
            }
            return points;
        }

        // Draw the 3D steps and connection structure
        function buildRoadmap() {
            roadmapSvg.innerHTML = `
                <defs>
                    <filter id="gold-glow" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feComponentTransfer in="blur" result="glow1">
                            <feFuncA type="linear" slope="0.5"/>
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode in="glow1" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    
                    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="#000000" flood-opacity="0.8" />
                    </filter>

                    <!-- Gradients -->
                    <!-- Step 1: Dark Gold -->
                    <linearGradient id="grad-top-1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#805e0c" />
                        <stop offset="100%" stop-color="#4d3705" />
                    </linearGradient>
                    <linearGradient id="grad-side-1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#4d3705" />
                        <stop offset="100%" stop-color="#241a04" />
                    </linearGradient>

                    <!-- Step 2: Gold -->
                    <linearGradient id="grad-top-2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#cca53d" />
                        <stop offset="100%" stop-color="#805f0f" />
                    </linearGradient>
                    <linearGradient id="grad-side-2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#805f0f" />
                        <stop offset="100%" stop-color="#3d2c05" />
                    </linearGradient>

                    <!-- Step 3: Bright Yellow -->
                    <linearGradient id="grad-top-3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#ffd700" />
                        <stop offset="100%" stop-color="#b8860b" />
                    </linearGradient>
                    <linearGradient id="grad-side-3" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#b8860b" />
                        <stop offset="100%" stop-color="#5c4305" />
                    </linearGradient>

                    <!-- Step 4: Amber Gold -->
                    <linearGradient id="grad-top-4" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#ffaa00" />
                        <stop offset="100%" stop-color="#cc7700" />
                    </linearGradient>
                    <linearGradient id="grad-side-4" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#cc7700" />
                        <stop offset="100%" stop-color="#774400" />
                    </linearGradient>

                    <!-- Step 5: Premium Orange-Gold -->
                    <linearGradient id="grad-top-5" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#ff7700" />
                        <stop offset="100%" stop-color="#cc3300" />
                    </linearGradient>
                    <linearGradient id="grad-side-5" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#cc3300" />
                        <stop offset="100%" stop-color="#661100" />
                    </linearGradient>
                </defs>
            `;

            const stepsData = [
                { start: 180, end: 144, height: 45, gradId: 1 },
                { start: 144, end: 108, height: 90, gradId: 2 },
                { start: 108, end: 72, height: 135, gradId: 3 },
                { start: 72, end: 36, height: 180, gradId: 4 },
                { start: 36, end: 0, height: 225, gradId: 5 }
            ];

            let stepsHtml = '';
            stepsData.forEach((step, idx) => {
                const i = idx + 1;
                const { start, end, height, gradId } = step;
                
                const outerSkirtPoints = [...getArcPoints('outer', start, end, height), ...getArcPoints('outer', end, start, 0)];
                const outerSkirtPath = 'M ' + outerSkirtPoints.map(p => `${p.x} ${p.y}`).join(' L ') + ' Z';

                const innerSkirtPoints = [...getArcPoints('inner', start, end, height), ...getArcPoints('inner', end, start, 0)];
                const innerSkirtPath = 'M ' + innerSkirtPoints.map(p => `${p.x} ${p.y}`).join(' L ') + ' Z';

                const topFacePoints = [...getArcPoints('inner', start, end, height), ...getArcPoints('outer', end, start, height)];
                const topFacePath = 'M ' + topFacePoints.map(p => `${p.x} ${p.y}`).join(' L ') + ' Z';

                let sidePath = '';
                if (i === 1) {
                    const p1 = project('inner', 180, 0);
                    const p2 = project('outer', 180, 0);
                    const p3 = project('outer', 180, height);
                    const p4 = project('inner', 180, height);
                    sidePath = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p4.x} ${p4.y} Z`;
                } else {
                    const prevHeight = stepsData[idx-1].height;
                    const p1 = project('inner', start, prevHeight);
                    const p2 = project('outer', start, prevHeight);
                    const p3 = project('outer', start, height);
                    const p4 = project('inner', start, height);
                    sidePath = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p4.x} ${p4.y} Z`;
                }

                let endSidePath = '';
                if (i === 5) {
                    const p1 = project('inner', 0, 0);
                    const p2 = project('outer', 0, 0);
                    const p3 = project('outer', 0, height);
                    const p4 = project('inner', 0, height);
                    endSidePath = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p4.x} ${p4.y} Z`;
                }

                stepsHtml += `
                    <g class="roadmap-step-group" data-step="${i}">
                        <path d="${topFacePath}" fill="rgba(0,0,0,0.4)" filter="url(#shadow)" />
                        ${sidePath ? `<path d="${sidePath}" fill="url(#grad-side-${gradId})" class="roadmap-step-side" />` : ''}
                        <path d="${innerSkirtPath}" fill="url(#grad-side-${gradId})" class="roadmap-step-side" />
                        <path d="${outerSkirtPath}" fill="url(#grad-side-${gradId})" class="roadmap-step-side" />
                        <path d="${topFacePath}" fill="url(#grad-top-${gradId})" class="roadmap-step-top" />
                        ${endSidePath ? `<path d="${endSidePath}" fill="url(#grad-side-${gradId})" class="roadmap-step-side" />` : ''}
                    </g>
                `;
            });

            // Connectors & Timeline
            const timelineY = 165;
            let connectorsHtml = `
                <line x1="120" y1="${timelineY}" x2="880" y2="${timelineY}" stroke="#222" stroke-width="2" stroke-linecap="round" />
                <path id="active-timeline" d="M 120 ${timelineY} L 880 ${timelineY}" stroke="#F4C20D" stroke-width="3" stroke-linecap="round" stroke-dasharray="760" stroke-dashoffset="760" filter="url(#gold-glow)" style="transition: stroke-dashoffset 0.1s ease-out;" />
            `;
            let nodesHtml = '';

            const stepCenters = [];
            const columns = [170, 335, 500, 665, 830];
            const cardBottoms = [95, 155, 95, 155, 95];

            columns.forEach((centerX, idx) => {
                const i = idx + 1;
                const cosVal = (centerX - 500) / 340;
                const clampedCos = Math.max(-1, Math.min(1, cosVal));
                const angleRad = Math.acos(clampedCos);
                const step = stepsData[idx];
                const stepCenterY = 510 - 143.5 * Math.sin(angleRad) - step.height;
                
                stepCenters.push({ x: centerX, y: stepCenterY });

                const cardBottom = cardBottoms[idx];
                const lineLength = Math.max(10, stepCenterY - cardBottom);

                connectorsHtml += `
                    <line x1="${centerX}" y1="${stepCenterY}" x2="${centerX}" y2="${cardBottom}" stroke="rgba(244, 194, 13, 0.1)" stroke-width="1.5" stroke-dasharray="5,5" />
                    <line x1="${centerX}" y1="${stepCenterY}" x2="${centerX}" y2="${cardBottom}" stroke="#F4C20D" stroke-width="2" class="connector-line-active-${i}" stroke-dasharray="${lineLength}" stroke-dashoffset="${lineLength}" filter="url(#gold-glow)" style="transition: stroke-dashoffset 0.4s ease-out;" />
                `;

                nodesHtml += `
                    <g class="timeline-node" data-step="${i}">
                        <circle cx="${centerX}" cy="${timelineY}" r="7" fill="#000" stroke="#333" stroke-width="2" class="node-outer-${i}" style="transition: stroke 0.3s;" />
                        <circle cx="${centerX}" cy="${timelineY}" r="3.5" fill="#333" class="node-inner-${i}" style="transition: fill 0.3s, r 0.3s;" />
                    </g>
                `;
            });

            roadmapSvg.innerHTML += stepsHtml + connectorsHtml + nodesHtml;
            
            // Build cards & icons
            buildOverlayElements(stepCenters);
        }

        function buildOverlayElements(stepCenters) {
            const cardsContainer = document.querySelector('.roadmap-cards-container');
            const iconsContainer = document.querySelector('.roadmap-icons-container');
            
            const cardsData = [
                { year: '2025', title: 'Idea & Research', desc: 'Understanding modern job seekers and identifying career-building challenges.', icon: 'fa-lightbulb', topY: 15 },
                { year: '2026', title: 'Platform Development', desc: 'Building the foundation for a powerful career growth platform.', icon: 'fa-code', topY: 75 },
                { year: '2026', title: 'Launch Resume Builder', desc: 'Launching ATS-friendly resume creation tools for professionals.', icon: 'fa-file-lines', topY: 15 },
                { year: '2026', title: 'Launch Portfolio Builder', desc: 'Helping users build beautiful professional portfolios effortlessly.', icon: 'fa-briefcase', topY: 75 },
                { year: 'Future', title: 'Global Career Platform', desc: 'Creating the world\'s most complete platform for career growth.', icon: 'fa-rocket', topY: 15 }
            ];

            let cardsHtml = '';
            let iconsHtml = '';

            stepCenters.forEach((center, idx) => {
                const i = idx + 1;
                const cardData = cardsData[idx];
                const cardLeft = (center.x / 1000) * 100;
                const cardTop = (cardData.topY / 650) * 100;

                cardsHtml += `
                    <div class="roadmap-card" style="left: ${cardLeft}%; top: ${cardTop}%;" data-step="${i}">
                        <div class="card-year">${cardData.year}</div>
                        <div class="card-title">${cardData.title}</div>
                        <div class="card-desc">${cardData.desc}</div>
                    </div>
                `;

                // Icon Y: halfway between stepCenterY and timelineY = 165
                const iconY = (center.y + 165) / 2;
                const iconLeft = (center.x / 1000) * 100;
                const iconTop = (iconY / 650) * 100;

                iconsHtml += `
                    <div class="roadmap-icon-wrapper" style="left: ${iconLeft}%; top: ${iconTop}%;" data-step="${i}">
                        <i class="fa-solid ${cardData.icon}"></i>
                    </div>
                `;
            });

            if (cardsContainer) cardsContainer.innerHTML = cardsHtml;
            if (iconsContainer) iconsContainer.innerHTML = iconsHtml;
        }

        // Build it initially
        buildRoadmap();

        // Generate background particles
        const particlesContainer = document.querySelector('.roadmap-particles');
        if (particlesContainer) {
            for (let i = 0; i < 20; i++) {
                const span = document.createElement('span');
                span.style.left = `${Math.random() * 100}%`;
                span.style.top = `${Math.random() * 100}%`;
                span.style.animationDelay = `${Math.random() * 8}s`;
                span.style.animationDuration = `${6 + Math.random() * 8}s`;
                span.style.opacity = Math.random() * 0.6;
                particlesContainer.appendChild(span);
            }
        }

        // Mouse follow lighting
        premiumRoadmap.addEventListener('mousemove', (e) => {
            const rect = premiumRoadmap.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            premiumRoadmap.style.setProperty('--mouse-x', `${x}%`);
            premiumRoadmap.style.setProperty('--mouse-y', `${y}%`);
        });

        // Resolve height of the walking character standing on stairs
        function getCharHeight(progress) {
            const steps = [45, 90, 135, 180, 225];
            const n = steps.length;
            const index = progress * (n - 1);
            const baseIndex = Math.floor(index);
            const frac = index - baseIndex;
            
            if (baseIndex < n - 1) {
                if (frac < 0.82) {
                    return steps[baseIndex];
                } else {
                    const t = (frac - 0.82) / 0.18;
                    const smoothT = (1 - Math.cos(t * Math.PI)) / 2;
                    return steps[baseIndex] + (steps[baseIndex+1] - steps[baseIndex]) * smoothT;
                }
            }
            return steps[n - 1];
        }

        // Scroll animation handler
        let lastProgress = 0;
        let walkTimeout;
        const activeTimeline = document.getElementById('active-timeline');
        const char = document.getElementById('walking-character');

        function updateRoadmapProgress(progress) {
            if (activeTimeline) {
                activeTimeline.style.strokeDashoffset = 760 - (progress * 760);
            }

            if (char) {
                const angleRad = (180 - progress * 180) * Math.PI / 180;
                const charX = 500 + 340 * Math.cos(angleRad);
                const charHeight = getCharHeight(progress);
                const charY = 510 - 143.5 * Math.sin(angleRad) - charHeight;
                
                const left_percent = (charX / 1000) * 100;
                const top_percent = (charY / 650) * 100;
                
                char.style.left = `${left_percent}%`;
                char.style.top = `${top_percent}%`;

                if (progress > lastProgress + 0.002) {
                    char.style.transform = 'translate(-50%, -100%) scaleX(1)';
                    char.classList.add('walking');
                } else if (progress < lastProgress - 0.002) {
                    char.style.transform = 'translate(-50%, -100%) scaleX(-1)';
                    char.classList.add('walking');
                }
                
                clearTimeout(walkTimeout);
                walkTimeout = setTimeout(() => {
                    char.classList.remove('walking');
                }, 150);

                lastProgress = progress;
            }

            const stepsData = [
                { start: 180, end: 144, height: 45, gradId: 1 },
                { start: 144, end: 108, height: 90, gradId: 2 },
                { start: 108, end: 72, height: 135, gradId: 3 },
                { start: 72, end: 36, height: 180, gradId: 4 },
                { start: 36, end: 0, height: 225, gradId: 5 }
            ];

            for (let i = 1; i <= 5; i++) {
                const triggerPoint = (i - 0.7) / 4.5;
                const activeLine = document.querySelector(`.connector-line-active-${i}`);
                const outerNode = document.querySelector(`.node-outer-${i}`);
                const innerNode = document.querySelector(`.node-inner-${i}`);
                const card = document.querySelector(`.roadmap-card[data-step="${i}"]`);
                const icon = document.querySelector(`.roadmap-icon-wrapper[data-step="${i}"]`);

                // Calculate exact line length to draw dynamically
                const cosVal = (([170, 335, 500, 665, 830][i-1]) - 500) / 340;
                const clampedCos = Math.max(-1, Math.min(1, cosVal));
                const angleRad = Math.acos(clampedCos);
                const step = stepsData[i-1];
                const stepCenterY = 510 - 143.5 * Math.sin(angleRad) - step.height;
                const cardBottom = [95, 155, 95, 155, 95][i-1];
                const lineLength = Math.max(10, stepCenterY - cardBottom);

                if (progress >= triggerPoint) {
                    if (activeLine) activeLine.style.strokeDashoffset = '0';
                    if (outerNode) outerNode.setAttribute('stroke', '#F4C20D');
                    if (innerNode) {
                        innerNode.setAttribute('fill', '#F4C20D');
                        innerNode.setAttribute('r', '5.5');
                    }
                    if (card) card.classList.add('active');
                    if (icon) icon.classList.add('active');
                } else {
                    if (activeLine) activeLine.style.strokeDashoffset = lineLength;
                    if (outerNode) outerNode.setAttribute('stroke', '#333');
                    if (innerNode) {
                        innerNode.setAttribute('fill', '#333');
                        innerNode.setAttribute('r', '3.5');
                    }
                    if (card) card.classList.remove('active');
                    if (icon) icon.classList.remove('active');
                }
            }
        }

        const roadmapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    premiumRoadmap.classList.add('revealed');
                    
                    let startProgress = 0;
                    const targetProgress = getScrollProgress();
                    const walkDuration = 1200;
                    const startTime = performance.now();
                    
                    function introAnimate(currentTime) {
                        const elapsed = currentTime - startTime;
                        const t = Math.min(1, elapsed / walkDuration);
                        const easeOutQuad = t * (2 - t);
                        
                        const currentP = easeOutQuad * targetProgress;
                        updateRoadmapProgress(currentP);
                        
                        if (t < 1) {
                            requestAnimationFrame(introAnimate);
                        } else {
                            window.addEventListener('scroll', handleScroll);
                        }
                    }
                    requestAnimationFrame(introAnimate);
                    
                    roadmapObserver.unobserve(premiumRoadmap);
                }
            });
        }, { threshold: 0.15 });

        roadmapObserver.observe(premiumRoadmap);

        function getScrollProgress() {
            const rect = premiumRoadmap.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            const scrollDistance = viewHeight - rect.top;
            const totalScrollable = rect.height + viewHeight;
            let progress = scrollDistance / totalScrollable;
            return Math.max(0, Math.min(1, progress));
        }

        function handleScroll() {
            const progress = getScrollProgress();
            updateRoadmapProgress(progress);
        }
    }

    // 2. Count Up Animation for Stats
    const stats = document.querySelectorAll('.count-up');
    let counted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !counted) {
            stats.forEach(stat => {
                const target = +stat.getAttribute('data-target');
                const duration = 2000;
                const increment = target / (duration / 16); // ~60fps
                
                let current = 0;
                const updateCount = () => {
                    current += increment;
                    if (current < target) {
                        stat.innerText = Math.ceil(current).toLocaleString();
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.innerText = target.toLocaleString();
                    }
                };
                updateCount();
            });
            counted = true;
        }
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // 3. Magnetic Hover Effect for Buttons
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseout', function() {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // 4. 3D Tilt Effect for Why Choose Us Cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
});
