import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RESUME_TEMPLATES } from '../config/templates';
import sampleResumeData from '../data/sampleResumeData';
import ResumeTemplateRenderer from '../components/resume/ResumeTemplateRenderer';
import './ResumeTemplates.css';

const categories = ['all', 'professional', 'modern', 'ats', 'creative'];

export default function ResumeTemplates() {
  const navigate = useNavigate();
  const [catFilter, setCatFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [hoveredId, setHoveredId] = useState(null);

  const filtered = RESUME_TEMPLATES.filter(t => {
    const matchCat = catFilter === 'all' || t.category === catFilter;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="rt-page">
      {/* Hero */}
      <section className="rt-hero">
        <div className="container">
          <h1>Professional <span>Resume Templates</span></h1>
          <p>Browse our collection of ATS-optimized, recruiter-approved resume templates. Select a design and customize it with your own data.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="rt-filters-bar">
        <div className="container">
          <div className="filters-row">
            <div className="search-box">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Search templates..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="filter-group">
              <span className="filter-label">Style:</span>
              {categories.map(c => (
                <button key={c} className={`filter-btn ${catFilter === c ? 'active' : ''}`} onClick={() => setCatFilter(c)}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Template Grid */}
      <section className="rt-grid-section">
        <div className="container">
          <div className="rt-count">{filtered.length} templates found</div>
          <div className="rt-grid">
            {filtered.map(t => (
              <div
                key={t.id}
                className="rt-card"
                onMouseEnter={() => setHoveredId(t.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Live React Component Preview */}
                <div className="rt-preview-box">
                  <div className="rt-preview-scale-wrapper">
                    <ResumeTemplateRenderer template={t.id} resumeData={sampleResumeData} />
                  </div>

                  {/* Overlay */}
                  {hoveredId === t.id && (
                    <div className="rt-overlay">
                      <button 
                        className="rt-btn-customize" 
                        onClick={() => navigate('/resume/customizer', { state: { template: t.id } })}
                      >
                        <i className="fa-solid fa-edit"></i> Customize
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="rt-card-footer">
                  <div>
                    <h4>{t.name}</h4>
                    <div className="rt-tags">
                      <span className="rt-tag" style={{ background: `${t.accentColor}20`, color: t.accentColor }}>
                        {t.category}
                      </span>
                      {t.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="rt-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="no-results">
              <i className="fa-solid fa-search"></i>
              <p>No templates match your filters.</p>
              <button className="btn btn-secondary" onClick={() => { setCatFilter('all'); setSearch(''); }}>Clear Filters</button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
