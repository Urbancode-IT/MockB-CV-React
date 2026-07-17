import React from 'react';
import './RBWhySection.css';

export default function RBWhySection() {
  return (
    <section className="details-section container">
      <div className="glass rb-why-panel">
        <div className="rb-why-grid">
          <div>
            <h2>Why <span>Role-Based</span> Resume Building is Important?</h2>
            <p>
              Generic resumes often fail to pass specialized ATS filters. Our role-based approach ensures that your
              resume contains the exact keywords, technical skills, and project descriptions that recruiters in your
              specific field are looking for.
            </p>
            <ul className="rb-check-list">
              <li><i className="fa-solid fa-check"></i> Specialized Keyword Optimization</li>
              <li><i className="fa-solid fa-check"></i> Industry-Standard Formatting</li>
              <li><i className="fa-solid fa-check"></i> Expert-Crafted Bullet Points</li>
            </ul>
          </div>
          <div className="rb-insight-box">
            <h4>Industry Insight</h4>
            <p>
              "Recruiters spend only 6 seconds on a resume. A role-specific layout ensures they see your most relevant
              skills in the first 2 seconds, increasing your interview chances by 3x."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
