import React from 'react';
import './DetailedFeatures.css';

export default function DetailedFeatures() {
  return (
    <section className="detailed-features container">
      <h2>Spend less time<br />looking for work.</h2>
      <p className="subtitle">We'll help you with the worst parts of job hunting—so you can actually get a job.</p>

      <div className="detailed-feature-list">
        <div className="detailed-feature-card">
          <div className="detailed-feature-icon"><i className="fa-solid fa-file-lines"></i></div>
          <h3>Cover Letters</h3>
          <p>Use MockBee's AI cover letter generator to write your cover letters in seconds, personalized for the specific job you want.</p>
        </div>
        <div className="detailed-feature-card">
          <div className="detailed-feature-icon"><i className="fa-solid fa-signature"></i></div>
          <h3>Resignation Letters</h3>
          <p>Tell us when you're leaving, who you're telling, and how nice you want to be (yep, even rude). We'll do the rest.</p>
        </div>
        <div className="detailed-feature-card">
          <div className="detailed-feature-icon"><i className="fa-solid fa-link"></i></div>
          <h3>Connection Requests</h3>
          <p>Generate connection requests for LinkedIn or other networks, automatically personalized for the request recipient.</p>
        </div>
        <div className="detailed-feature-card">
          <div className="detailed-feature-icon"><i className="fa-solid fa-envelope"></i></div>
          <h3>Outreach Emails</h3>
          <p>Whether you're cold pitching over email or need a personalized outreach message, we'll help you write it in seconds.</p>
        </div>
        <div className="detailed-feature-card">
          <div className="detailed-feature-icon"><i className="fa-solid fa-bullseye"></i></div>
          <h3>Resume Optimization</h3>
          <p>Check your resume for readability and formatting, then optimize the keywords to beat applicant tracking systems (ATS) scanning bots.</p>
        </div>
        <div className="detailed-feature-card">
          <div className="detailed-feature-icon"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
          <h3>Resume Design</h3>
          <p>Explore free and premium cover letter and resume design templates for Canva, Adobe InDesign, and Microsoft Word.</p>
        </div>
      </div>
    </section>
  );
}
