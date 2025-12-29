import React from 'react';

export function Badge({ 
  variant = 'default', 
  className = '', 
  children 
}) {
  const variants = {
    default: 'bg-[#0066CC] text-white',
    secondary: 'bg-slate-100 text-slate-800',
    outline: 'border border-slate-200 text-slate-600',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}