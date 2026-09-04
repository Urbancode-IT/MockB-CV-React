import React, { useState } from 'react';
import { RESUME_TEMPLATES } from '../../config/templates';
import ResumeTemplateThumb from './ResumeTemplateThumb';
import TemplatePreviewModal from './TemplatePreviewModal';
import { sampleForTemplate } from '../../data/sampleResumeData';
import './TemplateSelector.css';

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
                                <div
                                    className="ts-preview-wrap"
                                    onClick={() => setPreviewTemplate(tmpl.id)}
                                >
                                    <ResumeTemplateThumb
                                        template={tmpl.id}
                                        resumeData={sampleForTemplate(tmpl.id)}
                                    />

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

                                <span className="ts-card-name" onClick={() => handleSelect(tmpl.id)}>{tmpl.name}</span>

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

            {previewTemplate && (
                <TemplatePreviewModal
                    title={RESUME_TEMPLATES.find((t) => t.id === previewTemplate)?.name}
                    templateId={previewTemplate}
                    resumeData={sampleForTemplate(previewTemplate)}
                    onClose={() => setPreviewTemplate(null)}
                    onUseTemplate={() => {
                        handleSelect(previewTemplate);
                        setPreviewTemplate(null);
                    }}
                />
            )}
        </>
    );
};

export default TemplateSelector;
