import { DEFAULT_DESIGN } from './design';

export const PORTFOLIO_MAKER_TEMPLATES = [
  {
    id: 'folio-one',
    name: 'Folio One',
    tagline: 'Clean one-page developer portfolio',
    description: 'Developer portfolio inspired by the DS Personal Developer Portfolio layout — dark theme, profile imagery, project cards with thumbnails, and structured service sections. Download a production-ready React + Vite project.',
    category: 'one-page',
    framework: 'React + Vite',
    accentColor: DEFAULT_DESIGN.accentColor,
    tags: ['responsive', 'one-page', 'developer', 'sticky-nav', 'projects'],
    features: [
      'Sticky navigation bar',
      'Animated hero & sections',
      'Projects grid with hover effects',
      'Skills chips & experience timeline',
      'Font & color customization',
      'ZIP with README run guide',
    ],
  },
  {
    id: 'folio-two',
    name: 'Folio Two',
    tagline: 'Soft designer portfolio with motion',
    description: 'Dark designer portfolio with animated blob hero, about section, looping tech stack, alternating project cards, contact form, WhatsApp Let’s Talk, and resume download — crimson dark theme that follows your accent color everywhere.',
    category: 'one-page',
    framework: 'React + Vite',
    accentColor: '#DC2626',
    tags: ['responsive', 'designer', 'dark', 'animated', 'projects'],
    features: [
      'Animated hero blob & portrait',
      'About + resume download',
      'Theme-linked accent everywhere',
      'Alternating project cards',
      'WhatsApp contact + form',
      'ZIP with README run guide',
    ],
  },
];

export const getMakerTemplate = (id) =>
  PORTFOLIO_MAKER_TEMPLATES.find((t) => t.id === id) || PORTFOLIO_MAKER_TEMPLATES[0];

// Kept for backward compatibility
export { COLOR_PRESETS as THEME_PRESETS } from './design';
