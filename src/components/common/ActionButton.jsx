import React from 'react';
import * as Icons from 'lucide-react';

const ActionButton = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  const IconComponent = icon ? Icons[icon] : null;

  const baseStyles = 'inline-flex items-center justify-center font-bold tracking-wide rounded-xl transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-emerald-950/20 active:scale-95',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-95',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-md active:scale-95',
    ghost: 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40',
    glass: 'bg-slate-900/60 backdrop-blur-md border border-slate-850 text-slate-200 hover:bg-slate-850/80 active:scale-95'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-[10px]',
    md: 'px-4 py-2 text-xs',
    lg: 'px-5 py-2.5 text-sm'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {IconComponent && (
        <IconComponent 
          size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} 
          className={children ? 'mr-1.5' : ''} 
        />
      )}
      {children}
    </button>
  );
};

export default ActionButton;
