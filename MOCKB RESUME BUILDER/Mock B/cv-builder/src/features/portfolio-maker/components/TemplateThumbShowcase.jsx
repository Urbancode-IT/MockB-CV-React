import { contentForTemplate } from '../data/defaultContent';
import { DEFAULT_DESIGN, BRAND_GRADIENT, FOLIO_TWO_DEFAULT_DESIGN, FOLIO_THREE_DEFAULT_DESIGN } from '../config/design';
import { getMakerTemplate } from '../config/catalog';
import { renderMakerPreview } from './renderPreview.jsx';
import './TemplateThumbShowcase.css';

/** Full GIF-style scroll cycle duration — home slider waits for this before advancing. */
export const PM_THUMB_CYCLE_MS = 22000;

export default function TemplateThumbShowcase({
  templateId,
  playing = true,
  loop = true,
  content: contentOverride,
  design: designOverride,
}) {
  const template = getMakerTemplate(templateId);
  const isFolioTwo = template.id === 'folio-two';
  const isFolioThree = template.id === 'folio-three';
  const design = designOverride
    ? designOverride
    : isFolioTwo
      ? { ...FOLIO_TWO_DEFAULT_DESIGN }
      : isFolioThree
        ? { ...FOLIO_THREE_DEFAULT_DESIGN }
        : {
            ...DEFAULT_DESIGN,
            accentColor: template.accentColor || DEFAULT_DESIGN.accentColor,
            accentGradient: BRAND_GRADIENT,
          };
  const content = contentOverride || contentForTemplate(templateId);

  return (
    <div
      className={[
        'pm-thumb-showcase',
        isFolioTwo ? 'pm-thumb-showcase--folio-two' : '',
        isFolioThree ? 'pm-thumb-showcase--folio-three' : '',
        playing ? 'pm-thumb-showcase--playing' : '',
        loop ? 'pm-thumb-showcase--loop' : 'pm-thumb-showcase--once',
      ].filter(Boolean).join(' ')}
      aria-label={`${template.name} animated preview`}
    >
      <div className="pm-thumb-showcase__viewport">
        <div className="pm-thumb-showcase__track" key={`${templateId}-${playing ? 'on' : 'off'}-${loop ? 'loop' : 'once'}`}>
          {renderMakerPreview(templateId, content, design, true)}
        </div>
      </div>
      <span className="pm-thumb-showcase__badge">
        <i className="fa-solid fa-circle" aria-hidden="true" />
        Live demo
      </span>
    </div>
  );
}
