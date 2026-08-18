import React, { useState, useRef, useEffect } from 'react';
import './ResumeEditorForm.css';

// ======================================
// ResumeEditorForm
//
// Props:
//   resumeData      — the current resume data object
//   setResumeData   — state setter to update it
//   title           — resume title string
//   setTitle        — state setter for title
//
// All form changes update the parent's resumeData
// which automatically re-renders the live preview.
// ======================================

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
const EMPTY_CUSTOM_ENTRY = { title: '', description: '' };

const PROFICIENCY_LEVELS = ['Beginner', 'Elementary', 'Conversational', 'Proficient', 'Fluent', 'Native/Bilingual'];
const SKILL_LEVELS = ['Beginner', 'Amateur', 'Competent', 'Proficient', 'Expert'];

// All add-able section types with their metadata
const ADD_CONTENT_SECTIONS = [
    { id: 'summary',       label: 'Summary',               icon: 'fa-file-invoice',     desc: 'Add a short summary of your key strengths, experience, and career goals.' },
    { id: 'education',     label: 'Education',              icon: 'fa-graduation-cap',   desc: 'Add your degrees and schools. Include honors or details.' },
    { id: 'experience',    label: 'Professional Experience',icon: 'fa-briefcase',        desc: 'Add your professional roles and employer history.' },
    { id: 'skills',        label: 'Skills',                 icon: 'fa-lightbulb',        desc: 'Add your hard and soft skills that help you stand out from the crowd.' },
    { id: 'languages',     label: 'Languages',              icon: 'fa-language',         desc: 'Add your languages and proficiency level.' },
    { id: 'certifications',label: 'Certificates',           icon: 'fa-certificate',      desc: 'Add your industry certificates or licences.' },
    { id: 'interests',     label: 'Interests',              icon: 'fa-heart',            desc: 'Add personal interests that support your career story.' },
    { id: 'projects',      label: 'Projects',               icon: 'fa-diagram-project',  desc: 'Add key projects you participated in and highlight impact.' },
    { id: 'courses',       label: 'Courses',                icon: 'fa-book',             desc: 'Add online or in-person courses and training.' },
    { id: 'awards',        label: 'Awards',                 icon: 'fa-trophy',           desc: 'Add awards and recognitions from competitions/academia.' },
    { id: 'organisations', label: 'Organisations',          icon: 'fa-users',            desc: 'Add memberships or volunteering with organizations.' },
    { id: 'publications',  label: 'Publications',           icon: 'fa-book-open',        desc: 'Add publications, articles, or books you wrote.' },
    { id: 'references',    label: 'References',             icon: 'fa-user-group',       desc: 'Add references from managers or coworkers.' },
    { id: 'declaration',   label: 'Declaration',            icon: 'fa-signature',        desc: 'Add declaration by creating or uploading your signature.' },
    { id: 'custom',        label: 'Custom',                 icon: 'fa-asterisk',         desc: 'Add a custom section for anything else cleanly.' },
];

// Dummy data for each section type
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

function SectionHeader({ icon, title, open, onToggle }) {
    return (
        <button className="ref-section-toggle" onClick={onToggle} type="button">
            <span className="ref-section-toggle-left">
                <i className={`fa-solid ${icon}`}></i>
                {title}
            </span>
            <i className={`fa-solid fa-chevron-${open ? 'up' : 'down'} ref-chevron`}></i>
        </button>
    );
}

function FormField({ label, id, children }) {
    return (
        <div className="ref-field">
            {label && <label className="ref-label" htmlFor={id}>{label}</label>}
            {children}
        </div>
    );
}

const THEME_COLORS = ['#1A3A5C', '#4A90D9', '#E74C3C', '#27AE60', '#8E44AD', '#333333', '#D35400', '#16A085'];

