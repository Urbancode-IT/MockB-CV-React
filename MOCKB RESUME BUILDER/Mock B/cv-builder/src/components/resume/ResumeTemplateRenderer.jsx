import React from 'react';

import ClassicProfessional from './templates/ClassicProfessional';
import PortraitProfile from './templates/PortraitProfile';
import StructuredSplit from './templates/StructuredSplit';
import CenteredMinimal from './templates/CenteredMinimal';
import FreshGraduate from './templates/FreshGraduate';
import CampusEntry from './templates/CampusEntry';
import InternBanner from './templates/InternBanner';
import CareerDetail from './templates/CareerDetail';
import NorthShore from './templates/NorthShore';
import GoldRule from './templates/GoldRule';
import { mergeDesign, fillFooterTemplate, hexToRgba, parseSectionSpacing } from '../../config/resumeDesign';
import { resolveTemplateId, DEFAULT_TEMPLATE, getTemplateById, isOnePageTemplate } from '../../config/templates';
import './resume-design.css';

const templateMap = {
    'classic-professional': ClassicProfessional,
    'portrait-profile': PortraitProfile,
    'structured-split': StructuredSplit,
    'centered-minimal': CenteredMinimal,
    'fresh-graduate': FreshGraduate,
    'campus-entry': CampusEntry,
    'intern-banner': InternBanner,
    'career-detail': CareerDetail,
    'north-shore': NorthShore,
    'gold-rule': GoldRule,
};

const NAME_SIZE = { xs: 16, s: 20, m: 24, l: 28, xl: 34 };
const ROLE_SIZE = { s: 9, m: 11, l: 13 };
const ENTRY_TITLE = { s: 9, m: 10.5, l: 12 };

/** Name sits on the accent-colored header — never tint it with the same accent. */
const ACCENT_HEADER_TEMPLATES = new Set(['classic-professional', 'intern-banner']);

