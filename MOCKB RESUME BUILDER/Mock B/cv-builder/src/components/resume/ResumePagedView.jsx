import ResumeTemplateRenderer from './ResumeTemplateRenderer';
import { mergeDesign } from '../../config/resumeDesign';
import { isOnePageTemplate } from '../../config/templates';
import { resumeDataForPage } from '../../config/pageLayout';
import './ResumePagedView.css';

export default function ResumePagedView({ template, resumeData, previewFocus = null }) {
    const design = mergeDesign(resumeData?.design);
    const isLetter = design.pageSize === 'letter';
    const pageW = isLetter ? 216 : 210;
    const pageH = isLetter ? 279 : 297;
    const onePage = isOnePageTemplate(template);
    const pageCount = onePage ? 1 : 2;
    const pages = Array.from({ length: pageCount }, (_, i) => i);

    return (
        <div className="resume-paged" style={{ '--page-w': `${pageW}mm`, '--page-h': `${pageH}mm` }}>
            <div className="resume-sheets">
                {pages.map((pageIndex) => (
                    <div className="resume-sheet" data-resume-capture="" key={pageIndex}>
                        <div className="resume-sheet-inner">
                            <ResumeTemplateRenderer
                                template={template}
                                resumeData={onePage ? resumeData : resumeDataForPage(resumeData, pageIndex, pageCount, template)}
                                previewFocus={previewFocus}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
