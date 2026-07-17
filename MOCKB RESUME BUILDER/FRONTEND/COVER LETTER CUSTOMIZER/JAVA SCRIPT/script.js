// ===== STATE MANAGEMENT =====
let historyStack = [];
let historyIndex = -1;
const maxHistory = 30;

const defaultState = {
    margins: 5,
    spacing: 3,
    color: '#EEC30C',          // primary → name + border
    secondaryColor: '#EEC30C', // secondary → role + contact icons
    fontFamily: 'Satoshi',
    fontSize: 2,
    lineHeight: 1.4,
    background: 'pat-blank',
    layout: 'modern',
    size: 'a4',
    photoShow: false,
    photoGray: false,
    photoSrc: ''
};

let currentState = { ...defaultState };

// ===== CUSTOM COLOR PICKER INTERNALS =====
let pickerHue         = 45;   // yellow-ish by default
let pickerSaturation  = 0.95;
let pickerBrightness  = 0.93;
let pickerMode        = 'primary'; // 'primary' | 'secondary'
let pickerPrimaryColor   = '#EEC30C'; // live-tracks primary in picker
let pickerSecondaryColor = '#EEC30C'; // live-tracks secondary in picker
let savedCustomColors = [];
let isDraggingSpectrum = false;

// ===== HEADER OPTIONS STATE =====
let headerOptionsOpen = false;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    initializeInlineEditing();
    setupEventListeners();
    setupHeaderOptionsPanel();

    // --- Parse URL Parameters ---
    const urlParams   = new URLSearchParams(window.location.search);
    const templateParam = urlParams.get('template');   // e.g. "traditional"
    const colorParam    = urlParams.get('color');       // e.g. "#1b2a47"

    if (templateParam) {
        // Apply the layout using the existing selectTemplate logic
        // (sets CSS class, font, default colors, content)
        const fakeCard = document.getElementById('tpl-' + templateParam);
        selectTemplate(templateParam, fakeCard);
    }

    // Override color AFTER template sets its defaults, so user's chosen color wins
    if (colorParam) {
        const lighter = lightenColor(colorParam, 0.45);
        currentState.color          = colorParam;
        currentState.secondaryColor = lighter;
        setPrimaryColor(colorParam);
        setSecondaryColor(lighter);
        // Deactivate all preset swatches (none matches exactly)
        document.querySelectorAll('.color-option').forEach(o => o.classList.remove('active'));
        // Sync the custom color picker
        syncSpectrumFromColor(colorParam);
    }

    applyState();
    initSwatchColors();
    saveHistoryState('Initial Load');

    if (!colorParam) {
        syncSpectrumFromColor(currentState.color || '#EEC30C');
    }
});


