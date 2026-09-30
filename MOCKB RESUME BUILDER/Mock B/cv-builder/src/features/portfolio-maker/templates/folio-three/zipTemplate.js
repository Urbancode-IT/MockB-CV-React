export function zipAppJsx() {
  return `import { useEffect, useRef, useState } from 'react'
import { data } from './data.js'
import { design } from './design.js'

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

function scrollTo(root, id) {
  const el = root?.querySelector('#' + id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function openExternal(url) {
  if (!url || url === '#') return
  window.open(url, '_blank', 'noopener,noreferrer')
}

function downloadResume(d) {
  if (d.resumeFile) {
    const link = document.createElement('a')
    link.href = d.resumeFile
    link.download = d.resumeFileName || 'Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export default function App() {
  const rootRef = useRef(null)
  const [activeProject, setActiveProject] = useState(0)
  const [activeNav, setActiveNav] = useState('about')
  const ink = design.mode === 'light' ? '#141210' : '#F2EEE6'
  const paper = design.mode === 'light' ? '#F2EEE6' : '#070707'
  const style = {
    '--f3-ink': ink,
    '--f3-paper': paper,
    '--f3-muted': design.mode === 'light' ? 'rgba(20,18,16,0.58)' : 'rgba(242,238,230,0.58)',
    '--f3-line': design.mode === 'light' ? 'rgba(20,18,16,0.12)' : 'rgba(242,238,230,0.12)',
    '--f3-soft': design.mode === 'light' ? 'rgba(20,18,16,0.04)' : 'rgba(242,238,230,0.04)',
    '--f3-accent': design.accentColor || ink,
    '--f3-sans': design.fontFamily || "'Manrope', system-ui, sans-serif",
    fontFamily: design.fontFamily || "'Manrope', system-ui, sans-serif",
  }
  const go = (id) => scrollTo(rootRef.current, id)
  const heroWord = String(data.philosophy?.label || 'PORTFOLIO').toUpperCase().slice(0, 12)
  const projects = data.projects || []
  const skills = data.techStack?.length ? data.techStack : (data.skills || [])
  const active = projects[activeProject] || projects[0]

  useEffect(() => {
    const sections = NAV.map((n) => rootRef.current?.querySelector('#' + n.id)).filter(Boolean)
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveNav(entry.target.id)
      })
    }, { threshold: 0.2, rootMargin: '-20% 0px -50% 0px' })
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={rootRef} className={'f3-root' + (design.mode === 'light' ? ' f3-root--light' : '')} style={style}>
      <header className="f3-hero" id="top">
        <div className="f3-hero__top">
          <button type="button" className="f3-arrow" onClick={() => go('work')} aria-label="Work">
            <span className="f3-arrow__ring">→</span>
          </button>
        </div>
        <div className="f3-hero__stage">
          <h1 className="f3-hero__title f3-hero__title--fill" aria-hidden="true">{heroWord}</h1>
          <div className="f3-hero__portrait">
            {data.profileImage ? <img src={data.profileImage} alt="" /> : <div className="f3-hero__portrait-fallback">{data.initials || '?'}</div>}
            <div className="f3-hero__identity">
              <p className="f3-hero__name">{data.name}</p>
              {data.role ? <p className="f3-hero__role">{data.role}</p> : null}
            </div>
          </div>
          <h1 className="f3-hero__title f3-hero__title--stroke">{heroWord}</h1>
        </div>
        <nav className="f3-hero__nav">
          {NAV.map((item) => (
            <button type="button" key={item.id} className={activeNav === item.id ? 'is-active' : ''} onClick={() => go(item.id)}>{item.label}</button>
          ))}
        </nav>
      </header>

      <section className="f3-section f3-about" id="about">
        <div className="f3-about__grid">
          <div className="f3-about__copy">
            <p className="f3-kicker"><span>01</span> About</p>
            <h2 className="f3-display">{data.tagline || data.bio}</h2>
            {data.bio && data.tagline ? <p className="f3-body">{data.bio}</p> : null}
            {data.resumeFile ? <button type="button" className="f3-btn" onClick={() => downloadResume(data)}>Download resume ↓</button> : null}
          </div>
          <div className="f3-about__side">
            <blockquote className="f3-about__quote">
              <p>{data.introQuote || data.bio || data.tagline || 'Quiet systems. Sharp delivery.'}</p>
              <footer><strong>{data.name}</strong><span>{data.location || data.role}</span></footer>
            </blockquote>
            <div className="f3-stats">
              {[['Years', data.stats?.years], ['Projects', data.stats?.projects], ['Clients', data.stats?.clients]]
                .filter(([, v]) => v)
                .map(([label, value]) => (
                  <div className="f3-stat" key={label}><strong>{value}</strong><span>{label}</span></div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <section className="f3-section f3-work" id="work">
        <div className="f3-section__head">
          <p className="f3-kicker"><span>02</span> Selected work</p>
          <h2 className="f3-display f3-display--sm">Projects that ship</h2>
        </div>
        <div className="f3-work__layout">
          <ul className="f3-work__list">
            {projects.map((project, index) => (
              <li key={project.name + index} className={'f3-work__item' + (activeProject === index ? ' is-active' : '')} onMouseEnter={() => setActiveProject(index)}>
                <button type="button" className="f3-work__row" onClick={() => openExternal(project.live || project.github)}>
                  <span className="f3-work__index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="f3-work__main">
                    <span className="f3-work__name">{project.name}</span>
                    {project.description ? <span className="f3-work__desc">{project.description}</span> : null}
                  </span>
                  <span className="f3-work__meta"><em>{project.roleTag || project.category || 'Case'}</em><span>{project.year || ''}</span></span>
                  <span className="f3-work__arrow">↗</span>
                </button>
              </li>
            ))}
          </ul>
          {active?.image ? (
            <div className="f3-work__stage" aria-hidden="true">
              <div className="f3-work__stage-inner">
                <img src={active.image} alt="" />
                <div className="f3-work__stage-label"><span>{String((activeProject || 0) + 1).padStart(2, '0')}</span><strong>{active.name}</strong></div>
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
          {(data.experience || []).map((item, i) => (
            <article key={i} className="f3-exp__card">
              <div className="f3-exp__dot" aria-hidden="true" />
              <div className="f3-exp__top"><h3>{item.role}</h3><span className="f3-exp__period">{item.period}</span></div>
              <p className="f3-exp__company">{item.company}</p>
              {item.description ? <p className="f3-body">{item.description}</p> : null}
            </article>
          ))}
        </div>
        {skills.length ? <div className="f3-chips">{skills.map((s) => <span key={s}>{s}</span>)}</div> : null}
      </section>

      <section className="f3-section f3-contact" id="contact">
        <div className="f3-contact__panel">
          <p className="f3-kicker"><span>04</span> Contact</p>
          <h2 className="f3-display f3-display--sm">Let's make something quiet and sharp.</h2>
          {data.email ? <a className="f3-email" href={'mailto:' + data.email}>{data.email}</a> : null}
          <div className="f3-contact__actions">
            <div className="f3-contact__links">
              {data.linkedin ? <button type="button" className="f3-text-link" onClick={() => openExternal(data.linkedin)}>LinkedIn</button> : null}
              {data.github ? <button type="button" className="f3-text-link" onClick={() => openExternal(data.github)}>GitHub</button> : null}
              {data.website ? <button type="button" className="f3-text-link" onClick={() => openExternal(data.website)}>Website</button> : null}
            </div>
          </div>
          <span className="f3-contact__watermark" aria-hidden="true">HELLO</span>
        </div>
      </section>

      <footer className="f3-footer">
        <span>{data.name}</span>
        <button type="button" className="f3-linkish" onClick={() => go('top')}>Back to top ↑</button>
      </footer>
    </div>
  )
}
`;
}
