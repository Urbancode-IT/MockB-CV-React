import React from 'react';
import './ATSGateway.css';

export default function ATSGateway({ onSelectJobseeker, onSelectRecruiter }) {
  return (
    <div className="gateway-container">
      <div className="gateway-header">
        <h1 className="welcome-title">
          Welcome to MockB CV <br />
          <span>ATS Resume Checker</span>
        </h1>
        <p className="welcome-desc">
          The ultimate platform to bridge the gap between talented jobseekers and top-tier recruiters using advanced ATS technology.
        </p>
      </div>

      <div className="gateway-grid">
        <div className="gateway-card jobseeker-card" onClick={onSelectJobseeker}>
          <div className="card-glow"></div>
          <div className="card-icon"><i className="fa-solid fa-user-graduate"></i></div>
          <h2>For Jobseekers</h2>
          <p>Choose jobseeker to optimize your resume, beat the bots, and land your dream job with ease.</p>
          <button className="btn-gateway btn-jobseeker">
            Continue as Jobseeker <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        <div className="gateway-card recruiter-card" onClick={onSelectRecruiter}>
          <div className="card-glow"></div>
          <div className="card-icon"><i className="fa-solid fa-user-tie"></i></div>
          <h2>For Recruiters</h2>
          <p>Select recruiters to upload a stack of resumes and rank the best candidates instantly using our AI sorting.</p>
          <button className="btn-gateway btn-recruiter">
            Continue as Recruiter <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
