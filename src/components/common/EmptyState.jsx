import React from 'react';
import * as Icons from 'lucide-react';
import ActionButton from './ActionButton';

const EmptyState = ({
  title = 'No records found',
  description = 'Try adjusting your search query or filters to find what you are looking for.',
  icon = 'FolderOpen',
  actionLabel,
  onAction,
  className = ''
}) => {
  const IconComponent = Icons[icon] || Icons.FolderOpen;

  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 bg-slate-900/30 border border-slate-800/50 rounded-2xl ${className}`}>
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-500 mb-4 shadow-inner">
        <IconComponent className="w-7 h-7" strokeWidth={1.5} />
      </div>
      <h4 className="text-sm font-bold text-slate-350 tracking-wide mb-1">
        {title}
      </h4>
      <p className="text-xs text-slate-500 max-w-xs leading-relaxed mb-6 font-medium">
        {description}
      </p>
      {actionLabel && onAction && (
        <ActionButton variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </ActionButton>
      )}
    </div>
  );
};

export default EmptyState;
