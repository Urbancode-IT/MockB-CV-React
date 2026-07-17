import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="main-footer">
            <div className="container">
                <div className="footer-cta">
                    <h2>Land what's next</h2>
                    <p>Job hunters use MockBee's AI-powered tools to land full-time jobs, part-time gigs, side hustles, freelance work, internships, and more. Land what's next with MockBee.</p>
                    <button className="btn btn-dark">Get started today</button>
                </div>

                <div className="footer-grid">
                    <div className="footer-col">
                        <h4>Platform</h4>
                        <ul>
                            <li><a href="#">Plans and Pricing</a></li>
                            <li><a href="#">AI Cover Letters</a></li>
                            <li><a href="#">AI Resume Checker</a></li>
                            <li><a href="#">Resume Templates</a></li>
                            <li><a href="#">Affiliate Program</a></li>
                            <li><a href="#">Sell Templates</a></li>
                            <li><a href="#">Blog</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Features</h4>
                        <ul>
                            <li><a href="#">AI Cover Letter Generator</a></li>
                            <li><a href="#">Resume Keyword Optimizer</a></li>
                            <li><a href="#">ATS Resume Checker</a></li>
                            <li><a href="#">Resume Design Templates</a></li>
                            <li><a href="#">AI Connection Request Writer</a></li>
                            <li><a href="#">AI Resignation Letter Writer</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="#">4 AI Tools for Applying to Jobs</a></li>
                            <li><a href="#">How to Optimize Your Resume Keywords</a></li>
                            <li><a href="#">Why You Shouldn't Use ChatGPT for Cover Letters</a></li>
                            <li><a href="#">4 Reasons You Aren't Getting Job Interviews</a></li>
                            <li><a href="#">Does Anyone Actually Read Cover Letters?</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Support</h4>
                        <p style={{ color: '#000', fontWeight: '500', marginBottom: '1rem' }}>support@mockbee.com</p>
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
