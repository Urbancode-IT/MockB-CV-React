import { useState, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RESUME_TEMPLATES, getTemplateById } from '../config/templates';
import { sampleForTemplate } from '../data/sampleResumeData';
import ResumeTemplateRenderer from '../components/resume/ResumeTemplateRenderer';
import StartModeModal from '../components/resume/StartModeModal';
import { listUserTemplates, deleteUserTemplate, listUserResumes, deleteUserResume } from '../utils/userLibrary';
import './ResumeTemplates.css';

const categories = ['all', 'professional', 'modern'];

export default function ResumeTemplates() {
  const navigate = useNavigate();
  const location = useLocation();
  const [catFilter, setCatFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [hoveredId, setHoveredId] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [startTemplate, setStartTemplate] = useState(null);
  const [userTemplates, setUserTemplates] = useState(() => listUserTemplates());
  const [userResumes, setUserResumes] = useState(() => listUserResumes());
  const [libraryView, setLibraryView] = useState('library'); // 'library' | 'resumes' | 'templates'

  useLayoutEffect(() => {
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const hash = location.hash.replace('#', '');
    const goLibrary = Boolean(location.state?.scrollToLibrary) || hash === 'library-templates';
    if (hash === 'your-resumes') setLibraryView('resumes');
    else if (hash === 'your-templates') setLibraryView('templates');
    else if (goLibrary) setLibraryView('library');

    const jumpToLibrary = () => {
      const el = document.getElementById(hash || 'library-templates');
      const target = el || document.getElementById('library-templates');
      if (!goLibrary && !hash) {
        window.scrollTo(0, 0);
        return;
      }
      if (!target) {
        window.scrollTo(0, 0);
        return;
      }
      const headerOffset = 96;
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset);
      window.scrollTo(0, top);
    };

    jumpToLibrary();
    const frame = window.requestAnimationFrame(jumpToLibrary);

    return () => {
      window.cancelAnimationFrame(frame);
      window.history.scrollRestoration = prev;
    };
  }, [location.hash, location.state]);

  const filtered = RESUME_TEMPLATES.filter(t => {
    const matchCat = catFilter === 'all' || t.category === catFilter;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openStartChoice = (templateId) => {
    setStartTemplate(templateId);
  };

  const openUserResume = (item) => {
    const state = {
      restoreUserResume: item,
      userResumeId: item.id,
      userTemplateId: item.userTemplateId,
      userTemplateName: item.userTemplateName,
      template: item.selectedTemplate,
    };
    if (item.resumeId) navigate(`/resume/customizer/${item.resumeId}`, { state });
    else navigate('/resume/customizer', { state });
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
      <section className="rt-filters-bar" id="library-templates">
        <div className="container">
          <div className="filters-row">
            <div className="search-box">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Search templates..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            {libraryView === 'library' && (
              <div className="filter-group">
                <span className="filter-label">Style:</span>
                {categories.map(c => (
                  <button key={c} className={`filter-btn ${catFilter === c ? 'active' : ''}`} onClick={() => setCatFilter(c)}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </button>
                ))}
              </div>
            )}
            <div className="filter-group rt-view-switch">
              <button
                type="button"
                className={`rt-view-btn ${libraryView === 'library' ? 'active' : ''}`}
                onClick={() => setLibraryView('library')}
              >
                Library templates
              </button>
              <button
                type="button"
                className={`rt-view-btn ${libraryView === 'resumes' ? 'active' : ''}`}
                onClick={() => setLibraryView('resumes')}
              >
                Your resumes{userResumes.length ? ` (${userResumes.length})` : ''}
              </button>
              <button
                type="button"
                className={`rt-view-btn ${libraryView === 'templates' ? 'active' : ''}`}
                onClick={() => setLibraryView('templates')}
              >
                Your templates{userTemplates.length ? ` (${userTemplates.length})` : ''}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Template Grid */}
      <section className="rt-grid-section">
        <div className="container">
          {libraryView === 'resumes' && (
            <>
              {userResumes.length === 0 ? (
                <div className="no-results">
                  <i className="fa-solid fa-file-lines"></i>
                  <p>No saved resumes yet. Open a library template, edit it, and click Save.</p>
                  <button type="button" className="btn btn-secondary" onClick={() => setLibraryView('library')}>Browse library</button>
                </div>
              ) : (
                <div className="rt-grid">
                  {userResumes.map((item) => {
                    const base = getTemplateById(item.selectedTemplate);
                    return (
                      <div key={item.id} className="rt-card">
                        <div className="rt-preview-box" onClick={() => openUserResume(item)}>
                          <div className="rt-preview-scale-wrapper">
                            <ResumeTemplateRenderer template={item.selectedTemplate} resumeData={item.resumeData} preview />
                          </div>
                        </div>
                        <div className="rt-mine-meta">
                          <h4 className="rt-card-name" onClick={() => openUserResume(item)}>{item.name}</h4>
                          <button
                            type="button"
                            className="rt-mine-delete"
                            onClick={() => setUserResumes(deleteUserResume(item.id))}
                            aria-label={`Delete ${item.name}`}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                        <p className="rt-mine-base">
                          {base.name}
                          {item.updatedAt ? ` · ${new Date(item.updatedAt).toLocaleString()}` : ''}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {libraryView === 'templates' && (
            <>
              {userTemplates.length === 0 ? (
                <div className="no-results">
                  <i className="fa-solid fa-palette"></i>
                  <p>No saved templates yet. Customize a design and choose Save as template.</p>
                  <button type="button" className="btn btn-secondary" onClick={() => setLibraryView('library')}>Browse library</button>
                </div>
              ) : (
                <div className="rt-grid">
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
              )}
            </>
          )}

          {libraryView === 'library' && (
            <>
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
            </>
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
