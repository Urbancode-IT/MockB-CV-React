import { createPortal } from 'react-dom';
import { getTemplateById, isTwoColumnTemplate } from '../../config/templates';
import { getCoverLetterTemplateById } from '../../config/coverLetterTemplates';
import './StartModeModal.css';

export default function StartModeModal({ templateId, onClose, onChoose, kind = 'resume' }) {
    if (!templateId) return null;
    const isLetter = kind === 'cover-letter';
    const meta = isLetter ? getCoverLetterTemplateById(templateId) : getTemplateById(templateId);
    if (!meta?.name) return null;
    const twoCol = !isLetter && isTwoColumnTemplate(templateId);

    return createPortal(
        <div className="sm-backdrop" onClick={onClose} role="presentation">
            <div className="sm-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="sm-title">
                <button type="button" className="sm-close" onClick={onClose} aria-label="Close">
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <p className="sm-kicker">How do you want to start?</p>
                <h3 id="sm-title">{meta.name}</h3>
                <p className="sm-lead">
                    Keep the layout and colors of this template. Choose whether to begin with example text or an empty page.
                </p>
                <div className="sm-options">
                    <button type="button" className="sm-option" onClick={() => onChoose('sample')}>
                        <span className="sm-icon"><i className="fa-solid fa-file-lines"></i></span>
                        <span className="sm-option-title">{isLetter ? 'Use example cover letter' : 'Use example resume'}</span>
                        <span className="sm-option-copy">
                            Start with sample content you can replace. Fastest way to see the finished look.
                        </span>
                    </button>
                    <button type="button" className="sm-option sm-option--accent" onClick={() => onChoose('blank')}>
                        <span className="sm-icon"><i className="fa-solid fa-pen-to-square"></i></span>
                        <span className="sm-option-title">Build from scratch</span>
                        <span className="sm-option-copy">
                            {isLetter
                                ? 'Empty letter with greeting and closing. Fill in your details and write the body.'
                                : `Empty ${twoCol ? 'two-column' : 'single-column'} layout. Add personal details first, then sections one by one${twoCol ? ', and choose left or right column.' : '.'}`}
                        </span>
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
}