// ===== SIDEBAR & TABS =====
function toggleSidebar(open) {
    const sidebar = document.getElementById('sidebar');
    if (open) {
        sidebar.classList.remove('closed');
    } else {
        sidebar.classList.add('closed');
        document.querySelectorAll('.toolbar-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    }
}

function switchTab(tabId, button) {
    const sidebar = document.getElementById('sidebar');
    const isClosed  = sidebar.classList.contains('closed');
    const isActive  = button.classList.contains('active');
    if (isActive && !isClosed) { toggleSidebar(false); return; }

    document.querySelectorAll('.toolbar-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    document.querySelectorAll('.sidebar-content .panel-tab').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`panel-${tabId}`);
    if (target) target.classList.add('active');

    const title = document.getElementById('sidebar-title');
    if (title) title.innerText = button.innerText.trim();

    toggleSidebar(true);
}

// ===== INLINE EDITING =====
function initializeInlineEditing() {
    document.querySelectorAll('.editable-field').forEach(field => {
        field.addEventListener('paste', e => {
            e.preventDefault();
            const text = e.clipboardData.getData('text/plain');
            document.execCommand('insertText', false, text);
        });
        field.addEventListener('blur', () => {
            const saved = historyStack[historyIndex];
            const id = field.id;
            if (!saved || saved.fieldHTMLs[id] !== field.innerHTML) {
                saveHistoryState(`Edit ${(id || '').replace('sheet-', '')}`);
            }
        });
    });
}

function setupEventListeners() {
    // Close download dropdown on outside click
    document.addEventListener('click', e => {
        const dc = document.getElementById('download-container');
        if (dc && !dc.contains(e.target)) {
            const dd = document.getElementById('download-dropdown');
            if (dd) dd.style.display = 'none';
        }
    });

    // Preview modal: close on backdrop click
    // We use a flag so the button click itself does NOT trigger this
    document.addEventListener('click', e => {
        const modal   = document.getElementById('preview-modal');
        const wrapper = document.querySelector('.preview-modal-wrapper');
        const eyeBtn  = document.getElementById('btn-toggle-preview');
        if (
            modal &&
            modal.classList.contains('active') &&
            wrapper &&
            !wrapper.contains(e.target) &&
            eyeBtn && !eyeBtn.contains(e.target)
        ) {
            closePreviewModal();
        }
    });

    // Spectrum drag
    document.addEventListener('mousemove', onSpectrumMouseMove);
    document.addEventListener('mouseup',   () => { isDraggingSpectrum = false; });
    document.addEventListener('touchmove', onSpectrumTouchMove, { passive: false });
    document.addEventListener('touchend',  () => { isDraggingSpectrum = false; });
}

// ===== SLIDER HELPERS =====
function updateSliderVal(id, val) {
    const el = document.getElementById(`val-${id}`);
    if (el) el.innerText = val;
}

function stepSlider(sliderId, step, min, max, stateKey) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    let val = parseFloat(slider.value) + step;
    val = Math.min(max, Math.max(min, val));
    slider.value = val;
    if (stateKey === 'margins')    setMargins(val);
    else if (stateKey === 'spacing')   setSpacing(val);
    else if (stateKey === 'fontSize')  setFontSize(val);
    else if (stateKey === 'lineHeight') setLineHeight(val / 10);
}

// ===== DESIGN SETTERS =====
function setMargins(val) {
    currentState.margins = Number(val);
    const sheet = document.getElementById('cover-letter-sheet');
    if (sheet) {
        sheet.style.padding = `${val * 4.5}mm ${val * 5.2}mm`;
    }
    updateSliderVal('margins', val);
    const s = document.getElementById('slider-margins');
    if (s) s.value = val;
}

function setSpacing(val) {
    currentState.spacing = Number(val);
    const sheet = document.getElementById('cover-letter-sheet');
    if (sheet) {
        const gap    = (val * 3) + 'px';
        const hGap   = (val * 4.5) + 'px';
        sheet.style.gap = gap;
        const h = sheet.querySelector('.sheet-header');    if (h)  h.style.marginBottom  = hGap;
        const m = sheet.querySelector('.sheet-meta-info'); if (m)  m.style.marginBottom  = hGap;
        const b = sheet.querySelector('.sheet-body');      if (b)  b.style.gap           = gap;
        const so= sheet.querySelector('.sheet-signoff');   if (so) so.style.marginTop    = (val * 6) + 'px';
    }
    updateSliderVal('spacing', val);
    const s = document.getElementById('slider-spacing');
    if (s) s.value = val;
}

// Primary color → Name (YOUR NAME) + header divider line
function setPrimaryColor(hex) {
    if (!hex) return;
    currentState.color = hex;
    pickerPrimaryColor  = hex;
    const sheet = document.getElementById('cover-letter-sheet');
    if (sheet) sheet.style.setProperty('--accent-color', hex);
}

// Secondary color → Role + contact-item icons
function setSecondaryColor(hex) {
    if (!hex) return;
    currentState.secondaryColor = hex;
    pickerSecondaryColor = hex;
    const sheet = document.getElementById('cover-letter-sheet');
    if (sheet) sheet.style.setProperty('--secondary-accent-color', hex);
}

// Convenience alias (used by template switcher / legacy calls)
function setColor(hex, saveHist) {
    setPrimaryColor(hex);
    if (saveHist) saveHistoryState('Color Change');
}

// ===== PRESET COLOR GRID =====
// Helper to create a lighter variant of a hex color for the secondary elements
function lightenColor(hex, percent) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    let r = parseInt(hex.substring(0,2), 16);
    let g = parseInt(hex.substring(2,4), 16);
    let b = parseInt(hex.substring(4,6), 16);
    r = Math.min(255, Math.floor(r + (255 - r) * percent));
    g = Math.min(255, Math.floor(g + (255 - g) * percent));
    b = Math.min(255, Math.floor(b + (255 - b) * percent));
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Initialises every .color-option with distinct --swatch-outer / --swatch-inner
// so the CSS dual-ring shows primary color outside and a lighter shade inside.
function initSwatchColors() {
    document.querySelectorAll('.color-option').forEach(opt => {
        const primary = opt.getAttribute('data-color') || opt.style.background;
        if (!primary) return;
        const lighter = lightenColor(primary, 0.45); // 45% lighter inner
        opt.style.setProperty('--swatch-outer', primary);
        opt.style.setProperty('--swatch-inner', lighter);
    });
}

function applyPresetColor(hexColor, button) {
    const lighterSec = lightenColor(hexColor, 0.45); // 45% lighter for the secondary color
    setPrimaryColor(hexColor);
    setSecondaryColor(lighterSec);

    // UI: mark preset active, deactivate saved customs
    document.querySelectorAll('.color-option').forEach(o => o.classList.remove('active'));
    if (button) button.classList.add('active');
    document.querySelectorAll('.custom-saved-option').forEach(o => o.classList.remove('active'));

    // Refresh the dual-ring CSS vars on all swatches
    initSwatchColors();

    // Sync picker state so the picker shows this colour if opened
    pickerPrimaryColor   = hexColor;
    pickerSecondaryColor = lighterSec;
    syncSpectrumFromColor(hexColor);

    saveHistoryState('Preset Color');
}

// ===== OTHER SETTERS =====
function changeFont(fontFamily) {
    currentState.fontFamily = fontFamily;
    const sheet = document.getElementById('cover-letter-sheet');
    if (sheet) {
        // Serif families render with a serif fallback, all others sans-serif
        const serifFonts = ['Playfair Display', 'Bitter', 'Tinos', 'Volkhov', 'Gelasio'];
        const isSerif    = serifFonts.includes(fontFamily);
        sheet.style.fontFamily = `'${fontFamily}', ${isSerif ? 'serif' : 'sans-serif'}`;
    }
    const sel = document.getElementById('font-style-select');
    if (sel) sel.value = fontFamily;
}

function setFontSize(val) {
    val = Number(val);
    currentState.fontSize = val;
    const sheet = document.getElementById('cover-letter-sheet');
    if (sheet) {
        const map = { 1:'10pt', 2:'11.5pt', 3:'13pt', 4:'14.5pt' };
        sheet.style.fontSize = map[val] || '11.5pt';
    }
    const labels = { 1:'S', 2:'M', 3:'L', 4:'XL' };
    updateSliderVal('font-size', labels[val] || 'M');
    const s = document.getElementById('slider-font-size');
    if (s) s.value = val;
}

function setLineHeight(val) {
    val = parseFloat(val);
    currentState.lineHeight = val;
    const sheet = document.getElementById('cover-letter-sheet');
    if (sheet) sheet.style.lineHeight = val;
    updateSliderVal('line-height', val.toFixed(1));
    const s = document.getElementById('slider-line-height');
    if (s) s.value = Math.round(val * 10);
}

function setBackgroundPattern(patternClass, button) {
    currentState.background = patternClass;
    const sheet = document.getElementById('cover-letter-sheet');
    if (sheet) {
        [...sheet.classList].forEach(cls => { if (cls.startsWith('pat-')) sheet.classList.remove(cls); });
        sheet.classList.add(patternClass);
    }
    document.querySelectorAll('.bg-option').forEach(o => o.classList.remove('active'));
    if (button) button.classList.add('active');
}

// ===== CUSTOM COLOR PICKER =====
function toggleCustomPicker() {
    const box = document.getElementById('custom-picker-box');
    if (!box) return;
    const visible = box.style.display === 'flex';
    box.style.display = visible ? 'none' : 'flex';
    if (!visible) {
        // Show current primary color in picker by default
        pickerMode = 'primary';
        document.querySelectorAll('.picker-tab').forEach(t => t.classList.remove('active'));
        const tab = document.getElementById('tab-primary');
        if (tab) tab.classList.add('active');
        syncSpectrumFromColor(pickerPrimaryColor);
    }
}

// Switch between Primary / Secondary tabs — sync spectrum to that tab's stored colour
function switchPickerTab(mode) {
    pickerMode = mode;
    document.querySelectorAll('.picker-tab').forEach(t => t.classList.remove('active'));
    const tab = document.getElementById(`tab-${mode}`);
    if (tab) tab.classList.add('active');

    // Restore spectrum to whatever colour this tab was last on
    const colorToShow = mode === 'primary' ? pickerPrimaryColor : pickerSecondaryColor;
    syncSpectrumFromColor(colorToShow);
}

// ===== SPECTRUM DRAG =====
function startSpectrumDrag(e) {
    isDraggingSpectrum = true;
    pickSpectrumPoint(e.clientX, e.clientY);
}
function onSpectrumMouseMove(e) {
    if (!isDraggingSpectrum) return;
    pickSpectrumPoint(e.clientX, e.clientY);
}
function startSpectrumTouchDrag(e) {
    isDraggingSpectrum = true;
    if (e.touches[0]) pickSpectrumPoint(e.touches[0].clientX, e.touches[0].clientY);
}
function onSpectrumTouchMove(e) {
    if (!isDraggingSpectrum) return;
    e.preventDefault();
    if (e.touches[0]) pickSpectrumPoint(e.touches[0].clientX, e.touches[0].clientY);
}

function pickSpectrumPoint(clientX, clientY) {
    const area   = document.getElementById('spectrum-area');
    const cursor = document.getElementById('spectrum-cursor');
    if (!area || !cursor) return;
    const rect = area.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (clientX - rect.left)  / rect.width));
    const y = Math.min(1, Math.max(0, (clientY - rect.top)   / rect.height));
    pickerSaturation = x;
    pickerBrightness = 1 - y;
    cursor.style.left = (x * 100) + '%';
    cursor.style.top  = (y * 100) + '%';
    updatePickerPreview();
}

