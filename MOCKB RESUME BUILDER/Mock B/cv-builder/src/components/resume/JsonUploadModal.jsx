import React, { useState, useRef } from 'react';
import sampleResumeData from '../../data/sampleResumeData';
import './JsonUploadModal.css';

const JsonUploadModal = ({ isOpen, onClose, onApply }) => {
    const [jsonText, setJsonText] = useState('');
    const [error, setError] = useState(null);
    const [showExample, setShowExample] = useState(false);
    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            setJsonText(event.target.result);
            setError(null);
        };
        reader.readAsText(file);
        e.target.value = null;
    };

    const handleApply = () => {
        try {
            const parsed = JSON.parse(jsonText);
            onApply(parsed);
            onClose();
            setJsonText('');
            setError(null);
        } catch (err) {
            setError('Invalid JSON format. Please check your syntax and try again.');
        }
    };

    const handleLoadExample = () => {
        setJsonText(JSON.stringify(sampleResumeData, null, 2));
        setError(null);
        setShowExample(false);
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
                        <h3>Upload Resume Data</h3>
                    </div>
                    <button className="jm-close" onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="jm-body">
                    <p className="jm-desc">
                        Import your resume content from a <code>.json</code> file or paste JSON text directly below.
                        This will <strong>only</strong> update the form fields — your current template stays unchanged.
                    </p>

                    <div className="jm-input-row">
                        <button className="jm-action-btn jm-action-file" onClick={() => fileInputRef.current?.click()}>
                            <i className="fa-solid fa-file-arrow-up"></i>
                            <span>Select .json File</span>
                        </button>
                        <input
                            type="file"
                            accept=".json"
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />

                        <button className="jm-action-btn jm-action-example" onClick={() => setShowExample(!showExample)}>
                            <i className="fa-solid fa-eye"></i>
                            <span>{showExample ? 'Hide Example' : 'View Example Schema'}</span>
                        </button>
                    </div>

                    {showExample && (
                        <div className="jm-example-block">
                            <div className="jm-example-bar">
                                <span><i className="fa-solid fa-circle-info"></i> Expected JSON structure (Alex Morgan sample)</span>
                                <button onClick={handleLoadExample}>
                                    <i className="fa-solid fa-check"></i> Use This Example
                                </button>
                            </div>
                            <pre className="jm-example-pre">{JSON.stringify(sampleResumeData, null, 2)}</pre>
                        </div>
                    )}

                    <div className="jm-textarea-section">
                        <label className="jm-textarea-label">Paste JSON text here:</label>
                        <textarea
                            className="jm-textarea"
                            value={jsonText}
                            onChange={(e) => { setJsonText(e.target.value); setError(null); }}
                            placeholder={'{\n  "personal": {\n    "name": "Alex Morgan",\n    "jobTitle": "Senior Product Manager",\n    ...\n  },\n  "summary": "...",\n  "experience": [...],\n  ...\n}'}
                        />
                        {error && (
                            <div className="jm-error">
                                <i className="fa-solid fa-triangle-exclamation"></i> {error}
                            </div>
                        )}
                    </div>
                </div>

                <div className="jm-footer">
                    <button className="jm-cancel" onClick={onClose}>Cancel</button>
                    <button
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
