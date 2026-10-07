import React, { useState, useEffect } from 'react';
import './style.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { TechStack } from './components/TechStack';
import { CodeLab } from './components/CodeLab';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { StasisViewport } from './components/StasisViewport';
import { ResumeModal } from './components/ResumeModal';
import { ArchModal } from './components/ArchModal';
import { CommandPalette } from './components/CommandPalette';
import { Toast } from './components/Toast';

export function App() {
  const [activeTech, setActiveTech] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [archModalKey, setArchModalKey] = useState(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', icon: 'check-circle', isVisible: false });

  const showToast = (message, icon = 'check-circle') => {
    setToast({ message, icon, isVisible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 2800);
  };

  const handleTechSelect = (techName) => {
    setActiveTech(techName);
    showToast(`Active Stack: ${techName}`);
  };

  const handleCloseInspector = () => {
    setActiveTech(null);
  };

  const handleOpenArchModal = (projectKey) => {
    setArchModalKey(projectKey);
  };

  const handleCloseArchModal = () => {
    setArchModalKey(null);
  };

  const handleSelectSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard Shortcuts (⌘K, /, 1-7, ESC)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      } else if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsResumeOpen(false);
        setArchModalKey(null);
      } else if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        const keyMap = {
          '1': 'hero',
          '2': 'experience',
          '3': 'projects',
          '4': 'lab',
          '5': 'skills',
          '6': 'education',
          '7': 'contact'
        };
        if (keyMap[e.key]) {
          const sec = document.getElementById(keyMap[e.key]);
          if (sec) {
            sec.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="portfolio-app">
      {/* Blueprint Grid Background Layer */}
      <div className="bg-grid-layer" aria-hidden="true"></div>

      {/* Header Navigation */}
      <Header
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* 2-Column Split Interface */}
      <div className="split-layout-wrapper">
        {/* Left Scrollable Dossier Stream */}
        <main className="developer-stream" id="mainContent">
          <Hero
            onOpenResume={() => setIsResumeOpen(true)}
            onTechClick={handleTechSelect}
          />
          <Experience
            onTechClick={handleTechSelect}
            highlightedTech={activeTech}
          />
          <Projects
            onOpenArchModal={handleOpenArchModal}
            onTechClick={handleTechSelect}
            highlightedTech={activeTech}
          />
          <TechStack
            activeTech={activeTech}
            onSelectTech={handleTechSelect}
            onCloseInspector={handleCloseInspector}
          />
          <CodeLab onShowToast={showToast} />
          <Education />
          <Contact onShowToast={showToast} />
        </main>

        {/* Right Sticky 3D Stasis Chamber Stage */}
        <StasisViewport
          onSkillSelect={handleTechSelect}
          onShowToast={showToast}
        />
      </div>

      {/* Modals & Overlays */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <ArchModal
        projectKey={archModalKey}
        isOpen={!!archModalKey}
        onClose={handleCloseArchModal}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectSection={handleSelectSection}
      />

      {/* Global Toast Notification */}
      <Toast
        message={toast.message}
        icon={toast.icon}
        isVisible={toast.isVisible}
      />
    </div>
  );
}

export default App;
