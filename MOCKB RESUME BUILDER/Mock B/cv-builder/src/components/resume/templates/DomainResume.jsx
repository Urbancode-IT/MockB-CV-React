import React from 'react';
import './DomainResume.css';
import ExtraSections from './ExtraSections';
import { orderedActiveSectionIds } from '../../../config/columnLayout';
import {
    hasContent,
    visibleList,
    isEntryVisible,
    formatRange,
    toBullets,
    sectionTitle,
    sectionListProps,
} from './templateUtils';

const skillLabel = (skill) => {
    if (typeof skill === 'string') return skill;
    const name = skill?.name || '';
    const detail = skill?.detail || skill?.level || '';
    return detail ? `${name} — ${detail}` : name;
};

const skillChip = (skill) => (typeof skill === 'string' ? skill : skill?.name || '');

const EXTRA_IDS = [
    'interests',
    'courses',
    'awards',
    'organisations',
    'publications',
    'references',
    'declaration',
    'custom',
];

const DEFAULT_ORDER = [
    'summary',
    'experience',
    'projects',
    'education',
    'skills',
    'certifications',
    'languages',
    ...EXTRA_IDS,
];

/**
 * One-column role / domain resumes with unique visual variants.
 * No vertical borders — horizontal rules and header contrast only.
 */
const DomainResume = ({ resumeData = {}, variant = 'frontend' }) => {
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
    const sectionIds = orderedActiveSectionIds(resumeData, resumeData.sectionOrder || DEFAULT_ORDER);
    const isExtra = (id) => EXTRA_IDS.includes(id) || String(id).startsWith('cs_');

    const contacts = [
        personal.email,
        personal.phone,
        personal.location,
        personal.linkedin,
        personal.github,
        personal.website,
    ].filter(Boolean);

    const Heading = ({ id, fallback }) => (
        <h2 className="dr-title">{t(id, fallback)}</h2>
    );

    const useChips = variant === 'frontend' || variant === 'ux' || variant === 'devops';
    const useSkillLines = variant === 'analyst' || variant === 'ml' || variant === 'fullstack';

    const core = {
        summary: summary && (
            <section key="summary" className="dr-section" data-section="summary">
                <Heading id="summary" fallback="Summary" />
                <p className="dr-copy">{summary}</p>
            </section>
        ),
        experience: hasContent(experience) && (
            <section key="experience" className="dr-section" data-section="experience" {...sectionListProps(resumeData, 'experience')}>
                <Heading id="experience" fallback="Experience" />
                {experience.map((exp, i) => (
                    <article key={i} className="dr-entry" data-entry="" data-keep={`experience-${i}`}>
                        <div className="dr-entry-top">
                            <div>
                                <h3>{exp.role || exp.title}</h3>
                                <p className="dr-meta">{[exp.company, exp.location].filter(Boolean).join(' · ')}</p>
                            </div>
                            <span className="dr-date">{formatRange(exp.startDate, exp.endDate)}</span>
                        </div>
                        {exp.description && (
                            <ul className="dr-bullets">
                                {toBullets(exp.description).map((line, j) => (
                                    <li key={j}>{line.replace(/^[•\-]\s*/, '')}</li>
                                ))}
                            </ul>
                        )}
                    </article>
                ))}
            </section>
        ),
        education: hasContent(education) && (
            <section key="education" className="dr-section" data-section="education">
                <Heading id="education" fallback="Education" />
                {education.map((edu, i) => (
                    <article key={i} className="dr-entry" data-entry="">
                        <div className="dr-entry-top">
                            <div>
                                <h3>{[edu.degree, edu.field].filter(Boolean).join(' · ')}</h3>
                                <p className="dr-meta">{[edu.institution, edu.location].filter(Boolean).join(' · ')}</p>
                            </div>
                            <span className="dr-date">{formatRange(edu.startYear, edu.endYear)}</span>
                        </div>
                    </article>
                ))}
            </section>
        ),
        skills: hasContent(skills) && (
            <section key="skills" className="dr-section" data-section="skills">
                <Heading id="skills" fallback="Skills" />
                {useChips ? (
                    <div className="dr-chips">
                        {skills.map((skill, i) => (
                            <span key={i} className="dr-chip">{skillChip(skill)}</span>
                        ))}
                    </div>
                ) : useSkillLines ? (
                    <ul className="dr-skill-lines">
                        {skills.map((skill, i) => (
                            <li key={i}>{skillLabel(skill)}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="dr-skill-inline">{skills.map(skillChip).filter(Boolean).join('  ·  ')}</p>
                )}
            </section>
        ),
        projects: hasContent(projects) && (
            <section key="projects" className="dr-section" data-section="projects" {...sectionListProps(resumeData, 'projects')}>
                <Heading id="projects" fallback="Projects" />
                {projects.map((proj, i) => (
                    <article key={i} className="dr-entry" data-entry="">
                        <div className="dr-entry-top">
                            <h3>{proj.name}</h3>
                            {proj.date && <span className="dr-date">{proj.date}</span>}
                        </div>
                        {proj.description && <p className="dr-copy">{proj.description}</p>}
                        {(proj.technologies || []).length > 0 && (
                            <p className="dr-meta">{(proj.technologies || []).join(' · ')}</p>
                        )}
                    </article>
                ))}
            </section>
        ),
        certifications: hasContent(certifications) && (
            <section key="certifications" className="dr-section" data-section="certifications">
                <Heading id="certifications" fallback="Certifications" />
                <ul className="dr-simple">
                    {certifications.map((cert, i) => (
                        <li key={i}>
                            {[cert.name, cert.issuer, cert.date].filter(Boolean).join(' · ')}
                        </li>
                    ))}
                </ul>
            </section>
        ),
        languages: hasContent(languages) && (
            <section key="languages" className="dr-section" data-section="languages">
                <Heading id="languages" fallback="Languages" />
                <p className="dr-copy">
                    {languages.map((lang) => (typeof lang === 'string' ? lang : [lang.name, lang.proficiency].filter(Boolean).join(' — '))).join('  ·  ')}
                </p>
            </section>
        ),
    };

    const renderSections = (ids) => (
        <>
            {ids.map((id) => {
                if (isExtra(id)) {
                    return (
                        <ExtraSections
                            key={id}
                            resumeData={resumeData}
                            compact
                            only={[id]}
                            preserveDomOrder
                        />
                    );
                }
                return core[id] || null;
            })}
        </>
    );

    return (
        <div className={`dr-resume dr-resume--${variant}`}>
            <header className="dr-header" data-section="personal">
                {variant === 'product' ? (
                    <div className="dr-header-row">
                        <h1 className="dr-name">{personal.name || 'Your Name'}</h1>
                        {personal.jobTitle && <p className="dr-role">{personal.jobTitle}</p>}
                    </div>
                ) : (
                    <>
                        <h1 className="dr-name">{personal.name || 'Your Name'}</h1>
                        {personal.jobTitle && <p className="dr-role">{personal.jobTitle}</p>}
                    </>
                )}
                {contacts.length > 0 && (
                    <div className="dr-contact">
                        {contacts.map((item) => (
                            <span key={item}>{item}</span>
                        ))}
                    </div>
                )}
            </header>

            <div className="dr-body">
                {renderSections(sectionIds.length ? sectionIds : DEFAULT_ORDER)}
            </div>
        </div>
    );
};

export default DomainResume;
