import React from 'react';
import './PortraitProfile.css';
import ExtraSections from './ExtraSections';
import {
    PORTRAIT_DEFAULT_AWARDS,
    PORTRAIT_DEFAULT_INTERESTS,
    PORTRAIT_DEFAULT_ORGS,
    getPortraitLayout,
    withPortraitDefaults,
} from '../../../config/portraitDefaults';
import { columnsWithActiveSections } from '../../../config/columnLayout';
import {
    hasContent,
    getInitials,
    formatRange,
    toBullets,
    getVisibleResume,
} from './templateUtils';

const skillWidth = (level) => {
    const map = {
        expert: '94%',
        proficient: '80%',
        competent: '66%',
        amateur: '48%',
        beginner: '32%',
    };
    return map[String(level || '').toLowerCase()] || '72%';
};

const ContactLine = ({ icon, value }) => {
    if (!value) return null;
    return (
        <div className="pp-contact">
            <i className={icon}></i>
            <span>{value}</span>
        </div>
    );
};

const ContactBlock = ({ personal }) => (
    <div className="pp-side-block">
        <h2>Contact</h2>
        <ContactLine icon="fa-solid fa-envelope" value={personal.email} />
        <ContactLine icon="fa-solid fa-phone" value={personal.phone} />
        <ContactLine icon="fa-solid fa-location-dot" value={personal.location} />
        <ContactLine icon="fa-brands fa-linkedin" value={personal.linkedin} />
        <ContactLine icon="fa-brands fa-github" value={personal.github} />
        <ContactLine icon="fa-solid fa-globe" value={personal.website} />
    </div>
);

const Identity = ({ photo, initials, personal, compact }) => (
    <div className={`pp-identity${compact ? ' pp-identity--row' : ''}`}>
        <div className="pp-photo">
            {photo ? (
                <img src={photo} alt={personal.name || 'Profile'} />
            ) : (
                <span>{initials}</span>
            )}
        </div>
        <div>
            <h1 className="pp-name rx-name">{personal.name || 'Your Name'}</h1>
            {personal.jobTitle && <p className="pp-role rx-role">{personal.jobTitle}</p>}
        </div>
    </div>
);

