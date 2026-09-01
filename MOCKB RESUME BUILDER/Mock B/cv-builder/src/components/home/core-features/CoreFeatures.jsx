import React from 'react';
import './CoreFeatures.css';

export default function CoreFeatures() {
  return (
    <section id="core-features" className="container">
      <div className="home-section-header text-center">
        <h2 className="home-section-title">Everything in one resume workspace</h2>
        <p className="home-section-subtitle">Templates, editing, customization, and export — built into a single builder experience.</p>
      </div>

      <div className="bento-grid">
        <div className="bento-item bento-large group">
          <div className="bento-bg"></div>
          <div className="bento-content">
            <i className="fa-solid fa-file-lines bento-icon"></i>
            <h3>Resume &amp; Cover Letter Builder</h3>
            <p>Start from a sample or blank page, edit personal details, experience, education, skills, and extra sections with a live preview that updates instantly.</p>
          </div>
        </div>

        <div className="bento-item bento-medium group">
          <div className="bento-content">
            <i className="fa-solid fa-palette bento-icon"></i>
            <h3>Design Controls</h3>
            <p>Change accent color, fonts, heading style, margins, and section spacing.</p>
          </div>
        </div>

        <div className="bento-item bento-medium group">
          <div className="bento-content">
            <i className="fa-solid fa-table-columns bento-icon"></i>
            <h3>Two-Page Layouts</h3>
            <p>Move sections between page 1 and page 2 on supported templates.</p>
          </div>
        </div>

        <div className="bento-item bento-wide group">
          <div className="bento-bg bg-gradient-2"></div>
          <div className="bento-content">
            <i className="fa-solid fa-eye bento-icon"></i>
            <h3>Template Gallery &amp; Preview</h3>
            <p>Browse resume and cover letter templates from the home page or library, preview each design, then open the builder with sample content or a blank start.</p>
          </div>
        </div>

        <div className="bento-item bento-small group">
          <div className="bento-content">
            <i className="fa-solid fa-envelope-open-text bento-icon"></i>
            <h3>Cover Letters</h3>
            <p>Dedicated cover letter templates and editor.</p>
          </div>
        </div>

        <div className="bento-item bento-small group">
          <div className="bento-content">
            <i className="fa-solid fa-floppy-disk bento-icon"></i>
            <h3>Save Progress</h3>
            <p>Store resumes and design presets in your library.</p>
          </div>
        </div>

        <div className="bento-item bento-wide group">
          <div className="bento-bg bg-gradient-2"></div>
          <div className="bento-content">
            <i className="fa-solid fa-sliders bento-icon"></i>
            <h3>Section Control</h3>
            <p>Reorder sections, rename headings, hide entries, and tailor each template without leaving the builder.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