// ── Add Content Modal ──
function AddContentModal({ open, onClose, alreadyAdded, onAdd }) {
    const modalRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="ref-modal-overlay" onClick={onClose}>
            <div className="ref-modal-card" ref={modalRef} onClick={(e) => e.stopPropagation()}>
                <div className="ref-modal-header">
                    <div className="ref-modal-header-left">
                        <h2>Add content</h2>
                    </div>
                    <button className="ref-modal-close" onClick={onClose} aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="ref-modal-grid">
                    {ADD_CONTENT_SECTIONS.map((sec) => {
                        const isAdded = alreadyAdded.includes(sec.id);
                        return (
                            <div
                                key={sec.id}
                                className={`ref-modal-item ${isAdded ? 'ref-modal-item--added' : ''}`}
                                onClick={() => { if (!isAdded) { onAdd(sec.id); onClose(); } }}
                                title={isAdded ? 'Already added' : `Add ${sec.label}`}
                            >
                                <div className="ref-modal-item-icon">
                                    <i className={`fa-solid ${sec.icon}`}></i>
                                </div>
                                <h4>{sec.label}</h4>
                                <p>{sec.desc}</p>
                                {isAdded && <div className="ref-modal-item-added-badge"><i className="fa-solid fa-check"></i></div>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

const ResumeEditorForm = ({ resumeData, setResumeData, title, setTitle }) => {
    const [openSections, setOpenSections] = useState({
        theme: true,
        personal: true,
        summary: true,
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
    });

    const [showAddModal, setShowAddModal] = useState(false);
    const sectionRefs = useRef({});

    const toggleSection = (key) =>
        setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

    // ── Generic data updaters ──

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
            updated[index] = { ...updated[index], [field]: val };
            return { ...prev, [section]: updated };
        });

    const addListItem = (section, empty) =>
        setResumeData((prev) => ({
            ...prev,
            [section]: [...(prev[section] || []), { ...empty }],
        }));

    const removeListItem = (section, index) =>
        setResumeData((prev) => ({
            ...prev,
            [section]: (prev[section] || []).filter((_, i) => i !== index),
        }));

    const updateTechs = (index, val) =>
        setResumeData((prev) => {
            const projects = [...(prev.projects || [])];
            projects[index] = {
                ...projects[index],
                technologies: val.split(',').map((t) => t.trim()).filter(Boolean),
            };
            return { ...prev, projects };
        });

    // Determine which sections are currently in the resume data
    const getAddedSections = () => {
        const added = [];
        const data = resumeData;
        if (data.summary) added.push('summary');
        if (data.experience?.length > 0) added.push('experience');
        if (data.education?.length > 0) added.push('education');
        if (data.skills?.length > 0) added.push('skills');
        if (data.projects?.length > 0) added.push('projects');
        if (data.certifications?.length > 0) added.push('certifications');
        if (data.languages?.length > 0) added.push('languages');
        if (data.interests?.length > 0) added.push('interests');
        if (data.awards?.length > 0) added.push('awards');
        if (data.organisations?.length > 0) added.push('organisations');
        if (data.publications?.length > 0) added.push('publications');
        if (data.references?.length > 0) added.push('references');
        if (data.declaration?.length > 0) added.push('declaration');
        if (data.courses?.length > 0) added.push('courses');
        if (data.custom?.length > 0) added.push('custom');
        return added;
    };

    const handleAddSection = (sectionId) => {
        const dummy = DUMMY_DATA[sectionId];
        setResumeData((prev) => {
            const next = { ...prev };
            if (sectionId === 'summary') {
                next.summary = dummy;
            } else {
                next[sectionId] = Array.isArray(dummy) ? [...dummy] : [dummy];
            }
            return next;
        });
        // Open the section after adding
        setOpenSections((prev) => ({ ...prev, [sectionId]: true }));
        // Scroll to section after a brief delay
        setTimeout(() => {
            const ref = sectionRefs.current[sectionId];
            if (ref) ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
    };

    const { themeColor, personal = {}, summary = '', experience = [], education = [], skills = [], projects = [], certifications = [], languages = [], interests = [], awards = [], organisations = [], publications = [], references = [], declaration = [], courses = [], custom = [] } = resumeData;

    return (
        <div className="ref-form">

            {/* Resume Title */}
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

            {/* ── THEME & SETTINGS ── */}
            <div className="ref-section" ref={(el) => sectionRefs.current['theme'] = el}>
                <SectionHeader icon="fa-palette" title="Theme Color" open={openSections.theme} onToggle={() => toggleSection('theme')} />
                {openSections.theme && (
                    <div className="ref-section-body">
                        <div className="ref-theme-colors">
                            {THEME_COLORS.map(color => (
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

            {/* ── PERSONAL INFO ── */}
            <div className="ref-section" ref={(el) => sectionRefs.current['personal'] = el}>
                <SectionHeader icon="fa-user" title="Personal Information" open={openSections.personal} onToggle={() => toggleSection('personal')} />
                {openSections.personal && (
                    <div className="ref-section-body">
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
            </div>

            {/* ── SUMMARY ── */}
            {(summary !== undefined && summary !== null) && (
                <div className="ref-section" ref={(el) => sectionRefs.current['summary'] = el}>
                    <div className="ref-section-header-wrap">
                        <SectionHeader icon="fa-align-left" title="Professional Summary" open={openSections.summary} onToggle={() => toggleSection('summary')} />
                        <button className="ref-section-remove" title="Remove section" onClick={() => setResumeData(prev => ({ ...prev, summary: '' }))} type="button">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    {openSections.summary && (
                        <div className="ref-section-body">
                            <textarea
                                id="summary-textarea"
                                className="ref-textarea"
                                rows={4}
                                value={summary}
                                onChange={(e) => updateSummary(e.target.value)}
                                placeholder="Write 2–3 sentences about your professional background, key skills, and career goals..."
                            />
                        </div>
                    )}
                </div>
            )}

            {/* ── EXPERIENCE ── */}
            {experience.length > 0 && (
                <div className="ref-section" ref={(el) => sectionRefs.current['experience'] = el}>
                    <div className="ref-section-header-wrap">
                        <SectionHeader icon="fa-briefcase" title="Work Experience" open={openSections.experience} onToggle={() => toggleSection('experience')} />
                        <button className="ref-section-remove" title="Remove section" onClick={() => setResumeData(prev => ({ ...prev, experience: [] }))} type="button">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    {openSections.experience && (
                        <div className="ref-section-body">
                            {experience.map((exp, i) => (
                                <div key={i} className="ref-entry-card">
                                    <div className="ref-entry-card-header">
                                        <span className="ref-entry-label">Experience {i + 1}</span>
                                        <button className="ref-remove-btn" onClick={() => removeListItem('experience', i)} type="button" title="Remove">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
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
                                </div>
                            ))}
                            <button className="ref-add-btn" onClick={() => addListItem('experience', EMPTY_EXPERIENCE)} type="button">
                                <i className="fa-solid fa-plus"></i> Add Experience
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ── EDUCATION ── */}
            {education.length > 0 && (
                <div className="ref-section" ref={(el) => sectionRefs.current['education'] = el}>
                    <div className="ref-section-header-wrap">
                        <SectionHeader icon="fa-graduation-cap" title="Education" open={openSections.education} onToggle={() => toggleSection('education')} />
                        <button className="ref-section-remove" title="Remove section" onClick={() => setResumeData(prev => ({ ...prev, education: [] }))} type="button">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    {openSections.education && (
                        <div className="ref-section-body">
                            {education.map((edu, i) => (
                                <div key={i} className="ref-entry-card">
                                    <div className="ref-entry-card-header">
                                        <span className="ref-entry-label">Education {i + 1}</span>
                                        <button className="ref-remove-btn" onClick={() => removeListItem('education', i)} type="button" title="Remove">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
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
                                </div>
                            ))}
                            <button className="ref-add-btn" onClick={() => addListItem('education', EMPTY_EDUCATION)} type="button">
                                <i className="fa-solid fa-plus"></i> Add Education
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ── SKILLS ── */}
            {skills.length > 0 && (
                <div className="ref-section" ref={(el) => sectionRefs.current['skills'] = el}>
                    <div className="ref-section-header-wrap">
                        <SectionHeader icon="fa-star" title="Skills" open={openSections.skills} onToggle={() => toggleSection('skills')} />
                        <button className="ref-section-remove" title="Remove section" onClick={() => setResumeData(prev => ({ ...prev, skills: [] }))} type="button">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    {openSections.skills && (
                        <div className="ref-section-body">
                            <div className="ref-skills-list">
                                {skills.map((skill, i) => (
                                    <div key={i} className="ref-skill-row">
                                        <input
                                            className="ref-input ref-skill-name-input"
                                            value={typeof skill === 'string' ? skill : skill.name || ''}
                                            onChange={(e) => updateListItem('skills', i, 'name', e.target.value)}
                                            placeholder="Skill name"
                                            id={`skill-name-${i}`}
                                        />
                                        <select
                                            className="ref-input ref-skill-level-select"
                                            value={typeof skill === 'string' ? '' : skill.level || ''}
                                            onChange={(e) => updateListItem('skills', i, 'level', e.target.value)}
                                            id={`skill-level-${i}`}
                                        >
                                            <option value="">Level</option>
                                            {SKILL_LEVELS.map(l => (
                                                <option key={l} value={l}>{l}</option>
                                            ))}
                                        </select>
                                        <button className="ref-remove-btn" onClick={() => removeListItem('skills', i)} type="button">
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button className="ref-add-btn" onClick={() => addListItem('skills', { ...EMPTY_SKILL })} type="button">
                                <i className="fa-solid fa-plus"></i> Add Skill
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ── PROJECTS ── */}
            {projects.length > 0 && (
                <div className="ref-section" ref={(el) => sectionRefs.current['projects'] = el}>
                    <div className="ref-section-header-wrap">
                        <SectionHeader icon="fa-code" title="Projects" open={openSections.projects} onToggle={() => toggleSection('projects')} />
                        <button className="ref-section-remove" title="Remove section" onClick={() => setResumeData(prev => ({ ...prev, projects: [] }))} type="button">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    {openSections.projects && (
                        <div className="ref-section-body">
                            {projects.map((proj, i) => (
                                <div key={i} className="ref-entry-card">
                                    <div className="ref-entry-card-header">
                                        <span className="ref-entry-label">Project {i + 1}</span>
                                        <button className="ref-remove-btn" onClick={() => removeListItem('projects', i)} type="button">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
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
                                </div>
                            ))}
                            <button className="ref-add-btn" onClick={() => addListItem('projects', { ...EMPTY_PROJECT, technologies: [] })} type="button">
                                <i className="fa-solid fa-plus"></i> Add Project
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ── CERTIFICATIONS ── */}
            {certifications.length > 0 && (
                <div className="ref-section" ref={(el) => sectionRefs.current['certifications'] = el}>
                    <div className="ref-section-header-wrap">
                        <SectionHeader icon="fa-certificate" title="Certifications" open={openSections.certifications} onToggle={() => toggleSection('certifications')} />
                        <button className="ref-section-remove" title="Remove section" onClick={() => setResumeData(prev => ({ ...prev, certifications: [] }))} type="button">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    {openSections.certifications && (
                        <div className="ref-section-body">
                            {certifications.map((cert, i) => (
                                <div key={i} className="ref-entry-card">
                                    <div className="ref-entry-card-header">
                                        <span className="ref-entry-label">Certification {i + 1}</span>
                                        <button className="ref-remove-btn" onClick={() => removeListItem('certifications', i)} type="button">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
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
                                </div>
                            ))}
                            <button className="ref-add-btn" onClick={() => addListItem('certifications', { ...EMPTY_CERT })} type="button">
                                <i className="fa-solid fa-plus"></i> Add Certification
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ── LANGUAGES ── */}
            {languages.length > 0 && (
                <div className="ref-section" ref={(el) => sectionRefs.current['languages'] = el}>
                    <div className="ref-section-header-wrap">
                        <SectionHeader icon="fa-language" title="Languages" open={openSections.languages} onToggle={() => toggleSection('languages')} />
                        <button className="ref-section-remove" title="Remove section" onClick={() => setResumeData(prev => ({ ...prev, languages: [] }))} type="button">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    {openSections.languages && (
                        <div className="ref-section-body">
                            <div className="ref-skills-list">
                                {languages.map((lang, i) => (
                                    <div key={i} className="ref-skill-row">
                                        <input
                                            className="ref-input ref-skill-name-input"
                                            value={typeof lang === 'string' ? lang : lang.name || ''}
                                            onChange={(e) => updateListItem('languages', i, 'name', e.target.value)}
                                            placeholder="Language"
                                            id={`lang-name-${i}`}
                                        />
                                        <select
                                            className="ref-input ref-skill-level-select"
                                            value={typeof lang === 'string' ? '' : lang.proficiency || ''}
                                            onChange={(e) => updateListItem('languages', i, 'proficiency', e.target.value)}
                                            id={`lang-prof-${i}`}
                                        >
                                            <option value="">Proficiency</option>
                                            {PROFICIENCY_LEVELS.map(l => (
                                                <option key={l} value={l}>{l}</option>
                                            ))}
                                        </select>
                                        <button className="ref-remove-btn" onClick={() => removeListItem('languages', i)} type="button">
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button className="ref-add-btn" onClick={() => addListItem('languages', { ...EMPTY_LANG })} type="button">
                                <i className="fa-solid fa-plus"></i> Add Language
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ── INTERESTS ── */}
            {interests.length > 0 && (
                <div className="ref-section" ref={(el) => sectionRefs.current['interests'] = el}>
                    <div className="ref-section-header-wrap">
                        <SectionHeader icon="fa-heart" title="Interests" open={openSections.interests} onToggle={() => toggleSection('interests')} />
                        <button className="ref-section-remove" title="Remove section" onClick={() => setResumeData(prev => ({ ...prev, interests: [] }))} type="button">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    {openSections.interests && (
                        <div className="ref-section-body">
                            <div className="ref-interests-list">
                                {interests.map((item, i) => (
                                    <div key={i} className="ref-interest-row">
                                        <input
                                            className="ref-input"
                                            value={item.name || ''}
                                            onChange={(e) => updateListItem('interests', i, 'name', e.target.value)}
                                            placeholder="e.g. Photography, Hiking, Open Source"
                                            id={`interest-${i}`}
                                        />
                                        <button className="ref-remove-btn" onClick={() => removeListItem('interests', i)} type="button">
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button className="ref-add-btn" onClick={() => addListItem('interests', { ...EMPTY_INTEREST })} type="button">
                                <i className="fa-solid fa-plus"></i> Add Interest
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ── AWARDS ── */}
            {awards.length > 0 && (
                <div className="ref-section" ref={(el) => sectionRefs.current['awards'] = el}>
                    <div className="ref-section-header-wrap">
                        <SectionHeader icon="fa-trophy" title="Awards" open={openSections.awards} onToggle={() => toggleSection('awards')} />
                        <button className="ref-section-remove" title="Remove section" onClick={() => setResumeData(prev => ({ ...prev, awards: [] }))} type="button">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    {openSections.awards && (
                        <div className="ref-section-body">
                            {awards.map((award, i) => (
                                <div key={i} className="ref-entry-card">
                                    <div className="ref-entry-card-header">
                                        <span className="ref-entry-label">Award {i + 1}</span>
                                        <button className="ref-remove-btn" onClick={() => removeListItem('awards', i)} type="button">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
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
                                </div>
                            ))}
                            <button className="ref-add-btn" onClick={() => addListItem('awards', { ...EMPTY_AWARD })} type="button">
                                <i className="fa-solid fa-plus"></i> Add Award
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ── ORGANISATIONS ── */}
            {organisations.length > 0 && (
                <div className="ref-section" ref={(el) => sectionRefs.current['organisations'] = el}>
                    <div className="ref-section-header-wrap">
                        <SectionHeader icon="fa-users" title="Organisations" open={openSections.organisations} onToggle={() => toggleSection('organisations')} />
                        <button className="ref-section-remove" title="Remove section" onClick={() => setResumeData(prev => ({ ...prev, organisations: [] }))} type="button">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    {openSections.organisations && (
                        <div className="ref-section-body">
                            {organisations.map((org, i) => (
                                <div key={i} className="ref-entry-card">
                                    <div className="ref-entry-card-header">
                                        <span className="ref-entry-label">Organisation {i + 1}</span>
                                        <button className="ref-remove-btn" onClick={() => removeListItem('organisations', i)} type="button">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
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
                                </div>
                            ))}
                            <button className="ref-add-btn" onClick={() => addListItem('organisations', { ...EMPTY_ORGANISATION })} type="button">
                                <i className="fa-solid fa-plus"></i> Add Organisation
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ── PUBLICATIONS ── */}
            {publications.length > 0 && (
                <div className="ref-section" ref={(el) => sectionRefs.current['publications'] = el}>
                    <div className="ref-section-header-wrap">
                        <SectionHeader icon="fa-book-open" title="Publications" open={openSections.publications} onToggle={() => toggleSection('publications')} />
                        <button className="ref-section-remove" title="Remove section" onClick={() => setResumeData(prev => ({ ...prev, publications: [] }))} type="button">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    {openSections.publications && (
                        <div className="ref-section-body">
                            {publications.map((pub, i) => (
                                <div key={i} className="ref-entry-card">
                                    <div className="ref-entry-card-header">
                                        <span className="ref-entry-label">Publication {i + 1}</span>
                                        <button className="ref-remove-btn" onClick={() => removeListItem('publications', i)} type="button">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
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
                                </div>
                            ))}
                            <button className="ref-add-btn" onClick={() => addListItem('publications', { ...EMPTY_PUBLICATION })} type="button">
                                <i className="fa-solid fa-plus"></i> Add Publication
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ── REFERENCES ── */}
            {references.length > 0 && (
                <div className="ref-section" ref={(el) => sectionRefs.current['references'] = el}>
                    <div className="ref-section-header-wrap">
                        <SectionHeader icon="fa-user-group" title="References" open={openSections.references} onToggle={() => toggleSection('references')} />
                        <button className="ref-section-remove" title="Remove section" onClick={() => setResumeData(prev => ({ ...prev, references: [] }))} type="button">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    {openSections.references && (
                        <div className="ref-section-body">
                            {references.map((ref, i) => (
                                <div key={i} className="ref-entry-card">
                                    <div className="ref-entry-card-header">
                                        <span className="ref-entry-label">Reference {i + 1}</span>
                                        <button className="ref-remove-btn" onClick={() => removeListItem('references', i)} type="button">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                    <div className="ref-grid-2">
                                        <FormField label="Full Name" id={`ref-name-${i}`}>
                                            <input id={`ref-name-${i}`} className="ref-input" value={ref.name || ''} onChange={(e) => updateListItem('references', i, 'name', e.target.value)} placeholder="Reference name" />
                                        </FormField>
                                        <FormField label="Title / Relationship" id={`ref-title-${i}`}>
                                            <input id={`ref-title-${i}`} className="ref-input" value={ref.title || ''} onChange={(e) => updateListItem('references', i, 'title', e.target.value)} placeholder="e.g. Senior Manager" />
                                        </FormField>
                                        <FormField label="Company" id={`ref-company-${i}`}>
                                            <input id={`ref-company-${i}`} className="ref-input" value={ref.company || ''} onChange={(e) => updateListItem('references', i, 'company', e.target.value)} placeholder="Company name" />
                                        </FormField>
                                        <FormField label="Email" id={`ref-email-${i}`}>
                                            <input id={`ref-email-${i}`} className="ref-input" value={ref.email || ''} onChange={(e) => updateListItem('references', i, 'email', e.target.value)} placeholder="email@company.com" />
                                        </FormField>
                                        <FormField label="Phone" id={`ref-phone-${i}`}>
                                            <input id={`ref-phone-${i}`} className="ref-input" value={ref.phone || ''} onChange={(e) => updateListItem('references', i, 'phone', e.target.value)} placeholder="+1 555 000 0000" />
                                        </FormField>
                                    </div>
                                </div>
                            ))}
                            <button className="ref-add-btn" onClick={() => addListItem('references', { ...EMPTY_REFERENCE })} type="button">
                                <i className="fa-solid fa-plus"></i> Add Reference
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ── COURSES ── */}
            {courses.length > 0 && (
                <div className="ref-section" ref={(el) => sectionRefs.current['courses'] = el}>
                    <div className="ref-section-header-wrap">
                        <SectionHeader icon="fa-book" title="Courses" open={openSections.courses} onToggle={() => toggleSection('courses')} />
                        <button className="ref-section-remove" title="Remove section" onClick={() => setResumeData(prev => ({ ...prev, courses: [] }))} type="button">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    {openSections.courses && (
                        <div className="ref-section-body">
                            {courses.map((course, i) => (
                                <div key={i} className="ref-entry-card">
                                    <div className="ref-entry-card-header">
                                        <span className="ref-entry-label">Course {i + 1}</span>
                                        <button className="ref-remove-btn" onClick={() => removeListItem('courses', i)} type="button">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
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
                                </div>
                            ))}
                            <button className="ref-add-btn" onClick={() => addListItem('courses', { ...EMPTY_COURSE })} type="button">
                                <i className="fa-solid fa-plus"></i> Add Course
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ── DECLARATION ── */}
            {declaration.length > 0 && (
                <div className="ref-section" ref={(el) => sectionRefs.current['declaration'] = el}>
                    <div className="ref-section-header-wrap">
                        <SectionHeader icon="fa-signature" title="Declaration" open={openSections.declaration} onToggle={() => toggleSection('declaration')} />
                        <button className="ref-section-remove" title="Remove section" onClick={() => setResumeData(prev => ({ ...prev, declaration: [] }))} type="button">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    {openSections.declaration && (
                        <div className="ref-section-body">
                            {declaration.map((decl, i) => (
                                <div key={i} className="ref-entry-card">
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
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ── CUSTOM SECTION ── */}
            {custom.length > 0 && (
                <div className="ref-section" ref={(el) => sectionRefs.current['custom'] = el}>
                    <div className="ref-section-header-wrap">
                        <SectionHeader icon="fa-asterisk" title="Custom Section" open={openSections.custom} onToggle={() => toggleSection('custom')} />
                        <button className="ref-section-remove" title="Remove section" onClick={() => setResumeData(prev => ({ ...prev, custom: [] }))} type="button">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    {openSections.custom && (
                        <div className="ref-section-body">
                            {custom.map((item, i) => (
                                <div key={i} className="ref-entry-card">
                                    <div className="ref-entry-card-header">
                                        <span className="ref-entry-label">Entry {i + 1}</span>
                                        <button className="ref-remove-btn" onClick={() => removeListItem('custom', i)} type="button">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                    <FormField label="Title" id={`custom-title-${i}`}>
                                        <input id={`custom-title-${i}`} className="ref-input" value={item.title || ''} onChange={(e) => updateListItem('custom', i, 'title', e.target.value)} placeholder="Entry title" />
                                    </FormField>
                                    <FormField label="Description" id={`custom-desc-${i}`}>
                                        <textarea id={`custom-desc-${i}`} className="ref-textarea" rows={3} value={item.description || ''} onChange={(e) => updateListItem('custom', i, 'description', e.target.value)} placeholder="Your custom content..." />
                                    </FormField>
                                </div>
                            ))}
                            <button className="ref-add-btn" onClick={() => addListItem('custom', { ...EMPTY_CUSTOM_ENTRY })} type="button">
                                <i className="fa-solid fa-plus"></i> Add Entry
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ── ADD CONTENT BUTTON ── */}
            <button
                className="ref-add-content-btn"
                onClick={() => setShowAddModal(true)}
                type="button"
                id="add-content-btn"
            >
                <i className="fa-solid fa-plus"></i> Add Content
            </button>

            {/* ── ADD CONTENT MODAL ── */}
            <AddContentModal
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                alreadyAdded={getAddedSections()}
                onAdd={handleAddSection}
            />

        </div>
    );
};

export default ResumeEditorForm;
