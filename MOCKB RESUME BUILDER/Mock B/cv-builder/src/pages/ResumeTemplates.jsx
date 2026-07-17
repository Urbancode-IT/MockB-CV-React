import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResumeTemplates.css';

const allTemplates = [
  { id: 1, name: 'Modern Pro', category: 'modern', level: 'senior', accent: '#EEC30C', cols: 2 },
  { id: 2, name: 'Clean Minimal', category: 'minimal', level: 'junior', accent: '#4a90e2', cols: 1 },
  { id: 3, name: 'Bold Executive', category: 'bold', level: 'senior', accent: '#e24a4a', cols: 2 },
  { id: 4, name: 'Creative Splash', category: 'creative', level: 'junior', accent: '#e67e22', cols: 1 },
  { id: 5, name: 'Dark Terminal', category: 'dark', level: 'mid', accent: '#1abc9c', cols: 2 },
  { id: 6, name: 'Elegant Serif', category: 'elegant', level: 'senior', accent: '#9b59b6', cols: 1 },
  { id: 7, name: 'Developer Grid', category: 'tech', level: 'mid', accent: '#27ae60', cols: 2 },
  { id: 8, name: 'Glassmorphic', category: 'modern', level: 'mid', accent: '#3498db', cols: 2 },
  { id: 9, name: 'Compact Pro', category: 'minimal', level: 'junior', accent: '#e74c3c', cols: 1 },
  { id: 10, name: 'Startup Bold', category: 'bold', level: 'junior', accent: '#f39c12', cols: 2 },
  { id: 11, name: 'Academic Pro', category: 'elegant', level: 'senior', accent: '#2c3e50', cols: 1 },
  { id: 12, name: 'Neon Dark', category: 'dark', level: 'mid', accent: '#00d2ff', cols: 2 },
];

const categories = ['all', 'modern', 'minimal', 'bold', 'creative', 'dark', 'elegant', 'tech'];
const levels = ['all', 'junior', 'mid', 'senior'];

export default function ResumeTemplates() {
  const navigate = useNavigate();
  const [catFilter, setCatFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [hoveredId, setHoveredId] = useState(null);

  const filtered = allTemplates.filter(t => {
    const matchCat = catFilter === 'all' || t.category === catFilter;
    const matchLvl = levelFilter === 'all' || t.level === levelFilter;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchLvl && matchSearch;
  });

  return (
    <main className="rt-page">
      {/* Hero */}
      <section className="rt-hero">
        <div className="container">
          <h1>Professional <span>Resume Templates</span></h1>
          <p>Browse our collection of ATS-optimized, recruiter-approved resume templates. Filter by style, level, or role and download instantly.</p>
          <div className="rt-hero-stats">
            <div className="hs"><strong>50+</strong><span>Templates</span></div>
            <div className="hs-divider"></div>
            <div className="hs"><strong>100%</strong><span>ATS Friendly</span></div>
            <div className="hs-divider"></div>
            <div className="hs"><strong>Free</strong><span>Download</span></div>
          </div>
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
            <div className="filter-group">
              <span className="filter-label">Level:</span>
              {levels.map(l => (
                <button key={l} className={`filter-btn ${levelFilter === l ? 'active' : ''}`} onClick={() => setLevelFilter(l)}>
                  {l.charAt(0).toUpperCase() + l.slice(1)}
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
                {/* Template Mock Preview */}
                <div className="rt-mock" style={{ '--t-accent': t.accent }}>
                  <div className="rt-mock-bar" style={{ background: t.accent }}></div>
                  <div className="rt-mock-body">
                    <div className="rt-mock-header">
                      <div className="rt-mock-name" style={{ color: t.accent }}>FULL NAME</div>
                      <div className="rt-mock-role">Job Title</div>
                    </div>
                    <div className={`rt-mock-layout ${t.cols === 2 ? 'two-col' : 'single'}`}>
                      <div className="rt-mock-main">
                        <div className="rt-mock-section-hd" style={{ color: t.accent }}>EXPERIENCE</div>
                        <div className="rt-line long"></div>
                        <div className="rt-line medium"></div>
                        <div className="rt-line long"></div>
                        <div className="rt-mock-section-hd" style={{ color: t.accent, marginTop: '0.5rem' }}>EDUCATION</div>
                        <div className="rt-line medium"></div>
                        <div className="rt-line short"></div>
                      </div>
                      {t.cols === 2 && (
                        <div className="rt-mock-side">
                          <div className="rt-mock-section-hd" style={{ color: t.accent }}>SKILLS</div>
                          {['React', 'Node.js', 'AWS', 'Docker'].map(s => (
                            <div key={s} className="rt-skill-chip" style={{ borderColor: t.accent, color: t.accent }}>{s}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Overlay */}
                  {hoveredId === t.id && (
                    <div className="rt-overlay">
                      <button className="btn btn-primary" onClick={() => navigate('/resume-customizer')}>
                        <i className="fa-solid fa-edit"></i> Customize
                      </button>
                      <button className="btn btn-outline-light">
                        <i className="fa-solid fa-eye"></i> Preview
                      </button>
                    </div>
                  )}
                </div>
                <div className="rt-card-footer">
                  <div>
                    <h4>{t.name}</h4>
                    <div className="rt-tags">
                      <span className="rt-tag">{t.category}</span>
                      <span className="rt-tag">{t.level}</span>
                      <span className="rt-tag">{t.cols}-col</span>
                    </div>
                  </div>
                  <button className="dl-btn" title="Download"><i className="fa-solid fa-download"></i></button>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="no-results">
              <i className="fa-solid fa-search"></i>
              <p>No templates match your filters.</p>
              <button className="btn btn-secondary" onClick={() => { setCatFilter('all'); setLevelFilter('all'); setSearch(''); }}>Clear Filters</button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
