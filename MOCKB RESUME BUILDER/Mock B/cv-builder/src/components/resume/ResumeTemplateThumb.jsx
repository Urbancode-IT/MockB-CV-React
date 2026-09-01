import ResumeTemplateRenderer from './ResumeTemplateRenderer';
import { isOnePageTemplate } from '../../config/templates';
import { pageHasContent, resumeDataForPage } from '../../config/pageLayout';
import './ResumeTemplateThumb.css';

export default function ResumeTemplateThumb({ template, resumeData }) {
    const twoPage = !isOnePageTemplate(template) && pageHasContent(resumeData, 1, template);

    if (!twoPage) {
        return (
            <div className="rt-preview-scale-wrapper">
                <ResumeTemplateRenderer template={template} resumeData={resumeData} preview />
            </div>
        );
    }

    return (
        <div className="rt-two-page-thumb">
            <div className="rt-two-page-thumb__sheet rt-two-page-thumb__sheet--back">
                <div className="rt-preview-scale-wrapper">
                    <ResumeTemplateRenderer
                        template={template}
                        resumeData={resumeDataForPage(resumeData, 1, 2, template)}
                        preview
                    />
                </div>
            </div>
            <div className="rt-two-page-thumb__sheet rt-two-page-thumb__sheet--front">
                <div className="rt-preview-scale-wrapper">
                    <ResumeTemplateRenderer
                        template={template}
                        resumeData={resumeDataForPage(resumeData, 0, 2, template)}
                        preview
                    />
                </div>
            </div>
        </div>
    );
}
