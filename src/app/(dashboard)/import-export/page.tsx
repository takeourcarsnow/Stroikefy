'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardHeader, Button, Badge, Select, Modal, ModalFooter, FileUpload, Table, Alert } from '@/components/ui';
import { cn } from '@/lib/utils';
import { parseExcelFile, exportToExcel, mapRowToEmployee, mapRowToInventoryItem, mapRowToTask, getEmployeeSampleTemplate, getInventorySampleTemplate, getTaskSampleTemplate } from '@/lib/excel';
import { mockProjects, mockEmployees, mockInventoryItems } from '@/data';
import {
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  Eye,
  Trash2,
  ArrowRight,
  FileText,
  Users,
  Package,
  ClipboardList,
} from 'lucide-react';

type ImportType = 'employees' | 'inventory' | 'tasks';

interface ImportResult {
  success: number;
  failed: number;
  errors: string[];
  data: any[];
}

export default function ImportExportPage() {
  const [activeTab, setActiveTab] = useState<'import' | 'export'>('import');
  const [importType, setImportType] = useState<ImportType>('employees');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const importTypes = [
    { value: 'employees', label: 'Employees', icon: Users, description: 'Import employee data' },
    { value: 'inventory', label: 'Inventory', icon: Package, description: 'Import inventory items' },
    { value: 'tasks', label: 'Tasks', icon: ClipboardList, description: 'Import project tasks' },
  ];

  const exportTypes = [
    { type: 'employees', label: 'Employees', icon: Users, data: mockEmployees },
    { type: 'projects', label: 'Projects', icon: FileText, data: mockProjects },
    { type: 'inventory', label: 'Inventory', icon: Package, data: mockInventoryItems },
  ];

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setImportResult(null);
    }
  };

  const processImport = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      const data = await parseExcelFile(selectedFile);
      
      const result: ImportResult = {
        success: 0,
        failed: 0,
        errors: [],
        data: [],
      };

      const mapper = importType === 'employees' 
        ? mapRowToEmployee 
        : importType === 'inventory' 
        ? mapRowToInventoryItem 
        : mapRowToTask;

      data.forEach((row, index) => {
        try {
          const mapped = mapper(row);
          if (mapped) {
            result.data.push(mapped);
            result.success++;
          } else {
            result.failed++;
            result.errors.push(`Row ${index + 2}: Invalid data`);
          }
        } catch (err: any) {
          result.failed++;
          result.errors.push(`Row ${index + 2}: ${err.message}`);
        }
      });

      setImportResult(result);
    } catch (err: any) {
      setImportResult({
        success: 0,
        failed: 1,
        errors: [err.message],
        data: [],
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = (type: string, data: any[]) => {
    exportToExcel(data, `${type}_export_${new Date().toISOString().split('T')[0]}`);
  };

  const downloadTemplate = () => {
    const template = importType === 'employees' 
      ? getEmployeeSampleTemplate()
      : importType === 'inventory'
      ? getInventorySampleTemplate()
      : getTaskSampleTemplate();

    exportToExcel(template, `${importType}_template`);
  };

  const resetImport = () => {
    setSelectedFile(null);
    setImportResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Import & Export</h1>
          <p className="text-surface-500">Import data from Excel or export your data</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-surface-200 dark:border-surface-700">
        <button
          onClick={() => setActiveTab('import')}
          className={cn(
            'px-6 py-3 font-medium border-b-2 transition-colors',
            activeTab === 'import'
              ? 'text-primary-600 border-primary-600'
              : 'text-surface-500 border-transparent hover:text-surface-700'
          )}
        >
          <Upload className="h-4 w-4 inline mr-2" />
          Import
        </button>
        <button
          onClick={() => setActiveTab('export')}
          className={cn(
            'px-6 py-3 font-medium border-b-2 transition-colors',
            activeTab === 'export'
              ? 'text-primary-600 border-primary-600'
              : 'text-surface-500 border-transparent hover:text-surface-700'
          )}
        >
          <Download className="h-4 w-4 inline mr-2" />
          Export
        </button>
      </div>

      {/* Import Tab */}
      {activeTab === 'import' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Import Type Selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader title="Select Data Type" description="Choose what you want to import" />
              <div className="space-y-2">
                {importTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      onClick={() => {
                        setImportType(type.value as ImportType);
                        resetImport();
                      }}
                      className={cn(
                        'w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all',
                        importType === type.value
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                          : 'border-surface-200 dark:border-surface-700 hover:border-surface-300'
                      )}
                    >
                      <div className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center',
                        importType === type.value
                          ? 'bg-primary-600 text-white'
                          : 'bg-surface-100 dark:bg-surface-800 text-surface-500'
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <p className={cn(
                          'font-medium',
                          importType === type.value
                            ? 'text-primary-600'
                            : 'text-surface-900 dark:text-white'
                        )}>
                          {type.label}
                        </p>
                        <p className="text-sm text-surface-500">{type.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-surface-200 dark:border-surface-700">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  leftIcon={<Download className="h-4 w-4" />}
                  onClick={downloadTemplate}
                >
                  Download Template
                </Button>
              </div>
            </Card>
          </div>

          {/* File Upload & Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload */}
            <Card>
              <CardHeader title="Upload File" description="Upload an Excel file (.xlsx, .xls) or CSV" />
              
              {!selectedFile ? (
                <FileUpload
                  accept=".xlsx,.xls,.csv"
                  onFilesSelected={handleFileSelect}
                  maxSize={10 * 1024 * 1024}
                />
              ) : (
                <div className="p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileSpreadsheet className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="font-medium text-surface-900 dark:text-white">{selectedFile.name}</p>
                        <p className="text-sm text-surface-500">
                          {(selectedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={resetImport}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {selectedFile && !importResult && (
                <div className="mt-4 flex gap-2">
                  <Button 
                    onClick={processImport} 
                    isLoading={isProcessing}
                    className="flex-1"
                  >
                    {!isProcessing && (
                      <>
                        Process Import
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </Card>

            {/* Import Results */}
            {importResult && (
              <Card>
                <CardHeader title="Import Results" />
                
                {/* Summary */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">{importResult.success}</p>
                    <p className="text-sm text-green-700 dark:text-green-400">Successful</p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                    <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-red-600">{importResult.failed}</p>
                    <p className="text-sm text-red-700 dark:text-red-400">Failed</p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">{importResult.success + importResult.failed}</p>
                    <p className="text-sm text-blue-700 dark:text-blue-400">Total Rows</p>
                  </div>
                </div>

                {/* Errors */}
                {importResult.errors.length > 0 && (
                  <Alert variant="error" className="mb-4">
                    <div>
                      <p className="font-medium mb-2">Import Errors:</p>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {importResult.errors.slice(0, 5).map((error, idx) => (
                          <li key={idx}>{error}</li>
                        ))}
                        {importResult.errors.length > 5 && (
                          <li>...and {importResult.errors.length - 5} more errors</li>
                        )}
                      </ul>
                    </div>
                  </Alert>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  {importResult.success > 0 && (
                    <>
                      <Button leftIcon={<Eye className="h-4 w-4" />} onClick={() => setShowPreviewModal(true)}>
                        Preview Data
                      </Button>
                      <Button variant="primary">
                        Confirm Import ({importResult.success} rows)
                      </Button>
                    </>
                  )}
                  <Button variant="outline" onClick={resetImport} leftIcon={<RefreshCw className="h-4 w-4" />}>
                    Start Over
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Export Tab */}
      {activeTab === 'export' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exportTypes.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.type}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                    Export {item.label}
                  </h3>
                  <p className="text-surface-500 mb-4">
                    {item.data.length} records available
                  </p>
                  <div className="space-y-2">
                    <Button 
                      className="w-full"
                      onClick={() => handleExport(item.type, item.data)}
                      leftIcon={<FileSpreadsheet className="h-4 w-4" />}
                    >
                      Export as Excel
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        const csv = [
                          Object.keys(item.data[0] || {}).join(','),
                          ...item.data.map(row => Object.values(row).join(','))
                        ].join('\n');
                        const blob = new Blob([csv], { type: 'text/csv' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${item.type}_export.csv`;
                        a.click();
                      }}
                    >
                      Export as CSV
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}

          {/* Custom Export */}
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader title="Custom Export" description="Create a custom export with specific fields and filters" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="Data Type"
                options={[
                  { value: 'employees', label: 'Employees' },
                  { value: 'projects', label: 'Projects' },
                  { value: 'inventory', label: 'Inventory' },
                  { value: 'invoices', label: 'Invoices' },
                  { value: 'expenses', label: 'Expenses' },
                  { value: 'time-entries', label: 'Time Entries' },
                ]}
                placeholder="Select data type"
              />
              <Select
                label="Date Range"
                options={[
                  { value: 'all', label: 'All Time' },
                  { value: 'today', label: 'Today' },
                  { value: 'week', label: 'This Week' },
                  { value: 'month', label: 'This Month' },
                  { value: 'year', label: 'This Year' },
                  { value: 'custom', label: 'Custom Range' },
                ]}
                placeholder="Select range"
              />
              <Select
                label="Format"
                options={[
                  { value: 'xlsx', label: 'Excel (.xlsx)' },
                  { value: 'csv', label: 'CSV (.csv)' },
                  { value: 'json', label: 'JSON (.json)' },
                ]}
                placeholder="Select format"
              />
            </div>
            <div className="mt-4">
              <Button leftIcon={<Download className="h-4 w-4" />}>
                Generate Export
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Preview Modal */}
      <Modal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title="Preview Import Data"
        size="xl"
      >
        {importResult && importResult.data.length > 0 && (
          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-sm">
              <thead className="bg-surface-50 dark:bg-surface-800 sticky top-0">
                <tr>
                  {Object.keys(importResult.data[0]).slice(0, 6).map(key => (
                    <th key={key} className="text-left p-3 font-medium text-surface-600 dark:text-surface-400">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                {importResult.data.slice(0, 10).map((row, idx) => (
                  <tr key={idx}>
                    {Object.values(row).slice(0, 6).map((value: any, vidx) => (
                      <td key={vidx} className="p-3 text-surface-900 dark:text-white">
                        {String(value || '-').substring(0, 30)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {importResult.data.length > 10 && (
              <p className="text-center text-surface-500 py-4">
                Showing 10 of {importResult.data.length} rows
              </p>
            )}
          </div>
        )}
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowPreviewModal(false)}>Close</Button>
          <Button>Confirm Import</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
