import React from 'react';
import { Link } from 'react-router-dom';
import './TemplatesPromo.css';

export default function TemplatesPromo() {
  return (
    <section className="container">
      <div className="templates-section">
        <div className="split-row">
          <div className="split-content">
            <h2>Free resume design templates</h2>
            <p>Explore free and premium design templates in our marketplace. Find the perfect cover letter or resume template, customize it with your work history, then optimize it with our AI.</p>
            <Link to="/resume/templates" className="btn btn-secondary">Browse templates</Link>
          </div>
          <div className="split-image">
            <img src="/images/templates.png" alt="Resume Templates Illustration" />
          </div>
        </div>
      </div>
    </section>
  );
}
