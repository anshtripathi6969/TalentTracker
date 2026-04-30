import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`h-[34px] px-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple/30 focus:border-neon-purple/50 text-[13px] text-white placeholder:text-white/30 transition-all duration-200 backdrop-blur-sm ${className}`}
      {...props}
    />
  )
);
Input.displayName = 'Input';
