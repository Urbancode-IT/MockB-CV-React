import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation, useBlocker } from 'react-router-dom';
import CoverLetterEditorForm from '../components/cover-letter/CoverLetterEditorForm';
import CoverLetterCustomizePanel from '../components/cover-letter/CoverLetterCustomizePanel';
import CoverLetterRenderer from '../components/cover-letter/CoverLetterRenderer';
import { DEFAULT_COVER_LETTER_TEMPLATE, getCoverLetterTemplateById } from '../config/coverLetterTemplates';
import { sampleForCoverLetter, blankForCoverLetter } from '../data/sampleCoverLetterData';
import {
    upsertUserCoverLetter,
    getUserCoverLetter,
    saveUserCoverLetterTemplate,
    updateUserCoverLetterTemplate,
} from '../utils/coverLetterLibrary';
import './ResumeBuilder.css';
import './CoverLetterBuilder.css';

const snapshotOf = (title, template, data) => JSON.stringify({ title, template, data });

const applySavedDesign = (data, state = {}) => {
    if (!state.savedDesign) return data;
    return {
        ...data,
        design: { ...(data.design || {}), ...(state.savedDesign || {}) },
    };
};

export default function CoverLetterBuilder() {
    const navigate = useNavigate();
    const location = useLocation();
    const restored = location.state?.restoreUserLetter
        || (location.state?.userLetterId ? getUserCoverLetter(location.state.userLetterId) : null);

    const [title, setTitle] = useState(restored?.title || 'Untitled Cover Letter');
    const [selectedTemplate] = useState(restored?.selectedTemplate || location.state?.template || DEFAULT_COVER_LETTER_TEMPLATE);
    const [letterData, setLetterData] = useState(() => {
        if (restored?.letterData) return restored.letterData;
        const templateId = location.state?.template || DEFAULT_COVER_LETTER_TEMPLATE;
        const base = location.state?.startMode === 'blank'
            ? blankForCoverLetter(templateId)
            : sampleForCoverLetter(templateId);
        return applySavedDesign(base, location.state || {});
    });
    const [userTemplateId, setUserTemplateId] = useState(restored?.userTemplateId || location.state?.userTemplateId || null);
    const [userTemplateName, setUserTemplateName] = useState(restored?.userTemplateName || location.state?.userTemplateName || '');
    const [userLetterId, setUserLetterId] = useState(restored?.id || location.state?.userLetterId || null);

    const [activePanel, setActivePanel] = useState('editor');
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);
    const [showMobilePreview, setShowMobilePreview] = useState(() => typeof window !== 'undefined' && window.innerWidth < 900);
    const [showDownloadPreview, setShowDownloadPreview] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [leaveOpen, setLeaveOpen] = useState(false);
    const [templateNameOpen, setTemplateNameOpen] = useState(false);
    const [templateName, setTemplateName] = useState('');
    const [templateSaved, setTemplateSaved] = useState(false);
    const [previewFocus, setPreviewFocus] = useState(null);

    const saveStatusTimer = useRef(null);
    const downloadPreviewRef = useRef(null);
    const lastSavedRef = useRef(snapshotOf(title, selectedTemplate, letterData));
    const skipBlockRef = useRef(false);
    const currentSnapRef = useRef(snapshotOf(title, selectedTemplate, letterData));
    currentSnapRef.current = snapshotOf(title, selectedTemplate, letterData);

    const blocker = useBlocker(({ currentLocation, nextLocation }) => {
        if (skipBlockRef.current) return false;
        const staying = currentLocation.pathname.startsWith('/cover-letter/customizer')
            && nextLocation.pathname.startsWith('/cover-letter/customizer');
        return currentSnapRef.current !== lastSavedRef.current && !staying;
    });

    const handleSave = useCallback(async () => {
        setSaving(true);
        try {
            const meta = getCoverLetterTemplateById(selectedTemplate);
            const saved = upsertUserCoverLetter({
                id: userLetterId,
                title,
                selectedTemplate,
                letterData: { ...letterData, selectedTemplate },
                baseName: meta.name,
                userTemplateId,
                userTemplateName,
            });
            setUserLetterId(saved.id);
            lastSavedRef.current = snapshotOf(title, selectedTemplate, letterData);
            setSaveStatus('saved');
            return true;
        } catch (err) {
            setSaveStatus('error');
            console.error(err);
            return false;
        } finally {
            setSaving(false);
            if (saveStatusTimer.current) clearTimeout(saveStatusTimer.current);
            saveStatusTimer.current = setTimeout(() => setSaveStatus(null), 3000);
        }
    }, [title, selectedTemplate, letterData, userLetterId, userTemplateId, userTemplateName]);

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
        lastSavedRef.current = snapshotOf(title, selectedTemplate, letterData);
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
        const baseName = getCoverLetterTemplateById(selectedTemplate)?.name || 'Cover letter';
        setTemplateName(userTemplateName || `${baseName} – Your work`);
        setTemplateNameOpen(true);
        setTemplateSaved(false);
    };

    const confirmSaveAsTemplate = () => {
        const payload = {
            name: templateName,
            baseTemplate: selectedTemplate,
            design: letterData.design || {},
        };
        const saved = userTemplateId
            ? (updateUserCoverLetterTemplate(userTemplateId, payload) || saveUserCoverLetterTemplate(payload))
            : saveUserCoverLetterTemplate(payload);
        setUserTemplateId(saved.id);
        setUserTemplateName(saved.name);
        lastSavedRef.current = snapshotOf(title, selectedTemplate, letterData);
        setTemplateSaved(true);
        setTimeout(() => {
            setTemplateNameOpen(false);
            setTemplateSaved(false);
        }, 900);
    };

    const confirmDownload = async () => {
        const preview = downloadPreviewRef.current;
        if (!preview) return;
        const letterEl = preview.querySelector('[data-letter-capture]') || preview;
        setDownloading(true);
        try {
            const html2canvas = (await import('html2canvas')).default;
            const { jsPDF } = await import('jspdf');
            const fileName = `${(title || 'cover-letter').trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'cover-letter'}.pdf`;
            const isLetter = letterData.design?.pageSize === 'letter';
            const pageWidthMm = isLetter ? 216 : 210;
            const pageHeightMm = isLetter ? 279 : 297;
            const canvas = await html2canvas(letterEl, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false,
            });
            const pdf = new jsPDF({ unit: 'mm', format: [pageWidthMm, pageHeightMm], orientation: 'portrait' });
            pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', 0, 0, pageWidthMm, pageHeightMm);
            pdf.save(fileName);
            setShowDownloadPreview(false);
        } catch (err) {
            console.error(err);
            alert('Unable to create the PDF. Please try again.');
        } finally {
            setDownloading(false);
        }
    };

    const updateDesign = (field, value) => {
        setLetterData((prev) => ({ ...prev, design: { ...(prev.design || {}), [field]: value } }));
    };

    const design = letterData.design || {};
    const meta = getCoverLetterTemplateById(selectedTemplate);

    return (
        <div className="rb-page">
            <div className="rb-nav">
                <div className="rb-nav-left">
                    <button type="button" className="rb-nav-logo" onClick={() => navigate('/')}>
                        <i className="fa-solid fa-envelope-open-text"></i>
                        MockB-CV
                    </button>
                    <div className="rb-nav-divider"></div>
                    <input
                        className="rb-nav-title-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Cover letter title..."
                        aria-label="Cover letter title"
                    />
                </div>

                <div className="rb-nav-center">
                    <button
                        className={`rb-nav-tab ${activePanel === 'editor' ? 'rb-nav-tab--active' : ''}`}
                        onClick={() => setActivePanel('editor')}
                    >
                        <i className="fa-solid fa-pen-to-square"></i>
                        <span>Edit</span>
                    </button>
                    <button
                        className={`rb-nav-tab ${activePanel === 'customize' ? 'rb-nav-tab--active' : ''}`}
                        onClick={() => setActivePanel('customize')}
                    >
                        <i className="fa-solid fa-sliders"></i>
                        <span>Customize</span>
                    </button>
                </div>

                <div className="rb-nav-right">
                    <button
                        className="rb-nav-btn rb-nav-btn--icon"
                        onClick={() => setShowMobilePreview((p) => !p)}
                        title="Toggle Preview"
                    >
                        <i className="fa-solid fa-eye"></i>
                    </button>
                    <button className="rb-nav-btn rb-nav-btn--outline" onClick={() => setShowDownloadPreview(true)}>
                        <i className="fa-solid fa-download"></i>
                        <span>Download PDF</span>
                    </button>
                    <button
                        className={`rb-nav-btn rb-nav-btn--primary ${saving ? 'rb-nav-btn--loading' : ''} ${saveStatus === 'saved' ? 'rb-nav-btn--saved' : ''} ${saveStatus === 'error' ? 'rb-nav-btn--error' : ''}`}
                        onClick={handleSave}
                        disabled={saving}
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

            <div className="rb-main">
                <div className={`rb-panel-left ${activePanel === 'customize' ? 'rb-panel-left--customize rb-panel-left--customize-letter' : ''} ${showMobilePreview ? 'rb-panel-left--hidden' : ''}`}>
                    {activePanel === 'editor' ? (
                        <CoverLetterEditorForm
                            letterData={letterData}
                            setLetterData={setLetterData}
                            onPreviewFocus={setPreviewFocus}
                        />
                    ) : (
                        <CoverLetterCustomizePanel
                            design={design}
                            updateDesign={updateDesign}
                            onSaveAsTemplate={handleSaveAsTemplate}
                        />
                    )}
                </div>

                <div className={`rb-panel-right ${showMobilePreview ? 'rb-panel-right--visible' : ''}`}>
                    <div className="rb-preview-header">
                        <span className="rb-preview-label">
                            <i className="fa-solid fa-eye"></i>
                            Live Preview
                        </span>
                        <span className="rb-template-badge">{meta.name}</span>
                    </div>
                    <div className="rb-preview-scroll">
                        <div className={`rb-preview-scale-wrap cl-preview-scale${previewFocus ? ' is-focused' : ''}`}>
                            <CoverLetterRenderer template={selectedTemplate} letterData={letterData} />
                        </div>
                    </div>
                </div>
            </div>

            {leaveOpen && (
                <div className="rb-leave-modal" role="dialog" aria-modal="true">
                    <div className="rb-leave-dialog">
                        <h2>Save your progress?</h2>
                        <p>If you save, this letter is stored under Templates → Your cover letters. The library template stays unchanged.</p>
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
                        <h2>Save to Your cover letter templates</h2>
                        <p>This keeps your fonts, margins, and colors so you can reuse them later.</p>
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
                <div className="rb-download-modal" role="dialog" aria-modal="true">
                    <div className="rb-download-dialog">
                        <div className="rb-download-modal-header">
                            <div>
                                <h2>Preview your PDF</h2>
                                <p>This is the cover letter that will be downloaded.</p>
                            </div>
                            <button className="rb-download-close" onClick={() => !downloading && setShowDownloadPreview(false)}>×</button>
                        </div>
                        <div className="rb-download-preview-scroll">
                            <div className="rb-download-resume" ref={downloadPreviewRef}>
                                <CoverLetterRenderer template={selectedTemplate} letterData={letterData} />
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
