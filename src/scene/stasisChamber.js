/**
 * STYLIZED 3D ANIMATED DEVELOPER STASIS CHAMBER ENGINE
 * High-Performance 60FPS procedural animated 3D human character model,
 * sci-fi blue glass stasis chamber, and stationary floating holographic tech skill nodes.
 */

export class StasisChamberScene {
  constructor(canvasId, onSkillSelectCallback) {
    this.canvas = document.getElementById(canvasId);
    this.container = this.canvas ? this.canvas.parentElement : null;
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.onSkillSelect = onSkillSelectCallback || (() => {});

    this.animationFrameId = null;
    this.isRunning = true;

    // Interactive State
    this.isOvercharged = false;
    this.isNeuralScan = false;

    // Mouse Tracking & 3D Tilt Parallax
    this.mouse = { x: 0, y: 0, rawX: 0, rawY: 0 };
    this.targetRotation = { x: 0, y: 0 };
    this.currentRotation = { x: 0, y: 0 };
    this.isDragging = false;
    this.previousMousePos = { x: 0, y: 0 };
    this.hoveredSkill = null;

    // Rising Stasis Bubbles Array
    this.bubbles = [];
    this.initBubbles(35);

    // Dynamic Avatar Facial Animation & Gaze State (Matches Avatar Art)
    this.blinkState = {
      isBlinking: false,
      progress: 0,
      nextBlinkTime: 2.2,
      duration: 0.18
    };

    this.eyeGaze = {
      currentX: 0.42, // default resting look: sideways glance matching reference image
      currentY: 0.15,
      targetX: 0.42,
      targetY: 0.15,
      saccadeTimer: 2.0
    };

    this.smileBoost = 0;
    this.lastTime = 0;
    this.electricArcs = [];

    // 10 Stationed Floating Tech Skills (Floating directly inside blue glass cylinder fluid)
    this.skillsData = [
      {
        id: 'react-native',
        name: 'React Native',
        category: 'MOBILE',
        level: 'Core Specialization',
        color: '#00f0ff',
        side: 'left',
        vertRatio: -0.32,
        radRatio: 0.65,
        floatSpeed: 1.4,
        floatAmp: 3.5,
        phase: 0,
        projects: ['BroSis', 'Tracevenue', 'NeuroSync AI', 'Phytier'],
        desc: 'Production cross-platform mobile architecture with 60FPS UI and zero jank.'
      },
      {
        id: 'redux',
        name: 'Redux Toolkit',
        category: 'STATE',
        level: 'Advanced State',
        color: '#c084fc',
        side: 'left',
        vertRatio: -0.16,
        radRatio: 0.72,
        floatSpeed: 1.2,
        floatAmp: 4,
        phase: 1.3,
        projects: ['BroSis', 'NeuroSync AI'],
        desc: 'Centralized slices, memoized selectors, and eliminating prop drilling.'
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        category: 'LANGUAGE',
        level: 'Advanced',
        color: '#38bdf8',
        side: 'left',
        vertRatio: 0.00,
        radRatio: 0.74,
        floatSpeed: 1.5,
        floatAmp: 3.5,
        phase: 2.6,
        projects: ['Phytier', 'BroSis'],
        desc: 'Strict type modeling, robust component contracts, and scalable codebase.'
      },
      {
        id: 'async-storage',
        name: 'AsyncStorage',
        category: 'OFFLINE',
        level: 'Local-First',
        color: '#06b6d4',
        side: 'left',
        vertRatio: 0.16,
        radRatio: 0.68,
        floatSpeed: 1.1,
        floatAmp: 3.5,
        phase: 3.8,
        projects: ['NeuroSync AI'],
        desc: 'Zero-network persistence and lightweight flat key-value state.'
      },
      {
        id: 'jwt-auth',
        name: 'JWT Security',
        category: 'SECURITY',
        level: 'Auth Shield',
        color: '#f59e0b',
        side: 'left',
        vertRatio: 0.32,
        radRatio: 0.65,
        floatSpeed: 1.3,
        floatAmp: 3,
        phase: 5.0,
        projects: ['Tracevenue', 'Phytier'],
        desc: 'Secure token storage with silent session refresh rotations.'
      },
      {
        id: 'ai-ocr',
        name: 'AI & OCR',
        category: 'AI ENGINE',
        level: 'Multimodal Systems',
        color: '#ec4899',
        side: 'right',
        vertRatio: -0.32,
        radRatio: 0.65,
        floatSpeed: 1.3,
        floatAmp: 3.5,
        phase: 0.9,
        projects: ['BroSis'],
        desc: 'Document OCR extraction + dynamic question rendering + STT/TTS voice.'
      },
      {
        id: 'nodejs',
        name: 'Node.js / Express',
        category: 'BACKEND',
        level: 'Proficient',
        color: '#22c55e',
        side: 'right',
        vertRatio: -0.16,
        radRatio: 0.72,
        floatSpeed: 1.6,
        floatAmp: 4,
        phase: 2.1,
        projects: ['Phytier'],
        desc: 'RESTful API endpoints with JWT route guards and error boundaries.'
      },
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        category: 'DATABASE',
        level: 'Schema Modeling',
        color: '#3b82f6',
        side: 'right',
        vertRatio: 0.00,
        radRatio: 0.74,
        floatSpeed: 1.2,
        floatAmp: 3.5,
        phase: 3.3,
        projects: ['Phytier'],
        desc: 'Normalized relational schemas optimized for user activity & habit streams.'
      },
      {
        id: 'flashlist',
        name: 'FlashList / 60FPS',
        category: 'PERFORMANCE',
        level: 'High Precision',
        color: '#00f0ff',
        side: 'right',
        vertRatio: 0.16,
        radRatio: 0.68,
        floatSpeed: 1.4,
        floatAmp: 3.5,
        phase: 4.4,
        projects: ['Tracevenue'],
        desc: 'Eliminating FlatList frame drops on low-end Android hardware.'
      },
      {
        id: 'git-android',
        name: 'Git & Android',
        category: 'DEVOPS',
        level: 'Agile Workflow',
        color: '#f87171',
        side: 'right',
        vertRatio: 0.32,
        radRatio: 0.65,
        floatSpeed: 1.2,
        floatAmp: 3,
        phase: 5.6,
        projects: ['Tracevenue', 'BroSis', 'NeuroSync AI', 'Phytier'],
        desc: 'Branching workflows, PR code reviews, and Android build optimization.'
      }
    ];

