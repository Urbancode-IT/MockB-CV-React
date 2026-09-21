import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sampleForTemplate } from '../../../data/sampleResumeData';
import ResumeTemplateThumb from '../../resume/ResumeTemplateThumb';
import './CombinedFeatures.css';
import '../../../pages/ResumeTemplates.css';

const SHOWCASE = [
  { id: 'classic-professional', label: '1 page', caption: 'Classic Professional' },
  { id: 'career-detail', label: '2 page', caption: 'Career Detail' },
  { id: 'portrait-profile', label: '2 column', caption: 'Portrait Profile' },
  { id: 'structured-split', label: 'Split', caption: 'Structured Split' },
];

function TemplateShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((n) => (n + 1) % SHOWCASE.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="cf-thumbs-panel">
      <div className="cf-thumbs-grid">
        {SHOWCASE.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`cf-thumb-card${active === index ? ' is-active' : ''}`}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
          >
            <span className="cf-thumb-badge">{item.label}</span>
            <div className="cf-thumb-frame rt-preview-box">
              <ResumeTemplateThumb
                template={item.id}
                resumeData={sampleForTemplate(item.id)}
              />
            </div>
            <span className="cf-thumb-caption">{item.caption}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CombinedFeatures() {
  return (
    <section className="container">
      <div className="home-combined-features">
        <div className="home-split-row home-reverse-row">
          <div className="home-split-image home-split-image--thumbs">
            <TemplateShowcase />
          </div>
          <div className="home-split-content">
            <h2>One-page and two-page templates</h2>
            <p>
              Browse resume and cover letter templates, preview them at full size,
              then start with sample content or a blank page.
            </p>
            <Link to="/resume/templates" className="home-btn-white">Browse templates</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
