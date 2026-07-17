import React from 'react';
import './JDTestimonials.css';

export default function JDTestimonials() {
  return (
    <section className="jd-testimonials container">
      <div className="section-label">Success Stories</div>
      <h2 className="section-title text-center">People Who Got <span>Hired</span></h2>
      <div className="testimonial-row">
        <div className="testimonial-card">
          <div className="quote-icon"><i className="fa-solid fa-quote-left"></i></div>
          <p>"I pasted a LinkedIn JD and within 60 seconds had a resume that matched 94% of the requirements. Got an interview call the very next day!"</p>
          <div className="testimonial-author">
            <div className="author-av">PK</div>
            <div><strong>Priya K.</strong><span>Software Engineer, Hyderabad</span></div>
          </div>
        </div>
        <div className="testimonial-card">
          <div className="quote-icon"><i className="fa-solid fa-quote-left"></i></div>
          <p>"Used to spend hours tailoring resumes for each job. This tool does it in seconds and the quality is incredible. My callback rate tripled."</p>
          <div className="testimonial-author">
            <div className="author-av">AR</div>
            <div><strong>Arjun R.</strong><span>Data Analyst, Bangalore</span></div>
          </div>
        </div>
        <div className="testimonial-card">
          <div className="quote-icon"><i className="fa-solid fa-quote-left"></i></div>
          <p>"The AI picked up keywords I would have never thought to include. My ATS score went from 52 to 91 instantly. Absolutely game changing."</p>
          <div className="testimonial-author">
            <div className="author-av">SM</div>
            <div><strong>Sneha M.</strong><span>Product Manager, Mumbai</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
