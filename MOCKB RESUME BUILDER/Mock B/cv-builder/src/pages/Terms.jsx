import { Link } from 'react-router-dom';
import './About.css';

export default function Terms() {
    return (
        <div className="about-page-container fade-in">
            <main className="about-page">
                <section className="about-hero" style={{ minHeight: 'auto', padding: '5rem 0 3rem' }}>
                    <div className="container about-hero-content">
                        <div className="small-badge">LEGAL</div>
                        <h1>Terms of Use</h1>
                        <p className="subheading">
                            These terms explain how you may use MockB CV templates, builders, and downloads.
                        </p>
                    </div>
                </section>
                <section className="about-story container section-padding" style={{ paddingTop: '2rem' }}>
                    <div style={{ maxWidth: 760, margin: '0 auto', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                        <p>
                            By using MockB CV you agree to create content you have the rights to use, and to use
                            generated resumes, cover letters, and portfolios for your own career purposes.
                        </p>
                        <p>
                            Templates and design systems remain MockB CV property. You may download and customize
                            documents for personal or professional job applications. Redistributing our template
                            library as a competing product is not allowed.
                        </p>
                        <p>
                            Accounts are for individual use. You are responsible for keeping login details secure
                            and for the accuracy of information you enter into the builders.
                        </p>
                        <p>
                            Questions? Reach us at{' '}
                            <a href="mailto:support@mockb.cv">support@mockb.cv</a> or visit{' '}
                            <Link to="/about">About MockB CV</Link>.
                        </p>
                        <p style={{ marginTop: '2rem' }}>
                            <Link to="/privacy">Privacy Policy</Link>
                            {' · '}
                            <Link to="/">Back to home</Link>
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}
