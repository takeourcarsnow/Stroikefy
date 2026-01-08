import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { isSupabaseConfigured } from '@/lib/supabase';

// Data source types
export type DataSource = 'supabase';

// Context for data source management
interface DataSourceContextType {
  dataSource: DataSource;
  isSupabaseAvailable: boolean;
  setSupabaseAvailable: (available: boolean) => void;
}

const DataSourceContext = createContext<DataSourceContextType | undefined>(undefined);

// Provider component
export const DataSourceProvider = ({ children }: { children: ReactNode }) => {
  const [dataSource] = useState<DataSource>('supabase'); // Always use Supabase
  const [isSupabaseAvailable, setSupabaseAvailable] = useState(false);

  useEffect(() => {
    // Check Supabase availability asynchronously
    const checkSupabase = async () => {
      const available = await isSupabaseConfigured();
      setSupabaseAvailable(available);
    };
    checkSupabase();
  }, []);

  return (
    <DataSourceContext.Provider
      value={{
        dataSource,
        isSupabaseAvailable,
        setSupabaseAvailable,
      }}
    >
      {children}
    </DataSourceContext.Provider>
  );
};

// Hook to use data source context
export const useDataSource = () => {
  const context = useContext(DataSourceContext);
  if (context === undefined) {
    throw new Error('useDataSource must be used within a DataSourceProvider');
  }
  return context;
};

// Generic hook that uses Supabase data
export const useDataWithFallback = <T,>(
  supabaseHook: (options?: { enabled?: boolean }) => any,
  options?: {
    enabled?: boolean;
  }
) => {
  const { isSupabaseAvailable } = useDataSource();

  // Always try to use Supabase
  const supabaseResult = supabaseHook({ enabled: options?.enabled ?? true });

  // If Supabase is not available, return empty array
  if (!isSupabaseAvailable) {
    return {
      data: [],
      isLoading: false,
      error: new Error('Supabase is not configured'),
      isDemoData: false,
    };
  }

  return {
    ...supabaseResult,
    isDemoData: false,
  };
};