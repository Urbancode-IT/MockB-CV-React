import React from 'react';
import './MinimalATS.css';

// ======================================
// Minimal ATS Template
//
// Single-column · Pure text · ATS-optimized
// Accent color: Dark Gray (#374151)
// No graphics, no icons, no columns
// ======================================

const MinimalATS = ({ resumeData = {} }) => {
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

    const contactParts = [
        personal.email,
        personal.phone,
        personal.location,
        personal.linkedin,
        personal.github,
        personal.website,
    ].filter(Boolean);

    return (
        <div className="ma-resume" style={{ '--accent-color': themeColor || '#333333' }}>

            {/* ── HEADER ── */}
            <div className="ma-header">
                <h1 className="ma-name">{personal.name || 'Your Name'}</h1>
                {personal.jobTitle && (
                    <p className="ma-job-title">{personal.jobTitle}</p>
                )}
                {contactParts.length > 0 && (
                    <p className="ma-contact-line">
                        {contactParts.join('  ·  ')}
                    </p>
                )}
            </div>

            <div className="ma-body">

                {/* ── SUMMARY ── */}
                {summary && (
                    <section className="ma-section">
                        <h2 className="ma-section-title">SUMMARY</h2>
                        <p className="ma-summary">{summary}</p>
                    </section>
                )}

                {/* ── EXPERIENCE ── */}
                {hasContent(experience) && (
                    <section className="ma-section">
                        <h2 className="ma-section-title">WORK EXPERIENCE</h2>
                        {experience.map((exp, i) => (
                            <div key={i} className="ma-entry">
                                <div className="ma-entry-top-row">
                                    <strong className="ma-entry-role">{exp.role || exp.title}</strong>
                                    {(exp.startDate || exp.endDate) && (
                                        <span className="ma-date">
                                            {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                                        </span>
                                    )}
                                </div>
                                <div className="ma-entry-second-row">
                                    <span className="ma-company">{exp.company}</span>
                                    {exp.location && (
                                        <span className="ma-location">{exp.location}</span>
                                    )}
                                </div>
                                {exp.description && (
                                    <p className="ma-desc">{exp.description}</p>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* ── EDUCATION ── */}
                {hasContent(education) && (
                    <section className="ma-section">
                        <h2 className="ma-section-title">EDUCATION</h2>
                        {education.map((edu, i) => (
                            <div key={i} className="ma-entry">
                                <div className="ma-entry-top-row">
                                    <strong className="ma-entry-role">
                                        {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                                    </strong>
                                    {(edu.startYear || edu.endYear) && (
                                        <span className="ma-date">
                                            {edu.startYear}{edu.startYear && edu.endYear ? ' – ' : ''}{edu.endYear}
                                        </span>
                                    )}
                                </div>
                                <div className="ma-entry-second-row">
                                    <span className="ma-company">{edu.institution}</span>
                                    {edu.gpa && <span className="ma-location">GPA: {edu.gpa}</span>}
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* ── SKILLS ── */}
                {hasContent(skills) && (
                    <section className="ma-section">
                        <h2 className="ma-section-title">SKILLS</h2>
                        <p className="ma-skills-line">
                            {skills.map((s, i) => (
                                <span key={i}>
                                    {typeof s === 'string' ? s : s.name}
                                    {i < skills.length - 1 ? '  ·  ' : ''}
                                </span>
                            ))}
                        </p>
                    </section>
                )}

                {/* ── PROJECTS ── */}
                {hasContent(projects) && (
                    <section className="ma-section">
                        <h2 className="ma-section-title">PROJECTS</h2>
                        {projects.map((proj, i) => (
                            <div key={i} className="ma-entry">
                                <div className="ma-entry-top-row">
                                    <strong className="ma-entry-role">{proj.name}</strong>
                                    {proj.link && (
                                        <span className="ma-proj-link">{proj.link}</span>
                                    )}
                                </div>
                                {proj.description && (
                                    <p className="ma-desc">{proj.description}</p>
                                )}
                                {Array.isArray(proj.technologies) && proj.technologies.length > 0 && (
                                    <p className="ma-desc">
                                        <strong>Technologies:</strong> {proj.technologies.join(', ')}
                                    </p>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* ── CERTIFICATIONS ── */}
                {hasContent(certifications) && (
                    <section className="ma-section">
                        <h2 className="ma-section-title">CERTIFICATIONS</h2>
                        {certifications.map((cert, i) => (
                            <div key={i} className="ma-entry">
                                <div className="ma-entry-top-row">
                                    <strong className="ma-entry-role">{cert.name}</strong>
                                    {cert.date && <span className="ma-date">{cert.date}</span>}
                                </div>
                                {cert.issuer && <span className="ma-company">{cert.issuer}</span>}
                            </div>
                        ))}
                    </section>
                )}

                {/* ── LANGUAGES ── */}
                {hasContent(languages) && (
                    <section className="ma-section">
                        <h2 className="ma-section-title">LANGUAGES</h2>
                        <p className="ma-skills-line">
                            {languages.map((lang, i) => {
                                const name = typeof lang === 'string' ? lang : lang.name;
                                const prof = lang.proficiency ? ` (${lang.proficiency})` : '';
                                return (
                                    <span key={i}>
                                        {name}{prof}
                                        {i < languages.length - 1 ? '  ·  ' : ''}
                                    </span>
                                );
                            })}
                        </p>
                    </section>
                )}

            </div>
        </div>
    );
};

export default MinimalATS;
