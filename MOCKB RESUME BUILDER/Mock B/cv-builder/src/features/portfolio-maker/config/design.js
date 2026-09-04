import { buildAccentGradient, darkenHex, mixHex, performanceWaveDataUrl, hexToRgb } from './colorUtils';

export const FONT_PRESETS = [
  {
    id: 'inter',
    label: 'Inter',
    family: 'Inter, system-ui, sans-serif',
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
  },
  {
    id: 'satoshi',
    label: 'Satoshi',
    family: "'Satoshi', sans-serif",
    url: 'https://api.fontshare.com/v2/css?f[]=satoshi@1,900,700,500,300,400&display=swap',
  },
  {
    id: 'poppins',
    label: 'Poppins',
    family: "'Poppins', sans-serif",
    url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap',
  },
  {
    id: 'space-grotesk',
    label: 'Space Grotesk',
    family: "'Space Grotesk', sans-serif",
    url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap',
  },
  {
    id: 'playfair',
    label: 'Playfair Display',
    family: "'Playfair Display', Georgia, serif",
    url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&display=swap',
  },
];

export const BRAND_GRADIENT = 'linear-gradient(90deg, #00B56F, #004F30)';

export const COLOR_PRESETS = [
  { id: 'brand', color: '#00B56F', gradient: BRAND_GRADIENT, label: 'Brand Green' },
  { id: 'crimson', color: '#DC2626', gradient: 'linear-gradient(90deg, #EF4444, #7F1D1D)', label: 'Crimson' },
  { id: 'mint', color: '#64ffda', label: 'Mint' },
  { id: 'gold', color: '#D4AF37', label: 'Gold' },
  { id: 'indigo', color: '#4F46E5', label: 'Indigo' },
  { id: 'teal', color: '#0D9488', label: 'Teal' },
  { id: 'rose', color: '#E11D48', label: 'Rose' },
  { id: 'navy', color: '#1A3A5C', label: 'Navy' },
];

export const MODE_PRESETS = [
  { id: 'dark', label: 'Dark' },
  { id: 'light', label: 'Light' },
];

export const DEFAULT_DESIGN = {
  colorId: 'brand',
  accentColor: '#00B56F',
  accentGradient: BRAND_GRADIENT,
  fontId: 'satoshi',
  mode: 'dark',
};

/** Folio Two ships dark + crimson by default. Never override an explicit user color pick. */
export const FOLIO_TWO_DEFAULT_DESIGN = {
  colorId: 'crimson',
  accentColor: '#DC2626',
  accentGradient: 'linear-gradient(90deg, #EF4444, #7F1D1D)',
  fontId: 'satoshi',
  mode: 'dark',
};

/** Apply Folio Two defaults, then let any explicit user picks win. */
export function resolveFolioTwoDesign(partial = {}) {
  return resolveDesign({
    ...FOLIO_TWO_DEFAULT_DESIGN,
    ...partial,
  });
}

export const getFontPreset = (fontId) =>
  FONT_PRESETS.find((f) => f.id === fontId) || FONT_PRESETS[0];

export const getColorPreset = (colorId) =>
  COLOR_PRESETS.find((c) => c.id === colorId) || null;

export function resolveDesign(partial = {}) {
  const colorId = partial.colorId || DEFAULT_DESIGN.colorId;
  const preset = getColorPreset(colorId);
  const accentColor = partial.accentColor || preset?.color || DEFAULT_DESIGN.accentColor;
  const accentGradient = partial.accentGradient
    ?? preset?.gradient
    ?? buildAccentGradient(accentColor);
  return {
    colorId,
    accentColor,
    accentGradient,
    fontId: partial.fontId || DEFAULT_DESIGN.fontId,
    mode: partial.mode || DEFAULT_DESIGN.mode,
  };
}

