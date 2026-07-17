import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const stepsData = [
    { start: 180, end: 144, height: 45, gradId: 1 },
    { start: 144, end: 108, height: 90, gradId: 2 },
    { start: 108, end: 72, height: 135, gradId: 3 },
    { start: 72, end: 36, height: 180, gradId: 4 },
    { start: 36, end: 0, height: 225, gradId: 5 }
];

const cardsData = [
    { year: '2025', title: 'Idea & Research', desc: 'Understanding modern job seekers and identifying career-building challenges.', icon: 'fa-lightbulb', topY: 15 },
    { year: '2026', title: 'Platform Development', desc: 'Building the foundation for a powerful career growth platform.', icon: 'fa-code', topY: 75 },
    { year: '2026', title: 'Launch Resume Builder', desc: 'Launching ATS-friendly resume creation tools for professionals.', icon: 'fa-file-lines', topY: 15 },
    { year: '2026', title: 'Launch Portfolio Builder', desc: 'Helping users build beautiful professional portfolios effortlessly.', icon: 'fa-briefcase', topY: 75 },
    { year: 'Future', title: 'Global Career Platform', desc: 'Creating the world\'s most complete platform for career growth.', icon: 'fa-rocket', topY: 15 }
];

function project(radiusType, angleDeg, height) {
    const angleRad = angleDeg * Math.PI / 180;
    const R_h = radiusType === 'outer' ? 450 : 230;
    const R_v = radiusType === 'outer' ? 190 : 97;
    
    const x = 500 + R_h * Math.cos(angleRad);
    const y = 510 - R_v * Math.sin(angleRad) - height;
    return { x, y };
}

function getArcPoints(radiusType, angleStart, angleEnd, height) {
    const points = [];
    const segments = 12;
    for (let i = 0; i <= segments; i++) {
        const angle = angleStart + (angleEnd - angleStart) * (i / segments);
        points.push(project(radiusType, angle, height));
    }
    return points;
}

