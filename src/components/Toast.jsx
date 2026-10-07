import React from 'react';
import { CheckCircle2, Zap, Scan, Crosshair, Copy, Info } from 'lucide-react';

export const Toast = ({ message, icon, isVisible }) => {
  const getIcon = () => {
    switch (icon) {
      case 'zap': return <Zap size={16} className="cyan-text" />;
      case 'scan': return <Scan size={16} className="cyan-text" />;
      case 'crosshair': return <Crosshair size={16} className="cyan-text" />;
      case 'copy': return <Copy size={16} className="cyan-text" />;
      default: return <CheckCircle2 size={16} className="cyan-text" />;
    }
  };

  return (
    <div className={`dev-toast ${isVisible ? 'show' : ''}`} id="hudToast">
      {getIcon()}
      <span id="toastMsg">{message}</span>
    </div>
  );
};
