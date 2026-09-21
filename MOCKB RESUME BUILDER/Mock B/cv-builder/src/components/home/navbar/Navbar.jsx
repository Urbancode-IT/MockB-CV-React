import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';
import { getLocalProfile } from '../../../utils/userProfile';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileTick, setProfileTick] = useState(0);
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('nav-mobile-lock', mobileOpen);
    return () => document.body.classList.remove('nav-mobile-lock');
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const refresh = () => setProfileTick((n) => n + 1);
    window.addEventListener('mockb-profile-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('mockb-profile-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  useEffect(() => {
    setProfileTick((n) => n + 1);
  }, [location.pathname, user]);

  const profile = useMemo(() => getLocalProfile(user), [user, profileTick]);
  const avatarUrl = profile.avatar || user?.avatar || user?.photo || '';
  const displayName = profile.name || user?.name || user?.email || 'User';
  const initial = String(displayName).trim().charAt(0).toUpperCase() || 'U';

  const toggleMenu = (e, menuName) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const closeAll = () => {
    setActiveMenu(null);
    setMobileOpen(false);
  };

  const handleLogout = async () => {
    closeAll();
    await logout();
    navigate('/login');
  };

  return (
    <header
      ref={headerRef}
      id="header"
      className={`${isScrolled ? 'scrolled' : ''}${mobileOpen ? ' mobile-nav-open' : ''}`}
    >
      <div className="container">
        <nav>
          <Link to="/" className="logo" onClick={closeAll}>
            <i className="fa-solid fa-bee logo-icon"></i>
            <span>MockB CV</span>
          </Link>

          <button
            type="button"
            className={`nav-hamburger${mobileOpen ? ' is-open' : ''}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="primary-nav"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          <div
            className={`nav-scrim${mobileOpen ? ' is-visible' : ''}`}
            onClick={closeAll}
            aria-hidden="true"
          />

          <ul id="primary-nav" className={`nav-links${mobileOpen ? ' mobile-open' : ''}`}>
            <li><Link to="/" onClick={closeAll}>Home</Link></li>
            <li>
              <Link to="/resume/templates" onClick={closeAll}>Resume builder</Link>
            </li>
            <li>
              <Link to="/cover-letter/templates" onClick={closeAll}>Cover letter builder</Link>
            </li>
            <li>
              <Link to="/portfolio-maker" onClick={closeAll}>Portfolio maker</Link>
            </li>
            <li className={`has-mega-menu ${activeMenu === 'languages' ? 'active' : ''}`} id="lang-menu-parent">
              <a href="#!" id="languages-trigger" onClick={(e) => toggleMenu(e, 'languages')}>
                Languages <i className="fa-solid fa-chevron-down"></i>
              </a>
              <div className={`mega-menu ${activeMenu === 'languages' ? 'active' : ''}`} id="languages-mega-menu">
                <div className="container">
                  <div className="mega-menu-grid">
                    <a href="#!" onClick={(e) => { e.preventDefault(); closeAll(); if (window.changeLanguage) window.changeLanguage('en'); }} className="mega-menu-item">
                      <div className="item-icon"><i className="fa-solid fa-language"></i></div>
                      <div className="item-text"><h4>English</h4></div>
                    </a>
                    <a href="#!" onClick={(e) => { e.preventDefault(); closeAll(); if (window.changeLanguage) window.changeLanguage('fr'); }} className="mega-menu-item">
                      <div className="item-icon"><i className="fa-solid fa-language"></i></div>
                      <div className="item-text"><h4>French</h4></div>
                    </a>
                    <a href="#!" onClick={(e) => { e.preventDefault(); closeAll(); if (window.changeLanguage) window.changeLanguage('es'); }} className="mega-menu-item">
                      <div className="item-icon"><i className="fa-solid fa-language"></i></div>
                      <div className="item-text"><h4>Spanish</h4></div>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li><Link to="/about" onClick={closeAll}>About</Link></li>

            <li className="nav-mobile-auth">
              {user ? (
                <>
                  <Link to="/dashboard" className="btn btn-outline-auth" onClick={closeAll}>Dashboard</Link>
                  <button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-auth" onClick={closeAll}>Login</Link>
                  <Link to="/register" className="btn btn-primary" onClick={closeAll}>Sign up</Link>
                </>
              )}
            </li>
          </ul>

          <div className="nav-actions">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="nav-profile"
                  onClick={closeAll}
                  title={displayName}
                  aria-label={`${displayName} dashboard`}
                >
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="" className="nav-profile-avatar" />
                  ) : (
                    <span className="nav-profile-avatar nav-profile-avatar--fallback">{initial}</span>
                  )}
                </Link>
                <Link to="/dashboard" className="btn btn-outline-auth nav-actions-desktop" onClick={closeAll}>
                  Dashboard
                </Link>
                <button type="button" className="btn btn-primary nav-actions-desktop" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-auth nav-actions-desktop" onClick={closeAll}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary nav-actions-desktop" onClick={closeAll}>
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
