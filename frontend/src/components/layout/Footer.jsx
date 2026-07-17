import { Link } from 'react-router-dom';
import { FiZap, FiGithub, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/templates', label: 'Templates' },
    { to: '/login', label: 'Get Started' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  const features = [
    { to: '/create/biodata', label: 'Marriage Biodata' },
    { to: '/create/resume', label: 'Resume Builder' },
    { to: '/templates', label: 'Premium Templates' },
    { to: '/dashboard', label: 'My Documents' },
  ];

  const socials = [
    { href: '#', icon: FiTwitter, label: 'Twitter' },
    { href: 'https://www.linkedin.com/in/harihar-r-1401hh', icon: FiLinkedin, label: 'LinkedIn' },
    { href: '#', icon: FiInstagram, label: 'Instagram' },
    { href: 'https://github.com/HARIHAR1406', icon: FiGithub, label: 'GitHub' },
  ];

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">
                <FiZap size={18} />
              </div>
              <span className="logo-text">FormGen</span>
            </div>
            <p className="footer-desc">
              Create stunning professional documents — Marriage Biodatas and Resumes — with our intuitive builder and beautiful templates.
            </p>
            <div className="footer-socials">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div className="footer-col">
            <h4 className="footer-col-title">Features</h4>
            <ul className="footer-links">
              {features.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact</h4>
            <ul className="footer-contact-list">
              <li>
                <HiOutlineMail size={16} />
                <a href="mailto:harihar.r1406@gmail.com" className="footer-link">harihar.r1406@gmail.com</a>
              </li>
              <li>
                <HiOutlinePhone size={16} />
                <a href="tel:+918122514777" className="footer-link">+91 81225 14777</a>
              </li>
              <li>
                <HiOutlineLocationMarker size={16} />
                <span>Tamil Nadu, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} FormGen. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
