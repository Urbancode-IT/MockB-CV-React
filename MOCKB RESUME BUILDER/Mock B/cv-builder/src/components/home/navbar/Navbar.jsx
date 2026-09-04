import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // 'languages' | null
  const headerRef = useRef(null);
  const navigate = useNavigate();

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
              <Link to="/resume/templates" onClick={handleLinkClick}>Resume builder</Link>
            </li>
            <li>
              <Link to="/cover-letter/templates" onClick={handleLinkClick}>Cover letter builder</Link>
            </li>
            <li>
              <Link to="/portfolio-maker" onClick={handleLinkClick}>Portfolio maker</Link>
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
            <button className="btn btn-primary" onClick={() => navigate('/resume/customizer')}>Get Started</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
