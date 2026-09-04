import { createPortal } from 'react-dom';
import { DEFAULT_DESIGN } from '../config/design';
import { renderMakerPreview } from './renderPreview.jsx';
import './PortfolioMakerPreviewModal.css';

export default function PortfolioMakerPreviewModal({ template, content, onClose, onUse }) {
  if (!template) return null;

  return createPortal(
    <div className="pm-modal" role="dialog" aria-modal="true">
      <div className="pm-modal-backdrop" onClick={onClose} />
      <div className="pm-modal-dialog">
        <header className="pm-modal-header">
          <div>
            <p className="pm-modal-kicker">Live preview</p>
            <h2>{template.name}</h2>
          </div>
          <button type="button" className="pm-modal-close" onClick={onClose} aria-label="Close">
            <i className="fa-solid fa-xmark" />
          </button>
        </header>
        <div className="pm-modal-body">
          {renderMakerPreview(template.id, content, DEFAULT_DESIGN)}
        </div>
        <footer className="pm-modal-footer">
          <p>Happy with the layout? Customize your content and download the full React project.</p>
          <button type="button" className="pm-btn pm-btn-primary" onClick={onUse}>
            Use this template
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
