import React, { useState, useEffect } from 'react';
import './CoverLetterUpgrader.css';
import Navbar from '../components/home/navbar/Navbar';
import HomeFooter from '../components/home/footer/Footer';

export default function CoverLetterUpgrader() {
    const [stage, setStage] = useState('initial'); // 'initial', 'loading', 'report', 'preview'
    const [file, setFile] = useState(null);
    const [targetRole, setTargetRole] = useState('');
    const [errors, setErrors] = useState({ file: false, role: false });
    const [template, setTemplate] = useState('modern');
    const [openFaq, setOpenFaq] = useState(null);
    const [loadingText, setLoadingText] = useState({title: 'Analyzing Cover Letter...', desc: 'Evaluating tone, keyword density, and professional alignment.'});

    
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
            setErrors(prev => ({...prev, file: false}));
            setTimeout(() => {
                const nextStep = document.getElementById('target-role');
                if (nextStep) nextStep.scrollIntoView({behavior: 'smooth', block: 'center'});
            }, 500);
        }
    };

    const handleRoleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const nextStep = document.getElementById('step-3-container');
            if (nextStep) nextStep.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    };

    useEffect(() => {

        // Hide default layout header and footer when this component mounts
        const layoutHeaders = document.querySelectorAll('.app-header');
        
        layoutHeaders.forEach(el => { if (el) el.style.display = 'none'; });
        
        return () => {
            layoutHeaders.forEach(el => { if (el) el.style.display = ''; });
        };
    }, []);

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setErrors(prev => ({...prev, file: false}));
            setTimeout(() => {
                const nextStep = document.getElementById('target-role');
                if (nextStep) nextStep.scrollIntoView({behavior: 'smooth', block: 'center'});
            }, 500);
        }
    };

    const scrollToUpload = () => {
        const uploadSection = document.getElementById('upload-section');
        if (uploadSection) {
            uploadSection.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    };

    const startAnalysis = () => {
        let hasError = false;
        let newErrors = {file: false, role: false};
        
        if (!file) {
            newErrors.file = true;
            hasError = true;
        }
        if (!targetRole.trim()) {
            newErrors.role = true;
            hasError = true;
        }
        setErrors(newErrors);

        if (hasError) {
            if (newErrors.file) scrollToUpload();
            else document.getElementById('target-role').focus();
            return;
        }

        setLoadingText({title: 'Analyzing Cover Letter...', desc: 'Evaluating tone, keyword density, and professional alignment.'});
        setStage('loading');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        setTimeout(() => {
            setStage('report');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 2500);
    };

    const upgradeDocument = () => {
        setLoadingText({title: 'Upgrading your Cover Letter...', desc: 'Applying narrative enhancements and missing keywords.'});
        setStage('loading');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
            setStage('preview');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 2500);
    };

    const resetUpgrader = () => {
        setStage('initial');
        setFile(null);
        setTargetRole('');
        setErrors({ file: false, role: false });
        setTimeout(() => scrollToUpload(), 100);
    };

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const downloadPDF = () => {
        window.print();
    };

    const downloadWord = () => {
        const mockupContent = document.querySelector('.cl-letter-mockup').innerHTML;
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Cover Letter</title></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + mockupContent + footer;
        
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'Upgraded_Cover_Letter.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);
    };

    return (
        <div className="cl-upgrader-override-wrapper">
            <Navbar />
            <main className="cl-upgrader-main">
                
        {stage === "initial" && (<div id="initial-content">
            {/*  Unique Hero Section  */}
            <section className="cl-hero">
                <div className="container">
                    <div className="cl-hero-content">
                        <h1><span style={{whiteSpace: 'nowrap', color: '#fff'}}>Upgrade your Cover Letter</span><br /><span>Maximize your Impact.</span></h1>
                        <p>Our AI deeply analyzes your cover letter, refines your narrative, optimizes formatting, and aligns your tone to help you secure that interview.</p>
                        <button className="cl-btn cl-btn-primary" onClick={scrollToUpload}>
                            Start Analysis <i className="fa-solid fa-wand-magic-sparkles"></i>
                        </button>
                        <p className="secure-tag" style={{display: 'flex', justifyContent: 'center'}}><i className="fa-solid fa-shield-check"></i> Your files are strictly confidential and secure.</p>
                    </div>
                </div>
            </section>

            {/*  Steps Section - Unique Alternating Layout  */}
            <section className="cl-steps-section" id="upload-section">
                <div className="container">
                    <div className="cl-steps-container">
                        
                        {/*  Step 1  */}
                        <div className="cl-step-row glass">
                            <div className="cl-step-content">
                                <div className="cl-step-number">01</div>
                                <h3>Upload your cover letter</h3>
                                <p>Provide your existing cover letter in PDF or Word format to begin the semantic analysis.</p>
                                {errors.file && <p id="upload-error" className="error-message" style={{display:"block"}}><i className="fa-solid fa-circle-exclamation"></i> Please upload your cover letter first.</p>}
                            </div>
                            <div className="cl-step-visual">
                                <div className="cl-upload-box" id="drop-zone" onDragOver={handleDragOver} onDrop={handleDrop} onClick={() => document.getElementById('file-input').click()}>
                                    <i className="fa-solid fa-cloud-arrow-up cl-upload-icon"></i>
                                    <h4>Drag & Drop or Click to Upload</h4>
                                    <p>Supported: PDF, Word</p>
                                    <input type="file" id="file-input" hidden accept=".pdf,.doc,.docx" onChange={handleFileSelect} />
                                    
                                    <div className="cl-file-list" id="file-list" onClick={(e) => e.stopPropagation()}>
                                        {file && (
                                            <div className="cl-file-item" style={{display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.05)', padding: '10px 15px', borderRadius: '8px', marginTop: '15px'}}>
                                                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                                    <i className={`fa-solid ${file.name.toLowerCase().endsWith('.pdf') ? 'fa-file-pdf' : 'fa-file-word'}`} style={{fontSize: '20px', color: file.name.toLowerCase().endsWith('.pdf') ? '#F44336' : '#2196F3'}}></i>
                                                    <div style={{textAlign: 'left'}}>
                                                        <div style={{fontWeight: 'bold', fontSize: '0.9rem'}}>{file.name}</div>
                                                        <div style={{fontSize: '0.75rem', color: 'var(--text-gray)'}}>{(file.size / (1024 * 1024)).toFixed(2)} MB</div>
                                                    </div>
                                                </div>
                                                <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                                                    <i className="fa-solid fa-check" style={{color: '#4CAF50'}}></i>
                                                    <i className="fa-solid fa-xmark" style={{color: '#888', cursor: 'pointer', transition: 'color 0.2s'}} onClick={(e) => { e.stopPropagation(); setFile(null); }}></i>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/*  Step 2  */}
                        <div className="cl-step-row glass">
                            <div className="cl-step-content">
                                <div className="cl-step-number">02</div>
                                <h3>Define your Target Role</h3>
                                <p>Tell our AI which job title or role you are aiming for so we can optimize the keywords accordingly.</p>
                                {errors.role && <p id="role-error" className="error-message" style={{display:"block"}}><i className="fa-solid fa-circle-exclamation"></i> Please enter the target role.</p>}
                            </div>
                            <div className="cl-step-visual" style={{'padding': '40px'}}>
                                <input type="text" id="target-role" className="cl-role-input" placeholder="e.g. Marketing Manager, Full-Stack Developer" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} onKeyDown={handleRoleKeyDown} />
                            </div>
                        </div>

                        {/*  Step 3  */}
                        <div className="cl-step-row glass" id="step-3-container">
                            <div className="cl-step-content">
                                <div className="cl-step-number">03</div>
                                <h3>Initiate AI Upgrade</h3>
                                <p>Ready? Let our advanced model scan, rewrite, and enhance your document in seconds.</p>
                            </div>
                            <div className="cl-step-visual" style={{'padding': '40px', 'textAlign': 'center'}}>
                                <button className="cl-btn cl-btn-primary" onClick={startAnalysis}>
                                    <i className="fa-solid fa-bolt"></i> Run Analysis Engine
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>)}

        {/*  Loading State  */}
        {stage === "loading" && (<div id="analysis-loading" className="cl-loading-container" >
            <div className="container">
                <div className="cl-radar-spinner"></div>
                <h2 style={{'marginBottom': '15px', 'color': 'var(--primary-color)'}} id="loading-title">{loadingText.title}</h2>
                <p id="loading-desc" style={{'color': 'var(--text-gray)'}}>{loadingText.desc}</p>
            </div>
        </div>)}

        {/*  Analysis Report Section  */}
        {stage === "report" && (<div id="analysis-report" className="container analysis-report" >
            <div className="report-header">
                <h2>Analysis Report</h2>
                <div className="scores-row">
                    <div className="score-card">
                        <div className="score-val">85<span>/100</span></div>
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
                    <p>Your cover letter demonstrates solid experience with a strong opening hook. It is well-structured but could benefit from a more tailored tone for the specific job description.</p>
                </div>

                <div className="details-grid">
                    <div className="detail-box strength">
                        <h4><i className="fa-solid fa-circle-check"></i> Strengths</h4>
                        <ul>
                            <li>Strong opening hook capturing attention.</li>
                            <li>Professional and confident tone throughout.</li>
                            <li>Clear call-to-action in the closing paragraph.</li>
                        </ul>
                    </div>
                    <div className="detail-box weakness">
                        <h4><i className="fa-solid fa-circle-exclamation"></i> Weaknesses</h4>
                        <ul>
                            <li>Overuse of generic buzzwords (e.g., "hard-working").</li>
                            <li>Fails to directly address the hiring manager.</li>
                            <li>Paragraphs are slightly too dense.</li>
                        </ul>
                    </div>
                    <div className="detail-box mistakes">
                        <h4><i className="fa-solid fa-triangle-exclamation"></i> Mistakes</h4>
                        <ul>
                            <li>Minor spelling error in the second paragraph.</li>
                            <li>Inconsistent date formatting.</li>
                        </ul>
                    </div>
                    <div className="detail-box missing">
                        <h4><i className="fa-solid fa-magnifying-glass-plus"></i> Missing Keywords</h4>
                        <ul>
                            <li>Leadership & Mentoring</li>
                            <li>Cross-functional Collaboration</li>
                            <li>Data-Driven Decision Making</li>
                        </ul>
                    </div>
                </div>

                <div className="detail-box recommendations">
                    <h4><i className="fa-solid fa-lightbulb"></i> Recommendations</h4>
                    <p>Break down the second paragraph into bullet points. Inject the missing keywords naturally into your achievements. Personalize the greeting to the specific company.</p>
                </div>
            </div>

            <div className="report-footer">
                <button className="btn btn-primary btn-large cl-btn-primary cl-btn" onClick={upgradeDocument}>
                    <i className="fa-solid fa-circle-up"></i> Upgrade Cover Letter
                </button>
            </div>
        </div>)}

        {/*  Upgraded Preview Section  */}
        {stage === "preview" && (<div id="upgraded-preview" style={{'padding': '80px 0'}}>
            <div className="container">
                <div style={{'textAlign': 'center', 'marginBottom': '50px'}}>
                    <h2 style={{'fontSize': '2.5rem'}}>Your Upgraded Cover Letter</h2>
                    <p style={{'color': 'var(--text-gray)'}}>Optimized, polished, and ready to impress.</p>
                </div>
                
                <div className="cl-preview-layout">
                    <div className={`cl-letter-mockup ${template}`}>
                        <div className="cl-letter-header">
                            <h2>ALEX JOHNSON</h2>
                            <p>alex.johnson@example.com | (555) 123-4567 | LinkedIn: /in/alexj</p>
                        </div>
                        <div className="cl-letter-body">
                            <p>Dear {targetRole || "Hiring Manager"},</p>
                            <p>I am writing to express my strong interest in the open position at your esteemed organization. With over a decade of experience driving cross-functional collaboration and utilizing data-driven decision making, I am well-equipped to contribute meaningfully to your strategic goals.</p>
                            <p>In my recent role, I successfully spearheaded initiatives that improved operational efficiency by 25%. My approach combines rigorous analytical thinking with hands-on leadership and mentoring, ensuring that team performance continuously exceeds expectations.</p>
                            <p>I would welcome the opportunity to discuss how my tailored skills and background align with your needs. Thank you for your time and consideration.</p>
                            <p>Sincerely,</p>
                            <p>Alex Johnson</p>
                        </div>
                    </div>
                    
                    <div className="cl-actions-panel glass" style={{'padding': '40px', 'borderRadius': '20px'}}>
                        <h3 style={{'marginBottom': '20px'}}>Template Selection</h3>
                        <div className="cl-template-selector">
                            <div className={`cl-template-option ${template === 'modern' ? 'active' : ''}`} onClick={() => setTemplate('modern')}>
                                <div className="cl-template-thumb modern"></div>
                                <span>Modern</span>
                            </div>
                            <div className={`cl-template-option ${template === 'classic' ? 'active' : ''}`} onClick={() => setTemplate('classic')}>
                                <div className="cl-template-thumb classic"></div>
                                <span>Classic</span>
                            </div>
                            <div className={`cl-template-option ${template === 'minimal' ? 'active' : ''}`} onClick={() => setTemplate('minimal')}>
                                <div className="cl-template-thumb minimal"></div>
                                <span>Minimal</span>
                            </div>
                            <div className={`cl-template-option ${template === 'creative' ? 'active' : ''}`} onClick={() => setTemplate('creative')}>
                                <div className="cl-template-thumb creative"></div>
                                <span>Creative</span>
                            </div>
                        </div>
                        <hr style={{'borderColor': 'rgba(255,255,255,0.1)', 'margin': '30px 0'}} />

                        <h3 style={{'marginBottom': '20px'}}>Export Options</h3>
                        <p style={{'color': 'var(--text-gray)', 'marginBottom': '30px'}}>Download your optimized cover letter in your preferred format.</p>
                        <div style={{'display': 'flex', 'flexDirection': 'column', 'gap': '15px'}}>
                            <button className="cl-btn cl-btn-primary" style={{'justifyContent': 'center'}} onClick={downloadPDF}><i className="fa-solid fa-file-pdf"></i> Save as PDF</button>
                            <button className="cl-btn" style={{'background': 'rgba(255,255,255,0.1)', 'justifyContent': 'center', 'color': 'white'}} onClick={downloadWord}><i className="fa-solid fa-file-word"></i> Save as Word</button>
                        </div>
                        <hr style={{'borderColor': 'rgba(255,255,255,0.1)', 'margin': '30px 0'}} />
                        <button className="cl-btn" style={{'background': 'transparent', 'color': 'var(--text-gray)', 'padding': '0'}} onClick={resetUpgrader}>
                            <i className="fa-solid fa-arrow-left"></i> Upgrade Another Document
                        </button>
                    </div>
                </div>
            </div>
        </div>)}

        {/*  What Happens Next Timeline  */}
        <section className="cl-timeline-section" style={{'padding': '100px 0', 'background': 'rgba(0,0,0,0.3)'}}>
            <div className="container">
                <h2 style={{'textAlign': 'center', 'fontSize': '2.5rem', 'marginBottom': '60px'}}>What happens next?</h2>
                <div className="cl-timeline">
                    <div className="cl-timeline-item">
                        <div className="cl-timeline-icon"><i className="fa-solid fa-magnifying-glass"></i></div>
                        <div className="cl-timeline-content glass">
                            <h4 style={{'color': 'var(--primary-color)', 'marginBottom': '10px'}}>1. Semantic Scan</h4>
                            <p style={{'color': 'var(--text-gray)'}}>Our AI reads your letter to understand your narrative, tone, and the skills you are highlighting.</p>
                        </div>
                    </div>
                    <div className="cl-timeline-item">
                        <div className="cl-timeline-icon"><i className="fa-solid fa-bullseye"></i></div>
                        <div className="cl-timeline-content glass">
                            <h4 style={{'color': 'var(--primary-color)', 'marginBottom': '10px'}}>2. Job Role Alignment</h4>
                            <p style={{'color': 'var(--text-gray)'}}>We cross-reference your content with the target job title to identify missing keywords and impact metrics.</p>
                        </div>
                    </div>
                    <div className="cl-timeline-item">
                        <div className="cl-timeline-icon"><i className="fa-solid fa-pen-nib"></i></div>
                        <div className="cl-timeline-content glass">
                            <h4 style={{'color': 'var(--primary-color)', 'marginBottom': '10px'}}>3. Structural Enhancement</h4>
                            <p style={{'color': 'var(--text-gray)'}}>The engine restructures sentences for maximum readability and persuasiveness.</p>
                        </div>
                    </div>
                    <div className="cl-timeline-item">
                        <div className="cl-timeline-icon"><i className="fa-solid fa-download"></i></div>
                        <div className="cl-timeline-content glass">
                            <h4 style={{'color': 'var(--primary-color)', 'marginBottom': '10px'}}>4. Ready for Export</h4>
                            <p style={{'color': 'var(--text-gray)'}}>Review the changes, download the perfectly formatted document, and apply with confidence.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/*  FAQ Section  */}
        <section className="faq-section" style={{'padding': '100px 0'}}>
            <div className="container">
                <div className="cl-faq-header" style={{'textAlign': 'center', 'marginBottom': '50px'}}>
                    <h2 style={{'fontSize': '2.5rem'}}>Frequently Asked Questions</h2>
                    <p style={{'color': 'var(--text-gray)'}}>Everything you need to know about our Cover Letter Upgrader.</p>
                </div>
                <div className="faq-list" style={{'maxWidth': '800px', 'margin': '0 auto', 'display': 'flex', 'flexDirection': 'column', 'gap': '20px'}}>
                    <div className="faq-item glass" style={{'padding': '0', 'borderRadius': '15px', 'overflow': 'hidden'}}>
                        <div className="faq-question"  style={{'padding': '25px', 'display': 'flex', 'justifyContent': 'space-between', 'alignItems': 'center', 'cursor': 'pointer'}}>
                            <h3 style={{'fontSize': '1.1rem', 'margin': '0'}}>Is the Cover Letter Upgrader free to use?</h3>
                            <i className="fa-solid fa-chevron-down" style={{'color': 'var(--primary-color)', 'transition': '0.3s', transform: openFaq === 0 ? 'rotate(180deg)' : 'rotate(0deg)'}}></i>
                        </div>
                        <div className="faq-answer" style={{'padding': '0 25px', 'maxHeight': openFaq === 0 ? '200px' : '0px', 'overflow': 'hidden', 'transition': '0.3s', 'color': 'var(--text-gray)'}}>
                            <p style={{'paddingBottom': '25px', 'margin': '0'}}>Yes, you can upload and analyze your cover letter for free. Premium features like advanced template exports may require a subscription.</p>
                        </div>
                    </div>
                    <div className="faq-item glass" style={{'padding': '0', 'borderRadius': '15px', 'overflow': 'hidden'}}>
                        <div className="faq-question"  style={{'padding': '25px', 'display': 'flex', 'justifyContent': 'space-between', 'alignItems': 'center', 'cursor': 'pointer'}}>
                            <h3 style={{'fontSize': '1.1rem', 'margin': '0'}}>What formats do you support?</h3>
                            <i className="fa-solid fa-chevron-down" style={{'color': 'var(--primary-color)', 'transition': '0.3s', transform: openFaq === 1 ? 'rotate(180deg)' : 'rotate(0deg)'}}></i>
                        </div>
                        <div className="faq-answer" style={{'padding': '0 25px', 'maxHeight': openFaq === 1 ? '200px' : '0px', 'overflow': 'hidden', 'transition': '0.3s', 'color': 'var(--text-gray)'}}>
                            <p style={{'paddingBottom': '25px', 'margin': '0'}}>We currently support PDF and Word documents for uploading. You can also export your upgraded cover letter in both PDF and Word formats.</p>
                        </div>
                    </div>
                    <div className="faq-item glass" style={{'padding': '0', 'borderRadius': '15px', 'overflow': 'hidden'}}>
                        <div className="faq-question"  style={{'padding': '25px', 'display': 'flex', 'justifyContent': 'space-between', 'alignItems': 'center', 'cursor': 'pointer'}}>
                            <h3 style={{'fontSize': '1.1rem', 'margin': '0'}}>How does the AI upgrade my cover letter?</h3>
                            <i className="fa-solid fa-chevron-down" style={{'color': 'var(--primary-color)', 'transition': '0.3s', transform: openFaq === 2 ? 'rotate(180deg)' : 'rotate(0deg)'}}></i>
                        </div>
                        <div className="faq-answer" style={{'padding': '0 25px', 'maxHeight': openFaq === 2 ? '200px' : '0px', 'overflow': 'hidden', 'transition': '0.3s', 'color': 'var(--text-gray)'}}>
                            <p style={{'paddingBottom': '25px', 'margin': '0'}}>Our AI analyzes your cover letter against industry standards and the specific role you are applying for. It enhances the narrative structure, fixes grammatical issues, and injects missing ATS keywords to ensure your application stands out.</p>
                        </div>
                    </div>
                    <div className="faq-item glass" style={{'padding': '0', 'borderRadius': '15px', 'overflow': 'hidden'}}>
                        <div className="faq-question"  style={{'padding': '25px', 'display': 'flex', 'justifyContent': 'space-between', 'alignItems': 'center', 'cursor': 'pointer'}}>
                            <h3 style={{'fontSize': '1.1rem', 'margin': '0'}}>Is my data secure?</h3>
                            <i className="fa-solid fa-chevron-down" style={{'color': 'var(--primary-color)', 'transition': '0.3s', transform: openFaq === 3 ? 'rotate(180deg)' : 'rotate(0deg)'}}></i>
                        </div>
                        <div className="faq-answer" style={{'padding': '0 25px', 'maxHeight': openFaq === 3 ? '200px' : '0px', 'overflow': 'hidden', 'transition': '0.3s', 'color': 'var(--text-gray)'}}>
                            <p style={{'paddingBottom': '25px', 'margin': '0'}}>Absolutely. We use industry-standard encryption to protect your data. Your uploaded files are never shared with third parties or used to train public AI models.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/*  Final CTA  */}
        <section style={{'padding': '100px 0', 'textAlign': 'center'}}>
            <div className="container">
                <div className="glass" style={{'padding': '60px', 'borderRadius': '30px', 'background': 'linear-gradient(135deg, rgba(212, 199, 122, 0.1), rgba(0,0,0,0.5))', 'borderColor': 'var(--primary-color)'}}>
                    <h2 style={{'fontSize': '3rem', 'marginBottom': '20px'}}>Stop blending in.</h2>
                    <p style={{'fontSize': '1.2rem', 'color': 'var(--text-gray)', 'maxWidth': '600px', 'margin': '0 auto 40px'}}>Transform your cover letter from ordinary to outstanding in seconds.</p>
                    <button className="cl-btn cl-btn-primary" onClick={scrollToUpload}>Upgrade Now</button>
                </div>
            </div>
        </section>
    
            </main>
            <HomeFooter />
        </div>
    );
}
