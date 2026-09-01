import { useState } from 'react';
import { FONT_MAP, PRESET_COLORS, HEADING_STYLES, mergeDesign } from '../../config/resumeDesign';
import { isTwoColumnTemplate, getTemplateById, isOnePageTemplate } from '../../config/templates';
import { columnsWithActiveSections, orderedActiveSectionIds } from '../../config/columnLayout';
import { getPageSectionLists } from '../../config/pageLayout';
import './CustomizePanel.css';

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

const Opt = ({ active, onClick, children, style }) => (
    <button type="button" className={`cz-opt ${active ? 'active' : ''}`} onClick={onClick} style={style}>{children}</button>
);

const Slider = ({ label, value, min, max, step = 1, unit = '', onChange, focusKey, onPreviewFocus }) => (
    <div
        onMouseEnter={() => onPreviewFocus?.(focusKey)}
        onMouseLeave={() => onPreviewFocus?.(null)}
        onFocusCapture={() => onPreviewFocus?.(focusKey)}
        onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) onPreviewFocus?.(null);
        }}
    >
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

const SortRow = ({ section, draggedSection, setDraggedSection, column, onDropOn, onPreviewFocus }) => (
    <div
        className={`cz-sort ${draggedSection === section.id ? 'dragging' : ''}`}
        draggable
        onDragStart={(e) => {
            setDraggedSection(section.id);
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', section.id);
            e.dataTransfer.setData('text/column', column);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDropOn(draggedSection || e.dataTransfer.getData('text/plain'), column, section.id);
        }}
        onDragEnd={() => setDraggedSection(null)}
        onMouseEnter={() => onPreviewFocus?.(section.id)}
        onMouseLeave={() => onPreviewFocus?.(null)}
    >
        <i className="fa-solid fa-grip-vertical rb-sort-grip"></i>
        <i className={`fa-solid ${section.icon} rb-sort-icon`}></i>
        <span>{section.label}</span>
    </div>
);

