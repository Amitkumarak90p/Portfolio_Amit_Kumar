import React from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { developerInfo, experienceData, flagshipProjects, educationData } from '../data/portfolioData';

export const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="modal-backdrop open"
      id="resumeModalBackdrop"
      onClick={(e) => {
        if (e.target.id === 'resumeModalBackdrop') onClose();
      }}
    >
      <div className="modal-window resume-modal-window">
        <div className="modal-top">
          <div className="modal-heading">ENGINEERING DOSSIER // OFFICIAL RESUME</div>
          <div className="modal-top-actions">
            <button className="modal-btn-subtle" onClick={handlePrint} title="Print / Save as PDF">
              <Printer size={15} />
              <span>Print / PDF</span>
            </button>
            <button className="close-btn" onClick={onClose} title="Close Modal">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="resume-paper-body">
          {/* Resume Header */}
          <div className="resume-header">
            <h1 className="res-name">{developerInfo.name}</h1>
            <div className="res-subtitle">{developerInfo.role} // {developerInfo.specialization}</div>
            <div className="res-contact-row">
              <span><Mail size={12} /> {developerInfo.email}</span>
              <span><Phone size={12} /> {developerInfo.phone}</span>
              <span><MapPin size={12} /> {developerInfo.location}</span>
              <span><GithubIcon size={12} /> github.com/Amitkumar404</span>
              <span><LinkedinIcon size={12} /> linkedin.com/in/amit-kumar-39967b22a</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="res-section">
            <h2 className="res-sec-title">PROFESSIONAL SUMMARY</h2>
            <p className="res-text">{developerInfo.bio}</p>
          </div>

          {/* Technical Competencies */}
          <div className="res-section">
            <h2 className="res-sec-title">TECHNICAL SKILLS</h2>
            <div className="res-skills-table">
              <div className="res-skill-row">
                <strong>Languages:</strong> TypeScript, JavaScript (ES6+), SQL, HTML5, CSS3
              </div>
              <div className="res-skill-row">
                <strong>Mobile Development:</strong> React Native, Redux Toolkit, Shopify FlashList, AsyncStorage, REST API Integration
              </div>
              <div className="res-skill-row">
                <strong>Backend &amp; Databases:</strong> Node.js, Express.js, PostgreSQL, JWT Authentication, Connection Pooling
              </div>
              <div className="res-skill-row">
                <strong>Tools &amp; DevOps:</strong> Git, GitHub, Android SDK / ADB, Postman, Linux, Agile Workflow
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="res-section">
            <h2 className="res-sec-title">PROFESSIONAL EXPERIENCE</h2>
            {experienceData.map((exp) => (
              <div key={exp.id} className="res-exp-block">
                <div className="res-exp-head">
                  <div>
                    <strong className="res-exp-role">{exp.role}</strong> — <span className="res-exp-company">{exp.company}</span>
                  </div>
                  <span className="res-exp-date">{exp.period} | {exp.location}</span>
                </div>
                <div className="res-exp-proj-title">{exp.projectTitle}</div>
                <ul className="res-bullet-list">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Flagship Projects */}
          <div className="res-section">
            <h2 className="res-sec-title">FLAGSHIP PROJECTS</h2>
            {flagshipProjects.map((proj) => (
              <div key={proj.id} className="res-proj-block">
                <div className="res-proj-head">
                  <strong>{proj.title}</strong> — <span style={{ color: '#64748b' }}>{proj.tagline}</span>
                </div>
                <div className="res-proj-tech">Stack: {proj.skills.join(', ')}</div>
                <ul className="res-bullet-list">
                  {proj.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="res-section">
            <h2 className="res-sec-title">EDUCATION</h2>
            {educationData.map((edu, idx) => (
              <div key={idx} className="res-edu-block">
                <div className="res-exp-head">
                  <strong>{edu.institution}</strong>
                  <span className="res-exp-date">{edu.period}</span>
                </div>
                <div>{edu.degree} — <strong>{edu.grade}</strong></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
