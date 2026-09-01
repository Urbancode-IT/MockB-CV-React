import React from 'react';
import './NorthShore.css';
import {
    visibleList,
    isEntryVisible,
    sectionTitle,
    sectionListProps,
    toBullets,
    hasContent,
} from './templateUtils';

const itemName = (item) => (typeof item === 'string' ? item : item?.name || item?.title || '');

const NorthShore = ({ resumeData = {} }) => {
    const hidden = resumeData.hiddenEntries || {};
    const personal = resumeData.personal || {};
    const continued = resumeData.pageMeta?.page > 1;
    const summary = isEntryVisible(resumeData, 'summary') ? (resumeData.summary || '') : '';
    const experience = visibleList(resumeData.experience, hidden.experience);
    const education = visibleList(resumeData.education, hidden.education);
    const skills = visibleList(resumeData.skills, hidden.skills);
    const projects = visibleList(resumeData.projects, hidden.projects);
    const certifications = visibleList(resumeData.certifications, hidden.certifications);
    const languages = visibleList(resumeData.languages, hidden.languages);
    const interests = visibleList(resumeData.interests, hidden.interests);
    const courses = visibleList(resumeData.courses, hidden.courses);
    const awards = visibleList(resumeData.awards, hidden.awards);
    const organisations = visibleList(resumeData.organisations, hidden.organisations);
    const publications = visibleList(resumeData.publications, hidden.publications);
    const references = visibleList(resumeData.references, hidden.references);
    const t = (id, fallback) => sectionTitle(resumeData, id, fallback);

    const Block = ({ id, title, children }) => (
        <section className="ns-block" data-section={id}>
            <h2 className="ns-title">{t(id, title)}</h2>
            {children}
        </section>
    );

    const Entry = ({ title, sub, meta, body, tags, plainTitle }) => (
        <article className="ns-entry">
            <div className="ns-entry-top">
                <div className="ns-entry-copy">
                    <span className={`ns-job${plainTitle ? ' ns-job--plain' : ''}`}>{title}</span>
                    {sub && <span className="ns-sub">{sub}</span>}
                </div>
                {meta && <span className="ns-date">{meta}</span>}
            </div>
            {body && (Array.isArray(body) ? (
                <ul className="ns-bullets">
                    {body.map((line, i) => <li key={i}>{line.replace(/^[•\-]\s*/, '')}</li>)}
                </ul>
            ) : (
                <p>{body}</p>
            ))}
            {hasContent(tags) && (
                <div className="ns-tags">
                    {tags.map((tag, i) => <span key={i}>{tag}</span>)}
                </div>
            )}
        </article>
    );

    return (
        <div className={`ns-resume${continued ? ' ns-resume--p2' : ''}`}>
            {!continued && (
                <header className="ns-header" data-section="personal">
                    <h1 className="ns-name">{personal.name || 'Your Name'}</h1>
                    {personal.jobTitle && <p className="ns-role">{personal.jobTitle}</p>}
                    <p className="ns-contact">
                        {[personal.email, personal.phone, personal.location, personal.linkedin, personal.website]
                            .filter(Boolean)
                            .join('  ·  ')}
                    </p>
                </header>
            )}

            <div className="ns-body">
                {summary && (
                    <Block id="summary" title="Profile">
                        <p className="ns-lead">{summary}</p>
                    </Block>
                )}

                {hasContent(experience) && (
                    <section className="ns-block" data-section="experience" {...sectionListProps(resumeData, 'experience')}>
                        <h2 className="ns-title">{t('experience', 'Experience')}</h2>
                        {experience.map((exp, i) => (
                            <Entry
                                key={i}
                                title={exp.role || exp.title}
                                sub={[exp.company, exp.location].filter(Boolean).join(' · ')}
                                meta={[exp.startDate, exp.endDate].filter(Boolean).join(' – ')}
                                body={exp.description ? toBullets(exp.description) : null}
                            />
                        ))}
                    </section>
                )}

                {hasContent(education) && (
                    <Block id="education" title="Education">
                        {education.map((edu, i) => (
                            <Entry
                                key={i}
                                title={[edu.degree, edu.field].filter(Boolean).join(' in ')}
                                sub={edu.institution}
                                meta={[edu.startYear, edu.endYear].filter(Boolean).join(' – ')}
                            />
                        ))}
                    </Block>
                )}

                {hasContent(skills) && (
                    <Block id="skills" title="Skills">
                        <div className="ns-pills">
                            {skills.map((skill, i) => (
                                <span key={i}>
                                    {typeof skill === 'string' ? skill : [skill.name, skill.level].filter(Boolean).join(' · ')}
                                </span>
                            ))}
                        </div>
                    </Block>
                )}

                {hasContent(projects) && (
                    <section className="ns-block" data-section="projects" {...sectionListProps(resumeData, 'projects')}>
                        <h2 className="ns-title">{t('projects', 'Projects')}</h2>
                        {projects.map((proj, i) => (
                            <Entry
                                key={i}
                                title={proj.name}
                                meta={proj.link}
                                body={proj.description ? toBullets(proj.description) : null}
                                tags={proj.technologies}
                            />
                        ))}
                    </section>
                )}

                {hasContent(certifications) && (
                    <Block id="certifications" title="Certificates">
                        {certifications.map((cert, i) => (
                            <Entry
                                key={i}
                                title={typeof cert === 'string' ? cert : cert.name}
                                sub={cert.issuer}
                                meta={cert.date}
                                plainTitle
                            />
                        ))}
                    </Block>
                )}

                {hasContent(languages) && (
                    <Block id="languages" title="Languages">
                        <p className="ns-lead">
                            {languages.map((lang) => (typeof lang === 'string' ? lang : [lang.name, lang.proficiency].filter(Boolean).join(' — '))).join('   ·   ')}
                        </p>
                    </Block>
                )}

                {hasContent(interests) && (
                    <Block id="interests" title="Interests">
                        <div className="ns-pills ns-pills--soft">
                            {interests.map((item, i) => <span key={i}>{itemName(item)}</span>)}
                        </div>
                    </Block>
                )}

                {hasContent(courses) && (
                    <Block id="courses" title="Courses">
                        {courses.map((item, i) => (
                            <Entry key={i} title={item.name} sub={item.institution} meta={item.date} body={item.description} />
                        ))}
                    </Block>
                )}

                {hasContent(awards) && (
                    <Block id="awards" title="Awards">
                        {awards.map((item, i) => (
                            <Entry key={i} title={item.name} sub={item.issuer} meta={item.date} body={item.description} />
                        ))}
                    </Block>
                )}

                {hasContent(organisations) && (
                    <Block id="organisations" title="Community">
                        {organisations.map((item, i) => (
                            <Entry key={i} title={item.name} sub={item.role} meta={item.date} body={item.description} />
                        ))}
                    </Block>
                )}

                {hasContent(publications) && (
                    <Block id="publications" title="Writing">
                        {publications.map((item, i) => (
                            <Entry key={i} title={item.name} sub={item.publisher} meta={item.date} body={item.description} />
                        ))}
                    </Block>
                )}

                {hasContent(references) && (
                    <Block id="references" title="References">
                        {references.map((item, i) => (
                            <Entry
                                key={i}
                                title={item.name}
                                sub={[item.title, item.company].filter(Boolean).join(', ')}
                                body={[item.email, item.phone].filter(Boolean).join(' · ')}
                            />
                        ))}
                    </Block>
                )}
            </div>
        </div>
    );
};

export default NorthShore;
