import React from 'react';
import './ClassicProfessional.css';

// ======================================
// Classic Professional Template
//
// Single-column, clean, ATS-friendly.
// Accent color: Navy Blue (#1A3A5C)
// ======================================

const ClassicProfessional = ({ resumeData = {} }) => {
    const {
        themeColor,
        personal = {},
        summary = '',
        experience = [],
        education = [],
        skills = [],
        projects = [],
        certifications = [],
        languages = [],
    } = resumeData;

    const hasContent = (arr) => Array.isArray(arr) && arr.length > 0;
    const sectionOrder = resumeData.sectionOrder || ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages'];
    const orderStyle = (section) => ({ order: Math.max(0, sectionOrder.indexOf(section)), marginBottom: 'var(--resume-section-spacing, 18px)' });

    return (
        <div className="cp-resume" style={{ '--accent-color': themeColor || '#1A3A5C' }}>

            {/* ── HEADER ── */}
            <div className="cp-header">
                <h1 className="cp-name">
                    {personal.name || 'Your Name'}
                </h1>
                {personal.jobTitle && (
                    <p className="cp-job-title">{personal.jobTitle}</p>
                )}
                <div className="cp-contact-row">
                    {personal.email && (
                        <span className="cp-contact-item">
                            <i className="fa-solid fa-envelope"></i>
                            {personal.email}
                        </span>
                    )}
                    {personal.phone && (
                        <span className="cp-contact-item">
                            <i className="fa-solid fa-phone"></i>
                            {personal.phone}
                        </span>
                    )}
                    {personal.location && (
                        <span className="cp-contact-item">
                            <i className="fa-solid fa-location-dot"></i>
                            {personal.location}
                        </span>
                    )}
                    {personal.linkedin && (
                        <span className="cp-contact-item">
                            <i className="fa-brands fa-linkedin"></i>
                            {personal.linkedin}
                        </span>
                    )}
                    {personal.github && (
                        <span className="cp-contact-item">
                            <i className="fa-brands fa-github"></i>
                            {personal.github}
                        </span>
                    )}
                    {personal.website && (
                        <span className="cp-contact-item">
                            <i className="fa-solid fa-globe"></i>
                            {personal.website}
                        </span>
                    )}
                </div>
            </div>

            <div className="cp-body" style={{ display: 'flex', flexDirection: 'column' }}>

                {/* ── SUMMARY ── */}
                {summary && (
                    <section className="cp-section" style={orderStyle('summary')}>
                        <h2 className="cp-section-title">Professional Summary</h2>
                        <div className="cp-section-line"></div>
                        <p className="cp-summary">{summary}</p>
                    </section>
                )}

                {/* ── EXPERIENCE ── */}
                {hasContent(experience) && (
                    <section className="cp-section" style={orderStyle('experience')}>
                        <h2 className="cp-section-title">Work Experience</h2>
                        <div className="cp-section-line"></div>
                        {experience.map((exp, i) => (
                            <div key={i} className="cp-entry">
                                <div className="cp-entry-header">
                                    <div>
                                        <h3 className="cp-entry-title">{exp.role || exp.title}</h3>
                                        <p className="cp-entry-subtitle">{exp.company}</p>
                                    </div>
                                    <div className="cp-entry-meta">
                                        {exp.location && (
                                            <span className="cp-meta-location">{exp.location}</span>
                                        )}
                                        {(exp.startDate || exp.endDate) && (
                                            <span className="cp-meta-date">
                                                {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {exp.description && (
                                    <p className="cp-entry-desc">{exp.description}</p>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* ── EDUCATION ── */}
                {hasContent(education) && (
                    <section className="cp-section" style={orderStyle('education')}>
                        <h2 className="cp-section-title">Education</h2>
                        <div className="cp-section-line"></div>
                        {education.map((edu, i) => (
                            <div key={i} className="cp-entry">
                                <div className="cp-entry-header">
                                    <div>
                                        <h3 className="cp-entry-title">
                                            {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                                        </h3>
                                        <p className="cp-entry-subtitle">{edu.institution}</p>
                                    </div>
                                    <div className="cp-entry-meta">
                                        {(edu.startYear || edu.endYear) && (
                                            <span className="cp-meta-date">
                                                {edu.startYear}{edu.startYear && edu.endYear ? ' – ' : ''}{edu.endYear}
                                            </span>
                                        )}
                                        {edu.gpa && (
                                            <span className="cp-meta-gpa">GPA: {edu.gpa}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* ── SKILLS ── */}
                {hasContent(skills) && (
                    <section className="cp-section" style={orderStyle('skills')}>
                        <h2 className="cp-section-title">Skills</h2>
                        <div className="cp-section-line"></div>
                        <div className="cp-skills-grid">
                            {skills.map((skill, i) => (
                                <div key={i} className="cp-skill-item">
                                    <span className="cp-skill-name">
                                        {typeof skill === 'string' ? skill : skill.name}
                                    </span>
                                    {skill.level && (
                                        <span className="cp-skill-level">{skill.level}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── PROJECTS ── */}
                {hasContent(projects) && (
                    <section className="cp-section" style={orderStyle('projects')}>
                        <h2 className="cp-section-title">Projects</h2>
                        <div className="cp-section-line"></div>
                        {projects.map((proj, i) => (
                            <div key={i} className="cp-entry">
                                <div className="cp-entry-header">
                                    <h3 className="cp-entry-title">{proj.name}</h3>
                                    {proj.link && (
                                        <span className="cp-proj-link">{proj.link}</span>
                                    )}
                                </div>
                                {proj.description && (
                                    <p className="cp-entry-desc">{proj.description}</p>
                                )}
                                {hasContent(proj.technologies) && (
                                    <div className="cp-tech-tags">
                                        {proj.technologies.map((tech, j) => (
                                            <span key={j} className="cp-tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* ── CERTIFICATIONS ── */}
                {hasContent(certifications) && (
                    <section className="cp-section" style={orderStyle('certifications')}>
                        <h2 className="cp-section-title">Certifications</h2>
                        <div className="cp-section-line"></div>
                        {certifications.map((cert, i) => (
                            <div key={i} className="cp-cert-row">
                                <span className="cp-cert-name">{cert.name}</span>
                                <span className="cp-cert-meta">
                                    {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}
                                </span>
                            </div>
                        ))}
                    </section>
                )}

                {/* ── LANGUAGES ── */}
                {hasContent(languages) && (
                    <section className="cp-section" style={orderStyle('languages')}>
                        <h2 className="cp-section-title">Languages</h2>
                        <div className="cp-section-line"></div>
                        <div className="cp-languages-row">
                            {languages.map((lang, i) => (
                                <div key={i} className="cp-lang-item">
                                    <span className="cp-lang-name">
                                        {typeof lang === 'string' ? lang : lang.name}
                                    </span>
                                    {lang.proficiency && (
                                        <span className="cp-lang-level">{lang.proficiency}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
};

export default ClassicProfessional;