    this.init();
  }

  initBubbles(count) {
    this.bubbles = [];
    for (let i = 0; i < count; i++) {
      this.bubbles.push({
        xOffset: (Math.random() - 0.5) * 0.78,
        yProgress: Math.random(),
        radius: Math.random() * 2.8 + 1.2,
        speed: Math.random() * 0.003 + 0.0015,
        wobbleSpeed: Math.random() * 3 + 1,
        wobbleAmp: Math.random() * 5 + 2,
        opacity: Math.random() * 0.6 + 0.2
      });
    }
  }

  init() {
    if (!this.canvas) return;

    this.resizeCanvas();
    this.bindEvents();
    this.hideLoader();

    // Remove any previous DOM fallback if present
    const prevFallback = document.getElementById('stasisFallbackWrapper');
    if (prevFallback) prevFallback.remove();

    // Start 60FPS loop
    this.animate();
  }

  hideLoader() {
    const loader = document.getElementById('canvasLoading');
    if (loader) {
      loader.classList.add('hidden');
      loader.style.display = 'none';
    }
  }

  resizeCanvas() {
    if (!this.canvas || !this.container) return;
    const rect = this.container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.width = rect.width > 50 ? rect.width : window.innerWidth * 0.44;
    this.height = rect.height > 50 ? rect.height : window.innerHeight;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resizeCanvas());

    if (this.canvas) {
      this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
      this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
      window.addEventListener('mouseup', () => this.onMouseUp());
      this.canvas.addEventListener('click', (e) => this.onCanvasClick(e));

      this.canvas.addEventListener('mouseleave', () => {
        this.targetRotation.x = 0;
        this.targetRotation.y = 0;
        this.hoveredSkill = null;
        this.canvas.style.cursor = 'default';
        this.hideSkillTooltip();
      });

      // Touch events for mobile
      this.canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          this.isDragging = true;
          this.previousMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      }, { passive: true });

      this.canvas.addEventListener('touchmove', (e) => {
        if (this.isDragging && e.touches.length === 1) {
          const deltaX = e.touches[0].clientX - this.previousMousePos.x;
          const deltaY = e.touches[0].clientY - this.previousMousePos.y;
          this.targetRotation.y += deltaX * 0.01;
          this.targetRotation.x += deltaY * 0.01;
          this.targetRotation.x = Math.max(-0.4, Math.min(0.4, this.targetRotation.x));
          this.targetRotation.y = Math.max(-0.6, Math.min(0.6, this.targetRotation.y));
          this.previousMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      }, { passive: true });

      this.canvas.addEventListener('touchend', () => {
        this.isDragging = false;
      }, { passive: true });
    }
  }

  onMouseMove(e) {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.rawX = e.clientX - rect.left;
    this.mouse.rawY = e.clientY - rect.top;
    this.mouse.x = (this.mouse.rawX / this.width - 0.5) * 2;
    this.mouse.y = (this.mouse.rawY / this.height - 0.5) * 2;

    if (this.isDragging) {
      const deltaX = e.clientX - this.previousMousePos.x;
      const deltaY = e.clientY - this.previousMousePos.y;
      this.targetRotation.y += deltaX * 0.008;
      this.targetRotation.x += deltaY * 0.008;
      this.targetRotation.x = Math.max(-0.45, Math.min(0.45, this.targetRotation.x));
      this.targetRotation.y = Math.max(-0.65, Math.min(0.65, this.targetRotation.y));
      this.previousMousePos = { x: e.clientX, y: e.clientY };
    } else {
      // Subtle natural parallax following cursor
      this.targetRotation.y = this.mouse.x * 0.22;
      this.targetRotation.x = -this.mouse.y * 0.15;
    }

    // Check hit test for floating skills
    this.checkSkillHover(this.mouse.rawX, this.mouse.rawY);
  }

  onMouseDown(e) {
    this.isDragging = true;
    this.canvas.style.cursor = 'grabbing';
    this.previousMousePos = { x: e.clientX, y: e.clientY };
  }

  onMouseUp() {
    this.isDragging = false;
    if (this.canvas) {
      this.canvas.style.cursor = this.hoveredSkill ? 'pointer' : 'default';
    }
  }

  onCanvasClick(e) {
    if (this.hoveredSkill) {
      this.onSkillSelect(this.hoveredSkill);
    }
  }

  checkSkillHover(x, y) {
    let matched = null;
    if (this.renderedSkillBounds) {
      for (const item of this.renderedSkillBounds) {
        if (x >= item.x && x <= item.x + item.w && y >= item.y && y <= item.y + item.h) {
          matched = item.skill;
          break;
        }
      }
    }

    if (matched !== this.hoveredSkill) {
      this.hoveredSkill = matched;
      if (this.canvas) {
        this.canvas.style.cursor = matched ? 'pointer' : (this.isDragging ? 'grabbing' : 'default');
      }
      if (matched) {
        this.showSkillTooltip(matched);
      } else {
        this.hideSkillTooltip();
      }
    }
  }

  showSkillTooltip(skill) {
    const tooltip = document.getElementById('skillInspectHud');
    const nameEl = document.getElementById('inspectSkillName');
    const descEl = document.getElementById('inspectSkillDesc');
    if (tooltip && nameEl && descEl) {
      nameEl.textContent = skill.name;
      descEl.textContent = `${skill.category} // ${skill.desc}`;
      tooltip.classList.add('active');
    }
  }

  hideSkillTooltip() {
    const tooltip = document.getElementById('skillInspectHud');
    if (tooltip) tooltip.classList.remove('active');
  }

  selectSkillByName(skillName) {
    const skill = this.skillsData.find(s =>
      s.name.toLowerCase() === skillName.toLowerCase() ||
      s.name.toLowerCase().includes(skillName.toLowerCase()) ||
      skillName.toLowerCase().includes(s.name.toLowerCase())
    );
    if (skill) {
      this.hoveredSkill = skill;
      this.showSkillTooltip(skill);
    }
  }

  triggerOvercharge() {
    this.isOvercharged = !this.isOvercharged;
    return this.isOvercharged;
  }

  toggleScanMode() {
    this.isNeuralScan = !this.isNeuralScan;
    return this.isNeuralScan;
  }

  resetCamera() {
    this.targetRotation.x = 0;
    this.targetRotation.y = 0;
    this.currentRotation.x = 0;
    this.currentRotation.y = 0;
  }

  drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  /**
   * Update Facial Animations (Blinking, Gaze Tracking, Micro-Expressions)
   */
  updateFacialAnimations(dt, time) {
    // 1. Natural Blinking State Machine
    if (this.blinkState.isBlinking) {
      this.blinkState.progress += dt / (this.blinkState.duration / 2);
      if (this.blinkState.progress >= 2.0) {
        this.blinkState.isBlinking = false;
        this.blinkState.progress = 0;
        this.blinkState.nextBlinkTime = time + 2.8 + Math.random() * 3.2;
      }
    } else {
      if (time >= this.blinkState.nextBlinkTime) {
        this.blinkState.isBlinking = true;
        this.blinkState.progress = 0;
      }
    }

    // 2. Eye Gaze Tracking Logic
    if (this.hoveredSkill) {
      // Direct gaze towards hovered floating skill node
      const isLeft = this.hoveredSkill.side === 'left';
      this.eyeGaze.targetX = isLeft ? -0.85 : 0.85;
      this.eyeGaze.targetY = this.hoveredSkill.vertRatio * 1.6;
    } else if (this.isDragging || (Math.abs(this.mouse.x) > 0.04 || Math.abs(this.mouse.y) > 0.04)) {
      // Smoothly track mouse cursor coordinates with natural eye-socket clamping
      this.eyeGaze.targetX = Math.max(-0.9, Math.min(0.9, this.mouse.x * 1.15));
      this.eyeGaze.targetY = Math.max(-0.7, Math.min(0.7, this.mouse.y * 0.9));
    } else {
      // Idle natural saccades: maintains the signature sly sideways gaze from the reference photo
      if (time >= this.eyeGaze.saccadeTimer) {
        this.eyeGaze.saccadeTimer = time + 2.2 + Math.random() * 2.8;
        const subtleLooks = [
          { x: 0.42, y: 0.15 }, // Iconic reference look (sideways smirk)
          { x: 0.52, y: 0.22 }, // Down-right glance
          { x: 0.28, y: 0.06 }, // Subtle center-right
          { x: 0.40, y: 0.18 }
        ];
        const pick = subtleLooks[Math.floor(Math.random() * subtleLooks.length)];
        this.eyeGaze.targetX = pick.x;
        this.eyeGaze.targetY = pick.y;
      }
    }

    // Smooth Euler interpolation for natural eye damping
    this.eyeGaze.currentX += (this.eyeGaze.targetX - this.eyeGaze.currentX) * Math.min(1.0, dt * 9.5);
    this.eyeGaze.currentY += (this.eyeGaze.targetY - this.eyeGaze.currentY) * Math.min(1.0, dt * 9.5);

    // 3. Dynamic Micro-Expression Reactive Boost
    const targetSmile = (this.hoveredSkill || this.isOvercharged) ? 1.0 : 0.0;
    this.smileBoost += (targetSmile - this.smileBoost) * Math.min(1.0, dt * 6.0);
  }

  /**
   * Main 60FPS Render Loop
   */
  animate() {
    if (!this.isRunning) return;
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const ctx = this.ctx;
    if (!ctx || !this.width || !this.height) return;

    const now = performance.now();
    const time = now * 0.001;
    const dt = Math.min(Math.max(time - (this.lastTime || time), 0.001), 0.1);
    this.lastTime = time;

    // Update dynamic facial animations (blinking, eye saccades, smirks)
    this.updateFacialAnimations(dt, time);

    // Smooth Euler angle damping for realistic 3D inertia
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.08;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.08;

    // Clear canvas
    ctx.clearRect(0, 0, this.width, this.height);

    // Compute Responsive Pod Geometry (Sleek, streamlined cylindrical tube)
    const cx = this.width / 2;
    const cy = this.height / 2;
    const podWidth = Math.min(this.width * 0.38, 195);
    const podHeight = Math.min(this.height * 0.74, 480);
    const podRadius = podWidth / 2;

    const rotX = this.currentRotation.x;
    const rotY = this.currentRotation.y;

    // 1. Draw Background Stasis Glow Aura
    const auraGlow = ctx.createRadialGradient(cx, cy, podRadius * 0.2, cx, cy, podRadius * 1.5);
    auraGlow.addColorStop(0, this.isOvercharged ? 'rgba(0, 240, 255, 0.25)' : 'rgba(0, 240, 255, 0.12)');
    auraGlow.addColorStop(0.5, 'rgba(2, 132, 199, 0.08)');
    auraGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = auraGlow;
    ctx.fillRect(0, 0, this.width, this.height);

    // 2. Draw Back Laser Scan Arc (sweeping vertically)
    const scanProgress = (Math.sin(time * (this.isOvercharged ? 2.8 : 1.6)) + 1) / 2;
    const scanY = cy - podHeight * 0.42 + scanProgress * (podHeight * 0.84);

    ctx.save();
    ctx.strokeStyle = this.isOvercharged ? '#38bdf8' : '#00f0ff';
    ctx.lineWidth = this.isOvercharged ? 2.5 : 1.5;
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.ellipse(cx, scanY, podRadius * 0.94, 10, 0, Math.PI, 0); // Back half ellipse
    ctx.stroke();
    ctx.restore();

    // 3. Draw Sci-Fi Blue Glass Stasis Pod Cylinder (Back Layer & Stasis Fluid)
    this.drawChamberBack(ctx, cx, cy, podWidth, podHeight);

    // 4. Draw Rising Stasis Fluid Bubbles (Back Layer)
    this.drawBubbles(ctx, cx, cy, podWidth, podHeight, time, false);

    // 5. Draw Full-Body Stylized Animated 3D Human Developer Model
    ctx.save();
    ctx.translate(cx, cy);
    this.drawHumanCharacterModel(ctx, podWidth, podHeight, time, rotX, rotY);
    ctx.restore();

    // 6. Draw 10 Stationary Floating Tech Skill Holographic Logos Floating INSIDE the Fluid
    this.drawSkillBadges(ctx, cx, cy, podWidth, podHeight, time);

    // 7. Draw Rising Stasis Fluid Bubbles (Front Layer drifting over logos)
    this.drawBubbles(ctx, cx, cy, podWidth, podHeight, time, true);

    // 8. Draw Front Laser Scan Arc (Sweeping in front of character & logos)
    ctx.save();
    ctx.strokeStyle = this.isOvercharged ? '#ffffff' : '#00f0ff';
    ctx.lineWidth = this.isOvercharged ? 3 : 1.8;
    ctx.globalAlpha = this.isOvercharged ? 0.95 : 0.75;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = this.isOvercharged ? 18 : 10;
    ctx.beginPath();
    ctx.ellipse(cx, scanY, podRadius * 0.94, 10, 0, 0, Math.PI); // Front half ellipse
    ctx.stroke();
    ctx.restore();

    // 9. Draw Chamber Glass Highlights, Specular Sheen & Metallic Caps (Front Layer)
    this.drawChamberFront(ctx, cx, cy, podWidth, podHeight);
  }

  /**
   * Draw Rising Stasis Fluid Particles (Split into back and front depth layers)
   */
  drawBubbles(ctx, cx, cy, podWidth, podHeight, time, isFrontLayer = false) {
    const podTop = cy - podHeight * 0.44;
    const podBottom = cy + podHeight * 0.44;
    const speedMult = this.isOvercharged ? 2.2 : 1.0;

    ctx.save();
    this.bubbles.forEach((b, idx) => {
      const isThisFront = idx % 2 === 1;
      if (isThisFront !== isFrontLayer) return;

      if (!isFrontLayer) {
        b.yProgress += b.speed * speedMult;
        if (b.yProgress > 1.0) b.yProgress = 0;
      }

      const y = podBottom - b.yProgress * (podHeight * 0.88);
      const wobble = Math.sin(time * b.wobbleSpeed + b.yProgress * 10) * b.wobbleAmp;
      const x = cx + b.xOffset * (podWidth * 0.80) + wobble;

      ctx.beginPath();
      ctx.arc(x, y, b.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${b.opacity * (this.isOvercharged ? 0.9 : 0.5)})`;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 6;
      ctx.fill();
    });
    ctx.restore();
  }

  /**
   * Draw Back Layer of Stasis Chamber Cylinder
   */
  drawChamberBack(ctx, cx, cy, podWidth, podHeight) {
    const podRadius = podWidth / 2;
    const glassTop = cy - podHeight * 0.44;
    const glassBottom = cy + podHeight * 0.44;
    const glassH = glassBottom - glassTop;

    ctx.save();
    // Glass Fluid Volumetric Gradient
    const glassGrad = ctx.createLinearGradient(cx - podRadius, 0, cx + podRadius, 0);
    glassGrad.addColorStop(0, 'rgba(0, 240, 255, 0.18)');
    glassGrad.addColorStop(0.2, 'rgba(2, 132, 199, 0.12)');
    glassGrad.addColorStop(0.5, 'rgba(0, 240, 255, 0.08)');
    glassGrad.addColorStop(0.8, 'rgba(2, 132, 199, 0.12)');
    glassGrad.addColorStop(1, 'rgba(0, 240, 255, 0.18)');

    this.drawRoundedRect(ctx, cx - podRadius, glassTop, podWidth, glassH, 10);
    ctx.fillStyle = glassGrad;
    ctx.fill();

    // Subtle Internal Grid Gridlines
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 3; i++) {
      const gx = cx - podRadius + (podWidth / 4) * i;
      ctx.beginPath();
      ctx.moveTo(gx, glassTop);
      ctx.lineTo(gx, glassBottom);
      ctx.stroke();
    }
    ctx.restore();
  }

  /**
   * Draw Front Layer of Stasis Chamber (Metallic Caps, Neon Rings, Edge Gloss)
   */
  drawChamberFront(ctx, cx, cy, podWidth, podHeight) {
    const podRadius = podWidth / 2;
    const glassTop = cy - podHeight * 0.44;
    const glassBottom = cy + podHeight * 0.44;
    const glassH = glassBottom - glassTop;

    ctx.save();
    // Glass Edge Curvature Gloss Highlights
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
    ctx.lineWidth = 2.2;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 10;

    // Left Edge
    ctx.beginPath();
    ctx.moveTo(cx - podRadius, glassTop + 8);
    ctx.lineTo(cx - podRadius, glassBottom - 8);
    ctx.stroke();

    // Right Edge
    ctx.beginPath();
    ctx.moveTo(cx + podRadius, glassTop + 8);
    ctx.lineTo(cx + podRadius, glassBottom - 8);
    ctx.stroke();

    // Specular Highlight Glare
    const glareGrad = ctx.createLinearGradient(cx - podRadius + 10, 0, cx - podRadius + 22, 0);
    glareGrad.addColorStop(0, 'rgba(255, 255, 255, 0.26)');
    glareGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = glareGrad;
    ctx.fillRect(cx - podRadius + 8, glassTop + 12, 14, glassH - 24);

    // --- TOP EMITTER PEDESTAL ---
    const capW = podWidth * 1.15;
    const capH = 22;
    const topCapY = glassTop - capH + 4;

    // Top Cap Base
    const capGrad = ctx.createLinearGradient(0, topCapY, 0, topCapY + capH);
    capGrad.addColorStop(0, '#1e293b');
    capGrad.addColorStop(1, '#0b1120');

    this.drawRoundedRect(ctx, cx - capW / 2, topCapY, capW, capH, 7);
    ctx.fillStyle = capGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Top Neon Ring
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(cx - capW * 0.42, topCapY + capH - 2);
    ctx.lineTo(cx + capW * 0.42, topCapY + capH - 2);
    ctx.stroke();

    // --- BOTTOM BASE PEDESTAL ---
    const baseW = podWidth * 1.20;
    const baseH = 26;
    const baseCapY = glassBottom - 4;

    const baseGrad = ctx.createLinearGradient(0, baseCapY, 0, baseCapY + baseH);
    baseGrad.addColorStop(0, '#0f172a');
    baseGrad.addColorStop(1, '#050811');

    this.drawRoundedRect(ctx, cx - baseW / 2, baseCapY, baseW, baseH, 8);
    ctx.fillStyle = baseGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Bottom Concentric Neon Ring
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(cx - baseW * 0.44, baseCapY + 4);
    ctx.lineTo(cx + baseW * 0.44, baseCapY + 4);
    ctx.stroke();

    ctx.restore();
  }

  /**
   * Stylized Animated 3D Developer Character Model
   * Features: Brunette pompadour quiff with 3 carved texture arcs, bold black square glasses with white gloss crescent arcs,
   * expressive teal eyes with dynamic cursor gaze tracking & smooth blinking, peachy skin, wry smirk, and collared grid dress shirt.
   */
  drawHumanCharacterModel(ctx, podWidth, podHeight, time, rotX, rotY) {
    const isXRay = this.isNeuralScan;

    // Multi-harmonic zero-G floating & respiratory breathing physics
    const zeroGBob = Math.sin(time * 1.5) * 5.2 + Math.cos(time * 0.75) * 1.5;
    const breathScale = 1.0 + Math.sin(time * 2.2) * 0.016;

    // Mouse 3D Parallax Offsets
    const pX = rotY * 18;
    const pY = -rotX * 12 + zeroGBob;

    ctx.save();
    ctx.translate(pX, pY);

    // Color Palette tailored to reference cartoon character
    const palette = isXRay ? {
      skin: 'rgba(0, 240, 255, 0.28)',
      skinShadow: 'rgba(0, 240, 255, 0.45)',
      hair: 'rgba(0, 240, 255, 0.35)',
      hairGrooves: '#00f0ff',
      brows: '#00f0ff',
      glassesFrame: '#00f0ff',
      glassesGloss: 'rgba(255, 255, 255, 0.9)',
      eyeWhite: 'rgba(0, 240, 255, 0.3)',
      eyeIris: '#00f0ff',
      eyePupil: '#ffffff',
      mouth: '#00f0ff',
      shirt: 'rgba(0, 240, 255, 0.18)',
      shirtCollar: 'rgba(0, 240, 255, 0.35)',
      shirtGrid: 'rgba(0, 240, 255, 0.35)',
      buttons: '#00f0ff',
      pants: 'rgba(0, 240, 255, 0.15)',
      pantsDark: 'rgba(0, 240, 255, 0.25)',
      boots: 'rgba(0, 240, 255, 0.22)',
      bootSole: '#00f0ff',
      datapad: '#00f0ff',
      outline: '#00f0ff'
    } : {
      skin: '#f8c8b8',              // Fair peachy warm skin tone
      skinShadow: '#e2a696',        // Soft jaw & neck contour shading
      hair: '#4a3326',              // Dark rich brunette hair
      hairMid: '#5c3f30',           // Hair volume midtone
      hairHighlight: '#734e3b',     // Glossy hair sweep highlight
      hairGrooves: '#2a1b13',       // 3 Signature dark texture groove arcs
      brows: '#342017',             // Arched dark brown eyebrows
      glassesFrame: '#131518',      // Distinct bold black square/rounded frames
      glassesHighlight: '#383e4a',  // Subtle frame bevel highlight
      glassesGloss: '#ffffff',      // Bold white crescent reflection curve
      eyeWhite: '#ffffff',          // Crisp eye sclera
      eyeIris: '#488a82',           // Muted teal-green/slate iris
      eyeIrisDark: '#254c46',       // Outer iris border
      eyePupil: '#10151c',          // Deep black pupil
      mouth: '#9c4c3e',             // Signature wavy wry smirk line
      mouthDimple: '#7a3429',
      shirt: '#e4dfd4',             // Stone cream / light beige collared dress shirt
      shirtShadow: '#d0c9bc',
      shirtCollar: '#ded9cd',       // Folded collar points
      shirtGrid: 'rgba(40, 50, 72, 0.20)', // Subtle windowpane check lines
      buttons: '#2a313b',           // Dark contrast buttons
      pants: '#1e293b',             // Tailored charcoal slate trousers
      pantsDark: '#131b26',
      belt: '#0f172a',
      buckle: '#cbd5e1',
      boots: '#0f172a',             // Modern minimalist sneakers
      bootSole: '#f8fafc',          // Crisp white midsole
      bootStripe: '#00f0ff',        // Cyber cyan tread line
      datapad: '#00f0ff',
      outline: 'rgba(0, 0, 0, 0.25)'
    };

    const pelvisY = 28;
    const torsoH = 70;
    const torsoY = pelvisY - torsoH; // y = -42
    const torsoW = 66;

    // --- 1. LEGS & MODERN SNEAKERS (Articulated zero-g floating) ---
    this.drawLegsAndShoes(ctx, palette, isXRay, pelvisY, time);

    // --- 2. PELVIS & BELT ---
    this.drawPelvisAndBelt(ctx, palette, isXRay, pelvisY);

    // --- 3. TORSO & COLLARED DRESS SHIRT WITH GRID PATTERN ---
    this.drawTorsoAndShirt(ctx, palette, isXRay, torsoW, torsoH, torsoY, pelvisY, breathScale, time);

    // --- 4. ARMS & HOLOGRAPHIC WRIST DATAPAD ---
    this.drawArmsAndHands(ctx, palette, isXRay, torsoW, torsoY, time);

    // --- 5. HEAD, HAIR (3 GROOVE ARCS), GLASSES (WHITE GLOSS ARCS), EYES (GAZE TRACKING), EYEBROWS & SMIRK ---
    this.drawHeadAndFace(ctx, palette, isXRay, torsoY, rotX, rotY, time);

    // --- 6. OVERCHARGE ELECTRIC SURGE SPARKS ---
    if (this.isOvercharged) {
      this.drawElectricSparks(ctx, podWidth, podHeight, time);
    }

    ctx.restore(); // End Character Translation
  }

  /**
   * Draw Legs & Modern Minimalist Sneakers
   */
  drawLegsAndShoes(ctx, palette, isXRay, pelvisY, time) {
    const leftLegSway = Math.sin(time * 1.3) * 2.2;
    const rightLegSway = -Math.cos(time * 1.3) * 2.2;

    const legW = 19;
    const thighH = 38;
    const calfH = 38;

    // Left Leg
    ctx.save();
    ctx.translate(-14 + leftLegSway, pelvisY);
    this.drawLeg(ctx, palette, isXRay, 'left', legW, thighH, calfH, time);
    ctx.restore();

    // Right Leg
    ctx.save();
    ctx.translate(14 + rightLegSway, pelvisY);
    this.drawLeg(ctx, palette, isXRay, 'right', legW, thighH, calfH, time);
    ctx.restore();
  }

  drawLeg(ctx, palette, isXRay, side, legW, thighH, calfH, time) {
    const isLeft = side === 'left';
    const thighGrad = ctx.createLinearGradient(-legW / 2, 0, legW / 2, 0);
    thighGrad.addColorStop(0, isXRay ? palette.pants : (isLeft ? palette.pantsDark : palette.pants));
    thighGrad.addColorStop(1, isXRay ? palette.pants : (isLeft ? palette.pants : palette.pantsDark));

    // Thigh
    this.drawRoundedRect(ctx, -legW / 2, 0, legW, thighH, 3.5);
    ctx.fillStyle = thighGrad;
    ctx.fill();
    ctx.strokeStyle = isXRay ? '#00f0ff' : palette.outline;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Knee seam
    ctx.strokeStyle = isXRay ? 'rgba(0,240,255,0.4)' : 'rgba(255,255,255,0.06)';
    ctx.beginPath();
    ctx.moveTo(-legW / 2 + 2, thighH);
    ctx.lineTo(legW / 2 - 2, thighH);
    ctx.stroke();

    // Calf & Lower Trouser
    this.drawRoundedRect(ctx, -legW / 2 + 1, thighH - 1, legW - 2, calfH, 3);
    ctx.fillStyle = thighGrad;
    ctx.fill();
    ctx.stroke();

    // Modern Developer Sneaker
    const shoeY = thighH + calfH - 4;
    const shoeW = legW + 4;
    const shoeH = 19;
    const shoeX = isLeft ? -legW / 2 - 2 : -legW / 2;

    // Sneaker Upper
    this.drawRoundedRect(ctx, shoeX, shoeY, shoeW, shoeH, 4);
    ctx.fillStyle = isXRay ? palette.boots : palette.boots;
    ctx.fill();
    ctx.strokeStyle = isXRay ? '#00f0ff' : '#1e293b';
    ctx.stroke();

    // Crisp White Midsole
    this.drawRoundedRect(ctx, shoeX - 1, shoeY + shoeH - 5.5, shoeW + 2, 5.5, 2);
    ctx.fillStyle = isXRay ? '#00f0ff' : palette.bootSole;
    ctx.fill();

    // Cyan High-Tech Tread Accent
    ctx.fillStyle = isXRay ? '#ffffff' : palette.bootStripe;
    ctx.fillRect(shoeX + 3, shoeY + shoeH - 2.5, shoeW - 6, 1.8);
  }

  /**
   * Draw Pelvis & Belt
   */
  drawPelvisAndBelt(ctx, palette, isXRay, pelvisY) {
    ctx.save();
    const beltW = 58;
    const beltH = 13;

    this.drawRoundedRect(ctx, -beltW / 2, pelvisY - 3, beltW, beltH, 3);
    ctx.fillStyle = isXRay ? palette.shirt : palette.belt;
    ctx.fill();
    ctx.strokeStyle = isXRay ? '#00f0ff' : '#334155';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Brushed Silver Belt Buckle
    this.drawRoundedRect(ctx, -6, pelvisY - 2, 12, 10, 2);
    ctx.fillStyle = isXRay ? '#00f0ff' : palette.buckle;
    ctx.fill();
    ctx.restore();
  }

  /**
   * Draw Torso & Collared Dress Shirt with Clean Windowpane Grid Pattern
   */
  drawTorsoAndShirt(ctx, palette, isXRay, torsoW, torsoH, torsoY, pelvisY, breathScale, time) {
    ctx.save();
    ctx.scale(breathScale, 1.0 + (breathScale - 1.0) * 0.5);

    // Shirt Main Body
    const shirtGrad = ctx.createLinearGradient(-torsoW / 2, 0, torsoW / 2, 0);
    shirtGrad.addColorStop(0, isXRay ? palette.shirt : palette.shirtShadow);
    shirtGrad.addColorStop(0.5, isXRay ? palette.shirt : palette.shirt);
    shirtGrad.addColorStop(1, isXRay ? palette.shirt : palette.shirtShadow);

    this.drawRoundedRect(ctx, -torsoW / 2, torsoY, torsoW, torsoH, 6.5);
    ctx.fillStyle = shirtGrad;
    ctx.fill();
    ctx.strokeStyle = isXRay ? '#00f0ff' : palette.outline;
    ctx.lineWidth = isXRay ? 1.5 : 1;
    ctx.stroke();

    // Windowpane Grid Lines (Vertical & Horizontal Grid Pattern Matching Art)
    if (!isXRay) {
      ctx.save();
      ctx.strokeStyle = palette.shirtGrid;
      ctx.lineWidth = 1.1;

      // Vertical Grid Check Lines
      [-20, -7, 7, 20].forEach(gx => {
        ctx.beginPath();
        ctx.moveTo(gx, torsoY + 4);
        ctx.lineTo(gx, pelvisY - 3);
        ctx.stroke();
      });

      // Horizontal Grid Check Lines
      [torsoY + 16, torsoY + 34, torsoY + 52].forEach(gy => {
        ctx.beginPath();
        ctx.moveTo(-torsoW / 2 + 3, gy);
        ctx.lineTo(torsoW / 2 - 3, gy);
        ctx.stroke();
      });
      ctx.restore();
    }

    // Center Button Placket
    ctx.fillStyle = isXRay ? 'rgba(0,240,255,0.3)' : palette.shirtCollar;
    this.drawRoundedRect(ctx, -4.5, torsoY + 4, 9, torsoH - 7, 2);
    ctx.fill();

    // Dark Buttons
    ctx.fillStyle = isXRay ? '#00f0ff' : palette.buttons;
    [torsoY + 16, torsoY + 34, torsoY + 52].forEach(by => {
      ctx.beginPath();
      ctx.arc(0, by, 1.8, 0, Math.PI * 2);
      ctx.fill();
    });

    // Left Chest Tech Pocket with Cyan Beacon
    ctx.fillStyle = isXRay ? 'rgba(0,240,255,0.25)' : palette.shirtShadow;
    this.drawRoundedRect(ctx, -torsoW / 2 + 6, torsoY + 16, 16, 14, 2);
    ctx.fill();
    ctx.strokeStyle = isXRay ? '#00f0ff' : 'rgba(0,0,0,0.15)';
    ctx.stroke();

    // Cyan Telemetry LED on Pocket
    ctx.fillStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(-torsoW / 2 + 14, torsoY + 20, 2.0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.restore();
  }

  /**
   * Draw Arms & Left Wrist Smart Datapad
   */
  drawArmsAndHands(ctx, palette, isXRay, torsoW, torsoY, time) {
    // Left Arm (Equipped with glowing Cyber Wrist Datapad)
    ctx.save();
    ctx.translate(-torsoW / 2 - 1, torsoY + 11);
    ctx.rotate(0.08 + Math.sin(time * 1.2) * 0.025);
    this.drawArm(ctx, palette, isXRay, 'left', time);
    ctx.restore();

    // Right Arm
    ctx.save();
    ctx.translate(torsoW / 2 + 1, torsoY + 11);
    ctx.rotate(-0.08 - Math.cos(time * 1.2) * 0.025);
    this.drawArm(ctx, palette, isXRay, 'right', time);
    ctx.restore();
  }

  drawArm(ctx, palette, isXRay, side, time) {
    const isLeft = side === 'left';
    const armW = 15;
    const upperArmH = 31;
    const forearmH = 33;

    // 1. Shoulder & Upper Sleeve (Collared Shirt Fabric)
    this.drawRoundedRect(ctx, -armW / 2, 0, armW, upperArmH, 4);
    ctx.fillStyle = isXRay ? palette.shirt : palette.shirt;
    ctx.fill();
    ctx.strokeStyle = isXRay ? '#00f0ff' : palette.outline;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Sleeve Cuff Seam
    ctx.strokeStyle = isXRay ? 'rgba(0,240,255,0.4)' : 'rgba(0,0,0,0.12)';
    ctx.beginPath();
    ctx.moveTo(-armW / 2 + 1, upperArmH - 3);
    ctx.lineTo(armW / 2 - 1, upperArmH - 3);
    ctx.stroke();

    // 2. Forearm
    ctx.save();
    ctx.translate(0, upperArmH - 2);
    ctx.rotate(isLeft ? -0.10 : 0.10);

    this.drawRoundedRect(ctx, -armW / 2 + 1, 0, armW - 2, forearmH, 3);
    ctx.fillStyle = isXRay ? palette.shirt : palette.shirtShadow;
    ctx.fill();
    ctx.stroke();

    // 3. Left Arm Special: Holographic Cyber Wrist Datapad
    if (isLeft) {
      const padW = 18;
      const padH = 13;
      const padY = 7;
      this.drawRoundedRect(ctx, -padW / 2 - 1, padY, padW, padH, 2.5);
      ctx.fillStyle = '#00f0ff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = this.isOvercharged ? 14 : 8;
      ctx.fill();

      // Pulsing Live Waveform Telemetry inside Screen
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-padW / 2 + 1, padY + padH / 2);
      for (let i = 0; i < 12; i += 3) {
        const wave = Math.sin(time * 7 + i) * 2.5;
        ctx.lineTo(-padW / 2 + 2 + i, padY + padH / 2 + wave);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // 4. Natural Peachy Hand with Fingers
    const handY = forearmH - 2;
    const handW = armW - 1;
    const handH = 14;

    this.drawRoundedRect(ctx, -handW / 2, handY, handW, handH, 3.5);
    ctx.fillStyle = palette.skin;
    ctx.fill();
    ctx.strokeStyle = isXRay ? '#00f0ff' : palette.skinShadow;
    ctx.stroke();

    // Subtle finger separations
    ctx.strokeStyle = isXRay ? 'rgba(0,240,255,0.4)' : palette.skinShadow;
    ctx.beginPath();
    ctx.moveTo(-1, handY + 6);
    ctx.lineTo(-1, handY + handH - 1);
    ctx.moveTo(2.5, handY + 6);
    ctx.lineTo(2.5, handY + handH - 1);
    ctx.stroke();

    ctx.restore();
  }

  /**
   * Draw Head, Brunette Pompadour Hair with 3 Groove Arcs, Bold Black Glasses with White Gloss Reflection Arcs,
   * Expressive Eyes with Real-Time Gaze Tracking, Eyebrows, Nose, and Wry Smirk.
   */
  drawHeadAndFace(ctx, palette, isXRay, torsoY, rotX, rotY, time) {
    ctx.save();
    const headRotX = rotX * 10;
    const headRotY = rotY * 14;
    const headRoll = rotY * 0.05;

    ctx.translate(headRotY, torsoY - 14 + headRotX);
    ctx.rotate(headRoll);

    // --- A. NECK & COLLAR ---
    // Peachy Neck
    ctx.fillStyle = isXRay ? palette.skin : palette.skinShadow;
    ctx.fillRect(-8.5, -4, 17, 14);

    // Folded Shirt Collar Wings
    ctx.fillStyle = isXRay ? palette.shirtCollar : palette.shirtCollar;
    // Left collar wing
    ctx.beginPath();
    ctx.moveTo(-13, 10);
    ctx.lineTo(-2, 2);
    ctx.lineTo(0, 10);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = isXRay ? '#00f0ff' : 'rgba(0,0,0,0.2)';
    ctx.stroke();

    // Right collar wing
    ctx.beginPath();
    ctx.moveTo(13, 10);
    ctx.lineTo(2, 2);
    ctx.lineTo(0, 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Collar Tie Notch
    ctx.fillStyle = isXRay ? '#00f0ff' : '#272d37';
    ctx.fillRect(-2, 5, 4, 5);

    // --- B. EARS (Slight 3D Parallax offset) ---
    const earDepthX = -rotY * 4;
    // Left Ear
    this.drawRoundedRect(ctx, -23 + earDepthX, -22, 6.5, 13, 3);
    ctx.fillStyle = palette.skin;
    ctx.fill();
    ctx.strokeStyle = isXRay ? '#00f0ff' : palette.skinShadow;
    ctx.stroke();
    // Inner left ear fold
    ctx.strokeStyle = isXRay ? 'rgba(0,240,255,0.5)' : palette.skinShadow;
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.arc(-20.5 + earDepthX, -16, 2.5, Math.PI * 0.6, Math.PI * 1.6);
    ctx.stroke();

    // Right Ear
    this.drawRoundedRect(ctx, 16.5 + earDepthX, -22, 6.5, 13, 3);
    ctx.fillStyle = palette.skin;
    ctx.fill();
    ctx.strokeStyle = isXRay ? '#00f0ff' : palette.skinShadow;
    ctx.stroke();
    // Inner right ear fold
    ctx.beginPath();
    ctx.arc(19.5 + earDepthX, -16, 2.5, -Math.PI * 0.6, Math.PI * 0.4);
    ctx.stroke();

    // --- C. FACE CONTOUR ---
    const faceW = 40;
    const faceH = 38;
    const faceY = -38;

    this.drawRoundedRect(ctx, -faceW / 2, faceY, faceW, faceH, 14);
    ctx.fillStyle = palette.skin;
    ctx.fill();
    ctx.strokeStyle = isXRay ? '#00f0ff' : palette.skinShadow;
    ctx.lineWidth = isXRay ? 1.5 : 1;
    ctx.stroke();

    // Subtle jaw/chin shading
    if (!isXRay) {
      ctx.fillStyle = palette.skinShadow;
      ctx.beginPath();
      ctx.arc(0, faceY + faceH - 6, 8, 0, Math.PI);
      ctx.fill();
    }

    // --- D. STYLIZED BRUNETTE HAIR (Quiff with 3 Signature Texture Groove Arcs) ---
    if (!isXRay) {
      // 1. Hair Base & Swept Quiff
      ctx.fillStyle = palette.hair;
      ctx.beginPath();
      ctx.moveTo(-20, -22);                      // Left sideburn bottom
      ctx.lineTo(-20, -36);                      // Left temple
      ctx.quadraticCurveTo(-23, -48, -13, -50);  // High quiff crest on top-left (character's right)
      ctx.quadraticCurveTo(-2, -52, 10, -46);    // Sweeping across top
      ctx.quadraticCurveTo(22, -42, 20.5, -28);  // Right side curve
      ctx.lineTo(20.5, -22);                     // Right sideburn bottom
      ctx.lineTo(16.5, -22);                     // Right sideburn inner
      ctx.lineTo(16.5, -31);
      ctx.quadraticCurveTo(12, -34, 4, -34);     // Front hairline contour
      ctx.quadraticCurveTo(-8, -34, -16, -24);
      ctx.lineTo(-16, -22);                      // Left sideburn inner
      ctx.closePath();
      ctx.fill();

      // 2. Volumetric Hair Midtone & Highlight Sheen
      ctx.fillStyle = palette.hairMid;
      ctx.beginPath();
      ctx.moveTo(-18, -44);
      ctx.quadraticCurveTo(-4, -48, 8, -42);
      ctx.quadraticCurveTo(-2, -45, -14, -42);
      ctx.closePath();
      ctx.fill();

      // Hair Crest Highlight Arc
      ctx.strokeStyle = palette.hairHighlight;
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-15, -47);
      ctx.quadraticCurveTo(-4, -49.5, 6, -44);
      ctx.stroke();

      // 3. THE 3 SIGNATURE CARVED TEXTURE GROOVE ARCS ON UPPER-LEFT QUIFF (Exact Match to Art)
      ctx.strokeStyle = palette.hairGrooves;
      ctx.lineWidth = 2.0;
      ctx.lineCap = 'round';

      // Arc 1 (Top-most small groove)
      ctx.beginPath();
      ctx.moveTo(-12, -47);
      ctx.quadraticCurveTo(-10, -43, -13, -39);
      ctx.stroke();

      // Arc 2 (Middle curved groove)
      ctx.beginPath();
      ctx.moveTo(-16, -45);
      ctx.quadraticCurveTo(-13, -39, -17, -33);
      ctx.stroke();

      // Arc 3 (Lower curved groove)
      ctx.beginPath();
      ctx.moveTo(-18, -37);
      ctx.quadraticCurveTo(-16, -32, -18, -26);
      ctx.stroke();
    } else {
      // Wireframe X-Ray Hair
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(-20, -22);
      ctx.lineTo(-20, -36);
      ctx.quadraticCurveTo(-23, -48, -13, -50);
      ctx.quadraticCurveTo(-2, -52, 10, -46);
      ctx.quadraticCurveTo(22, -42, 20.5, -28);
      ctx.lineTo(20.5, -22);
      ctx.stroke();

      // 3 Grooves in X-Ray
      ctx.beginPath(); ctx.moveTo(-12, -47); ctx.quadraticCurveTo(-10, -43, -13, -39); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-16, -45); ctx.quadraticCurveTo(-13, -39, -17, -33); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-18, -37); ctx.quadraticCurveTo(-16, -32, -18, -26); ctx.stroke();
    }

    // --- E. ARCHED DARK EYEBROWS ---
    ctx.strokeStyle = palette.brows;
    ctx.lineWidth = 2.4;
    ctx.lineCap = 'round';

    // Left Eyebrow (Arched over left glass frame)
    ctx.beginPath();
    ctx.moveTo(-18, -26.5);
    ctx.quadraticCurveTo(-12, -29.5, -5, -26.5);
    ctx.stroke();

    // Right Eyebrow (Cheeky raised arch responding to hover/interaction)
    const browLift = this.smileBoost * 2.0;
    ctx.beginPath();
    ctx.moveTo(5, -26.5 - browLift);
    ctx.quadraticCurveTo(12, -30.5 - browLift, 18, -26.0 - browLift);
    ctx.stroke();

    // --- F. EYES WITH REAL-TIME GAZE TRACKING & NATURAL BLINKING ---
    const eyeParallaxX = rotY * 3.5;
    const eyeParallaxY = rotX * 2.5;

    ctx.save();
    ctx.translate(eyeParallaxX, eyeParallaxY);

    const leftEyeCenter = { x: -11.5, y: -15.5 };
    const rightEyeCenter = { x: 11.5, y: -15.5 };

    // Calculate Blink Eyelid Position (0 = open, 1 = fully closed)
    let blinkFrac = 0;
    if (this.blinkState.isBlinking) {
      // Smooth bell curve 0 -> 1 -> 0
      blinkFrac = Math.sin(Math.min(this.blinkState.progress, 1.0) * Math.PI);
    }

    // Draw Left Eye & Right Eye
    [leftEyeCenter, rightEyeCenter].forEach(eyePos => {
      // 1. Sclera (White Eye Base)
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(eyePos.x, eyePos.y, 6.2, 4.6, 0, 0, Math.PI * 2);
      ctx.fillStyle = palette.eyeWhite;
      ctx.fill();

      // Clip to Eye Socket for Iris & Eyelid
      ctx.clip();

      // 2. Iris (Teal-Green/Slate with Gaze Tracking)
      const gazeOffsetX = this.eyeGaze.currentX * 2.2;
      const gazeOffsetY = this.eyeGaze.currentY * 1.5;
      const irisX = eyePos.x + gazeOffsetX;
      const irisY = eyePos.y + gazeOffsetY;

      ctx.beginPath();
      ctx.arc(irisX, irisY, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = isXRay ? '#00f0ff' : palette.eyeIris;
      ctx.fill();

      if (!isXRay) {
        ctx.strokeStyle = palette.eyeIrisDark;
        ctx.lineWidth = 0.7;
        ctx.stroke();

        // 3. Pupil (Deep Black)
        ctx.beginPath();
        ctx.arc(irisX, irisY, 1.7, 0, Math.PI * 2);
        ctx.fillStyle = palette.eyePupil;
        ctx.fill();

        // 4. White Specular Sparkle Catchlight
        ctx.beginPath();
        ctx.arc(irisX - 0.9, irisY - 0.8, 0.7, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }

      // 5. Smooth Natural Blinking Eyelid Cover
      if (blinkFrac > 0.05) {
        const lidHeight = 10 * blinkFrac;
        ctx.fillStyle = palette.skin;
        ctx.fillRect(eyePos.x - 7, eyePos.y - 5.5, 14, lidHeight);

        // Eyelid line
        ctx.strokeStyle = isXRay ? '#00f0ff' : '#874639';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(eyePos.x - 6.5, eyePos.y - 5.5 + lidHeight);
        ctx.lineTo(eyePos.x + 6.5, eyePos.y - 5.5 + lidHeight);
        ctx.stroke();
      }

      ctx.restore(); // Restore from eye clip

      // Upper Eyelid Crease Line
      if (!isXRay) {
        ctx.strokeStyle = '#874639';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.ellipse(eyePos.x, eyePos.y - 1.0, 6.2, 4.4, 0, Math.PI * 1.15, Math.PI * 1.85);
        ctx.stroke();
      }
    });

    // --- G. DISTINCT BOLD BLACK SQUARE/ROUNDED GLASSES WITH WHITE GLOSS CRESCENT REFLECTION ARCS ---
    const frameW = 19;
    const frameH = 16.5;
    const frameR = 4.8;

    // Left Lens Glass Sheen
    this.drawRoundedRect(ctx, -21.5, -23.5, frameW, frameH, frameR);
    ctx.fillStyle = isXRay ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.08)';
    ctx.fill();

    // Right Lens Glass Sheen
    this.drawRoundedRect(ctx, 2.5, -23.5, frameW, frameH, frameR);
    ctx.fillStyle = isXRay ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.08)';
    ctx.fill();

    // Glasses Outer Frames (Thick Black Rim)
    ctx.strokeStyle = palette.glassesFrame;
    ctx.lineWidth = 2.4;

    // Left Frame Rim
    this.drawRoundedRect(ctx, -21.5, -23.5, frameW, frameH, frameR);
    ctx.stroke();

    // Right Frame Rim
    this.drawRoundedRect(ctx, 2.5, -23.5, frameW, frameH, frameR);
    ctx.stroke();

    // Center Nose Bridge Connecting Both Frames
    ctx.beginPath();
    ctx.moveTo(-2.5, -16.5);
    ctx.lineTo(2.5, -16.5);
    ctx.lineWidth = 3.0;
    ctx.stroke();

    // Side Temples Connecting Frames to Ears
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(-21.5, -16.5);
    ctx.lineTo(-24.5, -16.5);
    ctx.moveTo(21.5, -16.5);
    ctx.lineTo(24.5, -16.5);
    ctx.stroke();

    // Top Frame Bevel Specular Highlights
    if (!isXRay) {
      ctx.strokeStyle = palette.glassesHighlight;
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(-20, -23.5);
      ctx.lineTo(-4, -23.5);
      ctx.moveTo(4, -23.5);
      ctx.lineTo(20, -23.5);
      ctx.stroke();
    }

    // --- WHITE GLOSS CRESCENT ARCS ON GLASSES LENSES (Exact Match to Art!) ---
    ctx.strokeStyle = palette.glassesGloss;
    ctx.lineCap = 'round';
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = this.isOvercharged ? 10 : 2.5;

    // Left Lens Bold Crescent Reflection Arc
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(-12.5, -15.5, 6.2, Math.PI * 0.88, Math.PI * 1.62);
    ctx.stroke();

    // Left Lens Inner Reflection Arc
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.arc(-10.0, -13.0, 3.8, Math.PI * 0.95, Math.PI * 1.45);
    ctx.stroke();

    // Right Lens Bold Crescent Reflection Arc
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(11.5, -15.5, 6.2, Math.PI * 0.88, Math.PI * 1.62);
    ctx.stroke();

    // Right Lens Inner Reflection Arc
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.arc(14.0, -13.0, 3.8, Math.PI * 0.95, Math.PI * 1.45);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // --- H. MINIMALIST CLEAN NOSE ---
    ctx.strokeStyle = isXRay ? '#00f0ff' : '#dc9586';
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, -6.5);
    ctx.lineTo(0.5, -1.0);
    ctx.lineTo(-1.8, 0.5);
    ctx.stroke();

    // --- I. ICONIC WRY SMIRK / CROOKED SMILE MOUTH (Exact Match to Art!) ---
    const smirkOffset = this.smileBoost * 1.8;
    ctx.strokeStyle = palette.mouth;
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';

    // Signature Wavy Smirk Line: down on left, sweeping up on right
    ctx.beginPath();
    ctx.moveTo(-7.0, 6.5);
    ctx.quadraticCurveTo(-2.0, 7.5, 2.0, 6.0);
    ctx.quadraticCurveTo(6.0, 4.5 - smirkOffset, 7.8, 4.0 - smirkOffset);
    ctx.stroke();

    // Tiny Upturned Smirk Dimple at Right Corner
    if (!isXRay) {
      ctx.strokeStyle = palette.mouthDimple;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(6.8, 5.0 - smirkOffset);
      ctx.lineTo(8.2, 3.6 - smirkOffset);
      ctx.stroke();
    }

    ctx.restore(); // Restore from eye/glasses parallax transform

    ctx.restore(); // Restore from main head transform
  }

  /**
   * Draw Crackling Electric Surge Sparks & Lightning Arcs (Active During Overcharge)
   */
  drawElectricSparks(ctx, podWidth, podHeight, time) {
    ctx.save();
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1.6;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 12;

    const sparkCount = 3;
    for (let i = 0; i < sparkCount; i++) {
      const startAngle = time * 4 + i * 2.1;
      const radius = (podWidth / 2) * 0.85;
      const startX = Math.cos(startAngle) * radius;
      const startY = (Math.sin(time * 3 + i) * 0.4) * (podHeight * 0.6);

      ctx.beginPath();
      ctx.moveTo(startX, startY);

      let curX = startX;
      let curY = startY;
      for (let j = 0; j < 4; j++) {
        curX += (Math.random() - 0.5) * 24;
        curY += (Math.random() - 0.5) * 20;
        ctx.lineTo(curX, curY);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  /**
   * Draw Authentic Vector Tech Logos for Skills (Frameless, Pure Glowing Holograms)
   */
  drawSkillLogo(ctx, skillId, x, y, size, color, isHovered = false) {
    ctx.save();
    const cx = x + size / 2;
    const cy = y + size / 2;
    const r = size / 2;

    ctx.shadowColor = color;
    ctx.shadowBlur = isHovered ? 16 : 7;

    switch (skillId) {
      case 'react-native': {
        // React Native Atom Symbol
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = isHovered ? 1.6 : 1.3;
        ctx.fillStyle = '#00f0ff';
        ctx.beginPath();
        ctx.arc(cx, cy, isHovered ? 2.5 : 2, 0, Math.PI * 2);
        ctx.fill();
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.ellipse(cx, cy, r * 0.82, r * 0.32, (i * Math.PI) / 3, 0, Math.PI * 2);
          ctx.stroke();
        }
        break;
      }

      case 'redux': {
        // Redux Loop & Nodes Symbol
        ctx.strokeStyle = '#c084fc';
        ctx.fillStyle = '#c084fc';
        ctx.lineWidth = isHovered ? 1.6 : 1.3;
        ctx.beginPath();
        ctx.arc(cx - 3, cy, 3, 0, Math.PI * 2);
        ctx.arc(cx + 3, cy, 3, 0, Math.PI * 2);
        ctx.stroke();
        const angles = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];
        angles.forEach(a => {
          ctx.beginPath();
          ctx.arc(cx + Math.cos(a) * (r * 0.68), cy + Math.sin(a) * (r * 0.68), isHovered ? 2.2 : 1.8, 0, Math.PI * 2);
          ctx.fill();
        });
        break;
      }

      case 'typescript': {
        // Pure Frameless TypeScript Cyber Glyph
        ctx.fillStyle = '#38bdf8';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = isHovered ? 1.6 : 1.3;
        ctx.font = `900 ${isHovered ? '13px' : '11px'} "JetBrains Mono", monospace, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('TS', cx, cy + 0.5);

        // Sleek cyber angle brackets
        const bOff = isHovered ? 11 : 9.5;
        const bH = isHovered ? 6.5 : 5.5;
        ctx.beginPath();
        ctx.moveTo(cx - bOff + 2, cy - bH);
        ctx.lineTo(cx - bOff, cy);
        ctx.lineTo(cx - bOff + 2, cy + bH);
        ctx.moveTo(cx + bOff - 2, cy - bH);
        ctx.lineTo(cx + bOff, cy);
        ctx.lineTo(cx + bOff - 2, cy + bH);
        ctx.stroke();
        break;
      }

      case 'async-storage': {
        // Database Disk Stack
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = isHovered ? 1.6 : 1.3;
        ctx.beginPath();
        ctx.ellipse(cx, cy - 4, 6.5, 2.4, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(cx, cy, 6.5, 2.4, 0, 0, Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(cx, cy + 4, 6.5, 2.4, 0, 0, Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - 6.5, cy - 4); ctx.lineTo(cx - 6.5, cy + 4);
        ctx.moveTo(cx + 6.5, cy - 4); ctx.lineTo(cx + 6.5, cy + 4);
        ctx.stroke();
        break;
      }

      case 'jwt-auth': {
        // Security Shield with Keyhole
        ctx.strokeStyle = '#f59e0b';
        ctx.fillStyle = '#f59e0b';
        ctx.lineWidth = isHovered ? 1.6 : 1.3;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 7);
        ctx.lineTo(cx + 6, cy - 4);
        ctx.lineTo(cx + 5, cy + 2.5);
        ctx.quadraticCurveTo(cx, cy + 7, cx, cy + 7);
        ctx.quadraticCurveTo(cx, cy + 7, cx - 5, cy + 2.5);
        ctx.lineTo(cx - 6, cy - 4);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, cy - 0.8, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(cx, cy - 0.8); ctx.lineTo(cx, cy + 3);
        ctx.stroke();
        break;
      }

      case 'ai-ocr': {
        // Neural AI Sparkle & Scan Lens
        ctx.strokeStyle = '#ec4899';
        ctx.fillStyle = '#ec4899';
        ctx.lineWidth = isHovered ? 1.6 : 1.3;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 7);
        ctx.quadraticCurveTo(cx, cy, cx + 7, cy);
        ctx.quadraticCurveTo(cx, cy, cx, cy + 7);
        ctx.quadraticCurveTo(cx, cy, cx - 7, cy);
        ctx.quadraticCurveTo(cx, cy, cx - 7, cy);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx + 5, cy - 5, 1.3, 0, Math.PI * 2);
        ctx.arc(cx - 5, cy + 5, 1.3, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      case 'nodejs': {
        // Node.js Hexagon
        ctx.strokeStyle = '#22c55e';
        ctx.fillStyle = '#22c55e';
        ctx.lineWidth = isHovered ? 1.6 : 1.3;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3 - Math.PI / 6;
          const hx = cx + Math.cos(angle) * (r * 0.82);
          const hy = cy + Math.sin(angle) * (r * 0.82);
          if (i === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, cy, 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      case 'postgresql': {
        // PostgreSQL Database Elephant Icon
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = isHovered ? 1.6 : 1.3;
        ctx.beginPath();
        ctx.arc(cx, cy - 1, 5.5, Math.PI * 0.8, Math.PI * 2.2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx + 4.5, cy - 1);
        ctx.quadraticCurveTo(cx + 6, cy + 3.8, cx + 2, cy + 5.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx - 2.8, cy - 1, 2.5, 0, Math.PI * 2);
        ctx.stroke();
        break;
      }

      case 'flashlist': {
        // Lightning Bolt Speed Icon
        ctx.fillStyle = '#00f0ff';
        ctx.beginPath();
        ctx.moveTo(cx + 1.8, cy - 7.5);
        ctx.lineTo(cx - 5, cy);
        ctx.lineTo(cx - 0.5, cy);
        ctx.lineTo(cx - 2, cy + 7.5);
        ctx.lineTo(cx + 5, cy - 0.5);
        ctx.lineTo(cx + 0.5, cy - 0.5);
        ctx.closePath();
        ctx.fill();
        break;
      }

      case 'git-android': {
        // Git Branch Fork with 3 Nodes
        ctx.strokeStyle = '#f87171';
        ctx.fillStyle = '#f87171';
        ctx.lineWidth = isHovered ? 1.6 : 1.3;
        ctx.beginPath();
        ctx.moveTo(cx - 3.8, cy - 6);
        ctx.lineTo(cx - 3.8, cy + 6);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - 3.8, cy + 1.2);
        ctx.quadraticCurveTo(cx + 3.8, cy, cx + 3.8, cy - 4);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx - 3.8, cy - 6, 1.8, 0, Math.PI * 2);
        ctx.arc(cx - 3.8, cy + 6, 1.8, 0, Math.PI * 2);
        ctx.arc(cx + 3.8, cy - 4, 1.8, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      default: {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  /**
   * Draw 10 Stationary Floating Holographic Tech Logos Floating Inside the Blue Glass Fluid
   */
  drawSkillBadges(ctx, cx, cy, podWidth, podHeight, time) {
    this.renderedSkillBounds = [];
    const podRadius = podWidth / 2;

    this.skillsData.forEach((skill) => {
      const isLeft = skill.side === 'left';
      const isHovered = this.hoveredSkill && this.hoveredSkill.id === skill.id;

      // Zero-G Levitation Physics inside fluid
      const floatY = Math.sin(time * skill.floatSpeed + skill.phase) * skill.floatAmp;
      const floatX = Math.cos(time * (skill.floatSpeed * 0.7) + skill.phase) * (skill.floatAmp * 0.4);

      // Stationed coordinate directly INSIDE the blue glass cylinder
      const baseX = isLeft
        ? cx - podRadius * skill.radRatio + floatX
        : cx + podRadius * skill.radRatio + floatX;
      const baseY = cy + skill.vertRatio * (podHeight * 0.84) + floatY;

      const size = isHovered ? 26 : 20;
      const hitRadius = isHovered ? 16 : 13;

      // Save hit target bounding box for mouse hover & click
      this.renderedSkillBounds.push({
        skill: skill,
        x: baseX - hitRadius,
        y: baseY - hitRadius,
        w: hitRadius * 2,
        h: hitRadius * 2
      });

      ctx.save();

      // Soft Holographic Glow Aura behind floating logo (no rectangular box!)
      const aura = ctx.createRadialGradient(baseX, baseY, 2, baseX, baseY, isHovered ? 20 : 11);
      aura.addColorStop(0, isHovered ? `${skill.color}66` : `${skill.color}25`);
      aura.addColorStop(1, 'transparent');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(baseX, baseY, isHovered ? 20 : 11, 0, Math.PI * 2);
      ctx.fill();

      // Draw Pure Floating Vector Tech Logo (No boxes or borders)
      const logoX = baseX - size / 2;
      const logoY = baseY - size / 2;
      this.drawSkillLogo(ctx, skill.id, logoX, logoY, size, skill.color, isHovered);

      ctx.restore();
    });
  }

  destroy() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
