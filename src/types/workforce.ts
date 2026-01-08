// Employee Types
export type EmployeeStatus = 'active' | 'inactive' | 'on-leave' | 'terminated';
export type EmployeeType = 'full-time' | 'part-time' | 'contractor' | 'temporary';

export interface Employee {
  id: string;
  employeeId: string; // Company-assigned ID
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  position: string;
  department: string;
  type: EmployeeType;
  status: EmployeeStatus;
  hireDate: Date;
  salary: number;
  projectIds: string[];
  skills: string[];
  certifications: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Time Tracking Types
export interface TimeEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  projectId: string;
  projectName: string;
  taskId?: string;
  taskName?: string;
  date: Date;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  totalHours: number;
  description?: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  createdAt: Date;
}

export interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  date: Date;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'leave';
  notes?: string;
}

// Status colors
export const EMPLOYEE_STATUS_COLORS: Record<EmployeeStatus, string> = {
  'active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'inactive': 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
  'on-leave': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'terminated': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export const ATTENDANCE_STATUS_COLORS: Record<Attendance['status'], string> = {
  'present': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'absent': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  'late': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  'half-day': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'leave': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
};
