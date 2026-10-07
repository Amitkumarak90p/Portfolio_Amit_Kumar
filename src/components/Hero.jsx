import React, { useEffect, useState } from 'react';
import { Terminal, Send, FileText, ArrowUpRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { developerInfo } from '../data/portfolioData';

export const Hero = ({ onOpenResume, onTechClick }) => {
  const [animated, setAnimated] = useState(false);
  const [counts, setCounts] = useState({
    apps: 0,
    fps: 0,
    reduction: 0,
    cgpa: 0
  });

  useEffect(() => {
    let startTimestamp = null;
    const duration = 1200;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts({
        apps: Math.floor(easeOut * 2),
        fps: Math.floor(easeOut * 60),
        reduction: Math.floor(easeOut * 35),
        cgpa: (easeOut * 8.45).toFixed(2)
      });

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animId = window.requestAnimationFrame(step);
    setAnimated(true);

    return () => window.cancelAnimationFrame(animId);
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="stream-section hero-section" id="hero">
      <div className="section-tag-row">
        <span className="section-tag">
          <Terminal size={14} className="cyan-text" />
          <span>DEVELOPER DOSSIER // CORE SYSTEM SPECIFICATION</span>
        </span>
      </div>

      <div className="dev-meta-pill-row">
        <span className="dev-meta-pill">
          <span className="pulse-dot"></span> React Native Engineer
        </span>
        <span className="dev-meta-pill">
          <CheckCircle2 size={12} className="cyan-text" /> Full-Stack Capable
        </span>
        <span className="dev-meta-pill">
          <ShieldAlert size={12} style={{ color: '#f59e0b' }} /> Immediate Joiner
        </span>
      </div>

      <h1 className="hero-headline">
        Architecting <span className="cyan-highlight">60FPS</span> Cross-Platform Mobile Applications &amp; Resilient Backends.
      </h1>

      <p className="hero-summary">
        Hi, I'm <strong style={{ color: '#fff' }}>{developerInfo.name}</strong> — a Software Engineer specializing in production React Native architectures, robust Node.js/Express REST microservices, and normalized PostgreSQL database systems. Proven experience deploying AI-integrated multimodal educational platforms and event ecosystems.
      </p>

      {/* Terminal Card */}
      <div className="terminal-card">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="terminal-title">amit@developer-rig: ~/portfolio/specs</span>
          <span className="terminal-badge">STASIS_ACTIVE // v2.4</span>
        </div>
        <div className="terminal-body">
          <div className="term-line">
            <span className="term-prompt">➜</span>
            <span className="term-cmd">cat runtime_engine.json</span>
          </div>
          <div className="term-output">
            <div className="term-code-block">
              {`{
  "engineer": "Amit Kumar",
  "specialization": "React Native & Full-Stack",
  "core_stack": ["React Native", "TypeScript", "Redux Toolkit", "Node.js", "PostgreSQL"],
  "production_benchmarks": { "ui_framerate": "60FPS", "codebase_dry_reduction": "35%" }
}`}
            </div>
          </div>
        </div>
      </div>

      {/* Live Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-number">{counts.apps}+</div>
          <div className="metric-label">Production Apps</div>
          <div className="metric-sub-label">Shipped at Sensation Solutions</div>
        </div>

        <div className="metric-card">
          <div className="metric-number">{counts.fps} <span style={{ fontSize: '0.9rem', color: '#00f0ff' }}>FPS</span></div>
          <div className="metric-label">Frame Performance</div>
          <div className="metric-sub-label">FlashList Cell Virtualization</div>
        </div>

        <div className="metric-card">
          <div className="metric-number">{counts.reduction}%</div>
          <div className="metric-label">Modular DRY Reduction</div>
          <div className="metric-sub-label">Shared Composite Components</div>
        </div>

        <div className="metric-card">
          <div className="metric-number">{counts.cgpa} <span style={{ fontSize: '0.9rem', color: '#38bdf8' }}>/10</span></div>
          <div className="metric-label">B.Tech CSE (2022-26)</div>
          <div className="metric-sub-label">Bahra University Core CS</div>
        </div>
      </div>

      {/* Hero Action Buttons */}
      <div className="hero-btn-row">
        <button className="primary-btn" onClick={scrollToContact}>
          <Send size={15} />
          <span>Initiate Collaboration</span>
        </button>

        <button className="secondary-btn" onClick={onOpenResume}>
          <FileText size={15} />
          <span>Inspect Full Resume</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </section>
  );
};
