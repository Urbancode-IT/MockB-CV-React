import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CoverLetterGuidelines.css';

const TIMELINE_STEPS = [
    {
        id: 'step-1',
        stepNum: 'Step 01',
        subtitle: 'CONTACT & GREETINGS',
        title: 'ATS-Proof Formatting',
        description: 'Standard fonts, no text boxes, headers or tables. Research and address a specific name (e.g. "Dear Sarah Jenkins") instead of generic phrases.',
        colorClass: 'color-orange',
        bgClass: 'bg-orange',
        borderClass: 'border-orange'
    },
    {
        id: 'step-2',
        stepNum: 'Step 02',
        subtitle: 'THE HOOK',
        title: 'High-Impact Intro',
        description: 'Grab attention in the first 2 sentences. Name the exact job role, explain your motivation, and call out your primary career achievement right away.',
        colorClass: 'color-red',
        bgClass: 'bg-red',
        borderClass: 'border-red'
    },
    {
        id: 'step-3',
        stepNum: 'Step 03',
        subtitle: 'THE BODY',
        title: 'Quantifiable Value',
        description: 'Don\'t just list tasks. Use the Action Verb + Task + Result formula. Present percentages, dollar values, and scale to show genuine business impact.',
        colorClass: 'color-purple',
        bgClass: 'bg-purple',
        borderClass: 'border-purple'
    },
    {
        id: 'step-4',
        stepNum: 'Step 04',
        subtitle: 'KEYWORDS',
        title: 'Smart ATS Keywords',
        description: 'Extract core skills and technologies from the Job Description and integrate them naturally. Avoid keyword stuffing; match names perfectly (e.g. "React.js").',
        colorClass: 'color-blue',
        bgClass: 'bg-blue',
        borderClass: 'border-blue'
    },
    {
        id: 'step-5',
        stepNum: 'Step 05',
        subtitle: 'THE CLOSING',
        title: 'Professional CTA',
        description: 'Express absolute enthusiasm. Formulate a strong request for a conversation ("I look forward to discussing..."). End with a formal closing and keeping it to 1 page.',
        colorClass: 'color-green',
        bgClass: 'bg-green',
        borderClass: 'border-green'
    }
];

const FAQ_ITEMS = [
    {
        question: 'Do ATS systems actually scan cover letters?',
        answer: 'Yes. Many modern Applicant Tracking Systems (such as Taleo, Workday, and Greenhouse) scan cover letters and index their content, matching it against job-relevant keywords just like they do with resumes. A well-optimized cover letter can significantly boost your profile matching score.'
    },
    {
        question: 'What is the ideal length of a cover letter?',
        answer: 'An effective cover letter should never exceed a single page. It should consist of three to four distinct paragraphs (around 250 to 400 words total). Recruiters review hundreds of documents daily and appreciate concise, direct summaries of value.'
    },
    {
        question: 'Should I customize my cover letter for every single job?',
        answer: 'Absolutely. A generic, "one-size-fits-all" cover letter is easily recognized by recruiters and rarely contains the specific keyword mix required by custom ATS parameters. Using tools like MockB CV makes customizing letters for separate jobs extremely fast and reliable.'
    },
    {
        question: 'Can I use bullet points in my cover letter?',
        answer: 'Yes! Incorporating 2 or 3 bullet points in the middle section of your letter is a fantastic way to break up text density. Use bullet points specifically to highlight major quantifiable achievements and make them highly readable.'
    }
];

