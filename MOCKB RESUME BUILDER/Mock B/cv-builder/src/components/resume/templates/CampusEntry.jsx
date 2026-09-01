import React from 'react';
import './CampusEntry.css';
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

const CampusEntry = ({ resumeData = {} }) => {
    const hidden = resumeData.hiddenEntries || {};
    const personal = resumeData.personal || {};
    const summary = isEntryVisible(resumeData, 'summary') ? (resumeData.summary || '') : '';
    const experience = visibleList(resumeData.experience, hidden.experience);
    const education = visibleList(resumeData.education, hidden.education);
    const skills = visibleList(resumeData.skills, hidden.skills);
    const t = (id, fallback) => sectionTitle(resumeData, id, fallback);
    const order = resumeData.sectionOrder || [];
    const styleFor = (id) => {
        const index = order.indexOf(id);
        return { order: index >= 0 ? index : 40 };
    };
    const contacts = [personal.email, personal.phone, personal.location, personal.linkedin || personal.website].filter(Boolean);

    return (
        <div className="ce-resume">
            <header className="ce-header rx-header" data-section="personal">
                <p className="ce-kicker">Campus portfolio</p>
                <h1 className="ce-name rx-name">{personal.name || 'Your Name'}</h1>
                {personal.jobTitle && <p className="ce-role rx-role">{personal.jobTitle}</p>}
                {contacts.length > 0 && (
                    <div className="ce-contact rx-contact">
                        {contacts.map((item) => (
                            <span key={item}>{item}</span>
                        ))}
                    </div>
                )}
            </header>

            <div className="ce-body">
                {summary && (
                    <section className="ce-section" data-section="summary" style={styleFor('summary')}>
                        <h2 className="ce-title rx-title">{t('summary', 'Profile')}</h2>
                        <p className="ce-copy">{summary}</p>
                    </section>
                )}

                {hasContent(education) && (
                    <section className="ce-section" data-section="education" style={styleFor('education')}>
                        <h2 className="ce-title rx-title">{t('education', 'Education')}</h2>
                        {education.map((edu, i) => (
                            <article key={i} className="ce-row" data-keep={`education-${i}`}>
                                <div>
                                    <h3>{[edu.degree, edu.field].filter(Boolean).join(' · ')}</h3>
                                    <p>{edu.institution}</p>
                                </div>
                                <span>{formatRange(edu.startYear, edu.endYear)}</span>
                            </article>
                        ))}
                    </section>
                )}

                {hasContent(experience) && (
                    <section className="ce-section" data-section="experience" style={styleFor('experience')} {...sectionListProps(resumeData, 'experience')}>
                        <h2 className="ce-title rx-title">{t('experience', 'Internships')}</h2>
                        {experience.map((exp, i) => (
                            <article key={i} className="ce-block" data-keep={`experience-${i}`}>
                                <div className="ce-row">
                                    <h3>{exp.role} · {exp.company}</h3>
                                    <span>{formatRange(exp.startDate, exp.endDate)}</span>
                                </div>
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
                    <section className="ce-section" data-section="skills" style={styleFor('skills')}>
                        <h2 className="ce-title rx-title">{t('skills', 'Skills')}</h2>
                        <p className="ce-skills">
                            {skills.map((skill) => (typeof skill === 'string' ? skill : skill.name)).filter(Boolean).join('  ·  ')}
                        </p>
                    </section>
                )}

                <ExtraSections resumeData={resumeData} compact exclude={['languages']} />
            </div>
        </div>
    );
};

export default CampusEntry;
