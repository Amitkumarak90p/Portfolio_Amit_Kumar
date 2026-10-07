import React from 'react';
import { Briefcase, Calendar, MapPin, Sparkles, Zap, Shield, CheckCircle } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export const Experience = ({ onTechClick, highlightedTech }) => {
  return (
    <section className="stream-section" id="experience">
      <div className="section-tag-row">
        <span className="section-tag">
          <Briefcase size={14} className="cyan-text" />
          <span>SECTION // 01 — COMMERCIAL PRODUCTION EXPERIENCE</span>
        </span>
      </div>

      <div className="section-title-wrap">
        <h2 className="section-title">Production Engineering Impact</h2>
        <p className="section-subtitle">
          Real-world cross-platform mobile architectures engineered and shipped in agile team environments at <strong>Sensation Solutions</strong>.
        </p>
      </div>

      <div className="experience-timeline">
        {experienceData.map((exp) => {
          const isMatched = highlightedTech && exp.skills.some(
            s => s.toLowerCase().includes(highlightedTech.toLowerCase()) || highlightedTech.toLowerCase().includes(s.toLowerCase())
          );

          return (
            <div key={exp.id} className="experience-box">
              <div className="exp-top-bar">
                <div>
                  <span className="exp-role-badge">{exp.status}</span>
                  <h3 className="exp-company">{exp.company}</h3>
                  <div className="exp-role-title">{exp.role}</div>
                </div>
                <div className="exp-details-line">
                  <span><Calendar size={13} /> {exp.period}</span>
                  <span className="sep">•</span>
                  <span><MapPin size={13} /> {exp.location}</span>
                </div>
              </div>

              <div className={`case-study-card ${isMatched ? 'matched-highlight' : ''}`}>
                <div className="case-study-header">
                  <div>
                    <div className="case-study-label">
                      <Sparkles size={12} />
                      <span>{exp.projectCategory}</span>
                    </div>
                    <h4 className="case-study-title">{exp.projectTitle}</h4>
                  </div>
                </div>

                <div className="case-study-problem-solution">
                  <span className="ps-label">PRODUCTION OVERVIEW:</span>
                  <span className="ps-text">{exp.desc}</span>
                </div>

                {/* Key Metrics Chips */}
                <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '1.25rem' }}>
                  {exp.metrics.map((m, idx) => (
                    <div key={idx} className="metric-card" style={{ padding: '0.75rem 0.85rem' }}>
                      <div className="metric-label" style={{ fontSize: '0.72rem' }}>{m.label}</div>
                      <div className="metric-sub" style={{ fontSize: '0.82rem', color: '#fff', fontWeight: 600 }}>{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Clean Bullets */}
                <ul className="clean-bullets" style={{ marginBottom: '1.25rem' }}>
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx}>
                      <CheckCircle size={15} className="bullet-check" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Skill Chips */}
                <div className="chips-flex">
                  {exp.skills.map((skill) => (
                    <button
                      key={skill}
                      className={`stack-chip ${highlightedTech && skill.toLowerCase().includes(highlightedTech.toLowerCase()) ? 'active-chip' : ''}`}
                      onClick={() => onTechClick(skill)}
                      title={`Filter by ${skill}`}
                    >
                      <span className="chip-dot"></span>
                      <span className="chip-name">{skill}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
