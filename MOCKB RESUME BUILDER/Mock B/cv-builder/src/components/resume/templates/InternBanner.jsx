import React from 'react';
import './InternBanner.css';
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

const InternBanner = ({ resumeData = {} }) => {
    const hidden = resumeData.hiddenEntries || {};
    const personal = resumeData.personal || {};
    const photo = resumeData.photo || personal.photo;
    const summary = isEntryVisible(resumeData, 'summary') ? (resumeData.summary || '') : '';
    const experience = visibleList(resumeData.experience, hidden.experience);
    const education = visibleList(resumeData.education, hidden.education);
    const skills = visibleList(resumeData.skills, hidden.skills);
    const certifications = visibleList(resumeData.certifications, hidden.certifications);
    const t = (id, fallback) => sectionTitle(resumeData, id, fallback);
    const order = resumeData.sectionOrder || [];
    const styleFor = (id) => {
        const index = order.indexOf(id);
        if (index < 0) return undefined;
        return { order: index };
    };

    return (
        <div className="ib-resume">
            <header className="ib-banner rx-header" data-section="personal">
                <div className="ib-banner-row">
                    <div className="ib-photo">
                        {photo ? <img src={photo} alt="" /> : <span>{getInitials(personal.name)}</span>}
                    </div>
                    <div className="ib-banner-text">
                        <div className="ib-identity">
                            <h1 className="ib-name rx-name">{personal.name || 'Your Name'}</h1>
                            {personal.jobTitle && <p className="ib-role rx-role">{personal.jobTitle}</p>}
                        </div>
                        <div className="ib-contact rx-contact">
                            {personal.phone && <span><i className="fa-solid fa-phone"></i>{personal.phone}</span>}
                            {personal.email && <span><i className="fa-solid fa-envelope"></i>{personal.email}</span>}
                            {(personal.website || personal.linkedin) && (
                                <span><i className="fa-solid fa-globe"></i>{personal.website || personal.linkedin}</span>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="ib-body">
                {summary && (
                    <section className="ib-section" data-section="summary" style={styleFor('summary')}>
                        <h2 className="ib-title rx-title">{t('summary', 'About')}</h2>
                        <p className="ib-copy">{summary}</p>
                    </section>
                )}

                {hasContent(education) && (
                    <section className="ib-section" data-section="education" style={styleFor('education')}>
                        <h2 className="ib-title rx-title">{t('education', 'Education')}</h2>
                        {education.map((edu, i) => (
                            <article key={i} className="ib-entry" data-keep={`education-${i}`}>
                                <strong>{[edu.degree, edu.field].filter(Boolean).join(' in ')}</strong>
                                <span>{[edu.institution, formatRange(edu.startYear, edu.endYear)].filter(Boolean).join(' · ')}</span>
                            </article>
                        ))}
                    </section>
                )}

                {hasContent(experience) && (
                    <section className="ib-section" data-section="experience" style={styleFor('experience')} {...sectionListProps(resumeData, 'experience')}>
                        <h2 className="ib-title rx-title">{t('experience', 'Experience')}</h2>
                        {experience.map((exp, i) => (
                            <article key={i} className="ib-entry" data-keep={`experience-${i}`}>
                                <strong>{exp.role} — {exp.company}</strong>
                                <span>{formatRange(exp.startDate, exp.endDate)}</span>
                                {exp.description && (
                                    <ul className="rx-bullets">
                                        {toBullets(exp.description).map((line, j) => (
                                            <li key={j}>{line.replace(/^[•\-]\s*/, '')}</li>
                                        ))}
                                    </ul>
                                )}
                            </article>
                        ))}
                    </section>
                )}

                {hasContent(skills) && (
                    <section className="ib-section" data-section="skills" style={styleFor('skills')}>
                        <h2 className="ib-title rx-title">{t('skills', 'Skills')}</h2>
                        <div className="ib-tags">
                            {skills.map((skill, i) => (
                                <span key={i}>{typeof skill === 'string' ? skill : skill.name}</span>
                            ))}
                        </div>
                    </section>
                )}

                {hasContent(certifications) && (
                    <section className="ib-section" data-section="certifications" style={styleFor('certifications')}>
                        <h2 className="ib-title rx-title">{t('certifications', 'Certifications')}</h2>
                        <div className="ib-certs">
                            {certifications.map((cert, i) => (
                                <span key={i}>
                                    {typeof cert === 'string' ? cert : [cert.name, cert.issuer, cert.date].filter(Boolean).join(' · ')}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                <ExtraSections resumeData={resumeData} compact preserveDomOrder exclude={['languages']} />
            </div>
        </div>
    );
};

export default InternBanner;
