import { Link } from 'react-router-dom';
import './About.css';

export default function Privacy() {
    return (
        <div className="about-page-container fade-in">
            <main className="about-page">
                <section className="about-hero" style={{ minHeight: 'auto', padding: '5rem 0 3rem' }}>
                    <div className="container about-hero-content">
                        <div className="small-badge">LEGAL</div>
                        <h1>Privacy Policy</h1>
                        <p className="subheading">
                            How MockB CV handles account data, resume content, and local drafts.
                        </p>
                    </div>
                </section>
                <section className="about-story container section-padding" style={{ paddingTop: '2rem' }}>
                    <div style={{ maxWidth: 760, margin: '0 auto', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                        <p>
                            We collect account details you provide (such as name and email) to run sign-in,
                            dashboards, and saved documents. Resume and cover letter content you enter is used
                            to power the builders and exports you request.
                        </p>
                        <p>
                            Some drafts and preferences are stored in your browser (local storage) so you can
                            continue editing. Clearing site data removes those local drafts.
                        </p>
                        <p>
                            We do not sell your personal information. Access is limited to operating MockB CV
                            and improving product reliability.
                        </p>
                        <p>
                            For privacy requests, contact{' '}
                            <a href="mailto:support@mockb.cv">support@mockb.cv</a>.
                        </p>
                        <p style={{ marginTop: '2rem' }}>
                            <Link to="/terms">Terms of Use</Link>
                            {' · '}
                            <Link to="/">Back to home</Link>
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}
