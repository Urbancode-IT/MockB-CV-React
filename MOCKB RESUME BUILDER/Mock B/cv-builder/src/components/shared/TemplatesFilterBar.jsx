import React from 'react';

/**
 * Shared filter chrome for Resume / Cover Letter / Portfolio template galleries.
 */
export default function TemplatesFilterBar({
  search = '',
  onSearchChange,
  searchPlaceholder = 'Search templates...',
  styleOptions = [],
  styleValue,
  onStyleChange,
  pageOptions = [],
  pageValue,
  onPageChange,
  roleOptions = [],
  roleValue,
  onRoleChange,
  showRoleRow = false,
  viewOptions = [],
  viewValue,
  onViewChange,
  trailing = null,
  resultCount = null,
}) {
  const showLibraryFilters = !viewValue || viewValue === 'library' || viewOptions.length === 0;
  const activeStyleLabel = (() => {
    if (!styleOptions.length) return null;
    const hit = styleOptions.find((opt) => (typeof opt === 'string' ? opt : opt.id) === styleValue);
    if (!hit) return null;
    return typeof hit === 'string' ? hit.charAt(0).toUpperCase() + hit.slice(1) : hit.label;
  })();

  return (
    <section className="rt-filters-bar" id="library-templates">
      <div className="container">
        <div className="rt-filter-panel">
          <div className="rt-filter-panel__glow" aria-hidden="true" />

          {viewOptions.length > 0 && (
            <div className="rt-filter-tabs" role="tablist" aria-label="Library views">
              {viewOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  role="tab"
                  aria-selected={viewValue === opt.id}
                  className={`rt-filter-tab ${viewValue === opt.id ? 'active' : ''}`}
                  onClick={() => onViewChange?.(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          <div className="rt-filter-panel__body">
            <div className="rt-filter-toolbar">
              {typeof onSearchChange === 'function' && (
                <label className="rt-search">
                  <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
                  <input
                    type="search"
                    placeholder={searchPlaceholder}
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    aria-label="Search templates"
                  />
                  {search ? (
                    <button
                      type="button"
                      className="rt-search-clear"
                      onClick={() => onSearchChange('')}
                      aria-label="Clear search"
                    >
                      <i className="fa-solid fa-xmark" />
                    </button>
                  ) : null}
                </label>
              )}

              <div className="rt-filter-meta">
                {resultCount != null && (
                  <span className="rt-filter-count">
                    <strong>{resultCount}</strong> template{resultCount === 1 ? '' : 's'}
                  </span>
                )}
                {activeStyleLabel && showLibraryFilters && (
                  <span className="rt-filter-pill-hint">{activeStyleLabel}</span>
                )}
                {trailing}
              </div>
            </div>

            {showLibraryFilters && (styleOptions.length > 0 || pageOptions.length > 0) && (
              <div className="rt-filter-groups">
                {styleOptions.length > 0 && (
                  <div className="rt-filter-group-card">
                    <div className="rt-filter-group-head">
                      <i className="fa-solid fa-palette" aria-hidden="true" />
                      <span>Style</span>
                    </div>
                    <div className="rt-seg" role="group" aria-label="Style filters">
                      {styleOptions.map((opt) => {
                        const id = typeof opt === 'string' ? opt : opt.id;
                        const label = typeof opt === 'string'
                          ? opt.charAt(0).toUpperCase() + opt.slice(1)
                          : opt.label;
                        return (
                          <button
                            key={id}
                            type="button"
                            className={`rt-seg-btn ${styleValue === id ? 'active' : ''}`}
                            onClick={() => onStyleChange?.(id)}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {pageOptions.length > 0 && (
                  <div className="rt-filter-group-card">
                    <div className="rt-filter-group-head">
                      <i className="fa-solid fa-file-lines" aria-hidden="true" />
                      <span>Pages</span>
                    </div>
                    <div className="rt-seg" role="group" aria-label="Page length filters">
                      {pageOptions.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          className={`rt-seg-btn ${pageValue === opt.id ? 'active' : ''}`}
                          onClick={() => onPageChange?.(opt.id)}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {showLibraryFilters && showRoleRow && roleOptions.length > 0 && (
              <div className="rt-role-panel">
                <div className="rt-role-panel__head">
                  <div>
                    <span className="rt-role-panel__title">Browse by role</span>
                    <p className="rt-role-panel__sub">Jump straight to domain-ready resume layouts</p>
                  </div>
                </div>
                <div className="rt-role-grid" role="group" aria-label="Role filters">
                  {roleOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`rt-role-chip ${roleValue === opt.id ? 'active' : ''}`}
                      onClick={() => onRoleChange?.(opt.id)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
