import React from 'react';
import './CoreFeatures.css';

export default function CoreFeatures() {
  return (
    <section id="core-features" className="container">
      <div className="home-section-header text-center">
        <h2 className="home-section-title">Powerful Features to Land Your Dream Job</h2>
        <p className="home-section-subtitle">Everything you need to create a winning application in one integrated platform.</p>
      </div>
      
      <div className="bento-grid">
        {/* Large Feature */}
        <div className="bento-item bento-large group">
          <div className="bento-bg"></div>
          <div className="bento-content">
            <i className="fa-solid fa-robot bento-icon"></i>
            <h3>AI Resume Builder</h3>
            <p>Generate highly professional resumes with the power of advanced AI tailored to your unique career path. Forget writer's block and let our AI craft the perfect bullet points.</p>
          </div>
        </div>

        {/* Medium Features */}
        <div className="bento-item bento-medium group">
          <div className="bento-content">
            <i className="fa-solid fa-bullseye bento-icon"></i>
            <h3>ATS Optimization</h3>
            <p>Beat the bots with targeted keyword suggestions.</p>
          </div>
        </div>

        <div className="bento-item bento-medium group">
          <div className="bento-content">
            <i className="fa-solid fa-file-invoice bento-icon"></i>
            <h3>JD Matching</h3>
            <p>Align your resume perfectly with job descriptions.</p>
          </div>
        </div>

        {/* Wide Feature */}
        <div className="bento-item bento-wide group">
          <div className="bento-bg bg-gradient-2"></div>
          <div className="bento-content">
            <i className="fa-solid fa-gauge-high bento-icon"></i>
            <h3>Real-time ATS Scoring</h3>
            <p>Get instant feedback on how well your resume matches industry standards and fix issues before you apply.</p>
          </div>
        </div>

        {/* Small Features */}
        <div className="bento-item bento-small group">
          <div className="bento-content">
            <i className="fa-solid fa-envelope-open-text bento-icon"></i>
            <h3>Cover Letters</h3>
            <p>AI-generated in seconds.</p>
          </div>
        </div>

        <div className="bento-item bento-small group">
          <div className="bento-content">
            <i className="fa-solid fa-laptop-code bento-icon"></i>
            <h3>Portfolios</h3>
            <p>Showcase your projects.</p>
          </div>
        </div>

        {/* Language Feature */}
        <div className="bento-item bento-wide group">
          <div className="bento-bg bg-gradient-2"></div>
          <div className="bento-content">
            <i className="fa-solid fa-language bento-icon"></i>
            <h3>Multi-Language Support</h3>
            <p>Create your professional resume, cover letter, and portfolio in your native language to apply for opportunities globally.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
