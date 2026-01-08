'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
  className,
}) => {
  const variants = {
    info: {
      container: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
      icon: <Info className="h-5 w-5 text-blue-500" />,
      title: 'text-blue-800 dark:text-blue-300',
      content: 'text-blue-700 dark:text-blue-400',
    },
    success: {
      container: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      title: 'text-green-800 dark:text-green-300',
      content: 'text-green-700 dark:text-green-400',
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      title: 'text-yellow-800 dark:text-yellow-300',
      content: 'text-yellow-700 dark:text-yellow-400',
    },
    error: {
      container: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      title: 'text-red-800 dark:text-red-300',
      content: 'text-red-700 dark:text-red-400',
    },
  };

  const style = variants[variant];

  return (
    <div
      className={cn(
        'flex gap-3 p-4 rounded-lg border',
        style.container,
        className
      )}
    >
      <div className="flex-shrink-0">{style.icon}</div>
      <div className="flex-1">
        {title && (
          <h4 className={cn('font-semibold mb-1', style.title)}>{title}</h4>
        )}
        <div className={cn('text-sm', style.content)}>{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded hover:bg-black/5 dark:hover:bg-white/5"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
