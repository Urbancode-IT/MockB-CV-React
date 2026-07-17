import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // 'resume' | 'cover-letter' | 'portfolio' | 'templates' | 'languages' | null
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
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

  const toggleMenu = (e, menuName) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const handleLinkClick = () => {
    setActiveMenu(null);
  };

  return (
    <header ref={headerRef} id="header" className={isScrolled ? 'scrolled' : ''}>
      <div className="container">
        <nav>
          <Link to="/" className="logo" onClick={handleLinkClick}>
            <i className="fa-solid fa-bee logo-icon"></i>
            <span>MockB CV</span>
          </Link>
          <ul className="nav-links">
            <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
            <li>
              <a href="#features" onClick={(e) => {
                e.preventDefault();
                if (location.pathname === '/') {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate('/');
                  setTimeout(() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }
                handleLinkClick();
              }}>Features</a>
            </li>
            <li className={`has-mega-menu ${activeMenu === 'resume' ? 'active' : ''}`}>
              <a href="#!" id="resume-builder-trigger" onClick={(e) => toggleMenu(e, 'resume')}>
                Resume<span className="hover-suffix"> Builder</span> <i className="fa-solid fa-chevron-down"></i>
              </a>
              <div className={`mega-menu ${activeMenu === 'resume' ? 'active' : ''}`} id="resume-mega-menu">
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
                        <h4>Resume upgrader</h4>
                        <p>Enhance and elevate your existing resume.</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <Link to="/resume/customizer" onClick={handleLinkClick}>
                <span className="hover-prefix">Resume </span>customizer
              </Link>
            </li>
            <li className={`has-mega-menu ${activeMenu === 'coverletter' ? 'active' : ''}`}>
              <a href="#!" id="cover-letter-trigger" onClick={(e) => toggleMenu(e, 'coverletter')}>
                Cover Letter<span className="hover-suffix"> Builder</span> <i className="fa-solid fa-chevron-down"></i>
              </a>
              <div className={`mega-menu ${activeMenu === 'coverletter' ? 'active' : ''}`} id="cover-letter-mega-menu">
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
                        <h4>Cover Letter upgrader</h4>
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
            <li className={`has-mega-menu ${activeMenu === 'portfolio' ? 'active' : ''}`}>
              <a href="#!" id="portfolio-trigger" onClick={(e) => toggleMenu(e, 'portfolio')}>
                Portfolio<span className="hover-suffix"> Builder</span> <i className="fa-solid fa-chevron-down"></i>
              </a>
              <div className={`mega-menu ${activeMenu === 'portfolio' ? 'active' : ''}`} id="portfolio-mega-menu">
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
            <li className={`has-mega-menu ${activeMenu === 'templates' ? 'active' : ''}`}>
              <a href="#!" id="templates-trigger" onClick={(e) => toggleMenu(e, 'templates')}>
                Templates <i className="fa-solid fa-chevron-down"></i>
              </a>
              <div className={`mega-menu ${activeMenu === 'templates' ? 'active' : ''}`} id="templates-mega-menu">
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
            <li className={`has-mega-menu ${activeMenu === 'languages' ? 'active' : ''}`} id="lang-menu-parent">
              <a href="#!" id="languages-trigger" onClick={(e) => toggleMenu(e, 'languages')}>
                Languages <i className="fa-solid fa-chevron-down"></i>
              </a>
              <div className={`mega-menu ${activeMenu === 'languages' ? 'active' : ''}`} id="languages-mega-menu">
                <div className="container">
                  <div className="mega-menu-grid">
                    <a href="#!" onClick={(e) => { e.preventDefault(); handleLinkClick(); if (window.changeLanguage) window.changeLanguage('en'); }} className="mega-menu-item">
                      <div className="item-icon"><i className="fa-solid fa-language"></i></div>
                      <div className="item-text"><h4>English</h4></div>
                    </a>
                    <a href="#!" onClick={(e) => { e.preventDefault(); handleLinkClick(); if (window.changeLanguage) window.changeLanguage('fr'); }} className="mega-menu-item">
                      <div className="item-icon"><i className="fa-solid fa-language"></i></div>
                      <div className="item-text"><h4>French</h4></div>
                    </a>
                    <a href="#!" onClick={(e) => { e.preventDefault(); handleLinkClick(); if (window.changeLanguage) window.changeLanguage('es'); }} className="mega-menu-item">
                      <div className="item-icon"><i className="fa-solid fa-language"></i></div>
                      <div className="item-text"><h4>Spanish</h4></div>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
          </ul>
          <div className="nav-actions">
            <button className="btn btn-primary" onClick={() => navigate('/resume/ai-builder')}>Get Started</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
