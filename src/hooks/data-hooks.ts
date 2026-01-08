import { useDataWithFallback } from '@/providers/data-source-provider';
import * as supabaseHooks from './supabase-hooks';

// =====================================================
// DASHBOARD HOOKS
// =====================================================

export const useDashboardStats = () => {
  return useDataWithFallback(
    (options) => supabaseHooks.useDashboardStats(options)
  );
};

export const useRecentProjects = () => {
  return useDataWithFallback(
    (options) => supabaseHooks.useRecentProjects(options)
  );
};

export const useRecentTasks = () => {
  return useDataWithFallback(
    (options) => supabaseHooks.useRecentTasks(options)
  );
};

export const useMonthlyRevenue = () => {
  return useDataWithFallback(
    (options) => supabaseHooks.useMonthlyRevenue(options)
  );
};

export const useProjectStatusDistribution = () => {
  return useDataWithFallback(
    (options) => supabaseHooks.useProjectStatusDistribution(options)
  );
};

// =====================================================
// PROJECTS HOOKS
// =====================================================

export const useProjects = (filters?: { status?: string; priority?: string }) => {
  return useDataWithFallback(
    () => supabaseHooks.useProjects(filters)
  );
};

export const useProject = (id: string) => {
  return useDataWithFallback(
    () => supabaseHooks.useProject(id),
    { enabled: !!id }
  );
};

export const useProjectTasks = (projectId: string) => {
  return useDataWithFallback(
    () => supabaseHooks.useProjectTasks(projectId),
    { enabled: !!projectId }
  );
};

export const useProjectEmployees = (projectId: string) => {
  return useDataWithFallback(
    () => supabaseHooks.useProjectEmployees(projectId),
    { enabled: !!projectId }
  );
};

export const useCreateProject = () => supabaseHooks.useCreateProject();
export const useUpdateProject = () => supabaseHooks.useUpdateProject();

// =====================================================
// WORKFORCE HOOKS
// =====================================================

export const useEmployees = (filters?: { status?: string; department?: string }) => {
  return useDataWithFallback(
    (options) => supabaseHooks.useEmployees(filters, options)
  );
};

export const useEmployee = (id: string) => {
  return useDataWithFallback(
    () => supabaseHooks.useEmployee(id),
    { enabled: !!id }
  );
};

export const useEmployeeProjects = (employeeId: string) => {
  return useDataWithFallback(
    () => supabaseHooks.useEmployeeProjects(employeeId),
    { enabled: !!employeeId }
  );
};

export const useEmployeeTimeEntries = (employeeId: string, dateRange?: { start: string; end: string }) => {
  return useDataWithFallback(
    () => supabaseHooks.useEmployeeTimeEntries(employeeId, dateRange),
    { enabled: !!employeeId }
  );
};

export const useAttendance = (date?: string) => {
  return useDataWithFallback(
    () => supabaseHooks.useAttendance(date)
  );
};

export const useCreateTimeEntry = () => supabaseHooks.useCreateTimeEntry();
export const useCreateAttendance = () => supabaseHooks.useCreateAttendance();

// =====================================================
// FINANCE HOOKS
// =====================================================

export const useInvoices = (filters?: { status?: string; type?: string }) => {
  return useDataWithFallback(
    (options) => supabaseHooks.useInvoices(filters, options)
  );
};

export const useExpenses = (filters?: { status?: string; category?: string }) => {
  return useDataWithFallback(
    () => supabaseHooks.useExpenses(filters)
  );
};

export const useBudgets = () => {
  return useDataWithFallback(
    supabaseHooks.useBudgets
  );
};

export const useCreateInvoice = () => supabaseHooks.useCreateInvoice();
export const useCreateExpense = () => supabaseHooks.useCreateExpense();

// =====================================================
// INVENTORY HOOKS
// =====================================================

export const useInventory = (filters?: { category?: string; stock_status?: string }) => {
  return useDataWithFallback(
    (options) => supabaseHooks.useInventory(filters, options)
  );
};

export const useOrders = (filters?: { status?: string }) => {
  return useDataWithFallback(
    () => supabaseHooks.useOrders(filters)
  );
};

export const useStockMovements = (itemId?: string) => {
  return useDataWithFallback(
    () => supabaseHooks.useStockMovements(itemId)
  );
};

export const useCreateOrder = () => supabaseHooks.useCreateOrder();
export const useUpdateInventory = () => supabaseHooks.useUpdateInventory();

// =====================================================
// DOCUMENTS HOOKS
// =====================================================

export const useFolders = () => {
  return useDataWithFallback(
    supabaseHooks.useFolders
  );
};

export const useDocuments = (filters?: { folder_id?: string; project_id?: string; type?: string }) => {
  return useDataWithFallback(
    () => supabaseHooks.useDocuments(filters)
  );
};

export const useCreateDocument = () => supabaseHooks.useCreateDocument();

// =====================================================
// TIME TRACKING HOOKS
// =====================================================

export const useTimeEntries = (filters?: { employee_id?: string; project_id?: string; date_range?: { start: string; end: string } }) => {
  return useDataWithFallback(
    () => supabaseHooks.useTimeEntries(filters)
  );
};

export const useTasks = (filters?: { project_id?: string; status?: string; assignee_id?: string }) => {
  return useDataWithFallback(
    () => supabaseHooks.useTasks(filters)
  );
};

export const useCreateTask = () => supabaseHooks.useCreateTask();
export const useUpdateTask = () => supabaseHooks.useUpdateTask();

// =====================================================
// SETTINGS HOOKS
// =====================================================

export const useUsers = () => {
  return useDataWithFallback(
    supabaseHooks.useUsers
  );
};

export const useUser = (id: string) => {
  return useDataWithFallback(
    () => supabaseHooks.useUser(id),
    { enabled: !!id }
  );
};

export const useUpdateUser = () => supabaseHooks.useUpdateUser();