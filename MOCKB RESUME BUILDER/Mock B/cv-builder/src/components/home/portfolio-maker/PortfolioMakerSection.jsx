import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PORTFOLIO_MAKER_TEMPLATES } from '../../../features/portfolio-maker/config/catalog';
import TemplateThumbShowcase, {
  PM_THUMB_CYCLE_MS,
} from '../../../features/portfolio-maker/components/TemplateThumbShowcase';
import './PortfolioMakerSection.css';

export default function PortfolioMakerSection() {
  const templates = PORTFOLIO_MAKER_TEMPLATES;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (templates.length < 2) return undefined;
    // Advance only after the active GIF-style scroll finishes one full cycle.
    const timer = setTimeout(() => {
      setActive((prev) => (prev + 1) % templates.length);
    }, PM_THUMB_CYCLE_MS);
    return () => clearTimeout(timer);
  }, [active, templates.length]);

  const featured = templates[active] || templates[0];

  return (
    <section id="portfolio-maker" className="pm-home-section container">
      <div className="pm-home-grid">
        <div className="pm-home-copy">
          <p className="pm-home-kicker">New — Portfolio Maker</p>
          <h2>Build a personal portfolio website & download the code</h2>
          <p>
            Preview animated portfolio templates, customize your content, then download a React + Vite ZIP
            with README instructions to run locally.
          </p>
          <ul className="pm-home-list">
            <li><i className="fa-solid fa-check" /> Live GIF-style template previews</li>
            <li><i className="fa-solid fa-check" /> WhatsApp, resume & project customization</li>
            <li><i className="fa-solid fa-check" /> Full source + npm run guide in README</li>
          </ul>
          <Link to="/portfolio-maker" className="btn btn-primary">
            Browse portfolio templates <i className="fa-solid fa-arrow-right" />
          </Link>
        </div>

        <div className="pm-home-preview">
          <div className="pm-home-card">
            <div className="pm-home-slider" aria-roledescription="carousel" aria-label="Portfolio template previews">
              {templates.map((template, index) => (
                <div
                  key={template.id}
                  className={`pm-home-slide${index === active ? ' is-active' : ''}`}
                  aria-hidden={index !== active}
                >
                  <div className="pm-home-thumb">
                    <TemplateThumbShowcase
                      templateId={template.id}
                      playing={index === active}
                      loop={false}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pm-home-card-body">
              <div className="pm-home-card-meta">
                <span className="pm-home-chip">{featured.framework}</span>
                <span className="pm-home-chip">{featured.category}</span>
              </div>
              <h3>{featured.name}</h3>
              <p>{featured.tagline}</p>
            </div>
          </div>

          <div className="pm-home-slider-meta">
            <button
              type="button"
              className="pm-home-nav"
              aria-label="Previous template"
              onClick={() => setActive((prev) => (prev - 1 + templates.length) % templates.length)}
            >
              <i className="fa-solid fa-chevron-left" />
            </button>
            <div className="pm-home-dots" role="tablist" aria-label="Choose template preview">
              {templates.map((template, index) => (
                <button
                  key={template.id}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  className={`pm-home-dot${index === active ? ' is-active' : ''}`}
                  onClick={() => setActive(index)}
                  title={template.name}
                />
              ))}
            </div>
            <button
              type="button"
              className="pm-home-nav"
              aria-label="Next template"
              onClick={() => setActive((prev) => (prev + 1) % templates.length)}
            >
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
