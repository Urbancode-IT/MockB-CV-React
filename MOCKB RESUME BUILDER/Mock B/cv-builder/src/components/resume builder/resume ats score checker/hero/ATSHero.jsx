import React from 'react';
import './ATSHero.css';

export default function ATSHero({ mode }) {
  const isRecruiter = mode === 'recruiter';
  return (
    <section className="jb-hero">
      <div className="jb-hero-inner">
        <div className="hero-badge">
          <i className={`fa-solid ${isRecruiter ? 'fa-user-tie' : 'fa-gauge-high'}`}></i>
          {isRecruiter ? ' ATS Checker · Recruiter Mode' : ' ATS Checker · Jobseeker Mode'}
        </div>
        <h1>
          {isRecruiter
            ? <>Batch Parse &amp; <span>Rank Candidates</span></>
            : <>Is Your Resume <span>ATS-Ready?</span></>}
        </h1>
        <p>
          {isRecruiter
            ? 'Upload a stack of resumes (up to 10 files). Our batch scanner will extract qualifications, index key skills, and rank candidates based on their matching score.'
            : 'Upload your resume and our AI will instantly analyse it across 13 key dimensions — from keyword matching to formatting — and give you a precise ATS score out of 100, plus a tailored fix plan.'}
        </p>
        {!isRecruiter && (
          <div className="hero-stats-row">
            <div className="hs-item"><i className="fa-solid fa-check-double"></i> 13 Metrics Checked</div>
            <div className="hs-divider"></div>
            <div className="hs-item"><i className="fa-solid fa-robot"></i> AI-Powered Analysis</div>
            <div className="hs-divider"></div>
            <div className="hs-item"><i className="fa-solid fa-file-arrow-down"></i> Download Fixed Resume</div>
          </div>
        )}
      </div>
    </section>
  );
}
