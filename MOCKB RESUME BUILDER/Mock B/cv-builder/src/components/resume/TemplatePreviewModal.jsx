import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ResumePagedView from './ResumePagedView';
import CoverLetterRenderer from '../cover-letter/CoverLetterRenderer';
import { isOnePageTemplate } from '../../config/templates';
import './TemplatePreviewModal.css';

const PAGE_W_MM = 210;
const PAGE_H_MM = 297;
const PAGE_GAP_MM = 18;

const measureMm = (mm) => {
    const probe = document.createElement('div');
    probe.style.cssText = `position:absolute;left:-9999px;top:0;width:${mm}mm;height:1px;visibility:hidden;pointer-events:none;`;
    document.body.appendChild(probe);
    const px = probe.offsetWidth;
    probe.remove();
    return px || (mm / 25.4) * 96;
};

export default function TemplatePreviewModal({
    title,
    templateId,
    kind = 'resume',
    resumeData,
    letterData,
    onClose,
    onUseTemplate,
}) {
    const bodyRef = useRef(null);
    const [scale, setScale] = useState(0.5);
    const twoPage = Boolean(templateId) && kind === 'resume' && !isOnePageTemplate(templateId);

    useLayoutEffect(() => {
        if (!templateId) return undefined;
        const body = bodyRef.current;
        if (!body) return undefined;

        const updateScale = () => {
            const styles = getComputedStyle(body);
            const padX = (parseFloat(styles.paddingLeft) || 0) + (parseFloat(styles.paddingRight) || 0);
            const padY = (parseFloat(styles.paddingTop) || 0) + (parseFloat(styles.paddingBottom) || 0);
            const availW = Math.max(120, body.clientWidth - padX);
            const availH = Math.max(160, body.clientHeight - padY);
            const pageW = measureMm(PAGE_W_MM);
            const pageH = measureMm(PAGE_H_MM);
            const gap = measureMm(PAGE_GAP_MM);
            const contentH = twoPage ? pageH * 2 + gap : pageH;

            // One-page: fit entire sheet in view. Two-page: fit width, scroll for height.
            const next = twoPage
                ? Math.min(1, availW / pageW)
                : Math.min(1, availW / pageW, availH / contentH);

            setScale(Math.max(0.28, Number(next.toFixed(4))));
        };

        updateScale();
        const observer = new ResizeObserver(updateScale);
        observer.observe(body);
        window.addEventListener('resize', updateScale);
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updateScale);
        };
    }, [templateId, twoPage, kind]);

    if (!templateId) return null;

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
                <div
                    ref={bodyRef}
                    className={`rt-modal-body${twoPage ? ' rt-modal-body--two-page' : ''}`}
                    style={{ '--rt-preview-scale': scale }}
                >
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
