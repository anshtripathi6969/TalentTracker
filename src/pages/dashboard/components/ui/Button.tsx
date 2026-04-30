import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost';
  size?: 'default' | 'compact' | 'large';
}

export function Button({ variant = 'primary', size = 'default', className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none rounded-lg cursor-pointer select-none';

  const variants = {
    primary: 'bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-[0_2px_16px_rgba(176,38,255,0.3)] hover:shadow-[0_4px_24px_rgba(0,240,255,0.35)] active:translate-y-px hover:brightness-110',
    secondary: 'bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm active:translate-y-px',
    destructive: 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30 active:translate-y-px',
    ghost: 'bg-transparent text-white/50 hover:bg-white/5 hover:text-white/80',
  };

  const sizes = {
    default: 'h-[34px] px-4 text-[13px]',
    compact: 'h-[28px] px-3 text-[12px]',
    large: 'h-[40px] px-6 text-[14px]',
  };

  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
}
