import React from 'react';
import { Layers, ExternalLink, Cpu, CheckCircle } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { flagshipProjects } from '../data/portfolioData';

export const Projects = ({ onOpenArchModal, onTechClick, highlightedTech }) => {
  return (
    <section className="stream-section" id="projects">
      <div className="section-tag-row">
        <span className="section-tag">
          <Layers size={14} className="cyan-text" />
          <span>SECTION // 02 — FLAGSHIP ARCHITECTURAL CASE STUDIES</span>
        </span>
      </div>

      <div className="section-title-wrap">
        <h2 className="section-title">Flagship Architectures &amp; Case Studies</h2>
        <p className="section-subtitle">
          Full-stack mobile systems engineered from scratch with performance benchmarks, offline persistence, and normalized database schemas.
        </p>
      </div>

      <div className="projects-list">
        {flagshipProjects.map((proj, idx) => {
          const isMatched = highlightedTech && proj.skills.some(
            s => s.toLowerCase().includes(highlightedTech.toLowerCase()) || highlightedTech.toLowerCase().includes(s.toLowerCase())
          );

          return (
            <div
              key={proj.id}
              className={`project-item-card ${isMatched ? 'matched-highlight' : ''}`}
            >
              <div className="project-card-top">
                <div>
                  <div className="project-meta-line">
                    <span className="project-index">0{idx + 1} //</span>
                    <span className="project-type">{proj.type}</span>
                  </div>
                  <h3 className="project-name">{proj.title}</h3>
                  <div className="project-sub">{proj.tagline}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <button
                    className="outline-btn"
                    onClick={() => onOpenArchModal(proj.archKey)}
                    title="Deep-dive into system architecture decision matrix"
                  >
                    <Cpu size={14} />
                    <span>Architecture Deep-Dive</span>
                  </button>
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="icon-social-btn"
                    title="View Source on GitHub"
                  >
                    <GithubIcon size={16} />
                  </a>
                </div>
              </div>

              <p className="project-body">{proj.desc}</p>

              {/* Engineering Decision Box */}
              <div className="eng-decision-box">
                <div className="eng-decision-title">
                  <Cpu size={13} />
                  <span>CORE ARCHITECTURAL DECISION:</span>
                </div>
                <div className="eng-decision-text">
                  {proj.highlights[0]}
                </div>
              </div>

              {/* Key Points */}
              <div className="project-key-points">
                {proj.highlights.slice(1).map((h, hIdx) => (
                  <div key={hIdx} className="key-point">
                    <CheckCircle size={14} className="point-icon" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="project-tech-row">
                {proj.skills.map((skill) => (
                  <button
                    key={skill}
                    className={`tech-pill ${highlightedTech && skill.toLowerCase().includes(highlightedTech.toLowerCase()) ? 'active-chip' : ''}`}
                    onClick={() => onTechClick(skill)}
                    title={`Filter by ${skill}`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
