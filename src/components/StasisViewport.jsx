import React, { useEffect, useRef, useState } from 'react';
import { Zap, Scan, Crosshair, Sparkles } from 'lucide-react';
import { StasisChamberScene } from '../scene/stasisChamber';

export const StasisViewport = ({ onSkillSelect, onShowToast }) => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isOvercharged, setIsOvercharged] = useState(false);
  const [isXRay, setIsXRay] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      const scene = new StasisChamberScene(canvasRef.current.id, (skillData) => {
        if (skillData && skillData.name) {
          onSkillSelect(skillData.name);
        }
      });

      // Hook into hover changes
      const originalShow = scene.showSkillTooltip.bind(scene);
      const originalHide = scene.hideSkillTooltip.bind(scene);

      scene.showSkillTooltip = (skill) => {
        originalShow(skill);
        setHoveredSkill(skill);
      };

      scene.hideSkillTooltip = () => {
        originalHide();
        setHoveredSkill(null);
      };

      sceneRef.current = scene;
    } catch (err) {
      console.warn('Stasis Chamber Scene Init Warning:', err);
    }

    return () => {
      if (sceneRef.current) {
        sceneRef.current.destroy();
        sceneRef.current = null;
      }
    };
  }, [onSkillSelect]);

  const handleOvercharge = () => {
    if (sceneRef.current) {
      const over = sceneRef.current.triggerOvercharge();
      setIsOvercharged(over);
      if (onShowToast) {
        onShowToast(over ? 'Energy Surge Active' : 'Stasis Core Nominal', 'zap');
      }
    }
  };

  const handleScanToggle = () => {
    if (sceneRef.current) {
      const scan = sceneRef.current.toggleScanMode();
      setIsXRay(scan);
      if (onShowToast) {
        onShowToast(scan ? 'Wireframe X-Ray Enabled' : 'Standard Shading Active', 'scan');
      }
    }
  };

  const handleResetCam = () => {
    if (sceneRef.current) {
      sceneRef.current.resetCamera();
      if (onShowToast) {
        onShowToast('Camera Perspective Reset', 'crosshair');
      }
    }
  };

  return (
    <aside className="stasis-stage-aside" id="stasisViewportContainer">
      {/* 3D Canvas Layer */}
      <div className="canvas-wrapper" id="canvasWrapper">
        <canvas
          ref={canvasRef}
          id="stasisCanvas"
          aria-label="3D Stylized Stasis Chamber"
        ></canvas>
      </div>

      {/* 3D HUD Stage Overlays */}
      <div className="stasis-stage-overlay" id="stasisHudOverlay">
        {/* Hover Tooltip Card */}
        <div
          className={`hover-skill-card ${hoveredSkill ? 'active' : ''}`}
          id="skillInspectHud"
        >
          <div className="skill-tag-lbl">3D TECH NODE HOVERED</div>
          <div className="skill-tag-title" id="inspectSkillName">
            {hoveredSkill ? hoveredSkill.name : 'React Native'}
          </div>
          <div className="skill-tag-desc" id="inspectSkillDesc">
            {hoveredSkill ? `${hoveredSkill.category} // ${hoveredSkill.desc}` : 'Core Mobile Architecture & Hybrid UI Engineering'}
          </div>
        </div>

        {/* Interactive Action Controls */}
        <div className="stasis-hud-controls">
          <button
            className={`stage-control-btn ${isOvercharged ? 'active' : ''}`}
            id="stasisOverchargeBtn"
            onClick={handleOvercharge}
            title="Surge Stasis Energy"
          >
            <Zap size={14} />
            <span>Energy Surge</span>
          </button>
          <button
            className={`stage-control-btn ${isXRay ? 'active' : ''}`}
            id="stasisScanBtn"
            onClick={handleScanToggle}
            title="Toggle Wireframe X-Ray"
          >
            <Scan size={14} />
            <span>Wireframe X-Ray</span>
          </button>
          <button
            className="stage-control-btn"
            id="stasisResetCamBtn"
            onClick={handleResetCam}
            title="Reset Camera Perspective"
          >
            <Crosshair size={14} />
            <span>Reset Cam</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
