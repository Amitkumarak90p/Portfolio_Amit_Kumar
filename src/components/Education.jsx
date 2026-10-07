import React from 'react';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';
import { educationData } from '../data/portfolioData';

export const Education = () => {
  return (
    <section className="stream-section" id="education">
      <div className="section-tag-row">
        <span className="section-tag">
          <GraduationCap size={14} className="cyan-text" />
          <span>SECTION // 05 — ACADEMIC CREDENTIALS &amp; FOUNDATIONS</span>
        </span>
      </div>

      <div className="section-title-wrap">
        <h2 className="section-title">Education &amp; Core Computer Science</h2>
        <p className="section-subtitle">
          Rigorous computer science curriculum emphasizing algorithms, relational database theory, operating systems, and object-oriented software engineering.
        </p>
      </div>

      <div className="education-container">
        {educationData.map((edu, idx) => (
          <div key={idx} className="edu-entry">
            <div className="edu-badge">
              <GraduationCap size={20} className="cyan-text" />
            </div>

            <div className="edu-content">
              <div className="edu-heading-row">
                <h3 className="edu-title">{edu.degree}</h3>
                <span className="edu-grade">{edu.grade}</span>
              </div>

              <div className="edu-school">{edu.institution}</div>

              <div className="edu-period">
                <Calendar size={13} />
                <span>{edu.period}</span>
                <span className="sep">•</span>
                <MapPin size={13} />
                <span>{edu.location}</span>
              </div>

              <p className="edu-desc">{edu.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
