import { useState, useRef, useEffect } from 'react';
import './JDCoverLetterBuilder.css';
import Navbar from '../components/home/navbar/Navbar';
import HomeFooter from '../components/home/footer/Footer';

export default function JDCoverLetterBuilder() {
  // Scroll animation effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const stepCards = document.querySelectorAll('.jdclb-page .step-card');
    stepCards.forEach((card, index) => {
      card.classList.add('slide-in-left');
      card.style.transitionDelay = `${index * 0.15}s`;
      observer.observe(card);
    });

    return () => {
      stepCards.forEach(card => observer.unobserve(card));
    };
  }, []);

  const [jobDescription, setJobDescription] = useState('');
  const [userName, setUserName] = useState('');
  const [targetTitle, setTargetTitle] = useState('');
  const [userExperience, setUserExperience] = useState('');
  const [userEducation, setUserEducation] = useState('');
  const [userSkills, setUserSkills] = useState('');
  
  // File upload state
  const [uploadedLetter, setUploadedLetter] = useState(null);
  const fileInputRef = useRef(null);

  // Template state
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  // Generation status state
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [alertMsg, setAlertMsg] = useState(null);
  const [showMagnify, setShowMagnify] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedLetter(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedLetter(file);
    }
  };

  const handleGenerate = () => {
    if (!jobDescription.trim()) {
      setAlertMsg({ title: 'Missing Job Description', text: 'Please paste a job description first so our AI can analyze it!' });
      return;
    }
    if (!userName.trim() || !targetTitle.trim()) {
      setAlertMsg({ title: 'Missing Details', text: 'Please fill in your Full Name and Target Job Title.' });
      return;
    }

    setIsGenerating(true);
    setLoadingStep(0);

    const steps = [
      'Analyzing requirements...',
      'Mapping skills & keywords...',
      'Structuring narrative context...',
      'Writing customized cover letter...'
    ];

    let currentStepIdx = 0;
    const interval = setInterval(() => {
      if (currentStepIdx < steps.length - 1) {
        currentStepIdx++;
        setLoadingStep(currentStepIdx);
      }
    }, 700);

    setTimeout(() => {
      clearInterval(interval);
      generateCoverLetterText();
      setIsGenerating(false);
      setHasGenerated(true);
      document.getElementById('preview-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 3000);
  };

  const generateCoverLetterText = () => {
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const uName = userName.trim() || 'John Doe';
    const title = targetTitle.trim() || 'Software Engineer';
    const expText = userExperience.trim() || 'I have a solid track record of driving projects to successful integration and working with cross-functional teams.';
    const edu = userEducation.trim() || 'B.S. in Computer Engineering';
    const skillsList = userSkills.trim() || 'React, Node.js, AWS';

    let openingContext = `I am writing to express my enthusiastic interest in the ${title} position currently open. Having reviewed the job description, I am highly confident that my background in industry standards and hands-on technical execution aligns perfectly with the requirements and objectives of your team.`;
    
    if (jobDescription.trim().length > 10) {
       openingContext = `I am writing to express my enthusiastic interest in the ${title} position. Based on your detailed job description, it is clear you need someone who can immediately contribute to your specific technical and operational goals. I am highly confident that my background and hands-on technical execution align perfectly with those exact requirements and the unique objectives of your team.`;
    }

    let bodyMod = `Specifically, ${expText.charAt(0).toLowerCase() + expText.slice(1)} I am eager to apply this same outcome-oriented approach to help solve the specific challenges and build the next-generation systems described in your job posting.`;
    
    if (uploadedLetter) {
       bodyMod = `Building on the core strengths highlighted in my previous applications, I have refined my professional focus to perfectly match this role. Specifically, ${expText.charAt(0).toLowerCase() + expText.slice(1)} I am eager to apply this outcome-oriented approach directly to the unique challenges mentioned in your job description.`;
    }

    const greeting = `Dear Hiring Manager,`;
    
    const body = `With my academic foundations in ${edu} and professional qualifications, I have built robust competencies across ${skillsList}. ${bodyMod}`;
    
    const closing = `I welcome the opportunity to discuss my qualifications and how I can add immediate value to your organization in a personal interview. Thank you for your time, consideration, and review of my application.`;

    const fullLetter = `${dateStr}\n\n${greeting}\n\n${openingContext}\n\n${body}\n\n${closing}\n\nSincerely,\n\n${uName}`;
    setGeneratedLetter(fullLetter);
  };

  const handleDownloadPDF = () => {
    setAlertMsg({ title: 'Generating PDF', text: 'Preparing your tailored ATS-friendly PDF...' });
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });

      const margin = 50;
      const pageWidth = 595.28;
      const maxLineWidth = pageWidth - margin * 2;
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      
      const textLines = generatedLetter.split('\n');
      let y = 50;
      const pageHeight = 841.89;
      
      textLines.forEach(para => {
        if (!para.trim()) {
           y += 15; // Empty line spacing
           return;
        }
        
        const lines = doc.splitTextToSize(para, maxLineWidth);
        lines.forEach(line => {
          if (y > pageHeight - margin) {
            doc.addPage();
            y = 50;
          }
          doc.text(line, margin, y);
          y += 15; // line height
        });
        y += 10; // paragraph spacing
      });
      
      doc.save(`${userName.replace(/\s+/g, '_') || 'Cover'}_Letter.pdf`);
      setAlertMsg(null);
    };
    document.body.appendChild(script);
  };

  const handleDownloadWord = () => {
    setAlertMsg({ title: 'Generating Word Doc', text: 'Preparing your tailored Word Document...' });
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word</title><style>body { font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.6; }</style></head><body>";
    const footer = "</body></html>";
    const content = generatedLetter.split('\n').map(p => `<p style="margin-bottom: 12px; margin-top: 0;">${p || '&nbsp;'}</p>`).join('');
    const sourceHTML = header + content + footer;
    
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `${userName.replace(/\s+/g, '_') || 'Cover'}_Letter.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
    
    setTimeout(() => setAlertMsg(null), 1000);
  };

  return (
    <>
      <Navbar />
      <main className="jdclb-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <span className="badge">JD-BASED COVER LETTER BUILDER</span>
            <h1>Build Cover Letters from Any <span>Job Description</span></h1>
            <p>Stop sending generic applications. Our advanced AI engine performs a deep semantic analysis of your target job description to build a narrative that proves you are the perfect match. Higher response rates, guaranteed.</p>
            <div className="hero-btns">
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => document.getElementById('builder-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Building <i className="fa-solid fa-arrow-right"></i>
              </button>
              <button 
                className="btn btn-outline btn-lg"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              >
                How it works
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card glass">
              <div className="card-header">
                <div className="dots"><span></span><span></span><span></span></div>
                <div className="title-bar">AI ANALYZER</div>
              </div>
              <div className="card-body">
                <div className="placeholder-line"></div>
                <div className="placeholder-line"></div>
                <div className="placeholder-line short"></div>
                <div className="ai-pulse">
                  <i className="fa-solid fa-robot"></i>
                  <span>Scanning JD for Keywords...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Science of Matching Section */}
      <section className="details-section container">
        <div className="glass">
          <div className="details-grid">
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>The Science of <span>AI-Driven</span> Matching</h2>
              <p style={{ color: '#A0A0A0', marginBottom: '2rem' }}>Our engine doesn't just copy-paste keywords. It understands the context, the required seniority level, and the unique culture of the company described in the JD.</p>
              <ul style={{ listStyle: 'none', color: '#A0A0A0', padding: 0 }}>
                <li style={{ marginBottom: '1rem' }}><i className="fa-solid fa-check" style={{ color: 'var(--primary-color)', marginRight: '10px' }}></i> <strong>Semantic Keyword Mapping:</strong> We map your skills to the specific synonyms used by the company's ATS.</li>
                <li style={{ marginBottom: '1rem' }}><i className="fa-solid fa-check" style={{ color: 'var(--primary-color)', marginRight: '10px' }}></i> <strong>Tone & Voice Alignment:</strong> If the JD is formal, we write formally. If it's a startup vibe, we adjust the narrative.</li>
                <li style={{ marginBottom: '1rem' }}><i className="fa-solid fa-check" style={{ color: 'var(--primary-color)', marginRight: '10px' }}></i> <strong>Value Proposition:</strong> We highlight the exact metrics in your experience that solve the company's pain points.</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(212, 199, 122, 0.05)', padding: '2.5rem', borderRadius: '20px', border: '1px dashed var(--primary-color)', backdropFilter: 'blur(5px)' }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--primary-color)', fontSize: '1.2rem' }}>Recruiter Insight</h4>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.6 }}>"A cover letter that explicitly references the needs mentioned in the job description has a 75% higher chance of being read fully by a human recruiter after passing the initial ATS scan."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why JD-Based Cover Letter Builder features */}
      <section id="how-it-works" className="features-section">
        <div className="container">
          <div className="section-title">
            <h2>Why Use Our <span>JD-Based</span> Builder?</h2>
            <p>A generic cover letter is a missed opportunity. Our tool ensures your application stands out.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card glass">
              <i className="fa-solid fa-magnifying-glass-chart"></i>
              <h3>ATS Optimization</h3>
              <p>We automatically extract keywords from the JD and weave them into your cover letter naturally.</p>
            </div>
            <div className="feature-card glass">
              <i className="fa-solid fa-pen-nib"></i>
              <h3>Perfect Grammar</h3>
              <p>Built-in checks for grammar, spelling, and professional tone to ensure zero errors.</p>
            </div>
            <div className="feature-card glass">
              <i className="fa-solid fa-file-export"></i>
              <h3>Ready to Export</h3>
              <p>Download your tailored cover letter in polished PDF or Word formats instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Builder Section */}
      <section id="builder-section" className="builder-section container">
        <div className="section-title">
          <span style={{ textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 900, fontSize: '0.8rem', color: 'var(--primary-color)', display: 'block', marginBottom: '10px' }}>The Semantic Match</span>
          <h2>Tailored <span>Cover Letters</span> Built From Your Target JD</h2>
          <p>Bridge the gap between your expertise and the recruiter's needs with high-precision semantic matching.</p>
        </div>

        <div className="builder-layout">
          {/* Form Side */}
          <div className="builder-form-side">
            {/* Step 1: Job Description */}
            <div className="step-card glass">
              <div className="step-num">01</div>
              <h3>The Job Description</h3>
              <p>Paste the job description you are targeting. Our AI will analyze it for key requirements.</p>
              <textarea 
                id="job-description" 
                className="form-input" 
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
              />
            </div>

            {/* Step 2: Details */}
            <div className="step-card glass">
              <div className="step-num">02</div>
              <h3>Your Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="form-input" placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label>Target Job Title</label>
                  <input type="text" value={targetTitle} onChange={(e) => setTargetTitle(e.target.value)} className="form-input" placeholder="Frontend Developer" />
                </div>
                <div className="form-group full-width">
                  <label>Key Experience (Summary)</label>
                  <textarea value={userExperience} onChange={(e) => setUserExperience(e.target.value)} className="form-input" placeholder="e.g., 5 years of React development, led a team of 3..." />
                </div>
                <div className="form-group">
                  <label>Education</label>
                  <input type="text" value={userEducation} onChange={(e) => setUserEducation(e.target.value)} className="form-input" placeholder="B.S. in Computer Science" />
                </div>
                <div className="form-group">
                  <label>Top Skills</label>
                  <input type="text" value={userSkills} onChange={(e) => setUserSkills(e.target.value)} className="form-input" placeholder="React, Node.js, AWS" />
                </div>
              </div>
            </div>

            {/* Step 3: Old Letter */}
            <div className="step-card glass">
              <div className="step-num">03</div>
              <h3>Old Cover Letter (Optional)</h3>
              <p>If you have an existing cover letter, upload it and our AI will improve it based on the JD.</p>
              
              <div 
                className="upload-box" 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {uploadedLetter ? (
                  <div className="uploaded-file">
                    <i className="fa-solid fa-file-circle-check"></i>
                    <span>{uploadedLetter.name}</span>
                  </div>
                ) : (
                  <>
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                    <span>Click or drag to upload (.pdf, .doc)</span>
                  </>
                )}
                <input ref={fileInputRef} type="file" onChange={handleFileUpload} accept=".pdf,.doc,.docx" hidden />
              </div>
            </div>

            {/* Step 4: Choose Template */}
            <div className="step-card glass">
              <div className="step-num">04</div>
              <h3>Choose Template (Optional)</h3>
              <p>Select a visual style for your cover letter. Default is Modern.</p>
              <div className="template-selector-grid">
                {[
                  { id: 'modern', label: 'Modern', class: 'modern' },
                  { id: 'classic', label: 'Classic', class: 'classic' },
                  { id: 'minimal', label: 'Minimal', class: 'minimal' },
                  { id: 'creative', label: 'Creative', class: 'creative' }
                ].map(tmpl => (
                  <div 
                    key={tmpl.id}
                    className={`template-option ${selectedTemplate === tmpl.id ? 'active' : ''}`}
                    onClick={() => setSelectedTemplate(tmpl.id)}
                  >
                    <div className={`template-thumb ${tmpl.class}`}></div>
                    <span>{tmpl.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="builder-actions">
              <button onClick={handleGenerate} className="btn btn-primary btn-block btn-lg">
                <i className="fa-solid fa-wand-magic-sparkles"></i> Generate AI Cover Letter
              </button>
            </div>
          </div>

          {/* Preview Side */}
          <div className="builder-preview-side">
            <div className="preview-container glass sticky-preview" id="preview-section">
              <div className="preview-header">
                <span><i className="fa-solid fa-eye"></i> Live Preview</span>
                <div className="preview-actions">
                  <button className="btn-icon" onClick={() => setShowMagnify(true)} disabled={!hasGenerated} title="Magnify"><i className="fa-solid fa-magnifying-glass-plus"></i></button>
                  <button className="btn-icon" onClick={handleDownloadPDF} disabled={!hasGenerated} title="Download PDF"><i className="fa-solid fa-file-pdf"></i></button>
                  <button className="btn-icon" onClick={handleDownloadWord} disabled={!hasGenerated} title="Download Word"><i className="fa-solid fa-file-word"></i></button>
                </div>
              </div>
              
              <div className="preview-content scroll-hide" id="preview-body">
                {isGenerating ? (
                  <div className="ai-loader-overlay">
                    <div className="loader-content">
                      <div className="ai-brain">
                        <i className="fa-solid fa-microchip"></i>
                      </div>
                      <h4>MockB AI is Writing...</h4>
                      <div className="typing-status">
                        {[
                          'Analyzing requirements...',
                          'Mapping skills & keywords...',
                          'Structuring narrative context...',
                          'Writing customized cover letter...'
                        ][loadingStep]}
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${(loadingStep + 1) * 25}%` }}></div>
                      </div>
                    </div>
                  </div>
                ) : hasGenerated ? (
                  /* High Fidelity Letter Document Output */
                  <div className={`cv-document ${selectedTemplate}`}>
                    {selectedTemplate === 'creative' ? (
                      <div className="creative-layout" style={{ display: 'grid', gridTemplateColumns: '30% 70%', minHeight: '100%', width: '100%' }}>
                        <div className="creative-sidebar" style={{ background: '#333333', color: '#ffffff', padding: '20px' }}>
                          <h3 style={{ margin: '0 0 10px', fontSize: '1.2rem', textTransform: 'uppercase' }}>{userName || 'John Doe'}</h3>
                          <p style={{ fontSize: '0.8rem', color: '#cccccc', margin: 0 }}>{targetTitle || 'Frontend Developer'}</p>
                          <div style={{ marginTop: '20px', fontSize: '0.75rem', lineHeight: '1.6' }}>
                            <div style={{ marginBottom: '8px' }}><i className="fa-solid fa-envelope"></i> Info: In-Session</div>
                            {userSkills && <div style={{ marginTop: '15px' }}><strong>Skills:</strong><br/>{userSkills}</div>}
                          </div>
                        </div>
                        <div className="creative-main" style={{ padding: '20px', background: '#ffffff', color: '#333333' }}>
                          <textarea
                            value={generatedLetter}
                            onChange={(e) => setGeneratedLetter(e.target.value)}
                            style={{ width: '100%', height: '100%', border: 'none', resize: 'none', background: 'transparent', outline: 'none', fontFamily: 'inherit', fontSize: '0.88rem', lineHeight: '1.6' }}
                          />
                        </div>
                      </div>
                    ) : (
                      <textarea
                        value={generatedLetter}
                        onChange={(e) => setGeneratedLetter(e.target.value)}
                        style={{ width: '100%', height: '100%', border: 'none', resize: 'none', background: 'transparent', outline: 'none', fontFamily: 'inherit', fontSize: '0.88rem', lineHeight: '1.6' }}
                      />
                    )}
                  </div>
                ) : (
                  <div className="preview-placeholder">
                    <i className="fa-solid fa-file-lines"></i>
                    <p>Fill in the details and click generate to see your AI-crafted cover letter here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Magnify Modal overlay */}
      {showMagnify && hasGenerated && (
        <div className="sa-overlay magnify-overlay" onClick={() => setShowMagnify(false)} style={{ padding: '50px 20px', alignItems: 'flex-start', overflowY: 'auto' }}>
          <div className="magnify-modal" onClick={e => e.stopPropagation()} style={{ width: '794px', maxWidth: '100%', margin: '0 auto', background: 'transparent', position: 'relative' }}>
            <button className="close-magnify" onClick={() => setShowMagnify(false)} style={{ position: 'absolute', top: '-15px', right: '-15px', zIndex: 100, background: '#D4C77A', color: '#000', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className={`cv-document ${selectedTemplate}`} style={{ background: '#fff', borderRadius: '8px', padding: selectedTemplate === 'creative' ? '0' : '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
              {selectedTemplate === 'creative' ? (
                <div className="creative-layout" style={{ display: 'grid', gridTemplateColumns: '30% 70%', minHeight: '100%', width: '100%' }}>
                  <div className="creative-sidebar" style={{ background: '#333333', color: '#ffffff', padding: '30px' }}>
                    <h3 style={{ margin: '0 0 10px', fontSize: '1.4rem', textTransform: 'uppercase' }}>{userName || 'John Doe'}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#cccccc', margin: 0 }}>{targetTitle || 'Frontend Developer'}</p>
                    <div style={{ marginTop: '20px', fontSize: '0.85rem', lineHeight: '1.6' }}>
                      <div style={{ marginBottom: '8px' }}><i className="fa-solid fa-envelope"></i> Info: In-Session</div>
                      {userSkills && <div style={{ marginTop: '15px' }}><strong>Skills:</strong><br/>{userSkills}</div>}
                    </div>
                  </div>
                  <div className="creative-main" style={{ padding: '30px', background: '#ffffff', color: '#333333' }}>
                    <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '11pt', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                      {generatedLetter}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '11pt', lineHeight: '1.6', color: '#333', whiteSpace: 'pre-wrap' }}>
                  {generatedLetter}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SweetAlert Custom Modal */}
      {alertMsg && (
        <div className="sa-overlay">
          <div className="sa-modal">
            <div className="sa-icon sa-warning">
              <span className="sa-body"></span>
              <span className="sa-dot"></span>
            </div>
            <h2>{alertMsg.title}</h2>
            <p>{alertMsg.text}</p>
            <button className="sa-confirm-btn" onClick={() => setAlertMsg(null)}>OK</button>
          </div>
        </div>
      )}

      {/* Success Stories Section */}
      <section className="success-stories features-section">
        <div className="container">
          <div className="section-title">
            <h2>Real <span>Success</span> Stories</h2>
            <p>See how our JD-based builder has helped professionals land their dream roles.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card glass">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)', fontWeight: 900 }}>JS</div>
                <div>
                  <h4 style={{ margin: 0, color: '#FFFFFF' }}>James Smith</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#A0A0A0' }}>Software Engineer @ Google</p>
                </div>
              </div>
              <p style={{ fontStyle: 'italic', color: '#A0A0A0' }}>"The AI analyzed the complex job description and highlighted my cloud experience in a way I couldn't have phrased myself. Got the interview in 2 days!"</p>
            </div>
            <div className="feature-card glass">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)', fontWeight: 900 }}>ML</div>
                <div>
                  <h4 style={{ margin: 0, color: '#FFFFFF' }}>Maria Lopez</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#A0A0A0' }}>Product Manager @ Amazon</p>
                </div>
              </div>
              <p style={{ fontStyle: 'italic', color: '#A0A0A0' }}>"I was struggling to tailor my letters. This tool made it so easy. The template choice also helped me match the company's formal vibe perfectly."</p>
            </div>
            <div className="feature-card glass">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)', fontWeight: 900 }}>RB</div>
                <div>
                  <h4 style={{ margin: 0, color: '#FFFFFF' }}>Robert Brown</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#A0A0A0' }}>Data Analyst @ Deloitte</p>
                </div>
              </div>
              <p style={{ fontStyle: 'italic', color: '#A0A0A0' }}>"ATS-friendly indeed! My response rate went from 10% to nearly 60% after I started using JD-based cover letters."</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section container">
        <div className="section-title">
          <h2><span>FAQs</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', textAlign: 'left' }}>
          <div className="glass" style={{ padding: '30px' }}>
            <h4 style={{ marginBottom: '15px', color: 'var(--primary-color)' }}>How does the AI analyze the JD?</h4>
            <p style={{ color: '#A0A0A0', fontSize: '0.95rem' }}>Our AI uses Natural Language Processing (NLP) to identify core competencies, required technical stacks, and even the "hidden" requirements implied by the job responsibilities.</p>
          </div>
          <div className="glass" style={{ padding: '30px' }}>
            <h4 style={{ marginBottom: '15px', color: 'var(--primary-color)' }}>Is the cover letter really ATS-friendly?</h4>
            <p style={{ color: '#A0A0A0', fontSize: '0.95rem' }}>Yes. We prioritize keyword density and formatting that standard ATS systems (like Workday, Greenhouse, or Lever) can easily parse and rank highly.</p>
          </div>
          <div className="glass" style={{ padding: '30px' }}>
            <h4 style={{ marginBottom: '15px', color: 'var(--primary-color)' }}>Can I edit the generated letter?</h4>
            <p style={{ color: '#A0A0A0', fontSize: '0.95rem' }}>Absolutely! You can edit the text directly inside the preview sheet or download it as a Word document (.doc) to make manual tweaks.</p>
          </div>
          <div className="glass" style={{ padding: '30px' }}>
            <h4 style={{ marginBottom: '15px', color: 'var(--primary-color)' }}>Does it work for all industries?</h4>
            <p style={{ color: '#A0A0A0', fontSize: '0.95rem' }}>Our AI is trained on over 50,000 job descriptions across tech, finance, healthcare, marketing, and more, making it versatile for any career path.</p>
          </div>
        </div>
      </section>
      </main>
      <HomeFooter />
    </>
  );
}
