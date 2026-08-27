import { useState } from 'react';
import { FONT_MAP, PRESET_COLORS } from '../../config/resumeDesign';
import '../resume/CustomizePanel.css';
import '../../pages/CoverLetterBuilder.css';

const Accordion = ({ id, title, openId, setOpenId, children }) => {
    const open = openId === id;
    return (
        <div className="cz-group">
            <div className="cz-trigger" onClick={() => setOpenId(open ? null : id)}>
                <h4>{title}</h4>
                <i className={`fa-solid fa-chevron-${open ? 'up' : 'down'}`}></i>
            </div>
            {open && <div className="cz-content">{children}</div>}
        </div>
    );
};

const Opt = ({ active, onClick, children }) => (
    <button type="button" className={`cz-opt ${active ? 'active' : ''}`} onClick={onClick}>{children}</button>
);

const Slider = ({ label, value, min, max, step = 1, unit = '', onChange }) => (
    <div className="cz-slider">
        <div className="cz-slider-head">
            <span>{label}</span>
            <strong>{value}{unit}</strong>
        </div>
        <div className="cz-slider-row">
            <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
            <button type="button" className="cz-step" onClick={() => onChange(Math.max(min, +(value - step).toFixed(2)))}>-</button>
            <button type="button" className="cz-step" onClick={() => onChange(Math.min(max, +(value + step).toFixed(2)))}>+</button>
        </div>
    </div>
);

export default function CoverLetterCustomizePanel({ design = {}, updateDesign, onSaveAsTemplate }) {
    const [openId, setOpenId] = useState('layout');
    const fonts = [...FONT_MAP.sans.slice(0, 6), 'Lora', 'Merriweather'];

    return (
        <div className="cz-panel cl-customize">
            <div className="cz-scroll">
                <Accordion id="layout" title="Page" openId={openId} setOpenId={setOpenId}>
                    <div>
                        <p className="cz-label">Size</p>
                        <div className="cz-row">
                            <Opt active={(design.pageSize || 'a4') === 'a4'} onClick={() => updateDesign('pageSize', 'a4')}>A4</Opt>
                            <Opt active={design.pageSize === 'letter'} onClick={() => updateDesign('pageSize', 'letter')}>US Letter</Opt>
                        </div>
                    </div>
                    <div>
                        <p className="cz-label">Header</p>
                        <div className="cz-row">
                            <Opt active={(design.headerAlign || 'left') === 'left'} onClick={() => updateDesign('headerAlign', 'left')}>Left</Opt>
                            <Opt active={design.headerAlign === 'center'} onClick={() => updateDesign('headerAlign', 'center')}>Center</Opt>
                        </div>
                    </div>
                    <Slider label="Side margin" value={design.sideMargin || 22} min={14} max={30} unit="mm" onChange={(v) => updateDesign('sideMargin', v)} />
                    <Slider label="Top margin" value={design.topMargin || 24} min={14} max={36} unit="mm" onChange={(v) => updateDesign('topMargin', v)} />
                    <Slider label="Bottom margin" value={design.bottomMargin || 24} min={14} max={36} unit="mm" onChange={(v) => updateDesign('bottomMargin', v)} />
                </Accordion>

                <Accordion id="type" title="Typography" openId={openId} setOpenId={setOpenId}>
                    <div>
                        <p className="cz-label">Font</p>
                        <div className="cl-font-grid">
                            {fonts.map((font) => (
                                <Opt key={font} active={(design.fontFamily || 'Inter') === font} onClick={() => updateDesign('fontFamily', font)}>
                                    {font}
                                </Opt>
                            ))}
                        </div>
                    </div>
                    <Slider label="Body size" value={design.fontSize || 12} min={10} max={14} unit="pt" onChange={(v) => updateDesign('fontSize', v)} />
                    <Slider label="Name size" value={design.nameSize || 26} min={18} max={34} unit="pt" onChange={(v) => updateDesign('nameSize', v)} />
                    <Slider label="Line height" value={design.lineHeight || 1.72} min={1.4} max={2} step={0.02} onChange={(v) => updateDesign('lineHeight', v)} />
                </Accordion>

                <Accordion id="color" title="Color" openId={openId} setOpenId={setOpenId}>
                    <div>
                        <p className="cz-label">Accent</p>
                        <div className="cl-swatch-grid">
                            {PRESET_COLORS.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    className={`cz-swatch ${(design.accentColor || '#1A3A5C') === c ? 'active' : ''}`}
                                    style={{ background: c }}
                                    onClick={() => updateDesign('accentColor', c)}
                                    aria-label={c}
                                />
                            ))}
                        </div>
                    </div>
                    <label className="cz-check">
                        <input
                            type="checkbox"
                            checked={design.applyAccentToName !== false}
                            onChange={(e) => updateDesign('applyAccentToName', e.target.checked)}
                        />
                        Accent on name
                    </label>
                    <label className="cz-check">
                        <input
                            type="checkbox"
                            checked={design.applyAccentToHeading !== false}
                            onChange={(e) => updateDesign('applyAccentToHeading', e.target.checked)}
                        />
                        Accent on header line
                    </label>
                </Accordion>
            </div>
            <div className="cz-footer">
                <button type="button" className="cz-save-template" onClick={onSaveAsTemplate}>
                    <i className="fa-solid fa-palette"></i>
                    Save as template
                </button>
            </div>
        </div>
    );
}
