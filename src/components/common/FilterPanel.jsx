import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

const FilterPanel = ({
  filters = [],
  activeFilters = {},
  onFilterChange,
  onReset,
  className = ''
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-3 bg-slate-900/30 border border-slate-800/60 rounded-xl p-3 shadow-md backdrop-blur-sm ${className}`}>
      <div className="flex items-center text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
        <Filter className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
        Filters
      </div>

      <div className="flex flex-wrap items-center gap-2 flex-1">
        {filters.map((f) => (
          <div key={f.key} className="w-40">
            <select
              value={activeFilters[f.key] || ''}
              onChange={(e) => onFilterChange(f.key, e.target.value)}
              className="px-3 py-1.5 w-full bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-350 focus:outline-none focus:border-emerald-500/80 transition-colors"
            >
              <option value="">{f.placeholder || `All ${f.label}`}</option>
              {f.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center text-[10px] font-bold text-slate-400 hover:text-emerald-400 transition-colors px-2 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700/60 bg-slate-950/40"
        >
          <RotateCcw className="w-3 h-3 mr-1" />
          Reset
        </button>
      )}
    </div>
  );
};

export default FilterPanel;
