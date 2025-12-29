import React from 'react';

const Button = React.forwardRef(({ 
  className = '', 
  variant = 'default', 
  size = 'default',
  children, 
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    default: 'bg-[#0066CC] text-white hover:bg-[#0055aa]',
    outline: 'border border-[#0066CC] text-[#0066CC] hover:bg-[#E8F4FC]',
    ghost: 'hover:bg-slate-100 text-slate-600',
    secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200',
  };
  
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-3 text-sm',
    lg: 'h-12 px-8 text-lg',
    icon: 'h-10 w-10',
  };

  return (
    <button
      ref={ref}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} rounded-lg`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };