import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CoverLetterTemplates.css';

const allTemplates = [
  { id: 1, name: 'Executive Pro', category: 'formal', level: 'senior', accent: '#EEC30C' },
  { id: 2, name: 'Clean Modern', category: 'modern', level: 'junior', accent: '#4a90e2' },
  { id: 3, name: 'Bold Impact', category: 'bold', level: 'mid', accent: '#e24a4a' },
  { id: 4, name: 'Creative Flow', category: 'creative', level: 'junior', accent: '#e67e22' },
  { id: 5, name: 'Minimalist', category: 'minimal', level: 'mid', accent: '#1abc9c' },
  { id: 6, name: 'Elegant Classic', category: 'formal', level: 'senior', accent: '#9b59b6' },
  { id: 7, name: 'Tech Ready', category: 'modern', level: 'mid', accent: '#27ae60' },
  { id: 8, name: 'Startup Energy', category: 'bold', level: 'junior', accent: '#f39c12' },
  { id: 9, name: 'Soft Professional', category: 'minimal', level: 'senior', accent: '#3498db' },
];

const categories = ['all', 'formal', 'modern', 'bold', 'creative', 'minimal'];
const levels = ['all', 'junior', 'mid', 'senior'];

export default function CoverLetterTemplates() {
  const navigate = useNavigate();
  const [catFilter, setCatFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);

  const filtered = allTemplates.filter(t => {
    const matchCat = catFilter === 'all' || t.category === catFilter;
    const matchLvl = levelFilter === 'all' || t.level === levelFilter;
    return matchCat && matchLvl;
  });

  return (
    <main className="clt-page">
      {/* Hero */}
      <section className="clt-hero">
        <div className="container">
          <h1>Cover Letter <span>Templates</span></h1>
          <p>Professional, ATS-optimized cover letter templates for every style and career level. Fully editable and ready to download.</p>
          <div className="clt-stats">
            <div className="cs"><strong>30+</strong><span>Templates</span></div>
            <div className="cs-div"></div>
            <div className="cs"><strong>100%</strong><span>ATS Compatible</span></div>
            <div className="cs-div"></div>
            <div className="cs"><strong>Free</strong><span>To Use</span></div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="clt-filters">
        <div className="container">
          <div className="clt-filter-row">
            <div className="clt-filter-group">
              <span>Style:</span>
              {categories.map(c => (
                <button key={c} className={`clt-filter-btn ${catFilter === c ? 'active' : ''}`} onClick={() => setCatFilter(c)}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              ))}
            </div>
            <div className="clt-filter-group">
              <span>Level:</span>
              {levels.map(l => (
                <button key={l} className={`clt-filter-btn ${levelFilter === l ? 'active' : ''}`} onClick={() => setLevelFilter(l)}>
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="clt-grid-section">
        <div className="container">
          <div className="clt-grid">
            {filtered.map(t => (
              <div
                key={t.id}
                className="clt-card"
                onMouseEnter={() => setHoveredId(t.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="clt-mock">
                  <div className="clt-mock-bar" style={{ background: t.accent }}></div>
                  <div className="clt-mock-body">
                    <div className="clt-sender">
                      <strong>Full Name</strong>
                      <span style={{ color: t.accent }}>Job Title</span>
                    </div>
                    <div className="clt-date-line" style={{ borderColor: t.accent }}>Date & Recipient</div>
                    <div className="clt-greeting" style={{ color: t.accent }}>Dear Hiring Manager,</div>
                    <div className="clt-para-lines">
                      <div className="cl-line long"></div>
                      <div className="cl-line medium"></div>
                      <div className="cl-line long"></div>
                      <div className="cl-line short"></div>
                    </div>
                    <div className="clt-para-lines" style={{ marginTop: '0.5rem' }}>
                      <div className="cl-line long"></div>
                      <div className="cl-line medium"></div>
                    </div>
                    <div className="clt-sign">Sincerely,<br /><strong style={{ color: t.accent }}>Full Name</strong></div>
                  </div>
                  {hoveredId === t.id && (
                    <div className="clt-overlay">
                      <button className="btn btn-primary" onClick={() => navigate('/cover-letter-customizer')}>
                        <i className="fa-solid fa-edit"></i> Customize
                      </button>
                      <button className="btn-outline-light">
                        <i className="fa-solid fa-download"></i> Download
                      </button>
                    </div>
                  )}
                </div>
                <div className="clt-card-footer">
                  <div>
                    <h4>{t.name}</h4>
                    <div className="clt-tags">
                      <span className="clt-tag">{t.category}</span>
                      <span className="clt-tag">{t.level}</span>
                    </div>
                  </div>
                  <div className="clt-accent-dot" style={{ background: t.accent }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
