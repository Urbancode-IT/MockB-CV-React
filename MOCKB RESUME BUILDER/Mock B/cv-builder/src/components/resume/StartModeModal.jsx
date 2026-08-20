import { getTemplateById, isTwoColumnTemplate } from '../../config/templates';
import './StartModeModal.css';

export default function StartModeModal({ templateId, onClose, onChoose }) {
    if (!templateId) return null;
    const meta = getTemplateById(templateId);
    const twoCol = isTwoColumnTemplate(templateId);

    return (
        <div className="sm-backdrop" onClick={onClose}>
            <div className="sm-card" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="sm-close" onClick={onClose} aria-label="Close">
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <p className="sm-kicker">How do you want to start?</p>
                <h3>{meta.name}</h3>
                <p className="sm-lead">
                    Keep the layout and colors of this template. Choose whether to begin with example text or an empty page.
                </p>
                <div className="sm-options">
                    <button type="button" className="sm-option" onClick={() => onChoose('sample')}>
                        <span className="sm-icon"><i className="fa-solid fa-file-lines"></i></span>
                        <span className="sm-option-title">Use example resume</span>
                        <span className="sm-option-copy">
                            Start with sample content you can replace. Fastest way to see the finished look.
                        </span>
                    </button>
                    <button type="button" className="sm-option sm-option--accent" onClick={() => onChoose('blank')}>
                        <span className="sm-icon"><i className="fa-solid fa-pen-to-square"></i></span>
                        <span className="sm-option-title">Build from scratch</span>
                        <span className="sm-option-copy">
                            Empty {twoCol ? 'two-column' : 'single-column'} layout. Add personal details first, then sections one by one
                            {twoCol ? ', and choose left or right column.' : '.'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
