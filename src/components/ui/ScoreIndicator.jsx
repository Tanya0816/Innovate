import React from 'react';

/**
 * Premium score indicator bar with glassmorphism.
 * Props:
 * - score: number (0-100)
 * - title: string
 * - color: 'emerald' | 'blue' | 'purple' | 'teal'
 * - details: string
 */
const ScoreIndicator = ({
  score,
  title,
  color = 'emerald',
  details
}) => {
  const colorConfig = {
    emerald: {
      bar: 'bg-gradient-to-r from-emerald-500 to-emerald-400',
      text: 'text-emerald-400',
      glow: 'shadow-emerald-500/20',
    },
    blue: {
      bar: 'bg-gradient-to-r from-blue-500 to-cyan-400',
      text: 'text-blue-400',
      glow: 'shadow-blue-500/20',
    },
    purple: {
      bar: 'bg-gradient-to-r from-purple-500 to-violet-400',
      text: 'text-purple-400',
      glow: 'shadow-purple-500/20',
    },
    teal: {
      bar: 'bg-gradient-to-r from-teal-500 to-teal-400',
      text: 'text-teal-400',
      glow: 'shadow-teal-500/20',
    },
  };

  const cfg = colorConfig[color] || colorConfig.emerald;

  const getRatingGrade = (val) => {
    if (val >= 90) return { label: 'Excellent', badge: 'A' };
    if (val >= 80) return { label: 'Satisfactory', badge: 'B' };
    if (val >= 70) return { label: 'Needs Review', badge: 'C' };
    return { label: 'Underperforming', badge: 'D' };
  };

  const grade = getRatingGrade(score);

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-xl p-4 space-y-3 hover:border-slate-600/40 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
          {title}
        </span>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-black ${cfg.text}`}>
            {score}%
          </span>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${cfg.text} bg-slate-800 border border-slate-700/50`}>
            {grade.badge}
          </span>
        </div>
      </div>

      <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full ${cfg.bar} ${cfg.glow} shadow-sm transition-all duration-700 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
        <span>{grade.label}</span>
        {details && <span className="truncate max-w-[150px]">{details}</span>}
      </div>
    </div>
  );
};

export default ScoreIndicator;
