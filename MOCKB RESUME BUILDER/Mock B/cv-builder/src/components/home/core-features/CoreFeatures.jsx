import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CoreFeatures.css';

const FEATURES = [
  {
    id: 'builder',
    area: 'builder',
    icon: 'fa-file-lines',
    title: 'Resume & Cover Letter Builder',
    body: 'Start from a sample or blank page. Edit sections with a live preview that updates as you type.',
    to: '/resume/templates',
    cta: 'Open builder',
    preview: 'live',
  },
  {
    id: 'json',
    area: 'json',
    icon: 'fa-file-code',
    title: 'JSON + AI import',
    body: 'Export a live schema from your resume, ask any AI to fill it with your details, then upload it back.',
    to: '/resume/templates',
    cta: 'Try JSON import',
    preview: 'json',
  },
  {
    id: 'design',
    area: 'design',
    icon: 'fa-palette',
    title: 'Design Controls',
    body: 'Change accent color, fonts, heading style, margins, and section spacing.',
    to: '/resume/templates',
    cta: 'Browse templates',
    preview: 'design',
  },
  {
    id: 'pages',
    area: 'pages',
    icon: 'fa-table-columns',
    title: 'Two-Page Layouts',
    body: 'Move sections between page 1 and page 2 on supported templates.',
    to: '/resume/templates',
    cta: 'See multipage',
    preview: 'pages',
  },
  {
    id: 'letters',
    area: 'letters',
    icon: 'fa-envelope-open-text',
    title: 'Cover Letters',
    body: 'Dedicated cover letter templates and editor matched to your resume workflow.',
    to: '/cover-letter/templates',
    cta: 'Open letters',
    preview: null,
  },
  {
    id: 'gallery',
    area: 'gallery',
    icon: 'fa-eye',
    title: 'Template Gallery & Preview',
    body: 'Browse resume and cover letter templates, preview each design, then open with sample content or a blank start.',
    to: '/#templates-gallery',
    cta: 'View gallery',
    preview: null,
  },
  {
    id: 'save',
    area: 'save',
    icon: 'fa-floppy-disk',
    title: 'Save Progress',
    body: 'Store resumes and design presets in your library for later.',
    to: '/resume/templates#your-resumes',
    cta: 'Your resumes',
    preview: null,
  },
  {
    id: 'sections',
    area: 'sections',
    icon: 'fa-sliders',
    title: 'Section Control',
    body: 'Reorder sections, rename headings, hide entries, and tailor each template without leaving the builder.',
    to: '/resume/templates',
    cta: 'Start editing',
    preview: null,
  },
];

const JSON_SNIPPET = `{
  "personal": { "name": "…" },
  "experience": [{ "role": "…" }],
  "skills": [{ "name": "…" }]
}`;

function FeaturePreview({ type, active }) {
  if (type === 'json') {
    return (
      <div className={`cf-mini cf-mini--json${active ? ' is-active' : ''}`} aria-hidden="true">
        <div className="cf-mini-bar">
          <span />
          <span />
          <span />
        </div>
        <pre>{JSON_SNIPPET}</pre>
      </div>
    );
  }
  if (type === 'design') {
    return (
      <div className={`cf-mini cf-mini--design${active ? ' is-active' : ''}`} aria-hidden="true">
        <div className="cf-swatches">
          <i style={{ background: '#D4C77A' }} />
          <i style={{ background: '#0369A1' }} />
          <i style={{ background: '#0F766E' }} />
          <i style={{ background: '#9D174D' }} />
        </div>
        <div className="cf-type-row">
          <span className="cf-type cf-type--serif">Aa</span>
          <span className="cf-type cf-type--sans">Aa</span>
          <span className="cf-type cf-type--mono">Aa</span>
        </div>
      </div>
    );
  }
  if (type === 'pages') {
    return (
      <div className={`cf-mini cf-mini--pages${active ? ' is-active' : ''}`} aria-hidden="true">
        <div className="cf-sheet"><span /><span /><span /></div>
        <div className="cf-sheet cf-sheet--two"><span /><span /></div>
      </div>
    );
  }
  if (type === 'live') {
    return (
      <div className={`cf-mini cf-mini--live${active ? ' is-active' : ''}`} aria-hidden="true">
        <div className="cf-live-line is-pulse" />
        <div className="cf-live-line" />
        <div className="cf-live-line cf-live-line--short" />
        <div className="cf-live-badge">Live preview</div>
      </div>
    );
  }
  return null;
}

