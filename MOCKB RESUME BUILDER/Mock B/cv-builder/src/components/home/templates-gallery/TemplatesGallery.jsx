import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RESUME_TEMPLATES } from '../../../config/templates';
import { COVER_LETTER_TEMPLATES } from '../../../config/coverLetterTemplates';
import { sampleForTemplate } from '../../../data/sampleResumeData';
import { sampleForCoverLetter } from '../../../data/sampleCoverLetterData';
import ResumeTemplateThumb from '../../resume/ResumeTemplateThumb';
import CoverLetterRenderer from '../../cover-letter/CoverLetterRenderer';
import TemplatePreviewModal from '../../resume/TemplatePreviewModal';
import StartModeModal from '../../resume/StartModeModal';
import './TemplatesGallery.css';
import '../../../pages/ResumeTemplates.css';

const tagLabel = (category) => (
  category === 'cover-letters' ? 'Cover Letter' : 'Resume'
);

export default function TemplatesGallery() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);
  const [startChoice, setStartChoice] = useState(null);
  const [previewChoice, setPreviewChoice] = useState(null);

  const galleryCards = useMemo(() => {
    const resumes = RESUME_TEMPLATES.map((t) => ({
      id: t.id,
      category: 'resumes',
      title: t.name,
      description: t.description,
      templateId: t.id,
    }));
    const letters = COVER_LETTER_TEMPLATES.map((t) => ({
      id: t.id,
      category: 'cover-letters',
      title: t.name,
      description: t.description,
      coverLetterTemplateId: t.id,
    }));
    return [...resumes, ...letters];
  }, []);

  const cardStep = () => {
    const slider = sliderRef.current;
    const card = slider?.querySelector('.template-card');
    if (!slider || !card) return 360;
    const gap = parseFloat(getComputedStyle(slider).columnGap || getComputedStyle(slider).gap) || 24;
    return card.getBoundingClientRect().width + gap;
  };

  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        const slider = sliderRef.current;
        if (!slider) return;
        const step = cardStep();

        if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 12) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: step, behavior: 'smooth' });
        }
      }, 2800);
    };

    const stopAutoPlay = () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };

    startAutoPlay();

    const sliderElement = sliderRef.current;
    if (sliderElement) {
      sliderElement.addEventListener('mouseenter', stopAutoPlay);
      sliderElement.addEventListener('mouseleave', startAutoPlay);
    }

    return () => {
      stopAutoPlay();
      if (sliderElement) {
        sliderElement.removeEventListener('mouseenter', stopAutoPlay);
        sliderElement.removeEventListener('mouseleave', startAutoPlay);
      }
    };
  }, [activeFilter]);

  const handlePrev = () => {
    sliderRef.current?.scrollBy({ left: -cardStep(), behavior: 'smooth' });
  };

  const handleNext = () => {
    sliderRef.current?.scrollBy({ left: cardStep(), behavior: 'smooth' });
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const filteredCards = galleryCards.filter(
    (card) => activeFilter === 'all' || card.category === activeFilter
  );

  const openTemplateChoice = (kind, templateId) => {
    setStartChoice({ kind, templateId });
  };

  const openPreview = (kind, templateId, title) => {
    setPreviewChoice({ kind, templateId, title });
  };

  const beginCustomizer = (mode) => {
    if (!startChoice?.templateId) return;
    const { kind, templateId } = startChoice;
    setStartChoice(null);
    if (kind === 'cover-letter') {
      navigate('/cover-letter/customizer', { state: { template: templateId, startMode: mode } });
      return;
    }
    navigate('/resume/customizer', { state: { template: templateId, startMode: mode } });
  };

  return (
    <section id="templates-gallery" className="container">
      <div className="gallery-header">
        <div className="header-content">
          <h2>Templates Gallery</h2>
          <p>Hand-crafted templates designed by experts to help you get hired.</p>
        </div>
        <div className="gallery-tabs">
          <button type="button" className={`tab-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => handleFilterChange('all')}>All</button>
          <button type="button" className={`tab-btn ${activeFilter === 'resumes' ? 'active' : ''}`} onClick={() => handleFilterChange('resumes')}>Resumes</button>
          <button type="button" className={`tab-btn ${activeFilter === 'cover-letters' ? 'active' : ''}`} onClick={() => handleFilterChange('cover-letters')}>Cover Letters</button>
        </div>
      </div>

      <div className="slider-container">
        <div className="gallery-slider" ref={sliderRef} id="template-slider">
          {filteredCards.map((card) => {
            const templateId = card.templateId || card.coverLetterTemplateId || card.id;
            const kind = card.templateId ? 'resume' : 'cover-letter';
            const useTemplate = () => openTemplateChoice(kind, templateId);
            const previewTemplate = (e) => {
              e.stopPropagation();
              openPreview(kind, templateId, card.title);
            };

            return (
              <div
                className={`template-card-wrap${hoveredId === templateId ? ' template-card-wrap--hovered' : ''}`}
                key={templateId}
                data-template-id={templateId}
                onMouseEnter={() => setHoveredId(templateId)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <button type="button" className="template-card" onClick={useTemplate}>
                  <div className="card-image">
                    {card.templateId ? (
                      <div className="rt-preview-box">
                        <ResumeTemplateThumb
                          template={card.templateId}
                          resumeData={sampleForTemplate(card.templateId)}
                        />
                      </div>
                    ) : card.coverLetterTemplateId ? (
                      <div className="rt-preview-box">
                        <div className="rt-preview-scale-wrapper">
                          <CoverLetterRenderer
                            template={card.coverLetterTemplateId}
                            letterData={sampleForCoverLetter(card.coverLetterTemplateId)}
                            preview
                          />
                        </div>
                      </div>
                    ) : (
                      <img src={card.image} alt={card.title} />
                    )}
                    <div className="rt-overlay">
                      <button type="button" className="rt-btn-preview" onClick={previewTemplate}>
                        <i className="fa-solid fa-eye"></i> Preview
                      </button>
                    </div>
                  </div>
                  <div className="card-info">
                    <span className="card-tag">{tagLabel(card.category)}</span>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        <div className="slider-controls">
          <button type="button" className="slider-btn prev" onClick={handlePrev}><i className="fa-solid fa-chevron-left"></i></button>
          <button type="button" className="slider-btn next" onClick={handleNext}><i className="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link
          to={activeFilter === 'cover-letters' ? '/cover-letter/templates' : '/resume/templates'}
          state={{ scrollToLibrary: true }}
          className="btn btn-primary"
        >
          View All Templates
        </Link>
      </div>

      {previewChoice && (
        <TemplatePreviewModal
          title={previewChoice.title}
          templateId={previewChoice.templateId}
          kind={previewChoice.kind}
          resumeData={previewChoice.kind === 'resume' ? sampleForTemplate(previewChoice.templateId) : undefined}
          letterData={previewChoice.kind === 'cover-letter' ? sampleForCoverLetter(previewChoice.templateId) : undefined}
          onClose={() => setPreviewChoice(null)}
          onUseTemplate={() => {
            const next = { kind: previewChoice.kind, templateId: previewChoice.templateId };
            setPreviewChoice(null);
            setStartChoice(next);
          }}
        />
      )}
      {startChoice && (
        <StartModeModal
          templateId={startChoice.templateId}
          kind={startChoice.kind}
          onClose={() => setStartChoice(null)}
          onChoose={beginCustomizer}
        />
      )}
    </section>
  );
}