const ResumeTemplateRenderer = ({ template, resumeData = {}, preview = false, previewFocus = null }) => {
    const resolved = resolveTemplateId(template);
    const TemplateComponent = templateMap[resolved] || templateMap[DEFAULT_TEMPLATE];
    const templateMeta = getTemplateById(resolved);
    const design = mergeDesign(resumeData.design, templateMeta.accentColor);
    const isLetter = design.pageSize === 'letter';
    const pageW = isLetter ? 216 : 210;
    const pageH = isLetter ? 279 : 297;
    const rawAccent = resumeData.themeColor
        || resumeData.design?.accentColor
        || templateMeta.accentColor
        || '#1A3A5C';
    const internLegacy = new Set(['#3D5A80', '#0F766E']);
    const twoPageLegacy = new Set(['#C2410C', '#1B365D', '#5B21B6']);
    let accent = rawAccent;
    if (resolved === 'intern-banner' && internLegacy.has(String(rawAccent).toUpperCase())) {
        accent = templateMeta.accentColor || '#3730A3';
    } else if (resolved === 'career-detail' && twoPageLegacy.has(String(rawAccent).toUpperCase())) {
        accent = '#111111';
    }
    const entryLeft = design.entryColWidth === 'manual' ? `${design.manualLeftPercent}%` : '28%';
    const namePt = (NAME_SIZE[design.nameSize] || 24) + (design.nameSizeOffset - 12.5);
    const titlePt = (ROLE_SIZE[design.roleSize] || 11) + (design.titleSizeOffset - 5);
    const headingPt = (design.headingSize || 12) + (design.headingSizeOffset - 2);
    const entryPt = (ENTRY_TITLE[design.titleSize] || 10.5) + design.entryHeaderOffset;
    const lockOnePage = true;
    const lockOneCol = ['structured-split', 'centered-minimal', 'fresh-graduate', 'campus-entry', 'intern-banner', 'career-detail', 'north-shore', 'gold-rule'].includes(resolved);
    const pageN = resumeData.pageMeta?.page || 1;
    const pageC = resumeData.pageMeta?.pages || 1;
    const sectionGap = parseSectionSpacing(design.sectionSpacing, 16);
    const showFooter = isOnePageTemplate(resolved)
        && (design.footerPageNumbers || design.footerName || design.footerEmail || design.footerCustom);
    const personal = resumeData.personal || {};
    const nameOnAccentHeader = ACCENT_HEADER_TEMPLATES.has(resolved);
    const nameColor = nameOnAccentHeader
        ? '#ffffff'
        : (design.applyAccentToName ? accent : 'inherit');
    const titleColor = nameOnAccentHeader
        ? 'rgba(255, 255, 255, 0.9)'
        : (design.applyAccentToJob ? accent : 'inherit');

    const footerLeft = design.footerCustom
        ? fillFooterTemplate(design.footerLeft, personal)
        : [design.footerName ? personal.name : '', design.footerEmail ? personal.email : ''].filter(Boolean).join('  ·  ');
    const footerRight = design.footerCustom
        ? fillFooterTemplate(design.footerRight, personal)
        : (design.footerPageNumbers ? `${pageN} / ${pageC}` : '');
    const footerCenter = design.footerCustom ? fillFooterTemplate(design.footerCenter, personal) : '';

    return (
        <div
            className={`resume-design-wrapper${lockOnePage ? ' resume-design-wrapper--preview' : ''}`}
            data-columns={lockOneCol
                ? 'one'
                : resolved === 'portrait-profile'
                ? (resumeData.design?.columns === 'one' ? 'one' : resumeData.design?.columns === 'mix' ? 'mix' : 'two')
                : design.columns}
            data-header-pos={lockOneCol
                ? 'top'
                : resolved === 'portrait-profile'
                ? (resumeData.design?.columns === 'mix' || resumeData.design?.headerPos === 'top'
                    ? 'top'
                    : resumeData.design?.headerPos === 'right' ? 'right' : 'left')
                : (design.columns === 'one' ? 'top' : design.headerPos)}
            data-entry-layout={design.entryLayout}
            data-heading-style={design.headingStyle}
            data-header-align={design.headerAlignment}
            data-header-arrange={design.headerArrangement}
            data-header-icons={design.headerIconType}
            data-link-underline={design.linkUnderline ? 'true' : 'false'}
            data-link-blue={design.linkBlue ? 'true' : 'false'}
            data-link-icon={design.linkIcon ? 'true' : 'false'}
            data-desc-indent={design.descIndent ? 'true' : 'false'}
            data-list={design.listStyle}
            data-role-pos={design.rolePosition}
            data-accent-dates={design.applyAccentToDates ? 'true' : 'false'}
            data-preview-focus={previewFocus || undefined}
            style={{
                width: `${pageW}mm`,
                minHeight: `${pageH}mm`,
                height: lockOnePage ? `${pageH}mm` : undefined,
                maxHeight: lockOnePage ? `${pageH}mm` : undefined,
                overflow: lockOnePage ? 'hidden' : undefined,
                fontFamily: `'${design.fontFamily}', sans-serif`,
                fontSize: `${design.fontSize}pt`,
                lineHeight: design.lineHeight,
                '--accent-color': accent,
                '--resume-accent': accent,
                '--pp-tint-14': hexToRgba(accent, 0.14),
                '--pp-tint-18': hexToRgba(accent, 0.18),
                '--pp-tint-22': hexToRgba(accent, 0.22),
                '--pp-line-35': hexToRgba(accent, 0.35),
                '--pp-line-40': hexToRgba(accent, 0.4),
                '--resume-font': `'${design.fontFamily}', sans-serif`,
                '--resume-font-size': `${design.fontSize}pt`,
                '--resume-fs': design.fontSize,
                '--resume-line-height': design.lineHeight,
                '--resume-section-spacing': `${sectionGap}px`,
                '--resume-header-gap': `${design.headerGap ?? 12}px`,
                '--resume-pad-x': `${design.sideMargin}mm`,
                '--resume-pad-y': `${design.topMargin}mm`,
                '--resume-pad-top': `${design.topMargin}mm`,
                '--resume-pad-bottom': `${design.bottomMargin}mm`,
                '--resume-pad-side': `${design.sideMargin}mm`,
                '--resume-name-size': `${namePt}pt`,
                '--resume-name-weight': design.nameBold ? 700 : 400,
                '--resume-name-font': 'inherit',
                '--resume-name-color': nameColor,
                '--resume-title-size': `${titlePt}pt`,
                '--resume-title-style': design.roleStyle === 'italic' ? 'italic' : 'normal',
                '--resume-title-color': titleColor,
                '--resume-heading-size': `${headingPt}pt`,
                '--resume-heading-transform': design.headingTransform,
                '--resume-heading-align': design.headingAlign,
                '--resume-heading-color': design.applyAccentToHeadings ? accent : 'inherit',
                '--resume-line-color': design.applyAccentToLines ? accent : '#222',
                '--resume-entry-title-size': `${entryPt}pt`,
                '--resume-subtitle-style': design.subtitleStyle === 'italic' ? 'italic' : 'normal',
                '--resume-subtitle-weight': design.subtitleStyle === 'bold' ? 700 : 400,
                '--resume-entry-gap': `${6 + design.entrySpacing * 4}px`,
                '--resume-entry-left': entryLeft,
                '--resume-left-col': `${design.leftWidth}%`,
                '--resume-page-h': `${pageH}mm`,
                paddingBottom: showFooter && !lockOnePage ? '28px' : undefined,
            }}
        >
            <TemplateComponent resumeData={resumeData} />
            {showFooter && (
                <div className="resume-print-footer">
                    <span>{footerLeft}</span>
                    <span>{footerCenter}</span>
                    <span>{footerRight}</span>
                </div>
            )}
        </div>
    );
};

export default ResumeTemplateRenderer;
