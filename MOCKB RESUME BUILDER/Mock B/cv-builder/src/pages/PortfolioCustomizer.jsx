import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AtlasMinimalPreview from '../components/portfolio/AtlasMinimalPreview';
import { PORTFOLIO_THEME_COLORS, getPortfolioTemplateById } from '../config/portfolioTemplates';
import { sampleForPortfolioTemplate, blankPortfolioData } from '../data/samplePortfolioData';
import { downloadPortfolioZip } from '../utils/buildPortfolioZip';
import './PortfolioCustomizer.css';

export default function PortfolioCustomizer() {
  const navigate = useNavigate();
  const location = useLocation();
  const templateId = location.state?.template || 'atlas-minimal';
  const startMode = location.state?.startMode || 'sample';
  const template = getPortfolioTemplateById(templateId);

  const [content, setContent] = useState(() => (
    startMode === 'blank' ? blankPortfolioData() : sampleForPortfolioTemplate()
  ));
  const [skillsText, setSkillsText] = useState(() => (
    (startMode === 'blank' ? blankPortfolioData() : sampleForPortfolioTemplate()).skills || []
  ).join(', '));
  const [themeKey, setThemeKey] = useState('blue');
  const [downloading, setDownloading] = useState(false);

  const accent = PORTFOLIO_THEME_COLORS[themeKey]?.color || template.accentColor;

  useEffect(() => {
    const active = document.activeElement;
    if (active?.dataset?.skillsField === 'true') return;
    setSkillsText((content.skills || []).join(', '));
  }, [content.skills]);

  const handleChange = (field, value) => {
    setContent((prev) => {
      if (field.startsWith('skill_')) {
        const idx = Number(field.split('_')[1]);
        const skills = [...(prev.skills || [])];
        skills[idx] = value;
        return { ...prev, skills };
      }
      if (field.startsWith('exp_')) {
        const [, idx, key] = field.split('_');
        const experience = [...(prev.experience || [])];
        experience[Number(idx)] = { ...experience[Number(idx)], [key]: value };
        return { ...prev, experience };
      }
      if (field.startsWith('project_')) {
        const [, idx, key] = field.split('_');
        const projects = [...(prev.projects || [])];
        projects[Number(idx)] = { ...projects[Number(idx)], [key]: value };
        return { ...prev, projects };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleSkillsBlur = () => {
    const skills = skillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    setContent((prev) => ({ ...prev, skills }));
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadPortfolioZip({ templateId, content, accentColor: accent });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="portfolio-customizer-page">
      <header className="pc-topbar">
        <button type="button" className="pc-back" onClick={() => navigate('/portfolio/templates')}>
          <i className="fa-solid fa-arrow-left" /> Templates
        </button>
        <div className="pc-title">
          <i className="fa-solid fa-laptop-code" />
          <span>{template.name}</span>
        </div>
        <div className="pc-actions">
          <div className="pc-theme-dots">
            {Object.entries(PORTFOLIO_THEME_COLORS).map(([key, val]) => (
              <button
                key={key}
                type="button"
                className={`pc-theme-dot${themeKey === key ? ' active' : ''}`}
                style={{ background: val.color }}
                title={val.label}
                onClick={() => setThemeKey(key)}
              />
            ))}
          </div>
          <button type="button" className="btn btn-primary pc-download-btn" onClick={handleDownload} disabled={downloading}>
            {downloading ? <><i className="fa-solid fa-circle-notch fa-spin" /> Preparing ZIP…</> : <><i className="fa-solid fa-download" /> Download ZIP</>}
          </button>
        </div>
      </header>

      <div className="pc-layout">
        <aside className="pc-sidebar">
          <h2>Customize portfolio</h2>
          <p>Edit the fields below. The live preview updates as you type. Your ZIP includes a README with run instructions.</p>

          <label className="pc-field">
            <span>Full name</span>
            <input value={content.name} onChange={(e) => handleChange('name', e.target.value)} autoComplete="off" />
          </label>
          <label className="pc-field">
            <span>Role / title</span>
            <input value={content.role} onChange={(e) => handleChange('role', e.target.value)} autoComplete="off" />
          </label>
          <label className="pc-field">
            <span>Tagline</span>
            <input value={content.tagline} onChange={(e) => handleChange('tagline', e.target.value)} autoComplete="off" />
          </label>
          <label className="pc-field">
            <span>Bio</span>
            <textarea rows={4} value={content.bio} onChange={(e) => handleChange('bio', e.target.value)} />
          </label>
          <label className="pc-field">
            <span>Email</span>
            <input value={content.email} onChange={(e) => handleChange('email', e.target.value)} autoComplete="off" />
          </label>
          <label className="pc-field">
            <span>Location</span>
            <input value={content.location} onChange={(e) => handleChange('location', e.target.value)} autoComplete="off" />
          </label>
          <label className="pc-field">
            <span>Skills (comma separated)</span>
            <input
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              onBlur={handleSkillsBlur}
              autoComplete="off"
              data-skills-field="true"
            />
          </label>

          <div className="pc-zip-note">
            <i className="fa-solid fa-box-archive" />
            <div>
              <strong>ZIP includes README</strong>
              <p>Unzip, run <code>npm install</code> then <code>npm run dev</code> to see your site at localhost:5173.</p>
            </div>
          </div>
        </aside>

        <section className="pc-preview-pane">
          <div className="pc-preview-label"><span className="pc-live-dot" /> Live preview</div>
          <div className="pc-preview-frame">
            <AtlasMinimalPreview
              content={content}
              accentColor={accent}
              editable={false}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
