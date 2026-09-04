import React from 'react';
import { hasContent, sectionListProps } from './templateUtils';
import { isCustomSectionId, listCustomSections } from '../../../config/customSections';
import './ExtraSections.css';

const titleOf = (resumeData, id, fallback) =>
    resumeData.sectionTitles?.[id] || fallback;

const visible = (list, hidden = []) =>
    (list || []).filter((_, i) => !hidden.includes(i));

const ExtraSections = ({ resumeData = {}, exclude = [], only = null, compact = false, preserveDomOrder = false }) => {
    const hidden = resumeData.hiddenEntries || {};
    const {
        interests = [],
        courses = [],
        awards = [],
        organisations = [],
        publications = [],
        references = [],
        declaration = [],
        custom = [],
        projects = [],
        languages = [],
    } = resumeData;
    const order = resumeData.sectionOrder || [];
    const styleFor = (id) => {
        if (preserveDomOrder) return undefined;
        const index = order.indexOf(id);
        return { order: index >= 0 ? index : 80 };
    };
    const sectionClass = compact ? 'rx-section' : 'cp-section rx-section';
    const titleClass = compact ? 'rx-title' : 'cp-section-title rx-title';
    const show = (id) => {
        if (Array.isArray(only)) {
            if (only.includes(id)) return !exclude.includes(id);
            // Legacy `only={['custom']}` should still allow cs_* blocks.
            if (only.includes('custom') && isCustomSectionId(id)) return !exclude.includes(id);
            return false;
        }
        return !exclude.includes(id);
    };

    const visInterests = visible(interests, hidden.interests);
    const visCourses = visible(courses, hidden.courses);
    const visAwards = visible(awards, hidden.awards);
    const visOrgs = visible(organisations, hidden.organisations);
    const visPubs = visible(publications, hidden.publications);
    const visRefs = visible(references, hidden.references);
    const visDecl = visible(declaration, hidden.declaration);
    const visCustom = visible(custom, hidden.custom);
    const visProjects = visible(projects, hidden.projects);
    const visLanguages = visible(languages, hidden.languages);
    const customBlocks = listCustomSections(resumeData);
    const renderCustomBlock = (block) => {
        const items = visible(block.items, hidden[block.id]);
        if (!hasContent(items) || !show(block.id)) return null;
        const style = { ...(resumeData.sectionStyles?.[block.id] || {}), ...(block.style || {}) };
        const listStyle = style.listStyle || resumeData.design?.listStyle || 'bullet';
        const layout = style.layout || 'entries';
        return (
            <section
                key={block.id}
                className={sectionClass}
                data-section={block.id}
                data-sec-list={listStyle}
                data-sec-layout={layout}
                style={styleFor(block.id)}
            >
                <h2 className={titleClass}>{block.title || titleOf(resumeData, block.id, 'Additional')}</h2>
                {layout === 'chips' ? (
                    <div className="rx-chips">
                        {items.map((item, i) => (
                            <span key={i}>{item.title || item.name}</span>
                        ))}
                    </div>
                ) : (
                    items.map((item, i) => (
                        <div key={i} className="rx-entry" data-entry="" data-keep={`${block.id}-${i}`}>
                            <strong>{item.title || item.name}</strong>
                            {style.showSubtitle !== false && (item.subtitle || item.location) && (
                                <span>{[item.subtitle, item.location].filter(Boolean).join(' · ')}</span>
                            )}
                            {style.showDates !== false && item.date && <span>{item.date}</span>}
                            {layout === 'bullets' && item.description ? (
                                <ul className="rx-bullets">
                                    {String(item.description).split('\n').filter(Boolean).map((line, j) => (
                                        <li key={j}>{line.replace(/^[•\-]\s*/, '')}</li>
                                    ))}
                                </ul>
                            ) : (
                                item.description && <p>{item.description}</p>
                            )}
                        </div>
                    ))
                )}
            </section>
        );
    };

    return (
        <>
            {hasContent(visProjects) && show('projects') && (
                <section className={sectionClass} data-section="projects" style={styleFor('projects')} {...sectionListProps(resumeData, 'projects')}>
                    <h2 className={titleClass}>{titleOf(resumeData, 'projects', 'Projects')}</h2>
                    {visProjects.map((item, i) => (
                        <div key={i} className="rx-entry" data-keep={`projects-${i}`}>
                            <strong>{item.name}</strong>
                            <span className="rx-subtitle">{[item.technologies?.join?.(' · '), item.link].filter(Boolean).join(' · ')}</span>
                            {item.description && <p className="rx-copy">{item.description}</p>}
                        </div>
                    ))}
                </section>
            )}
            {hasContent(visLanguages) && show('languages') && (
                <section className={sectionClass} data-section="languages" style={styleFor('languages')}>
                    <h2 className={titleClass}>{titleOf(resumeData, 'languages', 'Languages')}</h2>
                    <p className="rx-copy">
                        {visLanguages.map((item) => (typeof item === 'string' ? item : [item.name, item.proficiency].filter(Boolean).join(' — '))).join('  ·  ')}
                    </p>
                </section>
            )}
            {hasContent(visInterests) && show('interests') && (
                <section className={sectionClass} data-section="interests" style={styleFor('interests')}>
                    <h2 className={titleClass}>{titleOf(resumeData, 'interests', 'Interests')}</h2>
                    <div className="rx-chips">
                        {visInterests.map((item, i) => (
                            <span key={i}>{typeof item === 'string' ? item : item.name}</span>
                        ))}
                    </div>
                </section>
            )}
            {hasContent(visCourses) && show('courses') && (
                <section className={sectionClass} data-section="courses" style={styleFor('courses')} {...sectionListProps(resumeData, 'courses')}>
                    <h2 className={titleClass}>{titleOf(resumeData, 'courses', 'Courses')}</h2>
                            {visCourses.map((item, i) => (
                        <div key={i} className="rx-entry" data-keep={`courses-${i}`}>
                            <strong>{item.name}</strong>
                            <span>{[item.institution, item.date].filter(Boolean).join(' · ')}</span>
                            {item.description && <p>{item.description}</p>}
                        </div>
                    ))}
                </section>
            )}
            {hasContent(visAwards) && show('awards') && (
                <section className={sectionClass} data-section="awards" style={styleFor('awards')} {...sectionListProps(resumeData, 'awards')}>
                    <h2 className={titleClass}>{titleOf(resumeData, 'awards', 'Awards')}</h2>
                            {visAwards.map((item, i) => (
                        <div key={i} className="rx-entry" data-keep={`awards-${i}`}>
                            <strong>{item.name}</strong>
                            <span>{[item.issuer, item.date].filter(Boolean).join(' · ')}</span>
                            {item.description && <p>{item.description}</p>}
                        </div>
                    ))}
                </section>
            )}
            {hasContent(visOrgs) && show('organisations') && (
                <section className={sectionClass} data-section="organisations" style={styleFor('organisations')}>
                    <h2 className={titleClass}>{titleOf(resumeData, 'organisations', 'Organisations')}</h2>
                            {visOrgs.map((item, i) => (
                        <div key={i} className="rx-entry" data-keep={`organisations-${i}`}>
                            <strong>{item.name}</strong>
                            <span>{[item.role, item.startDate, item.endDate].filter(Boolean).join(' · ')}</span>
                            {item.description && <p>{item.description}</p>}
                        </div>
                    ))}
                </section>
            )}
            {hasContent(visPubs) && show('publications') && (
                <section className={sectionClass} data-section="publications" style={styleFor('publications')}>
                    <h2 className={titleClass}>{titleOf(resumeData, 'publications', 'Publications')}</h2>
                            {visPubs.map((item, i) => (
                        <div key={i} className="rx-entry" data-keep={`publications-${i}`}>
                            <strong>{item.name}</strong>
                            <span>{[item.publisher, item.date].filter(Boolean).join(' · ')}</span>
                            {item.description && <p>{item.description}</p>}
                        </div>
                    ))}
                </section>
            )}
            {hasContent(visRefs) && show('references') && (
                <section className={sectionClass} data-section="references" style={styleFor('references')}>
                    <h2 className={titleClass}>{titleOf(resumeData, 'references', 'References')}</h2>
                            {visRefs.map((item, i) => (
                        <div key={i} className="rx-entry" data-keep={`references-${i}`}>
                            <strong>{item.name}</strong>
                            <span>{[item.title, item.company].filter(Boolean).join(' · ')}</span>
                            <span>{[item.email, item.phone].filter(Boolean).join(' · ')}</span>
                        </div>
                    ))}
                </section>
            )}
            {hasContent(visDecl) && show('declaration') && (
                <section className={sectionClass} data-section="declaration" style={styleFor('declaration')}>
                    <h2 className={titleClass}>{titleOf(resumeData, 'declaration', 'Declaration')}</h2>
                            {visDecl.map((item, i) => (
                        <div key={i} className="rx-entry" data-keep={`declaration-${i}`}>
                            <p>{item.text}</p>
                            <span>{[item.name, item.location, item.date].filter(Boolean).join(' · ')}</span>
                        </div>
                    ))}
                </section>
            )}
            {customBlocks.map((block) => renderCustomBlock(block))}
            {hasContent(visCustom) && show('custom') && !customBlocks.length && (
                <section className={sectionClass} data-section="custom" style={styleFor('custom')}>
                    <h2 className={titleClass}>{titleOf(resumeData, 'custom', 'Additional')}</h2>
                    {visCustom.map((item, i) => (
                        <div key={i} className="rx-entry" data-keep={`custom-${i}`}>
                            <strong>{item.title}</strong>
                            {item.description && <p>{item.description}</p>}
                        </div>
                    ))}
                </section>
            )}
        </>
    );
};

export default ExtraSections;
