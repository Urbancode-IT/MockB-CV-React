import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    buildAiResumeJsonPrompt,
    mergeResumeImportJson,
    resumeImportJsonString,
} from '../../utils/resumeJson';
import './JsonUploadModal.css';

const JsonUploadModal = ({ isOpen, onClose, onApply, resumeData }) => {
    const [jsonText, setJsonText] = useState('');
    const [error, setError] = useState(null);
    const [showExample, setShowExample] = useState(true);
    const [copied, setCopied] = useState(null);
    const fileInputRef = useRef(null);

    const exampleJson = useMemo(
        () => resumeImportJsonString(resumeData || {}, 2),
        [resumeData],
    );
    const aiPrompt = useMemo(
        () => buildAiResumeJsonPrompt(resumeData || {}),
        [resumeData],
    );
    const personLabel = (resumeData?.personal?.name || '').trim() || 'your resume';

    useEffect(() => {
        if (!isOpen) return undefined;
        setError(null);
        setCopied(null);
        setShowExample(true);
        return undefined;
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
    };

    const handleApply = () => {
        try {
            const parsed = JSON.parse(jsonText);
            if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
                setError('JSON must be an object with resume fields (personal, experience, …).');
                return;
            }
            onApply(parsed);
            onClose();
            setJsonText('');
            setError(null);
        } catch {
            setError('Invalid JSON format. Please check your syntax and try again.');
        }
    };

    const handleLoadExample = () => {
        setJsonText(exampleJson);
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
                            <h3>Upload Resume JSON</h3>
                        </div>
                    </div>
                    <button type="button" className="jm-close" onClick={onClose} aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="jm-body">
                    <p className="jm-desc">
                        Import content from a <code>.json</code> file or paste JSON below.
                        This updates <strong>form fields only</strong> — your template and design stay the same.
                        The example below matches <strong>{personLabel}</strong> exactly as edited in this resume.
                    </p>

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
                            <span>{showExample ? 'Hide live JSON' : 'Show live JSON'}</span>
                        </button>
                    </div>

                    {showExample && (
                        <div className="jm-example-block">
                            <div className="jm-example-bar">
                                <span>
                                    <i className="fa-solid fa-circle-info"></i>
                                    Live schema from this resume
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
                                    Copy this into ChatGPT, Claude, or any AI. It includes your current JSON pattern
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
