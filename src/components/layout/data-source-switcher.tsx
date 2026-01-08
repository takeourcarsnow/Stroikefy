import React from 'react';
import { Button } from '@/components/ui';
import { useDataSource } from '@/providers/data-source-provider';
import { Database, FileText } from 'lucide-react';

export const DataSourceSwitcher = () => {
  const { dataSource, setDataSource, isSupabaseAvailable } = useDataSource();

  return (
    <div className="flex items-center gap-2 p-2 bg-surface-50 dark:bg-surface-800 rounded-lg">
      <span className="text-sm font-medium text-surface-700 dark:text-surface-300 mr-2">
        Data Source:
      </span>

      <Button
        variant={dataSource === 'demo' ? 'primary' : 'secondary'}
        size="sm"
        onClick={() => setDataSource('demo')}
        className="flex items-center gap-2"
      >
        <FileText className="h-4 w-4" />
        Demo Data
      </Button>

      <Button
        variant={dataSource === 'supabase' ? 'primary' : 'secondary'}
        size="sm"
        onClick={() => setDataSource('supabase')}
        disabled={!isSupabaseAvailable}
        className="flex items-center gap-2"
      >
        <Database className="h-4 w-4" />
        Supabase
        {!isSupabaseAvailable && (
          <span className="text-xs opacity-75">(Not Connected)</span>
        )}
      </Button>
    </div>
  );
};