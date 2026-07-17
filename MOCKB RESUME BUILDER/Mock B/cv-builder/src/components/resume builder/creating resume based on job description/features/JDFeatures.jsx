import React from 'react';
import './JDFeatures.css';

export default function JDFeatures() {
  return (
    <section className="features-strip container">
      <h2 className="section-title text-center">Why Use JD-Based <span>Resume Builder?</span></h2>
      <div className="features-bento">
        <div className="feat-card feat-large">
          <div className="jd-feat-icon"><i className="fa-solid fa-bullseye"></i></div>
          <h3>Keyword-Perfect Matching</h3>
          <p>Our AI extracts every important keyword, skill, and requirement from the job description and weaves them naturally into your resume — boosting ATS scores dramatically.</p>
          <div className="feat-glow"></div>
        </div>
        <div className="feat-card">
          <div className="jd-feat-icon"><i className="fa-solid fa-robot"></i></div>
          <h3>AI-Powered Writing</h3>
          <p>Smart bullet points crafted to impress both ATS bots and human recruiters.</p>
        </div>
        <div className="feat-card">
          <div className="jd-feat-icon"><i className="fa-solid fa-gauge-high"></i></div>
          <h3>Real-time ATS Score</h3>
          <p>See your ATS compatibility score update in real time as you build.</p>
        </div>
        <div className="feat-card feat-wide">
          <div className="jd-feat-icon"><i className="fa-solid fa-file-arrow-down"></i></div>
          <h3>Download in Multiple Formats</h3>
          <p>Export your perfectly crafted resume as a PDF for digital applications or as a Word document for further customization — your choice, always.</p>
        </div>
        <div className="feat-card">
          <div className="jd-feat-icon"><i className="fa-solid fa-palette"></i></div>
          <h3>Premium Templates</h3>
          <p>Choose from modern, classic, minimal, and bold design layouts.</p>
        </div>
        <div className="feat-card">
          <div className="jd-feat-icon"><i className="fa-solid fa-shield-halved"></i></div>
          <h3>Privacy First</h3>
          <p>Your data is processed securely and never stored or shared.</p>
        </div>
      </div>
    </section>
  );
}
