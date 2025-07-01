import React from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Minimal, modern footer for the portfolio site.
 */
function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <span>
          &copy; {new Date().getFullYear()} MyPortfolio &mdash; Built with <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">React</a>
        </span>
        <div className="footer-links">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg height="22" viewBox="0 0 24 24" fill="var(--text-primary)"><path d="M12 0.5C5.5 0.5 0 6 0 12.4c0 5.2 3.4 9.6 8.2 10.8.6.1.8-.2.8-.6v-2c-3.3.7-4-1.5-4-1.5-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6-.9 1.6-.9.8-1.2 2.1-.9 2.6-.7.1-.6.3-1 .5-1.2-2.7-.3-5.5-1.4-5.5-6.1 0-1.3.5-2.3 1.2-3.2-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.2 1.2a10.2 10.2 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.7 1.6.3 2.9.1 3.2.8.8 1.2 1.8 1.2 3.2 0 4.7-2.8 5.8-5.5 6.1.3.2.6.9.6 1.8v2.8c0 .4.2.7.8.6C20.6 22 24 17.6 24 12.4 24 6 18.5 0.5 12 0.5" /></svg>
          </a>
          <a href="mailto:youremail@mail.com" aria-label="Email" style={{marginLeft:'10px'}}>
            <svg height="22" viewBox="0 0 24 24" fill="var(--text-primary)"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </a>
        </div>
      </div>
      <style>{`
        .footer {
          background: var(--bg-secondary);
          color: var(--text-primary);
          border-top: 1px solid var(--border-color);
          padding: 1.2rem 0 1rem 0;
          font-size: 0.98rem;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin-top: auto;
        }
        .footer-inner {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 95%;
          max-width: 800px;
        }
        .footer-links a {
          color: var(--text-primary);
          margin-left: 2px;
          margin-right: 2px;
          transition: opacity 0.14s;
          opacity: 0.85;
        }
        .footer-links a:hover {
          opacity: 1;
        }
        @media (max-width: 768px) {
          .footer-inner {
            flex-direction: column;
            gap: 0.5rem;
            width: 98%;
            font-size: 0.93rem;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
