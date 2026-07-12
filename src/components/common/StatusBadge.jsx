import React from 'react';

const StatusBadge = ({ status = '', className = '' }) => {
  const getBadgeStyles = (val) => {
    const s = val.toLowerCase().trim();
    if (s === 'active' || s === 'on track' || s === 'approved' || s === 'resolved' || s === 'completed' || s === 'success') {
      return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    }
    if (s === 'planned' || s === 'scheduled' || s === 'under review' || s === 'info') {
      return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
    }
    if (s === 'behind plan' || s === 'pending' || s === 'warning') {
      return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    }
    if (s === 'danger' || s === 'rejected' || s === 'failed' || s === 'open' || s === 'high' || s === 'critical') {
      return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    }
    return 'text-slate-450 bg-slate-500/10 border-slate-500/20';
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${getBadgeStyles(status)} ${className}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
