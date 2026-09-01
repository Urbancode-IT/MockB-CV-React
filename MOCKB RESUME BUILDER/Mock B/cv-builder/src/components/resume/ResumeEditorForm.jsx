import React, { useState, useRef, useEffect, useMemo } from 'react';
import { templateSupportsPhoto, isTwoColumnTemplate, getTemplateById, isOnePageTemplate } from '../../config/templates';
import { DEFAULT_COLUMN_SECTIONS, placeSectionInColumn, suggestedColumnForSection, normalizeColumnSections, columnSuggestionCopy, appendSectionToOrder, getEditorSectionIds } from '../../config/columnLayout';
import { getPageSectionLists } from '../../config/pageLayout';
import { createCustomSectionId, listCustomSections, upsertCustomSection, removeCustomSection, CUSTOM_LAYOUTS, CUSTOM_LIST_STYLES } from '../../config/customSections';
import './ResumeEditorForm.css';

const EMPTY_EXPERIENCE = {
    company: '', role: '', startDate: '', endDate: '', location: '', description: '',
};
const EMPTY_EDUCATION = {
    institution: '', degree: '', field: '', startYear: '', endYear: '', gpa: '',
};
const EMPTY_SKILL = { name: '', level: '' };
const EMPTY_PROJECT = {
    name: '', description: '', technologies: [], link: '',
};
const EMPTY_CERT = { name: '', issuer: '', date: '', link: '' };
const EMPTY_LANG = { name: '', proficiency: '' };
const EMPTY_INTEREST = { name: '' };
const EMPTY_AWARD = { name: '', issuer: '', date: '', description: '' };
const EMPTY_ORGANISATION = { name: '', role: '', startDate: '', endDate: '', description: '' };
const EMPTY_PUBLICATION = { name: '', publisher: '', date: '', description: '' };
const EMPTY_REFERENCE = { name: '', title: '', company: '', email: '', phone: '' };
const EMPTY_COURSE = { name: '', institution: '', date: '', description: '' };
const EMPTY_DECLARATION = { text: '', name: '', location: '', date: '' };
const EMPTY_CUSTOM_ENTRY = { title: '', subtitle: '', date: '', location: '', description: '' };

const PROFICIENCY_LEVELS = ['Beginner', 'Elementary', 'Conversational', 'Proficient', 'Fluent', 'Native/Bilingual'];
const SKILL_LEVELS = ['Beginner', 'Amateur', 'Competent', 'Proficient', 'Expert'];
const THEME_COLORS = ['#1A3A5C', '#4A90D9', '#E74C3C', '#27AE60', '#8E44AD', '#333333', '#D35400', '#16A085'];

const ADD_CONTENT_SECTIONS = [
    { id: 'summary',        label: 'Summary',                icon: 'fa-file-invoice',    desc: 'Add a short summary of your key strengths, experience, and career goals.' },
    { id: 'education',      label: 'Education',              icon: 'fa-graduation-cap',  desc: 'Add your degrees and schools. Include honors or details.' },
    { id: 'experience',     label: 'Professional Experience',icon: 'fa-briefcase',       desc: 'Add your professional roles and employer history.' },
    { id: 'skills',         label: 'Skills',                 icon: 'fa-lightbulb',       desc: 'Add your hard and soft skills that help you stand out from the crowd.' },
    { id: 'languages',      label: 'Languages',              icon: 'fa-language',        desc: 'Add your languages and proficiency level.' },
    { id: 'certifications', label: 'Certificates',           icon: 'fa-certificate',     desc: 'Add your industry certificates or licences.' },
    { id: 'interests',      label: 'Interests',              icon: 'fa-heart',           desc: 'Add personal interests that support your career story.' },
    { id: 'projects',       label: 'Projects',               icon: 'fa-diagram-project', desc: 'Add key projects you participated in and highlight impact.' },
    { id: 'courses',        label: 'Courses',                icon: 'fa-book',            desc: 'Add online or in-person courses and training.' },
    { id: 'awards',         label: 'Awards',                 icon: 'fa-trophy',          desc: 'Add awards and recognitions from competitions/academia.' },
    { id: 'organisations',  label: 'Organisations',          icon: 'fa-users',           desc: 'Add memberships or volunteering with organizations.' },
    { id: 'publications',   label: 'Publications',           icon: 'fa-book-open',       desc: 'Add publications, articles, or books you wrote.' },
    { id: 'references',     label: 'References',             icon: 'fa-user-group',      desc: 'Add references from managers or coworkers.' },
    { id: 'declaration',    label: 'Declaration',            icon: 'fa-signature',       desc: 'Add declaration by creating or uploading your signature.' },
    { id: 'custom',         label: 'Custom',                 icon: 'fa-asterisk',        desc: 'Add a custom section for anything else cleanly.' },
];

const SECTION_META = {
    summary:        { icon: 'fa-user',            defaultTitle: 'Summary' },
    experience:     { icon: 'fa-briefcase',       defaultTitle: 'Professional Experience', empty: EMPTY_EXPERIENCE },
    education:      { icon: 'fa-graduation-cap',  defaultTitle: 'Education', empty: EMPTY_EDUCATION },
    skills:         { icon: 'fa-lightbulb',       defaultTitle: 'Skills', empty: EMPTY_SKILL },
    projects:       { icon: 'fa-diagram-project', defaultTitle: 'Projects', empty: { ...EMPTY_PROJECT, technologies: [] } },
    certifications: { icon: 'fa-certificate',     defaultTitle: 'Certificates', empty: EMPTY_CERT },
    languages:      { icon: 'fa-language',        defaultTitle: 'Languages', empty: EMPTY_LANG },
    interests:      { icon: 'fa-heart',           defaultTitle: 'Interests', empty: EMPTY_INTEREST },
    awards:         { icon: 'fa-trophy',          defaultTitle: 'Awards', empty: EMPTY_AWARD },
    organisations:  { icon: 'fa-users',           defaultTitle: 'Organisations', empty: EMPTY_ORGANISATION },
    publications:   { icon: 'fa-book-open',       defaultTitle: 'Publications', empty: EMPTY_PUBLICATION },
    references:     { icon: 'fa-user-group',      defaultTitle: 'References', empty: EMPTY_REFERENCE },
    courses:        { icon: 'fa-book',            defaultTitle: 'Courses', empty: EMPTY_COURSE },
    declaration:    { icon: 'fa-signature',       defaultTitle: 'Declaration', empty: EMPTY_DECLARATION },
    custom:         { icon: 'fa-asterisk',        defaultTitle: 'Custom', empty: EMPTY_CUSTOM_ENTRY },
};

const DUMMY_DATA = {
    summary: 'Results-driven professional with 5+ years of experience. Skilled in leadership, communication, and problem-solving. Passionate about delivering high-quality results.',
    education: [{ institution: 'University of Example', degree: 'Bachelor of Science', field: 'Computer Science', startYear: '2018', endYear: '2022', gpa: '3.8 / 4.0' }],
    experience: [{ company: 'Example Corp', role: 'Software Engineer', startDate: 'Jan 2022', endDate: 'Present', location: 'Remote', description: '• Developed scalable web applications\n• Improved system performance by 30%\n• Collaborated with cross-functional teams' }],
    skills: [{ name: 'JavaScript', level: 'Expert' }, { name: 'React', level: 'Proficient' }],
    languages: [{ name: 'English', proficiency: 'Native/Bilingual' }],
    certifications: [{ name: 'AWS Certified Developer', issuer: 'Amazon Web Services', date: '2023', link: '' }],
    interests: [{ name: 'Open Source Development' }, { name: 'Photography' }, { name: 'Hiking' }],
    projects: [{ name: 'Portfolio Website', description: 'Built a personal portfolio using React and Node.js.', technologies: ['React', 'Node.js', 'CSS'], link: 'https://example.com' }],
    courses: [{ name: 'Full Stack Web Development', institution: 'Coursera', date: '2023', description: 'Completed a comprehensive 6-month full-stack web development course.' }],
    awards: [{ name: 'Employee of the Year', issuer: 'Example Corp', date: '2023', description: 'Awarded for outstanding performance and leadership.' }],
    organisations: [{ name: 'Tech Community Association', role: 'Volunteer', startDate: 'Jan 2022', endDate: 'Present', description: 'Organize monthly tech meetups and workshops.' }],
    publications: [{ name: 'Advances in Machine Learning', publisher: 'IEEE Conference', date: '2022', description: 'Published research on neural network optimization.' }],
    references: [{ name: 'Jane Smith', title: 'Senior Manager', company: 'Example Corp', email: 'jane@example.com', phone: '+1 555 000 0001' }],
    declaration: [{ text: 'I hereby declare that the information furnished above is true to the best of my knowledge and belief.', name: 'Your Name', location: 'City, Country', date: 'January 2024' }],
    custom: [{ title: 'Custom Entry', description: 'Add your custom content here.' }],
};

