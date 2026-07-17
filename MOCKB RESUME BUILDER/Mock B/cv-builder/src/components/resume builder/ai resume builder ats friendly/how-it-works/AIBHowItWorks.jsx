import React from 'react';
import './AIBHowItWorks.css';

export default function AIBHowItWorks() {
  return (
    <section className="how-section">
      <div className="container">
        <div className="section-label">
          <i className="fa-solid fa-circle-info"></i> How It Works
        </div>
        <h2 className="section-title">Three steps to your perfect resume</h2>
        <p className="section-sub">
          No forms, no confusing editors — just tell the AI about yourself.
        </p>
        <div className="steps-row">
          <div className="step-box">
            <div className="step-num">01</div>
            <div className="step-icon">
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
            <h3>Enter Your Details</h3>
            <p>
              Type everything about yourself in the prompt — name, role, experience, education, skills, achievements. The more detail, the better your resume.
            </p>
          </div>
          <div className="step-connector">
            <i className="fa-solid fa-arrow-right"></i>
          </div>
          <div className="step-box">
            <div className="step-num">02</div>
            <div className="step-icon">
              <i className="fa-solid fa-robot"></i>
            </div>
            <h3>AI Generates Resume</h3>
            <p>
              Our AI processes your input, fixes all grammar and spelling, adds relevant content, and formats it as an ATS-friendly professional resume.
            </p>
          </div>
          <div className="step-connector">
            <i className="fa-solid fa-arrow-right"></i>
          </div>
          <div className="step-box">
            <div className="step-num">03</div>
            <div className="step-icon">
              <i className="fa-solid fa-download"></i>
            </div>
            <h3>Preview & Download</h3>
            <p>
              Preview your resume instantly. Request changes via follow-up prompts. Download as PDF or Word when you're happy with the result.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
