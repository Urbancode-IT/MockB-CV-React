/** Curated placeholder imagery for portfolio previews and ZIP exports */
export const PORTFOLIO_ASSETS = {
  profile:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=720&h=960&fit=crop&q=85',
  experiencePortrait:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=720&fit=crop&q=85',
  philosophyVideo:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=720&fit=crop&q=85',
  projectImages: [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1100&h=640&fit=crop&q=85',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1100&h=640&fit=crop&q=85',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1100&h=640&fit=crop&q=85',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1100&h=640&fit=crop&q=85',
  ],
};

export function projectImageAt(index) {
  const imgs = PORTFOLIO_ASSETS.projectImages;
  return imgs[index % imgs.length];
}
