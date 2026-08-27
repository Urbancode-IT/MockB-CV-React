import ClassicLetter from './ClassicLetter';
import './CoverLetterRenderer.css';

export default function CoverLetterRenderer({ letterData, template, preview = false }) {
    const design = letterData?.design || {};
    const isLetter = design.pageSize === 'letter';
    const pageW = isLetter ? 216 : 210;
    const pageH = isLetter ? 279 : 297;
    const data = {
        ...letterData,
        selectedTemplate: template || letterData?.selectedTemplate || 'classic-letter',
    };

    return (
        <div
            className={`cl-render-wrap${preview ? ' cl-render-wrap--preview' : ''}`}
            style={{
                width: `${pageW}mm`,
                minHeight: `${pageH}mm`,
                height: preview ? `${pageH}mm` : undefined,
                overflow: preview ? 'hidden' : undefined,
            }}
        >
            <ClassicLetter letterData={data} />
        </div>
    );
}
