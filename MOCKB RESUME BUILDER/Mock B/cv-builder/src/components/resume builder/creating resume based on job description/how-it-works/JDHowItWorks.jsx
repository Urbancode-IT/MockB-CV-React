import React from 'react';
import './JDHowItWorks.css';

export default function JDHowItWorks() {
  return (
    <section id="how-it-works" className="how-section container">
      <div className="section-label">Simple Process</div>
      <h2 className="section-title">Three Steps to Your <span>Perfect Resume</span></h2>
      
      <div className="steps-grid">
        <div className="step-card" data-step="01">
          <div className="step-icon"><i className="fa-solid fa-paste"></i></div>
          <h3>Paste Job Description</h3>
          <p>Copy the full JD from LinkedIn, Naukri, Indeed, or any job portal and paste it in our tool.</p>
        </div>
        <div className="step-connector"><i className="fa-solid fa-arrow-right"></i></div>
        <div className="step-card" data-step="02">
          <div className="step-icon"><i className="fa-solid fa-user-pen"></i></div>
          <h3>Add Your Details</h3>
          <p>Fill in your experience, skills, education, and projects. Our AI formats everything intelligently.</p>
        </div>
        <div className="step-connector"><i className="fa-solid fa-arrow-right"></i></div>
        <div className="step-card" data-step="03">
          <div className="step-icon"><i className="fa-solid fa-file-arrow-down"></i></div>
          <h3>Download & Apply</h3>
          <p>Get your tailored resume as PDF or Word document. Apply with total confidence instantly.</p>
        </div>
      </div>
    </section>
  );
}
