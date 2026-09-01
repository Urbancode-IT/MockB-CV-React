import { useState, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { COVER_LETTER_TEMPLATES, getCoverLetterTemplateById } from '../config/coverLetterTemplates';
import { sampleForCoverLetter } from '../data/sampleCoverLetterData';
import CoverLetterRenderer from '../components/cover-letter/CoverLetterRenderer';
import TemplatePreviewModal from '../components/resume/TemplatePreviewModal';
import StartModeModal from '../components/resume/StartModeModal';
import {
    listUserCoverLetters,
    deleteUserCoverLetter,
    listUserCoverLetterTemplates,
    deleteUserCoverLetterTemplate,
} from '../utils/coverLetterLibrary';
import './ResumeTemplates.css';

export default function CoverLetterTemplates() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredId, setHoveredId] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [startTemplate, setStartTemplate] = useState(null);
  const [userTemplates, setUserTemplates] = useState(() => listUserCoverLetterTemplates());
  const [userLetters, setUserLetters] = useState(() => listUserCoverLetters());
  const [libraryView, setLibraryView] = useState('library');

  useLayoutEffect(() => {
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const hash = location.hash.replace('#', '');
    const goLibrary = Boolean(location.state?.scrollToLibrary) || hash === 'library-templates';
    if (hash === 'your-cover-letters') setLibraryView('letters');
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

  const openStartChoice = (templateId) => setStartTemplate(templateId);

  const openUserLetter = (item) => {
    navigate('/cover-letter/customizer', {
      state: {
        restoreUserLetter: item,
        userLetterId: item.id,
        userTemplateId: item.userTemplateId,
        userTemplateName: item.userTemplateName,
        template: item.selectedTemplate,
      },
    });
  };

  const openSavedTemplate = (item) => {
    navigate('/cover-letter/customizer', {
      state: {
        template: item.baseTemplate,
        startMode: 'sample',
        userTemplateId: item.id,
        userTemplateName: item.name,
        savedDesign: item.design,
      },
    });
  };

  const beginCustomizer = (mode) => {
    const template = startTemplate || previewTemplate;
    if (!template) return;
    setStartTemplate(null);
    setPreviewTemplate(null);
    navigate('/cover-letter/customizer', { state: { template, startMode: mode } });
  };

  return (
    <main className="rt-page">
      <section className="rt-hero">
        <div className="container">
          <h1>Professional <span>Cover Letter</span></h1>
          <p>One ATS-friendly letter layout. Customize colors, type, and margins, then download a PDF.</p>
        </div>
      </section>

      <section className="rt-filters-bar" id="library-templates">
        <div className="container">
          <div className="filters-row">
            <div className="filter-group rt-view-switch" style={{ marginLeft: 0 }}>
              <button
                type="button"
                className={`rt-view-btn ${libraryView === 'library' ? 'active' : ''}`}
                onClick={() => setLibraryView('library')}
              >
                Library templates
              </button>
              <button
                type="button"
                className={`rt-view-btn ${libraryView === 'letters' ? 'active' : ''}`}
                onClick={() => setLibraryView('letters')}
              >
                Your cover letters{userLetters.length ? ` (${userLetters.length})` : ''}
              </button>
              <button
                type="button"
                className={`rt-view-btn ${libraryView === 'templates' ? 'active' : ''}`}
                onClick={() => setLibraryView('templates')}
              >
                Your cover letter templates{userTemplates.length ? ` (${userTemplates.length})` : ''}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="rt-grid-section">
        <div className="container">
          {libraryView === 'letters' && (
            <>
              {userLetters.length === 0 ? (
                <div className="no-results">
                  <i className="fa-solid fa-envelope-open-text"></i>
                  <p>No saved cover letters yet. Open the library template, edit it, and click Save.</p>
                  <button type="button" className="btn btn-secondary" onClick={() => setLibraryView('library')}>Browse library</button>
                </div>
              ) : (
                <div className="rt-grid">
                  {userLetters.map((item) => {
                    const base = getCoverLetterTemplateById(item.selectedTemplate);
                    return (
                      <div key={item.id} className="rt-card">
                        <div className="rt-preview-box" onClick={() => openUserLetter(item)}>
                          <div className="rt-preview-scale-wrapper">
                            <CoverLetterRenderer template={item.selectedTemplate} letterData={item.letterData} preview />
                          </div>
                        </div>
                        <div className="rt-mine-meta">
                          <h4 className="rt-card-name" onClick={() => openUserLetter(item)}>{item.name}</h4>
                          <button
                            type="button"
                            className="rt-mine-delete"
                            onClick={() => setUserLetters(deleteUserCoverLetter(item.id))}
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
                  <p>No saved templates yet. Customize the design and choose Save as template.</p>
                  <button type="button" className="btn btn-secondary" onClick={() => setLibraryView('library')}>Browse library</button>
                </div>
              ) : (
                <div className="rt-grid">
                  {userTemplates.map((item) => {
                    const sample = sampleForCoverLetter(item.baseTemplate);
                    const previewData = { ...sample, design: { ...(sample.design || {}), ...(item.design || {}) } };
                    const base = getCoverLetterTemplateById(item.baseTemplate);
                    return (
                      <div key={item.id} className="rt-card">
                        <div className="rt-preview-box" onClick={() => openSavedTemplate(item)}>
                          <div className="rt-preview-scale-wrapper">
                            <CoverLetterRenderer template={item.baseTemplate} letterData={previewData} preview />
                          </div>
                        </div>
                        <div className="rt-mine-meta">
                          <h4 className="rt-card-name" onClick={() => openSavedTemplate(item)}>{item.name}</h4>
                          <button
                            type="button"
                            className="rt-mine-delete"
                            onClick={() => setUserTemplates(deleteUserCoverLetterTemplate(item.id))}
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
            <div className="rt-grid">
              {COVER_LETTER_TEMPLATES.map((t) => (
                <div
                  key={t.id}
                  className={`rt-card ${hoveredId === t.id ? 'rt-card--hovered' : ''}`}
                  onMouseEnter={() => setHoveredId(t.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="rt-preview-box" onClick={() => setPreviewTemplate(t.id)}>
                    <div className="rt-preview-scale-wrapper">
                      <CoverLetterRenderer template={t.id} letterData={sampleForCoverLetter(t.id)} preview />
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
          )}
        </div>
      </section>

      {previewTemplate && (
        <TemplatePreviewModal
          title={getCoverLetterTemplateById(previewTemplate).name}
          templateId={previewTemplate}
          kind="cover-letter"
          letterData={sampleForCoverLetter(previewTemplate)}
          onClose={() => setPreviewTemplate(null)}
          onUseTemplate={() => {
            setStartTemplate(previewTemplate);
            setPreviewTemplate(null);
          }}
        />
      )}
      {startTemplate && (
        <StartModeModal
          kind="cover-letter"
          templateId={startTemplate}
          onClose={() => setStartTemplate(null)}
          onChoose={beginCustomizer}
        />
      )}
    </main>
  );
}
