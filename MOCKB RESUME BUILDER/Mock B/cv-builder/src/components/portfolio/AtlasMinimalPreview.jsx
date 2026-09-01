import { useRef, useEffect } from 'react';
import { normalizePortfolioContent } from '../../portfolio-templates/atlas-minimal/generateFiles';
import './AtlasMinimalPreview.css';

const SectionHead = ({ title, subtitle }) => (
  <div className="amp-section-head">
    <h2>{title}</h2>
    {subtitle ? <p>{subtitle}</p> : null}
  </div>
);

function EditableText({
  tag: Tag = 'span',
  field,
  value,
  editable,
  onChange,
  className,
}) {
  const ref = useRef(null);
  const isEditingRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || isEditingRef.current) return;
    const next = value ?? '';
    if (el.textContent !== next) {
      el.textContent = next;
    }
  }, [value, editable]);

  if (!editable) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      ref={ref}
      className={className}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => {
        isEditingRef.current = true;
      }}
      onBlur={(e) => {
        isEditingRef.current = false;
        onChange?.(field, e.currentTarget.textContent || '');
      }}
    />
  );
}

export default function AtlasMinimalPreview({
  content,
  accentColor = '#2563EB',
  compact = false,
  editable = false,
  onChange,
}) {
  const d = normalizePortfolioContent(content);
  const initials = d.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  const style = { '--amp-accent': accentColor, '--amp-accent-soft': `${accentColor}22` };

  return (
    <div className={`amp-root${compact ? ' amp-root--compact' : ''}`} style={style}>
      <header className="amp-header">
        <div className="amp-container amp-nav">
          <div className="amp-brand">{initials}</div>
          <nav className="amp-nav-links">
            <span>About</span>
            <span>Projects</span>
            <span>Experience</span>
            <span>Contact</span>
          </nav>
        </div>
      </header>

      <section className="amp-hero">
        <div className="amp-container amp-hero-grid">
          <div>
            <div className="amp-eyebrow">Portfolio</div>
            <EditableText tag="h1" field="name" value={d.name} editable={editable} onChange={onChange} />
            <EditableText tag="p" field="tagline" value={d.tagline} editable={editable} onChange={onChange} className="amp-lead" />
            <div className="amp-hero-actions">
              <span className="amp-btn amp-btn-primary">View projects</span>
              <span className="amp-btn amp-btn-ghost">Contact me</span>
            </div>
          </div>
          <aside className="amp-hero-card">
            <EditableText tag="div" field="role" value={d.role} editable={editable} onChange={onChange} className="amp-eyebrow" />
            <EditableText tag="p" field="bio" value={d.bio} editable={editable} onChange={onChange} />
            <div className="amp-stat-grid">
              <div className="amp-stat"><strong>{d.stats.years}</strong>Years experience</div>
              <div className="amp-stat"><strong>{d.stats.projects}</strong>Projects shipped</div>
              <div className="amp-stat"><strong>{d.stats.clients}</strong>Teams served</div>
              <div className="amp-stat"><strong>{d.stats.satisfaction}</strong>Satisfaction</div>
            </div>
          </aside>
        </div>
      </section>

      <section className="amp-section amp-section-alt">
        <div className="amp-container amp-about-grid">
          <div>
            <SectionHead title="About me" subtitle="A quick snapshot of what I do." />
            <p>{d.bio}</p>
            {d.education ? <p className="amp-muted-line"><strong>Education:</strong> {d.education}</p> : null}
          </div>
          <div>
            <SectionHead title="Skills" subtitle="Tools I use every week." />
            <div className="amp-chip-list">
              {d.skills.map((skill, index) => (
                <EditableText
                  key={`skill-${index}`}
                  tag="span"
                  field={`skill_${index}`}
                  value={skill}
                  editable={editable}
                  onChange={onChange}
                  className="amp-chip"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="amp-section">
        <div className="amp-container">
          <SectionHead title="Selected work" subtitle="Recent projects with outcomes." />
          <div className="amp-project-grid">
            {d.projects.map((project, index) => (
              <article className="amp-project-card" key={`project-${index}`}>
                <EditableText
                  tag="h3"
                  field={`project_${index}_name`}
                  value={project.name}
                  editable={editable}
                  onChange={onChange}
                />
                <EditableText
                  tag="p"
                  field={`project_${index}_description`}
                  value={project.description}
                  editable={editable}
                  onChange={onChange}
                />
                <div className="amp-chip-list">
                  {(project.tech || []).map((item) => <span className="amp-chip" key={item}>{item}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="amp-section amp-section-alt">
        <div className="amp-container">
          <SectionHead title="Experience" subtitle="Roles with real impact." />
          <div className="amp-timeline">
            {d.experience.map((item, index) => (
              <article className="amp-timeline-item" key={`experience-${index}`}>
                <div>
                  <EditableText
                    tag="strong"
                    field={`exp_${index}_role`}
                    value={item.role}
                    editable={editable}
                    onChange={onChange}
                  />
                  <EditableText
                    tag="div"
                    field={`exp_${index}_company`}
                    value={item.company}
                    editable={editable}
                    onChange={onChange}
                  />
                  <EditableText
                    tag="span"
                    field={`exp_${index}_period`}
                    value={item.period}
                    editable={editable}
                    onChange={onChange}
                  />
                </div>
                <EditableText
                  tag="p"
                  field={`exp_${index}_description`}
                  value={item.description}
                  editable={editable}
                  onChange={onChange}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="amp-section">
        <div className="amp-container">
          <div className="amp-contact-card">
            <SectionHead title="Let's work together" subtitle="Reach out for roles or collaboration." />
            <div className="amp-contact-list">
              {d.email ? <div>Email: {d.email}</div> : null}
              {d.location ? <div>Location: {d.location}</div> : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
