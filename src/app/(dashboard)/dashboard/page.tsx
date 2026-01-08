'use client';

import React from 'react';
import { Card, CardHeader, Progress, Avatar, Badge } from '@/components/ui';
import { cn, formatCurrency, formatPercent } from '@/lib/utils';
import { useTranslation } from '@/hooks';
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
import { PROJECT_STATUS_COLORS } from '@/types';
import Link from 'next/link';
import {
  useDashboardStats,
  useRecentProjects,
  useRecentTasks,
  useMonthlyRevenue,
  useProjectStatusDistribution,
  useEmployees,
  useInventory,
  useInvoices,
} from '@/hooks';

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
  const { t } = useTranslation();

  // Fetch data using hooks
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: recentProjects, isLoading: projectsLoading } = useRecentProjects();
  const { data: recentTasks, isLoading: tasksLoading } = useRecentTasks();
  const { data: monthlyRevenue, isLoading: revenueLoading } = useMonthlyRevenue();
  const { data: projectStatusData, isLoading: statusLoading } = useProjectStatusDistribution();
  const { data: employees } = useEmployees();
  const { data: inventory } = useInventory();
  const { data: invoices } = useInvoices();

  // Calculate derived data
  const activeProjects = recentProjects?.filter(p => p.status === 'in-progress') || [];
  const lowStockItems = inventory?.filter(i => i.stock_status === 'low-stock' || i.stock_status === 'out-of-stock') || [];
  const overdueInvoices = invoices?.filter(i => i.status === 'overdue') || [];

  // Loading state
  if (statsLoading || projectsLoading || tasksLoading || revenueLoading || statusLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-surface-200 dark:bg-surface-700 rounded w-64 mb-2"></div>
          <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-96"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-surface-200 dark:bg-surface-700 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">{t('dashboard.title')}</h1>
        <p className="text-surface-500 dark:text-surface-400 mt-1">
          {t('dashboard.welcome')}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title={t('dashboard.activeProjects')}
          value={stats?.totalProjects || 0}
          change={12}
          changeLabel={t('dashboard.vsLastMonth')}
          icon={<Building2 className="h-6 w-6" />}
          trend="up"
        />
        <KPICard
          title={t('dashboard.activeEmployees')}
          value={stats?.activeEmployees || 0}
          change={5}
          changeLabel={t('dashboard.vsLastMonth')}
          icon={<Users className="h-6 w-6" />}
          trend="up"
        />
        <KPICard
          title={t('dashboard.totalBudget')}
          value={formatCurrency(stats?.totalBudget || 0)}
          change={-3}
          changeLabel={t('dashboard.utilization')}
          icon={<DollarSign className="h-6 w-6" />}
          trend="neutral"
        />
        <KPICard
          title={t('dashboard.lowStockItems')}
          value={lowStockItems.length}
          change={2}
          changeLabel={t('dashboard.itemsNeedAttention')}
          icon={<Package className="h-6 w-6" />}
          trend="down"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader title={t('dashboard.revenueOverview')} description={t('dashboard.monthlyRevenueVsExpenses')} />
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue || []}>
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
          <CardHeader title={t('dashboard.projectStatus')} description={t('dashboard.distributionByStatus')} />
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="count"
                >
                  {(projectStatusData || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || '#64748b'} />
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
            title={t('dashboard.activeProjectsList')}
            description={t('dashboard.projectsInProgress')}
            action={
              <Link href="/projects" className="text-sm text-primary-600 hover:underline flex items-center gap-1">
                {t('common.viewAll')} <ArrowUpRight className="h-4 w-4" />
              </Link>
            }
          />
          <div className="space-y-4">
            {(recentProjects || []).filter(p => p.status === 'in-progress').slice(0, 4).map((project) => (
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
                    {project.client_name} • {project.location_city}
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
          <CardHeader title={t('dashboard.alerts')} description={t('dashboard.itemsRequiringAttention')} />
          <div className="space-y-3">
            {/* Overdue Invoices */}
            {overdueInvoices.length > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800 dark:text-red-300">
                    {overdueInvoices.length} {overdueInvoices.length > 1 ? t('dashboard.overdueInvoices') : t('dashboard.overdueInvoice')}
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">
                    {formatCurrency(overdueInvoices.reduce((sum, inv) => sum + inv.total, 0))} {t('dashboard.outstanding')}
                  </p>
                </div>
              </div>
            )}

            {/* Low Stock */}
            {lowStockItems.length > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                <Package className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                    {lowStockItems.length} {t('dashboard.lowStock')}
                  </p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-0.5">
                    {t('dashboard.reviewInventory')}
                  </p>
                </div>
              </div>
            )}

            {/* Pending Tasks */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  8 {t('dashboard.tasksDueThisWeek')}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">
                  3 {t('dashboard.highPriority')}
                </p>
              </div>
            </div>

            {/* Completed Today */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-300">
                  5 {t('dashboard.tasksCompletedToday')}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">
                  {t('dashboard.greatProgress')}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Task Progress Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title={t('dashboard.taskProgress')} description={t('dashboard.weeklyTaskCompletion')} />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recentTasks || []}>
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
          <CardHeader title={t('dashboard.recentActivity')} description={t('dashboard.latestUpdates')} />
          <div className="space-y-4">
            {[
              { user: 'John Smith', action: t('dashboard.completedTask'), target: 'Foundation excavation', time: `5 ${t('dashboard.minutesAgo')}`, avatar: employees?.[0]?.avatar },
              { user: 'Sarah Williams', action: t('dashboard.approvedInvoice'), target: 'INV-2024-001', time: `1 ${t('dashboard.hourAgo')}`, avatar: employees?.[1]?.avatar },
              { user: 'Robert Johnson', action: t('dashboard.updatedProject'), target: 'Downtown Office Complex', time: `2 ${t('dashboard.hoursAgo')}`, avatar: employees?.[2]?.avatar },
              { user: 'David Lee', action: t('dashboard.createdOrder'), target: 'ORD-2024-001', time: `3 ${t('dashboard.hoursAgo')}`, avatar: employees?.[3]?.avatar },
              { user: 'Sarah Martinez', action: t('dashboard.uploadedDocument'), target: 'Safety Report', time: `4 ${t('dashboard.hoursAgo')}`, avatar: employees?.[4]?.avatar },
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
