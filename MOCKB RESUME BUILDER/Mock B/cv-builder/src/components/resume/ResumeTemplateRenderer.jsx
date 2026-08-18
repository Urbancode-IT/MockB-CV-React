import React from 'react';

import ClassicProfessional from './templates/ClassicProfessional';
import ModernProfessional from './templates/ModernProfessional';
import MinimalATS from './templates/MinimalATS';
import Executive from './templates/Executive';
import CreativeProfessional from './templates/CreativeProfessional';

// ======================================
// Template Map
//
// Maps a template identifier string to the
// corresponding React component.
//
// To add a new template:
// 1. Import the component above
// 2. Add an entry here
// 3. Add the id to src/config/templates.js
// 4. Add the id to ALLOWED_TEMPLATES in the backend
// ======================================

const templateMap = {
    'classic-professional': ClassicProfessional,
    'modern-professional': ModernProfessional,
    'minimal-ats': MinimalATS,
    'executive': Executive,
    'creative-professional': CreativeProfessional,
};

const DEFAULT_TEMPLATE = 'classic-professional';


// ======================================
// ResumeTemplateRenderer
//
// Props:
//   template   — string identifier e.g. "executive"
//   resumeData — the user's resume content object
//
// Automatically falls back to ClassicProfessional
// if an unknown template string is received.
// ======================================

const ResumeTemplateRenderer = ({ template, resumeData = {} }) => {
    const TemplateComponent =
        templateMap[template] || templateMap[DEFAULT_TEMPLATE];
    const design = resumeData.design || {};
    const isLetter = design.pageSize === 'letter';

    return (
        <div
            className="resume-design-wrapper"
            style={{
                width: isLetter ? '216mm' : '210mm',
                minHeight: isLetter ? '279mm' : '297mm',
                fontFamily: design.fontFamily || 'Arial, sans-serif',
                fontSize: `${design.fontSize || 11}pt`,
                lineHeight: design.lineHeight || 1.4,
                '--resume-section-spacing': `${design.sectionSpacing || 18}px`,
            }}
        >
            <TemplateComponent resumeData={resumeData} />
        </div>
    );
};

export default ResumeTemplateRenderer;
