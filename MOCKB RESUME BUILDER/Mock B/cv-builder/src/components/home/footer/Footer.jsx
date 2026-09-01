import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-cta">
          <h2>Land what's next</h2>
          <p>Build a professional resume and cover letter with templates, live preview, customization, and PDF download — all in one place.</p>
          <button type="button" className="btn btn-dark" onClick={() => navigate('/resume/customizer')}>Get started today</button>
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <h4>Platform</h4>
            <ul>
              <li><Link to="/resume/templates">Resume Templates</Link></li>
              <li><Link to="/resume/customizer">Resume Builder</Link></li>
              <li><Link to="/cover-letter/templates">Cover Letter Templates</Link></li>
              <li><Link to="/cover-letter/customizer">Cover Letter Builder</Link></li>
              <li><Link to="/#templates-gallery">Template Gallery</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Features</h4>
            <ul>
              <li><Link to="/resume/templates">One-Page Templates</Link></li>
              <li><Link to="/resume/templates">Two-Page Templates</Link></li>
              <li><Link to="/resume/customizer">Live Preview Editor</Link></li>
              <li><Link to="/resume/customizer">Design Customization</Link></li>
              <li><Link to="/resume/customizer">PDF Download</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/resume/guidelines">Resume Guidelines</Link></li>
              <li><Link to="/cover-letter/guidelines">Cover Letter Guidelines</Link></li>
              <li><Link to="/about">About MockB CV</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <p>support@mockbee.com</p>
            <div className="social-links">
              <a href="#"><i className="fa-brands fa-linkedin"></i></a>
              <a href="#"><i className="fa-brands fa-twitter"></i></a>
              <a href="#"><i className="fa-brands fa-facebook"></i></a>
              <a href="#"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 MockBee. All rights reserved. | <a href="#">Terms of Use</a> | <a href="#">Privacy</a> | <a href="#">Template Licenses</a></p>
        </div>
      </div>
    </footer>
  );
}
