import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    buildAiResumeJsonPrompt,
    mergeResumeImportJson,
    resumeImportJsonString,
} from '../../utils/resumeJson';
import { sampleForTemplate } from '../../data/sampleResumeData';
import { getTemplateById } from '../../config/templates';
import { RESUME_FILE_ACCEPT, describeSections, importResumeFile } from '../../utils/resumeFileImport';
import './JsonUploadModal.css';

const EMPTY_JSON = '{}';

const JsonUploadModal = ({ isOpen, onClose, onApply, resumeData, template }) => {
    const [jsonText, setJsonText] = useState('');
    const [error, setError] = useState(null);
    const [showExample, setShowExample] = useState(true);
    const [copied, setCopied] = useState(null);
    const [source, setSource] = useState('current');
    const [importing, setImporting] = useState(false);
    const [importInfo, setImportInfo] = useState(null);
    const [importProgress, setImportProgress] = useState('');
    const fileInputRef = useRef(null);
    const resumeFileRef = useRef(null);

    const currentJson = useMemo(
        () => resumeImportJsonString(resumeData || {}, 2),
        [resumeData],
    );
    const templateSample = useMemo(
        () => (template ? sampleForTemplate(template) : null),
        [template],
    );
    const templateJson = useMemo(
        () => (templateSample ? resumeImportJsonString(templateSample, 2) : EMPTY_JSON),
        [templateSample],
    );
    const templateName = template ? getTemplateById(template)?.name || 'this template' : 'this template';
    const currentIsEmpty = currentJson === EMPTY_JSON;
    const activeSource = source === 'template' || currentIsEmpty ? 'template' : 'current';
    const exampleJson = activeSource === 'template' ? templateJson : currentJson;
    const aiPrompt = useMemo(
        () => buildAiResumeJsonPrompt(activeSource === 'template' ? templateSample || {} : resumeData || {}),
        [activeSource, templateSample, resumeData],
    );
    const personLabel = (resumeData?.personal?.name || '').trim() || 'your resume';

    useEffect(() => {
        if (!isOpen) return undefined;
        setError(null);
        setCopied(null);
        setShowExample(true);
        setImportInfo(null);
        setSource(resumeData?.startBlank || currentIsEmpty ? 'template' : 'current');
        return undefined;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    if (!isOpen) return null;

    const copyText = async (text, key) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(key);
            window.setTimeout(() => setCopied(null), 1800);
        } catch {
            setError('Could not copy. Select the text and copy manually.');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            setJsonText(String(event.target?.result || ''));
            setError(null);
        };
        reader.readAsText(file);
        e.target.value = null;
        setImportInfo(null);
    };

    const handleResumeFile = async (e) => {
        const file = e.target.files?.[0];
        e.target.value = null;
        if (!file) return;
        setImporting(true);
        setError(null);
        setImportInfo(null);
        try {
            const result = await importResumeFile(file, templateSample, setImportProgress);
            if (!result.found.length && !Object.keys(result.data.personal || {}).length) {
                throw new Error('Could not recognise any resume sections in this file.');
            }
            setJsonText(JSON.stringify(result.data, null, 2));
            setImportInfo({ ...result, fileName: file.name });
            setShowExample(false);
        } catch (err) {
            setError(err?.message || 'Could not read this resume file.');
        } finally {
            setImporting(false);
            setImportProgress('');
        }
    };

    const handleApply = () => {
        try {
            const parsed = JSON.parse(jsonText);
            if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
                setError('JSON must be an object with resume fields (personal, experience, …).');
                return;
            }
            onApply(parsed, importInfo ? { filled: importInfo.filled, filledPersonal: importInfo.filledPersonal, fileName: importInfo.fileName } : null);
            onClose();
            setJsonText('');
            setImportInfo(null);
            setError(null);
        } catch {
            setError('Invalid JSON format. Please check your syntax and try again.');
        }
    };

    const handleLoadExample = () => {
        setJsonText(exampleJson);
        setImportInfo(null);
        setError(null);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className="jm-overlay" onClick={handleOverlayClick}>
            <div className="jm-modal">
                <div className="jm-header">
                    <div className="jm-header-left">
                        <i className="fa-solid fa-file-code jm-header-icon"></i>
                        <div>
                            <h3>Import Resume</h3>
                        </div>
                    </div>
                    <button type="button" className="jm-close" onClick={onClose} aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="jm-body">
                    <div className="jm-import-block">
                        <div className="jm-import-copy">
                            <strong>
                                <i className="fa-solid fa-file-import"></i> Import your existing resume
                            </strong>
                            <p>
                                Upload a PDF, DOCX, TXT, or image of your resume — scanned or image-only PDFs are read with text recognition. We convert it to JSON for{' '}
                                <strong>{templateName}</strong>, and fill any section your resume doesn&apos;t have with sample content.
                            </p>
                        </div>
                        <button
                            type="button"
                            className="jm-import-btn"
                            onClick={() => resumeFileRef.current?.click()}
                            disabled={importing}
                        >
                            <i className={`fa-solid ${importing ? 'fa-spinner fa-spin' : 'fa-upload'}`}></i>
                            {importing ? importProgress || 'Reading resume…' : 'Upload resume'}
                        </button>
                        <input
                            type="file"
                            accept={RESUME_FILE_ACCEPT}
                            style={{ display: 'none' }}
                            ref={resumeFileRef}
                            onChange={handleResumeFile}
                        />
                    </div>

                    {importInfo && (
                        <div className="jm-import-result" role="status">
                            <p>
                                <i className="fa-solid fa-circle-check"></i>
                                Read <strong>{importInfo.fileName}</strong>
                                {importInfo.found.length > 0 && <> — found {describeSections(importInfo.found).join(', ')}.</>}
                            </p>
                            {importInfo.filled.length > 0 && (
                                <p className="jm-import-warn">
                                    <i className="fa-solid fa-triangle-exclamation"></i>
                                    Not found in your resume, filled with sample content — replace or hide these after applying:{' '}
                                    <strong>{describeSections(importInfo.filled).join(', ')}</strong>
                                </p>
                            )}
                            <p className="jm-import-hint">Review the JSON below, then click <strong>Apply to Template</strong>.</p>
                        </div>
                    )}

                    <p className="jm-desc">
                        Import content from a <code>.json</code> file or paste JSON below.
                        This updates <strong>form fields only</strong> — your template and design stay the same.
                        {activeSource === 'template' ? (
                            <> The example below is sample content for <strong>{templateName}</strong> — replace it with your details.</>
                        ) : (
                            <> The example below matches <strong>{personLabel}</strong> exactly as edited in this resume.</>
                        )}
                    </p>

                    <div className="jm-source-switch" role="tablist" aria-label="Example JSON source">
                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeSource === 'template'}
                            className={activeSource === 'template' ? 'is-active' : ''}
                            onClick={() => setSource('template')}
                        >
                            <i className="fa-solid fa-table-columns"></i>
                            {templateName} example
                        </button>
                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeSource === 'current'}
                            className={activeSource === 'current' ? 'is-active' : ''}
                            onClick={() => setSource('current')}
                            disabled={currentIsEmpty}
                            title={currentIsEmpty ? 'Fill in some fields first' : undefined}
                        >
                            <i className="fa-solid fa-user-pen"></i>
                            My resume
                        </button>
                    </div>

                    <div className="jm-input-row">
                        <button
                            type="button"
                            className="jm-action-btn jm-action-file"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <i className="fa-solid fa-file-arrow-up"></i>
                            <span>Select .json File</span>
                        </button>
                        <input
                            type="file"
                            accept=".json,application/json"
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />

                        <button
                            type="button"
                            className="jm-action-btn jm-action-example"
                            onClick={() => setShowExample((v) => !v)}
                        >
                            <i className="fa-solid fa-eye"></i>
                            <span>{showExample ? 'Hide example JSON' : 'Show example JSON'}</span>
                        </button>
                    </div>

                    {showExample && (
                        <div className="jm-example-block">
                            <div className="jm-example-bar">
                                <span>
                                    <i className="fa-solid fa-circle-info"></i>
                                    {activeSource === 'template' ? `Sample for ${templateName}` : 'Live schema from this resume'}
                                </span>
                                <div className="jm-example-actions">
                                    <button type="button" onClick={() => copyText(exampleJson, 'json')}>
                                        <i className="fa-solid fa-copy"></i>
                                        {copied === 'json' ? 'Copied' : 'Copy JSON'}
                                    </button>
                                    <button type="button" onClick={handleLoadExample}>
                                        <i className="fa-solid fa-check"></i>
                                        Use in editor
                                    </button>
                                </div>
                            </div>
                            <pre className="jm-example-pre">{exampleJson}</pre>
                        </div>
                    )}

                    <div className="jm-ai-block">
                        <div className="jm-ai-bar">
                            <div>
                                <strong>AI fill prompt</strong>
                                <p>
                                    Copy this into ChatGPT, Claude, or any AI. It includes the JSON pattern above
                                    so the model returns the same structure with your details.
                                </p>
                            </div>
                            <button type="button" className="jm-ai-copy" onClick={() => copyText(aiPrompt, 'ai')}>
                                <i className="fa-solid fa-wand-magic-sparkles"></i>
                                {copied === 'ai' ? 'Copied prompt' : 'Copy AI prompt'}
                            </button>
                        </div>
                    </div>

                    <div className="jm-textarea-section">
                        <label className="jm-textarea-label" htmlFor="jm-json-paste">
                            Paste JSON text here
                        </label>
                        <textarea
                            id="jm-json-paste"
                            className="jm-textarea"
                            value={jsonText}
                            onChange={(e) => {
                                setJsonText(e.target.value);
                                setError(null);
                            }}
                            placeholder={exampleJson.slice(0, 280) + (exampleJson.length > 280 ? '\n…' : '')}
                        />
                        {error && (
                            <div className="jm-error">
                                <i className="fa-solid fa-triangle-exclamation"></i> {error}
                            </div>
                        )}
                    </div>
                </div>

                <div className="jm-footer">
                    <button type="button" className="jm-cancel" onClick={onClose}>Cancel</button>
                    <button
                        type="button"
                        className="jm-apply"
                        onClick={handleApply}
                        disabled={!jsonText.trim()}
                    >
                        <i className="fa-solid fa-bolt"></i> Apply to Template
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JsonUploadModal;
