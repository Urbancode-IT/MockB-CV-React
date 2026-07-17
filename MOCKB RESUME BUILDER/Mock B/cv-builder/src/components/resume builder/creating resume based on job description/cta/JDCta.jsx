import React from 'react';
import './JDCta.css';

export default function JDCta() {
  return (
    <section className="jd-cta-section">
      <div className="cta-content">
        <h2>Elevate Your Career with <span>Precision Matching</span></h2>
        <p>Don't let a generic resume hold you back. Match your skills to the JD perfectly and <br /> get noticed by recruiters.</p>
        <button 
          className="btn-hero-primary btn-cta-large"
          onClick={() => document.getElementById('builder-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <i className="fa-solid fa-rocket"></i> Start Matching
        </button>
      </div>
    </section>
  );
}
