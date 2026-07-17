import React from 'react';
import './AIBFeatures.css';

export default function AIBFeatures() {
  return (
    <section className="features-section">
      <div className="container">
        <div className="section-label">
          <i className="fa-solid fa-sparkles"></i> What Our AI Does
        </div>
        <h2 className="section-title">More than just a resume generator</h2>
        <div className="features-grid-ai">
          <div className="feat-card">
            <div className="feat-icon">
              <i className="fa-solid fa-spell-check"></i>
            </div>
            <h3>Grammar & Spelling Fix</h3>
            <p>
              Every word is analyzed and corrected. No typos, no awkward phrasing — just clean, professional language that impresses recruiters.
            </p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">
              <i className="fa-solid fa-magnifying-glass-chart"></i>
            </div>
            <h3>ATS Keyword Optimization</h3>
            <p>
              Our AI strategically embeds industry-relevant keywords so your resume clears ATS filters and lands in front of human recruiters.
            </p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <h3>AI Content Enhancement</h3>
            <p>
              The AI adds relevant achievements, action verbs, and industry-specific content that makes your experience shine beyond what you described.
            </p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">
              <i className="fa-solid fa-rotate"></i>
            </div>
            <h3>Iterative Refinement</h3>
            <p>
              Not happy with a section? Simply type your change request in the follow-up prompt and the AI updates only what you need.
            </p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">
              <i className="fa-solid fa-eye"></i>
            </div>
            <h3>Live Preview</h3>
            <p>
              See your resume rendered in real time as the AI builds it. Review every section before downloading to ensure perfection.
            </p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">
              <i className="fa-solid fa-file-arrow-down"></i>
            </div>
            <h3>PDF & Word Export</h3>
            <p>
              Download your final resume as a professionally formatted PDF or an editable Word document — your choice, your format.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
