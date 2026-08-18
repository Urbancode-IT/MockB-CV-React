import React from 'react';
import './Executive.css';

// ======================================
// Executive Template
//
// Single-column · Bold dark header · Premium
// Accent color: Deep Navy (#0F172A)
// For senior professionals
// ======================================

const Executive = ({ resumeData = {} }) => {
    const {
        themeColor, personal = {},
        summary = '',
        experience = [],
        education = [],
        skills = [],
        projects = [],
        certifications = [],
        languages = [],
    } = resumeData;

    const hasContent = (arr) => Array.isArray(arr) && arr.length > 0;

    return (
        <div className="ex-resume" style={{ '--accent-color': themeColor || '#1A3A5C' }}>

            {/* ── HEADER ── */}
            <div className="ex-header">
                <div className="ex-header-inner">
                    <div className="ex-header-left">
                        <h1 className="ex-name">{personal.name || 'Your Name'}</h1>
                        {personal.jobTitle && (
                            <p className="ex-job-title">{personal.jobTitle}</p>
                        )}
                    </div>
                    <div className="ex-header-right">
                        {personal.email && (
                            <div className="ex-contact-item">
                                <i className="fa-solid fa-envelope"></i>
                                <span>{personal.email}</span>
                            </div>
                        )}
                        {personal.phone && (
                            <div className="ex-contact-item">
                                <i className="fa-solid fa-phone"></i>
                                <span>{personal.phone}</span>
                            </div>
                        )}
                        {personal.location && (
                            <div className="ex-contact-item">
                                <i className="fa-solid fa-location-dot"></i>
                                <span>{personal.location}</span>
                            </div>
                        )}
                        {personal.linkedin && (
                            <div className="ex-contact-item">
                                <i className="fa-brands fa-linkedin"></i>
                                <span>{personal.linkedin}</span>
                            </div>
                        )}
                        {personal.github && (
                            <div className="ex-contact-item">
                                <i className="fa-brands fa-github"></i>
                                <span>{personal.github}</span>
                            </div>
                        )}
                        {personal.website && (
                            <div className="ex-contact-item">
                                <i className="fa-solid fa-globe"></i>
                                <span>{personal.website}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="ex-body">

                {/* ── SUMMARY ── */}
                {summary && (
                    <section className="ex-section">
                        <h2 className="ex-section-title">Executive Profile</h2>
                        <p className="ex-summary">{summary}</p>
                    </section>
                )}

                {/* ── EXPERIENCE ── */}
                {hasContent(experience) && (
                    <section className="ex-section">
                        <h2 className="ex-section-title">Professional Experience</h2>
                        {experience.map((exp, i) => (
                            <div key={i} className="ex-entry">
                                <div className="ex-entry-marker"></div>
                                <div className="ex-entry-content">
                                    <div className="ex-entry-header">
                                        <div>
                                            <h3 className="ex-entry-role">{exp.role || exp.title}</h3>
                                            <p className="ex-entry-company">{exp.company}</p>
                                        </div>
                                        <div className="ex-entry-meta">
                                            {(exp.startDate || exp.endDate) && (
                                                <span className="ex-date">
                                                    {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                                                </span>
                                            )}
                                            {exp.location && (
                                                <span className="ex-location">{exp.location}</span>
                                            )}
                                        </div>
                                    </div>
                                    {exp.description && (
                                        <p className="ex-entry-desc">{exp.description}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                <div className="ex-two-col">

                    <div className="ex-col-left">

                        {/* ── EDUCATION ── */}
                        {hasContent(education) && (
                            <section className="ex-section">
                                <h2 className="ex-section-title">Education</h2>
                                {education.map((edu, i) => (
                                    <div key={i} className="ex-simple-entry">
                                        <strong className="ex-simple-title">
                                            {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                                        </strong>
                                        <span className="ex-simple-sub">{edu.institution}</span>
                                        {(edu.startYear || edu.endYear) && (
                                            <span className="ex-simple-date">
                                                {edu.startYear}{edu.startYear && edu.endYear ? ' – ' : ''}{edu.endYear}
                                            </span>
                                        )}
                                        {edu.gpa && <span className="ex-simple-date">GPA: {edu.gpa}</span>}
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* ── CERTIFICATIONS ── */}
                        {hasContent(certifications) && (
                            <section className="ex-section">
                                <h2 className="ex-section-title">Certifications</h2>
                                {certifications.map((cert, i) => (
                                    <div key={i} className="ex-simple-entry">
                                        <strong className="ex-simple-title">{cert.name}</strong>
                                        <span className="ex-simple-sub">
                                            {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}
                                        </span>
                                    </div>
                                ))}
                            </section>
                        )}

                    </div>

                    <div className="ex-col-right">

                        {/* ── SKILLS ── */}
                        {hasContent(skills) && (
                            <section className="ex-section">
                                <h2 className="ex-section-title">Core Competencies</h2>
                                <div className="ex-skills-grid">
                                    {skills.map((skill, i) => (
                                        <div key={i} className="ex-skill-chip">
                                            {typeof skill === 'string' ? skill : skill.name}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* ── LANGUAGES ── */}
                        {hasContent(languages) && (
                            <section className="ex-section">
                                <h2 className="ex-section-title">Languages</h2>
                                {languages.map((lang, i) => (
                                    <div key={i} className="ex-lang-row">
                                        <span className="ex-lang-name">
                                            {typeof lang === 'string' ? lang : lang.name}
                                        </span>
                                        {lang.proficiency && (
                                            <span className="ex-lang-level">{lang.proficiency}</span>
                                        )}
                                    </div>
                                ))}
                            </section>
                        )}

                    </div>

                </div>

                {/* ── PROJECTS ── */}
                {hasContent(projects) && (
                    <section className="ex-section">
                        <h2 className="ex-section-title">Key Projects</h2>
                        {projects.map((proj, i) => (
                            <div key={i} className="ex-simple-entry">
                                <div className="ex-entry-header">
                                    <strong className="ex-simple-title">{proj.name}</strong>
                                    {proj.link && <span className="ex-proj-link">{proj.link}</span>}
                                </div>
                                {proj.description && (
                                    <p className="ex-entry-desc">{proj.description}</p>
                                )}
                                {Array.isArray(proj.technologies) && proj.technologies.length > 0 && (
                                    <div className="ex-tech-tags">
                                        {proj.technologies.map((t, j) => (
                                            <span key={j} className="ex-tech-tag">{t}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </section>
                )}

            </div>
        </div>
    );
};

export default Executive;
