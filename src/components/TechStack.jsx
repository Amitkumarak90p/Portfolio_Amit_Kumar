import React, { useState } from 'react';
import { Cpu, X, Sparkles, Check, CheckCircle2 } from 'lucide-react';
import { techCategories, techStackRegistry } from '../data/portfolioData';

export const TechStack = ({ activeTech, onSelectTech, onCloseInspector }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Stacks' },
    { id: 'mobile', label: 'Mobile Architecture' },
    { id: 'languages', label: 'Core Languages' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'database', label: 'Database Systems' },
    { id: 'ai-cloud', label: 'AI & Pipelines' },
    { id: 'devops', label: 'DevOps & Workflows' }
  ];

  const filteredCategories = activeFilter === 'all'
    ? techCategories
    : techCategories.filter(cat => cat.category === activeFilter);

  const activeTechInfo = activeTech ? (
    techStackRegistry[activeTech] || {
      title: activeTech,
      category: 'Skill Node',
      level: 'Active Stack',
      desc: `Integrated skill unit used in Amit Kumar's production mobile and full-stack development workflow.`,
      projects: ['Production Mobile Applications']
    }
  ) : null;

  return (
    <section className="stream-section" id="skills">
      <div className="section-tag-row">
        <span className="section-tag">
          <Cpu size={14} className="cyan-text" />
          <span>SECTION // 03 — COMPREHENSIVE SKILL MATRIX</span>
        </span>
      </div>

      <div className="section-title-wrap">
        <h2 className="section-title">Technical Competency &amp; Stack Topology</h2>
        <p className="section-subtitle">
          Core capabilities honed across production deployments, high-concurrency event apps, and full-stack system architecture.
        </p>
      </div>

      {/* Active Stack Inspector Card */}
      {activeTechInfo && (
        <div className="active-stack-inspector active">
          <div className="inspector-header">
            <span className="inspector-badge">{activeTechInfo.level.toUpperCase()} // ACTIVE</span>
            <button
              className="inspector-close"
              onClick={onCloseInspector}
              title="Close Inspector"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          </div>
          <h4 className="inspector-title">{activeTechInfo.title}</h4>
          <p className="inspector-desc">{activeTechInfo.category} — {activeTechInfo.desc}</p>
          <div className="inspector-footer">
            <span className="inspector-lbl">APPLIED IN PRODUCTION / FLAGSHIPS:</span>
            <div className="inspector-project-tags">
              {activeTechInfo.projects.map((p, idx) => (
                <span
                  key={idx}
                  className="mini-pill"
                  style={{
                    borderColor: '#00f0ff',
                    color: '#fff',
                    background: 'rgba(0, 240, 255, 0.15)'
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Category Filter Tabs */}
      <div className="stack-filters">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            className={`filter-btn ${activeFilter === tab.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Category Cards Matrix */}
      <div className="stack-categories-grid">
        {filteredCategories.map((group) => (
          <div
            key={group.category}
            className="stack-group-card"
            data-category={group.category}
          >
            <div className="group-header">
              <Cpu size={18} className="group-icon" />
              <h3 className="group-title">{group.title}</h3>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1rem', lineHeight: '1.5' }}>
              {group.desc}
            </p>

            <div className="chips-flex">
              {group.skills.map((skill) => {
                const isSelected = activeTech && (
                  skill.name.toLowerCase() === activeTech.toLowerCase() ||
                  activeTech.toLowerCase().includes(skill.name.toLowerCase())
                );

                return (
                  <button
                    key={skill.name}
                    className={`stack-chip ${isSelected ? 'active-chip' : ''}`}
                    onClick={() => onSelectTech(skill.name)}
                    title={`Inspect ${skill.name}`}
                  >
                    <span className="chip-dot"></span>
                    <span className="chip-name">{skill.name}</span>
                    <span className="chip-tag">{skill.badge}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
