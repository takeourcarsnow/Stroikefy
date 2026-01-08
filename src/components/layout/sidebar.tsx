'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useSidebarStore, useAuthStore } from '@/store';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  DollarSign,
  Package,
  FileText,
  Map,
  Settings,
  ChevronLeft,
  HardHat,
  X,
  Clock,
  Upload,
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Workforce', href: '/workforce', icon: Users },
  { name: 'Time Tracking', href: '/time-tracking', icon: Clock },
  { name: 'Finance', href: '/finance', icon: DollarSign },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Map', href: '/map', icon: Map },
  { name: 'Import/Export', href: '/import-export', icon: Upload },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, isCollapsed, close, setCollapsed } = useSidebarStore();
  const { permissions } = useAuthStore();

  // Filter navigation based on permissions
  const filteredNav = navigationItems.filter((item) => {
    if (!permissions) return true;
    if (item.href === '/finance' && !permissions.canManageFinance && !permissions.canViewReports) return false;
    if (item.href === '/workforce' && !permissions.canManageWorkforce) return false;
    if (item.href === '/inventory' && !permissions.canManageInventory) return false;
    if (item.href === '/settings' && !permissions.canManageSettings) return false;
    return true;
  });

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-800 transition-all duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          isCollapsed ? 'lg:w-20' : 'lg:w-64',
          'w-64'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-surface-200 dark:border-surface-800">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary-600 flex items-center justify-center">
              <HardHat className="h-6 w-6 text-white" />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-xl text-surface-900 dark:text-white">
                Stroikefy
              </span>
            )}
          </Link>
          
          {/* Mobile close button */}
          <button
            onClick={close}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800"
          >
            <X className="h-5 w-5" />
          </button>
          
          {/* Collapse button (desktop only) */}
          <button
            onClick={() => setCollapsed(!isCollapsed)}
            className="hidden lg:flex p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
          >
            <ChevronLeft className={cn('h-5 w-5 transition-transform', isCollapsed && 'rotate-180')} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {filteredNav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => close()}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all',
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                    : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-100'
                )}
              >
                <item.icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'text-primary-600 dark:text-primary-400')} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
