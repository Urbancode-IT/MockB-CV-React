import React, { useState, useEffect } from 'react';
import { useResumeStore } from '../../../../store/useResumeStore';
import './AIBPromptSection.css';

export default function AIBPromptSection() {
  const resume = useResumeStore();
  const [promptText, setPromptText] = useState('');
  const [followupText, setFollowupText] = useState('');
  const [status, setStatus] = useState('empty'); // empty, loading, generated
  const [loadingStep, setLoadingStep] = useState(1);

  const handlePromptChange = (e) => {
    setPromptText(e.target.value);
  };

  const handleFollowupChange = (e) => {
    setFollowupText(e.target.value);
  };

  const capitaliseWords = (str) => {
    if (!str) return '';
    return str.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  };

  const buildSummary = (data) => {
    return `Highly skilled ${data.title || 'Professional'} with experience in ${data.skills.slice(0, 3).join(', ')}. Proven track record of excellence.`;
  };

  const parsePrompt = (text) => {
    const data = {
      personalInfo: {
        name: '', title: '', email: '', phone: '', location: '', linkedin: '', website: ''
      },
      summary: '', experience: [], education: [], skills: [], certifications: [],
      projects: [], awards: [], languages: [], internships: []
    };

    const sectionMap = {
      name: ['full name', 'name', 'applicant name'],
      phone: ['phone number', 'phone', 'contact number', 'mobile'],
      email: ['email', 'e-mail', 'email address'],
      linkedin: ['linkedin', 'linkedin profile'],
      website: ['portfolio/website', 'website', 'portfolio', 'personal website'],
      title: ['target job role', 'job title', 'role', 'desired position', 'applying for'],
      summary: ['professional summary', 'summary', 'profile', 'objective', 'about me'],
      skills: ['skills', 'core skills', 'technical skills', 'key skills', 'competencies', 'technologies'],
      experience: ['work experience', 'experience', 'work history', 'professional experience', 'employment history', 'previous role'],
      education: ['education', 'academic background', 'academic history', 'qualifications'],
      projects: ['projects', 'key projects', 'personal projects', 'portfolio projects'],
      certifications: ['certifications', 'certification', 'courses', 'certificates'],
      languages: ['languages', 'language skills'],
      internships: ['internships', 'internship'],
      awards: ['awards', 'honors', 'achievements', 'awards & honors']
    };

    const foundSections = [];
    Object.keys(sectionMap).forEach(key => {
      sectionMap[key].forEach(alias => {
        const regex = new RegExp(`(?:^|\\n)\\s*${alias}[:\\-]?\\s*(?:\\n|$)`, 'im');
        const m = text.match(regex);
        if (m) {
          foundSections.push({ key, index: m.index, length: m[0].length });
        }
      });
    });

    foundSections.sort((a, b) => a.index - b.index);

    const contentBlocks = {};
    for (let i = 0; i < foundSections.length; i++) {
      const start = foundSections[i].index + foundSections[i].length;
      const end = (i + 1 < foundSections.length) ? foundSections[i + 1].index : text.length;
      const blockText = text.substring(start, end).trim();
      if (!contentBlocks[foundSections[i].key]) {
        contentBlocks[foundSections[i].key] = blockText;
      }
    }

    const getB = (k) => contentBlocks[k] || '';

    data.personalInfo.name = getB('name').split('\n')[0] || text.split('\n').find(l => l.trim() && l.trim().split(' ').length <= 4) || "Applicant Name";
    data.personalInfo.email = getB('email').split('\n')[0] || (text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0]) || '';
    data.personalInfo.phone = getB('phone').split('\n')[0] || (text.match(/(?:\+?\d[\d\s\-().]{7,15}\d)/)?.[0]) || '';
    data.personalInfo.linkedin = getB('linkedin').split('\n')[0] || '';
    data.personalInfo.website = getB('website').split('\n')[0] || '';
    data.personalInfo.title = getB('title').split('\n')[0] || 'Professional';

    const rawSum = getB('summary');
    if (rawSum) {
      data.summary = rawSum.split('\n').filter(l => !l.toLowerCase().includes('3-4 line') && !l.toLowerCase().includes('position me')).join('\n').trim();
    }

    const sText = getB('skills');
    if (sText) {
      data.skills = sText.split(/[\n,;]/).map(s => s.trim().replace(/^[-•*]\s*/, '')).filter(s => s.length > 1);
    }

    const eText = getB('experience');
    if (eText) {
      const jobs = eText.split(/Job Title:?/i).filter(j => j.trim().length > 5);
      jobs.forEach((jb, jIndex) => {
        const company = jb.match(/Company Name:?\s*(.*)/i)?.[1]?.trim() || 'Company';
        const duration = jb.match(/Duration:?\s*(.*)/i)?.[1]?.trim() || 'Present';
        const resp = jb.match(/(?:Responsibilities & Achievements|Responsibilities|Achievements):?\s*([\s\S]*?)(?=\n[A-Z][a-z]+:?|$)/i);
        data.experience.push({
          id: `exp-ai-${jIndex}`,
          company: capitaliseWords(company),
          role: jb.split('\n')[0].trim() || 'Role',
          start: duration.split(/[–-]/)[0].trim(),
          end: duration.split(/[–-]/)[1] || 'Present',
          description: resp ? resp[1].split('\n').map(b => b.trim().replace(/^[-•*]\s*/, '')).filter(b => b.length > 5).join('\n') : ''
        });
      });
    }

    const edu = getB('education');
    if (edu) {
      const deg = edu.match(/Degree:?\s*(.*)/i)?.[1];
      const inst = edu.match(/Institution:?\s*(.*)/i)?.[1];
      const yr = edu.match(/Year:?\s*(\d{4})/i)?.[1];
      if (deg || inst) {
        data.education.push({
          id: 'edu-ai-0',
          degree: capitaliseWords(deg || 'Degree'),
          school: capitaliseWords(inst || 'University'),
          start: '',
          end: yr || ''
        });
      }
    }

    const projectsText = getB('projects');
    if (projectsText) {
      const pBlocks = projectsText.split(/Project Name:?/i).filter(p => p.trim().length > 5);
      pBlocks.forEach((pb, pIndex) => {
        const name = pb.split('\n')[0].trim();
        const desc = pb.match(/Description:?\s*([\s\S]*?)(?=\n[A-Z][a-z]+:?|$)/i);
        if (name) {
          data.experience.push({
            id: `proj-ai-${pIndex}`,
            company: capitaliseWords(name),
            role: 'Project',
            start: '',
            end: '',
            description: desc ? desc[1].split('\n').map(d => d.trim().replace(/^[-•*]\s*/, '')).filter(d => d.length > 3).join('\n') : ''
          });
        }
      });
    }

    const mapMisc = (k) => {
      if (contentBlocks[k]) return contentBlocks[k].split('\n').map(s => s.trim().replace(/^[-•*]\s*/, '')).filter(s => s.length > 3);
      return [];
    };
    data.certifications = mapMisc('certifications');
    data.languages = mapMisc('languages');
    data.awards = mapMisc('awards');

    const internshipsText = getB('internships');
    if (internshipsText) {
      const iBullets = internshipsText.split('\n').map(s => s.trim().replace(/^[-•*]\s*/, '')).filter(s => s.length > 3);
      iBullets.forEach((ib, iIndex) => {
        data.experience.push({
          id: `intern-ai-${iIndex}`,
          company: ib,
          role: 'Internship',
          start: '',
          end: '',
          description: ''
        });
      });
    }

    if (!data.summary) data.summary = buildSummary(data);

    return data;
  };

  const handleGenerate = () => {
    if (!promptText.trim()) return;
    setStatus('loading');
    setLoadingStep(0);
  };

  useEffect(() => {
    if (status !== 'loading') return;

    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev >= 5) {
          clearInterval(interval);
          const parsed = parsePrompt(promptText);
          resume.setResumeData(parsed);
          setStatus('generated');
          return 5;
        }
        return prev + 1;
      });
    }, 350);

    return () => clearInterval(interval);
  }, [status, promptText]);

  const handleUpdate = () => {
    if (!followupText.trim()) return;
    setStatus('loading');
    setLoadingStep(0);
    setFollowupText('');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadWord = () => {
    const name = resume.personalInfo.name || 'Your Name';
    const docHtml = document.getElementById('resume-doc').innerHTML;
    const blob = new Blob([`<html><head><meta charset="utf-8"></head><body>${docHtml}</body></html>`], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${name.replace(/\s+/g, '_')}_Resume.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="prompt-section" id="prompt-section">
      <div className="container">
        <div className="section-label"><i className="fa-solid fa-robot"></i> AI Resume Builder</div>
        <h2 className="section-title">Tell the AI about yourself</h2>
        <p className="section-sub">
          Describe your background in detail below. Include your name, job title, years of experience, companies you've worked at, education, skills, and any achievements. The AI will handle the rest.
        </p>

        <div className="builder-layout">
          {/* LEFT: Prompt Panel */}
          <div className="prompt-panel">
            <div className="prompt-card">
              <div className="prompt-card-header">
                <span><i className="fa-solid fa-pen-to-square"></i> Your Details Prompt</span>
                <span className="char-count">{promptText.length} / 3000</span>
              </div>
              <textarea
                value={promptText}
                onChange={handlePromptChange}
                className="prompt-textarea"
                maxLength={3000}
                placeholder="Example: My name is Arjun Kumar. I am a Senior Software Engineer with 5 years of experience. I worked at Infosys from 2019 to 2022 as a Backend Developer where I built REST APIs using Java and Spring Boot. Then I joined TCS in 2022 as a Senior Engineer working on microservices architecture. I have a B.Tech in Computer Science from Anna University 2019. My skills include Java, Python, Spring Boot, AWS, Docker, Kubernetes, MySQL. I want to apply for a Senior Software Engineer role..."
              />

              <div className="prompt-tips">
                <p><i className="fa-solid fa-lightbulb"></i> <strong>Tips for best results:</strong></p>
                <ul>
                  <li>Include your full name and current job title</li>
                  <li>List all companies with dates and your role there</li>
                  <li>Mention specific technologies, tools, and achievements</li>
                  <li>Include your education, certifications, and skills</li>
                  <li>Mention the target job role you're applying for</li>
                </ul>
              </div>

              <button className="btn-generate" onClick={handleGenerate} disabled={status === 'loading'}>
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                <span>{status === 'loading' ? 'Generating...' : 'Generate My Resume'}</span>
              </button>
            </div>

            {/* Followup Card */}
            {status === 'generated' && (
              <div className="followup-card">
                <div className="prompt-card-header">
                  <span><i className="fa-solid fa-rotate"></i> Request Changes</span>
                </div>
                <textarea
                  value={followupText}
                  onChange={handleFollowupChange}
                  className="prompt-textarea small"
                  maxLength={1000}
                  placeholder="Example: Change my job title to Lead Engineer. Add more achievements to my TCS experience. Make the summary more impactful..."
                />
                <button className="btn-generate secondary" onClick={handleUpdate}>
                  <i className="fa-solid fa-rotate"></i> Update Resume
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: Preview Panel */}
          <div className="preview-panel">
            {status === 'empty' && (
              <div className="preview-empty">
                <div className="empty-icon"><i className="fa-solid fa-file-circle-plus"></i></div>
                <h3>Your resume will appear here</h3>
                <p>Fill in your details in the prompt on the left and click "Generate My Resume" to see your AI-generated resume.</p>
              </div>
            )}

            {status === 'loading' && (
              <div className="preview-loading">
                <div className="ai-loader">
                  <div className="loader-ring"></div>
                  <div className="loader-ring"></div>
                  <div className="loader-ring"></div>
                </div>
                <h3>AI is crafting your resume...</h3>
                <div className="loading-steps">
                  <div className={`load-step ${loadingStep >= 1 ? 'done' : ''}`}>
                    <i className={`fa-solid ${loadingStep >= 1 ? 'fa-check-circle' : 'fa-circle-notch fa-spin'}`}></i> Analyzing your details
                  </div>
                  <div className={`load-step ${loadingStep >= 2 ? 'done' : ''}`}>
                    <i className={`fa-solid ${loadingStep >= 2 ? 'fa-check-circle' : 'fa-circle-notch fa-spin'}`}></i> Fixing grammar & spelling
                  </div>
                  <div className={`load-step ${loadingStep >= 3 ? 'done' : ''}`}>
                    <i className={`fa-solid ${loadingStep >= 3 ? 'fa-check-circle' : 'fa-circle-notch fa-spin'}`}></i> Optimizing ATS keywords
                  </div>
                  <div className={`load-step ${loadingStep >= 4 ? 'done' : ''}`}>
                    <i className={`fa-solid ${loadingStep >= 4 ? 'fa-check-circle' : 'fa-circle-notch fa-spin'}`}></i> Enhancing content
                  </div>
                  <div className={`load-step ${loadingStep >= 5 ? 'done' : ''}`}>
                    <i className={`fa-solid ${loadingStep >= 5 ? 'fa-check-circle' : 'fa-circle-notch fa-spin'}`}></i> Formatting resume
                  </div>
                </div>
              </div>
            )}

            {status === 'generated' && (
              <div className="resume-preview-wrapper">
                <div className="preview-toolbar">
                  <span className="preview-label"><i className="fa-solid fa-eye"></i> Resume Preview</span>
                  <div className="preview-actions">
                    <button className="prev-action-btn" id="btn-pdf" onClick={handlePrint}>
                      <i className="fa-solid fa-file-pdf"></i> Download PDF
                    </button>
                    <button className="prev-action-btn" id="btn-word" onClick={handleDownloadWord}>
                      <i className="fa-solid fa-file-word"></i> Download Word
                    </button>
                  </div>
                </div>
                <div className="resume-doc" id="resume-doc">
                  <div className="r-name">{resume.personalInfo.name.toUpperCase()}</div>
                  <div className="r-title">{resume.personalInfo.title}</div>
                  <div className="r-contact">
                    {resume.personalInfo.email && <span>✉ {resume.personalInfo.email}</span>}
                    {resume.personalInfo.phone && <span>📞 {resume.personalInfo.phone}</span>}
                    {resume.personalInfo.linkedin && <span>🔗 LinkedIn</span>}
                    {resume.personalInfo.website && <span>🌐 Portfolio</span>}
                  </div>

                  {resume.summary && (
                    <div className="r-section">
                      <div className="r-section-title">Summary</div>
                      <p className="r-summary">{resume.summary}</p>
                    </div>
                  )}

                   {resume.experience && resume.experience.length > 0 && (() => {
                     const realExp = resume.experience.filter(exp => exp.role !== 'Project' && exp.role !== 'Internship');
                     const projects = resume.experience.filter(exp => exp.role === 'Project');
                     const internships = resume.experience.filter(exp => exp.role === 'Internship');
                     return (
                       <>
                         {realExp.length > 0 && (
                           <div className="r-section">
                             <div className="r-section-title">Experience</div>
                             {realExp.map(exp => (
                               <div className="r-item" key={exp.id}>
                                 <div className="r-item-header">
                                   <span className="r-item-title">{exp.company}</span>
                                   <span className="r-item-date">{exp.start} – {exp.end}</span>
                                 </div>
                                 <div className="r-item-sub">{exp.role}</div>
                                 <ul>
                                   {exp.description.split('\n').filter(Boolean).map((bullet, idx) => (
                                     <li key={idx}>{bullet}</li>
                                   ))}
                                 </ul>
                               </div>
                             ))}
                           </div>
                         )}

                         {projects.length > 0 && (
                           <div className="r-section">
                             <div className="r-section-title">Projects</div>
                             {projects.map(proj => (
                               <div className="r-item" key={proj.id}>
                                 <div className="r-item-title" style={{ fontWeight: 700, color: '#1a1a1a', fontSize: '0.84rem' }}>{proj.company}</div>
                                 <ul>
                                   {proj.description.split('\n').filter(Boolean).map((bullet, idx) => (
                                     <li key={idx}>{bullet}</li>
                                   ))}
                                 </ul>
                               </div>
                             ))}
                           </div>
                         )}

                         {internships.length > 0 && (
                           <div className="r-section">
                             <div className="r-section-title">Internships</div>
                             <ul>
                               {internships.map(intern => (
                                 <li key={intern.id}>{intern.company}</li>
                               ))}
                             </ul>
                           </div>
                         )}
                       </>
                     );
                   })()}

                  {resume.education && resume.education.length > 0 && (
                    <div className="r-section">
                      <div className="r-section-title">Education</div>
                      {resume.education.map(edu => (
                        <div className="r-item" key={edu.id}>
                          <div className="r-item-header">
                            <span className="r-item-title">{edu.degree}</span>
                            <span className="r-item-date">{edu.end}</span>
                          </div>
                          <div className="r-item-sub">{edu.school}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {resume.skills && resume.skills.length > 0 && (
                    <div className="r-section">
                      <div className="r-section-title">Skills</div>
                      <div className="r-skills-wrap">
                        {resume.skills.map((skill, idx) => (
                          <span className="r-skill" key={idx}>{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {resume.certifications && resume.certifications.length > 0 && (
                    <div className="r-section">
                      <div className="r-section-title">Certifications</div>
                      <ul>
                        {resume.certifications.map((c, idx) => (
                          <li key={idx}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {resume.awards && resume.awards.length > 0 && (
                    <div className="r-section">
                      <div className="r-section-title">Awards</div>
                      <ul>
                        {resume.awards.map((a, idx) => (
                          <li key={idx}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {resume.languages && resume.languages.length > 0 && (
                    <div className="r-section">
                      <div className="r-section-title">Languages</div>
                      <p>{resume.languages.join(' • ')}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
