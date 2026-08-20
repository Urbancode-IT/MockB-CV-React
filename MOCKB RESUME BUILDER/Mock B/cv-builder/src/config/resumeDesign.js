export const DEFAULT_DESIGN = {
    pageSize: 'a4',
    columns: 'one',
    headerPos: 'top',
    leftWidth: 35,
    fontSize: 10,
    nameSizeOffset: 12.5,
    titleSizeOffset: 5,
    headingSizeOffset: 2,
    entryHeaderOffset: 0,
    lineHeight: 1.32,
    lrMargin: 10,
    tbMargin: 10,
    topMargin: 10,
    bottomMargin: 10,
    sideMargin: 10,
    entrySpacing: 1,
    sectionSpacing: 16,
    headerGap: 12,
    entryLayout: 1,
    entryColWidth: 'auto',
    manualLeftPercent: 28,
    titleSize: 'm',
    subtitleStyle: 'italic',
    subtitlePlacement: 'same',
    descIndent: false,
    listStyle: 'bullet',
    footerPageNumbers: false,
    footerName: false,
    footerEmail: false,
    footerCustom: false,
    footerLeft: '{{name}}',
    footerCenter: '',
    footerRight: '{{page}} / {{pages}}',
    fontFamily: 'Inter',
    fontCat: 'sans',
    accentColor: '#1A3A5C',
    colorMode: 'basic',
    applyAccentToName: false,
    applyAccentToHeadings: true,
    applyAccentToDates: false,
    applyAccentToJob: false,
    applyAccentToLines: true,
    headingStyle: 'full-underline',
    headingTransform: 'uppercase',
    headingSize: 12,
    headingIcons: 'none',
    headingAlign: 'left',
    linkUnderline: true,
    linkBlue: false,
    linkIcon: true,
    headerAlignment: 'left',
    headerArrangement: 'horizontal',
    headerIconType: 'icon',
    headerIconStyle: 'circle',
    nameSize: 'm',
    nameBold: true,
    nameFont: 'body',
    nameCreativeFont: 'Playfair Display',
    roleSize: 'm',
    rolePosition: 'below',
    roleStyle: 'normal',
};

export const FONT_MAP = {
    serif: ['Lora', 'PT Serif', 'Cormorant Garamond', 'Crimson Text', 'Literata', 'EB Garamond', 'Playfair Display', 'Merriweather'],
    sans: ['Inter', 'Satoshi', 'Lato', 'Roboto', 'Open Sans', 'IBM Plex Sans', 'Nunito', 'Work Sans', 'Poppins', 'Source Sans 3'],
    mono: ['IBM Plex Mono', 'Source Code Pro', 'Space Mono', 'Inconsolata', 'Courier Prime'],
};

export const PRESET_COLORS = ['#1A3A5C', '#2A7A6D', '#2563EB', '#0F172A', '#7C3AED', '#374151', '#FCD34D', '#EEC30C', '#ff6b6b', '#4ecdc4', '#45b7d1', '#000000', '#ffffff'];

export const HEADING_STYLES = [
    { id: 'full-underline', name: 'Underline' },
    { id: 'short-double-underline', name: 'Double' },
    { id: 'top-bottom-lines', name: 'Top-Bottom' },
    { id: 'dashed', name: 'Dashed' },
    { id: 'dotted', name: 'Dotted' },
    { id: 'box', name: 'Shaded Box' },
    { id: 'line-text-line', name: 'Middle Line' },
    { id: 'none', name: 'None' },
];

export const hexToRgba = (hex = '#2A7A6D', alpha = 1) => {
    const raw = String(hex).replace('#', '').trim();
    const full = raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw.padEnd(6, '0').slice(0, 6);
    const n = Number.parseInt(full, 16);
    if (Number.isNaN(n)) return `rgba(42, 122, 109, ${alpha})`;
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

export const mergeDesign = (design = {}, templateAccent) => {
    const merged = { ...DEFAULT_DESIGN, ...design };
    if (design.topMargin == null && design.tbMargin != null) merged.topMargin = design.tbMargin;
    if (design.bottomMargin == null && design.tbMargin != null) merged.bottomMargin = design.tbMargin;
    if (design.sideMargin == null && design.lrMargin != null) merged.sideMargin = design.lrMargin;
    if (design.accentColor == null && templateAccent) merged.accentColor = templateAccent;
    return merged;
};

export const captureDesignSnapshot = (resumeData = {}, templateAccent) => {
    const raw = resumeData.design || {};
    const accent = resumeData.themeColor || raw.accentColor || templateAccent;
    return {
        ...mergeDesign(raw, accent),
        ...raw,
        accentColor: accent,
    };
};

export const fillFooterTemplate = (text = '', personal = {}, page = 1, pages = 1) =>
    String(text)
        .replaceAll('{{name}}', personal.name || '')
        .replaceAll('{{email}}', personal.email || '')
        .replaceAll('{{phone}}', personal.phone || '')
        .replaceAll('{{page}}', String(page))
        .replaceAll('{{pages}}', String(pages));
