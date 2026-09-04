import JSZip from 'jszip';
import { buildFolioOneZipFiles } from '../templates/folio-one/buildZip';
import { buildFolioTwoZipFiles } from '../templates/folio-two/buildZip';
import { resolveDesign } from '../config/design';

export async function downloadPortfolioMakerZip({ templateId = 'folio-one', content, design }) {
  const resolvedDesign = resolveDesign(design);
  const files = templateId === 'folio-two'
    ? buildFolioTwoZipFiles(content, resolvedDesign)
    : buildFolioOneZipFiles(content, resolvedDesign);

  const zip = new JSZip();
  Object.entries(files).forEach(([path, fileContent]) => zip.file(path, fileContent));

  const safeName = (content?.name || 'portfolio').replace(/\s+/g, '_');
  const blob = await zip.generateAsync({ type: 'blob' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${safeName}_Portfolio.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}