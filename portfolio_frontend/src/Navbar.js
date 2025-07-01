import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Responsive Navbar for the portfolio website.
 *
 * Props:
 * - theme (string): The current theme, 'light' or 'dark'.
 * - toggleTheme (function): Callback for toggling the theme.
 */
function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on navigation
  const handleNavClick = () => setOpen(false);

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo" onClick={handleNavClick}>MyPortfolio</Link>
        <button
          className={`navbar-burger${open ? ' is-active' : ''}`}
          aria-label="menu"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className={`navbar-menu${open ? ' is-active' : ''}`}>
        <Link to="/" className={`navbar-link${location.pathname === "/" ? " active" : ""}`} onClick={handleNavClick}>
          Home
        </Link>
        <Link to="/projects" className={`navbar-link${location.pathname === "/projects" ? " active" : ""}`} onClick={handleNavClick}>
          Projects
        </Link>
        <Link to="/resume" className={`navbar-link${location.pathname === "/resume" ? " active" : ""}`} onClick={handleNavClick}>
          Resume
        </Link>
        <Link to="/contact" className={`navbar-link${location.pathname === "/contact" ? " active" : ""}`} onClick={handleNavClick}>
          Contact
        </Link>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
      {/* Responsive mobile menu overlay */}
      {open && <div className="navbar-backdrop" onClick={() => setOpen(false)} />}
      <style>{`
        /* Navbar base styles */
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.8rem 2rem;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .navbar-logo {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-primary);
          text-decoration: none;
        }
        .navbar-burger {
          display: none;
          background: none;
          border: none;
          flex-direction: column;
          gap: 0.2rem;
          cursor: pointer;
          padding: 0.5rem;
        }
        .navbar-burger span {
          display: block;
          width: 1.8rem;
          height: 3px;
          background: var(--text-primary);
          border-radius: 2px;
          margin: 3px 0;
          transition: all 0.3s;
        }
        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .navbar-link {
          font-size: 1rem;
          text-decoration: none;
          color: var(--text-primary);
          position: relative;
          opacity: 0.85;
          transition: color 0.2s;
        }
        .navbar-link:hover, .navbar-link.active {
          color: var(--text-secondary);
          font-weight: 600;
        }
        .theme-toggle {
          background: var(--button-bg);
          color: var(--button-text);
          font-size: 1rem;
          font-weight: bold;
          border: none;
          border-radius: 6px;
          padding: 6px 16px;
          margin-left: 1rem;
          cursor: pointer;
          box-shadow: 0 2px 6px 0 rgba(0,0,0,0.07);
          transition: background 0.2s, color 0.2s;
        }

        /* Hamburger logic styles for mobile */
        @media (max-width: 768px) {
          .navbar {
            padding: 0.6rem 0.6rem;
          }
          .navbar-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg-secondary);
            flex-direction: column;
            gap: 0.5rem;
            padding: 1.5rem 1rem 2rem 1rem;
            display: none;
          }
          .navbar-menu.is-active {
            display: flex;
            animation: fade-in-menu 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .navbar-burger {
            display: flex;
            z-index: 150;
          }
          .theme-toggle {
            margin: 0.5rem 0 0 0 !important;
            width: 100%;
            text-align: left;
          }
        }
        @keyframes fade-in-menu {
          from { opacity: 0; transform: translateY(-12px);}
          to   { opacity: 1; transform: translateY(0);}
        }
        /* Hamburger animation */
        .navbar-burger.is-active span:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }
        .navbar-burger.is-active span:nth-child(2) {
          opacity: 0;
        }
        .navbar-burger.is-active span:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }
        .navbar-backdrop {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0,0,0,0.07);
          z-index: 70;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
