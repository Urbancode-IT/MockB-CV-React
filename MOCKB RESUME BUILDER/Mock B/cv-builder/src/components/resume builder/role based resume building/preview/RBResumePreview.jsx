import React from 'react';
import './RBResumePreview.css';

export default function RBResumePreview({ formData, targetRole, onBackToDashboard, onDownload }) {
  return (
    <main className="preview-container">
      {/* Resume Paper */}
      <div className="resume-paper" id="resume-content" style={{ textAlign: 'left' }}>
        <div className="resume-header">
          <h1 id="preview-name" style={{ color: '#000' }}>{formData.fullName || 'Alex Rivera'}</h1>
          <p id="preview-role-title" style={{ fontWeight: 'bold', margin: '5px 0' }}>{targetRole}</p>
          <p>
            {formData.email || 'alex.rivera@example.com'} | {formData.phone || '+1 234 567 890'} | LinkedIn.com/in/alexrivera
          </p>
        </div>

        <div className="resume-section">
          <h2>Professional Summary</h2>
          <p id="preview-bio" style={{ color: '#222' }}>
            {formData.bio ||
              'Dynamic and detail-oriented Software Engineer with a proven track record of designing high-fidelity layouts, microservice pipelines, and real-time database interfaces. Experienced in team leadership and performance optimization.'}
          </p>
        </div>

        <div className="resume-section">
          <h2>Technical Skills</h2>
          <p id="preview-skills" style={{ color: '#222' }}>
            <strong>Expertise: </strong>
            {formData.skills || 'React, TypeScript, Node.js, Express.js, MongoDB, Docker, Git, CI/CD'}
          </p>
          <p style={{ color: '#222' }}><strong>Frameworks:</strong> React, Next.js, Redux, Tailwind CSS, Material UI</p>
          <p style={{ color: '#222' }}><strong>Tools:</strong> Git, Docker, Webpack, Jest, Firebase, AWS</p>
        </div>

        <div className="resume-section">
          <h2>Work Experience</h2>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#111' }}>
              <span>Senior Software Engineer | TechSolutions Inc.</span>
              <span>2020 - Present</span>
            </div>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', color: '#222' }}>
              <li>Architected and implemented a high-performance e-commerce platform using Next.js and GraphQL.</li>
              <li>Reduced bundle size by 35% through code-splitting and optimization techniques.</li>
              <li>Mentored a team of 5 junior developers and implemented standardized code review processes.</li>
            </ul>
          </div>
        </div>

        <div className="resume-section">
          <h2>Education</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#111' }}>
            <span>B.S. in Computer Science | University of Technology</span>
            <span>2014 - 2018</span>
          </div>
        </div>
      </div>

      {/* Sidebar Actions */}
      <aside className="preview-sidebar">
        <div className="action-card glass" style={{ border: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'left' }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#fff' }}>Download Options</h3>
          <button className="download-btn pdf-btn" onClick={() => onDownload('pdf')}>
            <i className="fa-solid fa-file-pdf"></i> Download PDF
          </button>
          <button className="download-btn word-btn" onClick={() => onDownload('word')}>
            <i className="fa-solid fa-file-word"></i> Download Word
          </button>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.8rem', marginTop: '1rem', textAlign: 'center' }}>
            Your resume is optimized for ATS and ready to use.
          </p>
        </div>

        <div className="action-card glass" style={{ border: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'left' }}>
          <h3 style={{ marginBottom: '1rem', color: '#fff' }}>AI Suggestions</h3>
          <ul style={{ color: 'var(--text-gray)', fontSize: '0.85rem', paddingLeft: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Add a "Projects" section to highlight your React work.</li>
            <li>Quantify your impact in the TechSolutions role more clearly.</li>
          </ul>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button className="btn btn-secondary" onClick={onBackToDashboard} style={{ width: '100%' }}>
            Back to Dashboard
          </button>
        </div>
      </aside>
    </main>
  );
}
