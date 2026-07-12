import React from 'react';

// ==========================================
// BUTTON COMPONENT
// ==========================================
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm hover:shadow-emerald-900/20',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm',
    outline: 'bg-transparent border border-slate-700 text-slate-300 hover:bg-slate-800',
    success: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-sm',
    glass: 'bg-slate-900/60 backdrop-blur-md border border-slate-800 text-slate-200 hover:bg-slate-800/80',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// ==========================================
// INPUT COMPONENT
// ==========================================
export const Input = React.forwardRef(({
  label,
  error,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full flex flex-col space-y-1">
      {label && (
        <label className="text-xs font-semibold text-slate-400">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors ${error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-rose-500 font-medium">{error}</span>
      )}
    </div>
  );
});
Input.displayName = 'Input';

// ==========================================
// SELECT COMPONENT
// ==========================================
export const Select = React.forwardRef(({
  label,
  options = [],
  error,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full flex flex-col space-y-1">
      {label && (
        <label className="text-xs font-semibold text-slate-400">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors ${error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''} ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-slate-950 text-slate-200">
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs text-rose-500 font-medium">{error}</span>
      )}
    </div>
  );
});
Select.displayName = 'Select';

// ==========================================
// BADGE COMPONENT
// ==========================================
export const Badge = ({
  children,
  variant = 'info',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide border';
  
  const variants = {
    success: 'bg-emerald-950/40 border-emerald-800 text-emerald-400',
    info: 'bg-blue-950/40 border-blue-800 text-blue-400',
    warning: 'bg-amber-950/40 border-amber-800 text-amber-400',
    danger: 'bg-rose-950/40 border-rose-800 text-rose-400',
    neutral: 'bg-slate-900/60 border-slate-800 text-slate-400',
    purple: 'bg-purple-950/40 border-purple-800 text-purple-400',
    cyan: 'bg-cyan-950/40 border-cyan-800 text-cyan-400',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// ==========================================
// MODAL COMPONENT
// ==========================================
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Content */}
      <div className={`relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-6 transition-all transform duration-300 z-10 ${className}`}>
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-slate-200">{title}</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// TABS COMPONENT
// ==========================================
export const Tabs = ({
  tabs = [],
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex border-b border-slate-800 mb-6 overflow-x-auto scrollbar-none ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-200 -mb-[2px] ${
              isActive 
                ? 'border-emerald-500 text-emerald-400 font-bold' 
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
