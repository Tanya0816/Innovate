import React from 'react';

const SeverityBadge = ({ severity = '', className = '' }) => {
  const getBadgeStyles = (val) => {
    const s = val.toLowerCase().trim();
    if (s === 'high' || s === 'critical' || s === 'severe') {
      return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    }
    if (s === 'medium' || s === 'moderate') {
      return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    }
    if (s === 'low' || s === 'minor') {
      return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
    }
    return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${getBadgeStyles(severity)} ${className}`}>
      {severity}
    </span>
  );
};

export default SeverityBadge;
