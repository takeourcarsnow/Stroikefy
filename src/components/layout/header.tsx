'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useThemeStore, useSidebarStore, useAuthStore } from '@/store';
import { useTranslation } from '@/hooks';
import { Avatar, Dropdown, Badge } from '@/components/ui';
import { LanguageSwitcher } from './language-switcher';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  Monitor,
  LogOut,
  User,
  Settings,
  ChevronDown,
} from 'lucide-react';

export function Header() {
  const { theme, setTheme } = useThemeStore();
  const { toggle } = useSidebarStore();
  const { user, logout } = useAuthStore();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: t('header.newTaskAssigned'), message: 'Steel framework installation', time: `5 ${t('dashboard.minutesAgo')}`, unread: true },
    { id: 2, title: t('header.invoiceOverdue'), message: 'INV-2024-003', time: `1 ${t('dashboard.hourAgo')}`, unread: true },
    { id: 3, title: t('header.stockAlert'), message: 'Electrical wire running low', time: `2 ${t('dashboard.hoursAgo')}`, unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const themeOptions = [
    { label: t('header.theme.light'), value: 'light', icon: <Sun className="h-4 w-4" /> },
    { label: t('header.theme.dark'), value: 'dark', icon: <Moon className="h-4 w-4" /> },
    { label: t('header.theme.system'), value: 'system', icon: <Monitor className="h-4 w-4" /> },
  ];

  const userMenuItems = [
    { label: t('navigation.profile'), value: 'profile', icon: <User className="h-4 w-4" /> },
    { label: t('navigation.settings'), value: 'settings', icon: <Settings className="h-4 w-4" /> },
    { label: t('auth.logout'), value: 'logout', icon: <LogOut className="h-4 w-4" />, danger: true },
  ];

  const handleUserMenuSelect = (value: string) => {
    if (value === 'logout') {
      logout();
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={toggle}
          className="lg:hidden p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search */}
        <div className="hidden sm:flex items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
            <input
              type="text"
              placeholder={t('header.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'pl-10 pr-4 py-2 w-64 lg:w-80 rounded-lg text-sm',
                'bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700',
                'placeholder-surface-400 text-surface-900 dark:text-surface-100',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
              )}
            />
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Theme toggle */}
        <Dropdown
          trigger={
            <button className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
              {theme === 'dark' ? (
                <Moon className="h-5 w-5" />
              ) : theme === 'light' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Monitor className="h-5 w-5" />
              )}
            </button>
          }
          items={themeOptions}
          onSelect={(value) => setTheme(value as 'light' | 'dark' | 'system')}
        />

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors relative"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-surface-800 rounded-xl shadow-lg border border-surface-200 dark:border-surface-700 z-50 overflow-hidden">
                <div className="p-4 border-b border-surface-200 dark:border-surface-700">
                  <h3 className="font-semibold text-surface-900 dark:text-white">{t('header.notifications')}</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        'p-4 border-b border-surface-100 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700/50 cursor-pointer',
                        notification.unread && 'bg-primary-50/50 dark:bg-primary-900/20'
                      )}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-sm font-medium text-surface-900 dark:text-white">
                          {notification.title}
                        </h4>
                        <span className="text-xs text-surface-500">{notification.time}</span>
                      </div>
                      <p className="text-sm text-surface-600 dark:text-surface-400">
                        {notification.message}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center">
                  <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                    {t('header.viewAllNotifications')}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User menu */}
        <Dropdown
          trigger={
            <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
              <Avatar
                src={user?.avatar}
                name={user?.name || 'User'}
                size="sm"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-surface-900 dark:text-white">
                  {user?.name}
                </p>
                <p className="text-xs text-surface-500 capitalize">{user?.role}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-surface-400 hidden md:block" />
            </button>
          }
          items={userMenuItems}
          onSelect={handleUserMenuSelect}
        />
      </div>
    </header>
  );
}
