import React, { useState, useEffect, useRef } from 'react';
import './HowItWorks.css';

export default function HowItWorks() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    const el = sectionRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section ref={sectionRef} className="home-how-it-works-section container">
      <div className="home-how-it-works-header text-center">
        <h2>How MockB CV Works</h2>
        <p>Your journey to a finished resume in three simple steps.</p>
      </div>

      <div className="home-steps-container">
        <div className={`home-step-card slide-in-left ${animate ? 'animate' : ''}`}>
          <div className="home-step-number">1</div>
          <h3>Choose a Template</h3>
          <p>Pick a one-page or two-page resume design from the gallery. Preview the layout, then start with sample content or build from scratch.</p>
        </div>

        <div className={`home-step-card slide-in-bottom ${animate ? 'animate' : ''}`}>
          <div className="home-step-number">2</div>
          <h3>Edit &amp; Customize</h3>
          <p>Add your experience, education, and skills in the editor. Adjust fonts, colors, spacing, and section order while the live preview updates instantly.</p>
        </div>

        <div className={`home-step-card slide-in-right ${animate ? 'animate' : ''}`}>
          <div className="home-step-number">3</div>
          <h3>Preview &amp; Download</h3>
          <p>Review the final PDF preview, confirm both pages if needed, and download a polished resume ready to send.</p>
        </div>
      </div>
    </section>
  );
}
