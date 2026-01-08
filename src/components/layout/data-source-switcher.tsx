import React from 'react';
import { useDataSource } from '@/providers/data-source-provider';
import { Database } from 'lucide-react';

export const DataSourceSwitcher = () => {
  const { isSupabaseAvailable } = useDataSource();

  return (
    <div className="flex items-center gap-2 p-2 bg-surface-50 dark:bg-surface-800 rounded-lg">
      <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
        Data Source:
      </span>

      <div className="flex items-center gap-2">
        <Database className="h-4 w-4" />
        <span className="text-sm">
          Supabase
          {!isSupabaseAvailable && (
            <span className="text-xs opacity-75 text-red-500">(Not Connected)</span>
          )}
        </span>
      </div>
    </div>
  );
};