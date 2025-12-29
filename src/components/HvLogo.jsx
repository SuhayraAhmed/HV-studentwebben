// src/components/HvLogo.jsx 
import React from 'react';
import hvLogo from '../assets/logo.png'; // This should now be hvlogo.png

const HvLogo = ({ 
  size = 'md', 
  invert = false, 
  withText = false,
  showSubtitle = false,
  className = '',
  monochrome = false
}) => {
  const sizeClasses = {
    xs: 'h-6',
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-20',
    '2xl': 'h-24'
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={hvLogo}
        alt="Högskolan Väst"
        className={`${sizeClasses[size]} w-auto ${invert ? 'invert brightness-0' : ''} ${monochrome ? 'grayscale' : ''} transition-opacity hover:opacity-90`}
        loading="lazy"
      />
      {withText && (
        <div className="flex flex-col">
          <span className={`font-bold text-[#003366] ${textSizeClasses[size]} tracking-tight`}>
            HÖGSKOLAN VÄST
          </span>
          {showSubtitle && (
            <span className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Studentwebb
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default HvLogo;