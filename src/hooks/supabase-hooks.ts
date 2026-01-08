import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useTranslation } from '@/hooks/useTranslation';

// =====================================================
// DASHBOARD HOOKS
// =====================================================

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      const [projectsRes, employeesRes, tasksRes, expensesRes] = await Promise.all([
        supabase.from('projects').select('status, budget, spent, progress'),
        supabase.from('employees').select('status'),
        supabase.from('tasks').select('status'),
        supabase.from('expenses').select('amount, status').eq('status', 'approved')
      ]);

      const projects = projectsRes.data || [];
      const employees = employeesRes.data || [];
      const tasks = tasksRes.data || [];
      const expenses = expensesRes.data || [];

      const totalProjects = projects.length;
      const activeProjects = projects.filter(p => p.status === 'in-progress').length;
      const totalEmployees = employees.length;
      const activeEmployees = employees.filter(e => e.status === 'active').length;
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(t => t.status === 'completed').length;
      const totalBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0);
      const totalSpent = projects.reduce((sum, p) => sum + (p.spent || 0), 0);
      const avgProgress = projects.length > 0 ? Math.round(projects.reduce((sum, p) => sum + (p.progress || 0), 0) / projects.length) : 0;

      return {
        totalProjects,
        activeProjects,
        totalEmployees,
        activeEmployees,
        totalTasks,
        completedTasks,
        totalBudget,
        totalSpent,
        avgProgress,
        monthlyExpenses: expenses.reduce((sum, e) => sum + (e.amount || 0), 0)
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useRecentProjects = () => {
  return useQuery({
    queryKey: ['recent-projects'],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useRecentTasks = () => {
  return useQuery({
    queryKey: ['recent-tasks'],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          projects:project_id(name, status)
        `)
        .order('updated_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useMonthlyRevenue = () => {
  return useQuery({
    queryKey: ['monthly-revenue'],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('invoices')
        .select('total, paid_date, type')
        .eq('status', 'paid')
        .eq('type', 'outgoing')
        .not('paid_date', 'is', null);

      if (error) throw error;

      const monthlyData = (data || []).reduce((acc: Record<string, number>, invoice) => {
        const month = new Date(invoice.paid_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        acc[month] = (acc[month] || 0) + invoice.total;
        return acc;
      }, {} as Record<string, number>);

      return Object.entries(monthlyData).map(([month, revenue]) => ({
        month,
        revenue: revenue as number
      }));
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const useProjectStatusDistribution = () => {
  return useQuery({
    queryKey: ['project-status-distribution'],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('projects')
        .select('status');

      if (error) throw error;

      const statusCounts = (data || []).reduce((acc: Record<string, number>, project) => {
        acc[project.status] = (acc[project.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return Object.entries(statusCounts).map(([status, count]) => ({
        status,
        count: count as number
      }));
    },
    staleTime: 10 * 60 * 1000,
  });
};

// =====================================================
// PROJECTS HOOKS
// =====================================================

export const useProjects = (filters?: { status?: string; priority?: string }) => {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      let query = supabase.from('projects').select('*');

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.priority) {
        query = query.eq('priority', filters.priority);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProjectTasks = (projectId: string) => {
  return useQuery({
    queryKey: ['project-tasks', projectId],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProjectEmployees = (projectId: string) => {
  return useQuery({
    queryKey: ['project-employees', projectId],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('employee_projects')
        .select(`
          employees:employee_id(*)
        `)
        .eq('project_id', projectId);

      if (error) throw error;
      return data?.map(item => item.employees) || [];
    },
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (project: any) => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('projects')
        .insert([project])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: any) => {      if (!supabase) throw new Error('Supabase is not configured');      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
};

// =====================================================
// WORKFORCE HOOKS
// =====================================================

export const useEmployees = (filters?: { status?: string; department?: string }) => {
  return useQuery({
    queryKey: ['employees', filters],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      let query = supabase.from('employees').select('*');

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.department) {
        query = query.eq('department', filters.department);
      }

      const { data, error } = await query.order('hire_date', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ['employee', id],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useEmployeeProjects = (employeeId: string) => {
  return useQuery({
    queryKey: ['employee-projects', employeeId],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('employee_projects')
        .select(`
          projects:project_id(*)
        `)
        .eq('employee_id', employeeId);

      if (error) throw error;
      return data?.map(item => item.projects) || [];
    },
    enabled: !!employeeId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useEmployeeTimeEntries = (employeeId: string, dateRange?: { start: string; end: string }) => {
  return useQuery({
    queryKey: ['employee-time-entries', employeeId, dateRange],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      let query = supabase
        .from('time_entries')
        .select('*')
        .eq('employee_id', employeeId);

      if (dateRange) {
        query = query
          .gte('date', dateRange.start)
          .lte('date', dateRange.end);
      }

      const { data, error } = await query.order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!employeeId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAttendance = (date?: string) => {
  return useQuery({
    queryKey: ['attendance', date],
    queryFn: async () => {      if (!supabase) throw new Error('Supabase is not configured');      let query = supabase
        .from('attendance')
        .select(`
          *,
          employees:employee_id(name, avatar, position)
        `);

      if (date) {
        query = query.eq('date', date);
      }

      const { data, error } = await query.order('check_in', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateTimeEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (timeEntry: any) => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('time_entries')
        .insert([timeEntry])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee-time-entries'] });
      queryClient.invalidateQueries({ queryKey: ['time-entries'] });
    },
  });
};

export const useCreateAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (attendance: any) => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('attendance')
        .insert([attendance])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
    },
  });
};

// =====================================================
// FINANCE HOOKS
// =====================================================

export const useInvoices = (filters?: { status?: string; type?: string }) => {
  return useQuery({
    queryKey: ['invoices', filters],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      let query = supabase
        .from('invoices')
        .select(`
          *,
          invoice_items(*)
        `);

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.type) {
        query = query.eq('type', filters.type);
      }

      const { data, error } = await query.order('issue_date', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useExpenses = (filters?: { status?: string; category?: string }) => {
  return useQuery({
    queryKey: ['expenses', filters],
    queryFn: async () => {      if (!supabase) throw new Error('Supabase is not configured');      let query = supabase.from('expenses').select('*');

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      const { data, error } = await query.order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useBudgets = () => {
  return useQuery({
    queryKey: ['budgets'],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('budgets')
        .select(`
          *,
          budget_categories(*),
          projects:project_id(name)
        `);

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invoice: any) => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('invoices')
        .insert([invoice])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expense: any) => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('expenses')
        .insert([expense])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
};

// =====================================================
// INVENTORY HOOKS
// =====================================================

export const useInventory = (filters?: { category?: string; stock_status?: string }) => {
  return useQuery({
    queryKey: ['inventory', filters],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      let query = supabase.from('inventory_items').select('*');

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }
      if (filters?.stock_status) {
        query = query.eq('stock_status', filters.stock_status);
      }

      const { data, error } = await query.order('name', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useOrders = (filters?: { status?: string }) => {
  return useQuery({
    queryKey: ['orders', filters],
    queryFn: async () => {      if (!supabase) throw new Error('Supabase is not configured');      let query = supabase
        .from('orders')
        .select(`
          *,
          order_items(*)
        `);

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query.order('order_date', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useStockMovements = (itemId?: string) => {
  return useQuery({
    queryKey: ['stock-movements', itemId],
    queryFn: async () => {      if (!supabase) throw new Error('Supabase is not configured');      let query = supabase
        .from('stock_movements')
        .select('*')
        .order('created_at', { ascending: false });

      if (itemId) {
        query = query.eq('inventory_item_id', itemId);
      }

      const { data, error } = await query.limit(itemId ? 50 : 20);

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (order: any) => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    },
  });
};

export const useUpdateInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: any) => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('inventory_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    },
  });
};

// =====================================================
// DOCUMENTS HOOKS
// =====================================================

export const useFolders = () => {
  return useQuery({
    queryKey: ['folders'],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('folders')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useDocuments = (filters?: { folder_id?: string; project_id?: string; type?: string }) => {
  return useQuery({
    queryKey: ['documents', filters],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      let query = supabase
        .from('documents')
        .select(`
          *,
          folders:folder_id(name, color),
          projects:project_id(name)
        `);

      if (filters?.folder_id) {
        query = query.eq('folder_id', filters.folder_id);
      }
      if (filters?.project_id) {
        query = query.eq('project_id', filters.project_id);
      }
      if (filters?.type) {
        query = query.eq('type', filters.type);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (document: any) => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('documents')
        .insert([document])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['folders'] });
    },
  });
};

// =====================================================
// TIME TRACKING HOOKS
// =====================================================

export const useTimeEntries = (filters?: { employee_id?: string; project_id?: string; date_range?: { start: string; end: string } }) => {
  return useQuery({
    queryKey: ['time-entries', filters],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      let query = supabase
        .from('time_entries')
        .select(`
          *,
          employees:employee_id(name, avatar),
          projects:project_id(name),
          tasks:task_id(title)
        `);

      if (filters?.employee_id) {
        query = query.eq('employee_id', filters.employee_id);
      }
      if (filters?.project_id) {
        query = query.eq('project_id', filters.project_id);
      }
      if (filters?.date_range) {
        query = query
          .gte('date', filters.date_range.start)
          .lte('date', filters.date_range.end);
      }

      const { data, error } = await query.order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useTasks = (filters?: { project_id?: string; status?: string; assignee_id?: string }) => {
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      let query = supabase
        .from('tasks')
        .select(`
          *,
          projects:project_id(name),
          employees:assignee_id(name, avatar)
        `);

      if (filters?.project_id) {
        query = query.eq('project_id', filters.project_id);
      }
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.assignee_id) {
        query = query.eq('assignee_id', filters.assignee_id);
      }

      const { data, error } = await query.order('due_date', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: any) => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('tasks')
        .insert([task])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['project-tasks'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: any) => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['project-tasks'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
};

// =====================================================
// SETTINGS HOOKS
// =====================================================

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase is not configured');
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: any) => {      if (!supabase) throw new Error('Supabase is not configured');      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};