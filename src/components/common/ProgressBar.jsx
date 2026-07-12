import React from 'react';

const ProgressBar = ({
  value = 0,
  max = 100,
  color = 'emerald',
  showText = true,
  className = ''
}) => {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const barColors = {
    emerald: 'bg-gradient-to-r from-emerald-500 to-emerald-400',
    cyan: 'bg-gradient-to-r from-cyan-500 to-cyan-400',
    blue: 'bg-gradient-to-r from-blue-500 to-blue-400',
    purple: 'bg-gradient-to-r from-purple-500 to-purple-400',
    amber: 'bg-gradient-to-r from-amber-500 to-amber-400',
    rose: 'bg-gradient-to-r from-rose-500 to-rose-400'
  };

  return (
    <div className={`flex items-center space-x-2.5 w-full ${className}`}>
      <div className="flex-1 bg-slate-950 border border-slate-800/80 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${barColors[color] || barColors.emerald}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showText && (
        <span className="font-mono text-[10px] text-slate-400 font-bold w-8 text-right flex-shrink-0">
          {pct}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
