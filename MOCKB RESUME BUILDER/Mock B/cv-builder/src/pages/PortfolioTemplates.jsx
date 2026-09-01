import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PORTFOLIO_TEMPLATES } from '../config/portfolioTemplates';
import { sampleForPortfolioTemplate } from '../data/samplePortfolioData';
import AtlasMinimalPreview from '../components/portfolio/AtlasMinimalPreview';
import StartModeModal from '../components/resume/StartModeModal';
import './PortfolioTemplates.css';
import './ResumeTemplates.css';

export default function PortfolioTemplates() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);
  const [previewId, setPreviewId] = useState(null);
  const [startTemplate, setStartTemplate] = useState(null);

  const previewTemplate = PORTFOLIO_TEMPLATES.find((t) => t.id === previewId);

  const beginCustomizer = (mode) => {
    if (!startTemplate) return;
    navigate('/portfolio/customizer', { state: { template: startTemplate, startMode: mode } });
    setStartTemplate(null);
  };

  return (
    <div className="resume-templates-page portfolio-templates-page">
      <section className="rt-hero">
        <div className="container">
          <p className="rt-eyebrow">Portfolio templates</p>
          <h1>Build a one-page portfolio website</h1>
          <p className="rt-lead">
            ThemeWagon-style layouts with live preview, editable content, and a downloadable React + Vite ZIP
            that includes step-by-step run instructions.
          </p>
        </div>
      </section>

      <section className="container rt-grid-section">
        <div className="rt-grid">
          {PORTFOLIO_TEMPLATES.map((template) => (
            <article
              key={template.id}
              className={`rt-card${hoveredId === template.id ? ' rt-card--hovered' : ''}`}
              onMouseEnter={() => setHoveredId(template.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <button type="button" className="rt-card-hit" onClick={() => setStartTemplate(template.id)}>
                <div className="rt-thumb">
                  <div className="pt-thumb-scale">
                    <AtlasMinimalPreview content={sampleForPortfolioTemplate()} accentColor={template.accentColor} compact />
                  </div>
                  <div className="rt-overlay">
                    <button
                      type="button"
                      className="rt-btn-preview"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewId(template.id);
                      }}
                    >
                      <i className="fa-solid fa-eye" /> Preview
                    </button>
                  </div>
                </div>
                <div className="rt-card-body">
                  <span className="rt-tag">Portfolio</span>
                  <h3>{template.name}</h3>
                  <p>{template.description}</p>
                  <ul className="pt-feature-list">
                    {template.features.slice(0, 3).map((feature) => (
                      <li key={feature}><i className="fa-solid fa-check" /> {feature}</li>
                    ))}
                  </ul>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>

      {previewTemplate && (
        <div className="pt-preview-modal" role="dialog" aria-modal="true">
          <div className="pt-preview-backdrop" onClick={() => setPreviewId(null)} />
          <div className="pt-preview-dialog">
            <header className="pt-preview-header">
              <h2>{previewTemplate.name}</h2>
              <button type="button" className="pt-preview-close" onClick={() => setPreviewId(null)}>
                <i className="fa-solid fa-xmark" />
              </button>
            </header>
            <div className="pt-preview-body">
              <AtlasMinimalPreview content={sampleForPortfolioTemplate()} accentColor={previewTemplate.accentColor} />
            </div>
            <footer className="pt-preview-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setPreviewId(null);
                  setStartTemplate(previewTemplate.id);
                }}
              >
                Use this template
              </button>
            </footer>
          </div>
        </div>
      )}

      {startTemplate && (
        <StartModeModal
          kind="portfolio"
          templateId={startTemplate}
          onClose={() => setStartTemplate(null)}
          onChoose={beginCustomizer}
        />
      )}
    </div>
  );
}