export function buildThemeVars(design) {
  const d = resolveDesign(design);
  const font = getFontPreset(d.fontId);
  const dark = d.mode === 'dark';
  const accent = d.accentColor;
  const accentDeep = darkenHex(accent, 0.55);
  const accentGradient = d.accentGradient || buildAccentGradient(accent);
  const bgBase = dark ? '#000000' : '#ffffff';
  const surfaceBase = dark ? '#0a0a0a' : '#f8fafc';

  const wave = performanceWaveDataUrl(accent);

  return {
    accent,
    accentGradient,
    accentSoft: `${accent}20`,
    accentGlow: `${accent}55`,
    accentDeep,
    text: dark ? '#ffffff' : '#0f172a',
    muted: dark ? '#a1a1aa' : '#64748b',
    bg: bgBase,
    surface: surfaceBase,
    surfaceHover: dark ? '#141414' : '#f1f5f9',
    border: dark ? '#2a2a2a' : '#cbd5e1',
    card: dark ? '#0a0a0a' : '#ffffff',
    surfaceBorder: dark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(15, 23, 42, 0.16)',
    cardShadow: dark
      ? '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.07)'
      : '0 8px 28px rgba(15, 23, 42, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
    stackPillBg: dark ? 'rgba(255, 255, 255, 0.07)' : '#ffffff',
    stackPillBorder: dark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.16)',
    stackPillColor: dark ? 'rgba(255, 255, 255, 0.78)' : '#64748b',
    stackPillShadow: dark ? '0 2px 8px rgba(0, 0, 0, 0.35)' : '0 2px 8px rgba(15, 23, 42, 0.08)',
    headerBg: dark ? 'rgba(0, 0, 0, 0.75)' : 'rgba(255, 255, 255, 0.88)',
    borderSubtle: dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)',
    heroBg: dark
      ? `radial-gradient(ellipse 80% 60% at 75% 20%, color-mix(in srgb, ${accent} 45%, transparent), transparent 55%), linear-gradient(180deg, ${mixHex(accent, '#000000', 0.78)} 0%, ${mixHex(accent, '#000000', 0.9)} 35%, ${bgBase} 100%)`
      : `radial-gradient(ellipse 80% 60% at 75% 20%, color-mix(in srgb, ${accent} 25%, transparent), transparent 55%), linear-gradient(180deg, ${mixHex(accent, '#ffffff', 0.9)} 0%, ${mixHex(accent, '#ffffff', 0.95)} 40%, ${bgBase} 100%)`,
    blockAltBg: surfaceBase,
    bentoCardBg: dark
      ? `linear-gradient(145deg, ${mixHex(accent, '#0a0a0a', 0.82)} 0%, ${surfaceBase} 60%, ${bgBase} 100%)`
      : `linear-gradient(145deg, ${mixHex(accent, '#ffffff', 0.92)} 0%, #ffffff 60%, ${surfaceBase} 100%)`,
    bentoBorder: dark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(15, 23, 42, 0.12)',
    bentoReliabilityBg: dark
      ? `radial-gradient(circle at 30% 50%, ${accent}55, transparent 50%), linear-gradient(135deg, ${mixHex(accent, '#000000', 0.7)}, ${surfaceBase})`
      : `radial-gradient(circle at 30% 50%, ${accent}33, transparent 50%), linear-gradient(135deg, ${mixHex(accent, '#ffffff', 0.75)}, ${surfaceBase})`,
    bentoPerformanceBg: dark
      ? `linear-gradient(180deg, transparent 40%, color-mix(in srgb, ${accent} 30%, transparent) 100%), ${wave} center/80% no-repeat, ${mixHex(accent, '#0a0a0a', 0.85)}`
      : `linear-gradient(180deg, transparent 40%, color-mix(in srgb, ${accent} 20%, transparent) 100%), ${wave} center/80% no-repeat, ${mixHex(accent, '#ffffff', 0.9)}`,
    bentoBusinessBg: dark
      ? `radial-gradient(circle at 80% 80%, ${accent}55, transparent 45%), ${mixHex(accent, '#000000', 0.88)}`
      : `radial-gradient(circle at 80% 80%, ${accent}33, transparent 45%), ${mixHex(accent, '#ffffff', 0.92)}`,
    techItem: dark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(15, 23, 42, 0.45)',
    techItemHover: dark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.75)',
    gridLine: dark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.06)',
    btnOutlineColor: dark ? '#ffffff' : '#0f172a',
    btnOutlineBorder: dark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(15, 23, 42, 0.25)',
    btnOutlineHoverBg: dark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.04)',
    workMediaBg: dark
      ? `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px), radial-gradient(ellipse at 50% 30%, color-mix(in srgb, ${accent} 50%, ${mixHex(accent, '#000000', 0.9)}), ${surfaceBase} 70%)`
      : `linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px), radial-gradient(ellipse at 50% 30%, color-mix(in srgb, ${accent} 35%, ${mixHex(accent, '#ffffff', 0.92)}), ${mixHex(accent, '#ffffff', 0.96)} 70%)`,
    workLinkBorder: dark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(15, 23, 42, 0.2)',
    workLinkBg: dark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.04)',
    workLinkColor: dark ? '#ffffff' : '#0f172a',
    workImgBorder: dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)',
    tagSolidBg: dark ? '#ffffff' : '#0f172a',
    tagSolidColor: dark ? '#000000' : '#ffffff',
    tagOutlineBorder: dark ? 'rgba(255, 255, 255, 0.28)' : 'rgba(15, 23, 42, 0.18)',
    videoBg: dark ? '#111111' : '#f1f5f9',
    videoModalBg: dark ? '#111111' : '#ffffff',
    codeIconColor: dark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(15, 23, 42, 0.35)',
    codeIconBorder: dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)',
    codeIconBg: dark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.7)',
    logoBorder: dark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.15)',
    autoflowMask: dark ? '#000000' : '#ffffff',
    shadowColor: dark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(15, 23, 42, 0.12)',
    fontFamily: font.family,
    fontUrl: font.url,
    fontId: d.fontId,
    mode: d.mode,
  };
}

export { buildAccentGradient } from './colorUtils';

