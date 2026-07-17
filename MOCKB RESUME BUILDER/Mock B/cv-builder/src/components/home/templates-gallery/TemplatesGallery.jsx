import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './TemplatesGallery.css';

const TEMPLATE_CARDS = [
  {
    id: 'res-1',
    category: 'resumes',
    title: 'Professional Executive',
    description: 'Traditional layout with a modern professional touch.',
    image: '/images/RESUME TEMPLATES/file_00000000b96072089bcf803d41ea89ff.png'
  },
  {
    id: 'res-2',
    category: 'resumes',
    title: 'Modern Minimalist',
    description: 'Clean design that focuses on your core achievements.',
    image: '/images/RESUME TEMPLATES/file_00000000ca6c7208a76594f2e619499a.png'
  },
  {
    id: 'res-3',
    category: 'resumes',
    title: 'Creative Dynamic',
    description: 'Vibrant accents for creative and tech roles.',
    image: '/images/RESUME TEMPLATES/file_00000000f3207208b912c6c636a195a1.png'
  },
  {
    id: 'res-4',
    category: 'resumes',
    title: 'Corporate Standard',
    description: 'The industry standard for corporate applications.',
    image: '/images/RESUME TEMPLATES/file_00000000f19472089c50ad245caa766f.png'
  },
  {
    id: 'res-5',
    category: 'resumes',
    title: 'Sleek Professional',
    description: 'Elegant typography for a high-end impression.',
    image: '/images/RESUME TEMPLATES/file_00000000fe2872088873cdc9244f32f0.png'
  },
  {
    id: 'res-6',
    category: 'resumes',
    title: 'Modern ATS',
    description: 'Optimized for both human eyes and machine scanners.',
    image: '/images/RESUME TEMPLATES/file_000000006a3472089ff3c13bafb8cd20.png'
  },
  {
    id: 'res-7',
    category: 'resumes',
    title: 'Executive Flair',
    description: 'A touch of personality for leadership positions.',
    image: '/images/RESUME TEMPLATES/file_000000009a2872089daf10c7b99ee68d.png'
  },
  {
    id: 'res-8',
    category: 'resumes',
    title: 'Clean Corporate',
    description: 'Well-structured and easy to read layout.',
    image: '/images/RESUME TEMPLATES/file_000000009ea472089cfaeb69b3d89ae4.png'
  },
  {
    id: 'res-9',
    category: 'resumes',
    title: 'Minimalist Bold',
    description: 'Strong headings with ample white space.',
    image: '/images/RESUME TEMPLATES/file_0000000071d07208b294120670a628c3.png'
  },
  {
    id: 'res-10',
    category: 'resumes',
    title: 'Professional Grid',
    description: 'Highly organized multi-column architecture.',
    image: '/images/RESUME TEMPLATES/file_00000000057072088accbabd51e86f76.png'
  },
  {
    id: 'cl-1',
    category: 'cover-letters',
    title: 'Corporate Standard',
    description: 'Professional letterhead with elegant typography.',
    image: '/images/templates.png'
  },
  {
    id: 'port-1',
    category: 'portfolios',
    title: 'Developer Hub',
    description: 'Dark-themed, project-focused portfolio design.',
    image: '/images/templates.png'
  }
];

export default function TemplatesGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        const slider = sliderRef.current;
        if (!slider) return;
        
        if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 10) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: 350, behavior: 'smooth' });
        }
      }, 2000);
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
  }, []);

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const filteredCards = TEMPLATE_CARDS.filter(
    card => activeFilter === 'all' || card.category === activeFilter
  );

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
          {filteredCards.map((card) => (
            <div className="template-card" key={card.id}>
              <div className="card-image">
                <img src={card.image} alt={card.title} />
                <div className="card-tag">
                  {card.category === 'resumes' ? 'Resume' : card.category === 'cover-letters' ? 'Cover Letter' : 'Portfolio'}
                </div>
              </div>
              <div className="card-info">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="slider-controls">
          <button className="slider-btn prev" onClick={handlePrev}><i className="fa-solid fa-chevron-left"></i></button>
          <button className="slider-btn next" onClick={handleNext}><i className="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link to="/resume/templates" className="btn btn-primary">View All Templates</Link>
      </div>
    </section>
  );
}
