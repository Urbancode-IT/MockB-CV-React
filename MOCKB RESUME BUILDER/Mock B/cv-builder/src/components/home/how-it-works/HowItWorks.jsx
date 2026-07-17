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
        <p>Your journey to a perfect resume in three simple steps.</p>
      </div>
      
      <div className="home-steps-container">
        <div className={`home-step-card slide-in-left ${animate ? 'animate' : ''}`}>
          <div className="home-step-number">1</div>
          <h3>Choose a Template or Role</h3>
          <p>Start by selecting from our premium, ATS-friendly templates or let our AI guide you based on your target job role. Whether you are a developer, designer, or executive, we have the perfect starting point.</p>
        </div>
        
        <div className={`home-step-card slide-in-bottom ${animate ? 'animate' : ''}`}>
          <div className="home-step-number">2</div>
          <h3>Build & Optimize with AI</h3>
          <p>Fill in your details manually, upload an existing resume, or paste a job description. Our advanced AI will instantly generate tailored bullet points, optimize keywords, and score your resume against ATS algorithms.</p>
        </div>
        
        <div className={`home-step-card slide-in-right ${animate ? 'animate' : ''}`}>
          <div className="home-step-number">3</div>
          <h3>Download & Apply</h3>
          <p>Preview your perfectly formatted resume in real-time. Once you're satisfied with the design and the ATS score, download it as a PDF or Word document and start applying with total confidence.</p>
        </div>
      </div>
    </section>
  );
}
