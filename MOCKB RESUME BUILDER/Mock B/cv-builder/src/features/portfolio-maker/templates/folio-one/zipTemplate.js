export function zipAppJsx() {
  return `import { useEffect, useRef, useState } from 'react'
import { data } from './data.js'
import { design } from './design.js'

const NAV = [
  { id: 'projects', label: 'Projects' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'stack', label: 'Stack' },
  { id: 'experience', label: 'Impact' },
]

function Headline({ segments }) {
  if (!segments?.length) return null
  return (
    <h1 className="fo-headline">
      {segments.map((seg, i) =>
        seg.bold ? <strong key={i}>{seg.text}</strong> : <span key={i}>{seg.text}</span>
      )}
    </h1>
  )
}

function StackMarquee({ items, ariaLabel }) {
  if (!items?.length) return null
  const expand = (list) => {
    const out = []
    while (out.length < Math.max(16, list.length * 3)) out.push(...list)
    return out
  }
  const row = expand(items)
  const renderGroup = (prefix) => (
    <div className="fo-autoflow__group" aria-hidden={prefix === 'b'}>
      {row.map((item, i) => (
        <span className="fo-stack-pill" key={prefix + '-' + item + '-' + i}>{item}</span>
      ))}
    </div>
  )
  return (
    <div className="fo-autoflow fo-autoflow--stack" aria-label={ariaLabel}>
      <div className="fo-autoflow__track">
        {renderGroup('a')}
        {renderGroup('b')}
      </div>
    </div>
  )
}

function scrollTo(root, id) {
  const el = root?.querySelector('#' + id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function formatWa(n) {
  return String(n || '').replace(/\\D/g, '')
}

function downloadResume(d) {
  if (d.resumeFile) {
    const link = document.createElement('a')
    link.href = d.resumeFile
    link.download = d.resumeFileName || 'Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    return
  }
  const lines = [
    d.name, d.role, '', d.tagline, '', d.bio, '',
    'Email: ' + d.email,
    d.phone ? 'Phone: ' + d.phone : '',
    d.location ? 'Location: ' + d.location : '',
    '', 'Skills', ...(d.skills || []).map((s) => '- ' + s),
    '', 'Experience',
    ...(d.experience || []).map((e) => e.role + ' — ' + e.company + ' (' + e.period + ')\\n' + (e.description || '')),
    '', 'Projects',
    ...(d.projects || []).map((p) => p.name + '\\n' + p.description + '\\nStack: ' + (p.tech || []).join(', ')),
  ].filter(Boolean)
  const blob = new Blob([lines.join('\\n')], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = (d.name || 'resume').replace(/\\s+/g, '_') + '_Resume.txt'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function openExternal(url) {
  if (!url || url === '#') return
  window.open(url, '_blank', 'noopener,noreferrer')
}

export default function App() {
  const rootRef = useRef(null)
  const [activeExp, setActiveExp] = useState(0)
  const [videoOpen, setVideoOpen] = useState(false)
  const initials = data.initials || data.name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()

  const go = (id) => scrollTo(rootRef.current, id)

  const talk = () => {
    const msg = 'Hi' + (data.name ? ' ' + data.name : '') + ', I came across your portfolio and would like to connect.'
    const wa = formatWa(data.whatsapp || data.phone)
    if (wa) {
      window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(msg), '_blank', 'noopener,noreferrer')
      return
    }
    if (data.email) {
      window.location.href = 'mailto:' + data.email + '?subject=Project%20inquiry'
      return
    }
    go('contact')
  }

  const stackItems = data.techStack?.length ? data.techStack : (data.skills || [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const nodes = root.querySelectorAll('.fo-reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fo-reveal--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={rootRef} className={'fo-preview' + (design.mode === 'light' ? ' fo-preview--light' : '')}>
      <header className="fo-header">
        <div className="fo-container fo-nav-row">
          <button type="button" className="fo-brand" onClick={() => go('top')}>
            <span className="fo-logo-box">{initials}</span>
            <span className="fo-logo-name">{data.name}</span>
          </button>
          <nav className="fo-nav-center" aria-label="Primary">
            {NAV.map((item) => (
              <button key={item.id} type="button" className="fo-nav-item" onClick={() => go(item.id)}>
                {item.label}
              </button>
            ))}
          </nav>
          <button type="button" className="fo-btn fo-btn-white fo-btn-nav" onClick={talk}>
            Let&apos;s Talk
          </button>
        </div>
      </header>

      <section className="fo-hero fo-reveal" id="top">
        <div className="fo-hero-bg" aria-hidden="true" />
        <div className="fo-container fo-hero-split">
          <div className="fo-hero-left">
            <Headline segments={data.headlineSegments} />
            <p className="fo-subline">{data.tagline}</p>
            <div className="fo-hero-cta">
              <button type="button" className="fo-btn fo-btn-white" onClick={talk}>Let&apos;s Talk</button>
              <button type="button" className="fo-btn fo-btn-outline" onClick={() => downloadResume(data)}>
                Download Resume
                <span className="fo-btn-icon" aria-hidden="true">↓</span>
              </button>
            </div>
          </div>
          <div className="fo-hero-right">
            <div className="fo-portrait-wrap">
              <div className="fo-portrait-grid" aria-hidden="true" />
              <div className="fo-portrait-glow" aria-hidden="true" />
              <img src={data.profileImage} alt={'Portrait of ' + data.name} className="fo-portrait-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="fo-block fo-reveal" id="solutions">
        <div className="fo-container">
          <div className="fo-bento">
            <article className={'fo-bento-card fo-bento-card--' + (data.features?.[0]?.variant || 'reliability')}>
              <div className="fo-bento-visual fo-bento-visual--reliability" aria-hidden="true">
                <span className="fo-code-icon">&lt;/&gt;</span>
              </div>
              <h3>{data.features?.[0]?.title}</h3>
              <p>{data.features?.[0]?.description}</p>
            </article>
            <div className="fo-bento-stack">
              {(data.features || []).slice(1).map((f) => (
                <article key={f.title} className={'fo-bento-card fo-bento-card--sm fo-bento-card--' + f.variant}>
                  <div className={'fo-bento-visual fo-bento-visual--' + f.variant} aria-hidden="true" />
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
          <StackMarquee items={stackItems} ariaLabel="Technology stack" />
        </div>
      </section>

      <section className="fo-block fo-reveal" id="projects">
        <div className="fo-container">
          <p className="fo-eyebrow">Work</p>
          <h2 className="fo-section-title">Featured Solutions &amp; Projects</h2>
          <div className="fo-work-list">
            {(data.projects || []).map((p, i) => (
              <article className="fo-work-card fo-reveal" key={p.name + '-' + i}>
                <div className="fo-work-media">
                  <div className="fo-work-media-bg" aria-hidden="true" />
                  <div className="fo-work-shot">
                    <img src={p.image} alt={p.name} />
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
                      aria-label={'View ' + p.name}
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
              {(data.experience || []).map((item, i) => (
                <article key={item.company + '-' + i} className={'fo-exp-item' + (activeExp === i ? ' fo-exp-item--active' : '')}>
                  <button type="button" className="fo-exp-trigger" onClick={() => setActiveExp(i)}>
                    <span className="fo-exp-company">{item.company}</span>
                    <span className="fo-exp-role">{item.role} — ({item.period})</span>
                  </button>
                  {activeExp === i && item.description ? (
                    <ul className="fo-exp-desc"><li>{item.description}</li></ul>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="fo-block fo-reveal" id="philosophy">
        <div className="fo-container fo-philosophy">
          <p className="fo-eyebrow fo-eyebrow--center">{data.philosophy?.label}</p>
          <h2 className="fo-section-title fo-section-title--center">{data.philosophy?.title}</h2>
          <button type="button" className="fo-video-thumb" onClick={() => setVideoOpen(true)} aria-label="Play philosophy video">
            <img src={data.philosophyVideo} alt="" />
            <span className="fo-play-btn" aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className="fo-block fo-reveal" id="contact">
        <div className="fo-container fo-contact">
          <h2 className="fo-section-title">Ready to build something scalable?</h2>
          <p className="fo-contact-lead">Let&apos;s discuss your architecture, product roadmap, or engineering team needs.</p>
          <div className="fo-contact-actions">
            <button type="button" className="fo-btn fo-btn-white" onClick={talk}>Let&apos;s Talk</button>
            <button type="button" className="fo-btn fo-btn-outline" onClick={() => openExternal(data.linkedin)}>
              Connect on LinkedIn
            </button>
          </div>
          <dl className="fo-contact-details">
            {data.email ? <div><dt>Email</dt><dd><a href={'mailto:' + data.email}>{data.email}</a></dd></div> : null}
            {data.phone ? <div><dt>Phone</dt><dd>{data.phone}</dd></div> : null}
            {data.location ? <div><dt>Location</dt><dd>{data.location}</dd></div> : null}
          </dl>
        </div>
      </section>

      <footer className="fo-footer">
        <div className="fo-container fo-footer-inner">
          <span>{data.name}</span>
          <span>© {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </footer>

      {videoOpen ? (
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
      ) : null}
    </div>
  )
}
`;
}