export default function CoverLetterGuidelines() {
    const [animate, setAnimate] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    useEffect(() => {
        setAnimate(true);
    }, []);

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <div className="cover-guidelines-page fade-in">
            <main>
                {/* Hero Section */}
                <section className="guide-hero">
                    <div className="container" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', maxWidth: '850px', margin: '0 auto' }}>
                            <h1 style={{ textAlign: 'center', width: '100%' }}>Master the Rules &<br/>Keywords for <span>ATS Cover<br/>Letters</span></h1>
                            <p style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem' }}>Unlock the secret blueprint used by recruitment professionals. Learn how to align keywords, optimize formatting, and see how MockB CV automates the entire process effortlessly.</p>
                            <div className="hero-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', width: '100%' }}>
                                <a href="#timeline-section" className="btn btn-primary" style={{ borderRadius: '8px' }}><i className="fa-solid fa-compass"></i> Explore Guidelines</a>
                                <Link to="/cover-letter/ai-builder" className="btn btn-secondary"><i className="fa-solid fa-arrow-trend-up"></i> Upgrade Yours Now</Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Company Milestones Arrow-Style Timeline Section */}
                <section id="timeline-section" className="milestone-timeline-section">
                    <div className="container">
                        <div className="section-title-wrapper text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                            <span className="sub-title" style={{ textAlign: 'center' }}>5-Step Success Map</span>
                            <h2 style={{ textAlign: 'center', width: '100%' }}>Cover Letter Writing Guidelines, Rules, Keywords</h2>
                            <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>Designed exactly like our high-end company milestone map, follow this strategic path from top-left to bottom-right to secure recruiter callbacks.</p>
                        </div>

                        {/* Diagonal Chevron Timeline Container */}
                        <div className={`milestone-container ${animate ? 'aos-animate' : ''}`}>
                            {/* Background Chevron Chain Track */}
                            <div className="timeline-chevron-track">
                                <div className="chevron-segment segment-orange"></div>
                                <div className="chevron-segment segment-red"></div>
                                <div className="chevron-segment segment-purple"></div>
                                <div className="chevron-segment segment-blue"></div>
                                <div className="chevron-segment segment-green"></div>
                            </div>

                            {/* Steps List positioned along the diagonal line */}
                            <div className="milestone-steps-list">
                                {TIMELINE_STEPS.map((step, index) => (
                                    <div key={step.id} className={`timeline-item ${step.id}`}>
                                        {/* Card standing vertically above node */}
                                        <div className="timeline-card glass">
                                            <div className={`card-num ${step.colorClass}`}>{step.stepNum}</div>
                                            <div className="card-subtitle">{step.subtitle}</div>
                                            <div className="card-content">
                                                <h3>{step.title}</h3>
                                                <p dangerouslySetInnerHTML={{ __html: step.description }}></p>
                                            </div>
                                            <div className={`card-bottom-strip ${step.bgClass}`}></div>
                                        </div>
                                        {/* Connector Pole */}
                                        <div className="timeline-pole"></div>
                                        {/* Center circular node on arrow path */}
                                        <div className={`timeline-node ${step.borderClass}`}>
                                            <div className={`node-dot ${step.bgClass}`}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Comparative MockB Efficiency Section */}
                <section className="mockb-efficiency-section">
                    <div className="container">
                        <div className="section-title-wrapper text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                            <span className="sub-title" style={{ textAlign: 'center' }}>How We Do It Better</span>
                            <h2 style={{ textAlign: 'center', width: '100%' }}>MockB CV Efficiency vs. Manual Writing</h2>
                            <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>Writing a highly-optimized, role-specific cover letter is tedious. See how MockB's advanced engine turns hours of stress into seconds of perfection.</p>
                        </div>

                        <div className="efficiency-grid">
                            {/* Left: Manual Writing Card */}
                            <div className="comparison-card glass manual-card">
                                <div className="card-header">
                                    <i className="fa-solid fa-hourglass-half"></i>
                                    <h3>Manual Writing</h3>
                                </div>
                                <ul className="comparison-list">
                                    <li>
                                        <span className="badge-red"><i className="fa-solid fa-xmark"></i> Slow Process</span>
                                        <p>Takes 1 to 2 hours of drafting, testing, and editing for every single job application.</p>
                                    </li>
                                    <li>
                                        <span className="badge-red"><i class="fa-solid fa-xmark"></i> Blind Keyword Matching</span>
                                        <p>Manually guessing and scattering keywords without knowing if they meet ATS density criteria.</p>
                                    </li>
                                    <li>
                                        <span class="badge-red"><i className="fa-solid fa-xmark"></i> Tone Inconsistencies</span>
                                        <p>Struggling to balance confidence and humility, leading to overly conversational or dry prose.</p>
                                    </li>
                                    <li>
                                        <span className="badge-red"><i className="fa-solid fa-xmark"></i> No Metric Optimization</span>
                                        <p>Forgetting to frame standard duties into measurable, business-critical achievements.</p>
                                    </li>
                                </ul>
                            </div>

                            {/* Right: MockB CV Writing Card */}
                            <div className="comparison-card glass mockb-card">
                                <div className="card-header">
                                    <i className="fa-solid fa-rocket"></i>
                                    <h3>MockB CV Automated Writing</h3>
                                </div>
                                <ul className="comparison-list">
                                    <li>
                                        <span className="badge-green"><i className="fa-solid fa-check"></i> 10-Second Output</span>
                                        <p>AI scans your background and creates a bespoke, ready-to-use cover letter in seconds.</p>
                                    </li>
                                    <li>
                                        <span className="badge-green"><i className="fa-solid fa-check"></i> Advanced Keyword Scan</span>
                                        <p>Deep semantic scanner automatically imports heavy keywords from target Job Descriptions.</p>
                                    </li>
                                    <li>
                                        <span className="badge-green"><i className="fa-solid fa-check"></i> Balanced Tone AI</span>
                                        <p>Advanced tone models adjust phrasing to match executive, technical, or creative parameters perfectly.</p>
                                    </li>
                                    <li>
                                        <span className="badge-green"><i className="fa-solid fa-check"></i> Action-Result Enhancer</span>
                                        <p>Automatically converts passive descriptions into highly measurable, results-oriented impact points.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Detailed ATS & Content Guidelines */}
                <section className="detailed-guidelines-section">
                    <div className="container">
                        <div className="section-title-wrapper text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                            <span className="sub-title" style={{ textAlign: 'center' }}>Recruiter Intel</span>
                            <h2 style={{ textAlign: 'center', width: '100%' }}>Key ATS Rules & Formatting Standards</h2>
                            <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>Hiring systems are highly algorithmic. If your cover letter isn't structured appropriately, it will fail before a human even reads the first line.</p>
                        </div>

                        <div className="grid-guidelines">
                            {/* Guideline 1 */}
                            <div className="guideline-box glass">
                                <div className="box-icon"><i className="fa-solid fa-font"></i></div>
                                <h3>Choose Safe Typography</h3>
                                <p>Stick strictly to highly readable, standard web fonts. Avoid custom display scripts, icons inside lines, and special dingbat bullets. We recommend using <strong>Satoshi, Arial, Calibri, or Inter</strong> for the absolute best parsing outcomes.</p>
                            </div>

                            {/* Guideline 2 */}
                            <div className="guideline-box glass">
                                <div className="box-icon"><i className="fa-solid fa-file-pdf"></i></div>
                                <h3>File Formats Matter</h3>
                                <p>Export your documents strictly as a polished <strong>PDF</strong> or <strong>Microsoft Word (.docx)</strong>. Never upload images or scanned pages, as ATS systems cannot read pixelated raster text, leaving your document entirely blank in their systems.</p>
                            </div>

                            {/* Guideline 3 */}
                            <div className="guideline-box glass">
                                <div className="box-icon"><i className="fa-solid fa-chart-simple"></i></div>
                                <h3>Optimized Keyword Density</h3>
                                <p>Target a natural keyword density between <strong>2% to 4%</strong>. Stuffing matching terms in white invisible text or repeating them excessively in lists triggers safety flags in modern ATS systems, resulting in immediate rejection.</p>
                            </div>

                            {/* Guideline 4 */}
                            <div className="guideline-box glass">
                                <div className="box-icon"><i className="fa-solid fa-arrows-to-eye"></i></div>
                                <h3>The Recruiter's 8-Second Rule</h3>
                                <p>Humans read quickly. Keep paragraphs short (maximum 4 lines) and utilize clear visual structure. Use a highlighted <strong>"Key Value Highlights"</strong> section or clean bullet points to summarize your largest metrics instantly.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="faq-section">
                    <div className="container">
                        <div className="faq-header text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                            <span className="sub-title" style={{ textAlign: 'center' }}>Got Questions?</span>
                            <h2 style={{ textAlign: 'center', width: '100%' }}>Frequently Asked Questions</h2>
                            <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>Everything you need to know about optimizing cover letters for Applicant Tracking Systems and recruiter review.</p>
                        </div>

                        <div className="faq-list">
                            {FAQ_ITEMS.map((item, index) => (
                                <div key={index} className={`faq-item glass ${openFaqIndex === index ? 'active' : ''}`}>
                                    <div className="faq-question" onClick={() => toggleFaq(index)}>
                                        <h3>{item.question}</h3>
                                        <i className="fa-solid fa-chevron-down" style={{
                                            transform: openFaqIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.3s ease'
                                        }}></i>
                                    </div>
                                    <div className="faq-answer" style={{
                                        maxHeight: openFaqIndex === index ? '500px' : '0',
                                        transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                        overflow: 'hidden'
                                    }}>
                                        <p>{item.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final Call to Action */}
                <section className="guide-cta-section container">
                    <div className="cta-box glass" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <h2 style={{ textAlign: 'center', width: '100%' }}>Ready to Build a Winning Cover Letter?</h2>
                        <p style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem' }}>Don't write it manually. Apply all these expert guidelines, formatting standards, and keyword configurations automatically using our AI-driven systems.</p>
                        <div className="cta-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', width: '100%' }}>
                            <Link to="/cover-letter/ai-builder" className="btn btn-primary" style={{ backgroundColor: '#EEC30C', color: '#000', borderRadius: '50px' }}>Start Builder Engine</Link>
                            <Link to="/cover-letter/ai-builder" className="btn btn-secondary" style={{ borderRadius: '50px', color: '#E5E5E5' }}>Analyze Existing Letter</Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
