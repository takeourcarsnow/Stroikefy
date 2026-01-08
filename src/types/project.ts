// Project Types
export type ProjectStatus = 'planning' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled';
export type ProjectPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  startDate: Date;
  endDate: Date;
  budget: number;
  spent: number;
  progress: number;
  managerId: string;
  managerName: string;
  clientName: string;
  clientContact?: string;
  location: {
    address: string;
    city: string;
    lat: number;
    lng: number;
  };
  teamSize: number;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

// Task Types
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  assigneeName?: string;
  dueDate: Date;
  estimatedHours: number;
  actualHours: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  completedAt?: Date;
}

// Status colors mapping
export const PROJECT_STATUS_COLORS: Record<ProjectStatus, string> = {
  'planning': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'on-hold': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export const TASK_STATUS_COLORS: Record<TaskStatus, string> = {
  'todo': 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'review': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};

export const PRIORITY_COLORS: Record<TaskPriority | ProjectPriority, string> = {
  'low': 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
  'medium': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'high': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  'urgent': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  'critical': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};
