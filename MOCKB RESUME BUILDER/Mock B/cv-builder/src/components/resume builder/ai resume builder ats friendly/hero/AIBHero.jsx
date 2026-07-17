import React from 'react';
import './AIBHero.css';

export default function AIBHero() {
  return (
    <section className="aib-hero">
      <div className="container">
        <h1>Build Your <span className="gold">ATS-Friendly</span> Resume<br />With One Prompt</h1>
        <p className="hero-sub">
          Just describe yourself — your experience, skills, and goals. Our AI crafts a spotless, grammar-checked, keyword-optimized resume tailored to get you hired.
        </p>
        <div className="hero-trust">
          <div className="trust-pill"><i className="fa-solid fa-circle-check"></i> ATS Optimized</div>
          <div className="trust-pill"><i className="fa-solid fa-circle-check"></i> Grammar & Spelling Corrected</div>
          <div className="trust-pill"><i className="fa-solid fa-circle-check"></i> AI Enhanced Content</div>
          <div className="trust-pill"><i className="fa-solid fa-circle-check"></i> PDF & Word Download</div>
        </div>
        <a href="#prompt-section" className="btn btn-primary btn-lg hero-cta">
          <i className="fa-solid fa-wand-magic-sparkles"></i> Start Building Free
        </a>
      </div>
      <div className="hero-glow"></div>
    </section>
  );
}