function FormField({ label, id, children }) {
    return (
        <div className="ref-field">
            {label && <label className="ref-label" htmlFor={id}>{label}</label>}
            {children}
        </div>
    );
}

function filled(value) {
    return typeof value === 'string' ? value.trim().length > 0 : Boolean(value);
}

function entryLabel(sectionId, item) {
    if (!item) return 'New Entry';
    if (sectionId === 'summary') {
        const text = String(item).trim();
        return text ? (text.length > 42 ? `${text.slice(0, 42)}…` : text) : 'New Entry';
    }
    const primary =
        item.role || item.name || item.title || item.institution || item.company || '';
    if (sectionId === 'experience' && item.role && item.company) return `${item.role}`;
    return filled(primary) ? primary : 'New Entry';
}

const SECTION_GOALS = [
    { id: 'personal', label: 'Personal details', recommend: 5, weight: 22, core: true },
    { id: 'summary', label: 'Summary', recommend: 1, weight: 14, core: true },
    { id: 'experience', label: 'Work experience', recommend: 2, weight: 22, core: true },
    { id: 'education', label: 'Education', recommend: 2, weight: 16, core: true },
    { id: 'skills', label: 'Skills', recommend: 6, weight: 12, core: true },
    { id: 'certifications', label: 'Certifications', recommend: 2, weight: 6, core: false },
    { id: 'projects', label: 'Projects', recommend: 1, weight: 5, core: false },
    { id: 'languages', label: 'Languages', recommend: 2, weight: 3, core: false },
];

function entryFilled(sectionId, item) {
    if (!item) return false;
    if (typeof item === 'string') return filled(item);
    if (sectionId === 'experience') return filled(item.role) || filled(item.company);
    if (sectionId === 'education') return filled(item.institution) || filled(item.degree);
    if (sectionId === 'skills' || sectionId === 'languages' || sectionId === 'interests') {
        return filled(typeof item === 'string' ? item : item.name);
    }
    return filled(item.name || item.title || item.text || '');
}

function sectionCount(resumeData, id) {
    const personal = resumeData.personal || {};
    if (id === 'personal') {
        return [personal.name, personal.jobTitle, personal.email, personal.phone, personal.location]
            .filter(filled).length;
    }
    if (id === 'summary') return filled(resumeData.summary) ? 1 : 0;
    return (resumeData[id] || []).filter((item) => entryFilled(id, item)).length;
}

function computeOverview(resumeData, supportsPhoto = false) {
    const goals = SECTION_GOALS.map((goal) => {
        const count = sectionCount(resumeData, goal.id);
        const ratio = Math.min(1, count / goal.recommend);
        return { ...goal, count, ratio, done: count >= goal.recommend };
    });
    const total = goals.reduce((sum, goal) => sum + goal.weight, 0);
    const earned = goals.reduce((sum, goal) => sum + goal.ratio * goal.weight, 0);
    const percent = Math.round((earned / total) * 100);
    const suggestions = [];

    goals.forEach((goal) => {
        if (goal.id === 'personal' && !goal.done) {
            suggestions.push({
                id: 'personal',
                target: 'personal',
                action: 'open',
                label: `Complete personal details · ${goal.count} of ${goal.recommend} filled`,
            });
            return;
        }
        if (goal.id === 'summary' && !goal.done) {
            suggestions.push({
                id: 'summary',
                target: 'summary',
                action: typeof resumeData.summary === 'string' ? 'open' : 'add-section',
                label: 'Add a professional summary',
            });
            return;
        }
        if (goal.id === 'personal' || goal.id === 'summary') return;
        const exists = goal.id === 'summary'
            ? typeof resumeData.summary === 'string'
            : (resumeData[goal.id] || []).length > 0;
        if (!exists) {
            suggestions.push({
                id: goal.id,
                target: goal.id,
                action: 'add-section',
                label: `Add ${goal.label.toLowerCase()} · ${goal.recommend} recommended`,
            });
            return;
        }
        if (goal.count < goal.recommend) {
            suggestions.push({
                id: `${goal.id}-more`,
                target: goal.id,
                action: 'add-entry',
                label: `Add more ${goal.label.toLowerCase()} · ${goal.count} of ${goal.recommend} recommended`,
            });
        }
    });

    if (supportsPhoto && !(resumeData.photo || resumeData.personal?.photo)) {
        suggestions.splice(1, 0, {
            id: 'photo',
            target: 'personal',
            action: 'open',
            label: 'Add a profile photo for this template',
        });
    }

    return { percent, suggestions: suggestions.slice(0, 6), filledCore: goals.filter((g) => g.core && g.count > 0).length };
}

