import { useEffect, useRef, useState } from 'react';
import { normalizeContent } from '../folio-one/buildZip';
import { buildThemeVars, folioTwoCssVars, resolveFolioTwoDesign } from '../../config/design';
import { scrollToSection, downloadResumeFile, openExternal, openTalkChannel } from '../../utils/portfolioActions';
import './FolioTwoPreview.css';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contacts', label: 'Contacts' },
];

const TOOL_META = {
  Figma: 'fa-brands fa-figma',
  FigJam: 'fa-solid fa-pen-ruler',
  Notion: 'fa-solid fa-n',
  Miro: 'fa-solid fa-table-cells-large',
  Framer: 'fa-solid fa-cube',
  Principle: 'fa-solid fa-play',
  'Adobe XD': 'fa-solid fa-pen-nib',
  Webflow: 'fa-solid fa-wind',
  Sketch: 'fa-brands fa-sketch',
  Photoshop: 'fa-solid fa-image',
  Illustrator: 'fa-solid fa-bezier-curve',
};

function expandMarqueeItems(items) {
  if (!items?.length) return [];
  const out = [];
  while (out.length < Math.max(18, items.length * 4)) out.push(...items);
  return out;
}

function ToolsBand({ items, ariaLabel }) {
  if (!items?.length) return null;
  const row = expandMarqueeItems(items);
  const renderGroup = (prefix) => (
    <div className="ft-tools__group" aria-hidden={prefix === 'b' ? true : undefined}>
      {row.map((item, i) => (
        <div className="ft-tool-card" key={`${prefix}-${item}-${i}`}>
          <span className="ft-tool-card__icon" aria-hidden="true">
            <i className={TOOL_META[item] || 'fa-solid fa-wand-magic-sparkles'} />
          </span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
  return (
    <div className="ft-tools" aria-label={ariaLabel}>
      <div className="ft-tools__track">
        {renderGroup('a')}
        {renderGroup('b')}
      </div>
    </div>
  );
}

export default function FolioTwoPreview({ content, accentColor, design, compact = false }) {
  const rootRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const d = normalizeContent(content);
  const resolvedDesign = resolveFolioTwoDesign({
    ...design,
    accentColor: design?.accentColor || accentColor,
  });
  const theme = buildThemeVars(resolvedDesign);

  const style = {
    ...folioTwoCssVars(theme),
    fontFamily: theme.fontFamily,
  };

  const go = (id) => {
    if (compact) return;
    scrollToSection(rootRef.current, id);
  };

  const talk = () => {
    if (compact) return;
    openTalkChannel(d);
  };

  const submitContact = (e) => {
    e.preventDefault();
    if (compact) return;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    const wa = String(d.whatsapp || d.phone || '').replace(/\D/g, '');
    if (wa) {
      window.open(`https://wa.me/${wa}?text=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer');
    } else if (d.email) {
      window.location.href = `mailto:${d.email}?subject=${encodeURIComponent('Portfolio inquiry')}&body=${encodeURIComponent(body)}`;
    }
    setSent(true);
  };

  useEffect(() => {
    if (compact || !rootRef.current) return undefined;
    const nodes = rootRef.current.querySelectorAll('.ft-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ft-reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [compact, content, design]);

  const stackItems = d.techStack?.length ? d.techStack : d.skills;
  const headline = (d.headlineSegments || []).map((s) => s.text).join('') || `Hello, my name is ${d.name}`;
  const aboutText = d.bio || d.tagline;

  return (
    <div
      ref={rootRef}
      className={`ft-preview${compact ? ' ft-preview--compact' : ''}${theme.mode === 'dark' ? ' ft-preview--dark' : ''}`}
      style={style}
    >
      <header className="ft-header">
        <div className="ft-container ft-nav">
          <button type="button" className="ft-brand" onClick={() => go('top')}>{d.name}</button>
          <nav className="ft-nav-links" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} type="button" className="ft-nav-link" onClick={() => go(item.id)}>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <section className="ft-hero ft-reveal" id="top">
        <div className="ft-container ft-hero-grid">
          <div className="ft-hero-copy">
            <p className="ft-role">{d.role || 'UI/UX DESIGNER'}</p>
            <h1 className="ft-headline">{headline}</h1>
            <p className="ft-lead">{d.tagline}</p>
            <div className="ft-hero-cta">
              <button type="button" className="ft-btn ft-btn-primary" onClick={() => go('projects')}>Projects</button>
              <button type="button" className="ft-btn ft-btn-outline" onClick={() => openExternal(d.linkedin)}>LinkedIn</button>
            </div>
          </div>
          <div className="ft-hero-visual">
            <div className="ft-blob" aria-hidden="true" />
            <div className="ft-portrait">
              <img src={d.profileImage} alt={d.name} />
            </div>
          </div>
        </div>
      </section>

      <section className="ft-block ft-reveal" id="about">
        <div className="ft-container ft-about-solo">
          <h2 className="ft-section-title">About me</h2>
          <p className="ft-about-text">{aboutText}</p>
          <button type="button" className="ft-btn ft-btn-primary" onClick={() => !compact && downloadResumeFile(d)}>
            Resume
          </button>
        </div>
      </section>

      {stackItems?.length ? (
        <section className="ft-block ft-block--tools ft-reveal" id="stack">
          <div className="ft-container">
            <p className="ft-eyebrow">Toolkit</p>
            <h2 className="ft-section-title ft-section-title--center">Tools I design with</h2>
            <p className="ft-tools-lead">The everyday stack behind research, prototypes, and polished product UI.</p>
            <ToolsBand items={stackItems} ariaLabel="Design tools" />
          </div>
        </section>
      ) : null}

      <section className="ft-block ft-reveal" id="projects">
        <div className="ft-container">
          <h2 className="ft-section-title ft-section-title--center">Projects</h2>
          <div className="ft-projects">
            {(d.projects || []).map((project, index) => (
              <article
                className={`ft-project-card ft-reveal${index % 2 === 1 ? ' ft-project-card--reverse' : ''}`}
                key={`${project.name}-${index}`}
                style={{ transitionDelay: `${Math.min(index, 4) * 80}ms` }}
              >
                <div className="ft-project-copy">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <button
                    type="button"
                    className="ft-btn ft-btn-outline ft-btn-sm"
                    onClick={() => openExternal(project.live || project.github)}
                  >
                    View Project
                  </button>
                </div>
                <div className="ft-project-media">
                  <img src={project.image} alt={project.name} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ft-contact-block ft-reveal" id="contacts">
        <div className="ft-container ft-contact-inner">
          <h2 className="ft-section-title ft-section-title--center">Contacts</h2>
          <p className="ft-contact-note">Have a project in mind? Send a message or chat on WhatsApp.</p>
          <form className="ft-form" onSubmit={submitContact}>
            <label>
              <span>Name</span>
              <input
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                required={!compact}
                autoComplete="name"
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                required={!compact}
                autoComplete="email"
              />
            </label>
            <label>
              <span>Message</span>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                required={!compact}
              />
            </label>
            <div className="ft-form-actions">
              <button type="button" className="ft-btn ft-btn-outline" onClick={talk}>Let&apos;s Talk</button>
              <button type="submit" className="ft-btn ft-btn-primary">{sent ? 'Sent' : 'Send'}</button>
            </div>
          </form>
        </div>
      </section>

      <footer className="ft-footer">
        <div className="ft-container ft-footer-panel">
          <div className="ft-footer-brand">
            <strong>{d.name}</strong>
            <span>{d.role}</span>
          </div>
          <div className="ft-social">
            <button type="button" aria-label="Instagram" onClick={() => openExternal(d.website || d.linkedin)}>
              <i className="fa-brands fa-instagram" />
            </button>
            <button type="button" aria-label="LinkedIn" onClick={() => openExternal(d.linkedin)}>
              <i className="fa-brands fa-linkedin-in" />
            </button>
            <button type="button" aria-label="WhatsApp" onClick={talk}>
              <i className="fa-brands fa-whatsapp" />
            </button>
            <button type="button" aria-label="Email" onClick={() => d.email && (window.location.href = `mailto:${d.email}`)}>
              <i className="fa-solid fa-envelope" />
            </button>
          </div>
          <div className="ft-footer-meta">
            <button type="button" onClick={() => go('projects')}>Projects</button>
            <button type="button" onClick={() => go('about')}>About</button>
            <button type="button" onClick={() => go('contacts')}>Contact</button>
          </div>
          <p className="ft-footer-copy">© {new Date().getFullYear()} {d.name}. Crafted with care.</p>
        </div>
      </footer>
    </div>
  );
}
