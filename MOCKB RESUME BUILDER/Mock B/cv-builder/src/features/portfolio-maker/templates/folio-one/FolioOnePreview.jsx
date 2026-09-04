import { useEffect, useRef, useState } from 'react';
import { normalizeContent } from './buildZip';
import { buildThemeVars, themeToCssVars } from '../../config/design';
import { scrollToSection, downloadResumeFile, openExternal, openTalkChannel } from '../../utils/portfolioActions';
import './FolioOnePreview.css';

const NAV_ITEMS = [
  { id: 'projects', label: 'Projects' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'stack', label: 'Stack' },
  { id: 'experience', label: 'Impact' },
];

function Headline({ segments }) {
  if (!segments?.length) return null;
  return (
    <h1 className="fo-headline">
      {segments.map((seg, i) => (
        seg.bold ? <strong key={i}>{seg.text}</strong> : <span key={i}>{seg.text}</span>
      ))}
    </h1>
  );
}

function expandMarqueeItems(items) {
  if (!items?.length) return [];
  const out = [];
  while (out.length < Math.max(16, items.length * 3)) {
    out.push(...items);
  }
  return out;
}

function StackMarquee({ items, ariaLabel }) {
  if (!items?.length) return null;
  const row = expandMarqueeItems(items);
  const renderGroup = (prefix) => (
    <div className="fo-autoflow__group" aria-hidden={prefix === 'b' ? true : undefined}>
      {row.map((item, i) => (
        <span className="fo-stack-pill" key={`${prefix}-${item}-${i}`}>{item}</span>
      ))}
    </div>
  );
  return (
    <div className="fo-autoflow fo-autoflow--stack" aria-label={ariaLabel}>
      <div className="fo-autoflow__track">
        {renderGroup('a')}
        {renderGroup('b')}
      </div>
    </div>
  );
}

