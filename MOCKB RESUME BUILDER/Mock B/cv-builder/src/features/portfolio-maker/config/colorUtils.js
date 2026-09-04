export function normalizeHex(hex) {
  let h = String(hex || '#000000').replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (h.length !== 6) return '000000';
  return h;
}

export function hexToRgb(hex) {
  const h = normalizeHex(hex);
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function rgbToHex(r, g, b) {
  const to = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${to(r)}${to(g)}${to(b)}`;
}

/** Darken a hex color (amount 0–1, higher = darker). */
export function darkenHex(hex, amount = 0.55) {
  const { r, g, b } = hexToRgb(hex);
  const f = 1 - amount;
  return rgbToHex(r * f, g * f, b * f);
}

/** Mix two hex colors (weight = proportion of `withHex`). */
export function mixHex(hex, withHex, weight = 0.5) {
  const a = hexToRgb(hex);
  const b = hexToRgb(withHex);
  const w = Math.max(0, Math.min(1, weight));
  return rgbToHex(
    a.r * (1 - w) + b.r * w,
    a.g * (1 - w) + b.g * w,
    a.b * (1 - w) + b.b * w,
  );
}

export function buildAccentGradient(accentColor) {
  const deep = darkenHex(accentColor, 0.55);
  return `linear-gradient(90deg, ${accentColor}, ${deep})`;
}

export function performanceWaveDataUrl(color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60"><path d="M0 40 Q50 10 100 35 T200 20" fill="none" stroke="${color}" stroke-width="2" opacity="0.6"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
