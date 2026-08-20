import React from 'react';
import './StructuredSplit.css';
import ExtraSections from './ExtraSections';
import {
    hasContent,
    visibleList,
    isEntryVisible,
    formatRange,
    toBullets,
    sectionTitle,
} from './templateUtils';

const StructuredSplit = ({ resumeData = {} }) => {
    const hidden = resumeData.hiddenEntries || {};
    const personal = resumeData.personal || {};
    const summary = isEntryVisible(resumeData, 'summary') ? (resumeData.summary || '') : '';
    const experience = visibleList(resumeData.experience, hidden.experience);
    const education = visibleList(resumeData.education, hidden.education);
    const skills = visibleList(resumeData.skills, hidden.skills);
    const projects = visibleList(resumeData.projects, hidden.projects);
    const certifications = visibleList(resumeData.certifications, hidden.certifications);
    const languages = visibleList(resumeData.languages, hidden.languages);
    const t = (id, fallback) => sectionTitle(resumeData, id, fallback);

    const contacts = [
        personal.email,
        personal.phone,
        personal.location,
        personal.linkedin,
        personal.github,
        personal.website,
    ].filter(Boolean);

    return (
        <div className="ss-resume">
            <div className="ss-header">
                <div className="ss-identity">
                    <h1 className="ss-name rx-name">{personal.name || 'Your Name'}</h1>
                    {personal.jobTitle && <p className="ss-role rx-role">{personal.jobTitle}</p>}
                </div>
                {contacts.length > 0 && (
                    <ul className="ss-contact">
                        {contacts.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="ss-body">
                <div className="ss-col ss-col--main">
                    {summary && (
                        <section className="ss-section" data-section="summary">
                            <h2 className="ss-title rx-title">{t('summary', 'Professional Summary')}</h2>
                            <p className="ss-copy">{summary}</p>
                        </section>
                    )}

                    {hasContent(experience) && (
                        <section className="ss-section" data-section="experience">
                            <h2 className="ss-title rx-title">{t('experience', 'Work Experience')}</h2>
                            {experience.map((exp, i) => (
                                <article key={i} className="ss-block">
                                    <div className="ss-row">
                                        <strong>{exp.role || exp.title}</strong>
                                        <span className="ss-date">
                                            {formatRange(exp.startDate, exp.endDate)}
                                        </span>
                                    </div>
                                    <div className="ss-row ss-row--sub">
                                        <p className="ss-muted">{exp.company}</p>
                                        {exp.location && (
                                            <span className="ss-loc">{exp.location}</span>
                                        )}
                                    </div>
                                    <ul className="ss-bullets">
                                        {toBullets(exp.description).map((line, j) => (
                                            <li key={j}>{line.replace(/^•\s*/, '')}</li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </section>
                    )}

                    {hasContent(projects) && (
                        <section className="ss-section" data-section="projects">
                            <h2 className="ss-title rx-title">{t('projects', 'Projects')}</h2>
                            {projects.map((proj, i) => (
                                <article key={i} className="ss-block">
                                    <div className="ss-row">
                                        <strong>{proj.name}</strong>
                                        {proj.link && <span className="ss-loc">{proj.link}</span>}
                                    </div>
                                    {proj.description && (
                                        <ul className="ss-bullets">
                                            {toBullets(proj.description).map((line, j) => (
                                                <li key={j}>{line.replace(/^•\s*/, '')}</li>
                                            ))}
                                        </ul>
                                    )}
                                    {hasContent(proj.technologies) && (
                                        <p className="ss-tech">{proj.technologies.join('  ·  ')}</p>
                                    )}
                                </article>
                            ))}
                        </section>
                    )}

                    <ExtraSections
                        resumeData={resumeData}
                        compact
                        only={['organisations', 'publications', 'references']}
                    />
                </div>

                <div className="ss-col ss-col--side">
                    {hasContent(skills) && (
                        <section className="ss-section" data-section="skills">
                            <h2 className="ss-title rx-title">{t('skills', 'Skills')}</h2>
                            <ul className="ss-skill-list">
                                {skills.map((skill, i) => (
                                    <li key={i}>
                                        <span>{typeof skill === 'string' ? skill : skill.name}</span>
                                        {skill.level && <em>{skill.level}</em>}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {hasContent(education) && (
                        <section className="ss-section" data-section="education">
                            <h2 className="ss-title rx-title">{t('education', 'Education')}</h2>
                            {education.map((edu, i) => (
                                <div key={i} className="ss-block">
                                    <div className="ss-row">
                                        <strong>
                                            {edu.degree}{edu.field ? ` · ${edu.field}` : ''}
                                        </strong>
                                        <span className="ss-date">
                                            {formatRange(edu.startYear, edu.endYear)}
                                        </span>
                                    </div>
                                    <p className="ss-muted">{edu.institution}</p>
                                    {edu.gpa && <p className="ss-muted">GPA {edu.gpa}</p>}
                                </div>
                            ))}
                        </section>
                    )}

                    {hasContent(certifications) && (
                        <section className="ss-section" data-section="certifications">
                            <h2 className="ss-title rx-title">{t('certifications', 'Certifications')}</h2>
                            {certifications.map((cert, i) => (
                                <div key={i} className="ss-block">
                                    <strong>{cert.name}</strong>
                                    <p className="ss-muted">
                                        {[cert.issuer, cert.date].filter(Boolean).join(' · ')}
                                    </p>
                                </div>
                            ))}
                        </section>
                    )}

                    {hasContent(languages) && (
                        <section className="ss-section" data-section="languages">
                            <h2 className="ss-title rx-title">{t('languages', 'Languages')}</h2>
                            <ul className="ss-skill-list">
                                {languages.map((lang, i) => (
                                    <li key={i}>
                                        <span>{typeof lang === 'string' ? lang : lang.name}</span>
                                        {lang.proficiency && <em>{lang.proficiency}</em>}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    <ExtraSections
                        resumeData={resumeData}
                        compact
                        only={['custom', 'awards', 'interests']}
                    />
                </div>
            </div>
        </div>
    );
};

export default StructuredSplit;
