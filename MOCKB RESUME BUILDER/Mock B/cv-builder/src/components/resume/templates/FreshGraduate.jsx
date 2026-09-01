import React from 'react';
import './FreshGraduate.css';
import ExtraSections from './ExtraSections';
import {
    hasContent,
    visibleList,
    isEntryVisible,
    formatRange,
    toBullets,
    sectionTitle,
    sectionListProps,
    getInitials,
} from './templateUtils';

const FreshGraduate = ({ resumeData = {} }) => {
    const hidden = resumeData.hiddenEntries || {};
    const personal = resumeData.personal || {};
    const photo = resumeData.photo || personal.photo;
    const summary = isEntryVisible(resumeData, 'summary') ? (resumeData.summary || '') : '';
    const experience = visibleList(resumeData.experience, hidden.experience);
    const education = visibleList(resumeData.education, hidden.education);
    const skills = visibleList(resumeData.skills, hidden.skills);
    const references = visibleList(resumeData.references, hidden.references);
    const t = (id, fallback) => sectionTitle(resumeData, id, fallback);
    const order = resumeData.sectionOrder || [];
    const styleFor = (id) => {
        const index = order.indexOf(id);
        if (index < 0) return undefined;
        return { order: index };
    };
    const initials = getInitials(personal.name);

    return (
        <div className="fg-resume">
            <header className="fg-header rx-header" data-section="personal">
                <div className="fg-head-row">
                    <div className="fg-photo">
                        {photo ? (
                            <img src={photo} alt={personal.name || 'Profile'} />
                        ) : (
                            <span>{initials}</span>
                        )}
                    </div>
                    <div className="fg-identity">
                        <h1 className="fg-name rx-name">{personal.name || 'Your Name'}</h1>
                        {personal.jobTitle && <p className="fg-role rx-role">{personal.jobTitle}</p>}
                    </div>
                </div>
                <div className="fg-contact rx-contact">
                    {personal.phone && (
                        <span>
                            <i className="fa-solid fa-phone"></i>
                            {personal.phone}
                        </span>
                    )}
                    {personal.email && (
                        <span>
                            <i className="fa-solid fa-envelope"></i>
                            {personal.email}
                        </span>
                    )}
                    {(personal.website || personal.linkedin) && (
                        <span>
                            <i className="fa-solid fa-globe"></i>
                            {personal.website || personal.linkedin}
                        </span>
                    )}
                </div>
            </header>

            <div className="fg-body">
                {summary && (
                    <section className="fg-section" data-section="summary" style={styleFor('summary')}>
                        <h2 className="fg-title rx-title">{t('summary', 'About Me')}</h2>
                        <p className="fg-copy">{summary}</p>
                    </section>
                )}

                {hasContent(education) && (
                    <section className="fg-section" data-section="education" style={styleFor('education')}>
                        <h2 className="fg-title rx-title">{t('education', 'Education')}</h2>
                        {education.map((edu, i) => (
                            <article key={i} className="fg-split" data-keep={`education-${i}`}>
                                <div className="fg-split-meta">
                                    <strong>{formatRange(edu.startYear, edu.endYear) || edu.startYear}</strong>
                                    <span>{edu.institution}</span>
                                </div>
                                <div className="fg-split-body">
                                    <h3>
                                        {[edu.degree, edu.field].filter(Boolean).join(' in ')}
                                    </h3>
                                    {edu.gpa && <p className="fg-muted">GPA {edu.gpa}</p>}
                                    {edu.description && <p>{edu.description}</p>}
                                </div>
                            </article>
                        ))}
                    </section>
                )}

                {hasContent(experience) && (
                    <section
                        className="fg-section"
                        data-section="experience"
                        style={styleFor('experience')}
                        {...sectionListProps(resumeData, 'experience')}
                    >
                        <h2 className="fg-title rx-title">{t('experience', 'Experience')}</h2>
                        {experience.map((exp, i) => (
                            <article key={i} className="fg-split" data-keep={`experience-${i}`}>
                                <div className="fg-split-meta">
                                    <strong>{formatRange(exp.startDate, exp.endDate)}</strong>
                                    <span>{exp.company}</span>
                                </div>
                                <div className="fg-split-body">
                                    <h3>{exp.role || exp.title}</h3>
                                    {exp.location && <p className="fg-muted">{exp.location}</p>}
                                    {toBullets(exp.description).length > 1 ? (
                                        <ul className="rx-bullets">
                                            {toBullets(exp.description).map((line, j) => (
                                                <li key={j}>{line.replace(/^[•\-]\s*/, '')}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        exp.description && <p>{exp.description}</p>
                                    )}
                                </div>
                            </article>
                        ))}
                    </section>
                )}

                {hasContent(skills) && (
                    <section className="fg-section" data-section="skills" style={styleFor('skills')}>
                        <h2 className="fg-title rx-title">{t('skills', 'Skills')}</h2>
                        <ul className="fg-skills">
                            {skills.map((skill, i) => (
                                <li key={i}>{typeof skill === 'string' ? skill : skill.name}</li>
                            ))}
                        </ul>
                    </section>
                )}

                <ExtraSections
                    resumeData={resumeData}
                    compact
                    preserveDomOrder
                    exclude={['references']}
                />

                {hasContent(references) && (
                    <section className="fg-section" data-section="references" style={styleFor('references')}>
                        <h2 className="fg-title rx-title">{t('references', 'References')}</h2>
                        <div className="fg-refs">
                            {references.map((item, i) => (
                                <article key={i} className="fg-ref" data-keep={`references-${i}`}>
                                    <h3>{item.name}</h3>
                                    <p>{[item.title, item.company].filter(Boolean).join(' · ')}</p>
                                    {item.phone && (
                                        <p>
                                            <strong>Phone</strong> {item.phone}
                                        </p>
                                    )}
                                    {(item.email || item.social) && (
                                        <p>
                                            <strong>Contact</strong> {item.email || item.social}
                                        </p>
                                    )}
                                </article>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default FreshGraduate;
