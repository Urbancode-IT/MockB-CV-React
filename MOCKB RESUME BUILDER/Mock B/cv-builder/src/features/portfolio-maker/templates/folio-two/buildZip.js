import { buildThemeVars, getFontPreset, resolveDesign, folioTwoCssBlock, FOLIO_TWO_DEFAULT_DESIGN, resolveFolioTwoDesign } from '../../config/design';
import { dataUrlToUint8Array, extensionFromMime } from '../../utils/fileHelpers';
import { normalizeContent } from '../folio-one/buildZip';
import { zipAppJsx } from './zipTemplate';
import folioTwoCss from './FolioTwoPreview.css?raw';

function zipIndexCss(theme) {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { margin: 0; min-height: 100vh; background: ${theme.bg}; color: ${theme.text}; }
#root { min-height: 100vh; }
${folioTwoCssBlock(theme)}
${folioTwoCss}`;
}

const esc = (v) => String(v ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");

function readme(data) {
  return `# ${data.name} — Folio Two Portfolio

Dark crimson designer portfolio with animated hero blob, alternating project cards, tech stack marquee, WhatsApp contact, and resume download.

## Run locally

\`\`\`bash
npm install
npm run dev
\`\`\`

Made with MockB CV Portfolio Maker
`;
}

export function buildFolioTwoZipFiles(content, designInput = {}) {
  const data = normalizeContent(content);
  const design = resolveFolioTwoDesign({ ...FOLIO_TWO_DEFAULT_DESIGN, ...designInput });
  const theme = buildThemeVars(design);
  const font = getFontPreset(design.fontId);
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'portfolio';

  const dataForExport = { ...data };
  const files = {
    'README.md': readme(data),
    '.gitignore': 'node_modules\ndist\n.DS_Store\n*.local\n',
    'package.json': JSON.stringify({
      name: `${slug}-folio-two`,
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
