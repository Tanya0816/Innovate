import React from 'react';
import * as Icons from 'lucide-react';

/**
 * Reusable KPI Card designed for dark themes.
 * Props:
 * - title: string – card title
 * - value: string – percentage or metric
 * - trend: 'up' | 'down' | 'neutral' – indicates direction
 * - description: string – small subtitle
 * - icon: string – name of Lucide icon
 * - color: 'emerald' | 'blue' | 'purple' | 'slate' – theme accent
 */
const StatCard = ({ title, value, trend, description, icon, color = 'emerald' }) => {
  const IconComponent = Icons[icon] || Icons['Info'];
  const TrendIcon = trend === 'up' ? Icons['TrendingUp'] : trend === 'down' ? Icons['TrendingDown'] : Icons['Minus'];
  
  const trendColor = trend === 'up' 
    ? 'text-emerald-400' 
    : trend === 'down' 
      ? 'text-rose-400' 
      : 'text-slate-400';

  const colorVariants = {
    emerald: 'border-l-4 border-l-emerald-500 bg-gradient-to-br from-slate-900/90 to-slate-900/60 shadow-lg shadow-emerald-950/5',
    blue: 'border-l-4 border-l-blue-500 bg-gradient-to-br from-slate-900/90 to-slate-900/60 shadow-lg shadow-blue-950/5',
    purple: 'border-l-4 border-l-purple-500 bg-gradient-to-br from-slate-900/90 to-slate-900/60 shadow-lg shadow-purple-950/5',
    slate: 'border-l-4 border-l-slate-500 bg-gradient-to-br from-slate-900/90 to-slate-900/60 shadow-lg shadow-slate-950/5'
  };

  const iconBgColors = {
    emerald: 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/35',
    blue: 'bg-blue-950/50 text-blue-400 border border-blue-800/35',
    purple: 'bg-purple-950/50 text-purple-400 border border-purple-800/35',
    slate: 'bg-slate-950/50 text-slate-400 border border-slate-800/35'
  };

  return (
    <div className={`rounded-xl p-5 border border-slate-800/70 backdrop-blur-md flex items-center space-x-4 transition-all duration-300 hover:scale-[1.02] hover:border-slate-700/80 ${colorVariants[color]}`}>
      <div className={`p-3 rounded-xl ${iconBgColors[color]}`}>
        <IconComponent size={24} strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider truncate">{title}</h3>
        <p className="text-3xl font-extrabold text-slate-100 tracking-tight mt-1">{value}</p>
        <p className="text-xs text-slate-400 flex items-center mt-1.5 font-medium">
          <TrendIcon className={`mr-1 ${trendColor}`} size={14} />
          <span className="truncate">{description}</span>
        </p>
      </div>
    </div>
  );
};

export default StatCard;
