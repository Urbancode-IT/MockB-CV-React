import React from 'react';
import './About.css';

export default function About() {
    return (
        <div className="about-page-container fade-in">
            <main className="about-page">
                <section className="about-hero">
                    <div className="particles"></div>
                    <div className="moving-grid"></div>
                    <div className="container about-hero-content">
                        <div className="small-badge">ABOUT MOCKB CV</div>
                        <h1>A career platform built for <span className="highlight">real job seekers</span></h1>
                        <p className="subheading">
                            MockB CV is an organization focused on helping people present their work clearly —
                            through professional resumes and cover letters that hiring teams can actually read.
                        </p>
                    </div>
                </section>

                <section className="about-story container section-padding">
                    <div className="story-grid">
                        <div className="story-right" style={{ maxWidth: '820px' }}>
                            <h2>Who we are</h2>
                            <p>
                                MockB CV was founded to remove the noise around career documents. Too many tools
                                try to do everything at once. We stay focused on two things: a resume customizer
                                and a cover letter customizer, backed by a small library of ATS-friendly templates.
                            </p>
                            <p>
                                We are a product team based around design, hiring, and software. Our work is to
                                keep layouts clean, keep editing simple, and keep the original templates unchanged
                                so every user starts from the same professional standard.
                            </p>
                            <p>
                                The organization exists to serve students, early-career professionals, and people
                                changing roles — anyone who needs a document that looks considered without needing
                                a designer.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="about-mission-vision container section-padding">
                    <div className="mv-grid">
                        <div className="mv-card glass-card">
                            <div className="mv-icon"><i className="fa-solid fa-bullseye"></i></div>
                            <h3>Mission</h3>
                            <p>
                                To give every applicant a calm, professional way to write and design a resume and
                                cover letter — without clutter, gimmicks, or a maze of extra products.
                            </p>
                        </div>
                        <div className="mv-card glass-card">
                            <div className="mv-icon"><i className="fa-solid fa-eye"></i></div>
                            <h3>Vision</h3>
                            <p>
                                To be a trusted, focused career studio: one place for documents that look consistent,
                                read well, and respect the applicant’s time.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="about-values container section-padding">
                    <div className="section-header text-center">
                        <h2>How we work</h2>
                    </div>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="float-icon-box"><i className="fa-solid fa-pen-nib"></i></div>
                            <h3>Clarity</h3>
                            <p>Plain language, honest layouts, and no hidden steps.</p>
                        </div>
                        <div className="value-card">
                            <div className="float-icon-box"><i className="fa-solid fa-gem"></i></div>
                            <h3>Craft</h3>
                            <p>Templates are designed once, then left intact for everyone.</p>
                        </div>
                        <div className="value-card">
                            <div className="float-icon-box"><i className="fa-solid fa-user-group"></i></div>
                            <h3>People first</h3>
                            <p>Built for applicants, not for filling a feature checklist.</p>
                        </div>
                        <div className="value-card">
                            <div className="float-icon-box"><i className="fa-solid fa-shield-halved"></i></div>
                            <h3>Trust</h3>
                            <p>Your documents stay yours. We keep the product small on purpose.</p>
                        </div>
                    </div>
                </section>

                <section className="about-story container section-padding" style={{ paddingTop: 0 }}>
                    <div className="story-right" style={{ maxWidth: '820px', margin: '0 auto' }}>
                        <h2>Organization details</h2>
                        <p>
                            <strong>Name:</strong> MockB CV
                        </p>
                        <p>
                            <strong>Focus:</strong> Resume customizer, cover letter customizer, and template libraries.
                        </p>
                        <p>
                            <strong>Audience:</strong> Job seekers who want a professional document without a long setup.
                        </p>
                        <p>
                            <strong>Contact:</strong> For partnership or product questions, write to the MockB CV team
                            through the channels listed on the site footer.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}
