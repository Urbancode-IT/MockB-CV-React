import React from 'react';
import { Link } from 'react-router-dom';
import './WhyPortfolio.css';

export default function WhyPortfolio() {
    return (
        <div className="why-portfolio-container fade-in">
            <main>
                {/* Hero Section */}
                <section className="why-hero-section">
                    <div className="container">
                        <div className="hero-content">
                            <span className="accent-tag"><i className="fa-solid fa-bolt"></i> WHY MOCKB PORTFOLIOS?</span>
                            <h1>Build More Than a Resume.<br /><span>Build Your Professional Identity.</span></h1>
                            <p>MockB Portfolio transforms traditional resumes into interactive professional portfolios that showcase skills, projects, achievements, and career growth in one place.</p>
                            <p className="highlight-text">Modern recruiters don't just read resumes — they explore proof of work.</p>
                        </div>

                        <div className="hero-features-grid">
                            <div className="feature-card">
                                <i className="fa-solid fa-briefcase"></i>
                                <span>Portfolio-driven career branding</span>
                            </div>
                            <div className="feature-card">
                                <i className="fa-solid fa-check-double"></i>
                                <span>ATS-friendly structure</span>
                            </div>
                            <div className="feature-card">
                                <i className="fa-solid fa-desktop"></i>
                                <span>Live project showcasing</span>
                            </div>
                            <div className="feature-card">
                                <i className="fa-solid fa-globe"></i>
                                <span>Professional online presence</span>
                            </div>
                            <div className="feature-card">
                                <i className="fa-solid fa-eye"></i>
                                <span>Smart recruiter visibility</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Comparison Section */}
                <section className="comparison-section">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2>WHY DO YOU NEED A <span>PORTFOLIO?</span></h2>
                            <p style={{ color: 'var(--text-gray)', marginTop: '0.5rem' }}>Traditional Resume vs MockB Portfolio</p>
                        </div>

                        <div className="comparison-grid">
                            <div className="compare-card traditional">
                                <div className="card-head">
                                    <i className="fa-solid fa-file-lines"></i>
                                    <h3>Traditional Resume</h3>
                                </div>
                                <ul className="compare-list">
                                    <li><i className="fa-solid fa-xmark"></i> Static PDF document</li>
                                    <li><i className="fa-solid fa-xmark"></i> Limited project visibility</li>
                                    <li><i className="fa-solid fa-xmark"></i> Hard to personalize</li>
                                    <li><i className="fa-solid fa-xmark"></i> Minimal recruiter engagement</li>
                                </ul>
                            </div>
                            <div className="compare-card mockb">
                                <div className="card-head">
                                    <i className="fa-solid fa-laptop-code"></i>
                                    <h3>MockB Portfolio</h3>
                                    <span className="card-tag" style={{ position: 'static', padding: '0.2rem 0.8rem', fontSize: '0.75rem', background: 'var(--primary-color)', color: '#000', borderRadius: '4px', marginLeft: 'auto' }}>Recommended</span>
                                </div>
                                <ul className="compare-list">
                                    <li><i className="fa-solid fa-check"></i> Interactive digital profile</li>
                                    <li><i className="fa-solid fa-check"></i> Showcase live projects</li>
                                    <li><i className="fa-solid fa-check"></i> Custom portfolio themes</li>
                                    <li><i className="fa-solid fa-check"></i> Stronger personal branding</li>
                                    <li><i className="fa-solid fa-check"></i> Better recruiter experience</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Uses Section */}
                <section className="key-uses-section">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2>KEY USES OF <span>MOCKB PORTFOLIO</span></h2>
                        </div>

                        <div className="uses-timeline">
                            {/* Use 1 */}
                            <div className="use-item">
                                <div className="use-number">1</div>
                                <div className="use-content">
                                    <h3>Professional Career Branding</h3>
                                    <p>Create a professional identity that reflects your skills, achievements, and expertise visually and interactively.</p>
                                </div>
                            </div>
                            
                            {/* Use 2 */}
                            <div className="use-item">
                                <div className="use-number">2</div>
                                <div className="use-content">
                                    <h3>Showcase Projects Effectively</h3>
                                    <p>Recruiters can see proof instead of just claims. Display:</p>
                                    <div className="tags-group">
                                        <span>Development projects</span>
                                        <span>UI/UX designs</span>
                                        <span>Certifications</span>
                                        <span>Case studies</span>
                                        <span>Work samples</span>
                                    </div>
                                </div>
                            </div>

                            {/* Use 3 */}
                            <div className="use-item">
                                <div className="use-number">3</div>
                                <div className="use-content">
                                    <h3>ATS Optimization</h3>
                                    <p>MockB portfolios help improve visibility through:</p>
                                    <ul className="compare-list" style={{ marginTop: '1rem', gap: '0.8rem' }}>
                                        <li><i className="fa-solid fa-circle-check" style={{ color: 'var(--primary-color)' }}></i> Keyword optimization</li>
                                        <li><i className="fa-solid fa-circle-check" style={{ color: 'var(--primary-color)' }}></i> Better resume structure</li>
                                        <li><i className="fa-solid fa-circle-check" style={{ color: 'var(--primary-color)' }}></i> Recruiter-friendly formatting</li>
                                        <li><i className="fa-solid fa-circle-check" style={{ color: 'var(--primary-color)' }}></i> Search discoverability</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Use 4 */}
                            <div className="use-item">
                                <div className="use-number">4</div>
                                <div className="use-content">
                                    <h3>Multiple Portfolio Versions</h3>
                                    <p>Build role-specific tailored portfolios instantly:</p>
                                    <div className="tags-group outline">
                                        <span>Software Developer</span>
                                        <span>Testing</span>
                                        <span>UI/UX Designer</span>
                                        <span>Marketing</span>
                                        <span>Data Analyst</span>
                                    </div>
                                </div>
                            </div>

                            {/* Use 5 */}
                            <div className="use-item">
                                <div className="use-number">5</div>
                                <div className="use-content">
                                    <h3>Improve Recruiter Engagement</h3>
                                    <p>Interactive portfolios increase profile quality by providing:</p>
                                    <div className="tags-group">
                                        <span>Project previews</span>
                                        <span>Career highlights</span>
                                        <span>Skills showcase</span>
                                        <span>Professional links</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Who Can Use Section */}
                <section className="who-can-use-section">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2>WHO CAN USE <span>MOCKB PORTFOLIOS?</span></h2>
                        </div>

                        <div className="personas-grid">
                            <div className="persona-card">
                                <i className="fa-solid fa-graduation-cap"></i>
                                <h3>Students</h3>
                               <p>Build professional profiles before placements.</p>
                            </div>
                            <div className="persona-card">
                                <i className="fa-solid fa-seedling"></i>
                                <h3>Freshers</h3>
                                <p>Create stronger first impressions.</p>
                            </div>
                            <div className="persona-card">
                                <i className="fa-solid fa-user-tie"></i>
                                <h3>Experienced Professionals</h3>
                                <p>Upgrade career branding.</p>
                            </div>
                            <div className="persona-card">
                                <i className="fa-solid fa-laptop-house"></i>
                                <h3>Freelancers</h3>
                                <p>Showcase client work professionally.</p>
                            </div>
                            <div className="persona-card">
                                <i className="fa-solid fa-shuffle"></i>
                                <h3>Career Switchers</h3>
                                <p>Demonstrate transferable skills clearly.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Advantages Section */}
                <section className="advantages-section">
                    <div className="container">
                        <div className="split-layout">
                            <div className="advantages-block">
                                <h3>MOCKB PORTFOLIO ADVANTAGES</h3>
                                <div className="adv-list">
                                    <div className="adv-item">
                                        <strong>Smart Customization</strong>
                                        <p>Personalize layouts and themes.</p>
                                    </div>
                                    <div className="adv-item">
                                        <strong>Real-Time Updates</strong>
                                        <p>Update content anytime.</p>
                                    </div>
                                    <div className="adv-item">
                                        <strong>SEO Visibility</strong>
                                        <p>Improve discoverability.</p>
                                    </div>
                                    <div className="adv-item">
                                        <strong>Faster Sharing</strong>
                                        <p>Share one portfolio link everywhere.</p>
                                    </div>
                                    <div className="adv-item">
                                        <strong>Professional Presence</strong>
                                        <p>Stand out from traditional applicants.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="recruiters-block">
                                <div className="section-header">
                                    <h2>WHY RECRUITERS PREFER <span>DIGITAL PORTFOLIOS</span></h2>
                                </div>
                                <ul className="feature-bullets large">
                                    <li><i className="fa-solid fa-check"></i> Faster skill evaluation</li>
                                    <li><i className="fa-solid fa-check"></i> Better project visibility</li>
                                    <li><i className="fa-solid fa-check"></i> Improved candidate understanding</li>
                                    <li><i className="fa-solid fa-check"></i> Professional presentation</li>
                                    <li><i className="fa-solid fa-check"></i> Easy profile sharing</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Career Impact & CTA */}
                <section className="career-impact-section">
                    <div className="container">
                        <div className="impact-metrics text-center">
                            <span className="accent-tag">CAREER IMPACT</span>
                            <div className="metric-row">
                                <div className="metric-card">
                                    <h4>3x Better</h4>
                                    <p>Personal Branding</p>
                                </div>
                                <div className="metric-card">
                                    <h4>100%</h4>
                                    <p>Portfolio Visibility</p>
                                </div>
                                <div className="metric-card">
                                    <h4>Modern</h4>
                                    <p>Hiring Ready</p>
                                </div>
                                <div className="metric-card">
                                    <h4>Focused</h4>
                                    <p>Industry Presentation</p>
                                </div>
                            </div>
                        </div>

                        <div className="final-cta text-center">
                            <h2>Your Resume Explains You. <span>Your Portfolio Proves You.</span></h2>
                            <p>Build a MockB Portfolio and create a stronger professional presence.</p>
                            <Link to="/portfolio-builder" className="btn btn-primary">Start Building Free <i className="fa-solid fa-arrow-right" style={{ marginLeft: '6px' }}></i></Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
