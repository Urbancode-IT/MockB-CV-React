import React from 'react';
import './RBGeneratorWizard.css';

const TOTAL_STEPS = 5;

export default function RBGeneratorWizard({
  targetRole,
  generatorStep,
  formData,
  isGenerating,
  onFormChange,
  onNextStep,
  onPrevStep,
  onExit,
}) {
  return (
    <main className="generator-container rbrb-page">
      {/* Exit button — top right, matching the HTML generate.html */}
      {onExit && (
        <button className="generator-exit-btn" onClick={onExit}>
          Exit
        </button>
      )}
      <div className="generator-card glass" style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        {!isGenerating ? (
          <div>
            {/* Step Indicator */}
            <div className="step-indicator">
              {[1, 2, 3, 4, 5].map(s => (
                <div key={s} className={`step-dot ${generatorStep === s ? 'active' : ''}`}>
                  {s}
                </div>
              ))}
            </div>

            <form onSubmit={e => e.preventDefault()}>
              {/* Step 1: Personal Details */}
              {generatorStep === 1 && (
                <div className="form-step active" style={{ textAlign: 'left' }}>
                  <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>
                    Personal <span style={{ color: 'var(--primary-color)' }}>Details</span>
                  </h2>
                  <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>
                    Provide your basic contact information.
                  </p>
                  <div className="input-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={e => onFormChange('fullName', e.target.value)}
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div className="input-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label>Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => onFormChange('email', e.target.value)}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => onFormChange('phone', e.target.value)}
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Target Role */}
              {generatorStep === 2 && (
                <div className="form-step active" style={{ textAlign: 'left' }}>
                  <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>
                    Target <span style={{ color: 'var(--primary-color)' }}>Role</span>
                  </h2>
                  <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>
                    Tell us what specific job you're aiming for.
                  </p>
                  <div className="input-group">
                    <label>Selected Role</label>
                    <input
                      type="text"
                      value={targetRole}
                      readOnly
                      style={{ background: 'rgba(255, 255, 255, 0.08)', cursor: 'not-allowed' }}
                    />
                  </div>
                  <div className="input-group">
                    <label>Experience Level</label>
                    <select
                      value={formData.experienceLevel}
                      onChange={e => onFormChange('experienceLevel', e.target.value)}
                      style={{ color: '#fff', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      <option value="entry">Entry Level (0-2 years)</option>
                      <option value="mid">Mid-Senior (3-6 years)</option>
                      <option value="senior">Senior/Lead (7+ years)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Core Expertise */}
              {generatorStep === 3 && (
                <div className="form-step active" style={{ textAlign: 'left' }}>
                  <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>
                    Core <span style={{ color: 'var(--primary-color)' }}>Expertise</span>
                  </h2>
                  <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>
                    List your main technologies and skills for this role.
                  </p>
                  <div className="input-group">
                    <label>Technical Skills (Comma separated)</label>
                    <textarea
                      rows="4"
                      value={formData.skills}
                      onChange={e => onFormChange('skills', e.target.value)}
                      placeholder="React, TypeScript, Node.js, AWS, System Design..."
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Step 4: Your Impact */}
              {generatorStep === 4 && (
                <div className="form-step active" style={{ textAlign: 'left' }}>
                  <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>
                    Your <span style={{ color: 'var(--primary-color)' }}>Impact</span>
                  </h2>
                  <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>
                    Briefly describe your biggest achievement in this role.
                  </p>
                  <div className="input-group">
                    <label>Professional Summary</label>
                    <textarea
                      rows="5"
                      value={formData.bio}
                      onChange={e => onFormChange('bio', e.target.value)}
                      placeholder="I am a passionate developer who built a high-traffic e-commerce platform..."
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Step 5: Template Selection */}
              {generatorStep === 5 && (
                <div className="form-step active" style={{ textAlign: 'left' }}>
                  <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>
                    Choose <span style={{ color: 'var(--primary-color)' }}>Template</span>
                  </h2>
                  <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>
                    Select a premium design for your resume.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                    <label className="template-option" style={{ cursor: 'pointer', position: 'relative', borderRadius: '12px', display: 'block' }}>
                      <input
                        type="radio"
                        name="template"
                        value="modern"
                        style={{ display: 'none' }}
                        checked={formData.template === 'modern'}
                        onChange={() => onFormChange('template', 'modern')}
                      />
                      <img
                        src="/images/RESUME TEMPLATES/file_00000000ca6c7208a76594f2e619499a.png"
                        alt="ModernClean"
                        style={{
                          width: '100%', height: '250px', objectFit: 'cover', objectPosition: 'top',
                          borderRadius: '10px',
                          border: formData.template === 'modern' ? '3px solid var(--primary-color)' : '3px solid transparent',
                          boxShadow: formData.template === 'modern' ? '0 0 20px rgba(212, 199, 122, 0.4)' : 'none',
                          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
                        }}
                      />
                      <div style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#fff' }}>Modern Clean</div>
                    </label>
                    <label className="template-option" style={{ cursor: 'pointer', position: 'relative', borderRadius: '12px', display: 'block' }}>
                      <input
                        type="radio"
                        name="template"
                        value="creative"
                        style={{ display: 'none' }}
                        checked={formData.template === 'creative'}
                        onChange={() => onFormChange('template', 'creative')}
                      />
                      <img
                        src="/images/RESUME TEMPLATES/file_00000000f3207208b912c6c636a195a1.png"
                        alt="CreativeBold"
                        style={{
                          width: '100%', height: '250px', objectFit: 'cover', objectPosition: 'top',
                          borderRadius: '10px',
                          border: formData.template === 'creative' ? '3px solid var(--primary-color)' : '3px solid transparent',
                          boxShadow: formData.template === 'creative' ? '0 0 20px rgba(212, 199, 122, 0.4)' : 'none',
                          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
                        }}
                      />
                      <div style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#fff' }}>Creative Bold</div>
                    </label>
                  </div>
                </div>
              )}

              {/* Button Group */}
              <div className="btn-group">
                {generatorStep > 1 && (
                  <button type="button" className="btn btn-dark" onClick={onPrevStep}>
                    Back
                  </button>
                )}
                <div style={{ display: 'flex', gap: '1rem', marginLeft: 'auto' }}>
                  <button type="button" className="btn btn-dark" onClick={onNextStep}>
                    Skip
                  </button>
                  <button
                    type="button"
                    className={`btn btn-primary ${generatorStep === TOTAL_STEPS ? 'btn-premium' : ''}`}
                    onClick={onNextStep}
                  >
                    {generatorStep === TOTAL_STEPS ? 'Generate Resume' : 'Next Step'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* Loading Screen */
          <div className="loading-screen" style={{ display: 'block' }}>
            <div className="spinner"></div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>
              Generating Your <span style={{ color: 'var(--primary-color)' }}>Tailored Resume</span>
            </h2>
            <p style={{ color: 'var(--text-gray)' }}>
              Our AI is optimizing keywords and formatting for the <span>{targetRole}</span> role...
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
