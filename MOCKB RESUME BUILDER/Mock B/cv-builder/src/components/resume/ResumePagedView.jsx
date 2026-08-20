import { useLayoutEffect, useRef, useState, useId } from 'react';
import ResumeTemplateRenderer from './ResumeTemplateRenderer';
import { mergeDesign } from '../../config/resumeDesign';
import { isTwoColumnTemplate, isOnePageTemplate } from '../../config/templates';
import './ResumePagedView.css';

const probePagePx = (host, pageHMm) => {
    const probe = document.createElement('div');
    probe.style.cssText = `position:absolute;left:0;top:0;width:1px;height:${pageHMm}mm;visibility:hidden;pointer-events:none;`;
    host.appendChild(probe);
    const px = probe.offsetHeight;
    probe.remove();
    return Math.max(1, px);
};

const layoutScale = (el) => {
    const layoutW = el.offsetWidth || 1;
    const visualW = el.getBoundingClientRect().width || layoutW;
    return visualW / layoutW;
};

const computeKeepPads = (root, pagePx) => {
    const scale = layoutScale(root) || 1;
    const rootTop = root.getBoundingClientRect().top;
    const pads = {};
    const containers = [root.querySelector('.cp-body'), root.querySelector('.pp-main')].filter(Boolean);

    containers.forEach((container) => {
        const items = [...container.querySelectorAll('[data-section]')]
            .map((el) => {
                const rect = el.getBoundingClientRect();
                return {
                    id: el.getAttribute('data-section'),
                    top: (rect.top - rootTop) / scale,
                    height: rect.height / scale,
                };
            })
            .filter((item) => item.id)
            .sort((a, b) => a.top - b.top || a.id.localeCompare(b.id));

        let extra = 0;
        items.forEach((item) => {
            if (pads[item.id] != null) return;
            const top = item.top + extra;
            const pageIndex = Math.floor(top / pagePx);
            const pos = top - pageIndex * pagePx;
            const spaceLeft = pagePx - pos;
            if (item.height <= pagePx - 2 && spaceLeft < item.height - 0.5) {
                pads[item.id] = spaceLeft;
                extra += spaceLeft;
            }
        });
    });

    return pads;
};

export default function ResumePagedView({ template, resumeData, previewFocus = null }) {
    const measureRef = useRef(null);
    const styleId = `resume-keep-${useId().replace(/:/g, '')}`;
    const [pages, setPages] = useState(1);
    const design = mergeDesign(resumeData?.design);
    const isLetter = design.pageSize === 'letter';
    const pageW = isLetter ? 216 : 210;
    const pageH = isLetter ? 279 : 297;

    useLayoutEffect(() => {
        const root = measureRef.current?.querySelector('.resume-design-wrapper') || measureRef.current;
        if (!root) return;

        let tag = document.getElementById(styleId);
        if (!tag) {
            tag = document.createElement('style');
            tag.id = styleId;
            document.head.appendChild(tag);
        }

        const measure = () => {
            tag.textContent = '';
            void root.offsetHeight;
            const pagePx = probePagePx(root, pageH);
            const twoCol = isTwoColumnTemplate(template) || isOnePageTemplate(template);
            if (twoCol) {
                setPages(1);
                return;
            }
            const naturalHeight = root.scrollHeight;
            const overflow = naturalHeight - pagePx;
            if (overflow <= Math.max(24, pagePx * 0.08)) {
                setPages(1);
                return;
            }
            const pads = computeKeepPads(root, pagePx);
            tag.textContent = Object.entries(pads)
                .map(([id, px]) => `.resume-paged [data-section="${id}"] { padding-top: ${Math.max(0, Math.ceil(px))}px !important; }`)
                .join('\n');
            void root.offsetHeight;
            const nextHeight = root.scrollHeight;
            const nextOverflow = nextHeight - pagePx;
            const next = nextOverflow <= Math.max(24, pagePx * 0.08)
                ? 1
                : Math.max(1, Math.ceil((nextHeight - 2) / pagePx));
            setPages((prev) => (prev === next ? prev : next));
        };

        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(root);
        return () => {
            ro.disconnect();
            tag.remove();
        };
    }, [template, resumeData, pageW, pageH, styleId]);

    const resume = <ResumeTemplateRenderer template={template} resumeData={resumeData} previewFocus={previewFocus} />;

    return (
        <div className="resume-paged" style={{ '--page-w': `${pageW}mm`, '--page-h': `${pageH}mm` }}>
            <div className="resume-measure" ref={measureRef} data-resume-capture="">
                {resume}
            </div>
            <div className="resume-sheets">
                {Array.from({ length: pages }).map((_, index) => (
                    <div className="resume-sheet" key={index}>
                        <div
                            className="resume-sheet-inner"
                            style={{ transform: `translateY(calc(-${index} * var(--page-h)))` }}
                        >
                            {resume}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
