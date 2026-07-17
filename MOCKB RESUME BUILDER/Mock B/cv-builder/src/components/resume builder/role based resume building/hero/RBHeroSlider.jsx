import React, { useState, useEffect } from 'react';
import './RBHeroSlider.css';

const slides = [
  {
    content: (
      <>
        <div className="floating-element el-1 glass">
          <i className="fa-solid fa-bullseye" style={{ color: 'var(--primary-color)' }}></i>
          <span style={{ marginLeft: '10px' }}>Targeted Impact</span>
        </div>
        <div className="floating-element el-2 glass">
          <i className="fa-solid fa-wand-magic-sparkles" style={{ color: 'var(--primary-color)' }}></i>
          <span style={{ marginLeft: '10px' }}>AI Precision</span>
        </div>
        <div className="slide-content">
          <h1>Precision-Engineered <span>Role Based</span> Resumes</h1>
          <p>Stop using generic templates. MockB CV uses industry-specific algorithms to align your profile with the exact expectations of hiring managers in your field.</p>
        </div>
      </>
    ),
    btnText: 'Build My Resume',
    btnTarget: 'role-selection',
  },
  {
    content: (
      <>
        <div className="floating-element el-3 glass">
          <i className="fa-solid fa-user-tie" style={{ color: 'var(--primary-color)' }}></i>
          <span style={{ marginLeft: '10px' }}>Expert Design</span>
        </div>
        <div className="floating-element el-4 glass">
          <i className="fa-solid fa-check-double" style={{ color: 'var(--primary-color)' }}></i>
          <span style={{ marginLeft: '10px' }}>ATS Verified</span>
        </div>
        <div className="slide-content">
          <h1>Built by <span>Industry Experts</span> for You</h1>
          <p>Our templates are designed by senior recruiters to showcase your expertise with language that actually gets you noticed in a competitive market.</p>
        </div>
      </>
    ),
    btnText: 'View Templates',
    btnTarget: 'templates-gallery',
  },
  {
    content: (
      <div className="slide-content">
        <h1>Smart <span>Role-Specific</span> Optimization</h1>
        <p>Automatically align your resume with specific job requirements. Our AI ensures every bullet point is optimized for your target industry and role.</p>
      </div>
    ),
    btnText: 'Get Started Now',
    btnTarget: 'role-selection',
  },
];

export default function RBHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBtnClick = (target) => {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-slider-section">
      <div
        className="hero-slider-container"
        style={{ transform: `translateX(-${currentSlide * 33.333}%)`, width: '300%' }}
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="hero-slide" style={{ width: '100vw' }}>
            {slide.content}
            <div className="slide-content-btn">
              <button
                className="btn btn-primary btn-premium"
                onClick={() => handleBtnClick(slide.btnTarget)}
              >
                {slide.btnText}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="slider-nav">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`nav-dot ${currentSlide === idx ? 'active' : ''}`}
            onClick={() => setCurrentSlide(idx)}
          ></div>
        ))}
      </div>
    </section>
  );
}
