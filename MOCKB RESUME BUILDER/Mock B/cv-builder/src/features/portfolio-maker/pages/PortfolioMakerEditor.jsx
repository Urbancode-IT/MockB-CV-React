import { useState, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getMakerTemplate } from '../config/catalog';
import { COLOR_PRESETS, FONT_PRESETS, MODE_PRESETS, DEFAULT_DESIGN, resolveDesign, buildAccentGradient, FOLIO_TWO_DEFAULT_DESIGN, resolveFolioTwoDesign } from '../config/design';
import { contentForTemplate } from '../data/defaultContent';
import { renderMakerPreview } from '../components/renderPreview.jsx';
import { downloadPortfolioMakerZip } from '../utils/downloadZip';
import { savePreviewState } from '../utils/previewSession';
import ImageField from '../components/ImageField';
import { readFileAsDataUrl } from '../utils/fileHelpers';
import './PortfolioMakerEditor.css';

export default function PortfolioMakerEditor() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const template = getMakerTemplate(templateId);
  const startMode = location.state?.startMode || 'sample';
  const initialContent = location.state?.content || contentForTemplate(template.id, startMode);

  const [content, setContent] = useState(() => initialContent);
  const [techStackText, setTechStackText] = useState(() => (initialContent.techStack || []).join(', '));
  const [design, setDesign] = useState(() => {
    const base = {
      ...DEFAULT_DESIGN,
      ...(templateId === 'folio-two' ? FOLIO_TWO_DEFAULT_DESIGN : {}),
      ...location.state?.design,
    };
    return templateId === 'folio-two' ? resolveFolioTwoDesign(base) : base;
  });
  const [downloading, setDownloading] = useState(false);
  const resumeInputRef = useRef(null);

  const resolvedDesign = templateId === 'folio-two' ? resolveFolioTwoDesign(design) : resolveDesign(design);

  const updateField = (field, value) => {
    setContent((prev) => ({ ...prev, [field]: value }));
  };

  const updateDesign = (patch) => {
    setDesign((prev) => {
      const next = { ...prev, ...patch };
      return templateId === 'folio-two' ? resolveFolioTwoDesign(next) : resolveDesign(next);
    });
  };

  const selectColorPreset = (preset) => {
    updateDesign({
      colorId: preset.id,
      accentColor: preset.color,
      accentGradient: preset.gradient || buildAccentGradient(preset.color),
    });
  };

  const commitTechStack = () => {
    const techStack = techStackText.split(',').map((s) => s.trim()).filter(Boolean);
    setContent((prev) => ({ ...prev, techStack }));
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await readFileAsDataUrl(file);
    setContent((prev) => ({
      ...prev,
      resumeFileData: dataUrl,
      resumeFileName: file.name,
    }));
    e.target.value = '';
  };

  const clearResume = () => {
    setContent((prev) => ({
      ...prev,
      resumeFileData: '',
      resumeFileName: '',
    }));
  };

  const splitList = (text) => text.split(',').map((s) => s.trim()).filter(Boolean);

  const updateProject = (index, field, value) => {
    setContent((prev) => {
      const projects = [...(prev.projects || [])];
      projects[index] = { ...projects[index], [field]: value };
      return { ...prev, projects };
    });
  };

  const updateProjectTech = (index, text) => {
    updateProject(index, 'tech', splitList(text));
  };

  const addProject = () => {
    setContent((prev) => ({
      ...prev,
      projects: [
        ...(prev.projects || []),
        {
          name: 'New Project',
          description: 'Describe the project outcome.',
          roleTag: 'Full-Stack',
          tech: [],
          live: 'https://example.com',
          github: 'https://github.com',
          image: '',
        },
      ],
    }));
  };

  const removeProject = (index) => {
    setContent((prev) => ({
      ...prev,
      projects: (prev.projects || []).filter((_, i) => i !== index),
    }));
  };

  const updateExperience = (index, field, value) => {
    setContent((prev) => {
      const experience = [...(prev.experience || [])];
      experience[index] = { ...experience[index], [field]: value };
      return { ...prev, experience };
    });
  };

  const addExperience = () => {
    setContent((prev) => ({
      ...prev,
      experience: [
        ...(prev.experience || []),
        { role: 'Role', company: 'Company', period: 'Dates', description: '' },
      ],
    }));
  };

  const removeExperience = (index) => {
    setContent((prev) => ({
      ...prev,
      experience: (prev.experience || []).filter((_, i) => i !== index),
    }));
  };

  const updateFeature = (index, field, value) => {
    setContent((prev) => {
      const features = [...(prev.features || [])];
      features[index] = { ...features[index], [field]: value };
      return { ...prev, features };
    });
  };

  const previewContent = {
    ...content,
    techStack: splitList(techStackText),
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadPortfolioMakerZip({
        templateId: template.id,
        content: previewContent,
        design: resolvedDesign,
      });
    } finally {
      setDownloading(false);
    }
  };

  const openFullPreview = () => {
    savePreviewState({ templateId: template.id, content: previewContent, design: resolvedDesign });
    navigate(`/portfolio-maker/preview/${template.id}`, {
      state: { content: previewContent, design: resolvedDesign, startMode },
    });
  };

  return (
    <div className="pm-editor-page">
      <header className="pm-editor-topbar">
        <button type="button" className="pm-editor-back" onClick={() => navigate('/portfolio-maker')}>
          <i className="fa-solid fa-arrow-left" /> Templates
        </button>
        <div className="pm-editor-title">
          <i className="fa-solid fa-laptop-code" />
          <span>{template.name}</span>
        </div>
        <div className="pm-editor-actions">
          <button type="button" className="pm-btn pm-btn-ghost" onClick={openFullPreview}>
            <i className="fa-solid fa-up-right-from-square" /> Full preview
          </button>
          <button type="button" className="pm-btn pm-btn-primary" onClick={handleDownload} disabled={downloading}>
            {downloading ? (
              <><i className="fa-solid fa-circle-notch fa-spin" /> Preparing ZIP…</>
            ) : (
              <><i className="fa-solid fa-download" /> Download ZIP</>
            )}
          </button>
        </div>
      </header>

      <div className="pm-editor-layout">
        <aside className="pm-editor-sidebar">
          <h2>Customize your portfolio</h2>
          <p>Edit content and design below. Every change is reflected in the live preview and included in your downloaded ZIP.</p>

          <div className="pm-sidebar-group">
            <h3><i className="fa-solid fa-palette" /> Design</h3>

            <div className="pm-design-block">
              <span className="pm-design-label">Accent color</span>
              <div className="pm-color-row">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className={`pm-color-swatch${resolvedDesign.colorId === preset.id ? ' active' : ''}`}
                    style={{ background: preset.gradient || preset.color }}
                    title={preset.label}
                    onClick={() => selectColorPreset(preset)}
                  />
                ))}
              </div>
              <label className="pm-custom-color">
                <span>Custom</span>
                <input
                  type="color"
                  value={resolvedDesign.accentColor}
                  onChange={(e) => updateDesign({
                    accentColor: e.target.value,
                    colorId: 'custom',
                    accentGradient: buildAccentGradient(e.target.value),
                  })}
                />
                <code>{resolvedDesign.accentColor}</code>
              </label>
            </div>

            <div className="pm-design-block">
              <span className="pm-design-label">Font family</span>
              <div className="pm-font-grid">
                {FONT_PRESETS.map((font) => (
                  <button
                    key={font.id}
                    type="button"
                    className={`pm-font-btn${resolvedDesign.fontId === font.id ? ' active' : ''}`}
                    style={{ fontFamily: font.family }}
                    onClick={() => updateDesign({ fontId: font.id })}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pm-design-block">
              <span className="pm-design-label">Theme mode</span>
              <div className="pm-mode-toggle">
                {MODE_PRESETS.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    className={`pm-mode-btn${resolvedDesign.mode === mode.id ? ' active' : ''}`}
                    onClick={() => updateDesign({ mode: mode.id })}
                  >
                    <i className={`fa-solid fa-${mode.id === 'light' ? 'sun' : 'moon'}`} />
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pm-sidebar-group">
            <h3><i className="fa-solid fa-user" /> Profile</h3>
            <label className="pm-field">
              <span>Full name</span>
              <input value={content.name} onChange={(e) => updateField('name', e.target.value)} autoComplete="off" />
            </label>
            <label className="pm-field">
              <span>Initials (logo)</span>
              <input
                value={content.initials || ''}
                onChange={(e) => updateField('initials', e.target.value.toUpperCase().slice(0, 3))}
                autoComplete="off"
                placeholder="AM"
                maxLength={3}
              />
            </label>
            <ImageField
              label="Profile image"
              value={content.profileImage || ''}
              onChange={(v) => updateField('profileImage', v)}
            />
            <label className="pm-field">
              <span>Job title</span>
              <input value={content.role} onChange={(e) => updateField('role', e.target.value)} autoComplete="off" />
            </label>
            <label className="pm-field">
              <span>Headline</span>
              <input
                value={(content.headlineSegments || []).map((s) => s.text).join('')}
                onChange={(e) => updateField('headlineSegments', [{ text: e.target.value, bold: false }])}
                autoComplete="off"
                placeholder="Engineering scalable architecture for modern enterprises"
              />
            </label>
            <label className="pm-field">
              <span>Tagline</span>
              <input value={content.tagline} onChange={(e) => updateField('tagline', e.target.value)} autoComplete="off" />
            </label>
          </div>

          <div className="pm-sidebar-group">
            <h3><i className="fa-solid fa-address-book" /> Contact & social</h3>
            <label className="pm-field">
              <span>WhatsApp number (Let&apos;s Talk button)</span>
              <input
                value={content.whatsapp || ''}
                onChange={(e) => updateField('whatsapp', e.target.value)}
                autoComplete="off"
                placeholder="+91 98765 43210"
              />
            </label>
            <label className="pm-field">
              <span>Email</span>
              <input value={content.email} onChange={(e) => updateField('email', e.target.value)} autoComplete="off" />
            </label>
            <label className="pm-field">
              <span>Phone</span>
              <input value={content.phone} onChange={(e) => updateField('phone', e.target.value)} autoComplete="off" />
            </label>
            <label className="pm-field">
              <span>Location</span>
              <input value={content.location} onChange={(e) => updateField('location', e.target.value)} autoComplete="off" />
            </label>
            <label className="pm-field">
              <span>LinkedIn URL</span>
              <input value={content.linkedin || ''} onChange={(e) => updateField('linkedin', e.target.value)} autoComplete="off" />
            </label>
            <label className="pm-field">
              <span>Resume file (Download Resume button)</span>
              <div className="pm-resume-row">
                <button type="button" className="pm-file-btn" onClick={() => resumeInputRef.current?.click()}>
                  <i className="fa-solid fa-file-arrow-up" /> Upload resume
                </button>
                {content.resumeFileName ? (
                  <>
                    <span className="pm-resume-name">{content.resumeFileName}</span>
                    <button type="button" className="pm-file-btn pm-file-btn--ghost" onClick={clearResume}>
                      Clear
                    </button>
                  </>
                ) : (
                  <span className="pm-resume-hint">PDF or DOC/DOCX</span>
                )}
              </div>
              <input
                ref={resumeInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                hidden
                onChange={handleResumeUpload}
              />
            </label>
          </div>

          <div className="pm-sidebar-group">
            <h3><i className="fa-solid fa-layer-group" /> Tech stack</h3>
            <label className="pm-field">
              <span>Technologies (marquee loop, comma separated)</span>
              <input
                value={techStackText}
                onChange={(e) => setTechStackText(e.target.value)}
                onBlur={commitTechStack}
                autoComplete="off"
                placeholder="Node.js, Redis, Next.js, AWS"
              />
            </label>
          </div>

          <div className="pm-sidebar-group">
            <h3><i className="fa-solid fa-briefcase" /> Projects</h3>
            {(content.projects || []).map((project, index) => (
              <div className="pm-repeat-card" key={`project-${index}`}>
                <div className="pm-repeat-card__head">
                  <strong>Project {index + 1}</strong>
                  <button type="button" className="pm-repeat-remove" onClick={() => removeProject(index)} aria-label="Remove project">
                    <i className="fa-solid fa-trash" />
                  </button>
                </div>
                <label className="pm-field">
                  <span>Project name</span>
                  <input value={project.name || ''} onChange={(e) => updateProject(index, 'name', e.target.value)} autoComplete="off" />
                </label>
                <label className="pm-field">
                  <span>Description</span>
                  <textarea rows={2} value={project.description || ''} onChange={(e) => updateProject(index, 'description', e.target.value)} />
                </label>
                <label className="pm-field">
                  <span>Role tag</span>
                  <input value={project.roleTag || ''} onChange={(e) => updateProject(index, 'roleTag', e.target.value)} autoComplete="off" placeholder="Lead Engineer" />
                </label>
                <label className="pm-field">
                  <span>Tech stack (comma separated)</span>
                  <input
                    value={(project.tech || []).join(', ')}
                    onChange={(e) => updateProjectTech(index, e.target.value)}
                    autoComplete="off"
                    placeholder="Next.js, TypeScript"
                  />
                </label>
                <label className="pm-field">
                  <span>Live project URL</span>
                  <input value={project.live || ''} onChange={(e) => updateProject(index, 'live', e.target.value)} autoComplete="off" placeholder="https://..." />
                </label>
                <label className="pm-field">
                  <span>GitHub URL</span>
                  <input value={project.github || ''} onChange={(e) => updateProject(index, 'github', e.target.value)} autoComplete="off" placeholder="https://github.com/..." />
                </label>
                <ImageField
                  label="Project screenshot"
                  value={project.image || ''}
                  onChange={(v) => updateProject(index, 'image', v)}
                />
              </div>
            ))}
            <button type="button" className="pm-add-btn" onClick={addProject}>
              <i className="fa-solid fa-plus" /> Add project
            </button>
          </div>

          <div className="pm-sidebar-group">
            <h3><i className="fa-solid fa-building" /> Experience</h3>
            {(content.experience || []).map((item, index) => (
              <div className="pm-repeat-card" key={`exp-${index}`}>
                <div className="pm-repeat-card__head">
                  <strong>Role {index + 1}</strong>
                  <button type="button" className="pm-repeat-remove" onClick={() => removeExperience(index)} aria-label="Remove experience">
                    <i className="fa-solid fa-trash" />
                  </button>
                </div>
                <label className="pm-field">
                  <span>Company</span>
                  <input value={item.company || ''} onChange={(e) => updateExperience(index, 'company', e.target.value)} autoComplete="off" />
                </label>
                <label className="pm-field">
                  <span>Role</span>
                  <input value={item.role || ''} onChange={(e) => updateExperience(index, 'role', e.target.value)} autoComplete="off" />
                </label>
                <label className="pm-field">
                  <span>Period</span>
                  <input value={item.period || ''} onChange={(e) => updateExperience(index, 'period', e.target.value)} autoComplete="off" placeholder="2022 – Present" />
                </label>
                <label className="pm-field">
                  <span>Description</span>
                  <textarea rows={3} value={item.description || ''} onChange={(e) => updateExperience(index, 'description', e.target.value)} />
                </label>
              </div>
            ))}
            <button type="button" className="pm-add-btn" onClick={addExperience}>
              <i className="fa-solid fa-plus" /> Add experience
            </button>
          </div>

          <div className="pm-sidebar-group">
            <h3><i className="fa-solid fa-grip" /> Solution cards</h3>
            {(content.features || []).map((feature, index) => (
              <div className="pm-repeat-card" key={`feature-${index}`}>
                <div className="pm-repeat-card__head">
                  <strong>Card {index + 1}</strong>
                </div>
                <label className="pm-field">
                  <span>Title</span>
                  <input value={feature.title || ''} onChange={(e) => updateFeature(index, 'title', e.target.value)} autoComplete="off" />
                </label>
                <label className="pm-field">
                  <span>Description</span>
                  <textarea rows={2} value={feature.description || ''} onChange={(e) => updateFeature(index, 'description', e.target.value)} />
                </label>
              </div>
            ))}
          </div>

          <div className="pm-sidebar-group">
            <h3><i className="fa-solid fa-film" /> Philosophy section</h3>
            <label className="pm-field">
              <span>Section label</span>
              <input
                value={content.philosophy?.label || ''}
                onChange={(e) => updateField('philosophy', { ...(content.philosophy || {}), label: e.target.value })}
                autoComplete="off"
              />
            </label>
            <label className="pm-field">
              <span>Section title</span>
              <input
                value={content.philosophy?.title || ''}
                onChange={(e) => updateField('philosophy', { ...(content.philosophy || {}), title: e.target.value })}
                autoComplete="off"
              />
            </label>
            <ImageField
              label="Video thumbnail"
              value={content.philosophyVideo || ''}
              onChange={(v) => updateField('philosophyVideo', v)}
            />
          </div>

          <div className="pm-zip-note">
            <i className="fa-solid fa-box-archive" />
            <div>
              <strong>ZIP includes your design</strong>
              <p>Fonts, colors, theme mode, and all content are saved in <code>src/design.js</code> and <code>src/data.js</code>.</p>
            </div>
          </div>
        </aside>

        <section className="pm-editor-preview">
          <div className="pm-preview-label"><span className="pm-live-dot" /> Live preview</div>
          <div className="pm-preview-frame">
            {renderMakerPreview(template.id, previewContent, resolvedDesign)}
          </div>
        </section>
      </div>
    </div>
  );
}