function onHueChange(hueVal) {
    pickerHue = Number(hueVal);
    // requestAnimationFrame prevents lag on rapid slider movement
    requestAnimationFrame(() => {
        updateSpectrumBackground();
        updatePickerPreview();
    });
}

function updateSpectrumBackground() {
    const area = document.getElementById('spectrum-area');
    if (!area) return;
    const hueColor = `hsl(${pickerHue}, 100%, 50%)`;
    area.style.background = `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueColor})`;
}

// ===== COLOUR MATH =====
function hsvToHex(h, s, v) {
    const i = Math.floor(h / 60) % 6;
    const f = h / 60 - Math.floor(h / 60);
    const p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
    let r, g, b;
    switch (i) {
        case 0: r=v; g=t; b=p; break; case 1: r=q; g=v; b=p; break;
        case 2: r=p; g=v; b=t; break; case 3: r=p; g=q; b=v; break;
        case 4: r=t; g=p; b=v; break; case 5: r=v; g=p; b=q; break;
    }
    const hex = x => Math.round(x * 255).toString(16).padStart(2, '0');
    return `#${hex(r)}${hex(g)}${hex(b)}`;
}

function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c+c).join('');
    const n = parseInt(hex, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function hexToHsv(hex) {
    let { r, g, b } = hexToRgb(hex);
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r,g,b), min = Math.min(r,g,b), d = max - min;
    let h = 0;
    if (d > 0) {
        if (max === r)      h = ((g - b) / d) % 6;
        else if (max === g) h = (b - r) / d + 2;
        else                h = (r - g) / d + 4;
        h = Math.round(h * 60);
        if (h < 0) h += 360;
    }
    const s = max === 0 ? 0 : d / max;
    return { h, s, v: max };
}

// Sync spectrum canvas + hue slider to a given hex colour
function syncSpectrumFromColor(hex) {
    if (!hex) return;
    const { h, s, v } = hexToHsv(hex);
    pickerHue        = h;
    pickerSaturation = s;
    pickerBrightness = v;

    const hueSlider = document.getElementById('hue-slider');
    if (hueSlider) hueSlider.value = h;

    // Position spectrum cursor
    const cursor = document.getElementById('spectrum-cursor');
    if (cursor) {
        cursor.style.left = (s * 100) + '%';
        cursor.style.top  = ((1 - v) * 100) + '%';
    }

    updateSpectrumBackground();
    refreshInputFields(hex);
}

// Update RGB / HEX input fields to reflect current hex
function refreshInputFields(hex) {
    const { r, g, b } = hexToRgb(hex);
    const mode = document.getElementById('color-mode-select')?.value || 'rgb';
    const rF = document.getElementById('val-r');
    const gF = document.getElementById('val-g');
    const bF = document.getElementById('val-b');
    if (mode === 'hex') {
        if (rF) { rF.value = hex; rF.style.maxWidth = '120px'; }
        if (gF) gF.style.display = 'none';
        if (bF) bF.style.display = 'none';
    } else {
        if (rF) { rF.value = r; rF.style.maxWidth = '52px'; }
        if (gF) { gF.value = g; gF.style.display = ''; }
        if (bF) { bF.value = b; bF.style.display = ''; }
    }
}

// Called every time the spectrum position or hue changes — live-applies colour to document
function updatePickerPreview() {
    const hex = hsvToHex(pickerHue, pickerSaturation, pickerBrightness);

    // Live-apply to the correct CSS variable based on current tab
    if (pickerMode === 'primary') {
        setPrimaryColor(hex);
    } else {
        setSecondaryColor(hex);
    }

    refreshInputFields(hex);
    updateSpectrumBackground();
}

// Mode dropdown (RGB ↔ HEX)
function onColorModeChange(mode) {
    const hex = hsvToHex(pickerHue, pickerSaturation, pickerBrightness);
    refreshInputFields(hex);
}

// Manual RGB / HEX input
function onRgbInput() {
    const mode = document.getElementById('color-mode-select')?.value || 'rgb';
    let hex;
    if (mode === 'hex') {
        const raw = document.getElementById('val-r')?.value || '';
        if (/^#?[0-9a-fA-F]{6}$/.test(raw)) {
            hex = raw.startsWith('#') ? raw : '#' + raw;
        }
    } else {
        const r = Math.min(255, Math.max(0, parseInt(document.getElementById('val-r')?.value) || 0));
        const g = Math.min(255, Math.max(0, parseInt(document.getElementById('val-g')?.value) || 0));
        const b = Math.min(255, Math.max(0, parseInt(document.getElementById('val-b')?.value) || 0));
        hex = '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('');
    }
    if (!hex) return;
    const { h, s, v } = hexToHsv(hex);
    pickerHue = h; pickerSaturation = s; pickerBrightness = v;
    const hueSlider = document.getElementById('hue-slider');
    if (hueSlider) hueSlider.value = h;
    const cursor = document.getElementById('spectrum-cursor');
    if (cursor) { cursor.style.left = (s*100)+'%'; cursor.style.top = ((1-v)*100)+'%'; }
    updateSpectrumBackground();
    if (pickerMode === 'primary') setPrimaryColor(hex);
    else                          setSecondaryColor(hex);
}

// Save both primary + secondary as a new dual-color swatch in the palette
function saveCustomColor() {
    const primary   = pickerPrimaryColor;
    const secondary = pickerSecondaryColor;

    savedCustomColors.push({ primary, secondary });
    renderSavedColors();
    saveHistoryState('Save Custom Color');

    // Close picker
    const box = document.getElementById('custom-picker-box');
    if (box) box.style.display = 'none';
}

