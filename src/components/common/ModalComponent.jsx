import React from 'react';
import { X } from 'lucide-react';

const ModalComponent = ({
  isOpen = false,
  onClose,
  title,
  children,
  className = ''
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Dialog container */}
      <div className={`relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-10 overflow-hidden transform transition-all duration-300 scale-100 ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/60 bg-slate-950/30">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-4 max-h-[75vh] overflow-y-auto scrollbar-thin">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
