import { createIcons, icons } from 'lucide';
import confetti from 'canvas-confetti';
import { StasisChamberScene } from './scene/stasisChamber.js';
import { projectArchitectures } from './components/archModal.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  createIcons({ icons });

  // Tech stack registry
  const techStackRegistry = {
    'React Native': {
      title: 'React Native',
      category: 'Mobile Framework',
      level: 'Core Specialization',
      desc: 'Architecting high-performance cross-platform mobile apps with 60FPS UIs, optimized rendering cycles, and custom native bridges.',
      projects: ['BroSis (AI Platform)', 'Tracevenue (Event App)', 'NeuroSync AI', 'Phytier (Fitness)']
    },
    'TypeScript': {
      title: 'TypeScript',
      category: 'Language',
      level: 'Advanced',
      desc: 'Building type-safe scalable architectures with strict schemas, reusable generic contracts, and robust reducer slice typing.',
      projects: ['Phytier (Backend & Mobile)', 'BroSis (Component Library)']
    },
    'JavaScript': {
      title: 'JavaScript (ES6+)',
      category: 'Language',
      level: 'Advanced',
      desc: 'Deep mastery of asynchronous programming, closures, promises, event loop mechanics, and performance optimization.',
      projects: ['BroSis', 'Tracevenue', 'NeuroSync AI', 'Phytier']
    },
    'Redux Toolkit': {
      title: 'Redux Toolkit',
      category: 'State Management',
      level: 'Advanced State',
      desc: 'Centralized state management with structured slices, memoized selectors (createSelector), and eliminating cross-screen prop-drilling.',
      projects: ['BroSis', 'NeuroSync AI']
    },
    'Node.js': {
      title: 'Node.js / Express.js',
      category: 'Backend',
      level: 'Proficient',
      desc: 'Building scalable RESTful API microservices, JWT authentication middleware, and robust error boundary controllers.',
      projects: ['Phytier (REST Backend)']
    },
    'Express.js': {
      title: 'Express.js',
      category: 'Backend',
      level: 'Proficient',
      desc: 'REST API routing, JWT token guards, CORS policies, and request lifecycle validation middleware.',
      projects: ['Phytier']
    },
    'PostgreSQL': {
      title: 'PostgreSQL',
      category: 'Database',
      level: 'Schema Modeling',
      desc: 'Designing 3NF normalized relational schemas for user habits, workout logging, and progress tracking with indexed high-performance queries.',
      projects: ['Phytier (Database Layer)']
    },
    'SQL': {
      title: 'SQL / Relational DBs',
      category: 'Database',
      level: 'Proficient',
      desc: 'Query optimization, transactions, foreign key constraints, and relational schema migrations.',
      projects: ['Phytier', 'Bahra University Academic Systems']
    },
    'AI & OCR Pipeline': {
      title: 'AI & OCR Pipeline',
      category: 'AI Pipeline',
      level: 'Multimodal Systems',
      desc: 'End-to-end document OCR text extraction to dynamic interactive quiz rendering in React Native, plus STT/TTS voice engines.',
      projects: ['BroSis (AI-Powered Platform)']
    },
    'FlashList': {
      title: 'FlashList / FlatList Opt',
      category: 'Performance',
      level: '60 FPS Target',
      desc: 'Eliminating UI frame drops and scroll jank on low-end Android hardware via Shopify FlashList virtualization & recycling.',
      projects: ['Tracevenue']
    },
    'JWT Authentication': {
      title: 'JWT Authentication',
      category: 'Security',
      level: 'Auth Shield',
      desc: 'Secure token storage, silent background session refresh rotations, and protected route access without exposing credentials.',
      projects: ['Tracevenue', 'Phytier']
    },
    'AsyncStorage': {
      title: 'AsyncStorage',
      category: 'Offline Storage',
      level: 'Local First',
      desc: 'Resilient client storage engine chosen over SQLite for zero-network persistence, key-value journaling, and instant load times.',
      projects: ['NeuroSync AI']
    },
    'Offline-First': {
      title: 'Offline-First Architecture',
      category: 'Architecture',
      level: 'Zero Dependency',
      desc: 'Local-first data persistence, offline task timers, and local push notifications with zero network dependency.',
      projects: ['NeuroSync AI']
    },
    'Git': {
      title: 'Git & GitHub',
      category: 'DevOps & Tooling',
      level: 'Agile Workflow',
      desc: 'Feature branching workflows, peer pull request reviews, and agile merge conflict resolution.',
      projects: ['Sensation Solutions Team Workflows']
    }
  };

  // Global Toast Helper
  const showToast = (message, iconName = 'check-circle') => {
    const toast = document.getElementById('hudToast');
    const toastMsg = document.getElementById('toastMsg');
    const toastIcon = document.getElementById('toastIcon');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    if (toastIcon) {
      toastIcon.setAttribute('data-lucide', iconName);
      createIcons({ icons });
    }

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  // Function to activate tech stack across the entire page
  const activateTechStack = (techName) => {
    let matchedKey = Object.keys(techStackRegistry).find(
      key => key.toLowerCase() === techName.toLowerCase() ||
             techName.toLowerCase().includes(key.toLowerCase()) ||
             key.toLowerCase().includes(techName.toLowerCase())
    );

    const techInfo = matchedKey ? techStackRegistry[matchedKey] : {
      title: techName,
      category: 'Skill Node',
      level: 'Active Stack',
      desc: `Integrated skill unit used in Amit Kumar's production mobile and full-stack development workflow.`,
      projects: ['Production Mobile Applications']
    };

    // Update Live Inspector HUD
    const inspector = document.getElementById('activeTechInspector');
    const titleEl = document.getElementById('activeTechTitle');
    const descEl = document.getElementById('activeTechDesc');
    const badgeEl = document.getElementById('activeTechBadge');
    const projectsListEl = document.getElementById('activeTechProjectsList');

    if (inspector && titleEl && descEl && projectsListEl) {
      titleEl.textContent = techInfo.title;
      descEl.textContent = `${techInfo.category} — ${techInfo.desc}`;
      if (badgeEl) badgeEl.textContent = `${techInfo.level.toUpperCase()} // ACTIVE`;

      projectsListEl.innerHTML = techInfo.projects.map(p => 
        `<span class="mini-pill" style="border-color: #00f0ff; color: #fff; background: rgba(0, 240, 255, 0.15);">${p}</span>`
      ).join(' ');

      inspector.classList.add('active');
    }

    // Highlight all skill chips
    document.querySelectorAll('.stack-chip, .tech-pill').forEach(chip => {
      const s = chip.getAttribute('data-skill') || '';
      if (s.toLowerCase() === techName.toLowerCase() || techName.toLowerCase().includes(s.toLowerCase())) {
        chip.classList.add('active-chip');
      } else {
        chip.classList.remove('active-chip');
      }
    });

    // Highlight matching project & case study cards
    let matchedCount = 0;
    document.querySelectorAll('.case-study-card, .project-item-card').forEach(card => {
      const skillsAttr = (card.getAttribute('data-skills') || '').toLowerCase();
      if (skillsAttr.includes(techName.toLowerCase()) || (matchedKey && skillsAttr.includes(matchedKey.toLowerCase()))) {
        card.classList.add('matched-highlight');
        matchedCount++;
      } else {
        card.classList.remove('matched-highlight');
      }
    });

    if (stasisScene) {
      stasisScene.selectSkillByName(techName);
    }

    showToast(`Active Stack: ${techInfo.title} (${matchedCount} projects highlighted)`);
  };

  // Close tech stack inspector
  const closeInspectorBtn = document.getElementById('closeTechInspectorBtn');
  if (closeInspectorBtn) {
    closeInspectorBtn.addEventListener('click', () => {
      const inspector = document.getElementById('activeTechInspector');
      if (inspector) inspector.classList.remove('active');
      document.querySelectorAll('.active-chip, .matched-highlight').forEach(el => {
        el.classList.remove('active-chip', 'matched-highlight');
      });
    });
  }

  // 2. Initialize 3D Stasis Chamber Scene
  let stasisScene = null;
  const canvasEl = document.getElementById('stasisCanvas');
  const canvasLoading = document.getElementById('canvasLoading');

  if (canvasEl) {
    try {
      stasisScene = new StasisChamberScene('stasisCanvas', (skillData) => {
        if (skillData && skillData.name) {
          activateTechStack(skillData.name);
          const projectsSection = document.getElementById('projects');
          if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });

      if (canvasLoading) {
        canvasLoading.classList.add('hidden');
        canvasLoading.style.display = 'none';
      }
    } catch (e) {
      console.warn('Three.js stasis chamber init error:', e);
      if (canvasLoading) {
        canvasLoading.classList.add('hidden');
        canvasLoading.style.display = 'none';
      }
    }
  }

  // 3. Stasis HUD Controls
  const overchargeBtn = document.getElementById('stasisOverchargeBtn');
  const scanBtn = document.getElementById('stasisScanBtn');
  const resetCamBtn = document.getElementById('stasisResetCamBtn');

  if (overchargeBtn) {
    overchargeBtn.addEventListener('click', () => {
      if (stasisScene) {
        const isOver = stasisScene.triggerOvercharge();
        showToast(isOver ? 'Energy Surge Active' : 'Stasis Core Nominal', 'zap');
      }
    });
  }

  if (scanBtn) {
    scanBtn.addEventListener('click', () => {
      if (stasisScene) {
        const isScan = stasisScene.toggleScanMode();
        showToast(isScan ? 'Wireframe X-Ray Enabled' : 'Standard Shading Active', 'scan');
      }
    });
  }

  if (resetCamBtn) {
    resetCamBtn.addEventListener('click', () => {
      if (stasisScene) {
        stasisScene.resetCamera();
        showToast('Camera Perspective Reset', 'crosshair');
      }
    });
  }

  // 4. Tech Stack Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const groupCards = document.querySelectorAll('.stack-group-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      groupCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Stack Chip & Tech Pill Click Listeners
  document.querySelectorAll('.stack-chip, .tech-pill').forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      const skillName = chip.getAttribute('data-skill') || chip.querySelector('.chip-name')?.textContent || '';
      if (skillName) {
        activateTechStack(skillName);
      }
    });
  });

  // 6. Architecture & Code Lab Tab Switching
  const labTabBtns = document.querySelectorAll('.lab-tab-btn');
  const labPanels = document.querySelectorAll('.lab-panel');

  labTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      labTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');
      labPanels.forEach(panel => {
        if (panel.id === targetTab) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // 7. Copy Code Snippet Buttons
  document.querySelectorAll('.copy-snippet-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy-target');
      const codeEl = document.getElementById(targetId);
      if (codeEl) {
        navigator.clipboard.writeText(codeEl.textContent || '').then(() => {
          showToast('Code snippet copied to clipboard!', 'copy');
        });
      }
    });
  });

  // 8. Copyable Actions (Email, Phone)
  document.querySelectorAll('.copyable-card, .copyable-action-btn').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = el.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied ${textToCopy} to clipboard!`, 'copy');
        });
      }
    });
  });

  // 9. Metric Counters Animation
  const counters = document.querySelectorAll('.counter');
  let animatedCounters = false;

  const runCounters = () => {
    if (animatedCounters) return;
    animatedCounters = true;

    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target') || '0');
      const decimal = parseInt(counter.getAttribute('data-decimal') || '0', 10);
      const duration = 1200;
      const startTime = performance.now();

      const updateCounter = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = target * easeOut;

        counter.textContent = decimal > 0 ? currentVal.toFixed(decimal) : Math.floor(currentVal).toString();

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = decimal > 0 ? target.toFixed(decimal) : target.toString();
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  // Run counters on view
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        runCounters();
      }
    }, { threshold: 0.2 });
    observer.observe(heroSection);
  }

  // 10. Command Palette (⌘K)
  const cmdModal = document.getElementById('commandPaletteModal');
  const openCmdBtn = document.getElementById('openCommandPaletteBtn');
  const closeCmdBtn = document.getElementById('closeCmdPaletteBtn');
  const cmdInput = document.getElementById('commandSearchInput');
  const cmdResults = document.getElementById('commandResultsList');

  const searchableItems = [
    { title: 'BroSis — AI-Powered Learning Platform', tag: 'Production App', section: 'experience', match: 'brosis ocr quiz stt tts sensation' },
    { title: 'Tracevenue — Real-Time Event Planning', tag: 'Production App', section: 'experience', match: 'tracevenue flashlist 60fps jwt sensation' },
    { title: 'NeuroSync AI — Offline-First Journaling', tag: 'Project', section: 'projects', match: 'neurosync asyncstorage offline pomodoro' },
    { title: 'Phytier — Full-Stack Fitness Tracker', tag: 'Project', section: 'projects', match: 'phytier node postgresql express habit' },
    { title: 'React Native 60FPS Architecture', tag: 'Core Stack', section: 'skills', match: 'react native flashlist mobile' },
    { title: 'TypeScript & JavaScript ES6+', tag: 'Language', section: 'skills', match: 'typescript js type contracts' },
    { title: 'PostgreSQL & SQL Schema Design', tag: 'Database', section: 'skills', match: 'postgres database 3nf schema queries' },
    { title: 'Architecture & Code Lab', tag: 'Workbench', section: 'lab', match: 'lab pipeline benchmark code' },
    { title: 'Bahra University (B.Tech CSE)', tag: 'Education', section: 'education', match: 'bahra degree cgpa university' },
    { title: 'Contact Amit Kumar', tag: 'Channel', section: 'contact', match: 'email phone whatsapp contact hire' }
  ];

  const renderCmdResults = (query = '') => {
    const filtered = searchableItems.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.tag.toLowerCase().includes(query.toLowerCase()) ||
      item.match.toLowerCase().includes(query.toLowerCase())
    );

    if (cmdResults) {
      if (filtered.length === 0) {
        cmdResults.innerHTML = `<div style="padding: 1rem; text-align: center; color: #64748b; font-family: var(--font-mono); font-size: 0.8rem;">No matching developer items found for "${query}"</div>`;
        return;
      }

      cmdResults.innerHTML = filtered.map((item, idx) => `
        <div class="cmd-result-item ${idx === 0 ? 'selected' : ''}" data-section="${item.section}">
          <div class="cmd-item-left">
            <span class="cmd-item-title">${item.title}</span>
          </div>
          <span class="cmd-item-tag">${item.tag}</span>
        </div>
      `).join('');

      cmdResults.querySelectorAll('.cmd-result-item').forEach(el => {
        el.addEventListener('click', () => {
          const sec = el.getAttribute('data-section');
          if (cmdModal) cmdModal.classList.remove('open');
          const targetEl = document.getElementById(sec);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    }
  };

  const openCommandPalette = () => {
    if (cmdModal) {
      cmdModal.classList.add('open');
      if (cmdInput) {
        cmdInput.value = '';
        cmdInput.focus();
      }
      renderCmdResults('');
    }
  };

  const closeCommandPalette = () => {
    if (cmdModal) {
      cmdModal.classList.remove('open');
    }
  };

  if (openCmdBtn) openCmdBtn.addEventListener('click', openCommandPalette);
  if (closeCmdBtn) closeCmdBtn.addEventListener('click', closeCommandPalette);
  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => renderCmdResults(e.target.value));
  }

  // 11. Keyboard Navigation Shortcuts (⌘K, 1-7, ESC)
  window.addEventListener('keydown', (e) => {
    // ⌘K or Ctrl+K or /
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openCommandPalette();
    } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      openCommandPalette();
    } else if (e.key === 'Escape') {
      closeCommandPalette();
      closeResumeModal();
      closeArchModal();
    } else if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      // 1 to 7 Jump shortcuts
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
  });

  // 12. Resume Dossier Modal
  const resumeModal = document.getElementById('resumeModalBackdrop');
  const viewResumeBtn = document.getElementById('viewResumeBtn');
  const closeResumeBtn = document.getElementById('closeResumeModalBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');

  const openResumeModal = () => {
    if (resumeModal) {
      resumeModal.classList.add('open');
    }
  };

  const closeResumeModal = () => {
    if (resumeModal) {
      resumeModal.classList.remove('open');
    }
  };

  if (viewResumeBtn) viewResumeBtn.addEventListener('click', openResumeModal);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResumeModal);
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 13. Architecture Modal Trigger
  const archModal = document.getElementById('archModalBackdrop');
  const archTitle = document.getElementById('archModalTitle');
  const archBody = document.getElementById('archModalBody');
  const closeArchBtn = document.getElementById('closeArchModalBtn');

  const openArchModal = (projKey) => {
    const data = projectArchitectures[projKey];
    if (data && archModal && archTitle && archBody) {
      archTitle.textContent = data.title;
      archBody.innerHTML = data.content;
      archModal.classList.add('open');
    }
  };

  const closeArchModal = () => {
    if (archModal) archModal.classList.remove('open');
  };

  document.querySelectorAll('.proj-inspect-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const proj = btn.getAttribute('data-project');
      if (proj) openArchModal(proj);
    });
  });

  if (closeArchBtn) closeArchBtn.addEventListener('click', closeArchModal);

  // Close modals on backdrop click
  [resumeModal, archModal, cmdModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
        }
      });
    }
  });

  // 14. Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatusMsg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#00f0ff', '#38bdf8', '#34d399', '#ffffff']
      });

      if (formStatus) {
        formStatus.textContent = '✓ Message logged! Thank you for reaching out.';
        formStatus.className = 'form-status success';
      }

      showToast('Message sent! Looking forward to connecting.', 'check-circle');
      contactForm.reset();
    });
  }

  // 15. Scroll Spy Navigation
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.stream-section');

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          if (item.getAttribute('data-nav') === id) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });

        // Update 3D Stage HUD readout
        const stageVal = document.getElementById('stasisStageVal');
        if (stageVal) {
          stageVal.textContent = `${section.querySelector('.section-title, .hero-headline')?.textContent?.slice(0, 18) || id} View`;
        }
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
});