export default function About() {
    // Scroll reveal hooks
    const [revealStates, setRevealStates] = useState({});
    const revealRefs = useRef([]);

    // Counter states
    const [resumesCreated, setResumesCreated] = useState(0);
    const [atsSuccess, setAtsSuccess] = useState(0);
    const [templatesCount, setTemplatesCount] = useState(0);
    const [countriesCount, setCountriesCount] = useState(0);
    const statsSectionRef = useRef(null);

    // Roadmap state
    const roadmapRef = useRef(null);
    const [roadmapProgress, setRoadmapProgress] = useState(0);
    const [isWalking, setIsWalking] = useState(false);
    const [walkDirection, setWalkDirection] = useState(1); // 1 = forward, -1 = backward
    const walkTimeoutRef = useRef(null);
    const lastProgressRef = useRef(0);
    const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });

    // 1. Scroll reveal intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('data-reveal-id');
                    setRevealStates(prev => ({ ...prev, [id]: true }));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

        revealRefs.current.forEach(el => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // 2. Stats count-up animation
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // Animate counts
                const animateCount = (target, setter) => {
                    let current = 0;
                    const increment = target / 120; // 2 seconds at 60fps
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            setter(target);
                            clearInterval(timer);
                        } else {
                            setter(Math.ceil(current));
                        }
                    }, 16);
                };

                animateCount(50000, setResumesCreated);
                animateCount(95, setAtsSuccess);
                animateCount(120, setTemplatesCount);
                animateCount(30, setCountriesCount);

                observer.unobserve(statsSectionRef.current);
            }
        }, { threshold: 0.5 });

        if (statsSectionRef.current) {
            observer.observe(statsSectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // 3. Roadmap progress updates
    useEffect(() => {
        const handleScroll = () => {
            if (!roadmapRef.current) return;
            const rect = roadmapRef.current.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            const scrollDistance = viewHeight - rect.top;
            const totalScrollable = rect.height + viewHeight;
            let progress = scrollDistance / totalScrollable;
            progress = Math.max(0, Math.min(1, progress));

            setRoadmapProgress(progress);

            // walking animation and direction
            if (progress > lastProgressRef.current + 0.002) {
                setWalkDirection(1);
                setIsWalking(true);
            } else if (progress < lastProgressRef.current - 0.002) {
                setWalkDirection(-1);
                setIsWalking(true);
            }

            clearTimeout(walkTimeoutRef.current);
            walkTimeoutRef.current = setTimeout(() => {
                setIsWalking(false);
            }, 150);

            lastProgressRef.current = progress;
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(walkTimeoutRef.current);
        };
    }, []);

    const handleMouseMove = (e) => {
        if (!roadmapRef.current) return;
        const rect = roadmapRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x: `${x}%`, y: `${y}%` });
    };

    // Helper: compute characters positioning on roadmap
    const getCharHeight = (progress) => {
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
    };

    const charAngleRad = (180 - roadmapProgress * 180) * Math.PI / 180;
    const charX = 500 + 340 * Math.cos(charAngleRad);
    const charHeight = getCharHeight(roadmapProgress);
    const charY = 510 - 143.5 * Math.sin(charAngleRad) - charHeight;

    const leftPercent = (charX / 1000) * 100;
    const topPercent = (charY / 650) * 100;

    // SVG elements pre-computation
    const stepsDataRender = stepsData.map((step, idx) => {
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

        return {
            id: i,
            topFacePath,
            sidePath,
            innerSkirtPath,
            outerSkirtPath,
            endSidePath,
            gradId
        };
    });

    const stepCenters = [];
    const columns = [170, 335, 500, 665, 830];
    const cardBottoms = [95, 155, 95, 155, 95];

    columns.forEach((centerX, idx) => {
        const cosVal = (centerX - 500) / 340;
        const clampedCos = Math.max(-1, Math.min(1, cosVal));
        const angleRad = Math.acos(clampedCos);
        const step = stepsData[idx];
        const stepCenterY = 510 - 143.5 * Math.sin(angleRad) - step.height;
        stepCenters.push({ x: centerX, y: stepCenterY });
    });

    // Connector dash offset calculations
    const getConnectorOffset = (i, center) => {
        const triggerPoint = (i - 0.7) / 4.5;
        const cardBottom = cardBottoms[i-1];
        const lineLength = Math.max(10, center.y - cardBottom);
        if (roadmapProgress >= triggerPoint) return 0;
        return lineLength;
    };

    return (
        <div className="about-page-container fade-in">
            <main className="about-page">
                {/* Hero Section */}
                <section className="about-hero">
                    <div className="particles"></div>
                    <div className="moving-grid"></div>
                    <div className="container about-hero-content">
                        <div className="small-badge stagger-item">ABOUT US</div>
                        <h1 className="stagger-item">Helping Job Seekers Build Resumes That <span className="highlight">Get Interviews</span></h1>
                        <p className="stagger-item subheading">MockB CV combines AI-powered resume creation, ATS optimization, cover letter generation, portfolio building, and professional templates into one powerful platform.</p>
                        <div className="about-hero-btns stagger-item">
                            <Link to="/resume/ai-builder" className="btn btn-primary magnetic-btn">Start Building Resume</Link>
                            <a href="#explore" className="btn btn-secondary magnetic-btn">Explore Features</a>
                        </div>
                    </div>
                </section>

                {/* Our Story */}
                <section 
                    ref={el => revealRefs.current[0] = el}
                    data-reveal-id="story"
                    className={`about-story container section-padding ${revealStates['story'] ? 'scroll-reveal visible' : 'scroll-reveal'}`}
                    id="explore"
                >
                    <div className="story-grid">
                        <div className="story-left">
                            <div className="floating-cards-container">
                                <div className="float-card fc-1"><i className="fa-solid fa-file-lines"></i> Resume Builder</div>
                                <div className="float-card fc-2"><i className="fa-solid fa-gauge-high"></i> ATS Score</div>
                                <div className="float-card fc-3"><i className="fa-solid fa-envelope-open-text"></i> Cover Letter</div>
                                <div className="float-card fc-4"><i className="fa-solid fa-laptop-code"></i> Portfolio Builder</div>
                            </div>
                        </div>
                        <div className="story-right">
                            <h2>Our Story</h2>
                            <p>MockB CV was created with one mission — helping professionals create resumes that actually get noticed.</p>
                            <p>Most job seekers struggle with ATS systems, poor formatting, weak content, and confusing tools. We wanted to simplify the process and bring every career-building tool into one intelligent platform.</p>
                            <p>Today, MockB CV helps students, freshers, professionals, freelancers, and job seekers create resumes, cover letters, and portfolios that stand out.</p>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section 
                    ref={el => revealRefs.current[1] = el}
                    data-reveal-id="mv"
                    className={`about-mission-vision container section-padding ${revealStates['mv'] ? 'scroll-reveal visible' : 'scroll-reveal'}`}
                >
                    <div className="mv-grid">
                        <div className="mv-card glass-card">
                            <div className="mv-icon"><i className="fa-solid fa-rocket"></i></div>
                            <h3>Our Mission</h3>
                            <p>To empower job seekers worldwide with AI-driven tools that simplify resume creation and increase interview opportunities.</p>
                        </div>
                        <div className="mv-card glass-card">
                            <div className="mv-icon"><i className="fa-solid fa-eye"></i></div>
                            <h3>Our Vision</h3>
                            <p>To become the most trusted career-building platform helping millions achieve their dream jobs.</p>
                        </div>
                    </div>
                </section>

                {/* What We Offer */}
                <section 
                    ref={el => revealRefs.current[2] = el}
                    data-reveal-id="offer"
                    className={`about-offer container section-padding ${revealStates['offer'] ? 'scroll-reveal visible' : 'scroll-reveal'}`}
                >
                    <div className="section-header text-center">
                        <h2>Everything You Need To Get Hired</h2>
                    </div>
                    <div className="offer-grid">
                        <div className="offer-card">
                            <div className="icon-glow-box"><i className="fa-solid fa-robot"></i></div>
                            <h3>AI Resume Builder</h3>
                            <p>Generate professional ATS-friendly resumes in minutes.</p>
                        </div>
                        <div className="offer-card">
                            <div className="icon-glow-box"><i className="fa-solid fa-gauge-high"></i></div>
                            <h3>ATS Score Checker</h3>
                            <p>Analyze and optimize resumes for applicant tracking systems.</p>
                        </div>
                        <div className="offer-card">
                            <div className="icon-glow-box"><i className="fa-solid fa-envelope-open-text"></i></div>
                            <h3>Cover Letter Builder</h3>
                            <p>Create personalized cover letters instantly.</p>
                        </div>
                        <div className="offer-card">
                            <div className="icon-glow-box"><i className="fa-solid fa-laptop-code"></i></div>
                            <h3>Portfolio Builder</h3>
                            <p>Build stunning professional portfolios.</p>
                        </div>
                        <div className="offer-card">
                            <div className="icon-glow-box"><i className="fa-solid fa-pen-to-square"></i></div>
                            <h3>Resume Customizer</h3>
                            <p>Tailor resumes for specific job roles.</p>
                        </div>
                        <div className="offer-card">
                            <div className="icon-glow-box"><i className="fa-solid fa-file-lines"></i></div>
                            <h3>Premium Templates</h3>
                            <p>Choose from beautiful modern templates.</p>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section ref={statsSectionRef} className="about-stats section-padding">
                    <div className="container stats-grid">
                        <div className="stat-item">
                            <div className="stat-number">{resumesCreated.toLocaleString()}+</div>
                            <div className="stat-label">Resumes Created</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">{atsSuccess}%</div>
                            <div className="stat-label">ATS Optimization Success</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">{templatesCount}+</div>
                            <div className="stat-label">Professional Templates</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">{countriesCount}+</div>
                            <div className="stat-label">Countries Reached</div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section 
                    ref={el => revealRefs.current[3] = el}
                    data-reveal-id="why"
                    className={`about-why container section-padding ${revealStates['why'] ? 'scroll-reveal visible' : 'scroll-reveal'}`}
                >
                    <div className="section-header text-center">
                        <h2>Why Thousands Choose MockB CV</h2>
                    </div>
                    <div className="why-grid">
                        <div className="why-card tilt-card">
                            <div className="why-icon"><i className="fa-solid fa-bolt"></i></div>
                            <h3>Fast & Easy</h3>
                            <p>Build resumes within minutes.</p>
                        </div>
                        <div className="why-card tilt-card">
                            <div className="why-icon"><i className="fa-solid fa-check-double"></i></div>
                            <h3>ATS Friendly</h3>
                            <p>Pass automated screening systems.</p>
                        </div>
                        <div className="why-card tilt-card">
                            <div className="why-icon"><i className="fa-solid fa-brain"></i></div>
                            <h3>AI Powered</h3>
                            <p>Smarter recommendations and content.</p>
                        </div>
                        <div className="why-card tilt-card">
                            <div className="why-icon"><i className="fa-solid fa-cubes"></i></div>
                            <h3>All-In-One Platform</h3>
                            <p>Resume, Cover Letter & Portfolio in one place.</p>
                        </div>
                    </div>
                </section>

                {/* 3D Roadmap Section */}
                <section 
                    ref={roadmapRef}
                    className="about-timeline premium-roadmap-section revealed" 
                    id="journey"
                    onMouseMove={handleMouseMove}
                    style={{
                        '--mouse-x': mousePos.x,
                        '--mouse-y': mousePos.y
                    }}
                >
                    <div className="roadmap-bg-effects">
                        <div className="roadmap-grid-glow"></div>
                        <div className="roadmap-particles">
                            {Array.from({ length: 20 }).map((_, idx) => (
                                <span 
                                    key={idx}
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 8}s`,
                                        animationDuration: `${6 + Math.random() * 8}s`,
                                        opacity: Math.random() * 0.6
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    
                    <div className="roadmap-header">
                        <h2>Our Journey</h2>
                        <p className="roadmap-subtitle">A stunning 3D interactive roadmap of our milestones and future ambition</p>
                    </div>

                    <div className="roadmap-viewport-container">
                        <div className="roadmap-3d-wrapper">
                            <svg id="roadmap-svg" viewBox="0 0 1000 650" preserveAspectRatio="xMidYMid meet">
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

                                    {/* Gradients */}
                                    {stepsData.map((step) => (
                                        <React.Fragment key={step.gradId}>
                                            <linearGradient id={`grad-top-${step.gradId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stop-color={
                                                    step.gradId === 1 ? '#805e0c' : step.gradId === 2 ? '#cca53d' : step.gradId === 3 ? '#ffd700' : step.gradId === 4 ? '#ffaa00' : '#ff7700'
                                                } />
                                                <stop offset="100%" stop-color={
                                                    step.gradId === 1 ? '#4d3705' : step.gradId === 2 ? '#805f0f' : step.gradId === 3 ? '#b8860b' : step.gradId === 4 ? '#cc7700' : '#cc3300'
                                                } />
                                            </linearGradient>
                                            <linearGradient id={`grad-side-${step.gradId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stop-color={
                                                    step.gradId === 1 ? '#4d3705' : step.gradId === 2 ? '#805f0f' : step.gradId === 3 ? '#b8860b' : step.gradId === 4 ? '#cc7700' : '#cc3300'
                                                } />
                                                <stop offset="100%" stop-color={
                                                    step.gradId === 1 ? '#241a04' : step.gradId === 2 ? '#3d2c05' : step.gradId === 3 ? '#5c4305' : step.gradId === 4 ? '#774400' : '#661100'
                                                } />
                                            </linearGradient>
                                        </React.Fragment>
                                    ))}
                                </defs>

                                {/* Steps rendering */}
                                {stepsDataRender.map((step) => (
                                    <g key={step.id} className="roadmap-step-group" data-step={step.id}>
                                        <path d={step.topFacePath} fill="rgba(0,0,0,0.4)" filter="url(#shadow)" />
                                        {step.sidePath && <path d={step.sidePath} fill={`url(#grad-side-${step.gradId})`} className="roadmap-step-side" />}
                                        <path d={step.innerSkirtPath} fill={`url(#grad-side-${step.gradId})`} className="roadmap-step-side" />
                                        <path d={step.outerSkirtPath} fill={`url(#grad-side-${step.gradId})`} className="roadmap-step-side" />
                                        <path d={step.topFacePath} fill={`url(#grad-top-${step.gradId})`} className="roadmap-step-top" />
                                        {step.endSidePath && <path d={step.endSidePath} fill={`url(#grad-side-${step.gradId})`} className="roadmap-step-side" />}
                                    </g>
                                ))}

                                {/* Connectors & Timeline */}
                                <line x1="120" y1="165" x2="880" y2="165" stroke="#222" stroke-width="2" stroke-linecap="round" />
                                <path 
                                    id="active-timeline" 
                                    d="M 120 165 L 880 165" 
                                    stroke="#F4C20D" 
                                    stroke-width="3" 
                                    stroke-linecap="round" 
                                    stroke-dasharray="760" 
                                    stroke-dashoffset={760 - (roadmapProgress * 760)} 
                                    filter="url(#gold-glow)" 
                                    style={{ transition: 'stroke-dashoffset 0.1s ease-out' }} 
                                />

                                {stepCenters.map((center, idx) => {
                                    const i = idx + 1;
                                    const cardBottom = cardBottoms[idx];
                                    const lineLength = Math.max(10, center.y - cardBottom);
                                    const currentOffset = getConnectorOffset(i, center);

                                    return (
                                        <React.Fragment key={i}>
                                            <line x1={center.x} y1={center.y} x2={center.x} y2={cardBottom} stroke="rgba(244, 194, 13, 0.1)" stroke-width="1.5" stroke-dasharray="5,5" />
                                            <line 
                                                x1={center.x} 
                                                y1={center.y} 
                                                x2={center.x} 
                                                y2={cardBottom} 
                                                stroke="#F4C20D" 
                                                stroke-width="2" 
                                                stroke-dasharray={lineLength} 
                                                stroke-dashoffset={currentOffset} 
                                                filter="url(#gold-glow)" 
                                                style={{ transition: 'stroke-dashoffset 0.4s ease-out' }} 
                                            />
                                        </React.Fragment>
                                    );
                                })}

                                {/* Node dots */}
                                {stepCenters.map((center, idx) => {
                                    const i = idx + 1;
                                    const triggerPoint = (i - 0.7) / 4.5;
                                    const isActive = roadmapProgress >= triggerPoint;

                                    return (
                                        <g key={i} className="timeline-node" data-step={i}>
                                            <circle 
                                                cx={center.x} 
                                                cy="165" 
                                                r="7" 
                                                fill="#000" 
                                                stroke={isActive ? '#F4C20D' : '#333'} 
                                                stroke-width="2" 
                                                style={{ transition: 'stroke 0.3s' }} 
                                            />
                                            <circle 
                                                cx={center.x} 
                                                cy="165" 
                                                r={isActive ? 5.5 : 3.5} 
                                                fill={isActive ? '#F4C20D' : '#333'} 
                                                style={{ transition: 'fill 0.3s, r 0.3s' }} 
                                            />
                                        </g>
                                    );
                                })}
                            </svg>

                            {/* Floating Icons overlay */}
                            <div className="roadmap-icons-container">
                                {stepCenters.map((center, idx) => {
                                    const i = idx + 1;
                                    const triggerPoint = (i - 0.7) / 4.5;
                                    const isActive = roadmapProgress >= triggerPoint;
                                    const cardData = cardsData[idx];

                                    const iconY = (center.y + 165) / 2;
                                    const iconLeft = (center.x / 1000) * 100;
                                    const iconTop = (iconY / 650) * 100;

                                    return (
                                        <div 
                                            key={i}
                                            className={`roadmap-icon-wrapper ${isActive ? 'active' : ''}`}
                                            style={{
                                                left: `${iconLeft}%`,
                                                top: `${iconTop}%`,
                                                animationDelay: `${idx * 0.8}s`
                                            }}
                                        >
                                            <i className={`fa-solid ${cardData.icon}`}></i>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Floating glassmorphism cards overlay */}
                            <div className="roadmap-cards-container">
                                {stepCenters.map((center, idx) => {
                                    const i = idx + 1;
                                    const triggerPoint = (i - 0.7) / 4.5;
                                    const isActive = roadmapProgress >= triggerPoint;
                                    const cardData = cardsData[idx];

                                    const cardLeft = (center.x / 1000) * 100;
                                    const cardTop = (cardData.topY / 650) * 100;

                                    return (
                                        <div 
                                            key={i}
                                            className={`roadmap-card ${isActive ? 'active' : ''}`}
                                            style={{
                                                left: `${cardLeft}%`,
                                                top: `${cardTop}%`,
                                                animationDelay: `${idx * 1.2}s`
                                            }}
                                        >
                                            <div className="card-year">{cardData.year}</div>
                                            <div className="card-title">{cardData.title}</div>
                                            <div className="card-desc">{cardData.desc}</div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Walking character sprite */}
                            <div 
                                id="walking-character" 
                                className={`character-sprite ${isWalking ? 'walking' : ''}`}
                                style={{
                                    left: `${leftPercent}%`,
                                    top: `${topPercent}%`,
                                    transform: `translate(-50%, -100%) scaleX(${walkDirection})`
                                }}
                            >
                                <svg viewBox="0 0 64 64" width="60" height="60">
                                    <ellipse cx="32" cy="54" rx="14" ry="4" fill="rgba(244, 194, 13, 0.4)" filter="blur(2px)" />
                                    <circle cx="32" cy="14" r="6" fill="#FFFFFF" stroke="#F4C20D" stroke-width="2" className="char-head" />
                                    <path d="M32 20 L32 38" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" className="char-body" />
                                    <path className="char-arm-left" d="M32 22 L20 30" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" />
                                    <path className="char-arm-right" d="M32 22 L44 28" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" />
                                    <path className="char-leg-left" d="M32 38 L24 54" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" />
                                    <path className="char-leg-right" d="M32 38 L40 54" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" />
                                    <rect x="42" y="28" width="13" height="9" rx="2" fill="#F4C20D" className="char-case" />
                                    <path d="M46 28 L46 25 L51 25 L51 28" stroke="#000000" stroke-width="1.5" fill="none" className="char-case-handle" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section 
                    ref={el => revealRefs.current[4] = el}
                    data-reveal-id="values"
                    className={`about-values container section-padding ${revealStates['values'] ? 'scroll-reveal visible' : 'scroll-reveal'}`}
                >
                    <div className="section-header text-center">
                        <h2>Core Values</h2>
                    </div>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="float-icon-box"><i className="fa-solid fa-lightbulb"></i></div>
                            <h3>Innovation</h3>
                            <p>Continuously improving with AI.</p>
                        </div>
                        <div className="value-card">
                            <div className="float-icon-box"><i className="fa-solid fa-gem"></i></div>
                            <h3>Quality</h3>
                            <p>Professional results every time.</p>
                        </div>
                        <div className="value-card">
                            <div className="float-icon-box"><i className="fa-solid fa-shield-halved"></i></div>
                            <h3>Trust</h3>
                            <p>Built with transparency.</p>
                        </div>
                        <div className="value-card">
                            <div className="float-icon-box"><i className="fa-solid fa-arrow-trend-up"></i></div>
                            <h3>Growth</h3>
                            <p>Helping users reach career goals.</p>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section 
                    ref={el => revealRefs.current[5] = el}
                    data-reveal-id="testimonials"
                    className={`about-testimonials section-padding ${revealStates['testimonials'] ? 'scroll-reveal visible' : 'scroll-reveal'}`}
                >
                    <div className="container">
                        <div className="section-header text-center">
                            <h2>What Our Users Say</h2>
                        </div>
                        <div className="testimonials-carousel">
                            <div className="carousel-track">
                                <div className="carousel-slide">
                                    <div className="stars"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
                                    <p className="review">"MockB CV helped me land interviews within weeks."</p>
                                    <div className="author">
                                        <div className="avatar">SJ</div>
                                        <div className="info">
                                            <h4>Sarah Jenkins</h4>
                                            <span>Marketing Manager</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-slide">
                                    <div className="stars"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
                                    <p className="review">"The ATS checker was incredibly useful."</p>
                                    <div className="author">
                                        <div className="avatar">DT</div>
                                        <div className="info">
                                            <h4>David Torres</h4>
                                            <span>Software Engineer</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-slide">
                                    <div className="stars"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
                                    <p className="review">"The templates look professional and modern."</p>
                                    <div className="author">
                                        <div className="avatar">EK</div>
                                        <div className="info">
                                            <h4>Elena K.</h4>
                                            <span>Product Designer</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Duplicates for infinite scroll */}
                                <div className="carousel-slide">
                                    <div className="stars"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
                                    <p className="review">"MockB CV helped me land interviews within weeks."</p>
                                    <div className="author">
                                        <div className="avatar">SJ</div>
                                        <div className="info">
                                            <h4>Sarah Jenkins</h4>
                                            <span>Marketing Manager</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="about-cta section-padding">
                    <div className="cta-particles"></div>
                    <div 
                        ref={el => revealRefs.current[6] = el}
                        data-reveal-id="cta"
                        className={`container cta-content ${revealStates['cta'] ? 'scroll-reveal visible' : 'scroll-reveal'}`}
                    >
                        <h2>Ready To Build Your Dream Career?</h2>
                        <p>Join thousands of professionals using MockB CV to create resumes that stand out.</p>
                        <div className="cta-btns">
                            <Link to="/resume/ai-builder" className="btn btn-primary magnetic-btn">Start Building Resume</Link>
                            <Link to="/resume/templates" className="btn btn-secondary magnetic-btn">Explore Templates</Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
