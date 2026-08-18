import React, { useState } from 'react';
import { RESUME_TEMPLATES } from '../../config/templates';
import ResumeTemplateRenderer from './ResumeTemplateRenderer';
import sampleResumeData from '../../data/sampleResumeData';
import './TemplateSelector.css';

// ======================================
// TemplateSelector
//
// Props:
//   selectedTemplate — current template id string
//   onSelect(id)     — called when user picks a template
//
// Shows template cards with LIVE PREVIEW using
// sampleResumeData (never mixes with user data).
// ======================================

const TemplateSelector = ({ selectedTemplate, onSelect }) => {
    const [hoveredId, setHoveredId] = useState(null);
    const [previewTemplate, setPreviewTemplate] = useState(null);

    const handleSelect = (id) => {
        onSelect(id);
    };

    return (
        <>
            <div className="ts-container">
                <div className="ts-header">
                    <h3 className="ts-heading">Choose Template</h3>
                    <p className="ts-sub">Select a design — your content stays the same</p>
                </div>

                <div className="ts-grid">
                    {RESUME_TEMPLATES.map((tmpl) => {
                        const isSelected = selectedTemplate === tmpl.id;
                        const isHovered = hoveredId === tmpl.id;

                        return (
                            <div
                                key={tmpl.id}
                                className={`ts-card ${isSelected ? 'ts-card--selected' : ''} ${isHovered ? 'ts-card--hovered' : ''}`}
                                onMouseEnter={() => setHoveredId(tmpl.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* Mini preview thumbnail */}
                                <div
                                    className="ts-preview-wrap"
                                    onClick={() => setPreviewTemplate(tmpl.id)}
                                >
                                    <div className="ts-preview-scale">
                                        <ResumeTemplateRenderer
                                            template={tmpl.id}
                                            resumeData={sampleResumeData}
                                        />
                                    </div>

                                    {/* Overlay */}
                                    <div className="ts-overlay">
                                        <button
                                            className="ts-btn-preview"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setPreviewTemplate(tmpl.id);
                                            }}
                                        >
                                            <i className="fa-solid fa-eye"></i>
                                            Preview
                                        </button>
                                    </div>
                                </div>

                                {/* Card footer */}
                                <div className="ts-card-footer">
                                    <div className="ts-card-info">
                                        <span className="ts-card-name">{tmpl.name}</span>
                                        <span className="ts-card-desc">{tmpl.description}</span>
                                        <span
                                            className="ts-card-category"
                                            style={{ background: `${tmpl.accentColor}20`, color: tmpl.accentColor }}
                                        >
                                            {tmpl.category}
                                        </span>
                                    </div>
                                    <button
                                        className={`ts-btn-use ${isSelected ? 'ts-btn-use--active' : ''}`}
                                        onClick={() => handleSelect(tmpl.id)}
                                        style={isSelected ? { background: tmpl.accentColor } : {}}
                                    >
                                        {isSelected ? (
                                            <>
                                                <i className="fa-solid fa-check"></i>
                                                Selected
                                            </>
                                        ) : 'Use This'}
                                    </button>
                                </div>

                                {/* Selected badge */}
                                {isSelected && (
                                    <div className="ts-selected-badge" style={{ background: tmpl.accentColor }}>
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Full Preview Modal ── */}
            {previewTemplate && (
                <div className="ts-modal-backdrop" onClick={() => setPreviewTemplate(null)}>
                    <div className="ts-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="ts-modal-header">
                            <h3>{RESUME_TEMPLATES.find(t => t.id === previewTemplate)?.name} — Preview</h3>
                            <div className="ts-modal-actions">
                                <button
                                    className="ts-modal-use-btn"
                                    onClick={() => {
                                        handleSelect(previewTemplate);
                                        setPreviewTemplate(null);
                                    }}
                                >
                                    <i className="fa-solid fa-check"></i>
                                    Use This Template
                                </button>
                                <button
                                    className="ts-modal-close"
                                    onClick={() => setPreviewTemplate(null)}
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        </div>
                        <div className="ts-modal-body">
                            <div className="ts-modal-resume">
                                <ResumeTemplateRenderer
                                    template={previewTemplate}
                                    resumeData={sampleResumeData}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TemplateSelector;
