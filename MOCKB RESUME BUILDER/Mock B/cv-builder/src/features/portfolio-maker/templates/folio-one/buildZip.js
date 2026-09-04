import { buildThemeVars, getFontPreset, resolveDesign, themeToCssBlock } from '../../config/design';
import { PORTFOLIO_ASSETS, projectImageAt } from '../../config/portfolioAssets';
import { dataUrlToUint8Array, extensionFromMime } from '../../utils/fileHelpers';
import { zipAppJsx } from './zipTemplate';
import folioPreviewCss from './FolioOnePreview.css?raw';

function zipIndexCss(theme) {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { margin: 0; min-height: 100vh; background: ${theme.bg}; color: ${theme.text}; }
#root { min-height: 100vh; }
${themeToCssBlock(theme)}
${folioPreviewCss}`;
}

const esc = (v) => String(v ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");

export function normalizeContent(raw = {}) {
  const skills = Array.isArray(raw.skills)
    ? raw.skills
    : String(raw.skills || '').split(/[,|•\n]+/).map((s) => s.trim()).filter(Boolean);

  const projects = (Array.isArray(raw.projects) && raw.projects.length
    ? raw.projects
    : [{ name: 'Project title', description: 'Describe the outcome you delivered.', tech: skills.slice(0, 3), live: '#', github: '#' }]
  ).map((p, i) => ({
    ...p,
    image: p.image || projectImageAt(i),
    category: p.category || 'Web Application',
    year: p.year || '2024',
    roleTag: p.roleTag || 'Full-Stack',
  }));

  const defaultHeadline = [
    { text: 'Engineering ', bold: false },
    { text: 'scalable architecture', bold: true },
    { text: ' for modern ', bold: false },
    { text: 'enterprises', bold: true },
  ];

  const features = Array.isArray(raw.features) && raw.features.length
    ? raw.features
    : [
        { title: 'Production-Grade Reliability', description: 'Clean, thoroughly tested, enterprise-ready source code with full observability baked in from day one.', variant: 'reliability' },
        { title: 'Performance First Mindset', description: 'Core Web Vitals, ultra-fast render, and aggressive asset optimization across every critical path.', variant: 'performance' },
        { title: 'Business-Driven Decisions', description: 'Cross-functional alignment, clear technical communication, and product strategy that ships outcomes.', variant: 'business' },
      ];

  const techStack = Array.isArray(raw.techStack) && raw.techStack.length
    ? raw.techStack
    : skills.slice(0, 7);

  const experience = Array.isArray(raw.experience) && raw.experience.length
    ? raw.experience.map((item) => ({
        role: item.role || 'Role',
        company: item.company || 'Company',
        period: item.period || 'Dates',
        description: item.description || item.desc || '',
      }))
    : [{ role: raw.role || 'Your role', company: 'Company', period: 'Start – Present', description: raw.bio || '' }];

  const services = Array.isArray(raw.services) && raw.services.length
    ? raw.services
    : [
        { title: 'Application Development', description: 'End-to-end web application delivery with testing and deployment pipelines.', count: '10' },
        { title: 'Frontend Architecture', description: 'Design systems and performance optimization for growing product teams.', count: raw.stats?.projects || '20' },
        { title: 'Technical Consulting', description: 'Stack reviews and delivery planning for engineering organizations.', count: '5' },
      ];

  return {
    name: raw.name || 'Your Name',
    initials: raw.initials || (raw.name || 'YN').split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase(),
    role: raw.role || 'Your Title',
    headlineSegments: raw.headlineSegments || defaultHeadline,
    tagline: raw.tagline || 'A concise summary of your specialization and focus areas.',
    introQuote: raw.introQuote || 'Quality engineering starts with clarity, discipline, and maintainable systems.',
    bio: raw.bio || 'Write a short professional summary.',
    profileImage: raw.profileImage || PORTFOLIO_ASSETS.profile,
    experiencePortrait: raw.experiencePortrait || PORTFOLIO_ASSETS.experiencePortrait,
    philosophyVideo: raw.philosophyVideo || PORTFOLIO_ASSETS.philosophyVideo,
    philosophy: raw.philosophy || { label: 'THE ENGINEER BEHIND THE CODE', title: 'A short film on my engineering philosophy' },
    techStack,
    features,
    email: raw.email || 'hello@example.com',
    phone: raw.phone || '',
    whatsapp: raw.whatsapp || raw.phone || '',
    location: raw.location || '',
    linkedin: raw.linkedin || '#',
    resumeFileName: raw.resumeFileName || '',
    resumeFileData: raw.resumeFileData || '',
    resumeFile: raw.resumeFile || '',
    skills,
    services,
    projects,
    experience,
    stats: raw.stats || { years: '3+', projects: '10+', clients: '5+', satisfaction: '99%' },
  };
}

function readme(data, design) {
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'my-portfolio';
  const font = getFontPreset(design.fontId);
  return `# ${data.name} — Portfolio Website

Generated with **MockB CV Portfolio Maker** using the **Folio One** template.

This folder is a complete **React + Vite** one-page portfolio with your chosen fonts, colors, and theme.

---

## Prerequisites

- [Node.js](https://nodejs.org/) **18 or newer** (includes npm)

\`\`\`bash
node -v
npm -v
\`\`\`

---

## Quick start

1. Unzip this folder (example: \`${slug}/\`).
2. Open a terminal in that folder.
3. Install dependencies:

\`\`\`bash
npm install
\`\`\`

4. Start the dev server:

\`\`\`bash
npm run dev
\`\`\`

5. Open **http://localhost:5173**

---

## Edit your content

Open \`src/data.js\` and update name, bio, skills, projects, experience, and contact details.

## Edit design (fonts, colors, theme)

Open \`src/design.js\` to change:

- \`accentColor\` — main brand color (${design.accentColor})
- \`fontId\` — currently **${font.label}**
- \`mode\` — **${design.mode}** (light or dark)

CSS variables in \`src/index.css\` are generated from these settings.

---

## Production build

\`\`\`bash
npm run build
npm run preview
\`\`\`

---

Made with MockB CV Portfolio Maker
`;
}

export function buildFolioOneZipFiles(content, designInput = {}) {
  const data = normalizeContent(content);
  const design = resolveDesign(designInput);
  const theme = buildThemeVars(design);
  const font = getFontPreset(design.fontId);
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'portfolio';

  const dataForExport = { ...data };
  const files = {
    'README.md': readme(data, design),
    '.gitignore': 'node_modules\ndist\n.DS_Store\n*.local\n',
    'package.json': JSON.stringify({
      name: `${slug}-portfolio`,
      private: true,
      version: '1.0.0',
      type: 'module',
      scripts: { dev: 'vite', build: 'vite build', preview: 'vite preview' },
      dependencies: { react: '^18.2.0', 'react-dom': '^18.2.0' },
      devDependencies: { '@vitejs/plugin-react': '^4.0.3', vite: '^4.4.5' },
    }, null, 2),
    'vite.config.js': `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\nexport default defineConfig({ plugins: [react()] })\n`,
    'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${esc(data.name)} — ${esc(data.role)}" />
    <title>${esc(data.name)} | Portfolio</title>
    <link href="${font.url}" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
    'src/main.jsx': `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)\n`,
    'src/App.jsx': zipAppJsx(),
    'src/design.js': `export const design = ${JSON.stringify({
      ...design,
      accentGradient: theme.accentGradient,
      fontFamily: theme.fontFamily,
      fontUrl: theme.fontUrl,
    }, null, 2)};\n`,
    'src/index.css': zipIndexCss(theme),
  };

  const resumeDataUrl = content.resumeFileData || data.resumeFileData;
  if (resumeDataUrl) {
    const parsed = dataUrlToUint8Array(resumeDataUrl);
    if (parsed) {
      const fileName = content.resumeFileName || data.resumeFileName || 'resume.pdf';
      const ext = fileName.includes('.') ? fileName.split('.').pop() : extensionFromMime(parsed.mime, 'pdf');
      files[`public/resume.${ext}`] = parsed.bytes;
      dataForExport.resumeFile = `/resume.${ext}`;
      dataForExport.resumeFileName = fileName;
      delete dataForExport.resumeFileData;
    }
  }

  files['src/data.js'] = `export const data = ${JSON.stringify(dataForExport, null, 2)};\n`;

  return files;
}
