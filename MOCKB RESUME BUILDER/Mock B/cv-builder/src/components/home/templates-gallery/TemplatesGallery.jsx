import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RESUME_TEMPLATES } from '../../../config/templates';
import { COVER_LETTER_TEMPLATES } from '../../../config/coverLetterTemplates';
import { sampleForTemplate } from '../../../data/sampleResumeData';
import { sampleForCoverLetter } from '../../../data/sampleCoverLetterData';
import ResumeTemplateRenderer from '../../resume/ResumeTemplateRenderer';
import CoverLetterRenderer from '../../cover-letter/CoverLetterRenderer';
import './TemplatesGallery.css';
import '../../../pages/ResumeTemplates.css';

const EXTRA_CARDS = [
  {
    id: 'port-1',
    category: 'portfolios',
    title: 'Developer Hub',
    description: 'Dark-themed, project-focused portfolio design.',
    image: '/images/templates.png',
  },
];

const tagLabel = (category) => {
  if (category === 'resumes') return 'Resume';
  if (category === 'cover-letters') return 'Cover Letter';
  return 'Portfolio';
};

export default function TemplatesGallery() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);

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
    return [...resumes, ...letters, ...EXTRA_CARDS];
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

  const openResumeTemplate = (templateId) => {
    navigate('/resume/customizer', { state: { template: templateId, startMode: 'sample' } });
  };

  return (
    <section id="templates-gallery" className="container">
      <div className="gallery-header">
        <div className="header-content">
          <h2>Templates Gallery</h2>
          <p>Hand-crafted templates designed by experts to help you get hired.</p>
        </div>
        <div className="gallery-tabs">
          <button className={`tab-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => handleFilterChange('all')}>All</button>
          <button className={`tab-btn ${activeFilter === 'resumes' ? 'active' : ''}`} onClick={() => handleFilterChange('resumes')}>Resumes</button>
          <button className={`tab-btn ${activeFilter === 'cover-letters' ? 'active' : ''}`} onClick={() => handleFilterChange('cover-letters')}>Cover Letters</button>
          <button className={`tab-btn ${activeFilter === 'portfolios' ? 'active' : ''}`} onClick={() => handleFilterChange('portfolios')}>Portfolios</button>
        </div>
      </div>

      <div className="slider-container">
        <div className="gallery-slider" ref={sliderRef} id="template-slider">
          {filteredCards.map((card) => {
            const templateId = card.templateId || card.coverLetterTemplateId || card.id;
            const openCard = () => {
              if (card.templateId) openResumeTemplate(card.templateId);
              else if (card.coverLetterTemplateId) {
                navigate('/cover-letter/customizer', {
                  state: { template: card.coverLetterTemplateId, startMode: 'sample' },
                });
              }
              else if (card.category === 'portfolios') navigate('/portfolio-builder');
            };
            return (
            <div
              className="template-card"
              key={templateId}
              data-template-id={templateId}
              role="button"
              tabIndex={0}
              onClick={openCard}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openCard();
                }
              }}
            >
              <div className="card-image">
                {card.templateId ? (
                  <div className="rt-preview-box">
                    <div className="rt-preview-scale-wrapper">
                      <ResumeTemplateRenderer
                        template={card.templateId}
                        resumeData={sampleForTemplate(card.templateId)}
                        preview
                      />
                    </div>
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
              </div>
              <div className="card-info">
                <span className="card-tag">{tagLabel(card.category)}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
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
    </section>
  );
}
