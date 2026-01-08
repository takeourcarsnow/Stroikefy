import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create the client if we have the required credentials
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper to check if Supabase is configured and user is authenticated
export const isSupabaseConfigured = async () => {
  if (!supabaseUrl || !supabaseAnonKey || !supabase) {
    return false;
  }
  
  try {
    // For demo purposes, just check if we can connect to the database
    // Since RLS is disabled, we don't need authentication
    const { data, error } = await supabase.from('projects').select('id').limit(1);
    return !error;
  } catch {
    return false;
  }
};

// Database types (for when connected to Supabase)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          avatar: string | null;
          role: string;
          phone: string | null;
          department: string | null;
          created_at: string;
          last_login: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          avatar?: string | null;
          role?: string;
          phone?: string | null;
          department?: string | null;
        };
        Update: {
          email?: string;
          name?: string;
          avatar?: string | null;
          role?: string;
          phone?: string | null;
          department?: string | null;
        };
      };
      employees: {
        Row: {
          id: string;
          employee_id: string;
          name: string;
          email: string;
          phone: string | null;
          avatar: string | null;
          position: string | null;
          department: string | null;
          type: string;
          status: string;
          hire_date: string | null;
          salary: number;
          skills: string[] | null;
          certifications: string[] | null;
          emergency_contact_name: string | null;
          emergency_contact_phone: string | null;
          emergency_contact_relationship: string | null;
          address_street: string | null;
          address_city: string | null;
          address_state: string | null;
          address_zip: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          employee_id: string;
          name: string;
          email: string;
          phone?: string | null;
          avatar?: string | null;
          position?: string | null;
          department?: string | null;
          type?: string;
          status?: string;
          hire_date?: string | null;
          salary?: number;
          skills?: string[] | null;
          certifications?: string[] | null;
          emergency_contact_name?: string | null;
          emergency_contact_phone?: string | null;
          emergency_contact_relationship?: string | null;
          address_street?: string | null;
          address_city?: string | null;
          address_state?: string | null;
          address_zip?: string | null;
        };
        Update: {
          employee_id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          avatar?: string | null;
          position?: string | null;
          department?: string | null;
          type?: string;
          status?: string;
          hire_date?: string | null;
          salary?: number;
          skills?: string[] | null;
          certifications?: string[] | null;
          emergency_contact_name?: string | null;
          emergency_contact_phone?: string | null;
          emergency_contact_relationship?: string | null;
          address_street?: string | null;
          address_city?: string | null;
          address_state?: string | null;
          address_zip?: string | null;
        };
      };
      projects: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          status: string;
          priority: string;
          start_date: string | null;
          end_date: string | null;
          budget: number;
          spent: number;
          progress: number;
          manager_id: string | null;
          manager_name: string | null;
          client_name: string | null;
          client_contact: string | null;
          location_address: string | null;
          location_city: string | null;
          location_lat: number | null;
          location_lng: number | null;
          team_size: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          status?: string;
          priority?: string;
          start_date?: string | null;
          end_date?: string | null;
          budget?: number;
          spent?: number;
          progress?: number;
          manager_id?: string | null;
          manager_name?: string | null;
          client_name?: string | null;
          client_contact?: string | null;
          location_address?: string | null;
          location_city?: string | null;
          location_lat?: number | null;
          location_lng?: number | null;
          team_size?: number;
        };
        Update: {
          name?: string;
          description?: string | null;
          status?: string;
          priority?: string;
          start_date?: string | null;
          end_date?: string | null;
          budget?: number;
          spent?: number;
          progress?: number;
          manager_id?: string | null;
          manager_name?: string | null;
          client_name?: string | null;
          client_contact?: string | null;
          location_address?: string | null;
          location_city?: string | null;
          location_lat?: number | null;
          location_lng?: number | null;
          team_size?: number;
        };
      };
      tasks: {
        Row: {
          id: string;
          project_id: string | null;
          title: string;
          description: string | null;
          status: string;
          priority: string;
          assignee_id: string | null;
          assignee_name: string | null;
          due_date: string | null;
          estimated_hours: number;
          actual_hours: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id?: string | null;
          title: string;
          description?: string | null;
          status?: string;
          priority?: string;
          assignee_id?: string | null;
          assignee_name?: string | null;
          due_date?: string | null;
          estimated_hours?: number;
          actual_hours?: number;
        };
        Update: {
          project_id?: string | null;
          title?: string;
          description?: string | null;
          status?: string;
          priority?: string;
          assignee_id?: string | null;
          assignee_name?: string | null;
          due_date?: string | null;
          estimated_hours?: number;
          actual_hours?: number;
        };
      };
      employee_projects: {
        Row: {
          id: string;
          employee_id: string;
          project_id: string;
          assigned_at: string;
        };
        Insert: {
          id?: string;
          employee_id: string;
          project_id: string;
          assigned_at?: string;
        };
        Update: {
          employee_id?: string;
          project_id?: string;
          assigned_at?: string;
        };
      };
      time_entries: {
        Row: {
          id: string;
          employee_id: string;
          employee_name: string | null;
          project_id: string | null;
          project_name: string | null;
          task_id: string | null;
          task_name: string | null;
          date: string;
          start_time: string;
          end_time: string;
          break_minutes: number;
          total_hours: number;
          description: string | null;
          status: string;
          approved_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          employee_id: string;
          employee_name?: string | null;
          project_id?: string | null;
          project_name?: string | null;
          task_id?: string | null;
          task_name?: string | null;
          date: string;
          start_time: string;
          end_time: string;
          break_minutes?: number;
          total_hours?: number;
          description?: string | null;
          status?: string;
          approved_by?: string | null;
        };
        Update: {
          employee_id?: string;
          employee_name?: string | null;
          project_id?: string | null;
          project_name?: string | null;
          task_id?: string | null;
          task_name?: string | null;
          date?: string;
          start_time?: string;
          end_time?: string;
          break_minutes?: number;
          total_hours?: number;
          description?: string | null;
          status?: string;
          approved_by?: string | null;
        };
      };
      attendance: {
        Row: {
          id: string;
          employee_id: string;
          employee_name: string | null;
          date: string;
          check_in: string | null;
          check_out: string | null;
          status: string;
          notes: string | null;
        };
        Insert: {
          id?: string;
          employee_id: string;
          employee_name?: string | null;
          date: string;
          check_in?: string | null;
          check_out?: string | null;
          status?: string;
          notes?: string | null;
        };
        Update: {
          employee_id?: string;
          employee_name?: string | null;
          date?: string;
          check_in?: string | null;
          check_out?: string | null;
          status?: string;
          notes?: string | null;
        };
      };
      invoices: {
        Row: {
          id: string;
          invoice_number: string;
          type: string | null;
          status: string;
          project_id: string | null;
          project_name: string | null;
          client_name: string | null;
          client_email: string | null;
          client_address: string | null;
          subtotal: number;
          tax: number;
          total: number;
          issue_date: string | null;
          due_date: string | null;
          paid_date: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invoice_number: string;
          type?: string | null;
          status?: string;
          project_id?: string | null;
          project_name?: string | null;
          client_name?: string | null;
          client_email?: string | null;
          client_address?: string | null;
          subtotal?: number;
          tax?: number;
          total?: number;
          issue_date?: string | null;
          due_date?: string | null;
          paid_date?: string | null;
          notes?: string | null;
        };
        Update: {
          invoice_number?: string;
          type?: string | null;
          status?: string;
          project_id?: string | null;
          project_name?: string | null;
          client_name?: string | null;
          client_email?: string | null;
          client_address?: string | null;
          subtotal?: number;
          tax?: number;
          total?: number;
          issue_date?: string | null;
          due_date?: string | null;
          paid_date?: string | null;
          notes?: string | null;
        };
      };
      invoice_items: {
        Row: {
          id: string;
          invoice_id: string;
          description: string;
          quantity: number;
          unit_price: number;
          total: number;
        };
        Insert: {
          id?: string;
          invoice_id: string;
          description: string;
          quantity?: number;
          unit_price?: number;
          total?: number;
        };
        Update: {
          invoice_id?: string;
          description?: string;
          quantity?: number;
          unit_price?: number;
          total?: number;
        };
      };
      expenses: {
        Row: {
          id: string;
          description: string;
          amount: number;
          category: string;
          status: string;
          project_id: string | null;
          project_name: string | null;
          employee_id: string | null;
          employee_name: string | null;
          date: string;
          approved_by: string | null;
          approved_at: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          description: string;
          amount: number;
          category: string;
          status?: string;
          project_id?: string | null;
          project_name?: string | null;
          employee_id?: string | null;
          employee_name?: string | null;
          date: string;
          approved_by?: string | null;
          approved_at?: string | null;
          notes?: string | null;
        };
        Update: {
          description?: string;
          amount?: number;
          category?: string;
          status?: string;
          project_id?: string | null;
          project_name?: string | null;
          employee_id?: string | null;
          employee_name?: string | null;
          date?: string;
          approved_by?: string | null;
          approved_at?: string | null;
          notes?: string | null;
        };
      };
      budgets: {
        Row: {
          id: string;
          project_id: string;
          project_name: string | null;
          total_budget: number;
          allocated: number;
          spent: number;
          remaining: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          project_name?: string | null;
          total_budget?: number;
          allocated?: number;
          spent?: number;
          remaining?: number;
        };
        Update: {
          project_id?: string;
          project_name?: string | null;
          total_budget?: number;
          allocated?: number;
          spent?: number;
          remaining?: number;
        };
      };
      budget_categories: {
        Row: {
          id: string;
          budget_id: string;
          name: string;
          allocated: number;
          spent: number;
        };
        Insert: {
          id?: string;
          budget_id: string;
          name: string;
          allocated?: number;
          spent?: number;
        };
        Update: {
          budget_id?: string;
          name?: string;
          allocated?: number;
          spent?: number;
        };
      };
      inventory_items: {
        Row: {
          id: string;
          sku: string;
          name: string;
          description: string | null;
          category: string;
          unit: string | null;
          quantity: number;
          min_quantity: number;
          max_quantity: number;
          unit_price: number;
          total_value: number;
          location: string | null;
          supplier: string | null;
          supplier_contact: string | null;
          last_restocked: string | null;
          stock_status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          sku: string;
          name: string;
          description?: string | null;
          category?: string;
          unit?: string | null;
          quantity?: number;
          min_quantity?: number;
          max_quantity?: number;
          unit_price?: number;
          total_value?: number;
          location?: string | null;
          supplier?: string | null;
          supplier_contact?: string | null;
          last_restocked?: string | null;
          stock_status?: string;
        };
        Update: {
          sku?: string;
          name?: string;
          description?: string | null;
          category?: string;
          unit?: string | null;
          quantity?: number;
          min_quantity?: number;
          max_quantity?: number;
          unit_price?: number;
          total_value?: number;
          location?: string | null;
          supplier?: string | null;
          supplier_contact?: string | null;
          last_restocked?: string | null;
          stock_status?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          status: string;
          supplier: string | null;
          supplier_email: string | null;
          project_id: string | null;
          project_name: string | null;
          subtotal: number;
          tax: number;
          shipping: number;
          total: number;
          requested_by: string | null;
          approved_by: string | null;
          order_date: string | null;
          expected_delivery: string | null;
          actual_delivery: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          status?: string;
          supplier?: string | null;
          supplier_email?: string | null;
          project_id?: string | null;
          project_name?: string | null;
          subtotal?: number;
          tax?: number;
          shipping?: number;
          total?: number;
          requested_by?: string | null;
          approved_by?: string | null;
          order_date?: string | null;
          expected_delivery?: string | null;
          actual_delivery?: string | null;
          notes?: string | null;
        };
        Update: {
          order_number?: string;
          status?: string;
          supplier?: string | null;
          supplier_email?: string | null;
          project_id?: string | null;
          project_name?: string | null;
          subtotal?: number;
          tax?: number;
          shipping?: number;
          total?: number;
          requested_by?: string | null;
          approved_by?: string | null;
          order_date?: string | null;
          expected_delivery?: string | null;
          actual_delivery?: string | null;
          notes?: string | null;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          inventory_item_id: string | null;
          name: string;
          sku: string | null;
          quantity: number;
          unit_price: number;
          total: number;
        };
        Insert: {
          id?: string;
          order_id: string;
          inventory_item_id?: string | null;
          name: string;
          sku?: string | null;
          quantity?: number;
          unit_price?: number;
          total?: number;
        };
        Update: {
          order_id?: string;
          inventory_item_id?: string | null;
          name?: string;
          sku?: string | null;
          quantity?: number;
          unit_price?: number;
          total?: number;
        };
      };
      stock_movements: {
        Row: {
          id: string;
          inventory_item_id: string;
          item_name: string | null;
          type: string;
          quantity: number;
          previous_quantity: number | null;
          new_quantity: number | null;
          project_id: string | null;
          project_name: string | null;
          reason: string | null;
          performed_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          inventory_item_id: string;
          item_name?: string | null;
          type: string;
          quantity: number;
          previous_quantity?: number | null;
          new_quantity?: number | null;
          project_id?: string | null;
          project_name?: string | null;
          reason?: string | null;
          performed_by?: string | null;
        };
        Update: {
          inventory_item_id?: string;
          item_name?: string | null;
          type?: string;
          quantity?: number;
          previous_quantity?: number | null;
          new_quantity?: number | null;
          project_id?: string | null;
          project_name?: string | null;
          reason?: string | null;
          performed_by?: string | null;
        };
      };
      folders: {
        Row: {
          id: string;
          name: string;
          color: string;
          project_id: string | null;
          documents_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          color?: string;
          project_id?: string | null;
          documents_count?: number;
        };
        Update: {
          name?: string;
          color?: string;
          project_id?: string | null;
          documents_count?: number;
        };
      };
      documents: {
        Row: {
          id: string;
          name: string;
          type: string;
          file_type: string | null;
          file_size: number;
          url: string | null;
          project_id: string | null;
          project_name: string | null;
          folder_id: string | null;
          uploaded_by: string | null;
          uploaded_by_name: string | null;
          tags: string[] | null;
          description: string | null;
          version: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type?: string;
          file_type?: string | null;
          file_size?: number;
          url?: string | null;
          project_id?: string | null;
          project_name?: string | null;
          folder_id?: string | null;
          uploaded_by?: string | null;
          uploaded_by_name?: string | null;
          tags?: string[] | null;
          description?: string | null;
          version?: number;
        };
        Update: {
          name?: string;
          type?: string;
          file_type?: string | null;
          file_size?: number;
          url?: string | null;
          project_id?: string | null;
          project_name?: string | null;
          folder_id?: string | null;
          uploaded_by?: string | null;
          uploaded_by_name?: string | null;
          tags?: string[] | null;
          description?: string | null;
          version?: number;
        };
      };
    };
  };
}
