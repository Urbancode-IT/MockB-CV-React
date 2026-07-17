import { useState, useRef } from 'react';
import './ResumeUpgrader.css';

const STAGES = {
  INITIAL: 'initial',
  LOADING_ANALYSIS: 'loading-analysis',
  REPORT: 'report',
  LOADING_UPGRADE: 'loading-upgrade',
  PREVIEW: 'preview',
};

export default function ResumeUpgrader() {
  const [stage, setStage] = useState(STAGES.INITIAL);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [targetRole, setTargetRole] = useState('');
  const [errors, setErrors] = useState({ file: false, role: false });
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef(null);
  const uploadSectionRef = useRef(null);
  const step2Ref = useRef(null);
  const roleInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        isPdf: file.name.toLowerCase().endsWith('.pdf')
      });
      setErrors(prev => ({ ...prev, file: false }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        isPdf: file.name.toLowerCase().endsWith('.pdf')
      });
      setErrors(prev => ({ ...prev, file: false }));
    }
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setUploadedFile(null);
  };

  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const saveUpload = () => {
    // Scroll to Step 2
    step2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const startAnalysis = () => {
    let hasError = false;
    const newErrors = { file: false, role: false };

    if (!uploadedFile) {
      newErrors.file = true;
      hasError = true;
    }
    
    if (!targetRole.trim()) {
      newErrors.role = true;
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      if (newErrors.file) {
        scrollToUpload();
      } else if (newErrors.role) {
        roleInputRef.current?.focus();
      }
      return;
    }

    setStage(STAGES.LOADING_ANALYSIS);
    setTimeout(() => {
      setStage(STAGES.REPORT);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);
  };

  const upgradeResume = () => {
    setStage(STAGES.LOADING_UPGRADE);
    setTimeout(() => {
      setStage(STAGES.PREVIEW);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  const resetUpgrader = () => {
    setStage(STAGES.INITIAL);
    setUploadedFile(null);
    setTargetRole('');
    setErrors({ file: false, role: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render different view stages
  return (
    <main className="upgrader-main">
      {stage === STAGES.INITIAL && (
        <div id="initial-content">
          {/* Hero Section */}
          <section className="upgrader-hero">
            <div className="container">
              <div className="hero-content">
                <h1>Upgrade your resume,<br />unlock <span>better opportunities.</span></h1>
                <p>Our AI analyzes your resume, improves keywords, structure, and formatting to help you stand out and get shortlisted.</p>
                <div className="hero-btns">
                  <button className="btn btn-primary btn-with-icon" onClick={scrollToUpload}>
                    Start Analyze <i className="fa-solid fa-wand-magic-sparkles"></i>
                  </button>
                </div>
                <p className="secure-tag"><i className="fa-solid fa-lock"></i> Your files are secure and confidential. We never share your data.</p>
              </div>
              <div className="hero-visual">
                <div className="floating-resume">
                  <div className="resume-skeleton">
                    <div className="skeleton-header">
                      <div className="avatar">
                        <i className="fa-solid fa-user"></i>
                      </div>
                      <div className="lines">
                        <div className="line short"></div>
                        <div className="line medium"></div>
                      </div>
                    </div>
                    <div className="skeleton-body">
                      <div className="line long highlighted"></div>
                      <div className="line medium highlighted"></div>
                      <div className="line long"></div>
                      <div className="line short highlighted"></div>
                      <div className="line medium"></div>
                    </div>
                  </div>
                  <div className="analysis-indicator">
                    <div className="graph-icon">
                      <i className="fa-solid fa-chart-line"></i>
                    </div>
                  </div>
                </div>
                <div className="decorative-dots"></div>
              </div>
            </div>
          </section>

          {/* Steps Section */}
          <section className="steps-section" id="upload-section" ref={uploadSectionRef}>
            <div className="container">
              <div className="step-card-wrapper">
                <div className="step-item">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Upload your resume</h3>
                    <p>Upload your resume in pdf,word</p>
                    <div className="upload-ui-card">
                      <div className="ui-card-header">
                        <h4>Upload Files</h4>
                      </div>
                      <div 
                        className={`ui-drop-zone ${dragActive ? 'highlight' : ''}`}
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="ui-icons-wrapper">
                          <div className="ui-icon-doc pink"><i className="fa-solid fa-file-lines"></i></div>
                          <div className="ui-icon-doc blue main">
                            <i className="fa-solid fa-file-arrow-up"></i>
                            <div className="ui-plus-circle"><i className="fa-solid fa-plus"></i></div>
                          </div>
                          <div className="ui-icon-doc orange"><i className="fa-solid fa-file-word"></i></div>
                        </div>
                        <div className="ui-drop-text">
                          <p>Drag and drop files here</p>
                          <input 
                            type="file" 
                            ref={fileInputRef} 
                            hidden 
                            accept=".pdf,.doc,.docx" 
                            onChange={handleFileChange}
                          />
                          <span className="choose-link" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                            or choose file
                          </span>
                        </div>
                      </div>
                      <div className="ui-card-info">
                        <span className="formats">Accepted formats: PDF, Word</span>
                        <span className="size">Maximum file size: 100MB</span>
                      </div>
                      
                      {uploadedFile && (
                        <div className="ui-file-list">
                          <div className="ui-file-item">
                            <div className={`file-icon-box ${uploadedFile.isPdf ? 'pdf' : 'word'}`}>
                              <i className={`fa-solid ${uploadedFile.isPdf ? 'fa-file-pdf' : 'fa-file-word'}`}></i>
                              <span className="icon-label">{uploadedFile.isPdf ? 'PDF' : 'W'}</span>
                            </div>
                            <div className="file-details">
                              <div className="file-name">{uploadedFile.name}</div>
                              <div className="file-meta">{uploadedFile.size}  <span>|</span>  <span className="status">Uploaded</span></div>
                            </div>
                            <button className="file-remove" onClick={removeFile}><i class="fa-solid fa-xmark"></i></button>
                          </div>
                        </div>
                      )}

                      <div className="ui-card-footer">
                        <a href="#" className="ui-help" onClick={(e) => e.preventDefault()}><i className="fa-regular fa-circle-question"></i> Help</a>
                        <div className="ui-footer-btns">
                          <button className="ui-btn-save" onClick={saveUpload}>Save</button>
                        </div>
                      </div>
                    </div>
                    {errors.file && (
                      <p id="upload-error" className="error-message" style={{ color: '#ff4d4f', fontSize: '0.85rem', marginTop: '10px', textAlign: 'center', fontWeight: 500 }}>
                        <i className="fa-solid fa-circle-exclamation"></i> Please upload your resume first.
                      </p>
                    )}
                    <p className="secure-info"><i className="fa-solid fa-lock"></i> Your files are secure and confidential. We never share your data.</p>
                  </div>
                </div>

                <div className="step-divider"></div>

                <div className="step-item" ref={step2Ref}>
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>What role are you looking for?</h3>
                    <p>Enter the job title or role you want to optimize your resume for.</p>
                    <div className="role-input-box">
                      <i className="fa-solid fa-briefcase"></i>
                      <input 
                        type="text" 
                        ref={roleInputRef}
                        value={targetRole}
                        onChange={(e) => {
                          setTargetRole(e.target.value);
                          if (errors.role) setErrors(prev => ({ ...prev, role: false }));
                        }}
                        placeholder="e.g. Senior Software Engineer, Product Manager, Data Analyst"
                      />
                    </div>
                    {errors.role && (
                      <p id="role-error" className="error-message" style={{ color: '#ff4d4f', fontSize: '0.85rem', marginTop: '10px', fontWeight: 500 }}>
                        <i className="fa-solid fa-circle-exclamation"></i> Please enter the role you are looking for.
                      </p>
                    )}
                  </div>
                </div>

                <div className="step-divider"></div>

                <div className="step-item">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Start the analysis</h3>
                    <p>Let our AI analyze and upgrade your resume for the best match.</p>
                    <button className="btn btn-primary btn-large" onClick={startAnalysis}>
                      <i className="fa-solid fa-wand-magic-sparkles"></i> Start Analyze
                    </button>
                    <p className="time-info"><i className="fa-regular fa-clock"></i> It only takes a few seconds</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {stage === STAGES.LOADING_ANALYSIS && (
        <div id="analysis-loading" className="analysis-loading">
          <div className="loader-content">
            <div className="spinner"></div>
            <h3>Analyzing your resume...</h3>
            <p>Checking match score, ATS compatibility and identifying improvements.</p>
          </div>
        </div>
      )}

      {stage === STAGES.REPORT && (
        <div id="analysis-report" className="container analysis-report">
          <div className="report-header">
            <h2>Analysis Report</h2>
            <div className="scores-row">
              <div className="score-card">
                <div className="score-val">80<span>/100</span></div>
                <p>Overall Match</p>
              </div>
              <div className="score-card">
                <div className="score-val">90<span>/100</span></div>
                <p>ATS Score</p>
              </div>
              <div className="score-card verdict-card">
                <div className="verdict-val">Strong Support</div>
                <p>Verdict</p>
              </div>
            </div>
          </div>

          <div className="report-details">
            <div className="detail-box">
              <h4><i className="fa-solid fa-align-left"></i> Summary</h4>
              <p>Your resume demonstrates solid experience in software engineering with a strong focus on frontend technologies. It is well-structured but could benefit from more quantitative achievements.</p>
            </div>

            <div className="details-grid">
              <div className="detail-box strength">
                <h4><i className="fa-solid fa-circle-check"></i> Strengths</h4>
                <ul>
                  <li>Strong technical skill set in React and Node.js.</li>
                  <li>Clear and professional formatting.</li>
                  <li>Consistent career progression shown.</li>
                </ul>
              </div>
              <div className="detail-box weakness">
                <h4><i className="fa-solid fa-circle-exclamation"></i> Weaknesses</h4>
                <ul>
                  <li>Lack of metrics and KPIs in job descriptions.</li>
                  <li>Professional summary is too generic.</li>
                  <li>Education section lacks specific coursework relevant to current roles.</li>
                </ul>
              </div>
              <div className="detail-box mistakes">
                <h4><i className="fa-solid fa-triangle-exclamation"></i> Mistakes</h4>
                <ul>
                  <li>Minor spelling error in "Environment" in second job.</li>
                  <li>Inconsistent date formatting.</li>
                </ul>
              </div>
              <div className="detail-box missing">
                <h4><i className="fa-solid fa-magnifying-glass-plus"></i> Missing Keywords</h4>
                <ul>
                  <li>TypeScript</li>
                  <li>Cloud Infrastructure</li>
                  <li>Unit Testing</li>
                  <li>Agile Methodologies</li>
                </ul>
              </div>
            </div>

            <div className="detail-box recommendations">
              <h4><i className="fa-solid fa-lightbulb"></i> Recommendations</h4>
              <p>Incorporate specific numbers (e.g., "Increased performance by 20%"). Add the missing keywords identified above. Refine your professional summary to highlight your unique value proposition.</p>
            </div>
          </div>

          <div className="report-footer">
            <button className="btn btn-primary btn-large" onClick={upgradeResume}>
              <i className="fa-solid fa-circle-up"></i> Upgrade Resume
            </button>
          </div>
        </div>
      )}

      {stage === STAGES.LOADING_UPGRADE && (
        <div id="analysis-loading" className="analysis-loading">
          <div className="loader-content">
            <div className="spinner"></div>
            <h3>Upgrading your resume...</h3>
            <p>Applying smart suggestions and optimizing formatting.</p>
          </div>
        </div>
      )}

      {stage === STAGES.PREVIEW && (
        <div id="upgraded-preview" className="container upgraded-preview">
          <div className="preview-header">
            <h2>Upgraded Resume Preview</h2>
            <p>Your resume has been optimized for ATS and role-matching.</p>
          </div>
          
          <div className="preview-container">
            <div className="resume-paper">
              <div className="paper-content">
                <div className="header-section">
                  <h1>JASON SMITH</h1>
                  <p>Senior Software Engineer | Full-Stack Developer</p>
                  <div className="contact-info">
                    <span><i className="fa-solid fa-envelope"></i> jason.smith@email.com</span>
                    <span><i className="fa-solid fa-phone"></i> +1 234 567 8900</span>
                    <span><i className="fa-solid fa-location-dot"></i> San Francisco, CA</span>
                  </div>
                </div>
                
                <div className="body-section">
                  <div className="main-col">
                    <div className="section">
                      <h3 className="section-title">PROFESSIONAL SUMMARY</h3>
                      <p>Results-driven Senior Software Engineer with 8+ years of experience in building scalable web applications. Expert in React, Node.js, and TypeScript, with a proven track record of improving application performance by 30% and leading cross-functional teams to deliver high-quality products.</p>
                    </div>
                    
                    <div className="section">
                      <h3 className="section-title">PROFESSIONAL EXPERIENCE</h3>
                      <div className="job">
                        <div className="job-header">
                          <strong>TechFlow Solutions</strong>
                          <span>2020 — Present</span>
                        </div>
                        <div className="job-title">Senior Frontend Developer</div>
                        <ul>
                          <li>Led the redesign of the core dashboard, resulting in a 40% increase in user engagement.</li>
                          <li>Implemented automated unit testing using Jest, reducing bug reports by 25%.</li>
                          <li>Mentored a team of 5 junior developers, improving overall team velocity by 15%.</li>
                        </ul>
                      </div>
                      <div className="job">
                        <div className="job-header">
                          <strong>InnoSystems Inc.</strong>
                          <span>2016 — 2020</span>
                        </div>
                        <div className="job-title">Software Engineer</div>
                        <ul>
                          <li>Developed microservices architecture using Node.js and Docker.</li>
                          <li>Optimized database queries, reducing response times by 500ms on average.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="side-col">
                    <div className="section">
                      <h3 className="section-title">SKILLS</h3>
                      <div className="skill-tags">
                        <span>React</span> <span>Node.js</span> <span>TypeScript</span> 
                        <span>Python</span> <span>Docker</span> <span>AWS</span>
                        <span>GraphQL</span> <span>PostgreSQL</span>
                      </div>
                    </div>
                    <div className="section">
                      <h3 className="section-title">EDUCATION</h3>
                      <p><strong>B.S. in Computer Science</strong><br />Stanford University</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="preview-actions">
              <div className="download-card">
                <h4>Ready to download?</h4>
                <p>Get your upgraded resume in your preferred format.</p>
                <div className="download-btns">
                  <button className="btn btn-primary"><i className="fa-solid fa-file-pdf"></i> Download PDF</button>
                  <button className="btn btn-white"><i className="fa-solid fa-file-word"></i> Download Word</button>
                </div>
              </div>
              
              <div className="success-message">
                <i className="fa-solid fa-circle-check"></i>
                <p>Optimization Complete!</p>
              </div>
            </div>
          </div>
          
          <div className="preview-footer">
            <button className="btn btn-primary" onClick={resetUpgrader}>
              <i className="fa-solid fa-arrow-left"></i> Analyze Another Resume
            </button>
          </div>
        </div>
      )}

      {/* What Happens Next - Always visible except in report/preview or show it? 
          Wait, in index.html, it is inside <main class="upgrader-main"> but AFTER the initial content, loading, report, preview divs. 
          Ah, looking at index.html, it is outside the initial-content, loading, report, preview divs, so it is always visible on the page! Let's render it always or only in INITIAL?
          Wait, in the original index.html:
          <main class="upgrader-main">
              <div id="initial-content">...</div>
              <div id="analysis-loading" ...></div>
              <div id="analysis-report" ...></div>
              <div id="upgraded-preview" ...></div>
              <section class="next-steps-section">...</section>
              <section class="final-cta">...</section>
          </main>
          This means that "What happens next?" and "Final CTA" are always visible at the bottom of the page, even when loading or viewing report/preview. Let's make sure it matches that!
      */}
      <section className="next-steps-section">
        <div className="container">
          <div className="next-grid">
            <div className="next-content">
              <h2>What happens next?</h2>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feat-icon"><i className="fa-solid fa-search"></i></div>
                  <div className="feat-text">
                    <h4>1. Resume Analysis</h4>
                    <p>Our AI scans your resume for content, structure, formatting, and relevance to the job you want.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feat-icon"><i className="fa-solid fa-crosshairs"></i></div>
                  <div className="feat-text">
                    <h4>2. Match & Optimize</h4>
                    <p>We compare your resume with job requirements and optimize keywords, skills, and experience to improve your match score.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feat-icon"><i className="fa-solid fa-lightbulb"></i></div>
                  <div className="feat-text">
                    <h4>3. Smart Suggestions</h4>
                    <p>You'll receive AI-powered suggestions to enhance your content, highlight achievements, and improve readability.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feat-icon"><i className="fa-solid fa-download"></i></div>
                  <div className="feat-text">
                    <h4>4. Get Your Upgraded Resume</h4>
                    <p>Download your optimized resume and increase your chances of getting noticed by recruiters and ATS.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="next-visual">
              <img 
                src="/images/optimization.png" 
                alt="Resume Analysis" 
                className="optimization-img" 
                style={{ width: '100%', borderRadius: '24px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="upgrader-final-cta">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-icon">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div className="cta-text">
              <h3>Smarter resume. Better matches. More interviews.</h3>
              <p>Our AI resume upgrader gives you the edge you need in today's competitive job market. Upload your resume and see the difference.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
