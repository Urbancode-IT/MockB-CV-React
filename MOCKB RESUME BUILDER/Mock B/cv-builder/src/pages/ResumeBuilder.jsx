import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';

import ResumeEditorForm from '../components/resume/ResumeEditorForm';
import ResumeTemplateRenderer from '../components/resume/ResumeTemplateRenderer';
import TemplateSelector from '../components/resume/TemplateSelector';
import JsonUploadModal from '../components/resume/JsonUploadModal';

import { createResume, getResumeById, updateResume } from '../services/resumeService';
import { DEFAULT_TEMPLATE } from '../config/templates';
import sampleResumeData from '../data/sampleResumeData';

import './ResumeBuilder.css';

// ======================================
// Default empty resume data structure
// ======================================

const defaultResumeData = {
    personal: {
        name: '',
        jobTitle: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        linkedin: '',
        github: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
};

const sectionOptions = [
    { id: 'summary', label: 'Professional Summary', icon: 'fa-user' },
    { id: 'experience', label: 'Work Experience', icon: 'fa-briefcase' },
    { id: 'education', label: 'Education', icon: 'fa-graduation-cap' },
    { id: 'skills', label: 'Skills', icon: 'fa-lightbulb' },
    { id: 'projects', label: 'Projects', icon: 'fa-code' },
    { id: 'certifications', label: 'Certifications', icon: 'fa-certificate' },
    { id: 'languages', label: 'Languages', icon: 'fa-language' },
];

// ======================================
// ResumeBuilder Page
//
// Routes:
//   /resume/builder       — new resume
//   /resume/builder/:id   — edit existing
//
// Data flow:
//   Editor form → resumeData state
//   resumeData → ResumeTemplateRenderer (live preview)
//   Save button → backend API
//   Template selector → selectedTemplate string only
//                       (resumeData unchanged)
// ======================================

export default function ResumeBuilder() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // ── Core state ──
    const [title, setTitle] = useState('Untitled Resume');
    const [selectedTemplate, setSelectedTemplate] = useState(
        location.state?.template || DEFAULT_TEMPLATE
    );
    // Initialize with sample data if it's a new resume
    const [resumeData, setResumeData] = useState(id ? defaultResumeData : sampleResumeData);
    const [resumeId, setResumeId] = useState(id || null);

    // ── UI state ──
    const [activePanel, setActivePanel] = useState('editor'); // 'editor' | 'customize' | 'templates'
    const [draggedSection, setDraggedSection] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null); // null | 'saved' | 'error'
    const [loading, setLoading] = useState(!!id);
    const [error, setError] = useState(null);
    const [showMobilePreview, setShowMobilePreview] = useState(() => typeof window !== 'undefined' && window.innerWidth < 900);
    const [showJsonModal, setShowJsonModal] = useState(false);
    const [showDownloadPreview, setShowDownloadPreview] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const saveStatusTimer = useRef(null);
    const downloadPreviewRef = useRef(null);
    // ── Load existing resume from backend ──
    useEffect(() => {
        if (!id) return;

        const loadResume = async () => {
            try {
                setLoading(true);
                const response = await getResumeById(id);
                const resume = response.data;

                setTitle(resume.title || 'Untitled Resume');
                setSelectedTemplate(resume.template || DEFAULT_TEMPLATE);
                setResumeData(resume.data || defaultResumeData);
                setResumeId(resume._id);
            } catch (err) {
                setError(err.message || 'Failed to load resume');
            } finally {
                setLoading(false);
            }
        };

        loadResume();
    }, [id]);

    // ── Handle template change
    // IMPORTANT: Only the template changes — resumeData stays intact ──
    const handleTemplateSelect = useCallback(async (templateId) => {
        setSelectedTemplate(templateId);

        // If resume already saved, update only the template field
        if (resumeId) {
            try {
                await updateResume(resumeId, { template: templateId });
            } catch (err) {
                // Silently fail — template will still change in UI
                console.error('Failed to persist template change:', err);
            }
        }
    }, [resumeId]);

    // ── Save / Update ──
    const handleSave = useCallback(async () => {
        setSaving(true);
        setSaveStatus(null);

        try {
            const payload = {
                title: title || 'Untitled Resume',
                template: selectedTemplate,
                data: resumeData,
            };

            let saved;
            if (resumeId) {
                const response = await updateResume(resumeId, payload);
                saved = response.data;
            } else {
                const response = await createResume(payload);
                saved = response.data;
                setResumeId(saved._id);
                // Update URL without re-mounting
                navigate(`/resume/customizer/${saved._id}`, { replace: true });
            }

            setSaveStatus('saved');

        } catch (err) {
            setSaveStatus('error');
            console.error('Save failed:', err);
        } finally {
            setSaving(false);

            // Clear status after 3s
            if (saveStatusTimer.current) clearTimeout(saveStatusTimer.current);
            saveStatusTimer.current = setTimeout(() => setSaveStatus(null), 3000);
        }
    }, [title, selectedTemplate, resumeData, resumeId, navigate]);

    const handleDownload = () => setShowDownloadPreview(true);

    // The resume remains visible while html2canvas captures it. Capturing the
    // actual resume wrapper directly prevents pagebreak / scaling issues.
    const confirmDownload = async () => {
        const preview = downloadPreviewRef.current;
        if (!preview) return;
        const resumeWrapper = preview.querySelector('.resume-design-wrapper') || preview;
        setDownloading(true);
        try {
            const html2canvas = (await import('html2canvas')).default;
            const { jsPDF } = await import('jspdf');
            const fileName = `${(title || 'resume').trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'resume'}.pdf`;

            const pageWidthMm = 210;
            const pageHeightMm = 297;
            const pxPerMm = 3.7795275591;
            const canvas = await html2canvas(resumeWrapper, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                width: resumeWrapper.scrollWidth,
                height: resumeWrapper.scrollHeight,
                windowWidth: resumeWrapper.scrollWidth,
                windowHeight: resumeWrapper.scrollHeight,
                scrollX: 0,
                scrollY: 0,
                x: 0,
                y: 0,
            });

            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF({ unit: 'mm', format: [pageWidthMm, pageHeightMm], orientation: 'portrait' });
            pdf.addImage(imgData, 'PNG', 0, 0, pageWidthMm, pageHeightMm);
            pdf.save(fileName);
            setShowDownloadPreview(false);
        } catch (err) {
            console.error('Resume PDF export failed:', err);
            alert('Unable to create the PDF. Please try again.');
        } finally {
            setDownloading(false);
        }
    };

    // ── Handle JSON Upload (from modal) ──
    const handleJsonApply = (parsedData) => {
        setResumeData((prev) => ({ ...prev, ...parsedData }));
    };

    const design = resumeData.design || {};
    const sectionOrder = resumeData.sectionOrder?.length
        ? resumeData.sectionOrder
        : sectionOptions.map((section) => section.id);

    const updateDesign = (field, value) => {
        setResumeData((prev) => ({ ...prev, design: { ...(prev.design || {}), [field]: value } }));
    };

    const reorderSections = (sourceId, targetId) => {
        if (!sourceId || sourceId === targetId) return;
        setResumeData((prev) => {
            const current = prev.sectionOrder?.length ? prev.sectionOrder : sectionOptions.map((section) => section.id);
            const next = [...current];
            const sourceIndex = next.indexOf(sourceId);
            const targetIndex = next.indexOf(targetId);
            if (sourceIndex < 0 || targetIndex < 0) return prev;
            next.splice(sourceIndex, 1);
            next.splice(targetIndex, 0, sourceId);
            return { ...prev, sectionOrder: next };
        });
        setDraggedSection(null);
    };

    // ── Cleanup timer ──
    useEffect(() => {
        return () => {
            if (saveStatusTimer.current) clearTimeout(saveStatusTimer.current);
        };
    }, []);

    // ── Loading state ──
    if (loading) {
        return (
            <div className="rb-loading">
                <div className="rb-loading-spinner"></div>
                <p>Loading resume...</p>
            </div>
        );
    }

    // ── Error state ──
    if (error) {
        return (
            <div className="rb-error">
                <i className="fa-solid fa-circle-exclamation"></i>
                <h3>Could not load resume</h3>
                <p>{error}</p>
                <Link to="/resume/customizer" className="rb-error-btn">
                    Start a New Resume
                </Link>
            </div>
        );
    }

    return (
        <div className="rb-page">

            {/* ── TOP NAVBAR ── */}
            <div className="rb-nav">
                <div className="rb-nav-left">
                    <Link to="/" className="rb-nav-logo">
                        <i className="fa-solid fa-file-lines"></i>
                        MockB-CV
                    </Link>
                    <div className="rb-nav-divider"></div>
                    <input
                        className="rb-nav-title-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Resume title..."
                        aria-label="Resume title"
                        id="rb-title-input"
                    />
                </div>

                <div className="rb-nav-center">
                    <button
                        className={`rb-nav-tab ${activePanel === 'editor' ? 'rb-nav-tab--active' : ''}`}
                        onClick={() => setActivePanel('editor')}
                        id="rb-tab-editor"
                    >
                        <i className="fa-solid fa-pen-to-square"></i>
                        <span>Edit</span>
                    </button>
                    <button
                        className={`rb-nav-tab ${activePanel === 'customize' ? 'rb-nav-tab--active' : ''}`}
                        onClick={() => setActivePanel('customize')}
                        id="rb-tab-customize"
                    >
                        <i className="fa-solid fa-sliders"></i>
                        <span>Customize</span>
                    </button>
                    <button
                        className={`rb-nav-tab ${activePanel === 'templates' ? 'rb-nav-tab--active' : ''}`}
                        onClick={() => setActivePanel('templates')}
                        id="rb-tab-templates"
                    >
                        <i className="fa-solid fa-table-cells-large"></i>
                        <span>Templates</span>
                    </button>
                </div>

                <div className="rb-nav-right">
                    {/* Mobile preview toggle */}
                    <button
                        className="rb-nav-btn rb-nav-btn--icon"
                        onClick={() => setShowMobilePreview(p => !p)}
                        title="Toggle Preview"
                        id="rb-toggle-preview"
                    >
                        <i className="fa-solid fa-eye"></i>
                    </button>

                    {/* Upload JSON - opens modal */}
                    <button
                        className="rb-nav-btn rb-nav-btn--outline"
                        onClick={() => setShowJsonModal(true)}
                        title="Import resume data from JSON"
                    >
                        <i className="fa-solid fa-file-import"></i>
                        <span>Upload JSON</span>
                    </button>

                    {/* Download */}
                    <button
                        className="rb-nav-btn rb-nav-btn--outline"
                        onClick={handleDownload}
                        id="rb-download-btn"
                    >
                        <i className="fa-solid fa-download"></i>
                        <span>Download PDF</span>
                    </button>

                    {/* Save */}
                    <button
                        className={`rb-nav-btn rb-nav-btn--primary ${saving ? 'rb-nav-btn--loading' : ''} ${saveStatus === 'saved' ? 'rb-nav-btn--saved' : ''} ${saveStatus === 'error' ? 'rb-nav-btn--error' : ''}`}
                        onClick={handleSave}
                        disabled={saving}
                        id="rb-save-btn"
                    >
                        {saving ? (
                            <><i className="fa-solid fa-spinner fa-spin"></i> Saving...</>
                        ) : saveStatus === 'saved' ? (
                            <><i className="fa-solid fa-check"></i> Saved!</>
                        ) : saveStatus === 'error' ? (
                            <><i className="fa-solid fa-triangle-exclamation"></i> Error</>
                        ) : (
                            <><i className="fa-solid fa-floppy-disk"></i> Save</>
                        )}
                    </button>
                </div>
            </div>

            {/* ── MAIN LAYOUT ── */}
            <div className="rb-main">

                {/* LEFT PANEL — Editor or Template Selector */}
                <div className={`rb-panel-left ${showMobilePreview ? 'rb-panel-left--hidden' : ''}`}>
                    {activePanel === 'editor' ? (
                        <ResumeEditorForm
                            resumeData={resumeData}
                            setResumeData={setResumeData}
                            title={title}
                            setTitle={setTitle}
                        />
                    ) : activePanel === 'customize' ? (
                        <div className="rb-customize-panel">
                            <div className="rb-customize-heading">
                                <h2>Customize resume</h2>
                                <p>Drag sections to change their order. Every setting updates the preview instantly.</p>
                            </div>

                            <div className="rb-customize-group">
                                <h3>Section order</h3>
                                <div className="rb-section-sort-list">
                                    {sectionOrder.map((sectionId) => {
                                        const section = sectionOptions.find((item) => item.id === sectionId);
                                        if (!section) return null;
                                        return (
                                            <div
                                                key={section.id}
                                                className={`rb-sort-row ${draggedSection === section.id ? 'rb-sort-row--dragging' : ''}`}
                                                draggable
                                                onDragStart={(event) => { setDraggedSection(section.id); event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', section.id); }}
                                                onDragOver={(event) => event.preventDefault()}
                                                onDrop={(event) => { event.preventDefault(); reorderSections(draggedSection || event.dataTransfer.getData('text/plain'), section.id); }}
                                                onDragEnd={() => setDraggedSection(null)}
                                            >
                                                <i className="fa-solid fa-grip-vertical rb-sort-grip"></i>
                                                <i className={`fa-solid ${section.icon} rb-sort-icon`}></i>
                                                <span>{section.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="rb-customize-group">
                                <h3>Page & typography</h3>
                                <label className="rb-control-label">Page size
                                    <select value={design.pageSize || 'a4'} onChange={(event) => updateDesign('pageSize', event.target.value)} className="rb-control-input">
                                        <option value="a4">A4 (210 × 297 mm)</option>
                                        <option value="letter">US Letter (216 × 279 mm)</option>
                                    </select>
                                </label>
                                <label className="rb-control-label">Font family
                                    <select value={design.fontFamily || 'Arial, sans-serif'} onChange={(event) => updateDesign('fontFamily', event.target.value)} className="rb-control-input">
                                        <option value="Arial, sans-serif">Arial</option>
                                        <option value="Georgia, serif">Georgia</option>
                                        <option value="'Times New Roman', serif">Times New Roman</option>
                                        <option value="Verdana, sans-serif">Verdana</option>
                                    </select>
                                </label>
                                {[
                                    { label: 'Font size', field: 'fontSize', value: design.fontSize || 11, min: 8, max: 16, unit: 'pt' },
                                    { label: 'Line height', field: 'lineHeight', value: design.lineHeight || 1.4, min: 1, max: 2, step: 0.1, unit: '' },
                                    { label: 'Section spacing', field: 'sectionSpacing', value: design.sectionSpacing || 18, min: 4, max: 36, unit: 'px' },
                                ].map((control) => (
                                    <label className="rb-control-label" key={control.field}>{control.label}: <strong>{control.value}{control.unit}</strong>
                                        <input type="range" min={control.min} max={control.max} step={control.step || 1} value={control.value} onChange={(event) => updateDesign(control.field, Number(event.target.value))} />
                                    </label>
                                ))}
                                <label className="rb-control-label">Accent color
                                    <input type="color" value={resumeData.themeColor || '#1A3A5C'} onChange={(event) => setResumeData((prev) => ({ ...prev, themeColor: event.target.value }))} />
                                </label>
                            </div>
                        </div>
                    ) : (
                        <TemplateSelector
                            selectedTemplate={selectedTemplate}
                            onSelect={handleTemplateSelect}
                        />
                    )}
                </div>

                {/* RIGHT PANEL — Live Preview */}
                <div className={`rb-panel-right ${showMobilePreview ? 'rb-panel-right--visible' : ''}`}>
                    <div className="rb-preview-header">
                        <span className="rb-preview-label">
                            <i className="fa-solid fa-eye"></i>
                            Live Preview
                        </span>
                        <span className="rb-template-badge">
                            {selectedTemplate.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        </span>
                    </div>

                    <div className="rb-preview-scroll">
                        <div className="rb-preview-scale-wrap">
                            <ResumeTemplateRenderer
                                template={selectedTemplate}
                                resumeData={resumeData}
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* ── PRINT ONLY — rendered resume without UI chrome ── */}
            <div className="rb-print-only">
                <ResumeTemplateRenderer
                    template={selectedTemplate}
                    resumeData={resumeData}
                />
            </div>

            {/* ── JSON Upload Modal ── */}
            <JsonUploadModal
                isOpen={showJsonModal}
                onClose={() => setShowJsonModal(false)}
                onApply={handleJsonApply}
            />

            {showDownloadPreview && (
                <div className="rb-download-modal" role="dialog" aria-modal="true" aria-label="Confirm PDF download">
                    <div className="rb-download-dialog">
                        <div className="rb-download-modal-header">
                            <div>
                                <h2>Preview your PDF</h2>
                                <p>This is exactly the resume that will be downloaded.</p>
                            </div>
                            <button className="rb-download-close" onClick={() => !downloading && setShowDownloadPreview(false)} aria-label="Close preview">×</button>
                        </div>
                        <div className="rb-download-preview-scroll">
                            <div className="rb-download-resume" ref={downloadPreviewRef}>
                                <ResumeTemplateRenderer template={selectedTemplate} resumeData={resumeData} />
                            </div>
                        </div>
                        <div className="rb-download-modal-actions">
                            <button className="rb-nav-btn rb-nav-btn--outline" onClick={() => setShowDownloadPreview(false)} disabled={downloading}>Cancel</button>
                            <button className="rb-nav-btn rb-nav-btn--primary" onClick={confirmDownload} disabled={downloading}>
                                {downloading ? <><i className="fa-solid fa-spinner fa-spin"></i> Preparing PDF...</> : <><i className="fa-solid fa-download"></i> Confirm Download</>}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
