import React from 'react';
import './AIBCta.css';

export default function AIBCta() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-box">
          <div className="cta-glow"></div>
          <h2>Ready to land your dream job?</h2>
          <p>
            Join thousands of professionals who built their winning resume with MockB CV's AI. It takes less than 5 minutes.
          </p>
          <a href="#prompt-section" className="btn btn-primary btn-lg">
            <i className="fa-solid fa-wand-magic-sparkles"></i> Build My Resume Now
          </a>
        </div>
      </div>
    </section>
  );
}
