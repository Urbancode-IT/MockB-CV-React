import React from 'react';
import './ATSRegen.css';

const SKILLS = ['JavaScript','TypeScript','React.js','Node.js','Python','AWS (EC2, S3, Lambda)','Docker','Kubernetes','PostgreSQL','MongoDB','Redis','REST APIs','GraphQL','Git','CI/CD','Agile / Scrum'];

export default function ATSRegen({ fixing, fixedReady, onFix, onDownloadPDF, onDownloadWord }) {
  return (
    <>
      {/* Fix & Regenerate */}
      <div className="regen-section">
        <h2>Fix All Issues &amp; <span>Regenerate Resume</span></h2>
        <p>Our AI will automatically correct all detected issues — formatting, keywords, grammar, bullet points and more — and deliver your improved resume.</p>
        <button className={`btn-regen${fixing ? ' loading' : ''}${fixedReady ? ' regenerated' : ''}`} id="regen-btn" onClick={onFix} disabled={fixing || fixedReady}>
          <i className={`fa-solid ${fixing ? 'fa-spinner fa-spin' : fixedReady ? 'fa-check' : 'fa-wand-magic-sparkles'}`}></i>
          <span>{fixing ? 'Fixing Issues & Regenerating...' : fixedReady ? 'Resume Regenerated!' : 'Fix Issues & Regenerate My Resume'}</span>
        </button>
      </div>

      {/* Download + Preview (shown after regen) */}
      {fixedReady && (
        <div className="download-section" id="download-section">
          <div className="dl-card">
            <i className="fa-solid fa-circle-check dl-check"></i>
            <h3>Your Improved Resume Is Ready!</h3>
            <p>All 13 issues have been fixed. Preview your ATS-optimised resume below, then download in your preferred format.</p>

            <div className="resume-preview-wrap">
              <div className="rp-toolbar">
                <span className="rp-label"><i className="fa-solid fa-eye"></i> Live Preview</span>
                <div className="dl-btns">
                  <button className="dl-btn dl-pdf" onClick={onDownloadPDF}>
                    <i className="fa-solid fa-file-pdf"></i> Download PDF
                  </button>
                  <button className="dl-btn dl-word" onClick={onDownloadWord}>
                    <i className="fa-solid fa-file-word"></i> Download Word
                  </button>
                </div>
              </div>
              <div className="resume-preview-panel" id="resume-preview-panel">
                <div className="rp-name">John Doe <span className="rp-badge">ATS Optimised ✓</span></div>
                <div className="rp-title">Senior Software Engineer</div>
                <div className="rp-contact">john.doe@email.com &nbsp;|&nbsp; +91 98765 43210 &nbsp;|&nbsp; Bangalore, India &nbsp;|&nbsp; linkedin.com/in/johndoe &nbsp;|&nbsp; github.com/johndoe</div>

                <div className="rp-section-title">Professional Summary</div>
                <p style={{ fontSize: '0.83rem', color: '#333', marginBottom: '0.5rem' }}>
                  Results-driven Senior Software Engineer with 5+ years of experience designing and delivering scalable, cloud-native applications. Proven track record of improving system performance by up to 52%, reducing API latency, and leading cross-functional teams. Proficient in JavaScript, React, Node.js, Python, and AWS.
                </p>

                <div className="rp-section-title">Work Experience</div>
                <div style={{ marginBottom: '1rem' }}>
                  <div className="rp-exp-header">
                    <span className="rp-exp-role">Senior Software Engineer</span>
                    <span className="rp-exp-date">Jan 2022 – Present</span>
                  </div>
                  <div className="rp-exp-company">Tech Corp &nbsp;·&nbsp; Bangalore, India</div>
                  <ul className="rp-bullets">
                    <li>Led end-to-end development of 3 core product features, increasing user retention by <strong>34%</strong> within 2 quarters.</li>
                    <li>Reduced API response time by <strong>52%</strong> through algorithmic optimisation and Redis caching strategies.</li>
                    <li>Designed and implemented a microservices architecture serving <strong>2M+ daily active users</strong>.</li>
                    <li>Mentored 5 junior engineers, improving team sprint velocity by <strong>20%</strong> and code review turnaround by 40%.</li>
                    <li>Automated CI/CD pipelines using GitHub Actions, reducing deployment time from 45 min to 8 min.</li>
                  </ul>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div className="rp-exp-header">
                    <span className="rp-exp-role">Software Engineer</span>
                    <span className="rp-exp-date">Jun 2020 – Dec 2021</span>
                  </div>
                  <div className="rp-exp-company">StartupXYZ &nbsp;·&nbsp; Hyderabad, India</div>
                  <ul className="rp-bullets">
                    <li>Built RESTful APIs integrated with third-party payment gateways, processing <strong>$1.2M+ in monthly transactions</strong>.</li>
                    <li>Improved front-end performance score from 62 to 94 (Lighthouse) by implementing lazy loading and code-splitting.</li>
                    <li>Collaborated with UX teams to deliver a redesigned dashboard adopted by <strong>90% of enterprise clients</strong>.</li>
                  </ul>
                </div>

                <div className="rp-section-title">Education</div>
                <div className="rp-edu-row">
                  <span className="rp-edu-deg">B.Tech — Computer Science &amp; Engineering</span>
                  <span className="rp-edu-year">2016 – 2020</span>
                </div>
                <div className="rp-edu-inst">IIT Bombay &nbsp;·&nbsp; CGPA: 8.7 / 10.0</div>

                <div className="rp-section-title">Technical Skills</div>
                <div className="rp-skills-wrap">
                  {SKILLS.map(s => <span className="rp-skill-tag" key={s}>{s}</span>)}
                </div>

                <div className="rp-section-title">Certifications</div>
                <ul className="rp-bullets">
                  <li><strong>AWS Certified Solutions Architect – Associate</strong> (2023)</li>
                  <li><strong>Google Professional Cloud Developer</strong> (2022)</li>
                </ul>

                <div className="rp-section-title">Projects</div>
                <ul className="rp-bullets">
                  <li><strong>ResumeAI</strong> — AI-powered resume analysis tool built with Python &amp; React; 12K+ users in beta.</li>
                  <li><strong>ShopBot</strong> — WhatsApp chatbot for e-commerce order tracking using Node.js &amp; Twilio; reduced support tickets by 38%.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
