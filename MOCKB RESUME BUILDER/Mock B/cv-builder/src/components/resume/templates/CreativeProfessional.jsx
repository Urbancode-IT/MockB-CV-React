import React from 'react';
import './CreativeProfessional.css';

// ======================================
// Creative Professional Template
//
// Two-column · Purple sidebar · Vibrant
// Accent color: Purple (#7C3AED)
// For creative roles
// ======================================

const CreativeProfessional = ({ resumeData = {} }) => {
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
        <div className="crp-resume">
            <div className="crp-layout">

                {/* ── LEFT SIDEBAR ── */}
                <aside className="crp-sidebar">

                    {/* Avatar / Initials */}
                    <div className="crp-avatar">
                        {personal.name
                            ? personal.name.split(' ').map(w => w[0]).slice(0, 2).join('')
                            : 'YN'}
                    </div>

                    <div className="crp-sidebar-name">
                        {personal.name || 'Your Name'}
                    </div>
                    {personal.jobTitle && (
                        <div className="crp-sidebar-role">{personal.jobTitle}</div>
                    )}

                    <div className="crp-sidebar-divider"></div>

                    {/* Contact */}
                    <div className="crp-sb-section">
                        <h3 className="crp-sb-title">Contact</h3>
                        <div className="crp-sb-list">
                            {personal.email && (
                                <div className="crp-sb-item">
                                    <i className="fa-solid fa-envelope"></i>
                                    <span>{personal.email}</span>
                                </div>
                            )}
                            {personal.phone && (
                                <div className="crp-sb-item">
                                    <i className="fa-solid fa-phone"></i>
                                    <span>{personal.phone}</span>
                                </div>
                            )}
                            {personal.location && (
                                <div className="crp-sb-item">
                                    <i className="fa-solid fa-location-dot"></i>
                                    <span>{personal.location}</span>
                                </div>
                            )}
                            {personal.linkedin && (
                                <div className="crp-sb-item">
                                    <i className="fa-brands fa-linkedin"></i>
                                    <span>{personal.linkedin}</span>
                                </div>
                            )}
                            {personal.github && (
                                <div className="crp-sb-item">
                                    <i className="fa-brands fa-github"></i>
                                    <span>{personal.github}</span>
                                </div>
                            )}
                            {personal.website && (
                                <div className="crp-sb-item">
                                    <i className="fa-solid fa-globe"></i>
                                    <span>{personal.website}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Skills */}
                    {hasContent(skills) && (
                        <div className="crp-sb-section">
                            <h3 className="crp-sb-title">Skills</h3>
                            <div className="crp-sb-chips">
                                {skills.map((skill, i) => (
                                    <span key={i} className="crp-chip">
                                        {typeof skill === 'string' ? skill : skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Languages */}
                    {hasContent(languages) && (
                        <div className="crp-sb-section">
                            <h3 className="crp-sb-title">Languages</h3>
                            {languages.map((lang, i) => (
                                <div key={i} className="crp-sb-lang">
                                    <span className="crp-lang-name">
                                        {typeof lang === 'string' ? lang : lang.name}
                                    </span>
                                    {lang.proficiency && (
                                        <span className="crp-lang-dot">{lang.proficiency}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Certifications */}
                    {hasContent(certifications) && (
                        <div className="crp-sb-section">
                            <h3 className="crp-sb-title">Certifications</h3>
                            {certifications.map((cert, i) => (
                                <div key={i} className="crp-sb-cert">
                                    <span className="crp-cert-name">{cert.name}</span>
                                    {cert.issuer && (
                                        <span className="crp-cert-issuer">
                                            {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                </aside>

                {/* ── MAIN CONTENT ── */}
                <main className="crp-main">

                    {/* Summary */}
                    {summary && (
                        <section className="crp-section">
                            <h2 className="crp-section-title">About Me</h2>
                            <p className="crp-summary">{summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {hasContent(experience) && (
                        <section className="crp-section">
                            <h2 className="crp-section-title">Experience</h2>
                            {experience.map((exp, i) => (
                                <div key={i} className="crp-entry">
                                    <div className="crp-entry-dot"></div>
                                    <div className="crp-entry-body">
                                        <div className="crp-entry-header">
                                            <div>
                                                <h3 className="crp-entry-role">{exp.role || exp.title}</h3>
                                                <p className="crp-entry-company">{exp.company}</p>
                                            </div>
                                            <div className="crp-entry-right">
                                                {(exp.startDate || exp.endDate) && (
                                                    <span className="crp-date">
                                                        {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                                                    </span>
                                                )}
                                                {exp.location && (
                                                    <span className="crp-loc">{exp.location}</span>
                                                )}
                                            </div>
                                        </div>
                                        {exp.description && (
                                            <p className="crp-entry-desc">{exp.description}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Education */}
                    {hasContent(education) && (
                        <section className="crp-section">
                            <h2 className="crp-section-title">Education</h2>
                            {education.map((edu, i) => (
                                <div key={i} className="crp-entry">
                                    <div className="crp-entry-dot"></div>
                                    <div className="crp-entry-body">
                                        <div className="crp-entry-header">
                                            <div>
                                                <h3 className="crp-entry-role">
                                                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                                                </h3>
                                                <p className="crp-entry-company">{edu.institution}</p>
                                            </div>
                                            <div className="crp-entry-right">
                                                {(edu.startYear || edu.endYear) && (
                                                    <span className="crp-date">
                                                        {edu.startYear}{edu.startYear && edu.endYear ? ' – ' : ''}{edu.endYear}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        {edu.gpa && <p className="crp-entry-desc">GPA: {edu.gpa}</p>}
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Projects */}
                    {hasContent(projects) && (
                        <section className="crp-section">
                            <h2 className="crp-section-title">Projects</h2>
                            {projects.map((proj, i) => (
                                <div key={i} className="crp-project-card">
                                    <div className="crp-project-header">
                                        <h3 className="crp-project-name">{proj.name}</h3>
                                        {proj.link && (
                                            <span className="crp-project-link">{proj.link}</span>
                                        )}
                                    </div>
                                    {proj.description && (
                                        <p className="crp-entry-desc">{proj.description}</p>
                                    )}
                                    {Array.isArray(proj.technologies) && proj.technologies.length > 0 && (
                                        <div className="crp-tech-row">
                                            {proj.technologies.map((t, j) => (
                                                <span key={j} className="crp-tech">{t}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}

                </main>

            </div>
        </div>
    );
};

export default CreativeProfessional;
