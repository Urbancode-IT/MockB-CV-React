const STORAGE_KEY = 'pm-preview-state';

export function savePreviewState(payload) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...payload, savedAt: Date.now() }));
  } catch {
    /* ignore quota errors */
  }
}

export function loadPreviewState(templateId) {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.templateId !== templateId) return null;
    return data;
  } catch {
    return null;
  }
}

export function clearPreviewState() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