export default function CustomizePanel({
    design: rawDesign,
    updateDesign,
    sectionOrder,
    sectionOptions,
    draggedSection,
    setDraggedSection,
    reorderSections,
    moveColumnSection,
    movePageSection,
    selectedTemplate,
    resumeData,
    setResumeData,
    onSaveAsTemplate,
    onPreviewFocus,
}) {
    const d = mergeDesign({
        ...rawDesign,
        accentColor: rawDesign?.accentColor || resumeData?.themeColor,
    }, getTemplateById(selectedTemplate)?.accentColor);
    const twoColTemplate = isTwoColumnTemplate(selectedTemplate);
    const columns = twoColTemplate
        ? (rawDesign?.columns === 'one' ? 'one' : rawDesign?.columns === 'mix' ? 'mix' : 'two')
        : 'one';
    const headerPos = columns === 'mix'
        ? 'top'
        : rawDesign?.headerPos === 'right' ? 'right' : rawDesign?.headerPos === 'top' ? 'top' : 'left';
    const showTwoColControls = twoColTemplate && (getTemplateById(selectedTemplate)?.layout === 'split' || columns !== 'one');
    const twoPageTemplate = !isOnePageTemplate(selectedTemplate);
    const pageLists = twoPageTemplate ? getPageSectionLists(resumeData, selectedTemplate) : { page1: [], page2: [] };
    const layoutSections = orderedActiveSectionIds(resumeData, sectionOrder);
    const columnSections = columnsWithActiveSections(resumeData);
    const [openId, setOpenId] = useState('layout');

    const set = (field, value) => updateDesign(field, value);
    const setMany = (patch) => {
        Object.entries(patch).forEach(([k, v]) => updateDesign(k, v));
    };
    const applyAccent = (c) => {
        setResumeData((prev) => ({
            ...prev,
            themeColor: c,
            design: { ...(prev.design || {}), accentColor: c },
        }));
    };

    return (
        <div className="cz-panel">
            <div className="cz-scroll">
                <Accordion id="layout" title="Layout" openId={openId} setOpenId={setOpenId}>
                    <div>
                        <div className="cz-label">Resume Size</div>
                        <div className="cz-grid-3">
                            {[{ id: 'a4', label: 'A4' }, { id: 'letter', label: 'US Letter' }].map((f) => (
                                <Opt key={f.id} active={d.pageSize === f.id} onClick={() => set('pageSize', f.id)}>{f.label}</Opt>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="cz-label">Columns</div>
                        <div className="cz-row">
                            {[
                                { id: 'one', label: 'One' },
                                { id: 'two', label: 'Two' },
                                { id: 'mix', label: 'Mix' },
                            ].map((c) => (
                                <Opt
                                    key={c.id}
                                    active={columns === c.id}
                                    onClick={() => {
                                        if (!twoColTemplate && c.id !== 'one') return;
                                        if (c.id === 'mix') setMany({ columns: 'mix', headerPos: 'top' });
                                        else if (c.id === 'two') setMany({ columns: 'two', headerPos: d.headerPos === 'right' ? 'right' : 'left' });
                                        else set('columns', 'one');
                                    }}
                                    style={{ flex: 1, opacity: !twoColTemplate && c.id !== 'one' ? 0.4 : 1 }}
                                >
                                    <div className="cz-col-icon">{c.label}</div>
                                </Opt>
                            ))}
                        </div>
                    </div>
                    {showTwoColControls && (
                        <>
                            <div>
                                <div className="cz-label">Header Position</div>
                                <div className="cz-row">
                                    {['top', 'left', 'right'].map((pos) => (
                                        <Opt
                                            key={pos}
                                            active={headerPos === pos}
                                            onClick={() => {
                                                if (pos === 'top') setMany({ headerPos: 'top', columns: 'mix' });
                                                else setMany({ headerPos: pos, columns: 'two' });
                                            }}
                                            style={{ flex: 1, textTransform: 'capitalize' }}
                                        >
                                            {pos}
                                        </Opt>
                                    ))}
                                </div>
                            </div>
                            <Slider
                                label={d.headerPos === 'right' ? 'Right column width' : 'Left column width'}
                                value={d.leftWidth}
                                min={22}
                                max={50}
                                unit="%"
                                onChange={(v) => set('leftWidth', v)}
                            />
                        </>
                    )}
                    <div>
                        <div className="cz-label">Change Section Layout</div>
                        <p className="cz-help">
                            {twoPageTemplate
                                ? 'This is a 2-page resume. Drag sections between Page 1 and Page 2. Both pages stay one column.'
                                : showTwoColControls
                                ? 'Drag sections between Left and Right to match the two-column template.'
                                : 'Drag to change the order of sections on the page.'}
                        </p>
                        {layoutSections.length === 0 && (
                            <p className="cz-help">Add sections in the editor first. They will show up here.</p>
                        )}
                        {twoPageTemplate ? (
                            <div className="cz-split">
                                {['page1', 'page2'].map((pageKey) => (
                                    <div
                                        key={pageKey}
                                        className="cz-split-col"
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            const sourceId = draggedSection || e.dataTransfer.getData('text/plain');
                                            if (sourceId) movePageSection?.(sourceId, pageKey);
                                        }}
                                    >
                                        <h5>{pageKey === 'page1' ? 'Page 1' : 'Page 2'}</h5>
                                        {(pageLists[pageKey] || []).filter((id) => layoutSections.includes(id)).map((sectionId) => {
                                            const section = sectionOptions.find((item) => item.id === sectionId);
                                            if (!section) return null;
                                            return (
                                                <SortRow
                                                    key={section.id}
                                                    section={section}
                                                    draggedSection={draggedSection}
                                                    setDraggedSection={setDraggedSection}
                                                    column={pageKey}
                                                    onDropOn={(sourceId, col, targetId) => movePageSection?.(sourceId, col, targetId)}
                                                    onPreviewFocus={onPreviewFocus}
                                                />
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        ) : showTwoColControls ? (
                            <div className="cz-split">
                                {['left', 'right'].map((column) => (
                                    <div
                                        key={column}
                                        className="cz-split-col"
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            const sourceId = draggedSection || e.dataTransfer.getData('text/plain');
                                            if (sourceId) moveColumnSection(sourceId, column);
                                        }}
                                    >
                                        <h5>{column}</h5>
                                        {columnSections[column].map((sectionId) => {
                                            const section = sectionOptions.find((item) => item.id === sectionId);
                                            if (!section) return null;
                                            return (
                                                <SortRow
                                                    key={section.id}
                                                    section={section}
                                                    draggedSection={draggedSection}
                                                    setDraggedSection={setDraggedSection}
                                                    column={column}
                                                    onDropOn={moveColumnSection}
                                                    onPreviewFocus={onPreviewFocus}
                                                />
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                                {layoutSections.map((sectionId) => {
                                    const section = sectionOptions.find((item) => item.id === sectionId);
                                    if (!section) return null;
                                    return (
                                        <SortRow
                                            key={section.id}
                                            section={section}
                                            draggedSection={draggedSection}
                                            setDraggedSection={setDraggedSection}
                                            column="single"
                                            onDropOn={(sourceId, _col, targetId) => reorderSections(sourceId, targetId)}
                                            onPreviewFocus={onPreviewFocus}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </Accordion>

                <Accordion id="fontsize" title="Font Size" openId={openId} setOpenId={setOpenId}>
                    <Slider label="Base Font Size" value={d.fontSize} min={9} max={13} step={0.5} unit="pt" onChange={(v) => set('fontSize', v)} focusKey="body" onPreviewFocus={onPreviewFocus} />
                    <Slider label="Full Name" value={d.nameSizeOffset} min={4.5} max={20.5} step={0.5} unit="pt" onChange={(v) => set('nameSizeOffset', v)} focusKey="name" onPreviewFocus={onPreviewFocus} />
                    <Slider label="Professional Title" value={d.titleSizeOffset} min={1} max={9} step={0.5} unit="pt" onChange={(v) => set('titleSizeOffset', v)} focusKey="role" onPreviewFocus={onPreviewFocus} />
                    <Slider label="Section Headings" value={d.headingSizeOffset} min={0} max={4} step={0.5} unit="pt" onChange={(v) => set('headingSizeOffset', v)} focusKey="headings" onPreviewFocus={onPreviewFocus} />
                    <Slider label="Entry Header" value={d.entryHeaderOffset} min={-2} max={2} step={0.5} unit="pt" onChange={(v) => set('entryHeaderOffset', v)} focusKey="entries" onPreviewFocus={onPreviewFocus} />
                </Accordion>

                <Accordion id="spacing" title="Spacing" openId={openId} setOpenId={setOpenId}>
                    <Slider label="Line Height" value={d.lineHeight} min={1} max={2} step={0.1} onChange={(v) => set('lineHeight', v)} focusKey="body" onPreviewFocus={onPreviewFocus} />
                    <Slider label="Top Margin" value={d.topMargin} min={4} max={28} unit="mm" onChange={(v) => setMany({ topMargin: v, tbMargin: v })} focusKey="page" onPreviewFocus={onPreviewFocus} />
                    <Slider label="Side Margin" value={d.sideMargin} min={4} max={28} unit="mm" onChange={(v) => setMany({ sideMargin: v, lrMargin: v })} focusKey="page" onPreviewFocus={onPreviewFocus} />
                    <Slider label="Bottom Margin" value={d.bottomMargin} min={4} max={28} unit="mm" onChange={(v) => set('bottomMargin', v)} focusKey="page" onPreviewFocus={onPreviewFocus} />
                    <Slider label="Header to content" value={d.headerGap} min={0} max={36} unit="px" onChange={(v) => set('headerGap', v)} focusKey="page" onPreviewFocus={onPreviewFocus} />
                    <Slider label="Space between Entries" value={d.entrySpacing} min={0} max={5} onChange={(v) => set('entrySpacing', v)} focusKey="entries" onPreviewFocus={onPreviewFocus} />
                    <Slider label="Space between Sections" value={Number(d.sectionSpacing) || 16} min={4} max={36} unit="px" onChange={(v) => set('sectionSpacing', v)} focusKey="body" onPreviewFocus={onPreviewFocus} />
                </Accordion>

                <Accordion id="content" title="Lists & text" openId={openId} setOpenId={setOpenId}>
                    <div>
                        <div className="cz-label">Subtitle Style</div>
                        <div className="cz-row">
                            {['normal', 'bold', 'italic'].map((st) => (
                                <Opt key={st} active={d.subtitleStyle === st} onClick={() => set('subtitleStyle', st)} style={{ flex: 1, textTransform: 'capitalize' }}>{st}</Opt>
                            ))}
                        </div>
                    </div>
                    <label className="cz-check">
                        <input type="checkbox" checked={d.descIndent} onChange={(e) => set('descIndent', e.target.checked)} />
                        Indent descriptions
                    </label>
                    <div>
                        <div className="cz-label">List style</div>
                        <div className="cz-row">
                            {['bullet', 'hyphen', 'number', 'none'].map((st) => (
                                <Opt key={st} active={d.listStyle === st} onClick={() => set('listStyle', st)} style={{ flex: 1, textTransform: 'capitalize' }}>{st}</Opt>
                            ))}
                        </div>
                    </div>
                    {layoutSections.length > 0 && (
                        <div>
                            <div className="cz-label">Per-section list style</div>
                            <p className="cz-help">Override the global list style for any section.</p>
                            {layoutSections.map((sectionId) => {
                                const section = sectionOptions.find((item) => item.id === sectionId);
                                const current = resumeData?.sectionStyles?.[sectionId]?.listStyle || d.listStyle;
                                return (
                                    <div key={sectionId} style={{ marginBottom: 10 }}>
                                        <div className="cz-label">{section?.label || sectionId}</div>
                                        <div className="cz-row">
                                            {['bullet', 'hyphen', 'number', 'none'].map((st) => (
                                                <Opt
                                                    key={st}
                                                    active={current === st}
                                                    onClick={() => setResumeData((prev) => ({
                                                        ...prev,
                                                        sectionStyles: {
                                                            ...(prev.sectionStyles || {}),
                                                            [sectionId]: { ...(prev.sectionStyles?.[sectionId] || {}), listStyle: st },
                                                        },
                                                    }))}
                                                    style={{ flex: 1, textTransform: 'capitalize' }}
                                                >
                                                    {st}
                                                </Opt>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Accordion>

                <Accordion id="footer" title="Footer" openId={openId} setOpenId={setOpenId}>
                    <label className="cz-check"><input type="checkbox" checked={d.footerPageNumbers} onChange={(e) => set('footerPageNumbers', e.target.checked)} /> Page Numbers</label>
                    <label className="cz-check"><input type="checkbox" checked={d.footerEmail} onChange={(e) => set('footerEmail', e.target.checked)} /> Email</label>
                    <label className="cz-check"><input type="checkbox" checked={d.footerName} onChange={(e) => set('footerName', e.target.checked)} /> Name</label>
                </Accordion>

                <Accordion id="font" title="Font" openId={openId} setOpenId={setOpenId}>
                    <div className="cz-row">
                        {['serif', 'sans', 'mono'].map((cat) => (
                            <Opt key={cat} active={d.fontCat === cat} onClick={() => set('fontCat', cat)} style={{ flex: 1, textTransform: 'uppercase', fontWeight: 700 }}>{cat}</Opt>
                        ))}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {(FONT_MAP[d.fontCat] || FONT_MAP.sans).map((font) => (
                            <Opt
                                key={font}
                                active={d.fontFamily === font}
                                onClick={() => set('fontFamily', font)}
                                style={{ fontFamily: `'${font}', sans-serif`, borderRadius: 20, flex: '1 0 30%' }}
                            >
                                {font}
                            </Opt>
                        ))}
                    </div>
                </Accordion>

                <Accordion id="colors" title="Colors" openId={openId} setOpenId={setOpenId}>
                    <div
                        onMouseEnter={() => onPreviewFocus?.('accent')}
                        onMouseLeave={() => onPreviewFocus?.(null)}
                    >
                    <div className="cz-label">Accent color</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {PRESET_COLORS.map((c) => (
                            <div
                                key={c}
                                className={`cz-swatch ${d.accentColor === c ? 'active' : ''}`}
                                style={{ background: c }}
                                onClick={() => applyAccent(c)}
                            >
                                {d.accentColor === c && <i className="fa-solid fa-check" style={{ color: c === '#ffffff' ? '#000' : '#fff', fontSize: 10 }}></i>}
                            </div>
                        ))}
                        <input
                            type="color"
                            value={d.accentColor}
                            onChange={(e) => applyAccent(e.target.value)}
                            style={{ width: 28, height: 28, border: 0, background: 'none', cursor: 'pointer' }}
                        />
                    </div>
                    <div className="cz-label">Apply accent color to</div>
                    <div className="cz-grid-2">
                        {[
                            ['applyAccentToName', 'Name'],
                            ['applyAccentToHeadings', 'Headings'],
                            ['applyAccentToJob', 'Job Title'],
                            ['applyAccentToDates', 'Dates'],
                            ['applyAccentToLines', 'Lines'],
                        ].map(([key, label]) => (
                            <label key={key} className="cz-check">
                                <input type="checkbox" checked={d[key]} onChange={(e) => set(key, e.target.checked)} />
                                {label}
                            </label>
                        ))}
                    </div>
                    </div>
                </Accordion>

                <Accordion id="headings" title="Section Headings" openId={openId} setOpenId={setOpenId}>
                    <div onMouseEnter={() => onPreviewFocus?.('headings')} onMouseLeave={() => onPreviewFocus?.(null)}>
                    <div className="cz-grid-3">
                        {HEADING_STYLES.map((h) => (
                            <Opt key={h.id} active={d.headingStyle === h.id} onClick={() => set('headingStyle', h.id)}>{h.name}</Opt>
                        ))}
                    </div>
                    <div className="cz-label">Alignment</div>
                    <div className="cz-row">
                        {['left', 'center'].map((a) => (
                            <Opt key={a} active={d.headingAlign === a} onClick={() => set('headingAlign', a)} style={{ flex: 1, textTransform: 'capitalize' }}>{a}</Opt>
                        ))}
                    </div>
                    <div className="cz-label">Capitalization</div>
                    <div className="cz-row">
                        <Opt active={d.headingTransform === 'capitalize'} onClick={() => set('headingTransform', 'capitalize')} style={{ flex: 1 }}>Capitalize</Opt>
                        <Opt active={d.headingTransform === 'uppercase'} onClick={() => set('headingTransform', 'uppercase')} style={{ flex: 1 }}>UPPERCASE</Opt>
                    </div>
                    <div className="cz-label">Heading Size</div>
                    <div className="cz-row">
                        {[{ id: 9, label: 'S' }, { id: 12, label: 'M' }, { id: 14, label: 'L' }, { id: 16, label: 'XL' }].map((sz) => (
                            <Opt key={sz.id} active={d.headingSize === sz.id} onClick={() => setMany({ headingSize: sz.id, headingSizeOffset: Math.max(0, sz.id - 10) })} style={{ flex: 1, fontWeight: 700 }}>{sz.label}</Opt>
                        ))}
                    </div>
                    </div>
                </Accordion>

                <Accordion id="links" title="Link styling" openId={openId} setOpenId={setOpenId}>
                    <div className="cz-row" style={{ justifyContent: 'space-between' }}>
                        <label className="cz-check"><input type="checkbox" checked={d.linkUnderline} onChange={(e) => set('linkUnderline', e.target.checked)} /> Underline</label>
                        <label className="cz-check"><input type="checkbox" checked={d.linkBlue} onChange={(e) => set('linkBlue', e.target.checked)} /> Blue color</label>
                        <label className="cz-check"><input type="checkbox" checked={d.linkIcon} onChange={(e) => set('linkIcon', e.target.checked)} /> Link icon</label>
                    </div>
                </Accordion>

                <Accordion id="headerLayout" title="Header layout" openId={openId} setOpenId={setOpenId}>
                    <div onMouseEnter={() => onPreviewFocus?.('contact')} onMouseLeave={() => onPreviewFocus?.(null)}>
                    <div className="cz-row">
                        {['left', 'center'].map((a) => (
                            <Opt key={a} active={d.headerAlignment === a} onClick={() => set('headerAlignment', a)} style={{ flex: 1, textTransform: 'capitalize' }}>{a}</Opt>
                        ))}
                    </div>
                    <div className="cz-label">Details Arrangement</div>
                    <div className="cz-row">
                        {['stacked', 'horizontal', 'columns'].map((a) => (
                            <Opt key={a} active={d.headerArrangement === a} onClick={() => set('headerArrangement', a)} style={{ flex: 1, textTransform: 'capitalize' }}>{a}</Opt>
                        ))}
                    </div>
                    <div className="cz-label">Header Contact Icons</div>
                    <div className="cz-row">
                        {['icon', 'bullet', 'bar'].map((t) => (
                            <Opt key={t} active={d.headerIconType === t} onClick={() => set('headerIconType', t)} style={{ flex: 1, textTransform: 'capitalize' }}>{t}</Opt>
                        ))}
                    </div>
                    </div>
                </Accordion>

                <Accordion id="name" title="Name" openId={openId} setOpenId={setOpenId}>
                    <div onMouseEnter={() => onPreviewFocus?.('name')} onMouseLeave={() => onPreviewFocus?.(null)}>
                    <div className="cz-label">Size</div>
                    <div className="cz-row">
                        {['xs', 's', 'm', 'l', 'xl'].map((sz) => (
                            <Opt key={sz} active={d.nameSize === sz} onClick={() => set('nameSize', sz)} style={{ flex: 1, textTransform: 'uppercase', fontWeight: 700 }}>{sz}</Opt>
                        ))}
                    </div>
                    <label className="cz-check">
                        <input type="checkbox" checked={d.nameBold} onChange={(e) => set('nameBold', e.target.checked)} />
                        Make name bold
                    </label>
                    </div>
                </Accordion>

                <Accordion id="title" title="Professional title" openId={openId} setOpenId={setOpenId}>
                    <div onMouseEnter={() => onPreviewFocus?.('role')} onMouseLeave={() => onPreviewFocus?.(null)}>
                    <div className="cz-label">Size</div>
                    <div className="cz-row">
                        {['s', 'm', 'l'].map((sz) => (
                            <Opt key={sz} active={d.roleSize === sz} onClick={() => set('roleSize', sz)} style={{ flex: 1, textTransform: 'uppercase', fontWeight: 700 }}>{sz}</Opt>
                        ))}
                    </div>
                    <div className="cz-label">Position</div>
                    <div className="cz-row">
                        <Opt active={d.rolePosition === 'beside'} onClick={() => set('rolePosition', 'beside')} style={{ flex: 1 }}>Same Line</Opt>
                        <Opt active={d.rolePosition === 'below'} onClick={() => set('rolePosition', 'below')} style={{ flex: 1 }}>Below Name</Opt>
                    </div>
                    <div className="cz-label">Style</div>
                    <div className="cz-row">
                        <Opt active={d.roleStyle === 'normal'} onClick={() => set('roleStyle', 'normal')} style={{ flex: 1 }}>Normal</Opt>
                        <Opt active={d.roleStyle === 'italic'} onClick={() => set('roleStyle', 'italic')} style={{ flex: 1 }}>Italic</Opt>
                    </div>
                    </div>
                </Accordion>
            </div>
            {onSaveAsTemplate && (
                <div className="cz-footer">
                    <button type="button" className="cz-save-template" onClick={onSaveAsTemplate}>
                        <i className="fa-solid fa-bookmark"></i>
                        Save as template
                    </button>
                </div>
            )}
        </div>
    );
}
