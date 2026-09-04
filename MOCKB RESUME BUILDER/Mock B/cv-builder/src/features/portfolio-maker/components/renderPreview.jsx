import FolioOnePreview from '../templates/folio-one/FolioOnePreview.jsx';
import FolioTwoPreview from '../templates/folio-two/FolioTwoPreview.jsx';
import { resolveFolioTwoDesign } from '../config/design';

export function renderMakerPreview(templateId, content, accentOrDesign, compact = false) {
  const isDesignObject = accentOrDesign && typeof accentOrDesign === 'object';
  const design = isDesignObject ? accentOrDesign : { accentColor: accentOrDesign };

  if (templateId === 'folio-two') {
    const resolved = resolveFolioTwoDesign(design);
    return (
      <FolioTwoPreview
        content={content}
        accentColor={resolved.accentColor}
        design={resolved}
        compact={compact}
      />
    );
  }

  return (
    <FolioOnePreview
      content={content}
      accentColor={design.accentColor}
      design={design}
      compact={compact}
    />
  );
}
