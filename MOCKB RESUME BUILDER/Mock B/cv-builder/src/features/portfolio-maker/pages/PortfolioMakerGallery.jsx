import { useState, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PORTFOLIO_MAKER_TEMPLATES, getMakerTemplate } from '../config/catalog';
import { contentForTemplate } from '../data/defaultContent';
import TemplateThumbShowcase from '../components/TemplateThumbShowcase';
import TemplatesFilterBar from '../../../components/shared/TemplatesFilterBar';
import {
  listUserPortfolios,
  deleteUserPortfolio,
  listUserPortfolioTemplates,
  deleteUserPortfolioTemplate,
} from '../utils/portfolioLibrary';
import '../../../pages/ResumeTemplates.css';
import './PortfolioMakerGallery.css';

const styleOptions = [
  { id: 'all', label: 'All' },
  { id: 'developer', label: 'Developer' },
  { id: 'designer', label: 'Designer' },
  { id: 'editorial', label: 'Editorial' },
];

export default function PortfolioMakerGallery() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [styleFilter, setStyleFilter] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);
  const [libraryView, setLibraryView] = useState('library');
  const [userPortfolios, setUserPortfolios] = useState(() => listUserPortfolios());
  const [userTemplates, setUserTemplates] = useState(() => listUserPortfolioTemplates());

  useLayoutEffect(() => {
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const hash = location.hash.replace('#', '');
    if (hash === 'your-portfolios') setLibraryView('portfolios');
    else if (hash === 'your-templates') setLibraryView('templates');
    else if (hash === 'library-templates' || location.state?.scrollToLibrary) setLibraryView('library');
    return () => {
      window.history.scrollRestoration = prev;
    };
  }, [location.hash, location.state]);

  const filtered = PORTFOLIO_MAKER_TEMPLATES.filter((t) => {
    const q = search.trim().toLowerCase();
    const matchSearch = !q || [t.name, t.description, t.tagline, ...(t.tags || [])].join(' ').toLowerCase().includes(q);
    const matchStyle =
      styleFilter === 'all'
      || (t.tags || []).includes(styleFilter)
      || String(t.name || '').toLowerCase().includes(styleFilter);
    return matchSearch && matchStyle;
  });

  const openEditor = (templateId, mode = 'sample') => {
    navigate(`/portfolio-maker/edit/${templateId}`, { state: { startMode: mode } });
  };

  const openPreview = (templateId) => {
    navigate(`/portfolio-maker/preview/${templateId}`);
  };

  const openUserPortfolio = (item) => {
    navigate(`/portfolio-maker/edit/${item.selectedTemplate}`, {
      state: {
        restoreUserPortfolio: item,
        userPortfolioId: item.id,
        userTemplateId: item.userTemplateId,
        userTemplateName: item.userTemplateName,
        content: item.content,
        design: item.design,
        startMode: 'sample',
      },
    });
  };

  const openSavedTemplate = (item) => {
    navigate(`/portfolio-maker/edit/${item.baseTemplate}`, {
      state: {
        startMode: 'sample',
        userTemplateId: item.id,
        userTemplateName: item.name,
        design: item.design,
        content: contentForTemplate(item.baseTemplate, 'sample'),
      },
    });
  };

  return (
    <main className="rt-page pm-gallery-page">
      <section className="rt-hero">
        <div className="container">
          <h1>Professional <span>Portfolio Templates</span></h1>
          <p>
            Browse modern portfolio templates, save your work and custom designs,
            then download a complete React + Vite ZIP.
          </p>
        </div>
      </section>

      <TemplatesFilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search portfolio templates..."
        styleOptions={styleOptions}
        styleValue={styleFilter}
        onStyleChange={setStyleFilter}
        resultCount={libraryView === 'library' ? filtered.length : null}
        viewValue={libraryView}
        onViewChange={setLibraryView}
        viewOptions={[
          { id: 'library', label: 'Library templates' },
          { id: 'portfolios', label: `Your portfolios${userPortfolios.length ? ` (${userPortfolios.length})` : ''}` },
          { id: 'templates', label: `Your templates${userTemplates.length ? ` (${userTemplates.length})` : ''}` },
        ]}
      />

      <section className="pm-container pm-gallery-section" id="library-templates">
        {libraryView === 'portfolios' && (
          <>
            {userPortfolios.length === 0 ? (
              <div className="no-results">
                <i className="fa-solid fa-globe" />
                <p>No saved portfolios yet. Open a library template, edit it, and click Save.</p>
                <button type="button" className="btn btn-secondary" onClick={() => setLibraryView('library')}>
                  Browse library
                </button>
              </div>
            ) : (
              <div className="pm-grid">
                {userPortfolios.map((item) => {
                  const base = getMakerTemplate(item.selectedTemplate);
                  return (
                    <article key={item.id} className="pm-card">
                      <div className="pm-card-thumb" onClick={() => openUserPortfolio(item)} role="presentation">
                        <TemplateThumbShowcase
                          templateId={item.selectedTemplate}
                          content={item.content}
                          design={item.design}
                          playing={false}
                          loop={false}
                        />
                      </div>
                      <div className="pm-card-body">
                        <div className="pm-mine-meta">
                          <h2 className="pm-mine-name" onClick={() => openUserPortfolio(item)}>{item.name}</h2>
                          <button
                            type="button"
                            className="pm-mine-delete"
                            onClick={() => setUserPortfolios(deleteUserPortfolio(item.id))}
                            aria-label={`Delete ${item.name}`}
                          >
                            <i className="fa-solid fa-trash" />
                          </button>
                        </div>
                        <p className="pm-mine-base">
                          {base.name}
                          {item.updatedAt ? ` · ${new Date(item.updatedAt).toLocaleString()}` : ''}
                        </p>
                        <button type="button" className="pm-btn pm-btn-primary" onClick={() => openUserPortfolio(item)}>
                          Open portfolio
                        </button>
                      </div>
                    </article>
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
                <i className="fa-solid fa-palette" />
                <p>No saved templates yet. Customize the design and choose Save as template.</p>
                <button type="button" className="btn btn-secondary" onClick={() => setLibraryView('library')}>
                  Browse library
                </button>
              </div>
            ) : (
              <div className="pm-grid">
                {userTemplates.map((item) => {
                  const base = getMakerTemplate(item.baseTemplate);
                  return (
                    <article key={item.id} className="pm-card">
                      <div className="pm-card-thumb" onClick={() => openSavedTemplate(item)} role="presentation">
                        <TemplateThumbShowcase
                          templateId={item.baseTemplate}
                          design={item.design}
                          playing={false}
                          loop={false}
                        />
                      </div>
                      <div className="pm-card-body">
                        <div className="pm-mine-meta">
                          <h2 className="pm-mine-name" onClick={() => openSavedTemplate(item)}>{item.name}</h2>
                          <button
                            type="button"
                            className="pm-mine-delete"
                            onClick={() => setUserTemplates(deleteUserPortfolioTemplate(item.id))}
                            aria-label={`Delete ${item.name}`}
                          >
                            <i className="fa-solid fa-trash" />
                          </button>
                        </div>
                        <p className="pm-mine-base">
                          Based on {base.name}
                          {item.updatedAt ? ` · ${new Date(item.updatedAt).toLocaleString()}` : ''}
                        </p>
                        <button type="button" className="pm-btn pm-btn-primary" onClick={() => openSavedTemplate(item)}>
                          Use template
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}

        {libraryView === 'library' && (
          <>
            <div className="pm-grid">
              {filtered.map((template) => (
                <article
                  key={template.id}
                  className={`pm-card${hoveredId === template.id ? ' pm-card--hover' : ''}`}
                  onMouseEnter={() => setHoveredId(template.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="pm-card-thumb">
                    <TemplateThumbShowcase templateId={template.id} />
                    <div className="pm-card-overlay">
                      <button type="button" className="pm-btn pm-btn-ghost" onClick={() => openPreview(template.id)}>
                        <i className="fa-solid fa-eye" /> Live preview
                      </button>
                      <button type="button" className="pm-btn pm-btn-primary" onClick={() => openEditor(template.id)}>
                        Use template
                      </button>
                    </div>
                  </div>
                  <div className="pm-card-body">
                    <div className="pm-card-meta">
                      <span className="pm-tag">Free</span>
                      <span className="pm-framework">{template.framework}</span>
                    </div>
                    <h2>{template.name}</h2>
                    <p>{template.description}</p>
                    <ul className="pm-feature-list">
                      {template.features.slice(0, 3).map((f) => (
                        <li key={f}><i className="fa-solid fa-check" /> {f}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="no-results">
                <i className="fa-solid fa-filter" />
                <p>No portfolio templates match your filters.</p>
              </div>
            )}
          </>
        )}
      </section>

      {libraryView === 'library' ? (
        <section className="pm-steps">
          <div className="pm-container">
            <h2>How it works</h2>
            <div className="pm-steps-grid">
              <div className="pm-step">
                <span className="pm-step-num">01</span>
                <h3>Pick a template</h3>
                <p>Open the full-page preview to explore the layout before you commit.</p>
              </div>
              <div className="pm-step">
                <span className="pm-step-num">02</span>
                <h3>Save your work</h3>
                <p>Save the full portfolio, or save fonts and colors as Your templates.</p>
              </div>
              <div className="pm-step">
                <span className="pm-step-num">03</span>
                <h3>Download ZIP</h3>
                <p>Get React + Vite source code plus a README with npm install and run steps.</p>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
