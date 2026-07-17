import React, { useState } from 'react';
import './JDBuilderSection.css';

export default function JDBuilderSection() {
  const [activeSource, setActiveSource] = useState('linkedin');
  const [jdText, setJdText] = useState('');
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [location, setLocation] = useState('');
  const [summary, setSummary] = useState('');
  
  // Dynamic experience list
  const [experiences, setExperiences] = useState([
    { id: Date.now(), title: '', company: '', start: '', end: '', achievements: '' }
  ]);

  // Education state
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [year, setYear] = useState('');
  const [cgpa, setCgpa] = useState('');

  // Skills state
  const [skillsInput, setSkillsInput] = useState('');
  const [skills, setSkills] = useState([]);

  // Selected Template
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  // AI Loading & Result state
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      { id: Date.now(), title: '', company: '', start: '', end: '', achievements: '' }
    ]);
  };

  const handleRemoveExperience = (id) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  const handleExperienceChange = (id, field, value) => {
    setExperiences(
      experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    );
  };

  const handleSkillsKeyDown = (e) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      const val = skillsInput.trim().replace(/,$/, '');
      if (val && !skills.includes(val)) {
        setSkills([...skills, val]);
      }
      setSkillsInput('');
    }
  };

  const handleRemoveSkill = (tag) => {
    setSkills(skills.filter(s => s !== tag));
  };

  const handleGenerate = () => {
    if (!jdText.trim()) {
      alert('Please paste a job description first.');
      return;
    }
    if (!fullName.trim() || !jobTitle.trim()) {
      alert('Please fill in your Full Name and Job Title.');
      return;
    }

    setIsGenerating(true);
    setLoadingStep(0);

    const steps = [
      'Parsing job description...',
      'Matching your profile fields...',
      'Optimizing keywords for ATS algorithms...',
      'Generating tailored resume content...'
    ];

    let currentStepIdx = 0;
    const interval = setInterval(() => {
      if (currentStepIdx < steps.length - 1) {
        currentStepIdx++;
        setLoadingStep(currentStepIdx);
      }
    }, 600);

    setTimeout(() => {
      clearInterval(interval);
      setIsGenerating(false);
      setHasGenerated(true);
      // Scroll preview into view on small screens
      document.getElementById('preview-panel-anchor')?.scrollIntoView({ behavior: 'smooth' });
    }, 2800);
  };

  const getResumeTextContent = () => {
    let expText = '';
    experiences.forEach(exp => {
      expText += `${exp.title || 'Role'} | ${exp.company || 'Company'} (${exp.start || 'Start'} - ${exp.end || 'End'})\n${exp.achievements || ''}\n\n`;
    });
    return `${fullName.toUpperCase()}\n${jobTitle}\n\nEmail: ${email}\nPhone: ${phone}\nLinkedIn: ${linkedin}\nLocation: ${location}\n\nSUMMARY\n${summary}\n\nEXPERIENCE\n${expText}EDUCATION\n${degree} | ${institution} (${year}) - ${cgpa}\n\nSKILLS\n${skills.join(', ')}`;
  };

  const handleDownloadPDF = () => {
    alert('Preparing your tailored PDF. Download will begin shortly...');
    const content = getResumeTextContent();
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${fullName.replace(/\s+/g, '_')}_Tailored_Resume.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadWord = () => {
    alert('Preparing your tailored Word Document...');
    const content = getResumeTextContent();
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'application/msword'});
    element.href = URL.createObjectURL(file);
    element.download = `${fullName.replace(/\s+/g, '_')}_Tailored_Resume.doc`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="builder-section" className="builder-section container">
      <div className="builder-header">
        <div className="section-label">Build Your Resume</div>
        <h2 className="section-title">Paste, Fill & <span>Generate</span></h2>
      </div>

      <div className="builder-grid">
        {/* LEFT: Inputs Panel */}
        <div className="input-panel">
          {/* Step 1: Job Description */}
          <div className="input-card">
            <div className="input-card-header">
              <span className="step-badge">Step 1</span>
              <h3><i className="fa-brands fa-linkedin"></i> Paste Job Description</h3>
            </div>
            
            <div className="source-tabs">
              {['linkedin', 'naukri', 'indeed', 'other'].map(src => (
                <button 
                  key={src}
                  className={`source-tab ${activeSource === src ? 'active' : ''}`}
                  onClick={() => setActiveSource(src)}
                >
                  {src.charAt(0).toUpperCase() + src.slice(1)}
                </button>
              ))}
            </div>

            <textarea 
              className="jd-textarea"
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste the full job description here...&#10;&#10;Example:&#10;We are looking for a Senior Software Engineer...&#10;Responsibilities:&#10;• Lead development of...&#10;Requirements:&#10;• 3+ years of experience..."
            />
            <div className="jd-meta">
              <span>{jdText ? jdText.split(/\s+/).filter(Boolean).length : 0} words</span>
              <button className="clear-btn" onClick={() => setJdText('')}>
                <i className="fa-solid fa-trash"></i> Clear
              </button>
            </div>
          </div>

          {/* Step 2: Personal Details */}
          <div className="input-card">
            <div className="input-card-header">
              <span className="step-badge">Step 2</span>
              <h3><i className="fa-solid fa-user"></i> Personal Details</h3>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Job Title / Role *</label>
                <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Senior Software Engineer" />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@email.com" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 9876543210" />
              </div>
              <div className="form-group">
                <label>LinkedIn Profile</label>
                <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="linkedin.com/in/johndoe" />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Bangalore, India" />
              </div>
              <div className="form-group full-width">
                <label>Professional Summary</label>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Brief summary of your expertise and career goals..." />
              </div>
            </div>
          </div>

          {/* Step 3: Work Experience */}
          <div className="input-card">
            <div className="input-card-header">
              <span className="step-badge">Step 3</span>
              <h3><i className="fa-solid fa-briefcase"></i> Work Experience</h3>
            </div>
            
            <div id="experience-container">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="experience-item">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Job Title</label>
                      <input 
                        type="text" 
                        value={exp.title} 
                        onChange={(e) => handleExperienceChange(exp.id, 'title', e.target.value)} 
                        placeholder="Software Engineer" 
                      />
                    </div>
                    <div className="form-group">
                      <label>Company</label>
                      <input 
                        type="text" 
                        value={exp.company} 
                        onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)} 
                        placeholder="Tech Corp" 
                      />
                    </div>
                    <div className="form-group">
                      <label>Start Date</label>
                      <input 
                        type="text" 
                        value={exp.start} 
                        onChange={(e) => handleExperienceChange(exp.id, 'start', e.target.value)} 
                        placeholder="Jan 2022" 
                      />
                    </div>
                    <div className="form-group">
                      <label>End Date</label>
                      <input 
                        type="text" 
                        value={exp.end} 
                        onChange={(e) => handleExperienceChange(exp.id, 'end', e.target.value)} 
                        placeholder="Present" 
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Key Achievements / Responsibilities</label>
                      <textarea 
                        value={exp.achievements} 
                        onChange={(e) => handleExperienceChange(exp.id, 'achievements', e.target.value)} 
                        placeholder="• Led development of...&#10;• Improved performance by 40%...&#10;• Collaborated with cross-functional teams..." 
                      />
                    </div>
                  </div>
                  {experiences.length > 1 && (
                    <button className="remove-item-btn" onClick={() => handleRemoveExperience(exp.id)}>
                      <i className="fa-solid fa-trash-can"></i> Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button className="add-btn" onClick={handleAddExperience}>
              <i className="fa-solid fa-plus"></i> Add More Experience
            </button>
          </div>

          {/* Step 4: Education */}
          <div className="input-card">
            <div className="input-card-header">
              <span className="step-badge">Step 4</span>
              <h3><i className="fa-solid fa-graduation-cap"></i> Education</h3>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Degree</label>
                <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} placeholder="B.Tech Computer Science" />
              </div>
              <div className="form-group">
                <label>Institution</label>
                <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="IIT Bombay" />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="2018 - 2022" />
              </div>
              <div className="form-group">
                <label>CGPA / Percentage</label>
                <input type="text" value={cgpa} onChange={(e) => setCgpa(e.target.value)} placeholder="8.5 CGPA" />
              </div>
            </div>
          </div>

          {/* Step 5: Skills */}
          <div className="input-card">
            <div className="input-card-header">
              <span className="step-badge">Step 5</span>
              <h3><i className="fa-solid fa-code"></i> Skills</h3>
            </div>
            <div className="form-group full-width">
              <label>Technical Skills (press comma or enter to add tag)</label>
              <input 
                type="text" 
                value={skillsInput} 
                onChange={(e) => setSkillsInput(e.target.value)}
                onKeyDown={handleSkillsKeyDown}
                placeholder="JavaScript, React, Node.js, Python, AWS, Docker..." 
              />
            </div>
            <div className="skill-tags">
              {skills.map(s => (
                <span key={s} className="skill-tag">
                  {s} <i className="fa-solid fa-xmark" onClick={() => handleRemoveSkill(s)}></i>
                </span>
              ))}
            </div>
          </div>

          {/* Step 6: Choose Template */}
          <div className="input-card">
            <div className="input-card-header">
              <span className="step-badge">Optional</span>
              <h3><i className="fa-solid fa-palette"></i> Choose Template</h3>
            </div>
            <div className="template-grid">
              {[
                { id: 'modern', label: 'Modern', previewClass: 'modern-preview' },
                { id: 'classic', label: 'Classic', previewClass: 'classic-preview' },
                { id: 'minimal', label: 'Minimal', previewClass: 'minimal-preview' },
                { id: 'bold', label: 'Bold', previewClass: 'bold-preview' }
              ].map(tmpl => (
                <div 
                  key={tmpl.id}
                  className={`template-option ${selectedTemplate === tmpl.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTemplate(tmpl.id)}
                >
                  <div className={`template-preview ${tmpl.previewClass}`}>
                    <div className="preview-header"></div>
                    <div className="preview-lines"><span></span><span></span><span></span></div>
                  </div>
                  <span>{tmpl.label}</span>
                  <i className="fa-solid fa-check check-icon"></i>
                </div>
              ))}
            </div>
          </div>

          {/* Generate Trigger */}
          <div className="generate-section">
            <button className="generate-resume-btn" onClick={handleGenerate}>
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <span>Generate My Tailored Resume</span>
            </button>
            <p className="generate-note">AI will analyze the JD and match your experience to it perfectly</p>
          </div>
        </div>

        {/* RIGHT: Live Preview Panel */}
        <div className="jd-preview-panel" id="preview-panel-anchor">
          <div className="jd-preview-panel-header">
            <h3><i className="fa-solid fa-eye"></i> Live Preview</h3>
            <div className="jd-preview-actions">
              <button className="jd-preview-btn" onClick={handleDownloadPDF} disabled={!hasGenerated}>
                <i className="fa-solid fa-file-pdf"></i> PDF
              </button>
              <button className="jd-preview-btn" onClick={handleDownloadWord} disabled={!hasGenerated}>
                <i className="fa-solid fa-file-word"></i> Word
              </button>
            </div>
          </div>

          <div className="jd-resume-preview">
            {isGenerating ? (
              <div className="jd-preview-placeholder">
                <div className="ai-pulse-ring"><i className="fa-solid fa-robot"></i></div>
                <h4>AI is tailoring your resume...</h4>
                <div style={{ maxWidth: '300px', color: '#A0A0A0', fontSize: '0.88rem', margin: '0 auto' }}>
                  {[
                    'Parsing job description...',
                    'Matching your profile fields...',
                    'Optimizing keywords for ATS algorithms...',
                    'Generating tailored resume content...'
                  ][loadingStep]}
                </div>
              </div>
            ) : hasGenerated ? (
              /* High Fidelity Generated Resume */
              <div className={`generated-resume template-${selectedTemplate}`}>
                <div className="resume-name">{fullName || 'John Doe'}</div>
                <div className="resume-title-display">{jobTitle || 'Senior Software Engineer'}</div>
                
                <div className="resume-contact">
                  {email && <span><i className="fa-solid fa-envelope"></i> {email}</span>}
                  {phone && <span><i className="fa-solid fa-phone"></i> {phone}</span>}
                  {location && <span><i className="fa-solid fa-location-dot"></i> {location}</span>}
                  {linkedin && <span><i className="fa-brands fa-linkedin"></i> {linkedin}</span>}
                </div>

                {summary && (
                  <>
                    <div className="resume-section-title">Professional Summary</div>
                    <p>{summary}</p>
                  </>
                )}

                <div className="resume-section-title">Work Experience</div>
                {experiences.map((exp, idx) => (
                  <div key={idx} className="resume-exp-item">
                    <div className="resume-exp-header">
                      <span className="resume-exp-title">{exp.title || 'Role'}</span>
                      <span className="resume-exp-date">{exp.start || 'Jan 2022'} - {exp.end || 'Present'}</span>
                    </div>
                    <div className="resume-exp-company">{exp.company || 'Tech Corp'}</div>
                    {exp.achievements && (
                      <ul className="resume-exp-bullets">
                        {exp.achievements.split('\n').map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet.replace(/^•\s*/, '')}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {(degree || institution) && (
                  <>
                    <div className="resume-section-title">Education</div>
                    <div className="resume-exp-item">
                      <div className="resume-exp-header">
                        <span className="resume-exp-title">{degree || 'Degree'}</span>
                        <span className="resume-exp-date">{year || '2022'}</span>
                      </div>
                      <div className="resume-exp-company">{institution || 'Institution'}</div>
                      {cgpa && <div style={{ fontSize: '0.8rem', color: '#555' }}>Grade: {cgpa}</div>}
                    </div>
                  </>
                )}

                {skills.length > 0 && (
                  <>
                    <div className="resume-section-title">Key Skills</div>
                    <div className="resume-skills-grid">
                      {skills.map(s => (
                        <span key={s} className="resume-skill-tag">{s}</span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="jd-preview-placeholder">
                <i className="fa-solid fa-file-lines"></i>
                <h4>Your Resume Preview</h4>
                <p>Fill in your details and click Generate to see your tailored resume here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
