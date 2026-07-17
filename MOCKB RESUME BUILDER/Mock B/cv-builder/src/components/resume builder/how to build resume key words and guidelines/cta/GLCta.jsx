import React from 'react';
import { Link } from 'react-router-dom';
import './GLCta.css';

export default function GLCta() {
    return (
        <section className="gl-guide-section container" style={{ paddingTop: '0', paddingBottom: '8rem' }}>
            <div className="gl-guide-card">
                <i className="fa-solid fa-rocket"></i>
                <h3>Ready to Build Your Winning Resume?</h3>
                <p>Apply all these expert rules automatically with our AI-powered builder.</p>
                <div style={{ marginTop: '1.5rem' }}>
                    <Link to="/resume/ai-builder" className="btn btn-primary">Start Building Now</Link>
                </div>
            </div>
        </section>
    );
}
