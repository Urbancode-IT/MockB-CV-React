import React from 'react';
import { Link } from 'react-router-dom';
import './CombinedFeatures.css';

export default function CombinedFeatures() {
  return (
    <section className="container">
      <div className="home-combined-features">
        <div className="home-split-row">
          <div className="home-split-content">
            <h2>AI cover letter generator powered by GPT</h2>
            <p>Tried writing your cover letter or resume with AI but got frustrated with generic chatbot responses? MockBee's built-in web scraping means we generate better, more personalized responses—every time.</p>
            <Link to="/cover-letter/ai-builder" className="home-btn-white">Get started</Link>
          </div>
          <div className="home-split-image">
            <img src="/images/ai_writing.png" alt="AI Writing Illustration" />
          </div>
        </div>

        <div className="home-split-row home-reverse-row">
          <div className="home-split-image">
            <img src="/images/optimization.png" alt="Optimization Illustration" />
          </div>
          <div className="home-split-content">
            <h2>Optimize the keywords in your resume</h2>
            <p>Get past applicant tracking system (ATS) bots by optimizing your resume for job-specific keywords. Optimize your resume and watch your score improve over time.</p>
            <Link to="/resume/ats-checker" className="home-btn-white">Optimize your resume</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
