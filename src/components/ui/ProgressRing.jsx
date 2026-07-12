import React from 'react';

/**
 * Animated SVG circular progress ring with glow effect.
 * Props:
 * - percentage: number (0-100)
 * - size: number (default 90)
 * - strokeWidth: number (default 7)
 * - color: string (Tailwind stroke class, e.g. 'stroke-emerald-500')
 * - trailColor: string (Tailwind stroke class for background ring)
 * - label: string (text in center)
 * - sublabel: string (small text below the number)
 */
const ProgressRing = ({
  percentage,
  size = 90,
  strokeWidth = 7,
  color = 'stroke-emerald-500',
  trailColor = 'stroke-slate-800/60',
  label,
  sublabel
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(100, Math.max(0, percentage)) / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background Circle */}
        <circle
          className={trailColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress Circle */}
        <circle
          className={`${color} transition-all duration-700 ease-out`}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ filter: 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.25))' }}
        />
      </svg>
      {/* Center Text Label */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-white font-extrabold text-base tracking-tight leading-none">
          {label !== undefined ? label : `${Math.round(percentage)}%`}
        </span>
        {sublabel && (
          <span className="text-[9px] text-slate-500 font-medium mt-0.5">{sublabel}</span>
        )}
      </div>
    </div>
  );
};

export default ProgressRing;
