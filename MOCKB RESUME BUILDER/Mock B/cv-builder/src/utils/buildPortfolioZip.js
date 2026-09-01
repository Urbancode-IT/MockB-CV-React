import JSZip from 'jszip';
import { generateAtlasMinimalFiles } from '../portfolio-templates/atlas-minimal/generateFiles';

export async function buildPortfolioZip({ templateId = 'atlas-minimal', content, accentColor = '#2563EB' }) {
  const zip = new JSZip();
  let files = {};

  if (templateId === 'atlas-minimal') {
    files = generateAtlasMinimalFiles(content, accentColor);
  } else {
    files = generateAtlasMinimalFiles(content, accentColor);
  }

  Object.entries(files).forEach(([path, fileContent]) => {
    zip.file(path, fileContent);
  });

  zip.folder('public');

  const safeName = (content?.name || 'portfolio').replace(/\s+/g, '_');
  const blob = await zip.generateAsync({ type: 'blob' });
  return { blob, filename: `${safeName}_Portfolio.zip` };
}

export async function downloadPortfolioZip(options) {
  const { blob, filename } = await buildPortfolioZip(options);
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
