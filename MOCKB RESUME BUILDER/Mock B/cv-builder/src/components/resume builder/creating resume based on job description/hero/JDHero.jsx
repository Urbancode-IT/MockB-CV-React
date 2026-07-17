import React from 'react';
import './JDHero.css';

export default function JDHero() {
  return (
    <section className="jd-hero">
      <div className="hero-content">
        <h1 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
          <span style={{ whiteSpace: 'nowrap', color: 'var(--text-white)' }}>Your Resume, <span className="highlight-text">Perfectly Matched</span></span>
          <span style={{ whiteSpace: 'nowrap', color: 'var(--text-white)' }}>to the Job</span>
        </h1>
        <p style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <span style={{ whiteSpace: 'nowrap' }}>Paste any job description from LinkedIn, Naukri, Indeed or anywhere. Our</span>
          <span style={{ whiteSpace: 'nowrap' }}>AI instantly builds a tailored, ATS-optimized resume that speaks the</span>
          <span style={{ whiteSpace: 'nowrap' }}>recruiter's language.</span>
        </p>
        
        <div className="hero-cta-group">
          <a 
            href="#builder-section" 
            className="btn-hero-primary"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('builder-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i> Start Building
          </a>
          <a 
            href="#how-it-works" 
            className="btn-hero-secondary"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            See How It Works <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat-item"><span className="stat-num">95%</span><span className="stat-label">ATS Pass Rate</span></div>
          <div className="stat-divider"></div>
          <div className="stat-item"><span className="stat-num">3x</span><span className="stat-label">More Interviews</span></div>
          <div className="stat-divider"></div>
          <div className="stat-item"><span className="stat-num">60s</span><span className="stat-label">Average Build Time</span></div>
        </div>

        <div className="scroll-indicator-v2">
          <span>Scroll to Build Your Perfect Resume</span>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </div>
    </section>
  );
}
