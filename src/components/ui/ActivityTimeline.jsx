import React from 'react';
import * as Icons from 'lucide-react';

/**
 * Premium vertical activity timeline with gradient connectors.
 * Props:
 * - activities: array of objects { id, text, type, time }
 */
const ActivityTimeline = ({ activities = [] }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return {
          Component: Icons.CheckCircle2,
          colorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25 shadow-emerald-500/10',
        };
      case 'warning':
        return {
          Component: Icons.AlertTriangle,
          colorClass: 'text-amber-400 bg-amber-500/10 border-amber-500/25 shadow-amber-500/10',
        };
      case 'danger':
        return {
          Component: Icons.AlertOctagon,
          colorClass: 'text-rose-400 bg-rose-500/10 border-rose-500/25 shadow-rose-500/10',
        };
      default:
        return {
          Component: Icons.Activity,
          colorClass: 'text-slate-400 bg-slate-500/10 border-slate-500/25 shadow-slate-500/10',
        };
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {activities.map((act, actIdx) => {
          const { Component, colorClass } = getIcon(act.type);
          const isLast = actIdx === activities.length - 1;

          return (
            <li key={act.id}>
              <div className="relative pb-7">
                {/* Gradient connector line */}
                {!isLast && (
                  <span
                    className="absolute top-5 left-[15px] h-full w-px bg-gradient-to-b from-slate-700 to-slate-800/30"
                    aria-hidden="true"
                  />
                )}

                <div className="relative flex space-x-3.5 items-start group">
                  <div>
                    <span className={`h-8 w-8 rounded-lg flex items-center justify-center border shadow-lg ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
                      <Component size={14} strokeWidth={2.5} />
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 pt-0.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-[11px] text-slate-300 font-medium leading-relaxed group-hover:text-slate-200 transition-colors duration-200">
                        {act.text}
                      </p>
                    </div>
                    <div className="text-right text-[10px] text-slate-600 font-medium whitespace-nowrap self-start">
                      {act.time}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ActivityTimeline;
