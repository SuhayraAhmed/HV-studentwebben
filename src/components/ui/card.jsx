import React from 'react';

export function Card({ className = '', children }) {
  return (
    <div className={`rounded-lg border border-slate-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children }) {
  return (
    <div className={`p-6 border-b border-slate-100 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ className = '', children }) {
  return (
    <h3 className={`text-lg font-semibold text-slate-800 ${className}`}>
      {children}
    </h3>
  );
}

export function CardContent({ className = '', children }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}