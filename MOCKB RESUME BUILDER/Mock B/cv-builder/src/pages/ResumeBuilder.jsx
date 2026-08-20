import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, useLocation, useBlocker } from 'react-router-dom';

import ResumeEditorForm from '../components/resume/ResumeEditorForm';
import ResumePagedView from '../components/resume/ResumePagedView';
import TemplateSelector from '../components/resume/TemplateSelector';
import CustomizePanel from '../components/resume/CustomizePanel';
import JsonUploadModal from '../components/resume/JsonUploadModal';

import { createResume, getResumeById, updateResume } from '../services/resumeService';
import { DEFAULT_TEMPLATE, resolveTemplateId, getTemplateById, isTwoColumnTemplate } from '../config/templates';
import { withPortraitDefaults } from '../config/portraitDefaults';
import { flattenColumnSections, moveColumnSection as moveColumn, normalizeColumnSections, columnsWithActiveSections } from '../config/columnLayout';
import { sampleForTemplate, blankForTemplate } from '../data/sampleResumeData';
import { saveResumeDraft, loadResumeDraft, clearResumeDraft, saveUserTemplate, updateUserTemplate, upsertYourWorkTemplate } from '../utils/userLibrary';
import { captureDesignSnapshot } from '../config/resumeDesign';

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
    awards: [],
};

const snapshotOf = (title, template, data) => JSON.stringify({ title, template, data });

const applySavedDesign = (data, state = {}) => {
    if (!state.savedDesign && !state.themeColor && !state.savedSectionOrder && !state.savedColumnSections) return data;
    return {
        ...data,
        themeColor: state.themeColor || state.savedDesign?.accentColor || data.themeColor,
        design: { ...(data.design || {}), ...(state.savedDesign || {}) },
        sectionOrder: state.savedSectionOrder?.length ? state.savedSectionOrder : data.sectionOrder,
        columnSections: state.savedColumnSections || data.columnSections,
    };
};

