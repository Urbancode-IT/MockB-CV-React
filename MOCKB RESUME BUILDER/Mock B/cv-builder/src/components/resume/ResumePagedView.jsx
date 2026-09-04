import { useLayoutEffect, useMemo, useRef } from 'react';
import ResumeTemplateRenderer from './ResumeTemplateRenderer';
import { mergeDesign } from '../../config/resumeDesign';
import { getTemplateMaxPages, isOnePageTemplate } from '../../config/templates';
import {
    bodySectionsForData,
    computeOverflowPagination,
    getActivePageCount,
    layoutSnapshotEqual,
    MAX_AUTO_PAGES,
    resumeDataForPage,
} from '../../config/pageLayout';
import './ResumePagedView.css';

/** Ignore pagination fields so auto-split does not count as a user edit. */
const contentFingerprint = (data = {}) => {
    const {
        pageSections,
        pageEntrySlices,
        pageMeta,
        ...rest
    } = data;
    return JSON.stringify(rest);
};

export default function ResumePagedView({
    template,
    resumeData,
    previewFocus = null,
    onAutoPaginate = null,
}) {
    const design = mergeDesign(resumeData?.design);
    const isLetter = design.pageSize === 'letter';
    const pageW = isLetter ? 216 : 210;
    const pageH = isLetter ? 279 : 297;
    const maxPages = Math.max(MAX_AUTO_PAGES, getTemplateMaxPages(template) || 2);
    const sheetRefs = useRef([]);
    const measuringRef = useRef(false);
    const initialFingerprintRef = useRef(null);
    const templateRef = useRef(template);

    // Reset the "fresh sample" baseline when the template changes.
    if (templateRef.current !== template) {
        templateRef.current = template;
        initialFingerprintRef.current = contentFingerprint(resumeData);
    }
    if (initialFingerprintRef.current === null) {
        initialFingerprintRef.current = contentFingerprint(resumeData);
    }

    const isOnePager = isOnePageTemplate(template);
    const userEdited = contentFingerprint(resumeData) !== initialFingerprintRef.current;
    // One-page templates stay on a single clipped sheet (like the gallery) until the user edits.
    // After edits, overflow can spill to page 2+ with correct alignment.
    const autoPaginateEnabled = !isOnePager || userEdited;

    const fittedData = useMemo(() => {
        if (autoPaginateEnabled) return resumeData;
        return {
            ...resumeData,
            pageSections: { page1: bodySectionsForData(resumeData), page2: [] },
            pageEntrySlices: {},
        };
    }, [autoPaginateEnabled, resumeData]);

    const pageCount = autoPaginateEnabled
        ? getActivePageCount(fittedData, template, maxPages)
        : 1;
    const pages = useMemo(() => Array.from({ length: pageCount }, (_, i) => i), [pageCount]);

    // If a one-page template still has a stale page-2 split from an older session, clear it.
    useLayoutEffect(() => {
        if (!onAutoPaginate || autoPaginateEnabled) return undefined;
        const hasExtra = Object.keys(resumeData?.pageSections || {}).some(
            (key) => /^page\d+$/.test(key) && Number(key.slice(4)) > 1 && (resumeData.pageSections[key] || []).length,
        );
        const hasSlices = Object.keys(resumeData?.pageEntrySlices || {}).length > 0;
        if (hasExtra || hasSlices) {
            onAutoPaginate({
                pageSections: { page1: bodySectionsForData(resumeData), page2: [] },
                pageEntrySlices: {},
            });
        }
        return undefined;
    }, [autoPaginateEnabled, onAutoPaginate, resumeData]);

    useLayoutEffect(() => {
        if (!autoPaginateEnabled || !onAutoPaginate || measuringRef.current) return undefined;

        const run = () => {
            measuringRef.current = true;
            try {
                for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
                    if (pageIndex >= maxPages - 1) break;
                    const sheet = sheetRefs.current[pageIndex];
                    if (!sheet) continue;
                    const next = computeOverflowPagination(sheet, fittedData, template, pageIndex);
                    if (!layoutSnapshotEqual(fittedData, next, template)) {
                        onAutoPaginate(next);
                        break;
                    }
                }
            } finally {
                requestAnimationFrame(() => {
                    measuringRef.current = false;
                });
            }
        };

        const frame = requestAnimationFrame(run);
        return () => cancelAnimationFrame(frame);
    }, [fittedData, template, onAutoPaginate, pageCount, maxPages, autoPaginateEnabled]);

    return (
        <div className="resume-paged" style={{ '--page-w': `${pageW}mm`, '--page-h': `${pageH}mm` }}>
            <div className="resume-sheets">
                {pages.map((pageIndex) => (
                    <div
                        className="resume-sheet"
                        data-resume-capture=""
                        key={pageIndex}
                        ref={(el) => {
                            sheetRefs.current[pageIndex] = el;
                        }}
                    >
                        <div className="resume-sheet-inner">
                            <ResumeTemplateRenderer
                                template={template}
                                resumeData={resumeDataForPage(fittedData, pageIndex, pageCount, template)}
                                previewFocus={previewFocus}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
