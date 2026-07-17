import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null); // 'resume' | 'cover-letter' | 'portfolio' | 'templates' | 'languages' | null
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const headerRef = useRef(null);

    // Sticky header on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menus on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (headerRef.current && !headerRef.current.contains(event.target)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close menus on Escape key
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setActiveMenu(null);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const toggleMenu = (menuName) => {
        setActiveMenu(activeMenu === menuName ? null : menuName);
    };

    const handleLinkClick = () => {
        setActiveMenu(null);
        setIsMobileOpen(false);
    };

    return (
        <header ref={headerRef} className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <nav>
                    <Link to="/" className="logo" onClick={handleLinkClick}>
                        <i className="fa-solid fa-bee logo-icon"></i>
                        <span>MockB CV</span>
                    </Link>

                    <div className="hamburger" onClick={() => setIsMobileOpen(!isMobileOpen)}>
                        <span style={{ transform: isMobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
                        <span style={{ opacity: isMobileOpen ? 0 : 1 }}></span>
                        <span style={{ transform: isMobileOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none' }}></span>
                    </div>

                    <ul className={`nav-links ${isMobileOpen ? 'mobile-open' : ''}`}>
                        <li>
                            <Link to="/" onClick={handleLinkClick}>Home</Link>
                        </li>

                        {/* Resume Mega Menu */}
                        <li className={`has-mega-menu ${activeMenu === 'resume' ? 'active' : ''}`}>
                            <button className="nav-toggle-btn" onClick={() => toggleMenu('resume')}>
                                Resume<span className="hover-suffix"> Builder</span> <i className="fa-solid fa-chevron-down"></i>
                            </button>
                            <div className={`mega-menu ${activeMenu === 'resume' ? 'active' : ''}`}>
                                <div className="container">
                                    <div className="mega-menu-grid">
                                        <Link to="/resume/ai-builder" className="mega-menu-item" onClick={handleLinkClick}>
                                            <div className="item-icon"><i className="fa-solid fa-robot"></i></div>
                                            <div className="item-text">
                                                <h4>AI Resume Builder ATS Friendly</h4>
                                                <p>Generate professional resumes with AI power.</p>
                                            </div>
                                        </Link>
                                        <Link to="/resume/ats-checker" className="mega-menu-item" onClick={handleLinkClick}>
                                            <div className="item-icon"><i className="fa-solid fa-gauge-high"></i></div>
                                            <div className="item-text">
                                                <h4>Resume ATS Score Checker</h4>
                                                <p>Analyze your resume against ATS algorithms.</p>
                                            </div>
                                        </Link>
                                        <Link to="/resume/role-based" className="mega-menu-item" onClick={handleLinkClick}>
                                            <div className="item-icon"><i className="fa-solid fa-user-tie"></i></div>
                                            <div className="item-text">
                                                <h4>Role-based Resume Building</h4>
                                                <p>Tailored templates for specific job roles.</p>
                                            </div>
                                        </Link>
                                        <Link to="/resume/jd-builder" className="mega-menu-item" onClick={handleLinkClick}>
                                            <div className="item-icon"><i className="fa-solid fa-file-invoice"></i></div>
                                            <div className="item-text">
                                                <h4>Create Resume Based on Job Description</h4>
                                                <p>Match your resume to specific job requirements.</p>
                                            </div>
                                        </Link>
                                        <Link to="/resume/guidelines" className="mega-menu-item" onClick={handleLinkClick}>
                                            <div className="item-icon"><i className="fa-solid fa-book-open"></i></div>
                                            <div className="item-text">
                                                <h4>How to Build Resume: Keywords and Guideline</h4>
                                                <p>Expert tips on keywords and formatting.</p>
                                            </div>
                                        </Link>
                                        <Link to="/resume/upgrader" className="mega-menu-item" onClick={handleLinkClick}>
                                            <div className="item-icon"><i className="fa-solid fa-arrow-trend-up"></i></div>
                                            <div className="item-text">
                                                <h4>Resume Upgrader</h4>
                                                <p>Enhance and elevate your existing resume.</p>
                                            </div>
                                        </Link>
                                        <Link to="/resume/customizer" className="mega-menu-item" onClick={handleLinkClick}>
                                            <div className="item-icon"><i className="fa-solid fa-pen-to-square"></i></div>
                                            <div className="item-text">
                                                <h4>Resume Customizer</h4>
                                                <p>Customize and design your resume style.</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </li>

                        {/* Cover Letter Mega Menu */}
                        <li className={`has-mega-menu ${activeMenu === 'cover-letter' ? 'active' : ''}`}>
                            <button className="nav-toggle-btn" onClick={() => toggleMenu('cover-letter')}>
                                Cover Letter<span className="hover-suffix"> Builder</span> <i className="fa-solid fa-chevron-down"></i>
                            </button>
                            <div className={`mega-menu ${activeMenu === 'cover-letter' ? 'active' : ''}`}>
                                <div className="container">
                                    <div className="mega-menu-grid">
                                        <Link to="/cover-letter/ai-builder" className="mega-menu-item" onClick={handleLinkClick}>
                                            <div className="item-icon"><i className="fa-solid fa-robot"></i></div>
                                            <div className="item-text">
                                                <h4>AI Cover Letter Builder ATS Friendly</h4>
                                                <p>Generate professional cover letters with AI power.</p>
                                            </div>
                                        </Link>
                                        <Link to="/cover-letter/ats-checker" className="mega-menu-item" onClick={handleLinkClick}>
                                            <div className="item-icon"><i className="fa-solid fa-gauge-high"></i></div>
                                            <div className="item-text">
                                                <h4>Cover Letter ATS Score Checker</h4>
                                                <p>Analyze your cover letter against ATS algorithms.</p>
                                            </div>
                                        </Link>
                                        <Link to="/cover-letter/role-based" className="mega-menu-item" onClick={handleLinkClick}>
                                            <div className="item-icon"><i className="fa-solid fa-user-tie"></i></div>
                                            <div className="item-text">
                                                <h4>Role-based Cover Letter Building</h4>
                                                <p>Tailored templates for specific job roles.</p>
                                            </div>
                                        </Link>
                                        <Link to="/cover-letter/jd-builder" className="mega-menu-item" onClick={handleLinkClick}>
                                            <div className="item-icon"><i className="fa-solid fa-file-invoice"></i></div>
                                            <div className="item-text">
                                                <h4>Create Cover Letter Based on Job Description</h4>
                                                <p>Match your cover letter to specific job requirements.</p>
                                            </div>
                                        </Link>
                                        <Link to="/cover-letter/guidelines" className="mega-menu-item" onClick={handleLinkClick}>
                                            <div className="item-icon"><i className="fa-solid fa-book-open"></i></div>
                                            <div className="item-text">
                                                <h4>How to Build Cover Letter: Keywords and Guideline</h4>
                                                <p>Expert tips on keywords and formatting.</p>
                                            </div>
                                        </Link>
                                        <Link to="/cover-letter/upgrader" className="mega-menu-item" onClick={handleLinkClick}>
                                            <div className="item-icon"><i className="fa-solid fa-arrow-trend-up"></i></div>
                                            <div className="item-text">
                                                <h4>Cover Letter Upgrader</h4>
                                                <p>Enhance and elevate your existing cover letter.</p>
                                            </div>
                                        </Link>
                                        <Link to="/cover-letter/customizer" className="mega-menu-item" onClick={handleLinkClick}>
                                            <div className="item-icon"><i className="fa-solid fa-pen-to-square"></i></div>
                                            <div className="item-text">
                                                <h4>Cover letter Customizer</h4>
                                                <p>Customize and design your cover letter style.</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </li>

                        {/* Portfolio Mega Menu */}
                        <li className={`has-mega-menu ${activeMenu === 'portfolio' ? 'active' : ''}`}>
                            <button className="nav-toggle-btn" onClick={() => toggleMenu('portfolio')}>
                                Portfolio<span className="hover-suffix"> Builder</span> <i className="fa-solid fa-chevron-down"></i>
                            </button>
                            <div className={`mega-menu ${activeMenu === 'portfolio' ? 'active' : ''}`}>
                                <div className="container">
                                    <div className="mega-menu-grid">
                                        <Link to="/portfolio-builder" className="mega-menu-item" onClick={handleLinkClick}>
                                            <div className="item-icon"><i className="fa-solid fa-laptop-code"></i></div>
                                            <div className="item-text">
                                                <h4>Build Portfolio</h4>
                                                <p>Generate professional web portfolios with AI power.</p>
                                            </div>
                                        </Link>
                                        <Link to="/why-portfolio" className="mega-menu-item" onClick={handleLinkClick}>
                                            <div className="item-icon"><i className="fa-solid fa-circle-question"></i></div>
                                            <div className="item-text">
                                                <h4>Why Portfolio and its Uses</h4>
                                                <p>Discover the power and key benefits of a professional portfolio.</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </li>

                        {/* Templates Mega Menu */}
                        <li className={`has-mega-menu ${activeMenu === 'templates' ? 'active' : ''}`}>
                            <button className="nav-toggle-btn" onClick={() => toggleMenu('templates')}>
                                Templates <i className="fa-solid fa-chevron-down"></i>
                            </button>
                            <div className={`mega-menu ${activeMenu === 'templates' ? 'active' : ''}`}>
                                <div className="container">
                                    <div className="mega-menu-grid">
                                        <Link to="/resume/templates" className="mega-menu-item" onClick={handleLinkClick}>
                                            <div className="item-icon"><i className="fa-solid fa-file-lines"></i></div>
                                            <div className="item-text">
                                                <h4>Resume Templates</h4>
                                                <p>Explore our collection of professional resume templates.</p>
                                            </div>
                                        </Link>
                                        <Link to="/cover-letter/templates" className="mega-menu-item" onClick={handleLinkClick}>
                                            <div className="item-icon"><i className="fa-solid fa-envelope-open-text"></i></div>
                                            <div className="item-text">
                                                <h4>Cover Letter Templates</h4>
                                                <p>Browse cover letter templates designed to get you hired.</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </li>

                        {/* Languages Dropdown */}
                        <li className={`has-mega-menu ${activeMenu === 'languages' ? 'active' : ''}`}>
                            <button className="nav-toggle-btn" onClick={() => toggleMenu('languages')}>
                                Languages <i className="fa-solid fa-chevron-down"></i>
                            </button>
                            <div className={`mega-menu ${activeMenu === 'languages' ? 'active' : ''}`}>
                                <div className="container">
                                    <div className="mega-menu-grid">
                                        <button className="mega-menu-item" onClick={() => { handleLinkClick(); if (window.changeLanguage) window.changeLanguage('en'); }}>
                                            <div className="item-icon"><i className="fa-solid fa-language"></i></div>
                                            <div className="item-text"><h4>English</h4></div>
                                        </button>
                                        <button className="mega-menu-item" onClick={() => { handleLinkClick(); if (window.changeLanguage) window.changeLanguage('fr'); }}>
                                            <div className="item-icon"><i className="fa-solid fa-language"></i></div>
                                            <div className="item-text"><h4>French</h4></div>
                                        </button>
                                        <button className="mega-menu-item" onClick={() => { handleLinkClick(); if (window.changeLanguage) window.changeLanguage('es'); }}>
                                            <div className="item-icon"><i className="fa-solid fa-language"></i></div>
                                            <div className="item-text"><h4>Spanish</h4></div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <Link to="/about" onClick={handleLinkClick}>About</Link>
                        </li>
                    </ul>

                    <div className="nav-actions">
                        <Link to="/resume/ai-builder" className="btn btn-primary" onClick={handleLinkClick}>Get Started</Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}