function OverviewCard({ resumeData, onSuggestion, supportsPhoto }) {
    const { percent, suggestions } = useMemo(
        () => computeOverview(resumeData, supportsPhoto),
        [resumeData, supportsPhoto]
    );
    const radius = 28;
    const circ = 2 * Math.PI * radius;
    const offset = circ - (percent / 100) * circ;
    const tone = percent >= 80 ? 'strong' : percent >= 50 ? 'mid' : 'low';

    return (
        <div className="ref-overview">
            <div className="ref-overview-top">
                <div className={`ref-overview-ring ref-overview-ring--${tone}`}>
                    <svg viewBox="0 0 72 72" aria-hidden="true">
                        <circle className="ref-overview-track" cx="36" cy="36" r={radius} />
                        <circle
                            className="ref-overview-bar"
                            cx="36"
                            cy="36"
                            r={radius}
                            strokeDasharray={circ}
                            strokeDashoffset={offset}
                        />
                    </svg>
                    <span>{percent}%</span>
                </div>
                <div className="ref-overview-copy">
                    <h3>Overview</h3>
                    <p>
                        {percent >= 80
                            ? 'Your resume is filling out well. Use the suggestions below if you still want more depth.'
                            : percent >= 40
                                ? 'Keep adding sections and entries. The score rises as you complete recommended counts.'
                                : 'Add sections one by one. Recruiters expect summary, experience, education, and skills first.'}
                    </p>
                </div>
            </div>
            {suggestions.length > 0 && (
                <div className="ref-overview-list">
                    <span className="ref-overview-label">Suggestions</span>
                    {suggestions.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            className="ref-overview-item"
                            onClick={() => onSuggestion(item)}
                        >
                            <i className="fa-solid fa-lightbulb"></i>
                            <span>{item.label}</span>
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

function AddContentModal({ open, onClose, alreadyAdded, onAdd, onImport, twoColumn }) {
    const modalRef = useRef(null);
    const [pendingId, setPendingId] = useState(null);

    useEffect(() => {
        if (!open) return;
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [open, onClose]);

    useEffect(() => {
        if (!open) setPendingId(null);
    }, [open]);

    if (!open) return null;

    const pending = ADD_CONTENT_SECTIONS.find((sec) => sec.id === pendingId);
    const suggestion = pendingId ? columnSuggestionCopy(pendingId) : null;
    const suggested = suggestion?.side || 'right';

    const addWithColumn = (column) => {
        onAdd(pendingId, column);
        onClose();
    };

    return (
        <div className="ref-modal-overlay" onClick={onClose}>
            <div className="ref-modal-card ref-modal-card--wide" ref={modalRef} onClick={(e) => e.stopPropagation()}>
                <div className="ref-modal-header">
                    <div className="ref-modal-header-left">
                        <h2>{pending ? `Place “${pending.label}”` : 'Add content'}</h2>
                        {onImport && !pending && (
                            <button
                                type="button"
                                className="ref-import-btn"
                                onClick={() => { onClose(); onImport(); }}
                            >
                                <i className="fa-solid fa-cloud-arrow-up"></i>
                                Import Resume
                            </button>
                        )}
                    </div>
                    <button className="ref-modal-close" onClick={onClose} aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {pending && twoColumn ? (
                    <div className="ref-column-pick">
                        <p className="ref-column-lead">
                            This resume has two columns. Pick a side for “{pending.label}”.
                            {suggestion && <><br /><strong>{suggestion.label}.</strong> {suggestion.reason}</>}
                        </p>
                        <div className="ref-column-actions">
                            <button type="button" className={`ref-column-btn ${suggested === 'left' ? 'is-suggested' : ''}`} onClick={() => addWithColumn('left')}>
                                <strong>Left column</strong>
                                <span>Sidebar: skills, languages, certificates</span>
                                {suggested === 'left' && <em>Suggested</em>}
                            </button>
                            <button type="button" className={`ref-column-btn ${suggested === 'right' ? 'is-suggested' : ''}`} onClick={() => addWithColumn('right')}>
                                <strong>Right column</strong>
                                <span>Main story: summary, experience, education</span>
                                {suggested === 'right' && <em>Suggested</em>}
                            </button>
                        </div>
                        <button type="button" className="ref-column-back" onClick={() => setPendingId(null)}>Back to sections</button>
                    </div>
                ) : (
                    <>
                        <p className="ref-add-hint">Start with summary, experience, education, and skills. Add extras when they support the role.</p>
                        <div className="ref-modal-grid">
                            {ADD_CONTENT_SECTIONS.map((sec) => {
                                const isAdded = sec.id !== 'custom' && alreadyAdded.includes(sec.id);
                                const rec = sec.id === 'custom'
                                    ? 'New block · often right'
                                    : (DEFAULT_COLUMN_SECTIONS.left.includes(sec.id) ? 'Often left' : 'Often right');
                                return (
                                    <button
                                        type="button"
                                        key={sec.id}
                                        className={`ref-modal-item ${isAdded ? 'ref-modal-item--added' : ''}`}
                                        onClick={() => {
                                            if (isAdded) return;
                                            if (twoColumn) setPendingId(sec.id);
                                            else { onAdd(sec.id); onClose(); }
                                        }}
                                        title={isAdded ? 'Already added' : `Add ${sec.label}`}
                                    >
                                        <div className="ref-modal-item-icon">
                                            <i className={`fa-solid ${sec.icon}`}></i>
                                        </div>
                                        <h4>{sec.label}</h4>
                                        <p>{sec.desc}</p>
                                        {twoColumn && !isAdded && <span className="ref-modal-rec">{rec}</span>}
                                        {isAdded && (
                                            <div className="ref-modal-item-added-badge">
                                                <i className="fa-solid fa-check"></i>
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

function ContentSection({
    sectionId,
    icon,
    title,
    collapsed,
    onToggle,
    editingHeading,
    onEditHeading,
    onRename,
    onStopRename,
    items,
    expandedIndex,
    setExpandedIndex,
    hiddenIndexes = [],
    onHide,
    onRemove,
    onAdd,
    onRemoveSection,
    onReorder,
    renderForm,
    hideAdd = false,
    styleBar = null,
}) {
    const [dragIndex, setDragIndex] = useState(null);

    return (
        <div className="ref-content-card" data-section={sectionId}>
            <div className="ref-content-head">
                <div className="ref-content-head-left">
                    <i className={`fa-solid ${icon}`}></i>
                    {editingHeading ? (
                        <input
                            className="ref-heading-input"
                            autoFocus
                            value={title}
                            onChange={(e) => onRename(e.target.value)}
                            onBlur={onStopRename}
                            onKeyDown={(e) => { if (e.key === 'Enter') onStopRename(); }}
                        />
                    ) : (
                        <h3>{title}</h3>
                    )}
                </div>
                <div className="ref-content-head-right">
                    <button type="button" className="ref-collapse-btn" onClick={onToggle} aria-label={collapsed ? 'Expand' : 'Collapse'}>
                        <i className={`fa-solid fa-chevron-${collapsed ? 'down' : 'up'}`}></i>
                    </button>
                    <button type="button" className="ref-edit-heading" onClick={onEditHeading} aria-label="Edit heading">
                        <i className="fa-solid fa-pen"></i>
                    </button>
                </div>
            </div>

            {!collapsed && (
                <>
                    {styleBar}
                    <div className="ref-entry-list">
                        {items.map((item, i) => {
                            const hidden = hiddenIndexes.includes(i);
                            const open = expandedIndex === i;
                            return (
                                <div key={`${sectionId}-${i}`} className={`ref-entry-wrap ${open ? 'is-open' : ''} ${hidden ? 'is-hidden' : ''}`}>
                                    <div
                                        className="ref-entry-row"
                                        draggable={Boolean(onReorder)}
                                        onDragStart={() => setDragIndex(i)}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={() => {
                                            if (onReorder && dragIndex !== null) onReorder(dragIndex, i);
                                            setDragIndex(null);
                                        }}
                                        onClick={() => setExpandedIndex(open ? null : i)}
                                    >
                                        <span className="ref-entry-grip" aria-hidden="true">
                                            <i className="fa-solid fa-grip"></i>
                                        </span>
                                        <span className="ref-entry-name">{entryLabel(sectionId, item)}</span>
                                        <button
                                            type="button"
                                            className={`ref-entry-icon ${hidden ? 'is-off' : ''}`}
                                            title={hidden ? 'Show on resume' : 'Hide from resume'}
                                            onClick={(e) => { e.stopPropagation(); onHide(i); }}
                                        >
                                            <i className={`fa-solid ${hidden ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                        </button>
                                        {onRemove && (
                                            <button
                                                type="button"
                                                className="ref-entry-icon ref-entry-icon--danger"
                                                title="Delete entry"
                                                onClick={(e) => { e.stopPropagation(); onRemove(i); }}
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        )}
                                    </div>
                                    {open && (
                                        <div className="ref-entry-form" onClick={(e) => e.stopPropagation()}>
                                            {renderForm(item, i)}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="ref-content-foot">
                        {!hideAdd && onAdd && (
                            <button type="button" className="ref-add-entry" onClick={onAdd}>
                                + Add Entry
                            </button>
                        )}
                        <button type="button" className="ref-section-trash" title="Remove section" onClick={onRemoveSection}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

const ResumeEditorForm = ({ resumeData, setResumeData, title, setTitle, onImport, selectedTemplate, onPreviewFocus }) => {
    const supportsPhoto = templateSupportsPhoto(selectedTemplate);
    const twoColTemplate = isTwoColumnTemplate(selectedTemplate);
    const columnMode = twoColTemplate
        ? (resumeData.design?.columns === 'one' ? 'one' : resumeData.design?.columns === 'mix' ? 'mix' : 'two')
        : 'one';
    const twoColumn = twoColTemplate && (getTemplateById(selectedTemplate)?.layout === 'split' || columnMode !== 'one');
    const [openSections, setOpenSections] = useState({
        theme: false,
        personal: Boolean(resumeData.startBlank),
        summary: false,
        experience: false,
        education: false,
        skills: false,
        projects: false,
        certifications: false,
        languages: false,
        interests: false,
        awards: false,
        organisations: false,
        publications: false,
        references: false,
        declaration: false,
        custom: false,
        courses: false,
    });
    const [expandedEntry, setExpandedEntry] = useState({});
    const [editingHeading, setEditingHeading] = useState(null);
    const [editingPersonal, setEditingPersonal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const sectionRefs = useRef({});
    const photoInputRef = useRef(null);

    const toggleSection = (key) =>
        setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

    const updateTheme = (color) =>
        setResumeData((prev) => ({ ...prev, themeColor: color }));

    const updatePersonal = (field, val) =>
        setResumeData((prev) => ({
            ...prev,
            personal: { ...prev.personal, [field]: val },
        }));

    const updateSummary = (val) =>
        setResumeData((prev) => ({ ...prev, summary: val }));

    const updateListItem = (section, index, field, val) =>
        setResumeData((prev) => {
            const updated = [...(prev[section] || [])];
            const current = updated[index] || {};
            updated[index] = typeof current === 'string'
                ? { name: field === 'name' ? val : current, [field]: val }
                : { ...current, [field]: val };
            return { ...prev, [section]: updated };
        });

    const updateCustomItem = (sectionId, index, field, val) =>
        setResumeData((prev) => {
            const block = listCustomSections(prev).find((item) => item.id === sectionId);
            if (!block) return prev;
            const items = [...(block.items || [])];
            items[index] = { ...(items[index] || {}), [field]: val };
            return { ...prev, customSections: upsertCustomSection(prev, { ...block, items }) };
        });

    const addCustomItem = (sectionId) => {
        const nextIndex = (listCustomSections(resumeData).find((item) => item.id === sectionId)?.items || []).length;
        setResumeData((prev) => {
            const block = listCustomSections(prev).find((item) => item.id === sectionId);
            if (!block) return prev;
            return {
                ...prev,
                customSections: upsertCustomSection(prev, {
                    ...block,
                    items: [...(block.items || []), { ...EMPTY_CUSTOM_ENTRY }],
                }),
            };
        });
        setOpenSections((prev) => ({ ...prev, [sectionId]: true }));
        setExpandedEntry((prev) => ({ ...prev, [sectionId]: nextIndex }));
    };

    const removeCustomItem = (sectionId, index) =>
        setResumeData((prev) => {
            const block = listCustomSections(prev).find((item) => item.id === sectionId);
            if (!block) return prev;
            const items = (block.items || []).filter((_, i) => i !== index);
            const hidden = { ...(prev.hiddenEntries || {}) };
            hidden[sectionId] = (hidden[sectionId] || [])
                .filter((i) => i !== index)
                .map((i) => (i > index ? i - 1 : i));
            return { ...prev, customSections: upsertCustomSection(prev, { ...block, items }), hiddenEntries: hidden };
        });

    const addListItem = (section, empty) => {
        const nextIndex = (resumeData[section] || []).length;
        setResumeData((prev) => ({
            ...prev,
            [section]: [...(prev[section] || []), { ...empty }],
        }));
        setOpenSections((prev) => ({ ...prev, [section]: true }));
        setExpandedEntry((prev) => ({ ...prev, [section]: nextIndex }));
    };

    const removeListItem = (section, index) =>
        setResumeData((prev) => {
            const list = (prev[section] || []).filter((_, i) => i !== index);
            const hidden = { ...(prev.hiddenEntries || {}) };
            hidden[section] = (hidden[section] || [])
                .filter((i) => i !== index)
                .map((i) => (i > index ? i - 1 : i));
            return { ...prev, [section]: list, hiddenEntries: hidden };
        });

    const reorderList = (section, from, to) => {
        if (from === to) return;
        setResumeData((prev) => {
            const list = [...(prev[section] || [])];
            const [moved] = list.splice(from, 1);
            list.splice(to, 0, moved);
            const hidden = { ...(prev.hiddenEntries || {}) };
            hidden[section] = (hidden[section] || []).map((i) => {
                if (i === from) return to;
                if (from < to && i > from && i <= to) return i - 1;
                if (from > to && i >= to && i < from) return i + 1;
                return i;
            });
            return { ...prev, [section]: list, hiddenEntries: hidden };
        });
        setExpandedEntry((prev) => {
            if (prev[section] === from) return { ...prev, [section]: to };
            return prev;
        });
    };

    const toggleHidden = (section, index) =>
        setResumeData((prev) => {
            const hidden = { ...(prev.hiddenEntries || {}) };
            const current = [...(hidden[section] || [])];
            hidden[section] = current.includes(index)
                ? current.filter((i) => i !== index)
                : [...current, index];
            return { ...prev, hiddenEntries: hidden };
        });

    const renameSection = (sectionId, value) =>
        setResumeData((prev) => {
            if (String(sectionId).startsWith('cs_') || sectionId === 'custom') {
                const block = listCustomSections(prev).find((item) => item.id === sectionId);
                if (block) {
                    return {
                        ...prev,
                        customSections: upsertCustomSection(prev, { ...block, title: value }),
                        sectionTitles: { ...(prev.sectionTitles || {}), [sectionId]: value },
                    };
                }
            }
            return {
                ...prev,
                sectionTitles: { ...(prev.sectionTitles || {}), [sectionId]: value },
            };
        });

    const updateSectionStyle = (sectionId, field, value) =>
        setResumeData((prev) => {
            const sectionStyles = { ...(prev.sectionStyles || {}), [sectionId]: { ...(prev.sectionStyles?.[sectionId] || {}), [field]: value } };
            if (String(sectionId).startsWith('cs_') || sectionId === 'custom') {
                const block = listCustomSections(prev).find((item) => item.id === sectionId);
                if (block) {
                    return {
                        ...prev,
                        sectionStyles,
                        customSections: upsertCustomSection(prev, { ...block, style: { ...(block.style || {}), [field]: value } }),
                    };
                }
            }
            return { ...prev, sectionStyles };
        });

    const removeSection = (sectionId) =>
        setResumeData((prev) => {
            if (String(sectionId).startsWith('cs_') || sectionId === 'custom') {
                const next = {
                    ...prev,
                    customSections: removeCustomSection(prev, sectionId),
                    sectionOrder: (prev.sectionOrder || []).filter((id) => id !== sectionId),
                };
                if (sectionId === 'custom') next.custom = [];
                return next;
            }
            const next = { ...prev };
            if (sectionId === 'summary') delete next.summary;
            else next[sectionId] = [];
            return next;
        });

    const updateTechs = (index, val) =>
        setResumeData((prev) => {
            const projects = [...(prev.projects || [])];
            projects[index] = {
                ...projects[index],
                technologies: val.split(',').map((t) => t.trim()).filter(Boolean),
            };
            return { ...prev, projects };
        });

    const handlePhoto = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setResumeData((prev) => ({
                ...prev,
                photo: reader.result,
                personal: { ...(prev.personal || {}), photo: reader.result },
            }));
        };
        reader.readAsDataURL(file);
        event.target.value = '';
    };

    const getAddedSections = () => {
        const added = [];
        const data = resumeData;
        if (typeof data.summary === 'string') added.push('summary');
        ADD_CONTENT_SECTIONS.forEach((sec) => {
            if (sec.id === 'summary') return;
            if ((data[sec.id] || []).length > 0) added.push(sec.id);
        });
        return added;
    };

    const handleAddSection = (sectionId, column) => {
        const isNewCustom = sectionId === 'custom';
        const customId = isNewCustom ? createCustomSectionId() : sectionId;
        const empty = SECTION_META[sectionId]?.empty || EMPTY_CUSTOM_ENTRY;
        setResumeData((prev) => {
            const next = { ...prev };
            if (isNewCustom) {
                next.customSections = upsertCustomSection(prev, {
                    id: customId,
                    title: `Custom ${listCustomSections(prev).length + 1}`,
                    items: [{ ...EMPTY_CUSTOM_ENTRY }],
                    style: { listStyle: prev.design?.listStyle || 'bullet', layout: 'entries', showDates: true, showSubtitle: true },
                });
            } else if (sectionId === 'summary') {
                next.summary = typeof prev.summary === 'string' ? prev.summary : '';
            } else if (!(prev[sectionId] || []).length) {
                next[sectionId] = empty ? [{ ...empty, ...(empty.technologies ? { technologies: [] } : {}) }] : [];
            }
            const placedId = isNewCustom ? customId : sectionId;
            next.sectionOrder = appendSectionToOrder({ ...next, sectionOrder: prev.sectionOrder }, placedId);
            if (twoColumn && column) {
                next.columnSections = placeSectionInColumn(
                    { ...next, columnSections: prev.columnSections || normalizeColumnSections(prev) },
                    placedId,
                    column
                );
            }
            return next;
        });
        const placedId = isNewCustom ? customId : sectionId;
        setOpenSections((prev) => ({ ...prev, [placedId]: true }));
        setExpandedEntry((prev) => ({ ...prev, [placedId]: 0 }));
        setTimeout(() => {
            sectionRefs.current[placedId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
    };

    const handleSuggestion = (item) => {
        const target = item.target || item.id;
        if (target === 'personal') {
            setEditingPersonal(true);
            sectionRefs.current.personal?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
        if (item.action === 'add-section' || !getAddedSections().includes(target)) {
            handleAddSection(target, twoColumn ? suggestedColumnForSection(target) : undefined);
            return;
        }
        if (item.action === 'add-entry' && target !== 'summary') {
            addListItem(target, SECTION_META[target]?.empty || { name: '' });
            sectionRefs.current[target]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
        setOpenSections((prev) => ({ ...prev, [target]: true }));
        if (target === 'summary') setEditingPersonal(false);
        sectionRefs.current[target]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const sectionTitle = (id) =>
        resumeData.sectionTitles?.[id]
        || listCustomSections(resumeData).find((block) => block.id === id)?.title
        || SECTION_META[id]?.defaultTitle
        || id;

    const hiddenOf = (id) => resumeData.hiddenEntries?.[id] || [];

    const {
        themeColor,
        personal = {},
        summary,
        experience = [],
        education = [],
        skills = [],
        projects = [],
        certifications = [],
        languages = [],
        interests = [],
        awards = [],
        organisations = [],
        publications = [],
        references = [],
        declaration = [],
        courses = [],
    } = resumeData;

    const photo = resumeData.photo || personal.photo;
    const editorSectionIds = getEditorSectionIds(selectedTemplate, resumeData);
    const twoPageEditor = !isOnePageTemplate(selectedTemplate);
    const pageLists = twoPageEditor ? getPageSectionLists(resumeData, selectedTemplate) : null;
    const hasSummary = editorSectionIds.includes('summary');

    const removePhoto = () =>
        setResumeData((prev) => ({
            ...prev,
            photo: '',
            personal: { ...(prev.personal || {}), photo: '' },
        }));

    const listStyleBar = (sectionId) => {
        const st = resumeData.sectionStyles?.[sectionId] || {};
        const listStyle = st.listStyle || resumeData.design?.listStyle || 'bullet';
        return (
            <div className="ref-style-bar">
                <span>Points</span>
                {CUSTOM_LIST_STYLES.map((ls) => (
                    <button key={ls} type="button" className={listStyle === ls ? 'is-on' : ''} onClick={() => updateSectionStyle(sectionId, 'listStyle', ls)}>{ls}</button>
                ))}
            </div>
        );
    };

    const renderListSection = (sectionId, items, renderForm, extra = {}) => {
        const isCustomBlock = String(sectionId).startsWith('cs_') || extra.customBlock;
        if (!items.length && !isCustomBlock) return null;
        const meta = SECTION_META[sectionId] || SECTION_META.custom;
        return (
            <div ref={(el) => { sectionRefs.current[sectionId] = el; }}>
                <ContentSection
                    sectionId={sectionId}
                    icon={meta.icon}
                    title={sectionTitle(sectionId)}
                    collapsed={!openSections[sectionId]}
                    onToggle={() => toggleSection(sectionId)}
                    editingHeading={editingHeading === sectionId}
                    onEditHeading={() => setEditingHeading(sectionId)}
                    onRename={(value) => renameSection(sectionId, value)}
                    onStopRename={() => setEditingHeading(null)}
                    items={items}
                    expandedIndex={expandedEntry[sectionId] ?? null}
                    setExpandedIndex={(index) => setExpandedEntry((prev) => ({ ...prev, [sectionId]: index }))}
                    hiddenIndexes={hiddenOf(sectionId)}
                    onHide={(i) => toggleHidden(sectionId, i)}
                    onRemove={extra.hideRemove ? undefined : (i) => (extra.onRemove ? extra.onRemove(i) : (isCustomBlock ? removeCustomItem(sectionId, i) : removeListItem(sectionId, i)))}
                    onAdd={extra.hideAdd ? undefined : () => (extra.onAdd ? extra.onAdd() : (isCustomBlock ? addCustomItem(sectionId) : addListItem(sectionId, meta.empty)))}
                    onRemoveSection={() => removeSection(sectionId)}
                    onReorder={extra.noReorder ? undefined : (from, to) => extra.onReorder ? extra.onReorder(from, to) : reorderList(sectionId, from, to)}
                    renderForm={renderForm}
                    hideAdd={extra.hideAdd}
                    styleBar={extra.styleBar === undefined ? listStyleBar(sectionId) : extra.styleBar}
                />
            </div>
        );
    };

    const previewFocusFromEvent = (target) => {
        const id = target?.id || '';
        if (id === 'personal-name') return 'name';
        if (id === 'personal-job-title') return 'role';
        if (id.startsWith('personal-')) return 'contact';
        return target?.closest?.('[data-section]')?.getAttribute('data-section') || null;
    };

    const renderCustomBlock = (block) => {
        const st = { listStyle: 'bullet', layout: 'entries', showDates: true, showSubtitle: true, ...(block.style || {}), ...(resumeData.sectionStyles?.[block.id] || {}) };
        return renderListSection(block.id, block.items || [], (item, i) => (
            <>
                <FormField label="Title" id={`${block.id}-title-${i}`}>
                    <input id={`${block.id}-title-${i}`} className="ref-input" value={item.title || item.name || ''} onChange={(e) => updateCustomItem(block.id, i, 'title', e.target.value)} placeholder="Entry title" />
                </FormField>
                {st.showSubtitle !== false && (
                    <FormField label="Subtitle / organization" id={`${block.id}-sub-${i}`}>
                        <input id={`${block.id}-sub-${i}`} className="ref-input" value={item.subtitle || ''} onChange={(e) => updateCustomItem(block.id, i, 'subtitle', e.target.value)} placeholder="Optional subtitle" />
                    </FormField>
                )}
                <div className="ref-grid-2">
                    {st.showDates !== false && (
                        <FormField label="Date" id={`${block.id}-date-${i}`}>
                            <input id={`${block.id}-date-${i}`} className="ref-input" value={item.date || ''} onChange={(e) => updateCustomItem(block.id, i, 'date', e.target.value)} placeholder="e.g. 2024" />
                        </FormField>
                    )}
                    <FormField label="Location" id={`${block.id}-loc-${i}`}>
                        <input id={`${block.id}-loc-${i}`} className="ref-input" value={item.location || ''} onChange={(e) => updateCustomItem(block.id, i, 'location', e.target.value)} placeholder="Optional" />
                    </FormField>
                </div>
                <FormField label={st.layout === 'bullets' ? 'Points (one per line)' : 'Description'} id={`${block.id}-desc-${i}`}>
                    <textarea id={`${block.id}-desc-${i}`} className="ref-textarea" rows={3} value={item.description || ''} onChange={(e) => updateCustomItem(block.id, i, 'description', e.target.value)} placeholder={st.layout === 'bullets' ? '• Point one\n• Point two' : 'Details...'} />
                </FormField>
            </>
        ), {
            customBlock: true,
            onAdd: () => addCustomItem(block.id),
            onRemove: (i) => removeCustomItem(block.id, i),
            styleBar: (
                <div className="ref-style-bar">
                    <span>Layout</span>
                    {CUSTOM_LAYOUTS.map((layout) => (
                        <button key={layout.id} type="button" className={st.layout === layout.id ? 'is-on' : ''} onClick={() => updateSectionStyle(block.id, 'layout', layout.id)}>{layout.label}</button>
                    ))}
                    <span>Points</span>
                    {CUSTOM_LIST_STYLES.map((ls) => (
                        <button key={ls} type="button" className={st.listStyle === ls ? 'is-on' : ''} onClick={() => updateSectionStyle(block.id, 'listStyle', ls)}>{ls}</button>
                    ))}
                    <label>
                        <input type="checkbox" checked={st.showDates !== false} onChange={(e) => updateSectionStyle(block.id, 'showDates', e.target.checked)} />
                        Dates
                    </label>
                    <label>
                        <input type="checkbox" checked={st.showSubtitle !== false} onChange={(e) => updateSectionStyle(block.id, 'showSubtitle', e.target.checked)} />
                        Subtitle
                    </label>
                </div>
            ),
            onReorder: (from, to) => {
                setResumeData((prev) => {
                    const current = listCustomSections(prev).find((item) => item.id === block.id);
                    if (!current) return prev;
                    const items = [...(current.items || [])];
                    const [moved] = items.splice(from, 1);
                    items.splice(to, 0, moved);
                    return { ...prev, customSections: upsertCustomSection(prev, { ...current, items }) };
                });
            },
        });
    };

    const renderEditorSection = (id) => {
        if (id === 'summary') {
            return hasSummary ? (
                <div ref={(el) => { sectionRefs.current.summary = el; }}>
                    <ContentSection
                        sectionId="summary"
                        icon={SECTION_META.summary.icon}
                        title={sectionTitle('summary')}
                        collapsed={!openSections.summary}
                        onToggle={() => toggleSection('summary')}
                        editingHeading={editingHeading === 'summary'}
                        onEditHeading={() => setEditingHeading('summary')}
                        onRename={(value) => renameSection('summary', value)}
                        onStopRename={() => setEditingHeading(null)}
                        items={[summary]}
                        expandedIndex={expandedEntry.summary ?? null}
                        setExpandedIndex={(index) => setExpandedEntry((prev) => ({ ...prev, summary: index }))}
                        hiddenIndexes={hiddenOf('summary')}
                        onHide={() => toggleHidden('summary', 0)}
                        onRemoveSection={() => removeSection('summary')}
                        hideAdd
                        renderForm={() => (
                            <textarea
                                id="summary-textarea"
                                className="ref-textarea"
                                rows={4}
                                value={summary}
                                onChange={(e) => updateSummary(e.target.value)}
                                placeholder="Write 2–3 sentences about your professional background, key skills, and career goals..."
                            />
                        )}
                    />
                </div>
            ) : null;
        }
        if (id === 'experience') {
            return renderListSection('experience', experience, (exp, i) => (
                <>
                    <div className="ref-grid-2">
                        <FormField label="Company" id={`exp-company-${i}`}>
                            <input id={`exp-company-${i}`} className="ref-input" value={exp.company || ''} onChange={(e) => updateListItem('experience', i, 'company', e.target.value)} placeholder="Company name" />
                        </FormField>
                        <FormField label="Role / Title" id={`exp-role-${i}`}>
                            <input id={`exp-role-${i}`} className="ref-input" value={exp.role || ''} onChange={(e) => updateListItem('experience', i, 'role', e.target.value)} placeholder="Your job title" />
                        </FormField>
                        <FormField label="Start Date" id={`exp-start-${i}`}>
                            <input id={`exp-start-${i}`} className="ref-input" value={exp.startDate || ''} onChange={(e) => updateListItem('experience', i, 'startDate', e.target.value)} placeholder="e.g. Jan 2022" />
                        </FormField>
                        <FormField label="End Date" id={`exp-end-${i}`}>
                            <input id={`exp-end-${i}`} className="ref-input" value={exp.endDate || ''} onChange={(e) => updateListItem('experience', i, 'endDate', e.target.value)} placeholder="e.g. Present" />
                        </FormField>
                        <FormField label="Location" id={`exp-loc-${i}`}>
                            <input id={`exp-loc-${i}`} className="ref-input" value={exp.location || ''} onChange={(e) => updateListItem('experience', i, 'location', e.target.value)} placeholder="City, Country" />
                        </FormField>
                    </div>
                    <FormField label="Description / Achievements" id={`exp-desc-${i}`}>
                        <textarea id={`exp-desc-${i}`} className="ref-textarea" rows={3} value={exp.description || ''} onChange={(e) => updateListItem('experience', i, 'description', e.target.value)} placeholder="Key responsibilities and achievements..." />
                    </FormField>
                </>
            ));
        }
        if (id === 'education') {
            return renderListSection('education', education, (edu, i) => (
                <div className="ref-grid-2">
                    <FormField label="Institution" id={`edu-inst-${i}`}>
                        <input id={`edu-inst-${i}`} className="ref-input" value={edu.institution || ''} onChange={(e) => updateListItem('education', i, 'institution', e.target.value)} placeholder="University / College name" />
                    </FormField>
                    <FormField label="Degree" id={`edu-deg-${i}`}>
                        <input id={`edu-deg-${i}`} className="ref-input" value={edu.degree || ''} onChange={(e) => updateListItem('education', i, 'degree', e.target.value)} placeholder="e.g. B.Tech, MBA" />
                    </FormField>
                    <FormField label="Field of Study" id={`edu-field-${i}`}>
                        <input id={`edu-field-${i}`} className="ref-input" value={edu.field || ''} onChange={(e) => updateListItem('education', i, 'field', e.target.value)} placeholder="e.g. Computer Science" />
                    </FormField>
                    <FormField label="GPA / Grade" id={`edu-gpa-${i}`}>
                        <input id={`edu-gpa-${i}`} className="ref-input" value={edu.gpa || ''} onChange={(e) => updateListItem('education', i, 'gpa', e.target.value)} placeholder="e.g. 8.5 / 10" />
                    </FormField>
                    <FormField label="Start Year" id={`edu-start-${i}`}>
                        <input id={`edu-start-${i}`} className="ref-input" value={edu.startYear || ''} onChange={(e) => updateListItem('education', i, 'startYear', e.target.value)} placeholder="e.g. 2019" />
                    </FormField>
                    <FormField label="End Year" id={`edu-end-${i}`}>
                        <input id={`edu-end-${i}`} className="ref-input" value={edu.endYear || ''} onChange={(e) => updateListItem('education', i, 'endYear', e.target.value)} placeholder="e.g. 2023" />
                    </FormField>
                </div>
            ));
        }
        if (id === 'skills') {
            return renderListSection('skills', skills, (skill, i) => (
                <div className="ref-skill-row">
                    <input className="ref-input ref-skill-name-input" value={typeof skill === 'string' ? skill : skill.name || ''} onChange={(e) => updateListItem('skills', i, 'name', e.target.value)} placeholder="Skill name" id={`skill-name-${i}`} />
                    <select className="ref-input ref-skill-level-select" value={typeof skill === 'string' ? '' : skill.level || ''} onChange={(e) => updateListItem('skills', i, 'level', e.target.value)} id={`skill-level-${i}`}>
                        <option value="">Level</option>
                        {SKILL_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                </div>
            ));
        }
        if (id === 'projects') {
            return renderListSection('projects', projects, (proj, i) => (
                <>
                    <div className="ref-grid-2">
                        <FormField label="Project Name" id={`proj-name-${i}`}>
                            <input id={`proj-name-${i}`} className="ref-input" value={proj.name || ''} onChange={(e) => updateListItem('projects', i, 'name', e.target.value)} placeholder="Project title" />
                        </FormField>
                        <FormField label="Link / URL" id={`proj-link-${i}`}>
                            <input id={`proj-link-${i}`} className="ref-input" value={proj.link || ''} onChange={(e) => updateListItem('projects', i, 'link', e.target.value)} placeholder="https://" />
                        </FormField>
                    </div>
                    <FormField label="Description" id={`proj-desc-${i}`}>
                        <textarea id={`proj-desc-${i}`} className="ref-textarea" rows={2} value={proj.description || ''} onChange={(e) => updateListItem('projects', i, 'description', e.target.value)} placeholder="What did you build and what impact did it have?" />
                    </FormField>
                    <FormField label="Technologies (comma-separated)" id={`proj-tech-${i}`}>
                        <input id={`proj-tech-${i}`} className="ref-input" value={(proj.technologies || []).join(', ')} onChange={(e) => updateTechs(i, e.target.value)} placeholder="React, Node.js, MongoDB" />
                    </FormField>
                </>
            ));
        }
        if (id === 'certifications') {
            return renderListSection('certifications', certifications, (cert, i) => (
                <div className="ref-grid-2">
                    <FormField label="Certification Name" id={`cert-name-${i}`}>
                        <input id={`cert-name-${i}`} className="ref-input" value={cert.name || ''} onChange={(e) => updateListItem('certifications', i, 'name', e.target.value)} placeholder="e.g. AWS Certified Developer" />
                    </FormField>
                    <FormField label="Issuing Organization" id={`cert-issuer-${i}`}>
                        <input id={`cert-issuer-${i}`} className="ref-input" value={cert.issuer || ''} onChange={(e) => updateListItem('certifications', i, 'issuer', e.target.value)} placeholder="e.g. Amazon Web Services" />
                    </FormField>
                    <FormField label="Date" id={`cert-date-${i}`}>
                        <input id={`cert-date-${i}`} className="ref-input" value={cert.date || ''} onChange={(e) => updateListItem('certifications', i, 'date', e.target.value)} placeholder="e.g. 2023" />
                    </FormField>
                    <FormField label="Certificate Link" id={`cert-link-${i}`}>
                        <input id={`cert-link-${i}`} className="ref-input" value={cert.link || ''} onChange={(e) => updateListItem('certifications', i, 'link', e.target.value)} placeholder="https://" />
                    </FormField>
                </div>
            ));
        }
        if (id === 'languages') {
            return renderListSection('languages', languages, (lang, i) => (
                <div className="ref-skill-row">
                    <input className="ref-input ref-skill-name-input" value={typeof lang === 'string' ? lang : lang.name || ''} onChange={(e) => updateListItem('languages', i, 'name', e.target.value)} placeholder="Language" id={`lang-name-${i}`} />
                    <select className="ref-input ref-skill-level-select" value={typeof lang === 'string' ? '' : lang.proficiency || ''} onChange={(e) => updateListItem('languages', i, 'proficiency', e.target.value)} id={`lang-prof-${i}`}>
                        <option value="">Proficiency</option>
                        {PROFICIENCY_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                </div>
            ));
        }
        if (id === 'interests') {
            return renderListSection('interests', interests, (item, i) => (
                <input className="ref-input" value={item.name || ''} onChange={(e) => updateListItem('interests', i, 'name', e.target.value)} placeholder="e.g. Photography, Hiking, Open Source" id={`interest-${i}`} />
            ));
        }
        if (id === 'awards') {
            return renderListSection('awards', awards, (award, i) => (
                <>
                    <div className="ref-grid-2">
                        <FormField label="Award Name" id={`award-name-${i}`}>
                            <input id={`award-name-${i}`} className="ref-input" value={award.name || ''} onChange={(e) => updateListItem('awards', i, 'name', e.target.value)} placeholder="Award title" />
                        </FormField>
                        <FormField label="Issuer / Organization" id={`award-issuer-${i}`}>
                            <input id={`award-issuer-${i}`} className="ref-input" value={award.issuer || ''} onChange={(e) => updateListItem('awards', i, 'issuer', e.target.value)} placeholder="Organization name" />
                        </FormField>
                        <FormField label="Date" id={`award-date-${i}`}>
                            <input id={`award-date-${i}`} className="ref-input" value={award.date || ''} onChange={(e) => updateListItem('awards', i, 'date', e.target.value)} placeholder="e.g. 2023" />
                        </FormField>
                    </div>
                    <FormField label="Description" id={`award-desc-${i}`}>
                        <textarea id={`award-desc-${i}`} className="ref-textarea" rows={2} value={award.description || ''} onChange={(e) => updateListItem('awards', i, 'description', e.target.value)} placeholder="Describe the award..." />
                    </FormField>
                </>
            ));
        }
        if (id === 'organisations') {
            return renderListSection('organisations', organisations, (org, i) => (
                <>
                    <div className="ref-grid-2">
                        <FormField label="Organisation Name" id={`org-name-${i}`}>
                            <input id={`org-name-${i}`} className="ref-input" value={org.name || ''} onChange={(e) => updateListItem('organisations', i, 'name', e.target.value)} placeholder="Organisation name" />
                        </FormField>
                        <FormField label="Role / Position" id={`org-role-${i}`}>
                            <input id={`org-role-${i}`} className="ref-input" value={org.role || ''} onChange={(e) => updateListItem('organisations', i, 'role', e.target.value)} placeholder="Your role" />
                        </FormField>
                        <FormField label="Start Date" id={`org-start-${i}`}>
                            <input id={`org-start-${i}`} className="ref-input" value={org.startDate || ''} onChange={(e) => updateListItem('organisations', i, 'startDate', e.target.value)} placeholder="e.g. Jan 2022" />
                        </FormField>
                        <FormField label="End Date" id={`org-end-${i}`}>
                            <input id={`org-end-${i}`} className="ref-input" value={org.endDate || ''} onChange={(e) => updateListItem('organisations', i, 'endDate', e.target.value)} placeholder="e.g. Present" />
                        </FormField>
                    </div>
                    <FormField label="Description" id={`org-desc-${i}`}>
                        <textarea id={`org-desc-${i}`} className="ref-textarea" rows={2} value={org.description || ''} onChange={(e) => updateListItem('organisations', i, 'description', e.target.value)} placeholder="Your involvement and contributions..." />
                    </FormField>
                </>
            ));
        }
        if (id === 'publications') {
            return renderListSection('publications', publications, (pub, i) => (
                <>
                    <div className="ref-grid-2">
                        <FormField label="Publication Title" id={`pub-name-${i}`}>
                            <input id={`pub-name-${i}`} className="ref-input" value={pub.name || ''} onChange={(e) => updateListItem('publications', i, 'name', e.target.value)} placeholder="Title of publication" />
                        </FormField>
                        <FormField label="Publisher / Journal" id={`pub-publisher-${i}`}>
                            <input id={`pub-publisher-${i}`} className="ref-input" value={pub.publisher || ''} onChange={(e) => updateListItem('publications', i, 'publisher', e.target.value)} placeholder="Publisher name" />
                        </FormField>
                        <FormField label="Date" id={`pub-date-${i}`}>
                            <input id={`pub-date-${i}`} className="ref-input" value={pub.date || ''} onChange={(e) => updateListItem('publications', i, 'date', e.target.value)} placeholder="e.g. 2023" />
                        </FormField>
                    </div>
                    <FormField label="Description" id={`pub-desc-${i}`}>
                        <textarea id={`pub-desc-${i}`} className="ref-textarea" rows={2} value={pub.description || ''} onChange={(e) => updateListItem('publications', i, 'description', e.target.value)} placeholder="Brief description of the publication..." />
                    </FormField>
                </>
            ));
        }
        if (id === 'references') {
            return renderListSection('references', references, (refItem, i) => (
                <div className="ref-grid-2">
                    <FormField label="Full Name" id={`ref-name-${i}`}>
                        <input id={`ref-name-${i}`} className="ref-input" value={refItem.name || ''} onChange={(e) => updateListItem('references', i, 'name', e.target.value)} placeholder="Reference name" />
                    </FormField>
                    <FormField label="Title / Relationship" id={`ref-title-${i}`}>
                        <input id={`ref-title-${i}`} className="ref-input" value={refItem.title || ''} onChange={(e) => updateListItem('references', i, 'title', e.target.value)} placeholder="e.g. Senior Manager" />
                    </FormField>
                    <FormField label="Company" id={`ref-company-${i}`}>
                        <input id={`ref-company-${i}`} className="ref-input" value={refItem.company || ''} onChange={(e) => updateListItem('references', i, 'company', e.target.value)} placeholder="Company name" />
                    </FormField>
                    <FormField label="Email" id={`ref-email-${i}`}>
                        <input id={`ref-email-${i}`} className="ref-input" value={refItem.email || ''} onChange={(e) => updateListItem('references', i, 'email', e.target.value)} placeholder="email@company.com" />
                    </FormField>
                    <FormField label="Phone" id={`ref-phone-${i}`}>
                        <input id={`ref-phone-${i}`} className="ref-input" value={refItem.phone || ''} onChange={(e) => updateListItem('references', i, 'phone', e.target.value)} placeholder="+1 555 000 0000" />
                    </FormField>
                </div>
            ));
        }
        if (id === 'courses') {
            return renderListSection('courses', courses, (course, i) => (
                <>
                    <div className="ref-grid-2">
                        <FormField label="Course Name" id={`course-name-${i}`}>
                            <input id={`course-name-${i}`} className="ref-input" value={course.name || ''} onChange={(e) => updateListItem('courses', i, 'name', e.target.value)} placeholder="Course title" />
                        </FormField>
                        <FormField label="Institution / Platform" id={`course-inst-${i}`}>
                            <input id={`course-inst-${i}`} className="ref-input" value={course.institution || ''} onChange={(e) => updateListItem('courses', i, 'institution', e.target.value)} placeholder="e.g. Coursera, Udemy" />
                        </FormField>
                        <FormField label="Date" id={`course-date-${i}`}>
                            <input id={`course-date-${i}`} className="ref-input" value={course.date || ''} onChange={(e) => updateListItem('courses', i, 'date', e.target.value)} placeholder="e.g. 2023" />
                        </FormField>
                    </div>
                    <FormField label="Description" id={`course-desc-${i}`}>
                        <textarea id={`course-desc-${i}`} className="ref-textarea" rows={2} value={course.description || ''} onChange={(e) => updateListItem('courses', i, 'description', e.target.value)} placeholder="What you learned..." />
                    </FormField>
                </>
            ));
        }
        if (id === 'declaration') {
            return renderListSection('declaration', declaration, (decl, i) => (
                <>
                    <FormField label="Declaration Text" id={`decl-text-${i}`}>
                        <textarea id={`decl-text-${i}`} className="ref-textarea" rows={3} value={decl.text || ''} onChange={(e) => updateListItem('declaration', i, 'text', e.target.value)} placeholder="I hereby declare that the information provided is accurate..." />
                    </FormField>
                    <div className="ref-grid-2">
                        <FormField label="Name" id={`decl-name-${i}`}>
                            <input id={`decl-name-${i}`} className="ref-input" value={decl.name || ''} onChange={(e) => updateListItem('declaration', i, 'name', e.target.value)} placeholder="Your name" />
                        </FormField>
                        <FormField label="Location" id={`decl-loc-${i}`}>
                            <input id={`decl-loc-${i}`} className="ref-input" value={decl.location || ''} onChange={(e) => updateListItem('declaration', i, 'location', e.target.value)} placeholder="City, Country" />
                        </FormField>
                        <FormField label="Date" id={`decl-date-${i}`}>
                            <input id={`decl-date-${i}`} className="ref-input" value={decl.date || ''} onChange={(e) => updateListItem('declaration', i, 'date', e.target.value)} placeholder="e.g. January 2024" />
                        </FormField>
                    </div>
                </>
            ));
        }
        if (id === 'custom' || String(id).startsWith('cs_')) {
            const block = listCustomSections(resumeData).find((item) => item.id === id)
                || (id === 'custom' ? { id: 'custom', items: resumeData.custom || [], style: {} } : null);
            return block ? renderCustomBlock(block) : null;
        }
        return null;
    };

    return (
        <div
            className="ref-form"
            onFocusCapture={(e) => onPreviewFocus?.(previewFocusFromEvent(e.target))}
            onBlurCapture={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) onPreviewFocus?.(null);
            }}
        >
            <div className="ref-title-section">
                <label className="ref-label">Resume Title</label>
                <input
                    className="ref-input"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. My Software Engineer Resume"
                    id="resume-title-input"
                />
            </div>

            <OverviewCard resumeData={resumeData} onSuggestion={handleSuggestion} supportsPhoto={supportsPhoto} />

            <div className="ref-section" ref={(el) => { sectionRefs.current.theme = el; }}>
                <button className="ref-section-toggle" type="button" onClick={() => toggleSection('theme')}>
                    <span className="ref-section-toggle-left">
                        <i className="fa-solid fa-palette"></i>
                        Theme Color
                    </span>
                    <i className={`fa-solid fa-chevron-${openSections.theme ? 'up' : 'down'} ref-chevron`}></i>
                </button>
                {openSections.theme && (
                    <div className="ref-section-body">
                        <div className="ref-theme-colors">
                            {THEME_COLORS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    className={`ref-color-swatch ${themeColor === color ? 'active' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => updateTheme(color)}
                                    title={color}
                                >
                                    {themeColor === color && <i className="fa-solid fa-check"></i>}
                                </button>
                            ))}
                            <div className="ref-color-custom">
                                <input
                                    type="color"
                                    value={themeColor || '#1A3A5C'}
                                    onChange={(e) => updateTheme(e.target.value)}
                                    title="Custom Color"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="ref-personal-card" data-section="personal" ref={(el) => { sectionRefs.current.personal = el; }}>
                {!editingPersonal ? (
                    <>
                        <button
                            type="button"
                            className="ref-personal-edit"
                            onClick={() => setEditingPersonal(true)}
                            aria-label="Edit personal information"
                        >
                            <i className="fa-solid fa-pen"></i>
                        </button>
                        <div className="ref-personal-preview">
                            <div className="ref-personal-info">
                                <h2>{personal.name || 'Your name'}</h2>
                                {personal.jobTitle && <p className="ref-personal-role">{personal.jobTitle}</p>}
                                <div className="ref-personal-meta">
                                    <span><i className="fa-solid fa-envelope"></i>{personal.email || 'email@example.com'}</span>
                                    <span><i className="fa-solid fa-phone"></i>{personal.phone || 'Phone'}</span>
                                    <span><i className="fa-solid fa-location-dot"></i>{personal.location || 'Address'}</span>
                                </div>
                            </div>
                            {supportsPhoto && (
                                <div className="ref-photo-wrap">
                                    <button
                                        type="button"
                                        className="ref-photo-slot"
                                        onClick={() => photoInputRef.current?.click()}
                                        title="Upload photo"
                                    >
                                        {photo ? <img src={photo} alt="Profile" /> : <i className="fa-solid fa-camera"></i>}
                                    </button>
                                    {photo && (
                                        <button
                                            type="button"
                                            className="ref-photo-clear"
                                            onClick={removePhoto}
                                            title="Remove photo"
                                        >
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="ref-personal-form">
                        <div className="ref-personal-form-head">
                            <h3>Personal Information</h3>
                            <button type="button" className="ref-done-btn" onClick={() => setEditingPersonal(false)}>Done</button>
                        </div>
                        {supportsPhoto && (
                            <div className="ref-personal-photo-row">
                                <div className="ref-photo-wrap">
                                    <button type="button" className="ref-photo-slot ref-photo-slot--form" onClick={() => photoInputRef.current?.click()}>
                                        {photo ? <img src={photo} alt="Profile" /> : <i className="fa-solid fa-camera"></i>}
                                    </button>
                                    {photo && (
                                        <button type="button" className="ref-photo-clear" onClick={removePhoto} title="Remove photo">
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    )}
                                </div>
                                <div>
                                    <p className="ref-photo-hint">Click to upload a profile photo</p>
                                    {photo && (
                                        <button type="button" className="ref-photo-remove" onClick={removePhoto}>
                                            Remove photo
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="ref-grid-2">
                            <FormField label="Full Name" id="personal-name">
                                <input id="personal-name" className="ref-input" type="text" value={personal.name || ''} onChange={(e) => updatePersonal('name', e.target.value)} placeholder="e.g. Alex Morgan" />
                            </FormField>
                            <FormField label="Job Title / Role" id="personal-job-title">
                                <input id="personal-job-title" className="ref-input" type="text" value={personal.jobTitle || ''} onChange={(e) => updatePersonal('jobTitle', e.target.value)} placeholder="e.g. Software Engineer" />
                            </FormField>
                            <FormField label="Email" id="personal-email">
                                <input id="personal-email" className="ref-input" type="email" value={personal.email || ''} onChange={(e) => updatePersonal('email', e.target.value)} placeholder="you@email.com" />
                            </FormField>
                            <FormField label="Phone" id="personal-phone">
                                <input id="personal-phone" className="ref-input" type="tel" value={personal.phone || ''} onChange={(e) => updatePersonal('phone', e.target.value)} placeholder="+91 98765 43210" />
                            </FormField>
                            <FormField label="Location" id="personal-location">
                                <input id="personal-location" className="ref-input" type="text" value={personal.location || ''} onChange={(e) => updatePersonal('location', e.target.value)} placeholder="City, Country" />
                            </FormField>
                            <FormField label="Website" id="personal-website">
                                <input id="personal-website" className="ref-input" type="url" value={personal.website || ''} onChange={(e) => updatePersonal('website', e.target.value)} placeholder="yoursite.com" />
                            </FormField>
                            <FormField label="LinkedIn" id="personal-linkedin">
                                <input id="personal-linkedin" className="ref-input" type="text" value={personal.linkedin || ''} onChange={(e) => updatePersonal('linkedin', e.target.value)} placeholder="linkedin.com/in/yourname" />
                            </FormField>
                            <FormField label="GitHub" id="personal-github">
                                <input id="personal-github" className="ref-input" type="text" value={personal.github || ''} onChange={(e) => updatePersonal('github', e.target.value)} placeholder="github.com/yourname" />
                            </FormField>
                        </div>
                    </div>
                )}
                {supportsPhoto && (
                    <input ref={photoInputRef} type="file" accept="image/*" hidden onChange={handlePhoto} />
                )}
            </div>

            {twoPageEditor ? (
                <>
                    <div className="ref-page-label">Page 1 · one column</div>
                    {pageLists.page1.filter((id) => editorSectionIds.includes(id)).map((id) => (
                        <React.Fragment key={id}>{renderEditorSection(id)}</React.Fragment>
                    ))}
                    <div className="ref-page-label">Page 2 · one column</div>
                    {pageLists.page2.filter((id) => editorSectionIds.includes(id)).map((id) => (
                        <React.Fragment key={id}>{renderEditorSection(id)}</React.Fragment>
                    ))}
                    {editorSectionIds.filter((id) => !pageLists.page1.includes(id) && !pageLists.page2.includes(id)).map((id) => (
                        <React.Fragment key={id}>{renderEditorSection(id)}</React.Fragment>
                    ))}
                </>
            ) : (
                editorSectionIds.map((id) => (
                    <React.Fragment key={id}>
                        {renderEditorSection(id)}
                    </React.Fragment>
                ))
            )}


            <button
                className="ref-add-content-btn"
                onClick={() => setShowAddModal(true)}
                type="button"
                id="add-content-btn"
            >
                <i className="fa-solid fa-plus"></i> Add Content
            </button>

            <AddContentModal
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                alreadyAdded={getAddedSections()}
                onAdd={handleAddSection}
                onImport={onImport}
                twoColumn={twoColumn}
            />
        </div>
    );
};

export default ResumeEditorForm;
