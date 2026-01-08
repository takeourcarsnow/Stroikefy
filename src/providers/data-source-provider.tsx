import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { isSupabaseConfigured } from '@/lib/supabase';

// Data source types
export type DataSource = 'supabase' | 'demo';

// Context for data source management
interface DataSourceContextType {
  dataSource: DataSource;
  setDataSource: (source: DataSource) => void;
  isSupabaseAvailable: boolean;
  setSupabaseAvailable: (available: boolean) => void;
}

const DataSourceContext = createContext<DataSourceContextType | undefined>(undefined);

// Provider component
export const DataSourceProvider = ({ children }: { children: ReactNode }) => {
  const [dataSource, setDataSource] = useState<DataSource>('demo'); // Default to demo for development
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
        setDataSource,
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

// Generic hook that switches between Supabase and demo data
export const useDataWithFallback = <T,>(
  supabaseHook: (options?: { enabled?: boolean }) => any,
  demoData: T,
  options?: {
    enabled?: boolean;
    fallbackOnError?: boolean;
  }
) => {
  const { dataSource, isSupabaseAvailable } = useDataSource();

  const shouldUseSupabase = dataSource === 'supabase' && isSupabaseAvailable;

  // Only call the Supabase hook when using Supabase
  const supabaseResult = shouldUseSupabase ? supabaseHook({ enabled: options?.enabled ?? true }) : null;

  // If using demo data or Supabase is not available, return demo data
  if (!shouldUseSupabase || !supabaseResult) {
    return {
      data: demoData,
      isLoading: false,
      error: null,
      isDemoData: true,
    };
  }

  // If there's an error and fallback is enabled, use demo data
  if (supabaseResult.error && options?.fallbackOnError) {
    return {
      ...supabaseResult,
      data: demoData,
      isDemoData: true,
    };
  }

  return {
    ...supabaseResult,
    isDemoData: false,
  };
};