export function zipAppJsx() {
  return `import { useEffect, useRef, useState } from 'react'
import { data } from './data.js'
import { design } from './design.js'

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contacts', label: 'Contacts' },
]

function expand(items) {
  const out = []
  while (out.length < Math.max(16, items.length * 3)) out.push(...items)
  return out
}

function StackMarquee({ items }) {
  if (!items?.length) return null
  const row = expand(items)
  return (
    <div className="ft-autoflow" aria-label="Tech stack">
      <div className="ft-autoflow__track">
        {['a', 'b'].map((prefix) => (
          <div className="ft-autoflow__group" key={prefix} aria-hidden={prefix === 'b'}>
            {row.map((item, i) => (
              <span className="ft-stack-pill" key={prefix + '-' + item + '-' + i}>{item}</span>
            ))}
          </div>
        ))}
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
  const lines = [d.name, d.role, '', d.tagline, '', 'Email: ' + d.email].filter(Boolean)
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
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const headline = (data.headlineSegments || []).map((s) => s.text).join('') || ('Hello, my name is ' + data.name)
  const stackItems = data.techStack?.length ? data.techStack : (data.skills || [])
  const go = (id) => scrollTo(rootRef.current, id)

  const talk = () => {
    const msg = 'Hi' + (data.name ? ' ' + data.name : '') + ', I came across your portfolio and would like to connect.'
    const wa = formatWa(data.whatsapp || data.phone)
    if (wa) {
      window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(msg), '_blank', 'noopener,noreferrer')
      return
    }
    if (data.email) window.location.href = 'mailto:' + data.email + '?subject=Project%20inquiry'
    else go('contacts')
  }

  const submitContact = (e) => {
    e.preventDefault()
    const body = 'Name: ' + form.name + '\\nEmail: ' + form.email + '\\n\\n' + form.message
    const wa = formatWa(data.whatsapp || data.phone)
    if (wa) window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(body), '_blank', 'noopener,noreferrer')
    else if (data.email) window.location.href = 'mailto:' + data.email + '?subject=' + encodeURIComponent('Portfolio inquiry') + '&body=' + encodeURIComponent(body)
    setSent(true)
  }

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const nodes = root.querySelectorAll('.ft-reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ft-reveal--visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={rootRef} className={'ft-preview' + (design.mode === 'dark' ? ' ft-preview--dark' : '')} style={{
      fontFamily: design.fontFamily,
      '--ft-accent': design.accentColor,
      '--ft-accent-grad': design.accentGradient,
      '--ft-accent-deep': design.accentColor,
      '--ft-footer-accent': design.accentColor,
      '--ft-line': design.accentColor + '44',
      '--ft-input-ring': design.accentColor + '40',
      '--ft-on-accent': '#ffffff',
    }}>
      <header className="ft-header">
        <div className="ft-container ft-nav">
          <button type="button" className="ft-brand" onClick={() => go('top')}>{data.name}</button>
          <nav className="ft-nav-links">
            {NAV.map((item) => (
              <button key={item.id} type="button" className="ft-nav-link" onClick={() => go(item.id)}>{item.label}</button>
            ))}
          </nav>
        </div>
      </header>

      <section className="ft-hero ft-reveal" id="top">
        <div className="ft-container ft-hero-grid">
          <div className="ft-hero-copy">
            <p className="ft-role">{data.role}</p>
            <h1 className="ft-headline">{headline}</h1>
            <p className="ft-lead">{data.tagline}</p>
            <div className="ft-hero-cta">
              <button type="button" className="ft-btn ft-btn-primary" onClick={() => go('projects')}>Projects</button>
              <button type="button" className="ft-btn ft-btn-outline" onClick={() => openExternal(data.linkedin)}>LinkedIn</button>
            </div>
          </div>
          <div className="ft-hero-visual">
            <div className="ft-blob" aria-hidden="true" />
            <div className="ft-portrait"><img src={data.profileImage} alt={data.name} /></div>
          </div>
        </div>
      </section>

      <section className="ft-block ft-reveal" id="about">
        <div className="ft-container ft-about-grid">
          <div className="ft-about-copy">
            <h2 className="ft-section-title">About me</h2>
            <p className="ft-about-text">{data.bio || data.tagline}</p>
            <button type="button" className="ft-btn ft-btn-primary" onClick={() => downloadResume(data)}>Resume</button>
          </div>
          <div className="ft-about-visual">
            <div className="ft-about-circle"><img src={data.profileImage} alt="" /></div>
          </div>
        </div>
      </section>

      {stackItems.length ? (
        <section className="ft-block ft-reveal" id="stack">
          <div className="ft-container">
            <p className="ft-eyebrow">Stack</p>
            <h2 className="ft-section-title ft-section-title--center">Tools I design with</h2>
            <StackMarquee items={stackItems} />
          </div>
        </section>
      ) : null}

      <section className="ft-block ft-reveal" id="projects">
        <div className="ft-container">
          <h2 className="ft-section-title ft-section-title--underline">Projects</h2>
          <div className="ft-projects">
            {(data.projects || []).map((project, index) => (
              <article key={project.name + '-' + index} className={'ft-project-card ft-reveal' + (index % 2 === 1 ? ' ft-project-card--reverse' : '')}>
                <div className="ft-project-copy">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <button type="button" className="ft-btn ft-btn-outline ft-btn-sm" onClick={() => openExternal(project.live || project.github)}>View Project</button>
                </div>
                <div className="ft-project-media"><img src={project.image} alt={project.name} /></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ft-contact-block ft-reveal" id="contacts">
        <div className="ft-container ft-contact-inner">
          <h2 className="ft-section-title ft-section-title--underline">Contacts</h2>
          <p className="ft-contact-note">Have a project in mind? Send a message or chat on WhatsApp.</p>
          <form className="ft-form" onSubmit={submitContact}>
            <label><span>Name</span><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
            <label><span>Email</span><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
            <label><span>Message</span><textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required /></label>
            <div className="ft-form-actions">
              <button type="button" className="ft-btn ft-btn-outline" onClick={talk}>Let's Talk</button>
              <button type="submit" className="ft-btn ft-btn-primary">{sent ? 'Sent' : 'Send'}</button>
            </div>
          </form>
        </div>
      </section>

      <footer className="ft-footer">
        <div className="ft-container ft-footer-inner">
          <div className="ft-social">
            <button type="button" aria-label="Instagram" onClick={() => openExternal(data.website || data.linkedin)}><i className="fa-brands fa-instagram" /></button>
            <button type="button" aria-label="LinkedIn" onClick={() => openExternal(data.linkedin)}><i className="fa-brands fa-linkedin-in" /></button>
            <button type="button" aria-label="Email" onClick={() => data.email && (window.location.href = 'mailto:' + data.email)}><i className="fa-solid fa-envelope" /></button>
          </div>
          <p>{data.name} {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}
`;
}
