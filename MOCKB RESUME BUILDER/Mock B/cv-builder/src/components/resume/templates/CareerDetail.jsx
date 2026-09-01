import React from 'react';
import './CareerDetail.css';
import {
    visibleList,
    isEntryVisible,
    sectionTitle,
    sectionListProps,
    toBullets,
    hasContent,
} from './templateUtils';

const itemName = (item) => (typeof item === 'string' ? item : item?.name || item?.title || '');

const CareerDetail = ({ resumeData = {} }) => {
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
        <section className="cd-block" data-section={id}>
            <h2 className="cd-title">{t(id, title)}</h2>
            {children}
        </section>
    );

    const Entry = ({ title, sub, meta, body, tags, plainTitle }) => (
        <article className="cd-entry">
            <div className="cd-entry-top">
                <div>
                    <span className={`cd-job-title${plainTitle ? ' cd-job-title--plain' : ''}`}>{title}</span>
                    {sub && <span className="cd-sub">{sub}</span>}
                </div>
                {meta && <em className="cd-meta">{meta}</em>}
            </div>
            {body && (Array.isArray(body) ? (
                <ul className="cd-bullets">
                    {body.map((line, i) => <li key={i}>{line.replace(/^[•\-]\s*/, '')}</li>)}
                </ul>
            ) : (
                <p>{body}</p>
            ))}
            {hasContent(tags) && (
                <div className="cd-tags">
                    {tags.map((tag, i) => <span key={i}>{tag}</span>)}
                </div>
            )}
        </article>
    );

    return (
        <div className={`cd-resume${continued ? ' cd-resume--p2' : ''}`}>
            {!continued && (
                <header className="cd-masthead" data-section="personal">
                    <div className="cd-masthead-copy">
                        <h1 className="cd-name">{personal.name || 'Your Name'}</h1>
                        {personal.jobTitle && <p className="cd-role">{personal.jobTitle}</p>}
                        <div className="cd-contact">
                            <span>{[personal.email, personal.phone, personal.location].filter(Boolean).join('  ·  ')}</span>
                            <span>{[personal.linkedin, personal.website, personal.github].filter(Boolean).join('  ·  ')}</span>
                        </div>
                    </div>
                </header>
            )}

            <div className="cd-body">
                {summary && (
                    <Block id="summary" title="About">
                        <p className="cd-lead">{summary}</p>
                    </Block>
                )}

                {hasContent(experience) && (
                    <section className="cd-block" data-section="experience" {...sectionListProps(resumeData, 'experience')}>
                        <h2 className="cd-title">{t('experience', 'Work experience')}</h2>
                        <div className="cd-timeline">
                            {experience.map((exp, i) => (
                                <Entry
                                    key={i}
                                    title={exp.role || exp.title}
                                    sub={exp.company}
                                    meta={[exp.location, [exp.startDate, exp.endDate].filter(Boolean).join(' – ')].filter(Boolean).join(' · ')}
                                    body={exp.description ? toBullets(exp.description) : null}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {hasContent(education) && (
                    <Block id="education" title="Education">
                        {education.map((edu, i) => (
                            <Entry
                                key={i}
                                title={[edu.degree, edu.field].filter(Boolean).join(' in ')}
                                sub={edu.institution}
                                meta={[edu.startYear, edu.endYear].filter(Boolean).join(' – ') + (edu.gpa ? ` · GPA ${edu.gpa}` : '')}
                            />
                        ))}
                    </Block>
                )}

                {hasContent(skills) && (
                    <Block id="skills" title="Core skills">
                        <div className="cd-skill-grid">
                            {skills.map((skill, i) => (
                                <div key={i} className="cd-skill">
                                    <span>{typeof skill === 'string' ? skill : skill.name}</span>
                                    {skill.level && <b>{skill.level}</b>}
                                </div>
                            ))}
                        </div>
                    </Block>
                )}

                {hasContent(projects) && (
                    <section className="cd-block" data-section="projects" {...sectionListProps(resumeData, 'projects')}>
                        <h2 className="cd-title">{t('projects', 'Projects')}</h2>
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
                                meta={[cert.issuer, cert.date].filter(Boolean).join(' · ')}
                                plainTitle
                            />
                        ))}
                    </Block>
                )}

                {hasContent(languages) && (
                    <Block id="languages" title="Languages">
                        <p className="cd-inline">
                            {languages.map((lang) => (typeof lang === 'string' ? lang : [lang.name, lang.proficiency].filter(Boolean).join(' — '))).join('   ·   ')}
                        </p>
                    </Block>
                )}

                {hasContent(interests) && (
                    <Block id="interests" title="Interests">
                        <div className="cd-chips">
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
                    <Block id="organisations" title="Volunteer work">
                        {organisations.map((item, i) => (
                            <Entry key={i} title={item.name} sub={item.role} meta={item.date} body={item.description} />
                        ))}
                    </Block>
                )}

                {hasContent(publications) && (
                    <Block id="publications" title="Publications">
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

export default CareerDetail;
