import { createPortal } from 'react-dom';
import ResumePagedView from './ResumePagedView';
import CoverLetterRenderer from '../cover-letter/CoverLetterRenderer';
import { isOnePageTemplate } from '../../config/templates';

export default function TemplatePreviewModal({
    title,
    templateId,
    kind = 'resume',
    resumeData,
    letterData,
    onClose,
    onUseTemplate,
}) {
    if (!templateId) return null;
    const twoPage = kind === 'resume' && !isOnePageTemplate(templateId);

    return createPortal(
        <div className="rt-modal-backdrop" onClick={onClose}>
            <div className="rt-modal" onClick={(e) => e.stopPropagation()}>
                <div className="rt-modal-header">
                    <h3>{title} — Preview</h3>
                    <div className="rt-modal-actions">
                        <button type="button" className="rt-modal-use-btn" onClick={onUseTemplate}>
                            <i className="fa-solid fa-edit"></i>
                            Use template
                        </button>
                        <button type="button" className="rt-modal-close" onClick={onClose} aria-label="Close preview">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
                <div className={`rt-modal-body${twoPage ? ' rt-modal-body--two-page' : ''}`}>
                    <div className={`rt-modal-resume-frame${twoPage ? ' rt-modal-resume-frame--scroll' : ''}`}>
                        <div className="rt-modal-resume">
                            {kind === 'cover-letter' ? (
                                <CoverLetterRenderer template={templateId} letterData={letterData} preview />
                            ) : (
                                <ResumePagedView template={templateId} resumeData={resumeData} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body,
    );
}
