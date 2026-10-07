import React, { useState } from 'react';
import { Send, Mail, MessageSquare, Phone, MapPin, CheckCircle2, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import confetti from 'canvas-confetti';
import { developerInfo } from '../data/portfolioData';

export const Contact = ({ onShowToast }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    topic: 'Recruitment / Full-Time Engineering Role',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    confetti({
      particleCount: 80,
      spread: 65,
      origin: { y: 0.8 },
      colors: ['#00f0ff', '#38bdf8', '#34d399', '#ffffff']
    });

    setIsSubmitted(true);
    if (onShowToast) {
      onShowToast('Message logged! Thank you for reaching out.', 'check-circle');
    }

    // Reset form after short delay
    setTimeout(() => {
      setFormState({
        name: '',
        email: '',
        topic: 'Recruitment / Full-Time Engineering Role',
        message: ''
      });
      setIsSubmitted(false);
    }, 4000);
  };

  const handleCopyText = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      if (onShowToast) {
        onShowToast(`Copied ${label} to clipboard!`, 'copy');
      }
    });
  };

  return (
    <section className="stream-section" id="contact">
      <div className="section-head-tag">
        <Send size={14} className="cyan-text" />
        <span>SECTION // 06 — DIRECT ENGINEERING CHANNELS</span>
      </div>

      <div className="section-header-block">
        <h2 className="section-title">Initiate Transmission &amp; Connect</h2>
        <p className="section-subtitle">
          Open to full-time Software Engineer &amp; React Native roles. Available for immediate deployment.
        </p>
      </div>

      <div className="contact-layout-grid">
        {/* Contact Info Cards */}
        <div className="contact-channels-column">
          {/* Email Card */}
          <div
            className="contact-card copyable-card"
            onClick={() => handleCopyText(developerInfo.email || 'amit.reactnative.dev@gmail.com', 'Email Address')}
            title="Click to Copy Email"
          >
            <div className="c-card-icon">
              <Mail size={20} className="cyan-text" />
            </div>
            <div className="c-card-content">
              <span className="c-card-lbl">PRIMARY EMAIL</span>
              <span className="c-card-val">{developerInfo.email || 'amit.reactnative.dev@gmail.com'}</span>
            </div>
            <span className="c-card-hint">
              <Copy size={13} />
            </span>
          </div>

          {/* WhatsApp Card */}
          <a
            href={developerInfo.whatsapp || 'https://wa.me/916230736027'}
            target="_blank"
            rel="noreferrer"
            className="contact-card link-card"
            title="Open WhatsApp Direct Chat"
          >
            <div className="c-card-icon">
              <MessageSquare size={20} style={{ color: '#34d399' }} />
            </div>
            <div className="c-card-content">
              <span className="c-card-lbl">WHATSAPP DIRECT</span>
              <span className="c-card-val">{developerInfo.phone || '+91 62307 36027'}</span>
            </div>
            <span className="c-card-hint">Open ↗</span>
          </a>

          {/* Phone Card */}
          <div
            className="contact-card copyable-card"
            onClick={() => handleCopyText(developerInfo.phone || '+91 62307 36027', 'Phone Number')}
            title="Click to Copy Phone Number"
          >
            <div className="c-card-icon">
              <Phone size={20} style={{ color: '#38bdf8' }} />
            </div>
            <div className="c-card-content">
              <span className="c-card-lbl">MOBILE CONTACT</span>
              <span className="c-card-val">{developerInfo.phone || '+91 62307 36027'}</span>
            </div>
            <span className="c-card-hint">
              <Copy size={13} />
            </span>
          </div>

          {/* Location Card */}
          <div className="contact-card">
            <div className="c-card-icon">
              <MapPin size={20} style={{ color: '#f59e0b' }} />
            </div>
            <div className="c-card-content">
              <span className="c-card-lbl">GEOGRAPHIC LOCATION</span>
              <span className="c-card-val">{developerInfo.location || 'Mohali, Punjab, India'}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="contact-social-strip">
            <a
              href={developerInfo.github || 'https://github.com/Amitkumarak90p'}
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              title="GitHub Profile"
            >
              <GithubIcon size={18} />
              <span>GitHub</span>
            </a>
            <a
              href={developerInfo.linkedin || 'https://www.linkedin.com/in/amit-kumar-39967b22a/'}
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={18} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Direct Contact Form */}
        <div className="contact-form-card">
          <div className="form-card-header">
            <h3 className="form-title">Direct Transmission Console</h3>
            <span className="form-sub">Send a direct inquiry or interview invite</span>
          </div>

          <form onSubmit={handleSubmit} className="dev-form" id="contactForm">
            <div className="form-row-2col">
              <div className="form-group">
                <label className="form-label" htmlFor="contactName">Your Name / Organization</label>
                <input
                  type="text"
                  id="contactName"
                  name="name"
                  className="form-input"
                  required
                  placeholder="e.g. Sarah Jenkins (Engineering Lead)"
                  value={formState.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contactEmail">Work Email</label>
                <input
                  type="email"
                  id="contactEmail"
                  name="email"
                  className="form-input"
                  required
                  placeholder="s.jenkins@company.io"
                  value={formState.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contactTopic">Inquiry Scope</label>
              <select
                id="contactTopic"
                name="topic"
                className="form-input"
                value={formState.topic}
                onChange={handleInputChange}
              >
                <option value="Recruitment / Full-Time Engineering Role">Recruitment / Full-Time Engineering Role</option>
                <option value="React Native Architecture Consulting">React Native Architecture Consulting</option>
                <option value="Technical Interview Scheduling">Technical Interview Scheduling</option>
                <option value="Full-Stack Collaboration">Full-Stack Collaboration</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contactMessage">Message Brief</label>
              <textarea
                id="contactMessage"
                name="message"
                className="form-input form-textarea"
                rows="4"
                required
                placeholder="Describe project requirements, tech stack scope, or role specifications..."
                value={formState.message}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <button type="submit" className="form-submit-btn">
              <Send size={15} />
              <span>Transmit Message</span>
            </button>

            {isSubmitted && (
              <div className="form-status success">
                <CheckCircle2 size={16} />
                <span>Message logged! Thank you for reaching out.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
