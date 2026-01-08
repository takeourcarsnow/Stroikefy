export * from './auth';
export * from './project';
export * from './workforce';
export * from './finance';
export * from './inventory';
export * from './documents';

// Common Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface DateRange {
  from: Date;
  to: Date;
}

// Dashboard KPI Types
export interface DashboardKPI {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

// Notification Types
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: Date;
}

// Activity Log
export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  entityName: string;
  details?: Record<string, unknown>;
  createdAt: Date;
}