const PortraitProfile = ({ resumeData = {} }) => {
    if (!resumeData.startBlank) resumeData = withPortraitDefaults(resumeData);
    const {
        personal,
        photo,
        summary,
        experience,
        education,
        skills,
        projects,
        certifications,
        languages,
        awards,
        organisations,
        interests,
        t,
    } = getVisibleResume(resumeData);

    const { layoutMode, leftWidth } = getPortraitLayout(resumeData.design);
    const { left: leftIds, right: rightIds } = columnsWithActiveSections(resumeData);

    const initials = getInitials(personal.name);
    const awardItems = hasContent(awards) ? awards : (resumeData.startBlank ? [] : PORTRAIT_DEFAULT_AWARDS);
    const interestItems = hasContent(interests) ? interests : (resumeData.startBlank ? [] : PORTRAIT_DEFAULT_INTERESTS);
    const orgItems = hasContent(organisations) ? organisations : (resumeData.startBlank ? [] : PORTRAIT_DEFAULT_ORGS);

    const renderSide = (id) => {
        if (id === 'skills' && hasContent(skills)) {
            return (
                <div key={id} className="pp-side-block" data-section="skills">
                    <h2>{t('skills', 'Skills')}</h2>
                    <ul className="pp-skill-list">
                        {skills.map((skill, i) => (
                            <li key={i}>
                                <div className="pp-skill-head">
                                    <span>{typeof skill === 'string' ? skill : skill.name}</span>
                                    {skill.level && <em>{skill.level}</em>}
                                </div>
                                <div className="pp-bar">
                                    <span style={{ width: skillWidth(skill.level) }}></span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        if (id === 'languages' && hasContent(languages)) {
            return (
                <div key={id} className="pp-side-block" data-section="languages">
                    <h2>{t('languages', 'Languages')}</h2>
                    <ul className="pp-lang-list">
                        {languages.map((lang, i) => (
                            <li key={i}>
                                <span>{typeof lang === 'string' ? lang : lang.name}</span>
                                {lang.proficiency && <em>{lang.proficiency}</em>}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        if (id === 'certifications' && hasContent(certifications)) {
            return (
                <div key={id} className="pp-side-block" data-section="certifications">
                    <h2>{t('certifications', 'Certificates')}</h2>
                    {certifications.map((cert, i) => (
                        <div key={i} className="pp-side-entry">
                            <strong>{cert.name}</strong>
                            <span>{[cert.issuer, cert.date].filter(Boolean).join(' · ')}</span>
                        </div>
                    ))}
                </div>
            );
        }
        if (id === 'interests' && hasContent(interestItems)) {
            return (
                <div key={id} className="pp-side-block" data-section="interests">
                    <h2>{t('interests', 'Interests')}</h2>
                    <div className="pp-interest-list">
                        {interestItems.map((item, i) => (
                            <span key={i}>{typeof item === 'string' ? item : item.name}</span>
                        ))}
                    </div>
                </div>
            );
        }
        if (id === 'summary' && summary) {
            return (
                <div key={id} className="pp-side-block" data-section="summary">
                    <h2>{t('summary', 'Profile')}</h2>
                    <p className="pp-summary">{summary}</p>
                </div>
            );
        }
        if (id === 'awards') {
            return (
                <div key={id} className="pp-side-block" data-section="awards">
                    <h2>{t('awards', 'Awards')}</h2>
                    {awardItems.map((award, i) => (
                        <div key={i} className="pp-side-entry">
                            <strong>{award.name}</strong>
                            <span>{[award.issuer, award.date].filter(Boolean).join(' · ')}</span>
                        </div>
                    ))}
                </div>
            );
        }
        if (['experience', 'education', 'projects'].includes(id)) {
            return renderMain(id, true);
        }
        return <ExtraSections key={id} resumeData={resumeData} only={[id]} compact />;
    };

    const renderMain = (id, compact = false) => {
        const wrap = compact ? 'pp-side-block' : 'pp-section';
        if (id === 'summary' && summary) {
            return (
                <section key={id} className={wrap} data-section="summary">
                    <h2>{t('summary', 'Profile')}</h2>
                    <p className="pp-summary">{summary}</p>
                </section>
            );
        }
        if (id === 'experience' && hasContent(experience)) {
            return (
                <section key={id} className={wrap} data-section="experience">
                    <h2>{t('experience', 'Experience')}</h2>
                    {experience.map((exp, i) => (
                        <article key={i} className="pp-entry">
                            <div className="pp-entry-top">
                                <div>
                                    <h3>{exp.role || exp.title}</h3>
                                    <p>{[exp.company, exp.location].filter(Boolean).join(' · ')}</p>
                                </div>
                                <span>{formatRange(exp.startDate, exp.endDate)}</span>
                            </div>
                            {toBullets(exp.description).map((line, j) => (
                                <p key={j} className="pp-bullet">{line.replace(/^[•\-]\s*/, '')}</p>
                            ))}
                        </article>
                    ))}
                </section>
            );
        }
        if (id === 'education' && hasContent(education)) {
            return (
                <section key={id} className={wrap} data-section="education">
                    <h2>{t('education', 'Education')}</h2>
                    {education.map((edu, i) => (
                        <article key={i} className="pp-entry">
                            <div className="pp-entry-top">
                                <div>
                                    <h3>{[edu.degree, edu.field].filter(Boolean).join(' in ')}</h3>
                                    <p>{edu.institution}</p>
                                </div>
                                <span>{formatRange(edu.startYear, edu.endYear)}</span>
                            </div>
                            {edu.gpa && <p className="pp-meta">GPA: {edu.gpa}</p>}
                        </article>
                    ))}
                </section>
            );
        }
        if (id === 'projects' && hasContent(projects)) {
            return (
                <section key={id} className={wrap} data-section="projects">
                    <h2>{t('projects', 'Projects')}</h2>
                    {projects.map((proj, i) => (
                        <article key={i} className="pp-entry">
                            <div className="pp-entry-top">
                                <h3>{proj.name}</h3>
                                {proj.link && <span className="pp-link">{proj.link}</span>}
                            </div>
                            {proj.description && <p className="pp-bullet">{proj.description}</p>}
                            {hasContent(proj.technologies) && (
                                <div className="pp-tags">
                                    {proj.technologies.map((tech, j) => (
                                        <span key={j}>{tech}</span>
                                    ))}
                                </div>
                            )}
                        </article>
                    ))}
                </section>
            );
        }
        if (id === 'awards') {
            return (
                <section key={id} className={`${wrap} pp-section--awards`} data-section="awards">
                    <h2>{t('awards', 'Awards')}</h2>
                    {awardItems.map((award, i) => (
                        <article key={i} className="pp-entry">
                            <div className="pp-entry-top">
                                <div>
                                    <h3>{award.name}</h3>
                                    <p>{[award.issuer, award.date].filter(Boolean).join(' · ')}</p>
                                </div>
                            </div>
                            {award.description && <p className="pp-bullet">{award.description}</p>}
                        </article>
                    ))}
                </section>
            );
        }
        if (id === 'organisations') {
            return (
                <section key={id} className={wrap} data-section="organisations">
                    <h2>{t('organisations', 'Organisations')}</h2>
                    {orgItems.map((org, i) => (
                        <article key={i} className="pp-entry">
                            <div className="pp-entry-top">
                                <div>
                                    <h3>{org.name}</h3>
                                    <p>{[org.role, org.location].filter(Boolean).join(' · ')}</p>
                                </div>
                                <span>{formatRange(org.startDate, org.endDate)}</span>
                            </div>
                            {org.description && <p className="pp-bullet">{org.description}</p>}
                        </article>
                    ))}
                </section>
            );
        }
        if (['skills', 'languages', 'certifications', 'interests'].includes(id)) {
            return renderSide(id);
        }
        return <ExtraSections key={id} resumeData={resumeData} only={[id]} compact={compact} />;
    };

    const stackedIds = [...leftIds, ...rightIds];
    const showTopbar = layoutMode === 'top' || layoutMode === 'stack';
    const showSidebar = layoutMode !== 'stack';
    const identityInSidebar = layoutMode === 'left' || layoutMode === 'right';

    return (
        <div
            className={`pp-resume pp-resume--${layoutMode}`}
            style={{
                '--pp-sidebar-width': `${leftWidth}%`,
            }}
        >
            {showTopbar && (
                <header className="pp-topbar">
                    <Identity photo={photo} initials={initials} personal={personal} compact />
                    <div className="pp-topbar-contact">
                        <ContactLine icon="fa-solid fa-envelope" value={personal.email} />
                        <ContactLine icon="fa-solid fa-phone" value={personal.phone} />
                        <ContactLine icon="fa-solid fa-location-dot" value={personal.location} />
                    </div>
                </header>
            )}

            {showSidebar && (
                <aside className="pp-sidebar">
                    {identityInSidebar && (
                        <>
                            <Identity photo={photo} initials={initials} personal={personal} />
                            <ContactBlock personal={personal} />
                        </>
                    )}
                    {(layoutMode === 'stack' ? [] : leftIds).map((id) => renderSide(id))}
                </aside>
            )}

            <main className="pp-main">
                {(layoutMode === 'stack' ? stackedIds : rightIds).map((id) => renderMain(id))}
            </main>
        </div>
    );
};

export default PortraitProfile;
