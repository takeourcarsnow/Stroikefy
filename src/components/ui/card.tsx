'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700',
      bordered: 'bg-white dark:bg-surface-800 border-2 border-surface-300 dark:border-surface-600',
      elevated: 'bg-white dark:bg-surface-800 shadow-lg shadow-surface-200/50 dark:shadow-surface-900/50',
    };
    
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl',
          variants[variant],
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card Header
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  className,
  title,
  description,
  action,
  children,
  ...props
}) => {
  return (
    <div className={cn('flex items-start justify-between mb-4', className)} {...props}>
      <div>
        {title && (
          <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
            {title}
          </h3>
        )}
        {description && (
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
            {description}
          </p>
        )}
        {children}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

// Card Content
export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
};

// Card Footer
export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div 
      className={cn('mt-4 pt-4 border-t border-surface-200 dark:border-surface-700', className)} 
      {...props}
    >
      {children}
    </div>
  );
};
