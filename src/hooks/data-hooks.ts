import { useDataWithFallback } from '@/providers/data-source-provider';
import * as supabaseHooks from './supabase-hooks';
import * as demoData from '@/data';

// =====================================================
// DASHBOARD HOOKS WITH FALLBACK
// =====================================================

export const useDashboardStats = () => {
  return useDataWithFallback(
    (options) => supabaseHooks.useDashboardStats(options),
    demoData.dashboardStats,
    { fallbackOnError: true }
  );
};

export const useRecentProjects = () => {
  return useDataWithFallback(
    (options) => supabaseHooks.useRecentProjects(options),
    demoData.recentProjects,
    { fallbackOnError: true }
  );
};

export const useRecentTasks = () => {
  return useDataWithFallback(
    (options) => supabaseHooks.useRecentTasks(options),
    demoData.recentTasks,
    { fallbackOnError: true }
  );
};

export const useMonthlyRevenue = () => {
  return useDataWithFallback(
    (options) => supabaseHooks.useMonthlyRevenue(options),
    demoData.monthlyRevenue,
    { fallbackOnError: true }
  );
};

export const useProjectStatusDistribution = () => {
  return useDataWithFallback(
    (options) => supabaseHooks.useProjectStatusDistribution(options),
    demoData.projectStatusDistribution,
    { fallbackOnError: true }
  );
};

// =====================================================
// PROJECTS HOOKS WITH FALLBACK
// =====================================================

export const useProjects = (filters?: { status?: string; priority?: string }) => {
  return useDataWithFallback(
    () => supabaseHooks.useProjects(filters),
    demoData.getProjects(filters),
    { fallbackOnError: true }
  );
};

export const useProject = (id: string) => {
  return useDataWithFallback(
    () => supabaseHooks.useProject(id),
    demoData.getProject(id),
    { fallbackOnError: true, enabled: !!id }
  );
};

export const useProjectTasks = (projectId: string) => {
  return useDataWithFallback(
    () => supabaseHooks.useProjectTasks(projectId),
    demoData.getTasks({ project_id: projectId }),
    { fallbackOnError: true, enabled: !!projectId }
  );
};

export const useProjectEmployees = (projectId: string) => {
  return useDataWithFallback(
    () => supabaseHooks.useProjectEmployees(projectId),
    demoData.getEmployees({ project_id: projectId }),
    { fallbackOnError: true, enabled: !!projectId }
  );
};

export const useCreateProject = () => supabaseHooks.useCreateProject();
export const useUpdateProject = () => supabaseHooks.useUpdateProject();

// =====================================================
// WORKFORCE HOOKS WITH FALLBACK
// =====================================================

export const useEmployees = (filters?: { status?: string; department?: string }) => {
  return useDataWithFallback(
    (options) => supabaseHooks.useEmployees(filters, options),
    filters ? demoData.getEmployees(filters) : demoData.employees,
    { fallbackOnError: true }
  );
};

export const useEmployee = (id: string) => {
  return useDataWithFallback(
    () => supabaseHooks.useEmployee(id),
    demoData.getEmployee(id),
    { fallbackOnError: true, enabled: !!id }
  );
};

export const useEmployeeProjects = (employeeId: string) => {
  return useDataWithFallback(
    () => supabaseHooks.useEmployeeProjects(employeeId),
    demoData.getProjects({ employee_id: employeeId }),
    { fallbackOnError: true, enabled: !!employeeId }
  );
};

export const useEmployeeTimeEntries = (employeeId: string, dateRange?: { start: string; end: string }) => {
  return useDataWithFallback(
    () => supabaseHooks.useEmployeeTimeEntries(employeeId, dateRange),
    demoData.getTimeEntries({ employee_id: employeeId, date_range: dateRange }),
    { fallbackOnError: true, enabled: !!employeeId }
  );
};

export const useAttendance = (date?: string) => {
  return useDataWithFallback(
    () => supabaseHooks.useAttendance(date),
    demoData.getAttendance(date),
    { fallbackOnError: true }
  );
};

