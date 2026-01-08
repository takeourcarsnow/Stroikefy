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
    // Check if there's an authenticated session
    const { data: { session } } = await supabase.auth.getSession();
    return Boolean(session);
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
          avatar_url: string | null;
          role: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          avatar_url?: string | null;
          role?: string;
        };
        Update: {
          email?: string;
          name?: string;
          avatar_url?: string | null;
          role?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          name: string;
          description: string;
          status: string;
          priority: string;
          start_date: string;
          end_date: string;
          budget: number;
          spent: number;
          progress: number;
          manager_id: string;
          client_name: string;
          location: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
      };
      // Add more table types as needed
    };
  };
}