const sectionOptions = [
    { id: 'summary', label: 'Professional Summary', icon: 'fa-user' },
    { id: 'experience', label: 'Work Experience', icon: 'fa-briefcase' },
    { id: 'education', label: 'Education', icon: 'fa-graduation-cap' },
    { id: 'skills', label: 'Skills', icon: 'fa-lightbulb' },
    { id: 'projects', label: 'Projects', icon: 'fa-diagram-project' },
    { id: 'certifications', label: 'Certificates', icon: 'fa-certificate' },
    { id: 'languages', label: 'Languages', icon: 'fa-language' },
    { id: 'interests', label: 'Interests', icon: 'fa-heart' },
    { id: 'courses', label: 'Courses', icon: 'fa-book' },
    { id: 'awards', label: 'Awards', icon: 'fa-trophy' },
    { id: 'organisations', label: 'Organisations', icon: 'fa-users' },
    { id: 'publications', label: 'Publications', icon: 'fa-book-open' },
    { id: 'references', label: 'References', icon: 'fa-user-group' },
    { id: 'declaration', label: 'Declaration', icon: 'fa-signature' },
    { id: 'custom', label: 'Custom', icon: 'fa-asterisk' },
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
    const draft = !id && location.state?.restoreDraft ? loadResumeDraft() : null;

    const [title, setTitle] = useState(draft?.title || 'Untitled Resume');
    const [selectedTemplate, setSelectedTemplate] = useState(
        resolveTemplateId(draft?.selectedTemplate || location.state?.template || DEFAULT_TEMPLATE)
    );
    const [resumeData, setResumeData] = useState(() => {
        if (id) return defaultResumeData;
        if (draft?.resumeData) return draft.resumeData;
        const templateId = resolveTemplateId(location.state?.template || DEFAULT_TEMPLATE);
        const base = location.state?.startMode === 'blank'
            ? blankForTemplate(templateId)
            : sampleForTemplate(templateId);
        return applySavedDesign(base, location.state || {});
    });
    const [resumeId, setResumeId] = useState(draft?.resumeId || id || null);
    const [userTemplateId, setUserTemplateId] = useState(
        draft?.userTemplateId || location.state?.userTemplateId || null
    );
    const [userTemplateName, setUserTemplateName] = useState(
        draft?.userTemplateName || location.state?.userTemplateName || ''
    );

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
    const [leaveOpen, setLeaveOpen] = useState(false);
    const [templateNameOpen, setTemplateNameOpen] = useState(false);
    const [templateName, setTemplateName] = useState('');
    const [templateSaved, setTemplateSaved] = useState(false);
    const [previewFocus, setPreviewFocus] = useState(null);

    const saveStatusTimer = useRef(null);
    const downloadPreviewRef = useRef(null);
    const lastSavedRef = useRef(snapshotOf(title, selectedTemplate, resumeData));
    const skipBlockRef = useRef(false);
    const currentSnapRef = useRef(snapshotOf(title, selectedTemplate, resumeData));
    currentSnapRef.current = snapshotOf(title, selectedTemplate, resumeData);
    const dirty = currentSnapRef.current !== lastSavedRef.current;

    const blocker = useBlocker(({ currentLocation, nextLocation }) => {
        if (skipBlockRef.current) return false;
        const stayingInEditor = currentLocation.pathname.startsWith('/resume/customizer')
            && nextLocation.pathname.startsWith('/resume/customizer');
        return currentSnapRef.current !== lastSavedRef.current && !stayingInEditor;
    });

    useEffect(() => {
        if (selectedTemplate !== 'portrait-profile') return;
        setResumeData((prev) => {
            if (prev.startBlank) {
                const next = {
                    ...prev,
                    columnSections: prev.columnSections || { left: [], right: [] },
                    design: {
                        ...(prev.design || {}),
                        columns: prev.design?.columns === 'mix' ? 'mix' : 'two',
                        headerPos: prev.design?.headerPos === 'right' ? 'right' : prev.design?.headerPos === 'top' ? 'top' : 'left',
                        leftWidth: prev.design?.leftWidth || 35,
                        accentColor: prev.design?.accentColor || getTemplateById('portrait-profile').accentColor,
                    },
                };
                return JSON.stringify(next) === JSON.stringify(prev) ? prev : next;
            }
            const normalized = withPortraitDefaults(prev);
            const next = {
                ...normalized,
                columnSections: normalizeColumnSections(normalized),
                design: {
                    ...(normalized.design || {}),
                    columns: normalized.design?.columns === 'mix' ? 'mix' : 'two',
                    headerPos: normalized.design?.headerPos === 'right' ? 'right' : normalized.design?.headerPos === 'top' ? 'top' : 'left',
                    leftWidth: normalized.design?.leftWidth || 35,
                    accentColor: normalized.design?.accentColor || getTemplateById('portrait-profile').accentColor,
                },
            };
            return JSON.stringify(next) === JSON.stringify(prev) ? prev : next;
        });
    }, [selectedTemplate]);
    // ── Load existing resume from backend ──
    useEffect(() => {
        if (!id) return;

        const loadResume = async () => {
            try {
                setLoading(true);
                const response = await getResumeById(id);
                const resume = response.data;

                setTitle(resume.title || 'Untitled Resume');
                const nextTemplate = resolveTemplateId(resume.template || DEFAULT_TEMPLATE);
                const nextData = resume.data || defaultResumeData;
                setSelectedTemplate(nextTemplate);
                setResumeData(
                    nextTemplate === 'portrait-profile' && !nextData.startBlank
                        ? withPortraitDefaults(nextData)
                        : nextData
                );
                setResumeId(resume._id);
                lastSavedRef.current = snapshotOf(resume.title || 'Untitled Resume', nextTemplate, nextTemplate === 'portrait-profile' && !nextData.startBlank ? withPortraitDefaults(nextData) : nextData);
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
        const nextTemplate = resolveTemplateId(templateId);
        setSelectedTemplate(nextTemplate);

        if (nextTemplate === 'portrait-profile') {
            setResumeData((prev) => {
                if (prev.startBlank) {
                    return {
                        ...prev,
                        columnSections: prev.columnSections || { left: [], right: [] },
                        design: {
                            ...(prev.design || {}),
                            columns: 'two',
                            headerPos: 'left',
                            leftWidth: prev.design?.leftWidth || 35,
                            accentColor: prev.design?.accentColor || getTemplateById(nextTemplate).accentColor,
                        },
                    };
                }
                const next = withPortraitDefaults(prev);
                return {
                    ...next,
                    columnSections: normalizeColumnSections(next),
                    design: {
                        ...(next.design || {}),
                        columns: 'two',
                        headerPos: 'left',
                        leftWidth: next.design?.leftWidth || 35,
                        accentColor: next.design?.accentColor || getTemplateById(nextTemplate).accentColor,
                    },
                    themeColor: prev.themeColor || next.design?.accentColor || getTemplateById(nextTemplate).accentColor,
                };
            });
        } else {
            setResumeData((prev) => ({
                ...prev,
                sectionOrder: flattenColumnSections(prev),
                design: {
                    ...(prev.design || {}),
                    columns: 'one',
                    headerPos: 'top',
                    accentColor: prev.design?.accentColor || getTemplateById(nextTemplate).accentColor,
                },
            }));
        }

        if (resumeId) {
            try {
                await updateResume(resumeId, { template: nextTemplate });
            } catch (err) {
                console.error('Failed to persist template change:', err);
            }
        }
    }, [resumeId]);

    // ── Save / Update ──
    const persistUserWorkCopy = useCallback(() => {
        const accent = resumeData.themeColor
            || resumeData.design?.accentColor
            || getTemplateById(selectedTemplate)?.accentColor;
        const payload = {
            baseTemplate: selectedTemplate,
            baseName: getTemplateById(selectedTemplate)?.name,
            design: captureDesignSnapshot(resumeData, accent),
            themeColor: accent,
            sectionOrder: resumeData.sectionOrder,
            columnSections: resumeData.columnSections,
        };
        if (userTemplateId) {
            return updateUserTemplate(userTemplateId, payload)
                || upsertYourWorkTemplate({ ...payload, existingId: userTemplateId });
        }
        return upsertYourWorkTemplate(payload);
    }, [userTemplateId, resumeData, selectedTemplate]);

    const handleSave = useCallback(async () => {
        setSaving(true);
        setSaveStatus(null);
        const work = persistUserWorkCopy();
        if (work) {
            setUserTemplateId(work.id);
            setUserTemplateName(work.name);
        }
        saveResumeDraft({
            resumeId: resumeId || null,
            title,
            selectedTemplate,
            resumeData,
            userTemplateId: work?.id || userTemplateId,
            userTemplateName: work?.name || userTemplateName,
        });
        lastSavedRef.current = snapshotOf(title, selectedTemplate, resumeData);

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
                saveResumeDraft({
                    resumeId: saved._id,
                    title,
                    selectedTemplate,
                    resumeData,
                    userTemplateId: work?.id || userTemplateId,
                    userTemplateName: work?.name || userTemplateName,
                });
                navigate(`/resume/customizer/${saved._id}`, { replace: true });
            }

            setSaveStatus('saved');
            return true;
        } catch (err) {
            setSaveStatus('error');
            console.error('Save failed:', err);
            return true;
        } finally {
            setSaving(false);
            if (saveStatusTimer.current) clearTimeout(saveStatusTimer.current);
            saveStatusTimer.current = setTimeout(() => setSaveStatus(null), 3000);
        }
    }, [title, selectedTemplate, resumeData, resumeId, navigate, persistUserWorkCopy, userTemplateId, userTemplateName]);

    useEffect(() => {
        if (blocker.state === 'blocked') setLeaveOpen(true);
    }, [blocker.state]);

    useEffect(() => {
        const onBeforeUnload = (event) => {
            if (currentSnapRef.current === lastSavedRef.current) return;
            event.preventDefault();
            event.returnValue = '';
        };
        window.addEventListener('beforeunload', onBeforeUnload);
        return () => window.removeEventListener('beforeunload', onBeforeUnload);
    }, []);

    const goToBlockedLocation = (next) => {
        setLeaveOpen(false);
        if (!next) return;
        navigate(next.pathname + next.search + next.hash, {
            state: next.state,
            replace: Boolean(next.replace),
        });
    };

    const closeLeavePrompt = () => {
        setLeaveOpen(false);
        skipBlockRef.current = false;
        if (blocker.state === 'blocked') blocker.reset();
    };

    const leaveWithoutSaving = () => {
        skipBlockRef.current = true;
        const next = blocker.location;
        if (blocker.state === 'blocked') blocker.reset();
        clearResumeDraft();
        lastSavedRef.current = snapshotOf(title, selectedTemplate, resumeData);
        goToBlockedLocation(next);
    };

    const saveAndLeave = async () => {
        skipBlockRef.current = true;
        const next = blocker.location;
        if (blocker.state === 'blocked') blocker.reset();
        await handleSave();
        goToBlockedLocation(next);
    };

    const handleSaveAsTemplate = () => {
        const baseName = getTemplateById(selectedTemplate)?.name || 'Template';
        setTemplateName(userTemplateName || `${baseName} – Your work`);
        setTemplateNameOpen(true);
        setTemplateSaved(false);
    };

    const confirmSaveAsTemplate = () => {
        const accent = resumeData.themeColor
            || resumeData.design?.accentColor
            || getTemplateById(selectedTemplate)?.accentColor;
        const payload = {
            name: templateName,
            baseTemplate: selectedTemplate,
            design: captureDesignSnapshot(resumeData, accent),
            themeColor: accent,
            sectionOrder: resumeData.sectionOrder,
            columnSections: resumeData.columnSections,
        };
        const saved = userTemplateId
            ? (updateUserTemplate(userTemplateId, payload) || saveUserTemplate(payload))
            : saveUserTemplate(payload);
        setUserTemplateId(saved.id);
        setUserTemplateName(saved.name);
        saveResumeDraft({
            resumeId: resumeId || null,
            title,
            selectedTemplate,
            resumeData,
            userTemplateId: saved.id,
            userTemplateName: saved.name,
        });
        lastSavedRef.current = snapshotOf(title, selectedTemplate, resumeData);
        setTemplateSaved(true);
        setTimeout(() => {
            setTemplateNameOpen(false);
            setTemplateSaved(false);
        }, 900);
    };

    const handleDownload = () => setShowDownloadPreview(true);

    // The resume remains visible while html2canvas captures it. Capturing the
    // actual resume wrapper directly prevents pagebreak / scaling issues.
    const confirmDownload = async () => {
        const preview = downloadPreviewRef.current;
        if (!preview) return;
        const resumeWrapper = preview.querySelector('.cm-resume')
            || preview.querySelector('.ss-resume')
            || preview.querySelector('.pp-resume')
            || preview.querySelector('[data-resume-capture]')?.querySelector('.resume-design-wrapper')
            || preview.querySelector('.resume-design-wrapper')
            || preview;
        setDownloading(true);
        try {
            const html2canvas = (await import('html2canvas')).default;
            const { jsPDF } = await import('jspdf');
            const fileName = `${(title || 'resume').trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'resume'}.pdf`;

            const isLetter = resumeData.design?.pageSize === 'letter';
            const pageWidthMm = isLetter ? 216 : 210;
            const pageHeightMm = isLetter ? 279 : 297;
            const canvas = await html2canvas(resumeWrapper, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                foreignObjectRendering: false,
                logging: false,
                width: Math.max(resumeWrapper.scrollWidth, resumeWrapper.offsetWidth, 1),
                height: Math.max(resumeWrapper.scrollHeight, resumeWrapper.offsetHeight, 1),
                windowWidth: Math.max(resumeWrapper.scrollWidth, resumeWrapper.offsetWidth, 1),
                windowHeight: Math.max(resumeWrapper.scrollHeight, resumeWrapper.offsetHeight, 1),
                scrollX: 0,
                scrollY: 0,
                x: 0,
                y: 0,
                onclone: (_doc, cloned) => {
                    cloned.querySelectorAll('*').forEach((el) => {
                        const style = el.getAttribute('style');
                        if (style && style.includes('color-mix')) {
                            el.setAttribute('style', style.replace(/color-mix\([^)]+\)/g, '#e8f4f1'));
                        }
                    });
                },
            });
            if (!canvas.width || !canvas.height) {
                throw new Error('Empty PDF canvas');
            }

            const pdf = new jsPDF({ unit: 'mm', format: [pageWidthMm, pageHeightMm], orientation: 'portrait' });
            const pageHeightPx = (pageHeightMm / pageWidthMm) * canvas.width;
            const remainder = canvas.height % pageHeightPx;
            let totalPages = Math.max(1, Math.ceil(canvas.height / pageHeightPx));
            if (totalPages > 1 && remainder > 0 && remainder < pageHeightPx * 0.04) {
                totalPages -= 1;
            }

            for (let page = 0; page < totalPages; page += 1) {
                const sourceY = page * pageHeightPx;
                const sliceHeight = Math.min(pageHeightPx, canvas.height - sourceY);
                const pageCanvas = document.createElement('canvas');
                pageCanvas.width = canvas.width;
                pageCanvas.height = Math.ceil(pageHeightPx);
                const ctx = pageCanvas.getContext('2d');
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
                ctx.drawImage(
                    canvas,
                    0,
                    sourceY,
                    canvas.width,
                    sliceHeight,
                    0,
                    0,
                    canvas.width,
                    sliceHeight
                );
                if (page > 0) pdf.addPage([pageWidthMm, pageHeightMm], 'portrait');
                pdf.addImage(pageCanvas.toDataURL('image/png', 1.0), 'PNG', 0, 0, pageWidthMm, pageHeightMm);
            }
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

    const moveColumnSection = (sourceId, targetColumn, targetId) => {
        if (!sourceId) return;
        setResumeData((prev) => {
            const columns = columnsWithActiveSections(prev);
            const nextColumns = moveColumn(columns, sourceId, targetColumn, targetId);
            return {
                ...prev,
                columnSections: nextColumns,
                sectionOrder: [...nextColumns.left, ...nextColumns.right],
            };
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
                    <button type="button" className="rb-nav-logo" onClick={() => navigate('/')}>
                        <i className="fa-solid fa-file-lines"></i>
                        MockB-CV
                    </button>
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
                <div className={`rb-panel-left ${activePanel === 'templates' ? 'rb-panel-left--templates' : ''} ${activePanel === 'customize' ? 'rb-panel-left--customize' : ''} ${activePanel === 'customize' && isTwoColumnTemplate(selectedTemplate) && resumeData.design?.columns !== 'one' ? 'rb-panel-left--customize-split' : ''} ${showMobilePreview ? 'rb-panel-left--hidden' : ''}`}>
                    {activePanel === 'editor' ? (
                        <ResumeEditorForm
                            resumeData={resumeData}
                            setResumeData={setResumeData}
                            title={title}
                            setTitle={setTitle}
                            onImport={() => setShowJsonModal(true)}
                            selectedTemplate={selectedTemplate}
                            onPreviewFocus={setPreviewFocus}
                        />
                    ) : activePanel === 'customize' ? (
                        <CustomizePanel
                            design={design}
                            updateDesign={updateDesign}
                            sectionOrder={sectionOrder}
                            sectionOptions={sectionOptions.map((section) => ({
                                ...section,
                                label: resumeData.sectionTitles?.[section.id] || section.label,
                            }))}
                            draggedSection={draggedSection}
                            setDraggedSection={setDraggedSection}
                            reorderSections={reorderSections}
                            moveColumnSection={moveColumnSection}
                            selectedTemplate={selectedTemplate}
                            resumeData={resumeData}
                            setResumeData={setResumeData}
                            onSaveAsTemplate={handleSaveAsTemplate}
                            onPreviewFocus={setPreviewFocus}
                        />
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
                            <ResumePagedView
                                template={selectedTemplate}
                                resumeData={resumeData}
                                previewFocus={previewFocus}
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* ── PRINT ONLY — rendered resume without UI chrome ── */}
            <div className="rb-print-only">
                <ResumePagedView
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

            {leaveOpen && (
                <div className="rb-leave-modal" role="dialog" aria-modal="true">
                    <div className="rb-leave-dialog">
                        <h2>Save your progress?</h2>
                        <p>If you save, this resume stays in progress and you can continue it from Templates → Continue editing.</p>
                        <div className="rb-leave-actions">
                            <button type="button" className="rb-nav-btn rb-nav-btn--outline" onClick={closeLeavePrompt}>Stay</button>
                            <button type="button" className="rb-nav-btn rb-nav-btn--ghost" onClick={leaveWithoutSaving}>Leave without saving</button>
                            <button type="button" className="rb-nav-btn rb-nav-btn--primary" onClick={saveAndLeave} disabled={saving}>
                                {saving ? 'Saving…' : 'Save and leave'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {templateNameOpen && (
                <div className="rb-leave-modal" role="dialog" aria-modal="true">
                    <div className="rb-leave-dialog">
                        <h2>Save to Your templates</h2>
                        <p>This keeps your layout, fonts, and colors so you can reuse them later.</p>
                        <input
                            className="rb-leave-input"
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                            placeholder="Template name"
                        />
                        <div className="rb-leave-actions">
                            <button type="button" className="rb-nav-btn rb-nav-btn--outline" onClick={() => setTemplateNameOpen(false)}>Cancel</button>
                            <button type="button" className="rb-nav-btn rb-nav-btn--primary" onClick={confirmSaveAsTemplate}>
                                {templateSaved ? 'Saved' : 'Save template'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                                <ResumePagedView template={selectedTemplate} resumeData={resumeData} />
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
