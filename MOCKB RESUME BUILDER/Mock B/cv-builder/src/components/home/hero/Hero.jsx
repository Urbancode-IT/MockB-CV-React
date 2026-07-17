import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/resume/ai-builder', { state: { email } });
  };

  return (
    <section className="hero">
      <div className="container">
        <h1>Land your next <span>dream job</span></h1>
        <p>Create a professional, ATS-optimized resume in minutes. Powered by advanced AI to help you stand out from the crowd and get hired faster.</p>
        
        <form className="cta-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <button type="submit" className="btn btn-primary">Get Started</button>
        </form>

        <div className="trust-badges">
          <div className="hero-badge">
            <i className="fa-solid fa-circle-check"></i>
            <span>ATS-Friendly</span>
          </div>
          <div className="hero-badge">
            <i className="fa-solid fa-circle-check"></i>
            <span>Industry Experts</span>
          </div>
          <div className="hero-badge">
            <i className="fa-solid fa-circle-check"></i>
            <span>AI-Powered</span>
          </div>
        </div>
      </div>
    </section>
  );
}
