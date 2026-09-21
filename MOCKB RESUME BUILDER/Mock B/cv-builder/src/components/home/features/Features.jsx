import React from 'react';
import './Features.css';

export default function Features() {
  return (
    <section id="features" className="container">
      <div className="home-features-grid">
        <div className="home-feature-card">
          <div className="home-feature-icon"><i className="fa-solid fa-layer-group"></i></div>
          <h3>Professional Templates</h3>
          <p>Choose from one-page and two-page resume designs, plus matching cover letter layouts built for real hiring workflows.</p>
        </div>
        <div className="home-feature-card">
          <div className="home-feature-icon"><i className="fa-solid fa-pen-ruler"></i></div>
          <h3>Live Resume Builder</h3>
          <p>Edit every section with a side-by-side preview. Reorder content, adjust fonts, colors, spacing, and page layout as you go.</p>
        </div>
        <div className="home-feature-card">
          <div className="home-feature-icon"><i className="fa-solid fa-file-pdf"></i></div>
          <h3>PDF Download</h3>
          <p>Preview exactly what you will download, then export a clean PDF ready to send to recruiters and job boards.</p>
        </div>
      </div>
    </section>
  );
}
