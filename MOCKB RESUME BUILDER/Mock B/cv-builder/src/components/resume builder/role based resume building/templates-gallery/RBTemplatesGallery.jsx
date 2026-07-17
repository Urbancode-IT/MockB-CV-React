import React, { useState } from 'react';
import './RBTemplatesGallery.css';
import { templateImages } from '../data/roleData';

const filters = ['all', 'frontend', 'backend', 'devops', 'data'];

export default function RBTemplatesGallery({ onUseTemplate }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? templateImages
    : templateImages.filter(t => t.role === activeFilter);

  return (
    <section className="templates-showcase" id="templates-gallery">
      <div className="container">
        <div className="section-header">
          <h2>Premium Role-Based Templates</h2>
          <p>Browse our collection of hand-crafted resume examples for every IT specialization.</p>
        </div>

        <div className="role-tabs">
          {filters.map(f => (
            <div
              key={f}
              className={`role-tab ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f === 'all' ? 'All Roles' : f.charAt(0).toUpperCase() + f.slice(1)}
            </div>
          ))}
        </div>

        <div className="templates-grid">
          {filtered.map((tmpl, idx) => (
            <div key={idx} className="template-item" data-role={tmpl.role}>
              <img src={tmpl.img} alt={tmpl.label} />
              <div className="template-overlay">
                <h3>{tmpl.label}</h3>
                <button
                  className="btn btn-primary"
                  onClick={() => onUseTemplate(tmpl.label)}
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
