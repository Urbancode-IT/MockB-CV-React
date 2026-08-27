import React, { useState, useEffect } from 'react';
import { useCoverLetterStore } from '../store/useCoverLetterStore';
import { generateCoverLetter } from '../services/aiService';
import './AICoverLetterBuilder.css';

export default function AICoverLetterBuilder() {
    const clStore = useCoverLetterStore();

    // Scroll to top when page loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [promptText, setPromptText] = useState('');
    const [followupText, setFollowupText] = useState('');
    
    // States for wizard flow
    const [status, setStatus] = useState('empty'); // empty, loading, generated
    const [loadingStep, setLoadingStep] = useState(1);
    const [updateNotes, setUpdateNotes] = useState([]);
    const [error, setError] = useState('');

    const handlePromptChange = (e) => {
        setPromptText(e.target.value);
    };

    const handleFollowupChange = (e) => {
        setFollowupText(e.target.value);
    };

    const parseCoverLetterPrompt = (text) => {
        const lines = text.split('\n');
        const data = {
            name: lines[0]?.trim() || "Applicant Name",
            role: "Target Role",
            company: "Target Company",
            highlights: []
        };

        const roleMatch = text.match(/applying for (?:the )?([\w\s]+) role/i) || text.match(/role of ([\w\s]+)/i);
        const companyMatch = text.match(/at ([\w\s]+)\./i) || text.match(/with ([\w\s]+)/i);

        if (roleMatch) data.role = roleMatch[1].trim();
        if (companyMatch) data.company = companyMatch[1].trim();

        const skillLines = lines.filter(l => l.toLowerCase().includes('skill') || l.toLowerCase().includes('experience') || l.toLowerCase().includes('worked'));
        data.highlights = skillLines.slice(0, 3).map(l => l.trim());

        return data;
    };

    const handleGenerate = async () => {
        if (!promptText.trim()) return;
        setError('');
        setStatus('loading');
        setLoadingStep(1);
        setUpdateNotes([]);

        const stepInterval = setInterval(() => {
            setLoadingStep((prev) => Math.min(prev + 1, 4));
        }, 500);

        try {
            const parsed = parseCoverLetterPrompt(promptText);
            const response = await generateCoverLetter({
                jobDescription: promptText,
                resumeData: parsed,
            });

            clearInterval(stepInterval);
            setLoadingStep(5);

            if (response?.success && response.data) {
                clStore.updatePersonalInfo('name', parsed.name);
                clStore.updateRecipientInfo('company', parsed.company);
                clStore.updateRecipientInfo('name', 'Hiring Manager');

                const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                clStore.updatePersonalInfo('date', today);
                clStore.updateLetterBody(response.data.content || '');
                setStatus('generated');
            } else {
                throw new Error(response?.message || 'Failed to generate cover letter');
            }
        } catch (err) {
            clearInterval(stepInterval);
            setError(err.message || 'AI generation failed. Please try again.');
            setStatus('empty');
        }
    };

    const handleUpdate = async () => {
        if (!followupText.trim()) return;
        setUpdateNotes((prev) => [...prev, followupText]);
        const updatedPrompt = `${promptText}\n\nRequested changes:\n${followupText}`;
        setPromptText(updatedPrompt);
        const note = followupText;
        setFollowupText('');
        setError('');
        setStatus('loading');
        setLoadingStep(1);

        try {
            const parsed = parseCoverLetterPrompt(updatedPrompt);
            const response = await generateCoverLetter({
                jobDescription: updatedPrompt,
                resumeData: parsed,
            });

            if (response?.success && response.data) {
                clStore.updateLetterBody(response.data.content || '');
                setStatus('generated');
            } else {
                throw new Error(response?.message || 'Failed to update cover letter');
            }
        } catch (err) {
            setError(err.message || 'Update failed. Please try again.');
            setStatus('generated');
            setFollowupText(note);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadWord = () => {
        const name = clStore.personalInfo.name || 'Your Name';
        const docHtml = document.getElementById('resume-doc').innerHTML;
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
                "xmlns:w='urn:schemas-microsoft-com:office:word' "+
                "xmlns='http://www.w3.org/TR/REC-html40'>"+
                "<head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + docHtml + footer;
        
        const blob = new Blob([sourceHTML], { type: 'application/msword' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${name.replace(/\s+/g, '_')}_Cover_Letter.doc`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const [faqOpenIndex, setFaqOpenIndex] = useState(null);
    const toggleFaq = (index) => {
        setFaqOpenIndex(faqOpenIndex === index ? null : index);
    };

    return (
        <div className="ai-cover-letter-page">
            <main>
                {/* Hero Section */}
                <section className="aib-hero">
                    <div className="container">
                        <h1>Write a <span className="gold">Winning</span> Cover Letter<br />In Seconds</h1>
                        <p className="hero-sub">Stop struggling with blank pages. Our AI crafts personalized, persuasive cover letters that highlight your unique strengths and match the job perfectly.</p>
                        <div className="hero-trust">
                            <div className="trust-pill"><i className="fa-solid fa-circle-check"></i> Job-Specific Tailoring</div>
                            <div className="trust-pill"><i className="fa-solid fa-circle-check"></i> Professional Tone Control</div>
                            <div className="trust-pill"><i className="fa-solid fa-circle-check"></i> Narrative Storytelling</div>
                            <div className="trust-pill"><i className="fa-solid fa-circle-check"></i> One-Click Export</div>
                        </div>
                        <a href="#prompt-section" className="btn btn-primary btn-lg hero-cta">
                            <i className="fa-solid fa-pen-nib"></i> Create My Cover Letter
                        </a>
                    </div>
                    <div className="hero-glow"></div>
                </section>

                {/* How It Works */}
                <section className="how-section">
                    <div className="container">
                        <div className="section-label"><i className="fa-solid fa-gears"></i> The Process</div>
                        <h2 className="section-title">Effortless Job-Winning Cover Letters</h2>
                        <p className="section-sub">Our AI understands context. Just provide the basics, and we'll handle the narrative.</p>
                        <div className="steps-row">
                            <div className="step-box">
                                <div className="step-num">01</div>
                                <div className="step-icon"><i className="fa-solid fa-keyboard"></i></div>
                                <h3>Provide Context</h3>
                                <p>Paste the job description and a brief summary of your background. Mention why you're excited about this specific company.</p>
                            </div>
                            <div className="step-connector"><i className="fa-solid fa-arrow-right"></i></div>
                            <div className="step-box">
                                <div className="step-num">02</div>
                                <div className="step-icon"><i className="fa-solid fa-brain"></i></div>
                                <h3>AI Crafts the Letter</h3>
                                <p>The AI connects your skills to the job requirements, creating a compelling story that shows exactly why you are the best fit.</p>
                            </div>
                            <div className="step-connector"><i className="fa-solid fa-arrow-right"></i></div>
                            <div className="step-box">
                                <div className="step-num">03</div>
                                <div className="step-icon"><i className="fa-solid fa-paper-plane"></i></div>
                                <h3>Refine & Send</h3>
                                <p>Review the letter, adjust the tone if needed, and download it as a PDF or Word doc. You're ready to apply!</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <div className="container">
                        <div className="section-label"><i className="fa-solid fa-star"></i> Why Use Our AI</div>
                        <h2 className="section-title">Craft a letter that gets read</h2>
                        <div className="features-grid-ai">
                            <div className="feat-card">
                                <div className="feat-icon"><i className="fa-solid fa-bullseye"></i></div>
                                <h3>Perfect Job Match</h3>
                                <p>The AI analyzes the job description to mirror the company's language and address their specific pain points effectively.</p>
                            </div>
                            <div className="feat-card">
                                <div className="feat-icon"><i className="fa-solid fa-masks-theater"></i></div>
                                <h3>Tone Adjustment</h3>
                                <p>Choose between formal, enthusiastic, or creative tones to match the company culture — from corporate banks to startup tech.</p>
                            </div>
                            <div className="feat-card">
                                <div className="feat-icon"><i className="fa-solid fa-handshake"></i></div>
                                <h3>Impactful Openers</h3>
                                <p>No more "To whom it may concern." Our AI writes hooks that grab attention and keep recruiters reading until the end.</p>
                            </div>
                            <div className="feat-card">
                                <div className="feat-icon"><i className="fa-solid fa-microchip"></i></div>
                                <h3>Keyword Integration</h3>
                                <p>Subtly weaves in required keywords so your cover letter complements your ATS-friendly resume perfectly.</p>
                            </div>
                            <div className="feat-card">
                                <div className="feat-icon"><i className="fa-solid fa-pen-fancy"></i></div>
                                <h3>Professional Formatting</h3>
                                <p>Automatically handles headers, dates, and signatures in a clean, professional layout that looks great on any screen.</p>
                            </div>
                            <div className="feat-card">
                                <div className="feat-icon"><i className="fa-solid fa-clock-rotate-left"></i></div>
                                <h3>Instant Variations</h3>
                                <p>Need a different version? Regenerate parts or the whole letter instantly to test different angles for your application.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Prompt Section */}
                <section className="prompt-section" id="prompt-section">
                    <div className="container">
                        <div className="section-label"><i className="fa-solid fa-comment-dots"></i> Cover Letter Generator</div>
                        <h2 className="section-title">Tell us about the opportunity</h2>
                        <p className="section-sub">Input the job role, company name, and your key highlights. Paste the job description for the best results.</p>
                        {error && <div className="error-message" style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>}
                        <div className="builder-layout">
                            {/* LEFT: Prompt Input */}
                            <div className="prompt-panel">
                                <div className="prompt-card">
                                    <div className="prompt-card-header">
                                        <span><i className="fa-solid fa-pen-to-square"></i> Letter Details</span>
                                        <span className="char-count">{promptText.length} / 3000</span>
                                    </div>
                                    <textarea
                                        value={promptText}
                                        onChange={handlePromptChange}
                                        className="prompt-textarea"
                                        maxLength={3000}
                                        placeholder="Example: I am applying for the Senior Product Designer role at Figma. I have 6 years of experience in design systems and prototyping. I love Figma's collaborative approach. My background includes leading design at a fintech startup where I increased user engagement by 40%..."
                                    />

                                    <div className="prompt-tips">
                                        <p><i className="fa-solid fa-lightbulb"></i> <strong>Pro Tips:</strong></p>
                                        <ul>
                                            <li>Paste the specific Job Description for exact matching</li>
                                            <li>Mention why you specifically want to work for THIS company</li>
                                            <li>Highlight 2-3 specific achievements that prove your value</li>
                                            <li>Specify if you want a particular tone (e.g., 'Very Professional' or 'Startup Enthusiastic')</li>
                                        </ul>
                                    </div>

                                    <button className="btn-generate" onClick={handleGenerate} disabled={status === 'loading'}>
                                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                                        <span>{status === 'loading' ? 'Generating...' : 'Generate Cover Letter'}</span>
                                    </button>
                                </div>

                                {/* Followup Card */}
                                {status === 'generated' && (
                                    <div className="followup-card">
                                        <div className="prompt-card-header">
                                            <span><i className="fa-solid fa-rotate"></i> Refine Narrative</span>
                                        </div>
                                        <textarea
                                            value={followupText}
                                            onChange={handleFollowupChange}
                                            className="prompt-textarea small"
                                            maxLength={1000}
                                            placeholder="Example: Make the tone more enthusiastic. Mention my certification in Scrum. Focus more on my leadership experience..."
                                        />
                                        <button className="btn-generate secondary" onClick={handleUpdate}>
                                            <i className="fa-solid fa-rotate"></i> Update Letter
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="preview-panel">
                                {status === 'empty' && (
                                    <div className="preview-empty">
                                        <div className="empty-icon"><i className="fa-solid fa-envelope-open-text"></i></div>
                                        <h3>Your cover letter will appear here</h3>
                                        <p>Tell the AI about the job and your experience on the left to generate your personalized cover letter.</p>
                                    </div>
                                )}

                                {status === 'loading' && (
                                    <div className="preview-loading">
                                        <div className="ai-loader">
                                            <div className="loader-ring"></div>
                                            <div className="loader-ring"></div>
                                            <div className="loader-ring"></div>
                                        </div>
                                        <h3>AI is crafting your cover letter...</h3>
                                        <div className="loading-steps">
                                            <div className={`load-step ${loadingStep === 1 ? 'active' : loadingStep > 1 ? 'done' : ''}`}>
                                                <i className={`fa-solid ${loadingStep > 1 ? 'fa-check-circle' : 'fa-circle-notch fa-spin'}`}></i> Analyzing job requirements
                                            </div>
                                            <div className={`load-step ${loadingStep === 2 ? 'active' : loadingStep > 2 ? 'done' : ''}`}>
                                                <i className={`fa-solid ${loadingStep > 2 ? 'fa-check-circle' : loadingStep === 2 ? 'fa-circle-notch fa-spin' : 'fa-circle-notch'}`}></i> Matching your background
                                            </div>
                                            <div className={`load-step ${loadingStep === 3 ? 'active' : loadingStep > 3 ? 'done' : ''}`}>
                                                <i className={`fa-solid ${loadingStep > 3 ? 'fa-check-circle' : loadingStep === 3 ? 'fa-circle-notch fa-spin' : 'fa-circle-notch'}`}></i> Crafting professional narrative
                                            </div>
                                            <div className={`load-step ${loadingStep === 4 ? 'active' : loadingStep > 4 ? 'done' : ''}`}>
                                                <i className={`fa-solid ${loadingStep > 4 ? 'fa-check-circle' : loadingStep === 4 ? 'fa-circle-notch fa-spin' : 'fa-circle-notch'}`}></i> Refining tone & grammar
                                            </div>
                                            <div className={`load-step ${loadingStep === 5 ? 'active' : loadingStep > 5 ? 'done' : ''}`}>
                                                <i className={`fa-solid ${loadingStep >= 5 ? 'fa-circle-notch fa-spin' : 'fa-circle-notch'}`}></i> Finalizing document
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {status === 'generated' && (
                                    <div className="resume-preview-wrapper">
                                        <div className="preview-toolbar">
                                            <span className="preview-label"><i className="fa-solid fa-eye"></i> Letter Preview</span>
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
                                            <div className="cl-header">
                                                <div className="cl-name">{clStore.personalInfo.name.toUpperCase()}</div>
                                                <div className="cl-contact">
                                                    <span>Email: {clStore.personalInfo.email}</span>
                                                    <span>Phone: {clStore.personalInfo.phone}</span>
                                                    <span>Location: {clStore.personalInfo.location}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="cl-date">{clStore.personalInfo.date}</div>
                                            
                                            <div className="cl-recipient">
                                                <strong>{clStore.recipientInfo.name}</strong><br />
                                                {clStore.recipientInfo.company}<br />
                                                Recruitment Department
                                            </div>
                                            
                                            <div className="cl-salutation">Dear Hiring Manager,</div>
                                            
                                            <div className="cl-body">
                                                {clStore.letterBody.split('\n\n').map((para, idx) => {
                                                    // Skip the greeting and closing inside the letterBody block if it has them
                                                    if (para.toLowerCase().startsWith('dear') || para.toLowerCase().startsWith('sincerely')) {
                                                        return null;
                                                    }
                                                    return <p key={idx}>{para}</p>;
                                                })}
                                            </div>
                                            
                                            <div className="cl-closing">
                                                Sincerely,<br /><br />
                                                <strong>{clStore.personalInfo.name}</strong>
                                            </div>

                                            {updateNotes.map((note, idx) => (
                                                <div key={idx} style={{
                                                    marginTop: '20px',
                                                    color: '#D4C77A',
                                                    borderTop: '1px dashed #D4C77A',
                                                    paddingTop: '10px',
                                                    fontStyle: 'italic',
                                                    fontSize: '0.8rem'
                                                }}>
                                                    Note: Letter updated based on request: "{note}"
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="faq-section">
                    <div className="container">
                        <div className="section-label"><i className="fa-solid fa-circle-question"></i> FAQ</div>
                        <h2 className="section-title">Frequently Asked Questions</h2>
                        <div className="faq-list">
                            <div className={`faq-item ${faqOpenIndex === 0 ? 'open' : ''}`} onClick={() => toggleFaq(0)}>
                                <div className="faq-q"><span>Do I still need a cover letter in 2026?</span><i className="fa-solid fa-plus"></i></div>
                                <div className="faq-a">Yes! While some companies make it optional, a well-crafted cover letter provides context that a resume cannot. it shows your personality, your passion for the role, and your specific value proposition to the employer.</div>
                            </div>
                            <div className={`faq-item ${faqOpenIndex === 1 ? 'open' : ''}`} onClick={() => toggleFaq(1)}>
                                <div className="faq-q"><span>How does the AI match the job description?</span><i className="fa-solid fa-plus"></i></div>
                                <div className="faq-a">Our AI parses the job description for key responsibilities, required skills, and company values. It then cross-references this with your provided background to highlight the most relevant experiences first.</div>
                            </div>
                            <div className={`faq-item ${faqOpenIndex === 2 ? 'open' : ''}`} onClick={() => toggleFaq(2)}>
                                <div className="faq-q"><span>Can I generate letters for different industries?</span><i className="fa-solid fa-plus"></i></div>
                                <div className="faq-a">Absolutely. Whether you're in Tech, Healthcare, Finance, or the Creative Arts, our AI adjusts its vocabulary and tone to suit the professional standards of your specific industry.</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <div className="container">
                        <div className="cta-box">
                            <div className="cta-glow"></div>
                            <h2>Stop worrying about the perfect words</h2>
                            <p>Let our AI handle the writing so you can focus on the interview. Create your first cover letter in under 2 minutes.</p>
                            <a href="#prompt-section" className="btn btn-primary btn-lg">
                                <i className="fa-solid fa-wand-magic-sparkles"></i> Start Writing
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
