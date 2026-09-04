import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="container">
        <h1>Land your next <span>dream job</span></h1>
        <p>
          Build a polished resume, matching cover letter, and personal portfolio in one place.
          Choose a design, edit with live preview, and download when you are ready.
        </p>

        <div className="hero-actions">
          <button type="button" className="btn btn-primary" onClick={() => navigate('/portfolio-maker')}>
            Build portfolio
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/resume/customizer')}>
            Open resume builder
          </button>
        </div>

        <div className="trust-badges">
          <div className="hero-badge">
            <i className="fa-solid fa-circle-check"></i>
            <span>Live preview</span>
          </div>
          <div className="hero-badge">
            <i className="fa-solid fa-circle-check"></i>
            <span>1 &amp; 2 page layouts</span>
          </div>
          <div className="hero-badge">
            <i className="fa-solid fa-circle-check"></i>
            <span>PDF &amp; portfolio ZIP</span>
          </div>
        </div>
      </div>
    </section>
  );
}
