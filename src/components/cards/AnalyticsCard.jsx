import React from 'react';

/**
 * Glassmorphism analytics card wrapper for charts.
 * Props:
 * - title: string
 * - subtitle: string
 * - actions: ReactNode
 * - children: ReactNode
 */
const AnalyticsCard = ({ title, subtitle, actions, children }) => {
  return (
    <div className="group relative overflow-hidden bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-6 shadow-lg flex flex-col justify-between h-full hover:border-slate-600/50 hover:shadow-xl transition-all duration-500">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 via-transparent to-slate-900/40 pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-700/30 mb-5">
        <div>
          <h3 className="text-[13px] font-bold text-slate-200 uppercase tracking-wider">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[11px] text-slate-500 font-medium mt-1">
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

      <div className="relative z-10 flex-1 w-full min-h-[220px] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default AnalyticsCard;
