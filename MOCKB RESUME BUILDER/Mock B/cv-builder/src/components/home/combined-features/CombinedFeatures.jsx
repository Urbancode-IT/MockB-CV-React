import React from 'react';
import { Link } from 'react-router-dom';
import './CombinedFeatures.css';

export default function CombinedFeatures() {
  return (
    <section className="container">
      <div className="home-combined-features">
        <div className="home-split-row">
          <div className="home-split-content">
            <h2>Build resumes with live preview</h2>
            <p>Pick a template, fill in your details, and watch the resume update in real time. Customize fonts, colors, spacing, and section order before you download.</p>
            <Link to="/resume/customizer" className="home-btn-white">Open resume builder</Link>
          </div>
          <div className="home-split-image">
            <img src="/images/interface.png" alt="Resume builder interface" />
          </div>
        </div>

        <div className="home-split-row home-reverse-row">
          <div className="home-split-image">
            <img src="/images/templates.png" alt="Resume templates" />
          </div>
          <div className="home-split-content">
            <h2>One-page and two-page templates</h2>
            <p>Browse professional resume and cover letter templates, preview them at full size, and start with sample content or a blank page.</p>
            <Link to="/resume/templates" className="home-btn-white">Browse templates</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
