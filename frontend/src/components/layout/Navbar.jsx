import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  HiOutlineMenuAlt3, HiOutlineX, HiOutlineMoon, HiOutlineSun,
  HiOutlineUser, HiOutlineLogout, HiOutlineCog
} from 'react-icons/hi';
import { FiZap } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const { user, userProfile, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/templates', label: 'Templates' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await logout();
    navigate('/');
  };

  const initials = (user?.displayName || user?.email || 'U')
    .split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <FiZap size={18} />
          </div>
          <span className="logo-text">FormGen</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="navbar-links">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${isActive(link.to) ? 'nav-link-active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-icon"
            aria-label="Toggle theme"
            data-tooltip={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
          </button>

          {user ? (
            <>
              <Link to="/create" className="btn btn-primary btn-sm">
                <FiZap size={14} />
                Create
              </Link>

              {/* User Menu */}
              <div className="user-menu-wrapper">
                <button
                  className="user-avatar-btn"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" className="avatar avatar-sm" />
                  ) : (
                    <div className="avatar avatar-sm">{initials}</div>
                  )}
                </button>

                {userMenuOpen && (
                  <div className="user-dropdown">
                    <div className="user-dropdown-header">
                      <p className="user-name">{user.displayName || 'User'}</p>
                      <p className="user-email">{user.email || user.phoneNumber}</p>
                    </div>
                    <div className="dropdown-divider" />
                    <Link to="/dashboard" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      <HiOutlineUser size={16} /> Dashboard
                    </Link>
                    <Link to="/profile" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      <HiOutlineCog size={16} /> Settings
                    </Link>
                    <div className="dropdown-divider" />
                    <button className="dropdown-item dropdown-item-danger" onClick={handleLogout}>
                      <HiOutlineLogout size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
              <Link to="/login" className="btn btn-primary btn-sm">Get Started</Link>
            </>
          )}

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`mobile-nav-link ${isActive(link.to) ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/dashboard" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              <Link to="/create" className="btn btn-primary w-full" onClick={() => setMobileOpen(false)}>
                <FiZap size={16} /> Create Document
              </Link>
              <button className="btn btn-ghost w-full" onClick={handleLogout}>
                <HiOutlineLogout size={16} /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary w-full" onClick={() => setMobileOpen(false)}>Sign In</Link>
              <Link to="/login" className="btn btn-primary w-full" onClick={() => setMobileOpen(false)}>Get Started</Link>
            </>
          )}
        </div>
      )}

      {/* Overlay */}
      {(mobileOpen || userMenuOpen) && (
        <div
          className="nav-overlay"
          onClick={() => { setMobileOpen(false); setUserMenuOpen(false); }}
        />
      )}
    </nav>
  );
};

export default Navbar;