function renderSavedColors() {
    const wrap = document.getElementById('saved-colors-wrap');
    if (!wrap) return;
    if (!savedCustomColors.length) { wrap.style.display = 'none'; return; }
    wrap.style.display = 'flex';
    wrap.innerHTML = '';

    savedCustomColors.forEach((pair, i) => {
        const el = document.createElement('div');
        el.className = 'custom-saved-option';
        el.style.setProperty('--saved-primary',   pair.primary);
        el.style.setProperty('--saved-secondary', pair.secondary);
        el.title = `Primary: ${pair.primary} / Secondary: ${pair.secondary}`;

        el.innerHTML = `
            <i class="fa-solid fa-check checkmark-icon"></i>
            <button class="btn-delete-saved" onclick="deleteSavedColor(${i}, event)">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;

        el.addEventListener('click', () => {
            document.querySelectorAll('.custom-saved-option').forEach(o => o.classList.remove('active'));
            document.querySelectorAll('.color-option').forEach(o => o.classList.remove('active'));
            el.classList.add('active');
            setPrimaryColor(pair.primary);
            setSecondaryColor(pair.secondary);
            // Also sync picker so it shows these colours when opened
            pickerPrimaryColor   = pair.primary;
            pickerSecondaryColor = pair.secondary;
            saveHistoryState('Saved Custom Color');
        });

        wrap.appendChild(el);
    });
}

function deleteSavedColor(index, e) {
    e.stopPropagation();
    savedCustomColors.splice(index, 1);
    renderSavedColors();
}

// ===== PHOTO MANAGEMENT =====
function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        currentState.photoSrc  = ev.target.result;
        currentState.photoShow = true;
        applyPhotoState();
        saveHistoryState('Upload Photo');
    };
    reader.readAsDataURL(file);
}

function togglePhotoShow(checked) {
    currentState.photoShow = checked;
    applyPhotoState();
    saveHistoryState('Toggle Photo');
}

function togglePhotoGray(checked) {
    currentState.photoGray = checked;
    applyPhotoState();
    saveHistoryState('Grayscale Photo');
}

function deletePhoto() {
    currentState.photoShow = false;
    currentState.photoSrc  = '';
    const fi = document.getElementById('photo-upload-input');
    if (fi) fi.value = '';
    const chk = document.getElementById('chk-show-photo');
    if (chk) chk.checked = false;
    // Also uncheck the popup toggle
    const togPhoto = document.getElementById('tog-photo');
    if (togPhoto) togPhoto.checked = false;
    applyPhotoState();
    saveHistoryState('Delete Photo');
}

function applyPhotoState() {
    const wrapper  = document.getElementById('sheet-photo-wrapper');
    const img      = document.getElementById('sheet-photo-img');
    const editCtrl = document.getElementById('photo-edit-controls');
    const emptyMsg = document.getElementById('photo-empty-message');

    if (currentState.photoShow && currentState.photoSrc) {
        if (wrapper && img) {
            img.src = currentState.photoSrc;
            wrapper.classList.add('show');
            img.style.filter = currentState.photoGray ? 'grayscale(100%)' : 'none';
        }
        if (editCtrl) editCtrl.style.display = 'block';
        if (emptyMsg) emptyMsg.style.display = 'none';
        const sc = document.getElementById('chk-show-photo');
        if (sc) sc.checked = true;
        const gc = document.getElementById('chk-photo-gray');
        if (gc) gc.checked = currentState.photoGray;
    } else {
        if (wrapper) wrapper.classList.remove('show');
        if (editCtrl) editCtrl.style.display = 'none';
        if (emptyMsg) emptyMsg.style.display = 'block';
    }
}

// ===== TEMPLATES =====
function selectTemplate(templateId, element) {
    document.querySelectorAll('.templates-list .template-card').forEach(c => c.classList.remove('active'));
    if (element) element.classList.add('active');

    currentState.layout = templateId;
    const sheet = document.getElementById('cover-letter-sheet');
    sheet.classList.remove('layout-traditional', 'layout-creative', 'layout-minimal');

    if (templateId === 'traditional') {
        sheet.classList.add('layout-traditional');
        changeFont('Playfair Display');
        setPrimaryColor('#1b2a47'); setSecondaryColor('#1b2a47');
        setMargins(4); setSpacing(3);
    } else if (templateId === 'creative') {
        sheet.classList.add('layout-creative');
        changeFont('Montserrat');
        setPrimaryColor('#e91e63'); setSecondaryColor('#e91e63');
        setMargins(5); setSpacing(4);
    } else if (templateId === 'minimalist') {
        sheet.classList.add('layout-minimal');
        changeFont('Inter');
        setPrimaryColor('#111111'); setSecondaryColor('#444444');
        setMargins(6); setSpacing(2);
    } else { // modern default
        changeFont('Satoshi');
        setPrimaryColor('#EEC30C'); setSecondaryColor('#EEC30C');
        setMargins(5); setSpacing(3);
    }

    syncTemplateContent(templateId);
    saveHistoryState(`Apply ${templateId} Template`);
}

function syncTemplateContent(layout) {
    const greeting = document.getElementById('sheet-greeting');
    const p1 = document.getElementById('sheet-para-1');
    const p2 = document.getElementById('sheet-para-2');
    const p3 = document.getElementById('sheet-para-3');

    if (layout === 'traditional') {
        if (greeting) greeting.innerText = 'Dear Hiring Committee,';
        if (p1) p1.innerText = 'Please accept this letter and the accompanying resume as my formal application for the open position at your prestigious institution. With over eight years of experience leading cross-functional corporate teams, I have dedicated my career to driving process efficiency and maximizing operational results.';
        if (p2) p2.innerText = 'During my tenure at my previous firm, I successfully spearheaded an organizational restructuring program that lowered overhead expenditures by 18% while enhancing project delivery accuracy. I specialize in managing complex initiatives, aligning diverse organizational goals, and instituting rigorous metrics to monitor and guarantee project success.';
        if (p3) p3.innerText = 'Thank you for your time and evaluation. I would welcome the opportunity to discuss how my strategic management background can bolster your organizational objectives in a personal interview.';
    } else if (layout === 'creative') {
        if (greeting) greeting.innerText = 'Hi there,';
        if (p1) p1.innerText = "I was thrilled to see the opening for the creative role at your agency. I've been following your brand campaign milestones for the past two years, and I'm deeply inspired by your team's commitment to pushing design boundaries.";
        if (p2) p2.innerText = 'In my last role, I drove user interface redesigns that boosted engagement metrics by 35% within the first quarter. I thrive at the intersection of creative storytelling and frontend technology.';
        if (p3) p3.innerText = "I'd love to chat about how my hybrid design-engineering background can inject fresh energy into your upcoming product pipeline. Thank you for considering my application!";
    } else {
        if (greeting) greeting.innerText = 'Dear Hiring Manager,';
        if (p1) p1.innerText = 'This is your opportunity to introduce yourself to the organization! Share your passion for the position you are applying for to motivate the reader to interview you. Build a strong connection right from the start.';
        if (p2) p2.innerText = 'Highlight your key achievements and relevant projects. Focus on quantifiable results and how your skillset directly solves the challenges the company is currently facing.';
        if (p3) p3.innerText = 'Close with a warm call to action, thanking the reader for their time and expressing excitement for a potential interview.';
    }
}

function setDocumentSize(size, button) {
    currentState.size = size;
    document.querySelectorAll('.size-switcher .size-btn').forEach(b => b.classList.remove('active'));
    if (button) button.classList.add('active');
    const sheet = document.getElementById('cover-letter-sheet');
    if (sheet) sheet.style.minHeight = size === 'letter' ? '1056px' : '1154px';
    saveHistoryState('Switch Page Size');
}

// ===== DOWNLOAD =====
function toggleDownloadDropdown() {
    const dd = document.getElementById('download-dropdown');
    if (!dd) return;
    dd.style.display = dd.style.display === 'block' ? 'none' : 'block';
}

function downloadPDF() {
    const dd = document.getElementById('download-dropdown');
    if (dd) dd.style.display = 'none';
    document.querySelectorAll('.editable-field').forEach(f => f.style.border = 'none');
    window.print();
    setTimeout(() => document.querySelectorAll('.editable-field').forEach(f => f.style.border = ''), 1500);
}

function downloadDOC() {
    const dd = document.getElementById('download-dropdown');
    if (dd) dd.style.display = 'none';

    const g = id => document.getElementById(id)?.innerText || '';
    const fullName   = g('sheet-fullname');
    const role       = g('sheet-role');
    const phone      = g('sheet-phone');
    const email      = g('sheet-email');
    const linkedin   = g('sheet-linkedin');
    const location   = g('sheet-location');
    const date       = g('sheet-date');
    const recTitle   = g('sheet-rec-title');
    const recCompany = g('sheet-rec-company');
    const recAddress = g('sheet-rec-address');
    const greeting   = g('sheet-greeting');
    const p1         = g('sheet-para-1');
    const p2         = g('sheet-para-2');
    const p3         = g('sheet-para-3');
    const salutation = g('sheet-salutation');
    const sigName    = g('sheet-signature-name');

    const html = `<html xmlns:o='urn:schemas-microsoft-com:office:office'
        xmlns:w='urn:schemas-microsoft-com:office:word'
        xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset="utf-8"><title>Cover Letter</title>
<style>
  body { font-family:Arial,sans-serif; font-size:11pt; color:#333; margin:40pt; }
  h1   { font-size:22pt; color:${currentState.color}; margin:0 0 4pt; }
  h2   { font-size:12pt; color:${currentState.secondaryColor || currentState.color}; margin:0 0 8pt; text-transform:uppercase; letter-spacing:1px; }
  .contact { font-size:10pt; color:#555; margin-bottom:2pt; }
  hr   { border:none; border-top:2px solid ${currentState.color}; margin:12pt 0; }
  p    { margin:0 0 10pt; line-height:1.5; text-align:justify; }
  .signoff { margin-top:20pt; }
</style></head>
<body>
<h1>${fullName}</h1><h2>${role}</h2>
<div class="contact">${phone} &nbsp;|&nbsp; ${email} &nbsp;|&nbsp; ${linkedin} &nbsp;|&nbsp; ${location}</div>
<hr>
<p>${date}</p>
<p><strong>${recTitle}</strong><br>${recCompany}<br>${recAddress}</p>
<p>${greeting}</p><p>${p1}</p><p>${p2}</p><p>${p3}</p>
<div class="signoff"><p>${salutation}<br><strong>${sigName}</strong></p></div>
</body></html>`;

    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = `${fullName.replace(/\s+/g,'_') || 'Cover_Letter'}.doc`;
    a.click();
    URL.revokeObjectURL(url);
}

// ===== EYE BUTTON — FULL PREVIEW MODAL =====
function openPreviewModal() {
    const modal   = document.getElementById('preview-modal');
    const content = document.getElementById('preview-modal-content');
    const sheet   = document.getElementById('cover-letter-sheet');
    if (!modal || !content || !sheet) return;

    // Deep-clone the live cover letter sheet
    const clone = sheet.cloneNode(true);

    // Remove edit styles from the clone
    clone.querySelectorAll('[contenteditable]').forEach(el => {
        el.removeAttribute('contenteditable');
        el.style.border     = 'none';
        el.style.outline    = 'none';
        el.style.background = 'transparent';
    });
    clone.style.pointerEvents = 'none';
    clone.style.boxShadow     = '0 20px 60px rgba(0,0,0,0.7)';

    // Copy the live CSS custom properties (colours) onto the clone
    const liveStyles = window.getComputedStyle(sheet);
    const accentColor    = sheet.style.getPropertyValue('--accent-color')           || currentState.color;
    const secondaryColor = sheet.style.getPropertyValue('--secondary-accent-color') || currentState.secondaryColor || currentState.color;
    clone.style.setProperty('--accent-color', accentColor);
    clone.style.setProperty('--secondary-accent-color', secondaryColor);

    content.innerHTML = '';
    content.appendChild(clone);

    // Use setTimeout so the button's own click event doesn't immediately re-close the modal
    setTimeout(() => { modal.classList.add('active'); }, 15);
}

function closePreviewModal() {
    const modal = document.getElementById('preview-modal');
    if (modal) modal.classList.remove('active');
}

// ===== HISTORY ENGINE =====
function saveHistoryState(actionName) {
    const fieldHTMLs = {};
    document.querySelectorAll('.editable-field').forEach(f => { fieldHTMLs[f.id] = f.innerHTML; });

    const state = {
        action: actionName,
        time: new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit', second:'2-digit' }),
        designState: { ...currentState },
        fieldHTMLs
    };

    if (historyIndex < historyStack.length - 1) historyStack = historyStack.slice(0, historyIndex + 1);
    historyStack.push(state);
    if (historyStack.length > maxHistory) historyStack.shift();
    historyIndex = historyStack.length - 1;
    updateHistoryButtons();
}

function updateHistoryButtons() {
    const undo = document.getElementById('btn-undo');
    const redo = document.getElementById('btn-redo');
    if (undo) undo.disabled = historyIndex <= 0;
    if (redo) redo.disabled = historyIndex >= historyStack.length - 1;
}

function undo() {
    if (historyIndex > 0) { historyIndex--; restoreHistoryState(historyStack[historyIndex]); updateHistoryButtons(); }
}

function redo() {
    if (historyIndex < historyStack.length - 1) { historyIndex++; restoreHistoryState(historyStack[historyIndex]); updateHistoryButtons(); }
}

function restoreHistoryState(state) {
    if (!state) return;
    currentState = { ...state.designState };
    applyState();
    Object.keys(state.fieldHTMLs).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = state.fieldHTMLs[id];
    });
}

function applyState() {
    setMargins(currentState.margins);
    setSpacing(currentState.spacing);
    setPrimaryColor(currentState.color);
    setSecondaryColor(currentState.secondaryColor || currentState.color);
    changeFont(currentState.fontFamily);
    setFontSize(currentState.fontSize);
    setLineHeight(currentState.lineHeight);
    setBackgroundPattern(currentState.background);
    applyPhotoState();
    if (currentState.photoStyle) {
        setPhotoStyle(currentState.photoStyle);
    } else {
        setPhotoStyle('round'); // default
    }

    // Sync active template card
    const tpl = document.getElementById(`tpl-${currentState.layout}`);
    if (tpl) {
        document.querySelectorAll('.templates-list .template-card').forEach(c => c.classList.remove('active'));
        tpl.classList.add('active');
    }

    // Sync active preset color circle
    document.querySelectorAll('.color-option').forEach(o => {
        o.classList.toggle('active', o.getAttribute('data-color') === currentState.color);
    });

    // Set distinct dual-ring colors on every swatch
    initSwatchColors();
}

function toggleHistoryModal(open) {
    const modal = document.getElementById('history-modal');
    if (!modal) return;
    if (open) { modal.classList.add('active'); renderHistoryList(); }
    else       { modal.classList.remove('active'); }
}

function renderHistoryList() {
    const container = document.getElementById('history-items-container');
    if (!container) return;
    container.innerHTML = '';
    for (let i = historyStack.length - 1; i >= 0; i--) {
        const item = historyStack[i];
        const isCurrent = i === historyIndex;
        const div = document.createElement('div');
        div.className = `history-item${isCurrent ? ' active' : ''}`;
        if (isCurrent) div.style.borderColor = 'var(--primary-color)';
        div.innerHTML = `<span style="font-weight:700;color:#fff;">${item.action}</span><span class="history-time">${item.time}</span>`;
        div.onclick = () => { historyIndex = i; restoreHistoryState(historyStack[i]); updateHistoryButtons(); toggleHistoryModal(false); };
        container.appendChild(div);
    }
}

function resetDesign() {
    if (confirm('Reset all design settings to default? Your text content will stay intact.')) {
        currentState = { ...defaultState };
        applyState();
        saveHistoryState('Reset Design');
    }
}

// ===== HEADER OPTIONS PANEL =====
function setupHeaderOptionsPanel() {
    const wrapper = document.getElementById('sheet-header-wrapper');
    const popup   = document.getElementById('header-options-popup');
    if (!wrapper || !popup) return;

    // Click on header wrapper → open popup + outline
    wrapper.addEventListener('click', function(e) {
        // If click came from inside the popup itself, do nothing
        if (popup.contains(e.target)) return;
        // If click came from an editable field, don't toggle – let them type
        if (e.target.closest('[contenteditable="true"]')) return;

        e.stopPropagation();
        openHeaderOptionsPanel();
    });

    // Clicking an editable field focuses it; we still want the outline to show
    wrapper.querySelectorAll('[contenteditable]').forEach(el => {
        el.addEventListener('focus', () => { openHeaderOptionsPanel(); });
    });
}

function openHeaderOptionsPanel() {
    const wrapper = document.getElementById('sheet-header-wrapper');
    if (!wrapper) return;
    wrapper.classList.add('hdr-active');
    headerOptionsOpen = true;
}

function toggleHeaderPopupFromTab(event) {
    if (event) event.stopPropagation();
    const popup = document.getElementById('header-options-popup');
    if (popup) popup.classList.toggle('visible');
}

function closeHeaderOptionsPanel() {
    const wrapper = document.getElementById('sheet-header-wrapper');
    const popup   = document.getElementById('header-options-popup');
    if (wrapper) wrapper.classList.remove('hdr-active');
    if (popup)   popup.classList.remove('visible');
    headerOptionsOpen = false;
}

// Global click handler — close panel when clicking outside
document.addEventListener('click', function(e) {
    if (!headerOptionsOpen) return;
    const wrapper = document.getElementById('sheet-header-wrapper');
    const popup   = document.getElementById('header-options-popup');
    const photoModal = document.getElementById('photo-upload-modal');
    // Don't close if clicking inside the wrapper, popup, or photo modal
    if (wrapper && wrapper.contains(e.target)) return;
    if (popup   && popup.contains(e.target))   return;
    if (photoModal && photoModal.contains(e.target)) return;
    closeHeaderOptionsPanel();
}, true);

// ===== TOGGLE HEADER FIELDS =====
function toggleHeaderField(field, visible) {
    switch (field) {
        case 'title': {
            const el = document.getElementById('sheet-role');
            if (el) el.closest('.sheet-header-left') && (el.style.display = visible ? '' : 'none');
            break;
        }
        case 'phone': {
            const row = document.getElementById('contact-phone-row');
            if (row) row.style.display = visible ? '' : 'none';
            break;
        }
        case 'link': {
            const row = document.getElementById('contact-link-row');
            if (row) row.style.display = visible ? '' : 'none';
            break;
        }
        case 'extralink': {
            const row = document.getElementById('contact-extralink-row');
            if (row) row.style.display = visible ? '' : 'none';
            break;
        }
        case 'email': {
            const row = document.getElementById('contact-email-row');
            if (row) row.style.display = visible ? '' : 'none';
            break;
        }
        case 'location': {
            const row = document.getElementById('contact-location-row');
            if (row) row.style.display = visible ? '' : 'none';
            break;
        }
        case 'uppercase': {
            const el = document.getElementById('sheet-fullname');
            if (el) el.style.textTransform = visible ? 'uppercase' : '';
            break;
        }
        case 'photo': {
            const tog = document.getElementById('tog-photo');
            if (tog) tog.checked = visible;
            if (visible) {
                // If no photo yet, open upload modal
                if (!currentState.photoSrc) {
                    triggerPhotoUploadPopup(null);
                } else {
                    currentState.photoShow = true;
                    applyPhotoState();
                }
            } else {
                currentState.photoShow = false;
                applyPhotoState();
            }
            break;
        }
        case 'extrafield': {
            const row = document.getElementById('contact-extrafield-row');
            if (row) row.style.display = visible ? '' : 'none';
            break;
        }
        case 'dob': {
            const row = document.getElementById('contact-dob-row');
            if (row) row.style.display = visible ? '' : 'none';
            break;
        }
        case 'nationality': {
            const row = document.getElementById('contact-nationality-row');
            if (row) row.style.display = visible ? '' : 'none';
            break;
        }
    }
    saveHistoryState('Toggle ' + field);
}

// ===== PHOTO STYLE DOTS (Images 3 & 4) =====
function setPhotoStyle(style) {
    currentState.photoStyle = style;
    
    // Update dots UI
    const dotRound = document.getElementById('dot-photostyle-round');
    const dotSquare = document.getElementById('dot-photostyle-square');
    if (dotRound) dotRound.classList.toggle('active', style === 'round');
    if (dotSquare) dotSquare.classList.toggle('active', style === 'square');
    
    // Update preview icon in popup
    const previewIcon = document.getElementById('photo-style-preview-icon');
    if (previewIcon) {
        previewIcon.style.borderRadius = style === 'round' ? '50%' : '4px';
    }
    
    // Update actual photo wrapper in sheet
    const wrapper = document.getElementById('sheet-photo-wrapper');
    if (wrapper) {
        wrapper.style.borderRadius = style === 'round' ? '50%' : '8px';
    }
    
    saveHistoryState('Photo Style');
}

// ===== PHOTO UPLOAD MODAL (image 4) =====
let _pendingPhotoSrc = null;

function triggerPhotoUploadPopup(e) {
    if (e) e.stopPropagation();
    const modal = document.getElementById('photo-upload-modal');
    if (modal) modal.classList.add('active');

    // Reset preview to placeholder
    const preview = document.getElementById('photo-modal-preview');
    if (preview) {
        preview.innerHTML = '<i class="fa-solid fa-user photo-modal-placeholder-icon"></i>';
    }
    _pendingPhotoSrc = null;

    // Wire up file input inside modal
    const fi = document.getElementById('photo-upload-input');
    if (fi) {
        fi.onchange = function(ev) {
            const file = ev.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(loadEv) {
                _pendingPhotoSrc = loadEv.target.result;
                // Show preview
                const prev = document.getElementById('photo-modal-preview');
                if (prev) {
                    prev.innerHTML = `<img src="${_pendingPhotoSrc}" alt="Preview">`;
                }
            };
            reader.readAsDataURL(file);
        };
    }
}

function closePhotoUploadModal() {
    const modal = document.getElementById('photo-upload-modal');
    if (modal) modal.classList.remove('active');
    _pendingPhotoSrc = null;
}

function savePhotoUploadModal() {
    const modal = document.getElementById('photo-upload-modal');
    if (_pendingPhotoSrc) {
        currentState.photoSrc  = _pendingPhotoSrc;
        currentState.photoShow = true;
        // Sync the toggle
        const tog = document.getElementById('tog-photo');
        if (tog) tog.checked = true;
        applyPhotoState();
        saveHistoryState('Upload Photo');
    }
    if (modal) modal.classList.remove('active');
    _pendingPhotoSrc = null;
}

// ===== COLOR SWATCH DUAL-COLOR INDICATOR =====
// Updates all preset color circles so the currently-active one shows
// primary (outer ring = circle background) and secondary (inner dot) colors.

// ===== TEXT EDIT POPUP (Images 3, 4, 5) =====
let textEditOpen = false;

function toggleTextEditPopupFromTab(event) {
    if (event) event.stopPropagation();
    const popup = document.getElementById('text-edit-popup');
    const settingsPopup = document.getElementById('header-options-popup');
    if (!popup) return;
    const isVisible = popup.classList.contains('visible');
    // Close settings if open
    if (settingsPopup) settingsPopup.classList.remove('visible');
    if (isVisible) {
        popup.classList.remove('visible');
        textEditOpen = false;
    } else {
        popup.classList.add('visible');
        textEditOpen = true;
    }
}

// Extend global click handler to close text edit popup
document.addEventListener('click', function(e) {
    if (!textEditOpen) return;
    const popup = document.getElementById('text-edit-popup');
    const wrapper = document.getElementById('sheet-header-wrapper');
    if (popup && popup.contains(e.target)) return;
    if (wrapper && wrapper.contains(e.target)) return;
    if (popup) popup.classList.remove('visible');
    textEditOpen = false;
}, true);

// ===== TEXT ALIGNMENT =====
function setTextAlignment(align, btn) {
    const header = document.getElementById('sheet-header');
    if (header) {
        header.style.textAlign = align;
        // Also align left/right content
        const left = header.querySelector('.sheet-header-left');
        if (left) left.style.textAlign = align;
    }
    // Update active button in group
    if (btn) {
        btn.closest('.text-edit-btn-group').querySelectorAll('.text-edit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
}

// ===== DETAILS ARRANGEMENT LAYOUT =====
function setDetailsLayout(layout, btn) {
    const right = document.querySelector('.sheet-header-right');
    if (!right) return;
    if (layout === 'columns') {
        right.style.display = 'grid';
        right.style.gridTemplateColumns = '1fr 1fr';
        right.style.gap = '4px 12px';
    } else {
        right.style.display = '';
        right.style.gridTemplateColumns = '';
        right.style.gap = '';
    }
    if (btn) {
        btn.closest('.text-edit-btn-group').querySelectorAll('.text-edit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
}

// ===== DETAILS SEPARATOR STYLE =====
function setDetailsSeparator(style, btn) {
    const items = document.querySelectorAll('.sheet-contact-item i');
    items.forEach(icon => {
        icon.style.display = style === 'icon' ? '' : 'none';
    });
    // Handle bullet/bar prefix
    const spans = document.querySelectorAll('.sheet-contact-item');
    spans.forEach(item => {
        item.setAttribute('data-separator', style);
        // Remove old prefix spans
        item.querySelectorAll('.sep-prefix').forEach(s => s.remove());
        if (style === 'bullet') {
            const s = document.createElement('span');
            s.className = 'sep-prefix';
            s.textContent = '•';
            s.style.cssText = 'margin-right:4px; color: inherit;';
            item.prepend(s);
        } else if (style === 'bar') {
            const s = document.createElement('span');
            s.className = 'sep-prefix';
            s.textContent = '|';
            s.style.cssText = 'margin-right:4px; color: inherit;';
            item.prepend(s);
        }
    });
    if (btn) {
        btn.closest('.text-edit-btn-group').querySelectorAll('.text-edit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
}

// ===== ICON STYLE =====
function setIconStyle(styleNum, btn) {
    const items = document.querySelectorAll('.sheet-contact-item');
    items.forEach(item => {
        // Remove all previous icon-style classes
        item.className = item.className.replace(/\bicon-style-\d+\b/g, '').trim();
        // Add new class
        item.classList.add(`icon-style-${styleNum}`);
    });
    
    if (btn) {
        btn.closest('.text-edit-icon-styles').querySelectorAll('.icon-style-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
}

// ===== NAME SIZE =====
const nameSizeMap = { XS: '1.2em', S: '1.6em', M: '1.9em', L: '2.2em', XL: '2.7em' };
function setNameSize(size, btn) {
    const el = document.getElementById('sheet-fullname');
    if (el) el.style.fontSize = nameSizeMap[size] || '2.2em';
    if (btn) {
        btn.closest('.text-edit-size-group').querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
}

// ===== NAME BOLD =====
function toggleNameBold(isBold) {
    const el = document.getElementById('sheet-fullname');
    if (el) el.style.fontWeight = isBold ? '800' : '400';
}

// ===== NAME FONT =====
function setNameFont(type, btn) {
    const el = document.getElementById('sheet-fullname');
    if (!el) return;
    if (type === 'creative') {
        el.style.fontFamily = "'Playfair Display', serif";
        el.style.letterSpacing = '0.04em';
    } else {
        el.style.fontFamily = '';
        el.style.letterSpacing = '';
    }
    if (btn) {
        btn.closest('.text-edit-btn-group').querySelectorAll('.text-edit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
}

// ===== PROFESSIONAL TITLE SIZE =====
const titleSizeMap = { S: '0.85em', M: '1.15em', L: '1.4em' };
function setTitleSize(size, btn) {
    const el = document.getElementById('sheet-role');
    if (el) el.style.fontSize = titleSizeMap[size] || '1.15em';
    if (btn) {
        btn.closest('.text-edit-size-group').querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
}

// ===== PROFESSIONAL TITLE POSITION =====
function setTitlePosition(pos, btn) {
    const left = document.querySelector('.sheet-header-left');
    const name = document.getElementById('sheet-fullname');
    const role = document.getElementById('sheet-role');
    if (!left || !name || !role) return;
    if (pos === 'sameline') {
        left.style.flexDirection = 'row';
        left.style.alignItems = 'baseline';
        left.style.gap = '12px';
    } else {
        left.style.flexDirection = '';
        left.style.alignItems = '';
        left.style.gap = '';
    }
    if (btn) {
        btn.closest('.text-edit-btn-group').querySelectorAll('.text-edit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
}

// ===== PROFESSIONAL TITLE STYLE =====
function setTitleStyle(style, btn) {
    const el = document.getElementById('sheet-role');
    if (el) el.style.fontStyle = style === 'italic' ? 'italic' : '';
    if (btn) {
        btn.closest('.text-edit-btn-group').querySelectorAll('.text-edit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
}

// ====================================================
// BLOCK EDITING SYSTEM
// ====================================================

let selectedBlock = null;
let blockCounter = 8; // starting after existing ones

// Initialize block events
function initBlockSystem() {
    document.querySelectorAll('.content-block').forEach(block => {
        block.addEventListener('click', function(e) {
            e.stopPropagation();
            selectBlock(this);
        });
    });

    // Close panel if clicking outside sheet-blocks-container and edit-entry-panel
    document.addEventListener('click', function(e) {
        const panel = document.getElementById('edit-entry-panel');
        const isBlockClick = e.target.closest('.content-block');
        const isPanelClick = e.target.closest('.edit-entry-panel');
        const isAddBtnClick = e.target.closest('.add-block-btn');
        
        if (!isBlockClick && !isPanelClick && !isAddBtnClick) {
            deselectAllBlocks();
            panel.classList.remove('edit-panel-open');
        }
    });
}

function deselectAllBlocks() {
    document.querySelectorAll('.content-block').forEach(b => b.classList.remove('block-selected'));
    selectedBlock = null;
}

function selectBlock(block) {
    deselectAllBlocks();
    block.classList.add('block-selected');
    selectedBlock = block;
    
    // Open panel
    const panel = document.getElementById('edit-entry-panel');
    panel.classList.add('edit-panel-open');

    // Populate panel fields based on block data
    const type = block.getAttribute('data-type') || 'entry';
    
    if (type === 'entry') {
        document.getElementById('ep-employer').value = block.getAttribute('data-title') || '';
        document.getElementById('ep-jobtitle').value = block.getAttribute('data-subtitle') || '';
        document.getElementById('ep-location').value = block.getAttribute('data-location') || '';
        document.getElementById('ep-description').innerHTML = block.getAttribute('data-desc') || '';
        // Date parsing is basic for now
        document.getElementById('ep-startdate').value = ''; 
        document.getElementById('ep-enddate').value = '';
    } else {
        // text block
        document.getElementById('ep-employer').value = block.getAttribute('data-title') || '';
        document.getElementById('ep-jobtitle').value = '';
        document.getElementById('ep-location').value = '';
        document.getElementById('ep-description').innerHTML = block.getAttribute('data-desc') || '';
        document.getElementById('ep-startdate').value = '';
        document.getElementById('ep-enddate').value = '';
    }
}

function updateCurrentBlock() {
    if (!selectedBlock) return;
    
    const type = selectedBlock.getAttribute('data-type') || 'entry';
    
    const employer = document.getElementById('ep-employer').value;
    const jobTitle = document.getElementById('ep-jobtitle').value;
    const location = document.getElementById('ep-location').value;
    const desc = document.getElementById('ep-description').innerHTML;
    
    let html = '';
    
    if (type === 'entry') {
        selectedBlock.setAttribute('data-title', employer);
        selectedBlock.setAttribute('data-subtitle', jobTitle);
        selectedBlock.setAttribute('data-location', location);
        selectedBlock.setAttribute('data-desc', desc);
        
        if (employer) html += `<div class="block-title-display">${employer}</div>`;
        if (jobTitle) html += `<div class="block-subtitle-display">${jobTitle}</div>`;
        if (location) html += `<div class="block-meta-display"><span>${location}</span></div>`;
        if (desc) html += `<div class="block-desc-display">${desc}</div>`;
        
    } else {
        selectedBlock.setAttribute('data-title', employer);
        selectedBlock.setAttribute('data-desc', desc);
        
        if (employer) html += `<div class="block-title-display">${employer}</div>`;
        if (desc) html += `<div class="block-desc-display">${desc}</div>`;
    }
    
    if (!html) {
        html = `<div class="block-placeholder-text">Empty block...</div>`;
    }
    
    selectedBlock.querySelector('.block-display').innerHTML = html;
}

function addNewBlock() {
    blockCounter++;
    const container = document.getElementById('sheet-blocks-container');
    
    const block = document.createElement('div');
    block.className = 'content-block';
    block.setAttribute('data-block-id', 'b' + blockCounter);
    block.setAttribute('data-type', 'entry');
    block.setAttribute('data-title', 'New Entry');
    block.setAttribute('data-subtitle', '');
    block.setAttribute('data-location', '');
    block.setAttribute('data-desc', '');
    
    block.innerHTML = `
        <div class="block-display"><div class="block-title-display">New Entry</div></div>
        <div class="block-nav-buttons">
            <button class="block-nav-btn" title="Move Up" onclick="moveBlockUp(this.closest('.content-block'));event.stopPropagation();"><i class="fa-solid fa-chevron-up"></i></button>
            <button class="block-nav-btn" title="Move Down" onclick="moveBlockDown(this.closest('.content-block'));event.stopPropagation();"><i class="fa-solid fa-chevron-down"></i></button>
        </div>
    `;
    
    block.addEventListener('click', function(e) {
        e.stopPropagation();
        selectBlock(this);
    });
    
    container.appendChild(block);
    selectBlock(block);
    
    // Scroll block into view
    block.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function moveBlockUp(block) {
    if (block.previousElementSibling) {
        block.parentNode.insertBefore(block, block.previousElementSibling);
        block.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function moveBlockDown(block) {
    if (block.nextElementSibling) {
        block.parentNode.insertBefore(block.nextElementSibling, block);
        block.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function deleteCurrentBlock() {
    if (!selectedBlock) return;
    if (confirm("Are you sure you want to delete this block?")) {
        selectedBlock.remove();
        deselectAllBlocks();
        document.getElementById('edit-entry-panel').classList.remove('edit-panel-open');
    }
}

function clearInput(id) {
    document.getElementById(id).value = '';
    updateCurrentBlock();
}

function getTips() {
    alert("Pro Tip: Use bullet points to make your description easy to read!");
}

function previewBlock() {
    // Just toggles panel off to see clearly
    document.getElementById('edit-entry-panel').classList.remove('edit-panel-open');
    deselectAllBlocks();
}

// Call initBlockSystem on load
document.addEventListener('DOMContentLoaded', () => {
    initBlockSystem();
});
