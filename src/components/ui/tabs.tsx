'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode; count?: number }[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
  className,
}) => {
  const baseStyles = {
    default: 'border-b border-surface-200 dark:border-surface-700',
    pills: 'bg-surface-100 dark:bg-surface-800 p-1 rounded-lg',
    underline: '',
  };

  const tabStyles = {
    default: (isActive: boolean) => cn(
      'px-4 py-2.5 text-sm font-medium transition-colors relative',
      isActive
        ? 'text-primary-600 dark:text-primary-400'
        : 'text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-300',
      isActive && 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 dark:after:bg-primary-400'
    ),
    pills: (isActive: boolean) => cn(
      'px-4 py-2 text-sm font-medium rounded-md transition-all',
      isActive
        ? 'bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 shadow-sm'
        : 'text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-300'
    ),
    underline: (isActive: boolean) => cn(
      'px-4 py-2.5 text-sm font-medium transition-colors border-b-2',
      isActive
        ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
        : 'border-transparent text-surface-500 hover:text-surface-700 hover:border-surface-300 dark:text-surface-400'
    ),
  };

  return (
    <div className={cn('flex gap-0.5', baseStyles[variant], className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={tabStyles[variant](activeTab === tab.id)}
        >
          <span className="flex items-center gap-2">
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn(
                'px-1.5 py-0.5 text-xs rounded-full',
                activeTab === tab.id
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                  : 'bg-surface-200 text-surface-600 dark:bg-surface-700 dark:text-surface-400'
              )}>
                {tab.count}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
};
