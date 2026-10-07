import React from 'react';
import { X, Cpu, Layers } from 'lucide-react';
import { projectArchitectures } from './archModal';

export const ArchModal = ({ projectKey, isOpen, onClose }) => {
  if (!isOpen || !projectKey) return null;

  const data = projectArchitectures[projectKey];
  if (!data) return null;

  return (
    <div
      className="modal-backdrop open"
      id="archModalBackdrop"
      onClick={(e) => {
        if (e.target.id === 'archModalBackdrop') onClose();
      }}
    >
      <div className="modal-window">
        <div className="modal-top">
          <div className="modal-heading" id="archModalTitle">{data.title}</div>
          <button className="close-btn" onClick={onClose} title="Close Modal">
            <X size={18} />
          </button>
        </div>
        <div
          className="arch-modal-content"
          id="archModalBody"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </div>
    </div>
  );
};