const SAMPLE_DECK = [
  {
    id: 'alex',
    name: 'Alex Morgan',
    role: 'Senior Product Manager',
    contact: 'alex.morgan@email.com · Bengaluru',
    kind: 'one-page',
    badge: '1 page',
  },
  {
    id: 'two-page',
    name: 'Neha Kapoor',
    role: 'Director of Operations',
    kind: 'two-page',
    badge: '2 page',
  },
  {
    id: 'two-col',
    name: 'Rohan Shah',
    role: 'Software Engineer',
    kind: 'two-column',
    badge: '2 column',
  },
  {
    id: 'diya',
    name: 'Diya Menon',
    role: 'Frontend Developer',
    kind: 'one-page',
    badge: '1 page',
    compact: true,
    sections: [
      { title: 'Experience', lines: 4 },
      { title: 'Skills', chips: 3 },
    ],
  },
  {
    id: 'karan',
    name: 'Karan Mehta',
    role: 'DevOps Engineer',
    kind: 'one-page',
    badge: '1 page',
    compact: true,
    sections: [
      { title: 'Projects', lines: 4 },
      { title: 'Certifications', lines: 2 },
    ],
  },
];

function SampleSheetBody({ card }) {
  if (card.kind === 'two-page') {
    return (
      <div className="cf-sample-twopage">
        <span className="cf-sample-badge">{card.badge}</span>
        <div className="cf-sample-pages">
          <div className="cf-sample-page">
            <strong>{card.name}</strong>
            <span>{card.role}</span>
            <div className="cf-sample-rule" />
            <h4>Page 1</h4>
            <p /><p /><p className="cf-sample-short" />
            <p /><p className="cf-sample-short" />
          </div>
          <div className="cf-sample-page">
            <h4>Page 2</h4>
            <p /><p className="cf-sample-short" />
            <p /><p /><p className="cf-sample-short" />
            <div className="cf-sample-chips">
              <span /><span /><span />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (card.kind === 'two-column') {
    return (
      <div className="cf-sample-twocol">
        <span className="cf-sample-badge">{card.badge}</span>
        <div className="cf-sample-twocol-grid">
          <aside>
            <strong>{card.name.split(' ')[0]}</strong>
            <em>{card.role}</em>
            <h4>Skills</h4>
            <p /><p className="cf-sample-short" />
            <p /><p className="cf-sample-short" />
            <h4>Languages</h4>
            <p className="cf-sample-short" />
          </aside>
          <main>
            <h4>Experience</h4>
            <p /><p /><p className="cf-sample-short" />
            <p /><p className="cf-sample-short" />
            <h4>Education</h4>
            <p /><p className="cf-sample-short" />
          </main>
        </div>
      </div>
    );
  }

  if (card.compact) {
    return (
      <>
        <span className="cf-sample-badge">{card.badge}</span>
        <div className="cf-sample-head">
          <strong>{card.name}</strong>
          <span>{card.role}</span>
        </div>
        <div className="cf-sample-rule" />
        {(card.sections || []).map((sec) => (
          <div className="cf-sample-sec" key={sec.title}>
            <h4>{sec.title}</h4>
            {sec.chips ? (
              <div className="cf-sample-chips">
                {Array.from({ length: sec.chips }).map((_, i) => <span key={i} />)}
              </div>
            ) : (
              Array.from({ length: sec.lines || 2 }).map((_, i) => (
                <p key={i} className={i % 2 ? 'cf-sample-short' : undefined} />
              ))
            )}
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <span className="cf-sample-badge">{card.badge}</span>
      <div className="cf-sample-head">
        <strong>{card.name}</strong>
        <span>{card.role}</span>
        {card.contact && <em>{card.contact}</em>}
      </div>
      <div className="cf-sample-rule" />
      <div className="cf-sample-sec">
        <h4>Summary</h4>
        <p />
        <p className="cf-sample-short" />
      </div>
      <div className="cf-sample-sec">
        <h4>Experience</h4>
        <div className="cf-sample-job">
          <b />
          <i />
        </div>
        <ul>
          <li /><li /><li className="cf-sample-short" />
        </ul>
        <div className="cf-sample-job">
          <b />
          <i />
        </div>
        <ul>
          <li /><li className="cf-sample-short" />
        </ul>
      </div>
      <div className="cf-sample-sec cf-sample-sec--split">
        <div>
          <h4>Skills</h4>
          <div className="cf-sample-chips">
            <span /><span /><span /><span />
          </div>
        </div>
        <div>
          <h4>Education</h4>
          <p />
          <p className="cf-sample-short" />
        </div>
      </div>
    </>
  );
}

function SampleResumeFill({ active }) {
  const [front, setFront] = useState(0);
  const [shuffling, setShuffling] = useState(false);

  useEffect(() => {
    const tick = () => {
      setShuffling(true);
      window.setTimeout(() => {
        setFront((n) => (n + 1) % SAMPLE_DECK.length);
        setShuffling(false);
      }, 320);
    };
    const id = window.setInterval(tick, 2600);
    return () => window.clearInterval(id);
  }, []);

  const roleFor = (index) => {
    const len = SAMPLE_DECK.length;
    const offset = (index - front + len) % len;
    if (offset === 0) return 'front';
    if (offset === 1) return 'right';
    if (offset === len - 1) return 'left';
    return 'hidden';
  };

  return (
    <div
      className={`cf-sample-resume${active ? ' is-active' : ''}${shuffling ? ' is-shuffling' : ''}`}
      aria-hidden="true"
    >
      <div className="cf-sample-fan">
        {SAMPLE_DECK.map((card, index) => (
          <div
            key={card.id}
            className={`cf-sample-sheet cf-sample-sheet--${roleFor(index)} cf-sample-sheet--${card.kind}`}
          >
            <SampleSheetBody card={card} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CoreFeatures() {
  const [activeId, setActiveId] = useState('builder');

  return (
    <section id="core-features" className="container">
      <div className="home-section-header text-center">
        <h2 className="home-section-title">Everything in one resume workspace</h2>
        <p className="home-section-subtitle">
          Templates, editing, customization, and export — built into a single builder experience.
        </p>
      </div>

      <div className="bento-grid">
        {FEATURES.map((feature) => (
          <Link
            key={feature.id}
            to={feature.to}
            className={`bento-item bento-area-${feature.area}${activeId === feature.id ? ' is-active' : ''}`}
            onMouseEnter={() => setActiveId(feature.id)}
            onFocus={() => setActiveId(feature.id)}
          >
            <div className="bento-bg" />
            <div className="bento-content">
              <div className="bento-top">
                <span className="bento-icon-wrap">
                  <i className={`fa-solid ${feature.icon} bento-icon`} />
                </span>
                {feature.preview && feature.preview !== 'live' && (
                  <FeaturePreview type={feature.preview} active={activeId === feature.id} />
                )}
                {feature.preview === 'live' && (
                  <span className="cf-live-pill">Live preview</span>
                )}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              {feature.area === 'builder' && (
                <SampleResumeFill active={activeId === feature.id} />
              )}
              <span className="bento-cta">
                {feature.cta}
                <i className="fa-solid fa-arrow-right" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
