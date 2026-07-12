import React from 'react';

/**
 * Generic wrapper for a chart in dark-mode style.
 * Props:
 *   - title: string – chart title
 *   - subtitle: string - optional description
 *   - children: ReactNode – chart component
 */
const ChartCard = ({ title, subtitle, children }) => (
  <div className="bg-gradient-to-b from-slate-900/90 to-slate-900/60 rounded-xl p-5 border border-slate-800/80 shadow-xl flex flex-col h-full hover:border-slate-700/60 transition-colors">
    <div className="mb-4">
      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">{title}</h3>
      {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
    </div>
    <div className="flex-1 min-h-[250px] w-full flex items-center justify-center">
      {children}
    </div>
  </div>
);

export default ChartCard;
