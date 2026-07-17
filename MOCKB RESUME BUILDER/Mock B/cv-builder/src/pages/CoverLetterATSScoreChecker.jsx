import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CoverLetterATSScoreChecker.css';

// Import images
import strengthsImg from '../assets/sticker_gif_whatsapp_iphone___Emojis_emoticono_3D_todo_OK_gesto-removebg-preview.png';
import weaknessesImg from '../assets/dfghj-removebg-preview.png';
import interfaceImg from '../assets/interface.png';

// Import Home Navbar and Footer
import Navbar from '../components/home/navbar/Navbar';
import Footer from '../components/home/footer/Footer';

export default function CoverLetterATSScoreChecker() {
    // Scroll to top when page loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [uploadedFile, setUploadedFile] = useState(null);
    const [checking, setChecking] = useState(false);
    const [showResults, setShowResults] = useState(false);
    
    // Accordion State
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const fileInputRef = useRef(null);
    const resultsSectionRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFile(file);
            setShowResults(false);
        }
    };

    const handleBrowseClick = () => {
        if (!uploadedFile) fileInputRef.current.click();
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    };

    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove('drag-over');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        if (e.dataTransfer.files.length > 0) {
            setUploadedFile(e.dataTransfer.files[0]);
            setShowResults(false);
        }
    };

    const handleRemoveFile = (e) => {
        e.stopPropagation();
        setUploadedFile(null);
        setShowResults(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleRunCheck = () => {
        if (!uploadedFile) return;
        setChecking(true);
        setTimeout(() => {
            setChecking(false);
            setShowResults(true);
            setTimeout(() => {
                if (resultsSectionRef.current) {
                    resultsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }, 2500);
    };

    const getPrefix = (val) => {
        if (val >= 80) return <i className="fa-solid fa-check"></i>;
        if (val >= 60) return <i className="fa-solid fa-triangle-exclamation"></i>;
        return <i className="fa-solid fa-xmark"></i>;
    };

    const getBarColor = (val) => {
        if (val >= 80) return '#22c55e';
        if (val >= 50) return '#f97316';
        return '#ef4444';
    };

    const mockMetrics = [
        { name: "ATS Parse Rate", val: 89, note: "Strong ATS Parse Rate", icon: "fa-microchip" },
        { name: "Keywords Match", val: 45, note: "Needs attention — significant gap", icon: "fa-magnifying-glass" },
        { name: "Quantifying Impact", val: 63, note: "Moderate — room for improvement", icon: "fa-chart-line" },
        { name: "Repetition", val: 65, note: "Moderate — room for improvement", icon: "fa-repeat" },
        { name: "Spelling Check", val: 84, note: "Strong Spelling Check", icon: "fa-spell-check" },
        { name: "Grammar Check", val: 82, note: "Strong Grammar Check", icon: "fa-pen-nib" },
        { name: "Formatting & Layout", val: 70, note: "Moderate — room for improvement", icon: "fa-table-columns" },
        { name: "Skills Match", val: 71, note: "Moderate — room for improvement", icon: "fa-brain" },
        { name: "Certifications", val: 44, note: "Needs attention — gap detected", icon: "fa-certificate" },
        { name: "Opening Hook", val: 74, note: "Moderate — room for improvement", icon: "fa-anchor" },
        { name: "Letter Length", val: 69, note: "Moderate — room for improvement", icon: "fa-text-width" },
        { name: "Bullet Points", val: 59, note: "Moderate — room for improvement", icon: "fa-list-ul" },
        { name: "Summary Mistakes", val: 50, note: "Moderate — room for improvement", icon: "fa-triangle-exclamation" }
    ];

    const mockStrengths = [
        { name: "ATS Parse Rate", tip: "How well ATS software can read and extract your data.", val: "89%" },
        { name: "Spelling Check", tip: "Spelling errors detected across all sections.", val: "84%" },
        { name: "Grammar Check", tip: "Grammatical issues and sentence structure problems.", val: "82%" }
    ];

    const mockWeaknesses = [
        { name: "Bullet Points", tip: "Strong, action-verb-led bullet points per section.", val: "59%" },
        { name: "Summary Mistakes", tip: "Professional summary effectiveness and common pitfalls.", val: "50%" },
        { name: "Keywords Match", tip: "Relevant industry keywords found in your letter.", val: "45%" }
    ];

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <div className="cl-page-body cover-letter-checker-page">
            <Navbar />
            
            {/* BG Animated Orbs */}
            <div className="bg-orb orb-1"></div>
            <div className="bg-orb orb-2"></div>
            <div className="bg-orb orb-3"></div>

            <main>
                {/* HERO SECTION */}
                <section className="cl-hero">
                    <div className="container-cl">
                        <div className="cl-hero-content">
                            <h1 className="animate-slide-up">Is Your Cover Letter <br/><span>ATS Friendly?</span></h1>
                            <p className="animate-slide-up-delay">Don't let your cover letter get ignored. Our AI analyzes your letter against modern ATS algorithms to ensure your personality shines through while hitting every technical requirement.</p>
                            
                            <div className="hero-features animate-fade-in-delay">
                                <div className="feat-item">
                                    <div className="feat-icon"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
                                    <span>Instant Scoring</span>
                                </div>
                                <div className="feat-item">
                                    <div className="feat-icon"><i className="fa-solid fa-spell-check"></i></div>
                                    <span>Grammar Scan</span>
                                </div>
                                <div className="feat-item">
                                    <div className="feat-icon"><i className="fa-solid fa-key"></i></div>
                                    <span>Keyword Sync</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* UPLOAD SECTION */}
                <section className="upload-section container-cl">
                    <div className="upload-container-cl animate-fade-up">
                        <div 
                            className={`upload-glass-card ${uploadedFile ? 'has-file' : ''}`} 
                            id="drop-zone"
                            onClick={handleBrowseClick}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            style={{ cursor: uploadedFile ? 'default' : 'pointer' }}
                        >
                            <div className="upload-visual">
                                <div className="pulse-ring"></div>
                                <i className="fa-solid fa-file-export"></i>
                            </div>
                            <h2>Check Your Score</h2>
                            <p>Upload your cover letter to see how it performs</p>
                            
                            <div className="file-info-tags">
                                <span>PDF</span>
                                <span>DOCX</span>
                                <span>TXT</span>
                            </div>

                            <input type="file" id="cl-file" accept=".pdf,.doc,.docx,.txt" ref={fileInputRef} onChange={handleFileChange} hidden />
                            
                            {!uploadedFile && (
                                <button className="btn-primary-cl" id="browse-btn" onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }}>
                                    <i className="fa-solid fa-plus"></i> Select File
                                </button>
                            )}

                            {uploadedFile && (
                                <div className="selected-file-pill" id="file-selected" style={{ display: 'inline-flex' }}>
                                    <i className="fa-solid fa-paperclip"></i>
                                    <span id="file-name-display">{uploadedFile.name}</span>
                                    <button className="remove-btn" id="remove-file" onClick={handleRemoveFile}><i className="fa-solid fa-x"></i></button>
                                </div>
                            )}
                        </div>

                        <button 
                            className="btn-analyze" 
                            id="check-ats-btn" 
                            disabled={!uploadedFile || checking}
                            onClick={handleRunCheck}
                        >
                            {checking ? (
                                <>
                                    <i className="fa-solid fa-spinner fa-spin"></i>
                                    <span>Analyzing...</span>
                                </>
                            ) : (
                                <>
                                    <span>Analyze Cover Letter</span>
                                    <i className="fa-solid fa-arrow-right"></i>
                                </>
                            )}
                        </button>
                    </div>
                </section>

                {/* DETAILED RESULTS SECTION */}
                {showResults && (
                    <section className="results-detailed container-cl" id="results-detailed" ref={resultsSectionRef}>
                        <div className="results-header text-center animate-fade-in">
                            <h2 className="section-heading">Detailed Analysis</h2>
                            <p className="section-sub">Your cover letter has been checked across 13 critical ATS parameters</p>
                        </div>

                        <div className="metrics-grid" id="metrics-grid">
                            {mockMetrics.map((m, idx) => (
                                <div className="metric-card" key={idx}>
                                    <div className="metric-content">
                                        <div className="metric-text-box">
                                            <div className="metric-name">{m.name}</div>
                                            <div className="metric-note">{getPrefix(m.val)} {m.note}</div>
                                        </div>
                                        <div className="metric-circle-box">
                                            <svg className="metric-svg" viewBox="0 0 80 80">
                                                <circle className="metric-bg" cx="40" cy="40" r="35"></circle>
                                                <circle className="metric-fill" cx="40" cy="40" r="35" 
                                                    style={{ 
                                                        strokeDashoffset: 220 - (m.val / 100 * 220),
                                                        stroke: 'var(--primary)'
                                                    }}>
                                                </circle>
                                            </svg>
                                            <div className="metric-pct-val">{m.val}%</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Strengths & Weaknesses */}
                        <div className="sw-row">
                            <div className="sw-box strength-box animate-fade-up">
                                <img src={strengthsImg} className="floating-emoji" alt="Strengths" />
                                <i className="fa-solid fa-check bg-icon"></i>
                                <div className="sw-header">Strengths</div>
                                <ul className="sw-list" id="strengths-list">
                                    {mockStrengths.map((s, idx) => (
                                        <li key={idx}>
                                            <i className="fa-solid fa-check"></i>
                                            <strong>{s.name}</strong>
                                            <span>— {s.tip} <em>({s.val})</em></span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="sw-box weakness-box animate-fade-up">
                                <img src={weaknessesImg} className="floating-emoji" alt="Weaknesses" />
                                <i className="fa-solid fa-xmark bg-icon"></i>
                                <div className="sw-header">Weaknesses</div>
                                <ul className="sw-list" id="weaknesses-list">
                                    {mockWeaknesses.map((w, idx) => (
                                        <li key={idx}>
                                            <i className="fa-solid fa-xmark"></i>
                                            <strong>{w.name}</strong>
                                            <span>— {w.tip} <em>({w.val})</em></span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                )}

                {/* EXPLAINER SECTION */}
                <section className="explainer-section container-cl animate-fade-up">
                    <div className="explainer-grid">
                        <div className="explainer-text">
                            <h2>How ATS Algorithms Scan <span>Your Cover Letter</span></h2>
                            <p>Modern Applicant Tracking Systems (ATS) don't just look for your name; they scan for specific keyword density, structural integrity, and even sentiment analysis to rank you against hundreds of other candidates.</p>
                            <div className="info-points">
                                <div className="info-point">
                                    <i className="fa-solid fa-check-circle"></i>
                                    <div>
                                        <h4>Keyword Matching</h4>
                                        <p>We identify missing skills that recruiters are looking for.</p>
                                    </div>
                                </div>
                                <div className="info-point">
                                    <i className="fa-solid fa-check-circle"></i>
                                    <div>
                                        <h4>Format Verification</h4>
                                        <p>Ensuring your letterhead and layout are machine-readable.</p>
                                    </div>
                                </div>
                                <div className="info-point">
                                    <i className="fa-solid fa-check-circle"></i>
                                    <div>
                                        <h4>Readability Check</h4>
                                        <p>Analyzing sentence complexity and professional tone.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="explainer-visual">
                            <img src={interfaceImg} alt="ATS Scanning Process" className="floating-img" />
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section className="cl-steps-section container-cl">
                    <div className="section-title-wrap text-center">
                        <h2>The 3-Step Success Path</h2>
                        <p>Simple, fast, and highly effective for any job application.</p>
                    </div>
                    <div className="cl-steps-grid">
                        <div className="cl-step-card animate-fade-up" style={{ animationDelay: '0.1s' }}>
                            <div className="step-num">01</div>
                            <h3>Upload Letter</h3>
                            <p>Drag your existing cover letter or paste your text into our secure analyzer.</p>
                        </div>
                        <div className="cl-step-card animate-fade-up" style={{ animationDelay: '0.2s' }}>
                            <div className="step-num">02</div>
                            <h3>AI Deep Scan</h3>
                            <p>Our algorithms compare your letter against 50+ industry-standard ATS rules instantly.</p>
                        </div>
                        <div className="cl-step-card animate-fade-up" style={{ animationDelay: '0.3s' }}>
                            <div className="step-num">03</div>
                            <h3>Optimize & Land</h3>
                            <p>Follow our custom fix-list or let AI rewrite it to hit a perfect 100% score.</p>
                        </div>
                    </div>
                </section>

                {/* UNIQUE COMPARISON SECTION */}
                <section className="cl-comparison-section container-cl">
                    <div className="section-title-wrap text-center animate-fade-up">
                        <h2>Why Our AI Dominates</h2>
                        <p>Generic checkers look for words. We look for the strategy that gets you hired.</p>
                    </div>
                    
                    <div className="comp-grid-unique">
                        <div className="comp-card-u animate-fade-up" style={{ animationDelay: '0.1s' }}>
                            <div className="comp-tag">Strategic</div>
                            <h3>Tone of Voice Analysis</h3>
                            <p>Standard checkers miss the "feel". Our AI ensures you sound confident, not arrogant, matching the company culture perfectly.</p>
                            <div className="comp-vs">
                                <span className="bad">Others: Generic</span>
                                <span className="good">MockB: Psychometric</span>
                            </div>
                        </div>

                        <div className="comp-card-u animate-fade-up" style={{ animationDelay: '0.2s' }}>
                            <div className="comp-tag">Technical</div>
                            <h3>Multi-Layer ATS Parsing</h3>
                            <p>We test your file against 4 different ATS engine types (Workday, Taleo, Greenhouse, and Lever) simultaneously.</p>
                            <div className="comp-vs">
                                <span className="bad">Others: Single Scan</span>
                                <span className="good">MockB: Quad-Engine</span>
                            </div>
                        </div>

                        <div className="comp-card-u animate-fade-up" style={{ animationDelay: '0.3s' }}>
                            <div className="comp-tag">Conversion</div>
                            <h3>CTA Strength Meter</h3>
                            <p>A cover letter is a sales pitch. We analyze the strength of your "Call to Action" to ensure recruiters feel compelled to call.</p>
                            <div className="comp-vs">
                                <span className="bad">Others: Ignored</span>
                                <span className="good">MockB: Optimized</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* UNIQUE FAQ SECTION */}
                <section className="faq-section container-cl">
                    <div className="section-title-wrap text-center animate-fade-up">
                        <h2>Got <span>Questions?</span></h2>
                        <p>We've got the answers to help you beat the ATS algorithms.</p>
                    </div>
                    
                    <div className="faq-accordion-wrap animate-fade-up">
                        {[
                            {
                                icon: 'fa-robot',
                                question: 'How does the AI calculate my ATS score?',
                                answer: 'Our AI uses natural language processing (NLP) to compare your letter against a database of 100,000+ job descriptions. It checks for keyword density, structural parsing (how a machine reads it), and even "power words" that trigger recruiter interest.'
                            },
                            {
                                icon: 'fa-file-pdf',
                                question: 'Is PDF better than Word for ATS?',
                                answer: 'While modern ATS can read both, a standard .docx file is often safer for complex layouts. However, our checker ensures your PDF is formatted with a "text layer" that makes it 100% readable by any system.'
                            },
                            {
                                icon: 'fa-clock-rotate-left',
                                question: 'Can I re-check my letter after making changes?',
                                answer: 'Yes! You can upload your updated letter as many times as you want. We actually recommend iterating until you hit a score of 85 or higher for the best results.'
                            },
                            {
                                icon: 'fa-shield-halved',
                                question: 'Is my personal data kept private?',
                                answer: 'Absolutely. We use 256-bit SSL encryption. Your documents are only stored temporarily for analysis and are automatically purged from our servers to ensure your privacy.'
                            }
                        ].map((faq, idx) => (
                            <div className={`faq-card ${openFaqIndex === idx ? 'active' : ''}`} key={idx}>
                                <div className="faq-header" onClick={() => toggleFaq(idx)}>
                                    <div className="faq-icon-box"><i className={`fa-solid ${faq.icon}`}></i></div>
                                    <h4>{faq.question}</h4>
                                    <div className="faq-chevron">
                                        <i className={`fa-solid ${openFaqIndex === idx ? 'fa-minus' : 'fa-plus'}`}></i>
                                    </div>
                                </div>
                                <div className="faq-content" style={{ maxHeight: openFaqIndex === idx ? '500px' : '0' }}>
                                    <div className="faq-inner">
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ALWAYS VISIBLE CTA BANNER */}
                <section className="container-cl" style={{ marginBottom: '8rem' }}>
                    <div className="cl-cta-banner animate-fade-in">
                        <div className="cta-text">
                            <h3>Want a perfect Cover Letter?</h3>
                            <p>Let our AI rewrite your letter for 100% ATS compatibility.</p>
                        </div>
                        <Link to="/cover-letter/ai-builder" className="btn-cta">
                            <i className="fa-solid fa-wand-sparkles"></i>
                            <span>Optimize with AI</span>
                        </Link>
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}
