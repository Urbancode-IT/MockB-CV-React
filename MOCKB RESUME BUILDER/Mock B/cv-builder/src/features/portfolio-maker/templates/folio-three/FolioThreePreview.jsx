import { useEffect, useRef, useState } from 'react';
import { normalizeContent } from '../folio-one/buildZip';
import { buildThemeVars, getFontPreset, resolveFolioThreeDesign } from '../../config/design';
import { scrollToSection, downloadResumeFile, openExternal, openTalkChannel } from '../../utils/portfolioActions';
import { imgFingerprint } from '../../utils/fileHelpers';
import './FolioThreePreview.css';

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function FolioThreePreview({ content, accentColor, design, compact = false }) {
  const rootRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);
  const [activeNav, setActiveNav] = useState('about');
  const d = normalizeContent(content);
  const resolved = resolveFolioThreeDesign({
    ...design,
    accentColor: design?.accentColor || accentColor,
  });
  const theme = buildThemeVars(resolved);
  const font = getFontPreset(resolved.fontId);
  const ink = resolved.mode === 'light' ? '#141210' : '#F2EEE6';
  const paper = resolved.mode === 'light' ? '#F2EEE6' : '#070707';
  const accent = resolved.accentColor || theme.accent || ink;

  const style = {
    '--f3-ink': ink,
    '--f3-paper': paper,
    '--f3-muted': resolved.mode === 'light' ? 'rgba(20,18,16,0.58)' : 'rgba(242,238,230,0.58)',
    '--f3-line': resolved.mode === 'light' ? 'rgba(20,18,16,0.12)' : 'rgba(242,238,230,0.12)',
    '--f3-soft': resolved.mode === 'light' ? 'rgba(20,18,16,0.04)' : 'rgba(242,238,230,0.04)',
    '--f3-accent': accent,
    '--f3-sans': font.family,
    fontFamily: font.family,
  };

  const go = (id) => {
    scrollToSection(rootRef.current, id);
  };

  // Light section highlight only — no scroll-reveal animations
  useEffect(() => {
    if (!rootRef.current) return undefined;
    const root = rootRef.current;
    const sections = NAV.map((n) => root.querySelector(`#${n.id}`)).filter(Boolean);
    const navObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveNav(entry.target.id);
        });
      },
      { threshold: 0.2, rootMargin: '-20% 0px -50% 0px' },
    );
    sections.forEach((s) => navObs.observe(s));
    return () => navObs.disconnect();
  }, [compact]);

  const heroWord = String(content?.philosophy?.label || d.philosophy?.label || 'PORTFOLIO').toUpperCase().slice(0, 12) || 'PORTFOLIO';
  const projects = Array.isArray(content?.projects) ? content.projects : (d.projects || []);
  const experience = Array.isArray(content?.experience) ? content.experience : (d.experience || []);
  const skillsSource = Array.isArray(content?.techStack)
    ? content.techStack
    : (d.techStack?.length ? d.techStack : d.skills || []);
  const skills = skillsSource;
  const safeProjectIndex = projects.length ? Math.min(activeProject, projects.length - 1) : 0;
  const active = projects[safeProjectIndex] || projects[0];

  useEffect(() => {
    if (activeProject !== safeProjectIndex) setActiveProject(safeProjectIndex);
  }, [activeProject, safeProjectIndex]);

  // Prefer live editor values over normalize defaults when present on raw content
  const role = content?.role ?? d.role;
  const name = content?.name ?? d.name;
  const tagline = content?.tagline ?? d.tagline;
  const bio = content?.bio ?? d.bio;
  const introQuote = content?.introQuote ?? d.introQuote;
  const email = content?.email ?? d.email;
  const website = content?.website ?? d.website;
  const linkedin = content?.linkedin ?? d.linkedin;
  const github = content?.github ?? d.github;
  const location = content?.location ?? d.location;
  const profileImage = content?.profileImage !== undefined ? content.profileImage : d.profileImage;
  const initials = content?.initials || d.initials;

  useEffect(() => {
    if (!font?.url) return undefined;
    const id = `pm-font-${resolved.fontId}`;
    if (document.getElementById(id)) return undefined;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = font.url;
    document.head.appendChild(link);
    return undefined;
  }, [font?.url, resolved.fontId]);

  return (
    <div
      ref={rootRef}
      className={`f3-root${compact ? ' f3-root--compact f3-root--live' : ''}${resolved.mode === 'light' ? ' f3-root--light' : ''}`}
      style={style}
    >
      <header className="f3-hero" id="top">
        <div className="f3-hero__top">
          <button
            type="button"
            className="f3-arrow"
            onClick={() => go('work')}
            aria-label="Scroll to work"
          >
            <span className="f3-arrow__ring"><span aria-hidden="true">→</span></span>
          </button>
        </div>

        <div className="f3-hero__stage">
          <h1 className="f3-hero__title f3-hero__title--fill" aria-hidden="true">{heroWord}</h1>
          <div className="f3-hero__portrait">
            {profileImage ? (
              <img key={`profile-${imgFingerprint(profileImage)}`} src={profileImage} alt="" />
            ) : (
              <div className="f3-hero__portrait-fallback">{initials || '?'}</div>
            )}
            <div className="f3-hero__identity">
              <p className="f3-hero__name">{name || 'Your Name'}</p>
              {role ? <p className="f3-hero__role">{role}</p> : null}
            </div>
          </div>
          <h1 className="f3-hero__title f3-hero__title--stroke">{heroWord}</h1>
        </div>

        <nav className="f3-hero__nav" aria-label="Sections">
          {NAV.map((item) => (
            <button
              type="button"
              key={item.id}
              className={activeNav === item.id ? 'is-active' : ''}
              onClick={() => go(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <section className="f3-section f3-about" id="about">
        <div className="f3-about__grid">
          <div className="f3-about__copy">
            <p className="f3-kicker"><span>01</span> About</p>
            <h2 className="f3-display">{tagline || 'Clarity, craft, and calm digital presence.'}</h2>
            {bio ? <p className="f3-body">{bio}</p> : null}
            {(content?.resumeFileData || d.resumeFileData || content?.resumeFile || d.resumeFile) ? (
              <button
                type="button"
                className="f3-btn"
                onClick={() => { if (!compact) downloadResumeFile(d); }}
              >
                Download resume <span aria-hidden="true">↓</span>
              </button>
            ) : null}
          </div>
          <div className="f3-about__side">
            <blockquote className="f3-about__quote">
              <p>{introQuote || bio || tagline || 'Quiet systems. Sharp delivery.'}</p>
              <footer>
                <strong>{name || '—'}</strong>
                <span>{location || role || ''}</span>
              </footer>
            </blockquote>
            <div className="f3-stats">
              {[
                { label: 'Years', value: content?.stats?.years ?? d.stats?.years },
                { label: 'Projects', value: content?.stats?.projects ?? d.stats?.projects },
                { label: 'Clients', value: content?.stats?.clients ?? d.stats?.clients },
              ].filter((s) => s.value).map((s) => (
                <div key={s.label} className="f3-stat">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="f3-section f3-work" id="work">
        <div className="f3-section__head">
          <p className="f3-kicker"><span>02</span> Selected work</p>
          <h2 className="f3-display f3-display--sm">Projects that ship</h2>
          <p className="f3-lede">Hover a title to preview. Click to open the live piece.</p>
        </div>

        <div className="f3-work__layout">
          <ul className="f3-work__list">
            {projects.map((project, index) => (
              <li
                key={`project-${index}`}
                className={`f3-work__item${safeProjectIndex === index ? ' is-active' : ''}`}
                onMouseEnter={() => setActiveProject(index)}
              >
                <button
                  type="button"
                  className="f3-work__row"
                  onClick={() => {
                    setActiveProject(index);
                    if (!compact) openExternal(project.live || project.github || '#');
                  }}
                >
                  <span className="f3-work__index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="f3-work__main">
                    <span className="f3-work__name">{project.name}</span>
                    {project.description ? <span className="f3-work__desc">{project.description}</span> : null}
                  </span>
                  <span className="f3-work__meta">
                    <em>{project.roleTag || project.category || 'Case'}</em>
                    <span>{project.year || ''}</span>
                  </span>
                  <span className="f3-work__arrow" aria-hidden="true">↗</span>
                </button>
              </li>
            ))}
            {!projects.length ? (
              <li className="f3-work__empty">Add projects in the editor to fill this list.</li>
            ) : null}
          </ul>

          {active?.image ? (
            <div className="f3-work__stage" aria-hidden="true">
              <div className="f3-work__stage-inner">
                <img
                  key={`work-${safeProjectIndex}-${imgFingerprint(active.image)}`}
                  src={active.image}
                  alt=""
                />
                <div className="f3-work__stage-label">
                  <span>{String(safeProjectIndex + 1).padStart(2, '0')}</span>
                  <div className="f3-work__stage-copy">
                    <strong>{active.name}</strong>
                    {active.roleTag || active.category ? (
                      <em>{active.roleTag || active.category}</em>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="f3-section f3-exp" id="experience">
        <div className="f3-section__head">
          <p className="f3-kicker"><span>03</span> Experience</p>
          <h2 className="f3-display f3-display--sm">The path</h2>
        </div>
        <div className="f3-exp__rail">
          {experience.map((item, i) => (
            <article key={`exp-${i}`} className="f3-exp__card">
              <div className="f3-exp__dot" aria-hidden="true" />
              <div className="f3-exp__top">
                <h3>{item.role}</h3>
                <span className="f3-exp__period">{item.period}</span>
              </div>
              <p className="f3-exp__company">{item.company}</p>
              {item.description ? <p className="f3-body">{item.description}</p> : null}
            </article>
          ))}
          {!experience.length ? (
            <p className="f3-work__empty">Add experience entries in the editor.</p>
          ) : null}
        </div>
        {skills.length ? (
          <div className="f3-chips" aria-label="Skills">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        ) : null}
      </section>

      <section className="f3-section f3-contact" id="contact">
        <div className="f3-contact__panel">
          <p className="f3-kicker"><span>04</span> Contact</p>
          <h2 className="f3-display f3-display--sm">Let’s make something quiet and sharp.</h2>
          {email ? (
            <a className="f3-email" href={compact ? undefined : `mailto:${email}`}>
              {email}
            </a>
          ) : (
            <p className="f3-email f3-email--muted">you@email.com</p>
          )}
          <div className="f3-contact__actions">
            <button
              type="button"
              className="f3-btn"
              onClick={() => {
                if (compact) return;
                openTalkChannel({ ...d, email, whatsapp: content?.whatsapp || d.whatsapp, phone: content?.phone || d.phone });
              }}
            >
              Start a conversation
            </button>
            <div className="f3-contact__links">
              {linkedin ? (
                <button type="button" className="f3-text-link" onClick={() => !compact && openExternal(linkedin)}>LinkedIn</button>
              ) : null}
              {github ? (
                <button type="button" className="f3-text-link" onClick={() => !compact && openExternal(github)}>GitHub</button>
              ) : null}
              {website ? (
                <button type="button" className="f3-text-link" onClick={() => !compact && openExternal(website)}>Website</button>
              ) : null}
            </div>
          </div>
          <span className="f3-contact__watermark" aria-hidden="true">HELLO</span>
        </div>
      </section>

      <footer className="f3-footer">
        <span>{name || 'Portfolio'}</span>
        <button type="button" className="f3-linkish" onClick={() => go('top')}>
          Back to top ↑
        </button>
      </footer>
    </div>
  );
}
