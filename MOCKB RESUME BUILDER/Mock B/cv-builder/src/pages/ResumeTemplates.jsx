import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RESUME_TEMPLATES, getTemplateById } from '../config/templates';
import { sampleForTemplate } from '../data/sampleResumeData';
import ResumeTemplateRenderer from '../components/resume/ResumeTemplateRenderer';
import StartModeModal from '../components/resume/StartModeModal';
import { loadResumeDraft, listUserTemplates, deleteUserTemplate } from '../utils/userLibrary';
import './ResumeTemplates.css';

const categories = ['all', 'professional', 'modern'];

export default function ResumeTemplates() {
  const navigate = useNavigate();
  const [catFilter, setCatFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [hoveredId, setHoveredId] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [startTemplate, setStartTemplate] = useState(null);
  const [userTemplates, setUserTemplates] = useState(() => listUserTemplates());
  const draft = loadResumeDraft();

  const filtered = RESUME_TEMPLATES.filter(t => {
    const matchCat = catFilter === 'all' || t.category === catFilter;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openStartChoice = (templateId) => {
    setStartTemplate(templateId);
  };

  const continueDraft = () => {
    const extra = {
      userTemplateId: draft?.userTemplateId,
      userTemplateName: draft?.userTemplateName,
    };
    if (draft?.resumeId) navigate(`/resume/customizer/${draft.resumeId}`, { state: extra });
    else navigate('/resume/customizer', { state: { restoreDraft: true, template: draft?.selectedTemplate, ...extra } });
  };

  const openSavedTemplate = (item) => {
    navigate('/resume/customizer', {
      state: {
        template: item.baseTemplate,
        startMode: 'sample',
        userTemplateId: item.id,
        userTemplateName: item.name,
        savedDesign: item.design,
        themeColor: item.themeColor || item.design?.accentColor,
        savedSectionOrder: item.sectionOrder,
        savedColumnSections: item.columnSections,
      },
    });
  };

  const beginCustomizer = (mode) => {
    const template = startTemplate || previewTemplate;
    if (!template) return;
    setStartTemplate(null);
    setPreviewTemplate(null);
    navigate('/resume/customizer', { state: { template, startMode: mode } });
  };

  return (
    <main className="rt-page">
      {/* Hero */}
      <section className="rt-hero">
        <div className="container">
          <h1>Professional <span>Resume Templates</span></h1>
          <p>Browse our collection of ATS-optimized, recruiter-approved resume templates. Select a design and customize it with your own data.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="rt-filters-bar">
        <div className="container">
          <div className="filters-row">
            <div className="search-box">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Search templates..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="filter-group">
              <span className="filter-label">Style:</span>
              {categories.map(c => (
                <button key={c} className={`filter-btn ${catFilter === c ? 'active' : ''}`} onClick={() => setCatFilter(c)}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Template Grid */}
      <section className="rt-grid-section">
        <div className="container">
          {draft?.resumeData && (
            <div className="rt-continue">
              <div>
                <h3>Continue editing</h3>
                <p>{draft.title || 'Untitled resume'} · saved {draft.updatedAt ? new Date(draft.updatedAt).toLocaleString() : 'recently'}</p>
              </div>
              <button type="button" className="rt-continue-btn" onClick={continueDraft}>Resume</button>
            </div>
          )}

          {userTemplates.length > 0 && (
            <>
              <h2 className="rt-section-title">Your templates</h2>
              <div className="rt-grid rt-grid--mine">
                {userTemplates.map((item) => {
                  const base = getTemplateById(item.baseTemplate);
                  const sample = sampleForTemplate(item.baseTemplate);
                  const previewData = {
                    ...sample,
                    design: { ...(sample.design || {}), ...(item.design || {}) },
                    themeColor: item.themeColor || item.design?.accentColor,
                    sectionOrder: item.sectionOrder?.length ? item.sectionOrder : sample.sectionOrder,
                    columnSections: item.columnSections || sample.columnSections,
                  };
                  return (
                    <div key={item.id} className="rt-card">
                      <div className="rt-preview-box" onClick={() => openSavedTemplate(item)}>
                        <div className="rt-preview-scale-wrapper">
                          <ResumeTemplateRenderer template={item.baseTemplate} resumeData={previewData} preview />
                        </div>
                      </div>
                      <div className="rt-mine-meta">
                        <h4 className="rt-card-name" onClick={() => openSavedTemplate(item)}>{item.name}</h4>
                        <button
                          type="button"
                          className="rt-mine-delete"
                          onClick={() => setUserTemplates(deleteUserTemplate(item.id))}
                          aria-label={`Delete ${item.name}`}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                      <p className="rt-mine-base">Based on {base.name}</p>
                    </div>
                  );
                })}
              </div>
              <h2 className="rt-section-title">Library templates</h2>
            </>
          )}

          <div className="rt-grid">
            {filtered.map(t => (
              <div
                key={t.id}
                className={`rt-card ${hoveredId === t.id ? 'rt-card--hovered' : ''}`}
                onMouseEnter={() => setHoveredId(t.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  className="rt-preview-box"
                  onClick={() => setPreviewTemplate(t.id)}
                >
                  <div className="rt-preview-scale-wrapper">
                    <ResumeTemplateRenderer template={t.id} resumeData={sampleForTemplate(t.id)} preview />
                  </div>

                  <div className="rt-overlay">
                    <button
                      className="rt-btn-preview"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewTemplate(t.id);
                      }}
                    >
                      <i className="fa-solid fa-eye"></i> Preview
                    </button>
                  </div>
                </div>

                <h4 className="rt-card-name" onClick={() => openStartChoice(t.id)}>{t.name}</h4>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="no-results">
              <i className="fa-solid fa-search"></i>
              <p>No templates match your filters.</p>
              <button className="btn btn-secondary" onClick={() => { setCatFilter('all'); setSearch(''); }}>Clear Filters</button>
            </div>
          )}
        </div>
      </section>

      {previewTemplate && (
        <div className="rt-modal-backdrop" onClick={() => setPreviewTemplate(null)}>
          <div className="rt-modal" onClick={(e) => e.stopPropagation()}>
            <div className="rt-modal-header">
              <h3>{RESUME_TEMPLATES.find(t => t.id === previewTemplate)?.name} — Preview</h3>
              <div className="rt-modal-actions">
                <button
                  className="rt-modal-use-btn"
                  onClick={() => {
                    setStartTemplate(previewTemplate);
                  }}
                >
                  <i className="fa-solid fa-edit"></i>
                  Use template
                </button>
                <button className="rt-modal-close" onClick={() => setPreviewTemplate(null)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
            <div className="rt-modal-body">
              <div className="rt-modal-resume">
                <ResumeTemplateRenderer template={previewTemplate} resumeData={sampleForTemplate(previewTemplate)} preview />
              </div>
            </div>
          </div>
        </div>
      )}
      {startTemplate && (
        <StartModeModal
          templateId={startTemplate}
          onClose={() => setStartTemplate(null)}
          onChoose={beginCustomizer}
        />
      )}
    </main>
  );
}
