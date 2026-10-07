import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';
import { codeSnippets } from '../data/portfolioData';

export const CodeLab = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState('storage');
  const [copiedTab, setCopiedTab] = useState(null);

  const tabs = [
    { id: 'storage', label: 'AsyncStorage vs SQLite Engine' },
    { id: 'redux', label: 'Redux Toolkit Slice Machine' },
    { id: 'jwt', label: 'PostgreSQL Pool & JWT Guard' }
  ];

  const currentSnippet = codeSnippets[activeTab];

  const handleCopy = (snippet) => {
    navigator.clipboard.writeText(snippet.code).then(() => {
      setCopiedTab(snippet.id);
      if (onShowToast) onShowToast('Code snippet copied to clipboard!', 'copy');
      setTimeout(() => setCopiedTab(null), 2500);
    });
  };

  return (
    <section className="stream-section" id="lab">
      <div className="section-tag-row">
        <span className="section-tag">
          <Terminal size={14} className="cyan-text" />
          <span>SECTION // 04 — ARCHITECTURE &amp; CODE WORKBENCH</span>
        </span>
      </div>

      <div className="section-title-wrap">
        <h2 className="section-title">Code Lab &amp; System Decisions</h2>
        <p className="section-subtitle">
          Interactive architectural snippets illustrating state machines, database pool queries, and runtime decision benchmarks.
        </p>
      </div>

      <div className="code-lab-container">
        {/* Lab Navigation Tabs */}
        <div className="lab-tabs-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`lab-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Terminal size={13} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Code Viewport Header */}
        <div className="terminal-header" style={{ borderTop: 'none' }}>
          <div className="terminal-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="terminal-title">{currentSnippet.title}</span>
          <button
            className="copy-snippet-btn"
            onClick={() => handleCopy(currentSnippet)}
            title="Copy Code to Clipboard"
          >
            {copiedTab === currentSnippet.id ? (
              <>
                <Check size={12} style={{ color: '#10b981' }} />
                <span style={{ color: '#10b981' }}>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Copy Snippet</span>
              </>
            )}
          </button>
        </div>

        {/* Code Display Pre */}
        <pre className="snippet-pre">
          <code>{currentSnippet.code}</code>
        </pre>
      </div>
    </section>
  );
};
