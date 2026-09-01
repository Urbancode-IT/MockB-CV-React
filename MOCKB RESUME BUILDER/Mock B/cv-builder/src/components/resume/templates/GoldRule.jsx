import React, { Fragment } from 'react';
import './GoldRule.css';
import {
    visibleList,
    isEntryVisible,
    sectionTitle,
    toBullets,
    hasContent,
} from './templateUtils';
import { getPageSectionLists } from '../../../config/pageLayout';

const splitName = (full = '') => {
    const parts = String(full).trim().split(/\s+/).filter(Boolean);
    if (parts.length < 2) return { first: parts[0] || 'Your', last: 'Name' };
    return { first: parts[0], last: parts.slice(1).join(' ') };
};

const GoldRule = ({ resumeData = {} }) => {
    const hidden = resumeData.hiddenEntries || {};
    const personal = resumeData.personal || {};
    const continued = resumeData.pageMeta?.page > 1;
    const { first, last } = splitName(personal.name);
    const summary = isEntryVisible(resumeData, 'summary') ? (resumeData.summary || '') : '';
    const bullets = Array.isArray(resumeData.profileBullets)
        ? resumeData.profileBullets.filter(Boolean)
        : [];
    const competencies = Array.isArray(resumeData.competencies)
        ? resumeData.competencies.filter(Boolean)
        : [];
    const experience = visibleList(resumeData.experience, hidden.experience);
    const education = visibleList(resumeData.education, hidden.education);
    const skills = visibleList(resumeData.skills, hidden.skills);
    const projects = visibleList(resumeData.projects, hidden.projects);
    const certifications = visibleList(resumeData.certifications, hidden.certifications);
    const languages = visibleList(resumeData.languages, hidden.languages);
    const awards = visibleList(resumeData.awards, hidden.awards);
    const t = (id, fallback) => sectionTitle(resumeData, id, fallback);
    const lists = getPageSectionLists(resumeData, 'gold-rule');
    const order = continued ? lists.page2 : lists.page1;

    const Heading = ({ id, fallback }) => (
        <h2 className="gr-h">{t(id, fallback)}</h2>
    );

    const renderSection = (id) => {
        if (id === 'summary' && (summary || bullets.length > 0)) {
            return (
                <section data-section="summary">
                    <Heading id="summary" fallback="Profile" />
                    {summary && <p className="gr-lead">{summary}</p>}
                    {bullets.length > 0 && (
                        <ul className="gr-list">
                            {bullets.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    )}
                </section>
            );
        }
        if (id === 'education' && hasContent(education)) {
            return (
                <>
                    <section data-section="education">
                        <Heading id="education" fallback="Education" />
                        <ul className="gr-edu">
                            {education.map((edu, i) => (
                                <li key={i}>
                                    {`${edu.endYear || edu.startYear || ''}: ${[edu.degree, edu.field].filter(Boolean).join(' | ')} | ${edu.institution || ''}${edu.location ? ` | ${edu.location}` : ''}`}
                                </li>
                            ))}
                        </ul>
                    </section>
                    {competencies.length > 0 && (
                        <section>
                            <h2 className="gr-h">Core Competencies</h2>
                            <ul className="gr-list">
                                {competencies.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </section>
                    )}
                </>
            );
        }
        if (id === 'certifications' && hasContent(certifications)) {
            return (
                <section data-section="certifications">
                    <Heading id="certifications" fallback="Certifications" />
                    <ul className="gr-edu">
                        {certifications.map((cert, i) => (
                            <li key={i}>
                                {`${cert.date || ''}: ${typeof cert === 'string' ? cert : [cert.name, cert.issuer].filter(Boolean).join(' | ')}`}
                            </li>
                        ))}
                    </ul>
                </section>
            );
        }
        if (id === 'languages' && hasContent(languages)) {
            return (
                <section data-section="languages">
                    <Heading id="languages" fallback="Languages" />
                    <p className="gr-lead">
                        {languages.map((lang) => (typeof lang === 'string' ? lang : [lang.name, lang.proficiency].filter(Boolean).join(' — '))).join('  ·  ')}
                    </p>
                </section>
            );
        }
        if (id === 'skills' && hasContent(skills)) {
            return (
                <section data-section="skills">
                    <Heading id="skills" fallback="Skill" />
                    <ul className="gr-list">
                        {skills.map((skill, i) => {
                            const name = typeof skill === 'string' ? skill : skill.name;
                            const detail = typeof skill === 'string' ? '' : (skill.detail || skill.level || '');
                            return (
                                <li key={i}>
                                    <strong>{name}</strong>
                                    {detail ? `: ${detail}` : ''}
                                </li>
                            );
                        })}
                    </ul>
                </section>
            );
        }
        if (id === 'experience' && hasContent(experience)) {
            return (
                <section data-section="experience">
                    <Heading id="experience" fallback="Professional Experience" />
                    {experience.map((exp, i) => {
                        const lines = exp.description ? toBullets(exp.description) : [];
                        return (
                            <article key={i} className="gr-job">
                                <div className="gr-job-top">
                                    <h3>
                                        {[exp.role || exp.title, exp.company].filter(Boolean).join(' | ')}
                                    </h3>
                                    <em>
                                        {[exp.startDate, exp.endDate].filter(Boolean).join(' – ')}
                                    </em>
                                </div>
                                {lines.length > 0 && (
                                    <ul className="gr-list">
                                        {lines.map((line, j) => {
                                            const text = line.replace(/^[•\-]\s*/, '');
                                            const key = /^key contribution:\s*/i.test(text);
                                            return (
                                                <li key={j}>
                                                    {key ? (
                                                        <>
                                                            <strong>Key Contribution: </strong>
                                                            {text.replace(/^key contribution:\s*/i, '')}
                                                        </>
                                                    ) : text}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </article>
                        );
                    })}
                </section>
            );
        }
        if (id === 'projects' && hasContent(projects)) {
            return (
                <section data-section="projects">
                    <Heading id="projects" fallback="Projects" />
                    {projects.map((proj, i) => (
                        <article key={i} className="gr-job">
                            <div className="gr-job-top">
                                <h3>{proj.name}</h3>
                                {proj.date && <em>{proj.date}</em>}
                            </div>
                            {proj.description && <p className="gr-lead">{proj.description}</p>}
                        </article>
                    ))}
                </section>
            );
        }
        if (id === 'awards' && hasContent(awards)) {
            return (
                <section data-section="awards">
                    <Heading id="awards" fallback="Awards" />
                    <ul className="gr-list">
                        {awards.map((item, i) => (
                            <li key={i}>
                                <strong>{item.name}</strong>
                                {item.issuer || item.date ? ` — ${[item.issuer, item.date].filter(Boolean).join(', ')}` : ''}
                                {item.description ? `. ${item.description}` : ''}
                            </li>
                        ))}
                    </ul>
                </section>
            );
        }
        return null;
    };

    const blocks = order.map((id) => ({ id, node: renderSection(id) })).filter((b) => b.node);

    return (
        <div className={`gr-resume${continued ? ' gr-resume--p2' : ''}`}>
            {!continued && (
                <>
                    <header className="gr-head" data-section="personal">
                        <div>
                            <p className="gr-first">{first}</p>
                            <h1 className="gr-last">{last}</h1>
                            {personal.jobTitle && <p className="gr-role">{personal.jobTitle}</p>}
                        </div>
                        <ul className="gr-contact">
                            {personal.location && (
                                <li><i className="fa-solid fa-location-dot" />{personal.location}</li>
                            )}
                            {personal.phone && (
                                <li><i className="fa-solid fa-phone" />{personal.phone}</li>
                            )}
                            {personal.email && (
                                <li><i className="fa-solid fa-envelope" />{personal.email}</li>
                            )}
                            {personal.linkedin && (
                                <li><i className="fa-brands fa-linkedin-in" />{personal.linkedin}</li>
                            )}
                        </ul>
                    </header>
                    <hr className="gr-rule" />
                </>
            )}
            <div className="gr-body">
                {blocks.map((block, i) => (
                    <Fragment key={block.id}>
                        {i > 0 && <hr className="gr-rule" />}
                        {block.node}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default GoldRule;
