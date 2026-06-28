import React from 'react';
import { motion } from 'motion/react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  glowColor?: 'orange' | 'amber' | 'none';
  id?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  onClick,
  hoverEffect = true,
  glowColor = 'none',
  id,
}) => {
  const glowStyles = {
    orange: 'hover:shadow-[0_0_20px_rgba(247,147,26,0.15)] border-orange-500/10 dark:border-orange-500/20',
    amber: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] border-amber-500/10 dark:border-amber-500/20',
    none: 'hover:shadow-md border-slate-200/50 dark:border-slate-800/50',
  };

  return (
    <motion.div
      id={id}
      whileHover={hoverEffect ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl border bg-white/70 dark:bg-slate-900/70 backdrop-blur-md
        shadow-sm transition-all duration-300
        ${glowStyles[glowColor]}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Subtle overlay accent */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-orange-500/5 dark:to-orange-400/5 pointer-events-none" />
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  );
};
