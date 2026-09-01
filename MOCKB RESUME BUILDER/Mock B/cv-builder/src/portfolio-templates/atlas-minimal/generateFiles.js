const esc = (value) => String(value ?? '')
  .replace(/\\/g, '\\\\')
  .replace(/'/g, "\\'")
  .replace(/\n/g, '\\n');

const escJson = (value) => JSON.stringify(value, null, 2);

export function normalizePortfolioContent(raw = {}) {
  const skills = Array.isArray(raw.skills)
    ? raw.skills
    : String(raw.skills || '')
      .split(/[,|•\n]+/)
      .map((s) => s.trim())
      .filter(Boolean);

  const projects = Array.isArray(raw.projects) && raw.projects.length
    ? raw.projects
  : [
      {
        name: 'Featured project',
        description: 'Describe the problem you solved and the impact you delivered.',
        tech: skills.slice(0, 3),
        live: '#',
        github: '#',
      },
    ];

  const experience = Array.isArray(raw.experience) && raw.experience.length
    ? raw.experience.map((item) => ({
        role: item.role || item.title || 'Role',
        company: item.company || item.org || 'Company',
        period: item.period || item.dates || 'Dates',
        description: item.description || item.desc || '',
      }))
    : [{
        role: raw.role || 'Your role',
        company: 'Company name',
        period: 'Start – Present',
        description: raw.bio || 'Add a short summary of your responsibilities and wins.',
      }];

  const name = raw.name || 'Your Name';
  const parts = name.trim().split(/\s+/);
  const firstName = parts[0] || 'Your';
  const lastName = parts.slice(1).join(' ') || 'Name';

  return {
    name,
    firstName,
    lastName,
    role: raw.role || 'Professional title',
    tagline: raw.tagline || raw.bio || 'A short line about the work you do best.',
    bio: raw.bio || 'Write a short professional summary recruiters can scan in seconds.',
    email: raw.email || 'hello@example.com',
    phone: raw.phone || '',
    location: raw.location || '',
    linkedin: raw.linkedin || '#',
    github: raw.github || '#',
    website: raw.website || '#',
    education: raw.education || '',
    skills,
    projects,
    experience,
    stats: raw.stats || { years: '3+', projects: '10+', clients: '5+', satisfaction: '99%' },
  };
}

export function buildAtlasMinimalDataJs(content) {
  const data = normalizePortfolioContent(content);
  return `// Edit this file to update your portfolio content.
export const data = ${escJson(data)};
`;
}

export function buildAtlasMinimalIndexCss(accent = '#2563EB') {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --accent: ${accent};
  --accent-soft: ${accent}22;
  --text: #0f172a;
  --muted: #64748b;
  --bg: #ffffff;
  --surface: #f8fafc;
  --border: #e2e8f0;
  --radius: 14px;
  --shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
}
html { scroll-behavior: smooth; }
body {
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--text);
  background: var(--bg);
  line-height: 1.6;
}
a { color: inherit; text-decoration: none; }
.container { width: min(1120px, calc(100% - 2rem)); margin: 0 auto; }
.site-header {
  position: sticky; top: 0; z-index: 20;
  backdrop-filter: blur(12px);
  background: rgba(255,255,255,0.88);
  border-bottom: 1px solid var(--border);
}
.nav { display: flex; align-items: center; justify-content: space-between; padding: 1rem 0; }
.brand { font-weight: 800; letter-spacing: -0.03em; }
.nav-links { display: flex; gap: 1.25rem; color: var(--muted); font-size: 0.95rem; }
.nav-links a:hover { color: var(--accent); }
.hero { padding: 5rem 0 4rem; }
.hero-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 2.5rem; align-items: center; }
.eyebrow { color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; font-size: 0.75rem; }
.hero h1 { font-size: clamp(2.4rem, 5vw, 4rem); line-height: 1.05; letter-spacing: -0.04em; margin: 0.75rem 0; }
.hero p.lead { color: var(--muted); font-size: 1.1rem; max-width: 38rem; }
.hero-actions { display: flex; gap: 0.75rem; margin-top: 1.5rem; flex-wrap: wrap; }
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0.8rem 1.2rem; border-radius: 999px; font-weight: 600; border: 1px solid transparent;
}
.btn-primary { background: var(--accent); color: #fff; }
.btn-ghost { border-color: var(--border); background: #fff; }
.hero-card {
  background: linear-gradient(180deg, #fff, var(--surface));
  border: 1px solid var(--border); border-radius: calc(var(--radius) + 6px);
  padding: 1.5rem; box-shadow: var(--shadow);
}
.stat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 1rem; }
.stat { background: #fff; border: 1px solid var(--border); border-radius: var(--radius); padding: 1rem; }
.stat strong { display: block; font-size: 1.4rem; color: var(--accent); }
.section { padding: 4.5rem 0; }
.section.alt { background: var(--surface); border-block: 1px solid var(--border); }
.section-head { margin-bottom: 2rem; }
.section-head h2 { font-size: clamp(1.8rem, 3vw, 2.4rem); letter-spacing: -0.03em; }
.section-head p { color: var(--muted); margin-top: 0.5rem; }
.about-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 2rem; }
.chip-list { display: flex; flex-wrap: wrap; gap: 0.6rem; }
.chip { background: var(--accent-soft); color: var(--accent); padding: 0.45rem 0.8rem; border-radius: 999px; font-size: 0.85rem; font-weight: 600; }
.project-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
.project-card {
  background: #fff; border: 1px solid var(--border); border-radius: var(--radius);
  padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; min-height: 100%;
}
.project-card h3 { font-size: 1.05rem; }
.project-card p { color: var(--muted); font-size: 0.92rem; flex: 1; }
.project-links { display: flex; gap: 0.75rem; font-size: 0.85rem; font-weight: 600; color: var(--accent); }
.timeline { display: grid; gap: 1rem; }
.timeline-item {
  display: grid; grid-template-columns: 180px 1fr; gap: 1rem;
  background: #fff; border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem;
}
.timeline-item span { color: var(--muted); font-size: 0.9rem; }
.contact-card {
  background: #fff; border: 1px solid var(--border); border-radius: calc(var(--radius) + 4px);
  padding: 2rem; box-shadow: var(--shadow);
}
.contact-list { display: grid; gap: 0.75rem; margin-top: 1rem; color: var(--muted); }
.site-footer { padding: 2rem 0 3rem; color: var(--muted); text-align: center; font-size: 0.9rem; }
@media (max-width: 900px) {
  .hero-grid, .about-grid, .project-grid { grid-template-columns: 1fr; }
  .timeline-item { grid-template-columns: 1fr; }
  .nav-links { display: none; }
}
`;
}

export function buildAtlasMinimalAppJsx() {
  return `import { data } from './data.js'

const SectionHead = ({ title, subtitle }) => (
  <div className="section-head">
    <h2>{title}</h2>
    {subtitle ? <p>{subtitle}</p> : null}
  </div>
)

export default function App() {
  const d = data
  const initials = d.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()

  return (
    <>
      <header className="site-header">
        <div className="container nav">
          <div className="brand">{initials}</div>
          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow">Portfolio</div>
              <h1>{d.name}</h1>
              <p className="lead">{d.tagline}</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#projects">View projects</a>
                <a className="btn btn-ghost" href="#contact">Contact me</a>
              </div>
            </div>
            <aside className="hero-card">
              <div className="eyebrow">{d.role}</div>
              <p>{d.bio}</p>
              <div className="stat-grid">
                <div className="stat"><strong>{d.stats.years}</strong>Years experience</div>
                <div className="stat"><strong>{d.stats.projects}</strong>Projects shipped</div>
                <div className="stat"><strong>{d.stats.clients}</strong>Teams served</div>
                <div className="stat"><strong>{d.stats.satisfaction}</strong>Stakeholder satisfaction</div>
              </div>
            </aside>
          </div>
        </section>

        <section className="section alt" id="about">
          <div className="container about-grid">
            <div>
              <SectionHead title="About me" subtitle="A quick snapshot of what I do and how I work." />
              <p>{d.bio}</p>
              {d.education ? <p style={{ marginTop: '1rem', color: 'var(--muted)' }}><strong>Education:</strong> {d.education}</p> : null}
            </div>
            <div>
              <SectionHead title="Skills" subtitle="Tools and strengths I use every week." />
              <div className="chip-list">
                {d.skills.map((skill) => <span className="chip" key={skill}>{skill}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="container">
            <SectionHead title="Selected work" subtitle="Recent projects with measurable outcomes." />
            <div className="project-grid">
              {d.projects.map((project) => (
                <article className="project-card" key={project.name}>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="chip-list">
                    {(project.tech || []).map((item) => <span className="chip" key={item}>{item}</span>)}
                  </div>
                  <div className="project-links">
                    {project.live ? <a href={project.live}>Live demo</a> : null}
                    {project.github ? <a href={project.github}>Source</a> : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt" id="experience">
          <div className="container">
            <SectionHead title="Experience" subtitle="Roles where I delivered real business impact." />
            <div className="timeline">
              {d.experience.map((item) => (
                <article className="timeline-item" key={\`\${item.company}-\${item.role}\`}>
                  <div>
                    <strong>{item.role}</strong>
                    <div>{item.company}</div>
                    <span>{item.period}</span>
                  </div>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container">
            <div className="contact-card">
              <SectionHead title="Let's work together" subtitle="Reach out for roles, freelance work, or collaboration." />
              <div className="contact-list">
                {d.email ? <div>Email: <a href={\`mailto:\${d.email}\`}>{d.email}</a></div> : null}
                {d.phone ? <div>Phone: {d.phone}</div> : null}
                {d.location ? <div>Location: {d.location}</div> : null}
                {d.linkedin ? <div>LinkedIn: <a href={d.linkedin}>{d.linkedin}</a></div> : null}
                {d.github ? <div>GitHub: <a href={d.github}>{d.github}</a></div> : null}
                {d.website ? <div>Website: <a href={d.website}>{d.website}</a></div> : null}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">© {new Date().getFullYear()} {d.name}. Built with React + Vite.</div>
      </footer>
    </>
  )
}
`;
}

export function buildAtlasMinimalReadme(content, templateName = 'Atlas Minimal') {
  const data = normalizePortfolioContent(content);
  const folder = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'my-portfolio';
  return `# ${data.name} — Portfolio Website

Generated by **MockB CV** using the **${templateName}** template.

This ZIP contains a complete **React + Vite** one-page portfolio you can run locally, customize, and deploy.

---

## What is inside

- \`package.json\` — project dependencies and scripts
- \`vite.config.js\` — Vite configuration
- \`index.html\` — HTML entry point
- \`src/main.jsx\` — React bootstrap
- \`src/App.jsx\` — portfolio layout (hero, projects, experience, contact)
- \`src/data.js\` — **edit this file** to change your name, skills, projects, and links
- \`src/index.css\` — styling and accent color

---

## Prerequisites

Install [Node.js](https://nodejs.org/) **18 or newer** (includes npm).

Check your version:

\`\`\`bash
node -v
npm -v
\`\`\`

---

## Quick start (see the working site)

1. **Unzip** this folder (for example: \`${folder}/\`).
2. Open a terminal in that folder.
3. Install dependencies:

\`\`\`bash
npm install
\`\`\`

4. Start the development server:

\`\`\`bash
npm run dev
\`\`\`

5. Open the URL shown in the terminal (usually **http://localhost:5173**).

You should see your portfolio with sections for About, Projects, Experience, and Contact.

---

## Customize your content

Open \`src/data.js\` and update:

- \`name\`, \`role\`, \`tagline\`, \`bio\`
- \`email\`, \`phone\`, \`location\`, social links
- \`skills\` array
- \`projects\` and \`experience\` arrays

Save the file — Vite will hot-reload the page automatically.

To change colors, edit \`--accent\` in \`src/index.css\`.

---

## Build for production

\`\`\`bash
npm run build
\`\`\`

Static files are output to the \`dist/\` folder.

Preview the production build locally:

\`\`\`bash
npm run preview
\`\`\`

---

## Deploy

| Platform | Steps |
|---|---|
| **Netlify** | Drag and drop the \`dist/\` folder at [app.netlify.com/drop](https://app.netlify.com/drop) |
| **Vercel** | Run \`npx vercel --prod\` from the project folder |
| **GitHub Pages** | Push \`dist/\` contents to a \`gh-pages\` branch or use an action |

---

## Troubleshooting

- **Port already in use:** Vite will try the next port (5174, 5175, …).
- **Blank page:** Check the browser console for errors and confirm \`npm install\` completed.
- **Changes not showing:** Hard refresh the browser (Ctrl+Shift+R / Cmd+Shift+R).

---

Made with MockB CV — https://mockb.cv
`;
}

export function generateAtlasMinimalFiles(content, accentColor = '#2563EB') {
  const data = normalizePortfolioContent(content);
  const safeSlug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'portfolio';

  return {
    'README.md': buildAtlasMinimalReadme(content),
    '.gitignore': 'node_modules\ndist\n.DS_Store\n*.local\n',
    'package.json': JSON.stringify({
      name: `${safeSlug}-portfolio`,
      private: true,
      version: '1.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview',
      },
      dependencies: {
        react: '^18.2.0',
        'react-dom': '^18.2.0',
      },
      devDependencies: {
        '@vitejs/plugin-react': '^4.0.3',
        vite: '^4.4.5',
      },
    }, null, 2),
    'vite.config.js': `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({\n  plugins: [react()],\n})\n`,
    'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${esc(data.name)} — ${esc(data.role)}" />
    <title>${esc(data.name)} | Portfolio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`,
    'src/main.jsx': `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`,
    'src/App.jsx': buildAtlasMinimalAppJsx(),
    'src/data.js': buildAtlasMinimalDataJs(content),
    'src/index.css': buildAtlasMinimalIndexCss(accentColor),
  };
}
