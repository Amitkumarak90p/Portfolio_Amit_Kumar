import React from 'react';
import { Search, FileText } from 'lucide-react';

export const Header = ({ onOpenResume, onOpenCommandPalette }) => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="dev-header">
      <div className="header-brand">
        <a href="#hero" className="brand-logo" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
          <span className="logo-accent"></span>
          <span className="logo-name">AMIT KUMAR<span className="logo-ext">.dev</span></span>
        </a>
        <div className="availability-badge" title="Immediate Joiner & Ready for Deployment">
          <span className="pulse-dot"></span>
          <span>AVAILABLE FOR HIRE</span>
        </div>
      </div>

      <nav className="dev-nav" aria-label="Main Navigation">
        <ul className="nav-menu">
          <li>
            <button className="nav-item" onClick={() => scrollToSection('experience')}>
              <span>Experience</span>
            </button>
          </li>
          <li>
            <button className="nav-item" onClick={() => scrollToSection('projects')}>
              <span>Projects</span>
            </button>
          </li>
          <li>
            <button className="nav-item" onClick={() => scrollToSection('skills')}>
              <span>Tech Stack</span>
            </button>
          </li>
          <li>
            <button className="nav-item" onClick={() => scrollToSection('contact')}>
              <span>Contact</span>
            </button>
          </li>
        </ul>
      </nav>

      <div className="header-actions">
        <button
          className="search-trigger-btn"
          onClick={onOpenCommandPalette}
          title="Open Command Palette (⌘K or /)"
        >
          <Search size={14} />
          <span className="search-text">Search...</span>
          <kbd className="kbd-badge">⌘K</kbd>
        </button>

        <button
          className="primary-btn"
          onClick={onOpenResume}
          title="View Engineering Resume Dossier"
        >
          <FileText size={15} />
          <span>Resume PDF</span>
        </button>
      </div>
    </header>
  );
};