export const useCreateTimeEntry = () => supabaseHooks.useCreateTimeEntry();
export const useCreateAttendance = () => supabaseHooks.useCreateAttendance();

// =====================================================
// FINANCE HOOKS WITH FALLBACK
// =====================================================

export const useInvoices = (filters?: { status?: string; type?: string }) => {
  return useDataWithFallback(
    (options) => supabaseHooks.useInvoices(filters, options),
    filters ? demoData.getInvoices(filters) : demoData.invoices,
    { fallbackOnError: true }
  );
};

export const useExpenses = (filters?: { status?: string; category?: string }) => {
  return useDataWithFallback(
    () => supabaseHooks.useExpenses(filters),
    demoData.getExpenses(filters),
    { fallbackOnError: true }
  );
};

export const useBudgets = () => {
  return useDataWithFallback(
    supabaseHooks.useBudgets,
    demoData.getBudgets(),
    { fallbackOnError: true }
  );
};

export const useCreateInvoice = () => supabaseHooks.useCreateInvoice();
export const useCreateExpense = () => supabaseHooks.useCreateExpense();

// =====================================================
// INVENTORY HOOKS WITH FALLBACK
// =====================================================

export const useInventory = (filters?: { category?: string; stock_status?: string }) => {
  return useDataWithFallback(
    (options) => supabaseHooks.useInventory(filters, options),
    filters ? demoData.getInventory(filters) : demoData.inventory,
    { fallbackOnError: true }
  );
};

export const useOrders = (filters?: { status?: string }) => {
  return useDataWithFallback(
    () => supabaseHooks.useOrders(filters),
    demoData.getOrders(filters),
    { fallbackOnError: true }
  );
};

export const useStockMovements = (itemId?: string) => {
  return useDataWithFallback(
    () => supabaseHooks.useStockMovements(itemId),
    demoData.getStockMovements(itemId),
    { fallbackOnError: true }
  );
};

export const useCreateOrder = () => supabaseHooks.useCreateOrder();
export const useUpdateInventory = () => supabaseHooks.useUpdateInventory();

// =====================================================
// DOCUMENTS HOOKS WITH FALLBACK
// =====================================================

export const useFolders = () => {
  return useDataWithFallback(
    supabaseHooks.useFolders,
    demoData.getFolders(),
    { fallbackOnError: true }
  );
};

export const useDocuments = (filters?: { folder_id?: string; project_id?: string; type?: string }) => {
  return useDataWithFallback(
    () => supabaseHooks.useDocuments(filters),
    demoData.getDocuments(filters),
    { fallbackOnError: true }
  );
};

export const useCreateDocument = () => supabaseHooks.useCreateDocument();

// =====================================================
// TIME TRACKING HOOKS WITH FALLBACK
// =====================================================

export const useTimeEntries = (filters?: { employee_id?: string; project_id?: string; date_range?: { start: string; end: string } }) => {
  return useDataWithFallback(
    () => supabaseHooks.useTimeEntries(filters),
    demoData.getTimeEntries(filters),
    { fallbackOnError: true }
  );
};

export const useTasks = (filters?: { project_id?: string; status?: string; assignee_id?: string }) => {
  return useDataWithFallback(
    () => supabaseHooks.useTasks(filters),
    demoData.getTasks(filters),
    { fallbackOnError: true }
  );
};

export const useCreateTask = () => supabaseHooks.useCreateTask();
export const useUpdateTask = () => supabaseHooks.useUpdateTask();

// =====================================================
// SETTINGS HOOKS WITH FALLBACK
// =====================================================

export const useUsers = () => {
  return useDataWithFallback(
    supabaseHooks.useUsers,
    demoData.getUsers(),
    { fallbackOnError: true }
  );
};

export const useUser = (id: string) => {
  return useDataWithFallback(
    () => supabaseHooks.useUser(id),
    demoData.getUser(id),
    { fallbackOnError: true, enabled: !!id }
  );
};

export const useUpdateUser = () => supabaseHooks.useUpdateUser();