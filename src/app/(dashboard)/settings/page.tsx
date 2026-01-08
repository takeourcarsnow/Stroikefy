'use client';

import React, { useState } from 'react';
import { Card, CardHeader, Button, Badge, Input, Select, Tabs, Modal, ModalFooter, Textarea, Avatar } from '@/components/ui';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store';
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Mail,
  Lock,
  Key,
  Smartphone,
  Monitor,
  Sun,
  Moon,
  Laptop,
  Check,
  Building,
  CreditCard,
  Users,
  FileText,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import { useTranslation } from '@/hooks';

export default function SettingsPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('profile');
  const { theme, setTheme } = useThemeStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const tabs = [
    { id: 'profile', label: t('settings.tabs.profile'), icon: User },
    { id: 'company', label: t('settings.tabs.company'), icon: Building },
    { id: 'notifications', label: t('settings.tabs.notifications'), icon: Bell },
    { id: 'appearance', label: t('settings.tabs.appearance'), icon: Palette },
    { id: 'security', label: t('settings.tabs.security'), icon: Shield },
    { id: 'billing', label: t('settings.tabs.billing'), icon: CreditCard },
    { id: 'team', label: t('settings.tabs.team'), icon: Users },
    { id: 'data', label: t('settings.tabs.data'), icon: Database },
  ];

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Laptop },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">{t('settings.title')}</h1>
        <p className="text-surface-500">{t('settings.subtitle')}</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <Card className="lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    activeTab === tab.id
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600'
                      : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </Card>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {/* Profile */}
          {activeTab === 'profile' && (
            <>
              <Card>
                <CardHeader title={t('settings.profile.title')} description={t('settings.profile.description')} />
                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                  <div className="flex flex-col items-center gap-3">
                    <Avatar name="John Doe" size="xl" />
                    <Button variant="outline" size="sm">{t('settings.profile.changePhoto')}</Button>
                  </div>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label={t('common.firstName') ?? 'First Name'} defaultValue="John" />
                    <Input label={t('common.lastName') ?? 'Last Name'} defaultValue="Doe" />
                    <Input label={t('common.email') ?? 'Email'} type="email" defaultValue="john@example.com" />
                    <Input label={t('common.phone') ?? 'Phone'} type="tel" defaultValue="+1 234 567 890" />
                  </div>
                </div>
                <Input label={t('settings.profile.jobTitle')} defaultValue="Project Manager" className="mb-4" />
                <Textarea label={t('settings.profile.bioPlaceholder')} placeholder={t('settings.profile.bioPlaceholder')} className="mb-4" />
                <div className="flex justify-end">
                  <Button>{t('common.save')}</Button>
                </div>
              </Card>
            </>
          )}

          {/* Company */}
          {activeTab === 'company' && (
            <>
              <Card>
                <CardHeader title="Company Information" description="Manage your organization details" />
                <div className="space-y-4">
                  <Input label="Company Name" defaultValue="Stroikefy Construction" />
                  <Input label="Website" type="url" defaultValue="https://stroikefy.com" />
                  <Textarea label="Address" defaultValue="123 Construction Ave, New York, NY 10001" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Tax ID" defaultValue="XX-XXXXXXX" />
                    <Input label="Registration Number" defaultValue="ABC123456" />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button>Save Changes</Button>
                </div>
              </Card>
            </>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <>
              <Card>
                <CardHeader title="Email Notifications" description="Choose what emails you want to receive" />
                <div className="space-y-4">
                  {[
                    { title: 'Project Updates', description: 'Get notified when projects are updated' },
                    { title: 'Task Assignments', description: 'Get notified when tasks are assigned to you' },
                    { title: 'Invoice Reminders', description: 'Receive reminders for pending invoices' },
                    { title: 'Low Stock Alerts', description: 'Get notified when inventory is running low' },
                    { title: 'Team Messages', description: 'Receive notifications for team messages' },
                    { title: 'Weekly Reports', description: 'Receive weekly summary reports' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-surface-900 dark:text-white">{item.title}</h4>
                        <p className="text-sm text-surface-500">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={index < 4} className="sr-only peer" />
                        <div className="w-11 h-6 bg-surface-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-surface-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <CardHeader title="Push Notifications" description="Configure mobile and desktop notifications" />
                <div className="space-y-4">
                  {[
                    { title: 'Desktop Notifications', description: 'Show notifications on your desktop', icon: Monitor },
                    { title: 'Mobile Notifications', description: 'Receive push notifications on mobile', icon: Smartphone },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-surface-400" />
                          <div>
                            <h4 className="font-medium text-surface-900 dark:text-white">{item.title}</h4>
                            <p className="text-sm text-surface-500">{item.description}</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-surface-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-surface-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </>
          )}

          {/* Appearance */}
          {activeTab === 'appearance' && (
            <>
              <Card>
                <CardHeader title="Theme" description="Choose your preferred theme" />
                <div className="grid grid-cols-3 gap-4">
                  {themeOptions.map(option => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => setTheme(option.value as 'light' | 'dark' | 'system')}
                        className={cn(
                          'p-4 rounded-lg border-2 transition-all',
                          theme === option.value
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                            : 'border-surface-200 dark:border-surface-700 hover:border-surface-300'
                        )}
                      >
                        <Icon className={cn(
                          'h-8 w-8 mx-auto mb-2',
                          theme === option.value ? 'text-primary-600' : 'text-surface-400'
                        )} />
                        <p className={cn(
                          'font-medium',
                          theme === option.value ? 'text-primary-600' : 'text-surface-600 dark:text-surface-400'
                        )}>
                          {option.label}
                        </p>
                        {theme === option.value && (
                          <Check className="h-5 w-5 text-primary-600 mx-auto mt-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </Card>

              <Card>
                <CardHeader title="Language & Region" description="Set your language and regional preferences" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Language"
                    options={[
                      { value: 'en', label: 'English' },
                      { value: 'es', label: 'Spanish' },
                      { value: 'fr', label: 'French' },
                      { value: 'de', label: 'German' },
                    ]}
                    value="en"
                  />
                  <Select
                    label="Timezone"
                    options={[
                      { value: 'utc', label: 'UTC' },
                      { value: 'est', label: 'Eastern Time (EST)' },
                      { value: 'pst', label: 'Pacific Time (PST)' },
                      { value: 'cet', label: 'Central European Time (CET)' },
                    ]}
                    value="est"
                  />
                  <Select
                    label="Date Format"
                    options={[
                      { value: 'mdy', label: 'MM/DD/YYYY' },
                      { value: 'dmy', label: 'DD/MM/YYYY' },
                      { value: 'ymd', label: 'YYYY-MM-DD' },
                    ]}
                    value="mdy"
                  />
                  <Select
                    label="Currency"
                    options={[
                      { value: 'usd', label: 'USD ($)' },
                      { value: 'eur', label: 'EUR (€)' },
                      { value: 'gbp', label: 'GBP (£)' },
                    ]}
                    value="usd"
                  />
                </div>
              </Card>
            </>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <>
              <Card>
                <CardHeader title="Change Password" description="Update your account password" />
                <div className="space-y-4 max-w-md">
                  <Input label="Current Password" type="password" />
                  <Input label="New Password" type="password" />
                  <Input label="Confirm New Password" type="password" />
                  <Button>Update Password</Button>
                </div>
              </Card>

              <Card>
                <CardHeader title="Two-Factor Authentication" description="Add an extra layer of security" />
                <div className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <Key className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-surface-900 dark:text-white">Two-Factor Authentication</h4>
                      <p className="text-sm text-surface-500">Currently enabled via authenticator app</p>
                    </div>
                  </div>
                  <Badge variant="success">Enabled</Badge>
                </div>
              </Card>

              <Card>
                <CardHeader title="Sessions" description="Manage your active sessions" />
                <div className="space-y-3">
                  {[
                    { device: 'Chrome on Windows', location: 'New York, US', current: true },
                    { device: 'Safari on iPhone', location: 'New York, US', current: false },
                    { device: 'Firefox on Mac', location: 'Boston, US', current: false },
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Monitor className="h-5 w-5 text-surface-400" />
                        <div>
                          <h4 className="font-medium text-surface-900 dark:text-white">
                            {session.device}
                            {session.current && <Badge variant="default" className="ml-2">Current</Badge>}
                          </h4>
                          <p className="text-sm text-surface-500">{session.location}</p>
                        </div>
                      </div>
                      {!session.current && (
                        <Button variant="ghost" size="sm">Revoke</Button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {/* Billing */}
          {activeTab === 'billing' && (
            <>
              <Card>
                <CardHeader title="Current Plan" description="Manage your subscription" />
                <div className="p-6 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg text-white mb-6">
                  <h3 className="text-2xl font-bold mb-1">Pro Plan</h3>
                  <p className="text-primary-100 mb-4">$99/month • Billed annually</p>
                  <div className="flex gap-2">
                    <Button variant="secondary" className="bg-white text-primary-600 hover:bg-surface-100">
                      Upgrade
                    </Button>
                    <Button variant="ghost" className="text-white border-white hover:bg-white/10">
                      Cancel
                    </Button>
                  </div>
                </div>
                
                <h4 className="font-medium text-surface-900 dark:text-white mb-3">Plan Features</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {['Unlimited Projects', 'Up to 50 Team Members', 'Advanced Analytics', 'Priority Support', 'Custom Integrations', 'API Access'].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
                      <Check className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card>
                <CardHeader title="Payment Method" />
                <div className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-surface-400" />
                    <div>
                      <h4 className="font-medium text-surface-900 dark:text-white">•••• •••• •••• 4242</h4>
                      <p className="text-sm text-surface-500">Expires 12/2025</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
              </Card>
            </>
          )}

          {/* Team */}
          {activeTab === 'team' && (
            <>
              <Card>
                <CardHeader 
                  title="Team Members" 
                  description="Manage your team"
                  action={<Button size="sm" leftIcon={<Users className="h-4 w-4" />}>Invite</Button>}
                />
                <div className="space-y-3">
                  {[
                    { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
                    { name: 'Jane Smith', email: 'jane@example.com', role: 'Manager' },
                    { name: 'Bob Johnson', email: 'bob@example.com', role: 'Member' },
                  ].map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar name={member.name} />
                        <div>
                          <h4 className="font-medium text-surface-900 dark:text-white">{member.name}</h4>
                          <p className="text-sm text-surface-500">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="default" className={member.role === 'Admin' ? 'bg-primary-100 text-primary-800' : ''}>{member.role}</Badge>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <CardHeader title="Roles & Permissions" description="Configure team access levels" />
                <div className="space-y-3">
                  {[
                    { role: 'Admin', description: 'Full access to all features', permissions: 'All' },
                    { role: 'Manager', description: 'Manage projects and team', permissions: 'Projects, Team, Reports' },
                    { role: 'Member', description: 'Basic access', permissions: 'Tasks, Time Tracking' },
                  ].map((role, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-surface-900 dark:text-white">{role.role}</h4>
                        <p className="text-sm text-surface-500">{role.description}</p>
                        <p className="text-xs text-surface-400 mt-1">Access: {role.permissions}</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {/* Data */}
          {activeTab === 'data' && (
            <>
              <Card>
                <CardHeader title="Export Data" description="Download your data" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Projects', 'Tasks', 'Employees', 'Invoices', 'Inventory', 'Time Entries'].map(type => (
                    <button 
                      key={type}
                      className="flex items-center gap-3 p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700/50 transition-colors"
                    >
                      <Download className="h-5 w-5 text-primary-600" />
                      <span className="font-medium text-surface-900 dark:text-white">Export {type}</span>
                    </button>
                  ))}
                </div>
              </Card>

              <Card>
                <CardHeader title="Import Data" description="Upload data from external sources" />
                <div className="border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-lg p-8 text-center">
                  <Upload className="h-10 w-10 text-surface-400 mx-auto mb-4" />
                  <p className="text-surface-600 dark:text-surface-400 mb-2">Drag and drop your files here</p>
                  <p className="text-sm text-surface-500 mb-4">Supports CSV, Excel, and JSON files</p>
                  <Button variant="outline">Browse Files</Button>
                </div>
              </Card>

              <Card className="border-red-200 dark:border-red-900">
                <CardHeader 
                  title="Danger Zone" 
                  description="Irreversible actions" 
                />
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-red-900 dark:text-red-200">Delete Account</h4>
                      <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => setShowDeleteModal(true)}
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Delete Account Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Account"
        size="sm"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
            Are you absolutely sure?
          </h3>
          <p className="text-surface-500 mb-6">
            This action cannot be undone. All your data will be permanently deleted.
          </p>
          <Input 
            placeholder="Type 'DELETE' to confirm" 
            className="mb-4"
          />
        </div>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger">Delete Account</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
