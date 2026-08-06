import React, { useRef } from 'react';
import './ATSUpload.css';

export default function ATSUpload({
  mode,
  uploadedFile,
  jobDescription,
  resumeText,
  onJobDescriptionChange,
  onResumeTextChange,
  onFileChange,
  onRemove,
  onCheck,
  checking,
  error,
  recruiterFiles,
  onRecruiterFileChange,
  onRemoveRecruiter,
  onRankCandidates,
  ranking,
}) {
  const fileInputRef = useRef(null);
  const recruiterInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    if (mode === 'jobseeker' && e.dataTransfer.files[0]) onFileChange(e.dataTransfer.files[0]);
  };
  const handleDragOver = (e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); };
  const handleDragLeave = (e) => e.currentTarget.classList.remove('drag-over');

  if (mode === 'recruiter') {
    return (
      <section className="upload-section container" id="upload-section">
        <div
          className="upload-card"
          onClick={() => recruiterInputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="upload-icon-wrap"><i className="fa-solid fa-cloud-arrow-up"></i></div>
          <h2>Upload Multiple Resumes</h2>
          <p>Select up to 10 files or drag them here</p>
          <p className="upload-hint"><i className="fa-solid fa-file-pdf"></i> PDF &nbsp;|&nbsp; <i className="fa-solid fa-file-word"></i> Word (.doc / .docx)</p>
          <input type="file" ref={recruiterInputRef} onChange={(e) => onRecruiterFileChange(Array.from(e.target.files))} accept=".pdf,.doc,.docx" multiple hidden />
          {recruiterFiles.length > 0 && (
            <div className="files-list" onClick={(e) => e.stopPropagation()}>
              {recruiterFiles.map((file, idx) => (
                <div key={idx} className="file-list-row">
                  <span><i className="fa-solid fa-file-lines"></i> {file.name}</span>
                  <button onClick={() => onRemoveRecruiter(idx)}><i className="fa-solid fa-xmark"></i></button>
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="btn-check-ats" onClick={onRankCandidates} disabled={recruiterFiles.length === 0 || ranking}>
          <i className="fa-solid fa-magnifying-glass-chart"></i>
          <span>{ranking ? 'Ranking Candidates...' : 'Rank Candidates with AI'}</span>
        </button>
      </section>
    );
  }

  return (
    <section className="upload-section container" id="upload-section">
      <div className="input-card" style={{ marginBottom: '1.25rem', padding: '1.25rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h3 style={{ marginBottom: '0.75rem' }}><i className="fa-solid fa-briefcase"></i> Target Job Description</h3>
        <textarea
          value={jobDescription || ''}
          onChange={(e) => onJobDescriptionChange?.(e.target.value)}
          placeholder="Paste the job description you are applying for..."
          rows={5}
          style={{ width: '100%', resize: 'vertical', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.2)', color: 'inherit' }}
        />
      </div>

      <div
        className="upload-card"
        id="drop-zone"
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="upload-icon-wrap"><i className="fa-solid fa-cloud-arrow-up"></i></div>
        <h2>Upload Your Resume</h2>
        <p>Drag &amp; drop your resume here, or click to browse</p>
        <p className="upload-hint"><i className="fa-solid fa-file-pdf"></i> PDF &nbsp;|&nbsp; <i className="fa-solid fa-file-word"></i> Word (.doc / .docx) &nbsp;|&nbsp; Max 5MB</p>
        <input type="file" ref={fileInputRef} id="resume-file" accept=".pdf,.doc,.docx" onChange={(e) => e.target.files[0] && onFileChange(e.target.files[0])} hidden />
        {!uploadedFile ? (
          <button className="btn-upload" id="browse-btn" onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }}>
            <i className="fa-solid fa-folder-open"></i> Browse File
          </button>
        ) : (
          <div className="file-selected" id="file-selected" onClick={(e) => e.stopPropagation()}>
            <i className="fa-solid fa-file-circle-check"></i>
            <span id="file-name-display">{uploadedFile.name}</span>
            <button className="remove-file" id="remove-file" onClick={onRemove}><i className="fa-solid fa-xmark"></i></button>
          </div>
        )}
      </div>

      <div className="input-card" style={{ marginTop: '1.25rem', padding: '1.25rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h3 style={{ marginBottom: '0.75rem' }}><i className="fa-solid fa-file-lines"></i> Resume Text</h3>
        <textarea
          value={resumeText || ''}
          onChange={(e) => onResumeTextChange?.(e.target.value)}
          placeholder="Paste your resume content here (required for AI ATS analysis)..."
          rows={8}
          style={{ width: '100%', resize: 'vertical', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.2)', color: 'inherit' }}
        />
      </div>

      {error && <p style={{ color: '#f97316', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}

      <button className="btn-check-ats" id="check-ats-btn" onClick={onCheck} disabled={checking || !jobDescription?.trim() || !resumeText?.trim()}>
        <i className="fa-solid fa-magnifying-glass-chart"></i>
        <span>{checking ? 'Scanning Resume...' : 'Check ATS Score of My Resume'}</span>
      </button>
    </section>
  );
}
