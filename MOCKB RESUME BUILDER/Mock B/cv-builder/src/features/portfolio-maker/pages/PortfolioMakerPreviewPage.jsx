import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getMakerTemplate } from '../config/catalog';
import { DEFAULT_DESIGN, MODE_PRESETS, resolveDesign, FOLIO_TWO_DEFAULT_DESIGN, resolveFolioTwoDesign } from '../config/design';
import { contentForTemplate } from '../data/defaultContent';
import { renderMakerPreview } from '../components/renderPreview.jsx';
import { loadPreviewState, savePreviewState } from '../utils/previewSession';
import './PortfolioMakerPreviewPage.css';

export default function PortfolioMakerPreviewPage() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const template = getMakerTemplate(templateId);

  const session = loadPreviewState(templateId);
  const content = location.state?.content || session?.content || contentForTemplate(template.id);
  const [design, setDesign] = useState(() => {
    const incoming = location.state?.design || session?.design || null;
    if (template.id === 'folio-two') {
      return resolveFolioTwoDesign(incoming || FOLIO_TWO_DEFAULT_DESIGN);
    }
    return resolveDesign(incoming || DEFAULT_DESIGN);
  });
  const fromEditor = Boolean(location.state?.content || session?.content);

  const setMode = (mode) => {
    setDesign((prev) => {
      const next = resolveDesign({ ...prev, mode });
      savePreviewState({ templateId: template.id, content, design: next });
      return next;
    });
  };

  return (
    <div className="pm-preview-page">
      <header className="pm-preview-toolbar">
        <button type="button" className="pm-preview-back" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left" /> Back
        </button>
        <div className="pm-preview-toolbar-center">
          <span className="pm-preview-live"><span className="pm-preview-dot" /> Live preview</span>
          <strong>{template.name}</strong>
          {fromEditor ? <span className="pm-preview-badge">Your customizations</span> : null}
        </div>
        <div className="pm-preview-actions">
          <div className="pm-preview-theme-toggle" role="group" aria-label="Theme mode">
            {MODE_PRESETS.map((mode) => (
              <button
                key={mode.id}
                type="button"
                className={`pm-preview-theme-btn${design.mode === mode.id ? ' active' : ''}`}
                onClick={() => setMode(mode.id)}
                title={`${mode.label} theme`}
              >
                <i className={`fa-solid fa-${mode.id === 'light' ? 'sun' : 'moon'}`} />
                {mode.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="pm-btn pm-btn-ghost"
            onClick={() => navigate('/portfolio-maker')}
          >
            All templates
          </button>
          <button
            type="button"
            className="pm-btn pm-btn-primary"
            onClick={() => navigate(`/portfolio-maker/edit/${template.id}`, {
              state: {
                startMode: location.state?.startMode || 'sample',
                content,
                design,
              },
            })}
          >
            <i className="fa-solid fa-pen" /> Customize & download
          </button>
        </div>
      </header>

      <main className="pm-preview-main">
        {renderMakerPreview(template.id, content, design)}
      </main>
    </div>
  );
}
