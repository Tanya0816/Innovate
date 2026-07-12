import React from 'react';
import * as Icons from 'lucide-react';

/**
 * Enterprise ESG KPI card with glassmorphism and gradient accents.
 * Props:
 * - title: string
 * - value: string | number
 * - change: string | number (e.g. "-8.4%" or "+4.2%")
 * - trend: 'up' | 'down' | 'neutral'
 * - trendType: 'positive-is-up' | 'positive-is-down'
 * - icon: string
 * - color: 'emerald' | 'blue' | 'purple' | 'amber' | 'cyan' | 'teal'
 * - subtitle: string
 */
const ESGMetricCard = ({
  title,
  value,
  change,
  trend,
  trendType = 'positive-is-up',
  icon,
  color = 'emerald',
  subtitle
}) => {
  const IconComponent = Icons[icon] || Icons.HelpCircle;
  const TrendIcon = trend === 'up' ? Icons.ArrowUpRight : trend === 'down' ? Icons.ArrowDownRight : Icons.Minus;

  // Determine trend color
  let isPositive = false;
  if (trend === 'up' && trendType === 'positive-is-up') isPositive = true;
  if (trend === 'down' && trendType === 'positive-is-down') isPositive = true;

  const trendColorClass = trend === 'neutral'
    ? 'text-slate-400 bg-slate-800/50 border-slate-700/40'
    : isPositive
      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
      : 'text-rose-400 bg-rose-500/10 border-rose-500/20';

  const colorConfig = {
    emerald: {
      gradient: 'from-emerald-500/8 via-transparent to-transparent',
      border: 'hover:border-emerald-500/30',
      glow: 'hover:shadow-emerald-500/5',
      iconBg: 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/10',
      accent: 'bg-emerald-500',
    },
    blue: {
      gradient: 'from-blue-500/8 via-transparent to-transparent',
      border: 'hover:border-blue-500/30',
      glow: 'hover:shadow-blue-500/5',
      iconBg: 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/20 shadow-blue-500/10',
      accent: 'bg-blue-500',
    },
    purple: {
      gradient: 'from-purple-500/8 via-transparent to-transparent',
      border: 'hover:border-purple-500/30',
      glow: 'hover:shadow-purple-500/5',
      iconBg: 'bg-gradient-to-br from-purple-500/20 to-purple-600/10 text-purple-400 border-purple-500/20 shadow-purple-500/10',
      accent: 'bg-purple-500',
    },
    amber: {
      gradient: 'from-amber-500/8 via-transparent to-transparent',
      border: 'hover:border-amber-500/30',
      glow: 'hover:shadow-amber-500/5',
      iconBg: 'bg-gradient-to-br from-amber-500/20 to-amber-600/10 text-amber-400 border-amber-500/20 shadow-amber-500/10',
      accent: 'bg-amber-500',
    },
    cyan: {
      gradient: 'from-cyan-500/8 via-transparent to-transparent',
      border: 'hover:border-cyan-500/30',
      glow: 'hover:shadow-cyan-500/5',
      iconBg: 'bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 text-cyan-400 border-cyan-500/20 shadow-cyan-500/10',
      accent: 'bg-cyan-500',
    },
    teal: {
      gradient: 'from-teal-500/8 via-transparent to-transparent',
      border: 'hover:border-teal-500/30',
      glow: 'hover:shadow-teal-500/5',
      iconBg: 'bg-gradient-to-br from-teal-500/20 to-teal-600/10 text-teal-400 border-teal-500/20 shadow-teal-500/10',
      accent: 'bg-teal-500',
    },
  };

  const cfg = colorConfig[color] || colorConfig.emerald;

  return (
    <div className={`group relative overflow-hidden bg-gradient-to-br ${cfg.gradient} backdrop-blur-xl bg-slate-900/70 border border-slate-700/40 rounded-2xl p-5 shadow-lg transition-all duration-500 hover:scale-[1.03] ${cfg.border} ${cfg.glow} hover:shadow-xl`}>
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${cfg.accent} opacity-40 group-hover:opacity-70 transition-opacity duration-500`} />

      <div className="flex items-start justify-between mb-4">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider leading-tight max-w-[70%]">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl border shadow-lg ${cfg.iconBg}`}>
          <IconComponent size={18} strokeWidth={2} />
        </div>
      </div>

      <div className="flex items-end justify-between gap-2">
        <span className="text-[22px] font-extrabold text-white tracking-tight leading-none">
          {value}
        </span>

        {change && (
          <span className={`inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold border ${trendColorClass}`}>
            <TrendIcon size={12} className="mr-0.5" />
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-[10px] text-slate-500 font-medium mt-3 flex items-center">
          <Icons.Info size={11} className="mr-1 text-slate-600 flex-shrink-0" />
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default ESGMetricCard;
