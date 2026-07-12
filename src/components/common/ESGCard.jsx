import React from 'react';

const ESGCard = ({
  title,
  subtitle,
  color = 'emerald',
  children,
  actions,
  className = ''
}) => {
  const colorGradients = {
    emerald: 'from-emerald-500/8 via-transparent to-transparent',
    cyan: 'from-cyan-500/8 via-transparent to-transparent',
    blue: 'from-blue-500/8 via-transparent to-transparent',
    purple: 'from-purple-500/8 via-transparent to-transparent',
    amber: 'from-amber-500/8 via-transparent to-transparent'
  };

  const topBorders = {
    emerald: 'bg-emerald-500',
    cyan: 'bg-cyan-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    amber: 'bg-amber-500'
  };

  return (
    <div className={`group relative overflow-hidden bg-gradient-to-br ${colorGradients[color] || colorGradients.emerald} backdrop-blur-xl bg-slate-900/70 border border-slate-700/40 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-xl ${className}`}>
      {/* Dynamic top bar */}
      <div className={`absolute top-0 left-0 right-0 h-[2.5px] ${topBorders[color] || topBorders.emerald} opacity-40 group-hover:opacity-75 transition-opacity duration-350`} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div>
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        )}
      </div>

      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

export default ESGCard;
