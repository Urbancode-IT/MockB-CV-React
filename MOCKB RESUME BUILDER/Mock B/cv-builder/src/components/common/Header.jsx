import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import './Header.css';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null); // 'resume' | 'cover-letter' | 'portfolio' | 'templates' | 'languages' | null
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const headerRef = useRef(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

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

    const handleLogout = async () => {
        await logout();
        navigate('/');
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
                        <li>
                            <Link to="/resume/templates" onClick={handleLinkClick}>Resume builder</Link>
                        </li>
                        <li>
                            <Link to="/cover-letter/templates" onClick={handleLinkClick}>Cover letter builder</Link>
                        </li>
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

                        {/* Mobile-only auth buttons */}
                        <li style={{ width: '100%' }}>
                            {user ? (
                                <div style={{ width: '100%' }}>
                                    <div className="mobile-user-info">
                                        <span className="nav-user-avatar">
                                            {user.name ? user.name.charAt(0).toUpperCase() : <i className="fa-solid fa-user"></i>}
                                        </span>
                                        <span className="nav-user-name">{user.name || user.email}</span>
                                    </div>
                                    <div className="mobile-auth-buttons">
                                        <button
                                            className="btn btn-logout"
                                            onClick={() => { handleLinkClick(); handleLogout(); }}
                                        >
                                            <i className="fa-solid fa-right-from-bracket"></i>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="mobile-auth-buttons">
                                    <Link to="/login" className="btn btn-outline-auth" onClick={handleLinkClick}>
                                        Login
                                    </Link>
                                    <Link to="/register" className="btn btn-primary" onClick={handleLinkClick}>
                                        Register
                                    </Link>
                                </div>
                            )}
                        </li>
                    </ul>

                    <div className="nav-actions">
                        {user ? (
                            <>
                                <div className="nav-user-info">
                                    <span className="nav-user-avatar">
                                        {user.name ? user.name.charAt(0).toUpperCase() : <i className="fa-solid fa-user"></i>}
                                    </span>
                                    <span className="nav-user-name">{user.name || user.email}</span>
                                </div>
                                <button
                                    id="header-logout-btn"
                                    className="btn btn-logout"
                                    onClick={handleLogout}
                                >
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    id="header-login-btn"
                                    to="/login"
                                    className="btn btn-outline-auth"
                                    onClick={handleLinkClick}
                                >
                                    Login
                                </Link>
                                <Link
                                    id="header-register-btn"
                                    to="/register"
                                    className="btn btn-primary"
                                    onClick={handleLinkClick}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
