import React from 'react';
import './ModernProfessional.css';

// ======================================
// Modern Professional Template
//
// Two-column layout — sidebar (left) + main (right)
// Accent color: Electric Blue (#2563EB)
// ======================================

const ModernProfessional = ({ resumeData = {} }) => {
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
        <div className="mp-resume" style={{ '--accent-color': themeColor || '#4A90D9' }}>

            {/* ── TOP HEADER BAR ── */}
            <div className="mp-header">
                <div className="mp-header-name-block">
                    <h1 className="mp-name">{personal.name || 'Your Name'}</h1>
                    {personal.jobTitle && (
                        <p className="mp-job-title">{personal.jobTitle}</p>
                    )}
                </div>
            </div>

            <div className="mp-layout">

                {/* ── SIDEBAR ── */}
                <aside className="mp-sidebar">

                    {/* Contact */}
                    <div className="mp-sidebar-section">
                        <h3 className="mp-sidebar-title">Contact</h3>
                        <div className="mp-contact-list">
                            {personal.email && (
                                <div className="mp-contact-item">
                                    <i className="fa-solid fa-envelope"></i>
                                    <span>{personal.email}</span>
                                </div>
                            )}
                            {personal.phone && (
                                <div className="mp-contact-item">
                                    <i className="fa-solid fa-phone"></i>
                                    <span>{personal.phone}</span>
                                </div>
                            )}
                            {personal.location && (
                                <div className="mp-contact-item">
                                    <i className="fa-solid fa-location-dot"></i>
                                    <span>{personal.location}</span>
                                </div>
                            )}
                            {personal.linkedin && (
                                <div className="mp-contact-item">
                                    <i className="fa-brands fa-linkedin"></i>
                                    <span>{personal.linkedin}</span>
                                </div>
                            )}
                            {personal.github && (
                                <div className="mp-contact-item">
                                    <i className="fa-brands fa-github"></i>
                                    <span>{personal.github}</span>
                                </div>
                            )}
                            {personal.website && (
                                <div className="mp-contact-item">
                                    <i className="fa-solid fa-globe"></i>
                                    <span>{personal.website}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Skills */}
                    {hasContent(skills) && (
                        <div className="mp-sidebar-section">
                            <h3 className="mp-sidebar-title">Skills</h3>
                            <div className="mp-skills-list">
                                {skills.map((skill, i) => (
                                    <div key={i} className="mp-skill-item">
                                        <span className="mp-skill-name">
                                            {typeof skill === 'string' ? skill : skill.name}
                                        </span>
                                        {skill.level && (
                                            <div className="mp-skill-bar-wrap">
                                                <div
                                                    className="mp-skill-bar"
                                                    style={{
                                                        width: skill.level === 'Expert' ? '100%'
                                                            : skill.level === 'Proficient' ? '80%'
                                                            : skill.level === 'Competent' ? '60%'
                                                            : skill.level === 'Amateur' ? '40%'
                                                            : '25%'
                                                    }}
                                                ></div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Languages */}
                    {hasContent(languages) && (
                        <div className="mp-sidebar-section">
                            <h3 className="mp-sidebar-title">Languages</h3>
                            {languages.map((lang, i) => (
                                <div key={i} className="mp-lang-item">
                                    <span className="mp-lang-name">
                                        {typeof lang === 'string' ? lang : lang.name}
                                    </span>
                                    {lang.proficiency && (
                                        <span className="mp-lang-level">{lang.proficiency}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Certifications */}
                    {hasContent(certifications) && (
                        <div className="mp-sidebar-section">
                            <h3 className="mp-sidebar-title">Certifications</h3>
                            {certifications.map((cert, i) => (
                                <div key={i} className="mp-cert-item">
                                    <span className="mp-cert-name">{cert.name}</span>
                                    {cert.issuer && (
                                        <span className="mp-cert-issuer">{cert.issuer}{cert.date ? ` · ${cert.date}` : ''}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                </aside>

                {/* ── MAIN CONTENT ── */}
                <main className="mp-main">

                    {/* Summary */}
                    {summary && (
                        <section className="mp-section">
                            <h2 className="mp-section-title">
                                <i className="fa-solid fa-user"></i>
                                About Me
                            </h2>
                            <p className="mp-summary">{summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {hasContent(experience) && (
                        <section className="mp-section">
                            <h2 className="mp-section-title">
                                <i className="fa-solid fa-briefcase"></i>
                                Work Experience
                            </h2>
                            {experience.map((exp, i) => (
                                <div key={i} className="mp-entry">
                                    <div className="mp-entry-header">
                                        <div>
                                            <h3 className="mp-entry-role">{exp.role || exp.title}</h3>
                                            <p className="mp-entry-company">{exp.company}</p>
                                        </div>
                                        <div className="mp-entry-meta">
                                            {(exp.startDate || exp.endDate) && (
                                                <span className="mp-date-badge">
                                                    {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                                                </span>
                                            )}
                                            {exp.location && (
                                                <span className="mp-location-text">{exp.location}</span>
                                            )}
                                        </div>
                                    </div>
                                    {exp.description && (
                                        <p className="mp-entry-desc">{exp.description}</p>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Education */}
                    {hasContent(education) && (
                        <section className="mp-section">
                            <h2 className="mp-section-title">
                                <i className="fa-solid fa-graduation-cap"></i>
                                Education
                            </h2>
                            {education.map((edu, i) => (
                                <div key={i} className="mp-entry">
                                    <div className="mp-entry-header">
                                        <div>
                                            <h3 className="mp-entry-role">
                                                {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                                            </h3>
                                            <p className="mp-entry-company">{edu.institution}</p>
                                        </div>
                                        <div className="mp-entry-meta">
                                            {(edu.startYear || edu.endYear) && (
                                                <span className="mp-date-badge">
                                                    {edu.startYear}{edu.startYear && edu.endYear ? ' – ' : ''}{edu.endYear}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {edu.gpa && (
                                        <p className="mp-entry-desc">GPA: {edu.gpa}</p>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Projects */}
                    {hasContent(projects) && (
                        <section className="mp-section">
                            <h2 className="mp-section-title">
                                <i className="fa-solid fa-code"></i>
                                Projects
                            </h2>
                            {projects.map((proj, i) => (
                                <div key={i} className="mp-entry">
                                    <div className="mp-entry-header">
                                        <h3 className="mp-entry-role">{proj.name}</h3>
                                        {proj.link && (
                                            <span className="mp-proj-link">{proj.link}</span>
                                        )}
                                    </div>
                                    {proj.description && (
                                        <p className="mp-entry-desc">{proj.description}</p>
                                    )}
                                    {Array.isArray(proj.technologies) && proj.technologies.length > 0 && (
                                        <div className="mp-tech-tags">
                                            {proj.technologies.map((tech, j) => (
                                                <span key={j} className="mp-tech-tag">{tech}</span>
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

export default ModernProfessional;
