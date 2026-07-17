import React from 'react';
import './Features.css';

export default function Features() {
  return (
    <section id="features" className="container">
      <div className="home-features-grid">
        <div className="home-feature-card">
          <div className="home-feature-icon"><i className="fa-solid fa-file-pen"></i></div>
          <h3>AI Resume Builder</h3>
          <p>Write a high-impact resume in seconds with AI—plus LinkedIn import, custom layouts, and professional templates.</p>
        </div>
        <div className="home-feature-card">
          <div className="home-feature-icon"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
          <h3>Smart Optimization</h3>
          <p>No more manual tweaking. Our AI analyzes job descriptions and optimizes your resume keywords automatically.</p>
        </div>
        <div className="home-feature-card">
          <div className="home-feature-icon"><i className="fa-solid fa-magnifying-glass-chart"></i></div>
          <h3>ATS Scanner</h3>
          <p>Scan your resume for readability issues and keyword gaps to ensure you pass through ATS filters every time.</p>
        </div>
      </div>
    </section>
  );
}
