'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/store';
import { Sidebar } from './sidebar';
import { Header } from './header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isCollapsed } = useSidebarStore();

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
      <Sidebar />
      
      <div
        className={cn(
          'transition-all duration-300',
          isCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        )}
      >
        <Header />
        
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
