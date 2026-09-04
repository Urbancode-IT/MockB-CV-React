import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PORTFOLIO_MAKER_TEMPLATES } from '../config/catalog';
import TemplateThumbShowcase from '../components/TemplateThumbShowcase';
import '../../../pages/ResumeTemplates.css';
import './PortfolioMakerGallery.css';

export default function PortfolioMakerGallery() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [hoveredId, setHoveredId] = useState(null);

  const filtered = PORTFOLIO_MAKER_TEMPLATES.filter((t) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return [t.name, t.description, t.tagline, ...(t.tags || [])].join(' ').toLowerCase().includes(q);
  });

  const openEditor = (templateId, mode = 'sample') => {
    navigate(`/portfolio-maker/edit/${templateId}`, { state: { startMode: mode } });
  };

  const openPreview = (templateId) => {
    navigate(`/portfolio-maker/preview/${templateId}`);
  };

  return (
    <main className="rt-page pm-gallery-page">
      <section className="rt-hero">
        <div className="container">
          <h1>Professional <span>Portfolio Templates</span></h1>
          <p>
            Browse modern portfolio templates, open a full-page live preview,
            customize your content and design, then download a complete React + Vite ZIP.
          </p>
        </div>
      </section>

      <section className="rt-filters-bar" id="library-templates">
        <div className="container">
          <div className="filters-row">
            <div className="search-box">
              <i className="fa-solid fa-magnifying-glass" />
              <input
                type="search"
                placeholder="Search templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <span className="pm-count">{filtered.length} template{filtered.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </section>

      <section className="pm-container pm-gallery-section">
        <div className="pm-grid">
          {filtered.map((template) => (
            <article
              key={template.id}
              className={`pm-card${hoveredId === template.id ? ' pm-card--hover' : ''}`}
              onMouseEnter={() => setHoveredId(template.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="pm-card-thumb">
                <TemplateThumbShowcase templateId={template.id} />
                <div className="pm-card-overlay">
                  <button type="button" className="pm-btn pm-btn-ghost" onClick={() => openPreview(template.id)}>
                    <i className="fa-solid fa-eye" /> Live preview
                  </button>
                  <button type="button" className="pm-btn pm-btn-primary" onClick={() => openEditor(template.id)}>
                    Use template
                  </button>
                </div>
              </div>
              <div className="pm-card-body">
                <div className="pm-card-meta">
                  <span className="pm-tag">Free</span>
                  <span className="pm-framework">{template.framework}</span>
                </div>
                <h2>{template.name}</h2>
                <p>{template.description}</p>
                <ul className="pm-feature-list">
                  {template.features.slice(0, 3).map((f) => (
                    <li key={f}><i className="fa-solid fa-check" /> {f}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pm-steps">
        <div className="pm-container">
          <h2>How it works</h2>
          <div className="pm-steps-grid">
            <div className="pm-step">
              <span className="pm-step-num">01</span>
              <h3>Pick a template</h3>
              <p>Open the full-page preview to explore the layout before you commit.</p>
            </div>
            <div className="pm-step">
              <span className="pm-step-num">02</span>
              <h3>Preview & customize</h3>
              <p>Edit fonts, colors, content, and see changes in real time.</p>
            </div>
            <div className="pm-step">
              <span className="pm-step-num">03</span>
              <h3>Download ZIP</h3>
              <p>Get React + Vite source code plus a README with npm install and run steps.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
