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
                    <p>
                        Job hunters use MockB CV to land full-time jobs, part-time gigs, side hustles,
                        freelance work, internships, and more. Land what&apos;s next with MockB CV.
                    </p>
                    <button type="button" className="btn btn-dark" onClick={() => navigate('/resume/templates')}>
                        Get started today
                    </button>
                </div>

                <div className="footer-grid">
                    <div className="footer-col">
                        <h4>Platform</h4>
                        <ul>
                            <li><Link to="/resume/templates">Resume Templates</Link></li>
                            <li><Link to="/cover-letter/templates">Cover Letter Templates</Link></li>
                            <li><Link to="/portfolio-maker">Portfolio Maker</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Features</h4>
                        <ul>
                            <li><Link to="/resume/customizer">Resume Builder</Link></li>
                            <li><Link to="/cover-letter/customizer">Cover Letter Builder</Link></li>
                            <li><Link to="/resume/templates">Design Templates</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Resources</h4>
                        <ul>
                            <li><Link to="/terms">Terms of Use</Link></li>
                            <li><Link to="/privacy">Privacy</Link></li>
                            <li><Link to="/about">About MockB CV</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Support</h4>
                        <p style={{ color: '#000', fontWeight: '500', marginBottom: '1rem' }}>
                            <a href="mailto:support@mockb.cv">support@mockb.cv</a>
                        </p>
                        <div className="social-links">
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <i className="fa-brands fa-linkedin"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <i className="fa-brands fa-facebook"></i>
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} MockB CV. All rights reserved.
                        {' | '}
                        <Link to="/terms">Terms of Use</Link>
                        {' | '}
                        <Link to="/privacy">Privacy</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
