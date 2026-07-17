import React from 'react';
import './Showcase.css';

export default function Showcase() {
  return (
    <section className="container">
      <div className="highlight-section">
        <h2>Build better resumes<br />and applications</h2>
        <h2 className="extra-large">10x faster</h2>
        <p>From your initial draft to the final polish, we'll help you make a lasting impression in a fraction of the time.</p>
        <div className="mock-ui">
          <img src="/images/interface.png" alt="Resume Builder Interface" />
        </div>
      </div>
    </section>
  );
}
