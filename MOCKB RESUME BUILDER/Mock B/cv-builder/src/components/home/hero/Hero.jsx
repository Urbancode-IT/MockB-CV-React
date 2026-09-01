import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="container">
        <h1>Land your next <span>dream job</span></h1>
        <p>Create a professional, ATS-friendly resume in minutes. Pick a template, fill in your details with live preview, and download a polished PDF.</p>

        <div className="hero-actions">
          <button type="button" className="btn btn-primary" onClick={() => navigate('/resume/templates')}>
            Browse templates
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/resume/customizer')}>
            Open resume builder
          </button>
        </div>

        <div className="trust-badges">
          <div className="hero-badge">
            <i className="fa-solid fa-circle-check"></i>
            <span>ATS-Friendly</span>
          </div>
          <div className="hero-badge">
            <i className="fa-solid fa-circle-check"></i>
            <span>1 &amp; 2 Page Layouts</span>
          </div>
          <div className="hero-badge">
            <i className="fa-solid fa-circle-check"></i>
            <span>Live Preview &amp; PDF</span>
          </div>
        </div>
      </div>
    </section>
  );
}
