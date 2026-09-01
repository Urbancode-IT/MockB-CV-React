import React from 'react';
import './CenteredMinimal.css';
import ExtraSections from './ExtraSections';
import {
    hasContent,
    visibleList,
    isEntryVisible,
    formatRange,
    toBullets,
    sectionTitle,
    sectionListProps,
} from './templateUtils';

const skillName = (skill) => (typeof skill === 'string' ? skill : skill.name);

const CenteredMinimal = ({ resumeData = {} }) => {
    const hidden = resumeData.hiddenEntries || {};
    const personal = resumeData.personal || {};
    const summary = isEntryVisible(resumeData, 'summary') ? (resumeData.summary || '') : '';
    const experience = visibleList(resumeData.experience, hidden.experience);
    const education = visibleList(resumeData.education, hidden.education);
    const skills = visibleList(resumeData.skills, hidden.skills);
    const certifications = visibleList(resumeData.certifications, hidden.certifications);
    const awards = visibleList(resumeData.awards, hidden.awards);
    const t = (id, fallback) => sectionTitle(resumeData, id, fallback);
    const order = resumeData.sectionOrder || [];
    const styleFor = (id) => {
        const index = order.indexOf(id);
        return { order: index >= 0 ? index : 40 };
    };

    const contacts = [personal.location, personal.email, personal.website || personal.linkedin].filter(Boolean);

    return (
        <div className="cm-resume" data-resume-capture="">
            <div className="cm-header rx-header">
                <h1 className="cm-name rx-name">{personal.name || 'Your Name'}</h1>
                {personal.jobTitle && <p className="cm-role rx-role">{personal.jobTitle}</p>}
            </div>

            {contacts.length > 0 && (
                <div className="cm-contact-bar rx-contact">
                    {contacts.map((item) => (
                        <span key={item} className="cm-contact-item rx-contact-item">{item}</span>
                    ))}
                </div>
            )}

            <div className="cm-body">
                {summary && (
                    <section className="cm-section rx-section" data-section="summary" style={styleFor('summary')}>
                        <h2 className="cm-title rx-title">{t('summary', 'Summary')}</h2>
                        <p className="cm-copy rx-copy">{summary}</p>
                    </section>
                )}

                {hasContent(skills) && (
                    <section className="cm-section rx-section" data-section="skills" style={styleFor('skills')}>
                        <h2 className="cm-title rx-title">{t('skills', 'Area of Expertise')}</h2>
                        <p className="cm-expertise rx-copy">{skills.map(skillName).filter(Boolean).join('  ·  ')}</p>
                    </section>
                )}

                {hasContent(awards) && (
                    <section className="cm-section rx-section" data-section="awards" style={styleFor('awards')}>
                        <h2 className="cm-title rx-title">{t('awards', 'Key Achievements')}</h2>
                        {awards.map((item, i) => (
                            <p key={i} className="cm-copy rx-copy">
                                <strong>{item.name}{item.name ? ' : ' : ''}</strong>
                                {item.description || [item.issuer, item.date].filter(Boolean).join(' · ')}
                            </p>
                        ))}
                    </section>
                )}

                {hasContent(experience) && (
                    <section className="cm-section rx-section" data-section="experience" style={styleFor('experience')} {...sectionListProps(resumeData, 'experience')}>
                        <h2 className="cm-title rx-title">{t('experience', 'Professional Experience')}</h2>
                        {experience.map((exp, i) => (
                            <article key={i} className="cm-entry rx-entry" data-keep={`experience-${i}`}>
                                <div className="cm-row">
                                    <strong>{exp.role || exp.title}</strong>
                                    <span className="cm-date rx-date">{formatRange(exp.startDate, exp.endDate)}</span>
                                </div>
                                {exp.company && <p className="cm-org rx-subtitle">{exp.company}</p>}
                                {exp.description && (
                                    <ul className="cm-bullets rx-bullets">
                                        {toBullets(exp.description).map((line, j) => (
                                            <li key={j}>{line.replace(/^•\s*/, '')}</li>
                                        ))}
                                    </ul>
                                )}
                            </article>
                        ))}
                    </section>
                )}

                {hasContent(education) && (
                    <section className="cm-section rx-section" data-section="education" style={styleFor('education')}>
                        <h2 className="cm-title rx-title">{t('education', 'Education')}</h2>
                        {education.map((edu, i) => (
                            <article key={i} className="cm-entry rx-entry" data-keep={`education-${i}`}>
                                <div className="cm-row">
                                    <strong>
                                        {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                                    </strong>
                                    <span className="cm-date rx-date">{formatRange(edu.startYear, edu.endYear)}</span>
                                </div>
                                {edu.institution && <p className="cm-org rx-subtitle">{edu.institution}</p>}
                                {(edu.gpa || edu.location) && (
                                    <p className="cm-copy rx-copy">
                                        {[edu.location, edu.gpa].filter(Boolean).join('  ·  ')}
                                    </p>
                                )}
                            </article>
                        ))}
                    </section>
                )}

                {hasContent(certifications) && (
                    <section className="cm-section rx-section" data-section="certifications" style={styleFor('certifications')}>
                        <h2 className="cm-title rx-title">{t('certifications', 'Certifications')}</h2>
                        <ul className="cm-cert-list rx-bullets">
                            {certifications.map((cert, i) => (
                                <li key={i}>
                                    {cert.name}{cert.issuer ? ` — ${cert.issuer}` : ''}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                <ExtraSections
                    resumeData={resumeData}
                    compact
                    exclude={['awards']}
                />
            </div>
        </div>
    );
};

export default CenteredMinimal;
