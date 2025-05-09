import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  variant?: 'default' | 'elevated' | 'bordered';
  animate?: boolean;
}

export const Card = ({
  children,
  className,
  onClick,
  interactive = false,
  variant = 'default',
  animate = true,
}: CardProps) => {
  const baseStyles = 'rounded-xl overflow-hidden';
  
  const variantStyles = {
    default: 'bg-white dark:bg-gray-900 shadow-sm',
    elevated: 'bg-white dark:bg-gray-900 shadow-md',
    bordered: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800',
  };
  
  const interactiveStyles = interactive
    ? 'cursor-pointer transition-all hover:shadow-md'
    : '';

  return animate ? (
    <motion.div
      className={clsx(
        baseStyles,
        variantStyles[variant],
        interactiveStyles,
        className
      )}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={interactive ? { scale: 1.02 } : {}}
      whileTap={interactive ? { scale: 0.98 } : {}}
    >
      {children}
    </motion.div>
  ) : (
    <div
      className={clsx(
        baseStyles,
        variantStyles[variant],
        interactiveStyles,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};