export default function FolioOnePreview({ content, accentColor, design, compact = false }) {
  const rootRef = useRef(null);
  const [activeExp, setActiveExp] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const d = normalizeContent(content);
  const theme = buildThemeVars({ ...design, accentColor: design?.accentColor || accentColor });
  const initials = d.initials || d.name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
  const isLight = theme.mode === 'light';

  const style = {
    ...themeToCssVars(theme),
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

  useEffect(() => {
    if (compact || !rootRef.current) return;
    const nodes = rootRef.current.querySelectorAll('.fo-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fo-reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [compact, content, design]);

  const stackItems = d.techStack?.length ? d.techStack : d.skills;

  return (
    <div
      ref={rootRef}
      className={`fo-preview${compact ? ' fo-preview--compact' : ''}${isLight ? ' fo-preview--light' : ''}`}
      style={style}
    >
      <header className="fo-header">
        <div className="fo-container fo-nav-row">
          <button type="button" className="fo-brand" onClick={() => go('top')}>
            <span className="fo-logo-box">{initials}</span>
            <span className="fo-logo-name">{d.name}</span>
          </button>
          {!compact && (
            <nav className="fo-nav-center" aria-label="Primary">
              {NAV_ITEMS.map((item) => (
                <button key={item.id} type="button" className="fo-nav-item" onClick={() => go(item.id)}>
                  {item.label}
                </button>
              ))}
            </nav>
          )}
          {!compact && (
            <button type="button" className="fo-btn fo-btn-white fo-btn-nav" onClick={talk}>
              Let&apos;s Talk
            </button>
          )}
        </div>
      </header>

      <section className="fo-hero fo-reveal" id="top">
        <div className="fo-hero-bg" aria-hidden="true" />
        <div className="fo-container fo-hero-split">
          <div className="fo-hero-left">
            <Headline segments={d.headlineSegments} />
            <p className="fo-subline">{d.tagline}</p>
            {!compact && (
              <div className="fo-hero-cta">
                <button type="button" className="fo-btn fo-btn-white" onClick={talk}>
                  Let&apos;s Talk
                </button>
                <button
                  type="button"
                  className="fo-btn fo-btn-outline"
                  onClick={() => downloadResumeFile(d)}
                >
                  Download Resume
                  <span className="fo-btn-icon" aria-hidden="true">↓</span>
                </button>
              </div>
            )}
          </div>
          <div className="fo-hero-right">
            <div className="fo-portrait-wrap">
              <div className="fo-portrait-grid" aria-hidden="true" />
              <div className="fo-portrait-glow" aria-hidden="true" />
              <img
                src={d.profileImage}
                alt={`Portrait of ${d.name}`}
                className="fo-portrait-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="fo-block fo-reveal" id="solutions">
        <div className="fo-container">
          <div className="fo-bento">
            <article className={`fo-bento-card fo-bento-card--${d.features[0]?.variant || 'reliability'}`}>
              <div className="fo-bento-visual fo-bento-visual--reliability" aria-hidden="true">
                <span className="fo-code-icon">&lt;/&gt;</span>
              </div>
              <h3>{d.features[0]?.title}</h3>
              <p>{d.features[0]?.description}</p>
            </article>
            <div className="fo-bento-stack">
              {d.features.slice(1).map((f) => (
                <article key={f.title} className={`fo-bento-card fo-bento-card--sm fo-bento-card--${f.variant}`}>
                  <div className={`fo-bento-visual fo-bento-visual--${f.variant}`} aria-hidden="true" />
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="fo-block fo-reveal" id="stack">
        <div className="fo-container fo-stack-section">
          <p className="fo-eyebrow">Stack</p>
          <h2 className="fo-section-title">Technologies I work with</h2>
          {!compact ? (
            <StackMarquee items={stackItems} ariaLabel="Technology stack" />
          ) : (
            <div className="fo-skill-grid">
              {stackItems.map((item) => (
                <span className="fo-stack-pill" key={item}>{item}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="fo-block fo-reveal" id="projects">
        <div className="fo-container">
          <p className="fo-eyebrow">Work</p>
          <h2 className="fo-section-title">Featured Solutions &amp; Projects</h2>
          <div className="fo-work-list">
            {d.projects.map((p, i) => (
              <article className="fo-work-card fo-reveal" key={`${p.name}-${i}`}>
                <div className="fo-work-media">
                  <div className="fo-work-media-bg" aria-hidden="true" />
                  <div className="fo-work-shot">
                    <img src={p.image} alt={p.name} loading="lazy" />
                  </div>
                </div>
                <div className="fo-work-body">
                  <div className="fo-work-top">
                    <div>
                      <h3>{p.name}</h3>
                      <p>{p.description}</p>
                    </div>
                    <button
                      type="button"
                      className="fo-work-link"
                      aria-label={`View ${p.name}`}
                      onClick={() => openExternal(p.live)}
                    >
                      ↗
                    </button>
                  </div>
                  <div className="fo-work-tags">
                    {p.roleTag ? <span className="fo-tag fo-tag--solid">{p.roleTag}</span> : null}
                    <span className="fo-tag fo-tag--outline">{(p.tech || []).join(' · ')}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fo-block fo-reveal" id="experience">
        <div className="fo-container">
          <p className="fo-eyebrow fo-eyebrow--center">Experience</p>
          <h2 className="fo-section-title fo-section-title--center">Professional milestones &amp; impact</h2>
          <div className="fo-exp-wrap">
            <div className="fo-exp-list fo-exp-list--solo">
              {d.experience.map((item, i) => (
                <article
                  key={`${item.company}-${i}`}
                  className={`fo-exp-item${activeExp === i ? ' fo-exp-item--active' : ''}`}
                >
                  <button
                    type="button"
                    className="fo-exp-trigger"
                    onClick={() => setActiveExp(i)}
                  >
                    <span className="fo-exp-company">{item.company}</span>
                    <span className="fo-exp-role">{item.role} — ({item.period})</span>
                  </button>
                  {activeExp === i && item.description ? (
                    <ul className="fo-exp-desc">
                      <li>{item.description}</li>
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="fo-block fo-reveal" id="philosophy">
        <div className="fo-container fo-philosophy">
          <p className="fo-eyebrow fo-eyebrow--center">{d.philosophy?.label}</p>
          <h2 className="fo-section-title fo-section-title--center">{d.philosophy?.title}</h2>
          <button
            type="button"
            className="fo-video-thumb"
            onClick={() => !compact && setVideoOpen(true)}
            aria-label="Play philosophy video"
          >
            <img src={d.philosophyVideo} alt="" loading="lazy" />
            <span className="fo-play-btn" aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className="fo-block fo-reveal" id="contact">
        <div className="fo-container fo-contact">
          <h2 className="fo-section-title">Ready to build something scalable?</h2>
          <p className="fo-contact-lead">Let&apos;s discuss your architecture, product roadmap, or engineering team needs.</p>
          <div className="fo-contact-actions">
            <button type="button" className="fo-btn fo-btn-white" onClick={talk}>
              Let&apos;s Talk
            </button>
            <button type="button" className="fo-btn fo-btn-outline" onClick={() => openExternal(d.linkedin)}>
              Connect on LinkedIn
            </button>
          </div>
          <dl className="fo-contact-details">
            {d.email ? <div><dt>Email</dt><dd><a href={`mailto:${d.email}`}>{d.email}</a></dd></div> : null}
            {d.phone ? <div><dt>Phone</dt><dd>{d.phone}</dd></div> : null}
            {d.location ? <div><dt>Location</dt><dd>{d.location}</dd></div> : null}
          </dl>
        </div>
      </section>

      {!compact && (
        <footer className="fo-footer">
          <div className="fo-container fo-footer-inner">
            <span>{d.name}</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>
        </footer>
      )}

      {videoOpen && !compact && (
        <div className="fo-video-modal" role="dialog" aria-modal="true">
          <button type="button" className="fo-video-backdrop" onClick={() => setVideoOpen(false)} aria-label="Close" />
          <div className="fo-video-dialog">
            <button type="button" className="fo-video-close" onClick={() => setVideoOpen(false)}>Close</button>
            <div className="fo-video-placeholder">
              <p>Engineering philosophy — video placeholder</p>
              <button type="button" className="fo-btn fo-btn-white" onClick={talk}>Schedule a conversation</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
