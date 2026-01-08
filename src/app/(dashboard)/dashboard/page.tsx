'use client';

import React from 'react';
import { Card, CardHeader, Progress, Avatar, Badge } from '@/components/ui';
import { cn, formatCurrency, formatPercent } from '@/lib/utils';
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Users,
  DollarSign,
  Package,
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { mockProjects, mockEmployees, mockInvoices, mockInventoryItems } from '@/data';
import { PROJECT_STATUS_COLORS } from '@/types';
import Link from 'next/link';

// KPI Card Component
interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

function KPICard({ title, value, change, changeLabel, icon, trend }: KPICardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-surface-500 dark:text-surface-400">{title}</p>
          <p className="text-2xl font-bold text-surface-900 dark:text-white mt-1">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
              {trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
              <span className={cn(
                'text-sm font-medium',
                trend === 'up' && 'text-green-600',
                trend === 'down' && 'text-red-600',
                trend === 'neutral' && 'text-surface-500'
              )}>
                {change > 0 ? '+' : ''}{change}%
              </span>
              {changeLabel && (
                <span className="text-sm text-surface-500 dark:text-surface-400">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400">
          {icon}
        </div>
      </div>
    </Card>
  );
}

// Revenue Chart Data
const revenueData = [
  { month: 'Jan', revenue: 2400000, expenses: 1800000 },
  { month: 'Feb', revenue: 2800000, expenses: 2100000 },
  { month: 'Mar', revenue: 3200000, expenses: 2400000 },
  { month: 'Apr', revenue: 2900000, expenses: 2200000 },
  { month: 'May', revenue: 3500000, expenses: 2600000 },
  { month: 'Jun', revenue: 4200000, expenses: 3100000 },
];

// Project Status Data
const getProjectStatusData = () => {
  const statusCounts = mockProjects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return [
    { name: 'In Progress', value: statusCounts['in-progress'] || 0, color: '#eab308' },
    { name: 'Completed', value: statusCounts['completed'] || 0, color: '#22c55e' },
    { name: 'Planning', value: statusCounts['planning'] || 0, color: '#3b82f6' },
    { name: 'On Hold', value: statusCounts['on-hold'] || 0, color: '#f97316' },
  ];
};

// Task Progress Data
const taskProgressData = [
  { name: 'Week 1', completed: 12, inProgress: 8, pending: 5 },
  { name: 'Week 2', completed: 18, inProgress: 10, pending: 7 },
  { name: 'Week 3', completed: 15, inProgress: 12, pending: 4 },
  { name: 'Week 4', completed: 22, inProgress: 8, pending: 6 },
];

export default function DashboardPage() {
  const activeProjects = mockProjects.filter(p => p.status === 'in-progress').length;
  const totalEmployees = mockEmployees.filter(e => e.status === 'active').length;
  const totalBudget = mockProjects.reduce((sum, p) => sum + p.budget, 0);
  const lowStockItems = mockInventoryItems.filter(i => i.stockStatus === 'low-stock' || i.stockStatus === 'out-of-stock').length;
  const overdueInvoices = mockInvoices.filter(i => i.status === 'overdue');
  const projectStatusData = getProjectStatusData();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Dashboard</h1>
        <p className="text-surface-500 dark:text-surface-400 mt-1">
          Welcome back! Here&apos;s what&apos;s happening with your projects.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Projects"
          value={activeProjects}
          change={12}
          changeLabel="vs last month"
          icon={<Building2 className="h-6 w-6" />}
          trend="up"
        />
        <KPICard
          title="Active Employees"
          value={totalEmployees}
          change={5}
          changeLabel="vs last month"
          icon={<Users className="h-6 w-6" />}
          trend="up"
        />
        <KPICard
          title="Total Budget"
          value={formatCurrency(totalBudget)}
          change={-3}
          changeLabel="utilization"
          icon={<DollarSign className="h-6 w-6" />}
          trend="neutral"
        />
        <KPICard
          title="Low Stock Items"
          value={lowStockItems}
          change={2}
          changeLabel="items need attention"
          icon={<Package className="h-6 w-6" />}
          trend="down"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader title="Revenue Overview" description="Monthly revenue vs expenses" />
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec751a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ec751a" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(value) => `$${value / 1000000}M`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--toast-bg)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ec751a"
                  fill="url(#revenueGradient)"
                  strokeWidth={2}
                  name="Revenue"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#64748b"
                  fill="url(#expenseGradient)"
                  strokeWidth={2}
                  name="Expenses"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Project Status Pie Chart */}
        <Card>
          <CardHeader title="Project Status" description="Distribution by status" />
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Projects List */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="Active Projects"
            description="Projects currently in progress"
            action={
              <Link href="/projects" className="text-sm text-primary-600 hover:underline flex items-center gap-1">
                View all <ArrowUpRight className="h-4 w-4" />
              </Link>
            }
          />
          <div className="space-y-4">
            {mockProjects.filter(p => p.status === 'in-progress').slice(0, 4).map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-surface-50 dark:bg-surface-800/50 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-surface-900 dark:text-white truncate">
                      {project.name}
                    </h4>
                    <Badge variant="custom" className={PROJECT_STATUS_COLORS[project.status]}>
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-surface-500 dark:text-surface-400 truncate">
                    {project.clientName} • {project.location.city}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex-1">
                      <Progress value={project.progress} size="sm" />
                    </div>
                    <span className="text-sm font-medium text-surface-700 dark:text-surface-300 w-12 text-right">
                      {project.progress}%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-surface-900 dark:text-white">
                    {formatCurrency(project.spent)}
                  </p>
                  <p className="text-xs text-surface-500">
                    of {formatCurrency(project.budget)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Alerts & Notifications */}
        <Card>
          <CardHeader title="Alerts" description="Items requiring attention" />
          <div className="space-y-3">
            {/* Overdue Invoices */}
            {overdueInvoices.length > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800 dark:text-red-300">
                    {overdueInvoices.length} Overdue Invoice{overdueInvoices.length > 1 ? 's' : ''}
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">
                    {formatCurrency(overdueInvoices.reduce((sum, inv) => sum + inv.total, 0))} outstanding
                  </p>
                </div>
              </div>
            )}

            {/* Low Stock */}
            {lowStockItems > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                <Package className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                    {lowStockItems} Low Stock Items
                  </p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-0.5">
                    Review inventory levels
                  </p>
                </div>
              </div>
            )}

            {/* Pending Tasks */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  8 Tasks Due This Week
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">
                  3 high priority
                </p>
              </div>
            </div>

            {/* Completed Today */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-300">
                  5 Tasks Completed Today
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">
                  Great progress!
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Task Progress Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Task Progress" description="Weekly task completion" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taskProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--toast-bg)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="completed" stackId="a" fill="#22c55e" name="Completed" radius={[0, 0, 0, 0]} />
                <Bar dataKey="inProgress" stackId="a" fill="#3b82f6" name="In Progress" radius={[0, 0, 0, 0]} />
                <Bar dataKey="pending" stackId="a" fill="#94a3b8" name="Pending" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader title="Recent Activity" description="Latest updates" />
          <div className="space-y-4">
            {[
              { user: 'John Smith', action: 'completed task', target: 'Foundation excavation', time: '5 minutes ago', avatar: mockEmployees[0].avatar },
              { user: 'Sarah Williams', action: 'approved invoice', target: 'INV-2024-004', time: '1 hour ago', avatar: mockEmployees[1]?.avatar },
              { user: 'Robert Johnson', action: 'updated project', target: 'Downtown Office Complex', time: '2 hours ago', avatar: mockEmployees[1].avatar },
              { user: 'David Lee', action: 'created order', target: 'ORD-2024-003', time: '3 hours ago', avatar: mockEmployees[2].avatar },
              { user: 'Sarah Martinez', action: 'uploaded document', target: 'Safety Report', time: '4 hours ago', avatar: mockEmployees[3]?.avatar },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <Avatar src={activity.avatar} name={activity.user} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-surface-700 dark:text-surface-300">
                    <span className="font-medium text-surface-900 dark:text-white">{activity.user}</span>
                    {' '}{activity.action}{' '}
                    <span className="font-medium text-primary-600 dark:text-primary-400">{activity.target}</span>
                  </p>
                  <p className="text-xs text-surface-500 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
