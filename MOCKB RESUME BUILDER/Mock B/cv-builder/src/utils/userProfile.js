const PROFILE_KEY = 'mockb.cv.userProfile';

const readAll = () => {
    try {
        const raw = localStorage.getItem(PROFILE_KEY);
        const parsed = raw ? JSON.parse(raw) : {};
        return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
        return {};
    }
};

const writeAll = (map) => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(map));
};

const keyFor = (user) => {
    if (!user) return 'guest';
    return String(user.id || user._id || user.email || 'guest').toLowerCase();
};

export const getLocalProfile = (user) => {
    const map = readAll();
    return map[keyFor(user)] || {};
};

export const saveLocalProfile = (user, patch) => {
    const map = readAll();
    const key = keyFor(user);
    const next = {
        ...(map[key] || {}),
        ...patch,
        updatedAt: new Date().toISOString(),
    };
    map[key] = next;
    writeAll(map);
    try {
        window.dispatchEvent(new CustomEvent('mockb-profile-updated', { detail: { key, profile: next } }));
    } catch {
        // ignore (SSR / non-browser)
    }
    return next;
};

export const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('No file selected'));
            return;
        }
        if (!String(file.type || '').startsWith('image/')) {
            reject(new Error('Please choose an image file'));
            return;
        }
        if (file.size > 2.5 * 1024 * 1024) {
            reject(new Error('Image must be under 2.5MB'));
            return;
        }
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = () => reject(new Error('Could not read image'));
        reader.readAsDataURL(file);
    });
