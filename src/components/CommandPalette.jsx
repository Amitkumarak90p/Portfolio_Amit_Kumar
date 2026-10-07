import React, { useState, useEffect, useRef } from 'react';
import { Search, X, CornerDownLeft, Sparkles } from 'lucide-react';
import { searchableItems } from '../data/portfolioData';

export const CommandPalette = ({ isOpen, onClose, onSelectSection }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const filteredItems = searchableItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.tag.toLowerCase().includes(query.toLowerCase()) ||
    item.match.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        onSelectSection(filteredItems[selectedIndex].section);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="cmd-palette-backdrop open"
      id="commandPaletteModal"
      onClick={(e) => {
        if (e.target.id === 'commandPaletteModal') onClose();
      }}
    >
      <div className="cmd-palette-window" onKeyDown={handleKeyDown}>
        <div className="cmd-search-row">
          <Search size={18} className="cmd-search-icon cyan-text" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            id="commandSearchInput"
            placeholder="Search projects, skills, architectural docs, experience..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="cmd-close-btn" onClick={onClose} title="Close (ESC)">
            <X size={16} />
          </button>
        </div>

        <div className="cmd-results-list" id="commandResultsList">
          {filteredItems.length === 0 ? (
            <div style={{ padding: '1rem', textAlign: 'center', color: '#64748b', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
              No matching developer items found for "{query}"
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div
                key={idx}
                className={`cmd-result-item ${selectedIndex === idx ? 'selected' : ''}`}
                onClick={() => {
                  onSelectSection(item.section);
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className="cmd-item-left">
                  <span className="cmd-item-title">{item.title}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="cmd-item-tag">{item.tag}</span>
                  {selectedIndex === idx && <CornerDownLeft size={13} className="cyan-text" />}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cmd-footer-hints">
          <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
          <span><kbd>↵</kbd> to jump</span>
          <span><kbd>ESC</kbd> to dismiss</span>
        </div>
      </div>
    </div>
  );
};