export function themeToCssVars(theme) {
  return {
    '--fo-accent': theme.accent,
    '--fo-accent-gradient': theme.accentGradient,
    '--fo-accent-soft': theme.accentSoft,
    '--fo-accent-glow': theme.accentGlow,
    '--fo-accent-deep': theme.accentDeep,
    '--fo-text': theme.text,
    '--fo-muted': theme.muted,
    '--fo-bg': theme.bg,
    '--fo-surface': theme.surface,
    '--fo-border': theme.border,
    '--fo-card': theme.card,
    '--fo-surface-border': theme.surfaceBorder,
    '--fo-card-shadow': theme.cardShadow,
    '--fo-stack-pill-bg': theme.stackPillBg,
    '--fo-stack-pill-border': theme.stackPillBorder,
    '--fo-stack-pill-color': theme.stackPillColor,
    '--fo-stack-pill-shadow': theme.stackPillShadow,
    '--fo-header-bg': theme.headerBg,
    '--fo-border-subtle': theme.borderSubtle,
    '--fo-hero-bg': theme.heroBg,
    '--fo-block-alt-bg': theme.blockAltBg,
    '--fo-bento-card-bg': theme.bentoCardBg,
    '--fo-bento-border': theme.bentoBorder,
    '--fo-bento-reliability-bg': theme.bentoReliabilityBg,
    '--fo-bento-performance-bg': theme.bentoPerformanceBg,
    '--fo-bento-business-bg': theme.bentoBusinessBg,
    '--fo-tech-item': theme.techItem,
    '--fo-tech-item-hover': theme.techItemHover,
    '--fo-grid-line': theme.gridLine,
    '--fo-btn-outline-color': theme.btnOutlineColor,
    '--fo-btn-outline-border': theme.btnOutlineBorder,
    '--fo-btn-outline-hover-bg': theme.btnOutlineHoverBg,
    '--fo-work-media-bg': theme.workMediaBg,
    '--fo-work-link-border': theme.workLinkBorder,
    '--fo-work-link-bg': theme.workLinkBg,
    '--fo-work-link-color': theme.workLinkColor,
    '--fo-work-img-border': theme.workImgBorder,
    '--fo-tag-solid-bg': theme.tagSolidBg,
    '--fo-tag-solid-color': theme.tagSolidColor,
    '--fo-tag-outline-border': theme.tagOutlineBorder,
    '--fo-video-bg': theme.videoBg,
    '--fo-video-modal-bg': theme.videoModalBg,
    '--fo-code-icon-color': theme.codeIconColor,
    '--fo-code-icon-border': theme.codeIconBorder,
    '--fo-code-icon-bg': theme.codeIconBg,
    '--fo-logo-border': theme.logoBorder,
    '--fo-autoflow-mask': theme.autoflowMask,
    '--fo-shadow-color': theme.shadowColor,
  };
}

export function themeToCssBlock(theme) {
  const vars = themeToCssVars(theme);
  const lines = Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`).join('\n');
  return `.fo-preview {\n${lines}\n  font-family: ${theme.fontFamily};\n}`;
}

function onAccentColor(hex) {
  const { r, g, b } = hexToRgb(hex);
  const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luma > 0.62 ? '#111111' : '#ffffff';
}

/** CSS custom properties for Folio Two — fully driven by the active design theme. */
export function folioTwoCssVars(theme) {
  const dark = theme.mode === 'dark';
  const accent = theme.accent;
  return {
    '--ft-bg': theme.bg,
    '--ft-bg-soft': dark ? `color-mix(in srgb, ${accent} 14%, rgba(18, 12, 12, 0.72))` : mixHex(accent, '#ffffff', 0.9),
    '--ft-bg-card': dark ? `color-mix(in srgb, ${accent} 16%, rgba(28, 16, 16, 0.55))` : mixHex(accent, '#ffffff', 0.82),
    '--ft-text': theme.text,
    '--ft-muted': theme.muted,
    '--ft-line': dark ? `${accent}66` : `${accent}44`,
    '--ft-accent': accent,
    '--ft-accent-grad': theme.accentGradient,
    '--ft-accent-deep': theme.accentDeep,
    '--ft-on-accent': onAccentColor(accent),
    '--ft-shadow': theme.shadowColor,
    '--ft-footer-bg': dark ? '#080808' : mixHex(accent, '#0f172a', 0.88),
    '--ft-footer-text': '#f8fafc',
    '--ft-footer-muted': '#94a3b8',
    '--ft-footer-accent': accent,
    '--ft-media-bg': dark ? `color-mix(in srgb, ${accent} 18%, rgba(28, 16, 16, 0.65))` : mixHex(accent, '#ffffff', 0.78),
    '--ft-input-bg': dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.88)',
    '--ft-input-ring': `${accent}40`,
    '--ft-glass': dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.55)',
    '--ft-glass-strong': dark ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.12)',
    '--ft-radius': '24px',
  };
}

export function folioTwoCssBlock(theme) {
  const vars = folioTwoCssVars(theme);
  const lines = Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`).join('\n');
  return `.ft-preview {\n${lines}\n  font-family: ${theme.fontFamily};\n}`;
}
