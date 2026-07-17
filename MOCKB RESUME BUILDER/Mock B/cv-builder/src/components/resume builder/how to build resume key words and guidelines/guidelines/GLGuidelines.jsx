import React, { useState, useEffect } from 'react';
import './GLGuidelines.css';

const GUIDELINE_STEPS = [
    {
        id: '01',
        title: 'What Recruiters Actually Look For',
        description: 'Recruiters scan resumes in 6–8 seconds. You must grab their attention instantly with job relevance, skills match, and clean formatting.',
        icon: 'fa-eye',
        badge: 'Scan-Ready'
    },
    {
        id: '02',
        title: 'Perfect Resume Structure',
        description: 'Stick to a standard hierarchy: Header, Summary, Skills, Experience, Projects, and Education. Avoid fancy graphics that confuse ATS.',
        icon: 'fa-sitemap',
        badge: 'ATS Friendly'
    },
    {
        id: '03',
        title: 'How to Write Strong Content',
        description: 'Focus on results using the formula: Action Verb + Task + Result. Turn responsibilities into measurable achievements.',
        icon: 'fa-pen-nib',
        badge: 'Result-Driven'
    },
    {
        id: '04',
        title: 'Keywords (ATS Optimization)',
        description: 'Identify repeated terms in the Job Description and include them naturally. Match exact phrasing like "React.js" instead of just "React".',
        icon: 'fa-key',
        badge: 'Optimized'
    },
    {
        id: '05',
        title: 'Recruiter Mindset (Golden Tips)',
        description: 'Customize every resume, keep it concise (1-2 pages), and quantify everything with numbers. Save your file professionally as Name_Role.pdf.',
        icon: 'fa-award',
        badge: 'Pro Tip'
    }
];

export default function GLGuidelines() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Trigger animations when component mounts
        const timer = setTimeout(() => {
            setAnimate(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="gl-infographic-wrapper">
            <div className="container">
                <div className="gl-steps-container">
                    {GUIDELINE_STEPS.map((step, index) => (
                        <div key={step.id} className={`gl-step-row ${animate ? 'animate' : ''}`} style={{ transitionDelay: `${index * 0.15}s` }}>
                            <div className="gl-folder-tab">
                                <div className="gl-step-label">Step</div>
                                <div className="gl-step-id">{step.id}</div>
                                <div className="gl-step-progress"></div>
                            </div>
                            <div className="gl-content-bar">
                                <div className="gl-content-icon"><i className={`fa-solid ${step.icon}`}></i></div>
                                <div className="gl-content-main">
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </div>
                                <div className="gl-content-action">
                                    <span className="gl-badge-tag">{step.badge}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
