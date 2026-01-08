// Invoice Types
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
export type InvoiceType = 'incoming' | 'outgoing';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  type: InvoiceType;
  status: InvoiceStatus;
  projectId?: string;
  projectName?: string;
  clientName: string;
  clientEmail?: string;
  clientAddress?: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  issueDate: Date;
  dueDate: Date;
  paidDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// Expense Types
export type ExpenseCategory = 
  | 'materials' 
  | 'labor' 
  | 'equipment' 
  | 'transportation' 
  | 'utilities' 
  | 'permits' 
  | 'insurance' 
  | 'other';

export type ExpenseStatus = 'pending' | 'approved' | 'rejected' | 'reimbursed';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  status: ExpenseStatus;
  projectId?: string;
  projectName?: string;
  employeeId: string;
  employeeName: string;
  receipt?: string;
  date: Date;
  approvedBy?: string;
  approvedAt?: Date;
  notes?: string;
  createdAt: Date;
}

// Budget Types
export interface Budget {
  id: string;
  projectId: string;
  projectName: string;
  totalBudget: number;
  allocated: number;
  spent: number;
  remaining: number;
  categories: BudgetCategory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetCategory {
  name: ExpenseCategory;
  allocated: number;
  spent: number;
}

// Status colors
export const INVOICE_STATUS_COLORS: Record<InvoiceStatus, string> = {
  'draft': 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
  'sent': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'paid': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'overdue': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  'cancelled': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
};

export const EXPENSE_STATUS_COLORS: Record<ExpenseStatus, string> = {
  'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'approved': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  'reimbursed': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
};

export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  'materials': 'Materials',
  'labor': 'Labor',
  'equipment': 'Equipment',
  'transportation': 'Transportation',
  'utilities': 'Utilities',
  'permits': 'Permits & Licenses',
  'insurance': 'Insurance',
  'other': 'Other',
};
