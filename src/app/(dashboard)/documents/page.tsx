'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { Card, CardHeader, Button, Badge, Input, Select, Modal, ModalFooter, EmptyState, FileUpload, Textarea } from '@/components/ui';
import { cn, formatDate, formatFileSize } from '@/lib/utils';
import { useDocuments, useProjects, useFolders } from '@/hooks/data-hooks';
import { DOCUMENT_STATUS_COLORS, Document, DocumentType, Project } from '@/types';
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  File,
  FileText,
  FileImage,
  FileSpreadsheet,
  Folder,
  FolderOpen,
  Grid3X3,
  List,
  MoreVertical,
  Eye,
  Trash2,
  Edit,
  Share2,
  Clock,
  User,
  ChevronRight,
  Home,
} from 'lucide-react';
import { useTranslation } from '@/hooks';

const getFileIcon = (type: DocumentType) => {
  switch (type) {
    case 'contract':
      return <FileText className="h-8 w-8 text-purple-500" />;
    case 'permit':
      return <FileText className="h-8 w-8 text-green-500" />;
    case 'blueprint':
      return <FileText className="h-8 w-8 text-blue-500" />;
    case 'report':
      return <FileSpreadsheet className="h-8 w-8 text-yellow-500" />;
    case 'invoice':
      return <FileText className="h-8 w-8 text-orange-500" />;
    case 'receipt':
      return <FileText className="h-8 w-8 text-pink-500" />;
    case 'photo':
      return <FileImage className="h-8 w-8 text-cyan-500" />;
    case 'safety':
      return <FileText className="h-8 w-8 text-red-500" />;
    case 'certification':
      return <FileText className="h-8 w-8 text-indigo-500" />;
    default:
      return <File className="h-8 w-8 text-blue-500" />;
  }
};

const getFileIconSmall = (type: DocumentType) => {
  switch (type) {
    case 'contract':
      return <FileText className="h-5 w-5 text-purple-500" />;
    case 'permit':
      return <FileText className="h-5 w-5 text-green-500" />;
    case 'blueprint':
      return <FileText className="h-5 w-5 text-blue-500" />;
    case 'report':
      return <FileSpreadsheet className="h-5 w-5 text-yellow-500" />;
    case 'invoice':
      return <FileText className="h-5 w-5 text-orange-500" />;
    case 'receipt':
      return <FileText className="h-5 w-5 text-pink-500" />;
    case 'photo':
      return <FileImage className="h-5 w-5 text-cyan-500" />;
    case 'safety':
      return <FileText className="h-5 w-5 text-red-500" />;
    case 'certification':
      return <FileText className="h-5 w-5 text-indigo-500" />;
    default:
      return <File className="h-5 w-5 text-blue-500" />;
  }
};

export default function DocumentsPage() {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentFolder, setCurrentFolder] = useState<string[]>(['All Documents']);

  const { data: documents = [], isLoading: documentsLoading } = useDocuments();
  const { data: projects = [], isLoading: projectsLoading } = useProjects();
  const { data: folders = [], isLoading: foldersLoading } = useFolders();

  const isLoading = documentsLoading || projectsLoading || foldersLoading;

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'contract', label: 'Contracts' },
    { value: 'permit', label: 'Permits' },
    { value: 'blueprint', label: 'Blueprints' },
    { value: 'report', label: 'Reports' },
    { value: 'invoice', label: 'Invoices' },
    { value: 'receipt', label: 'Receipts' },
    { value: 'photo', label: 'Photos' },
    { value: 'safety', label: 'Safety' },
    { value: 'certification', label: 'Certifications' },
    { value: 'other', label: 'Other' },
  ];

  const projectOptions = [
    { value: 'all', label: 'All Projects' },
    ...(projects || []).map((p: Project) => ({ value: p.id, label: p.name })),
  ];

  const filteredDocuments = (documents || []).filter((doc: Document) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesProject = projectFilter === 'all' || doc.projectId === projectFilter;
    return matchesSearch && matchesType && matchesProject;
  });

  // Group by folders for visualization
  const folderStats = [
    { name: 'Contracts', count: 3, color: 'bg-blue-500' },
    { name: 'Permits', count: 5, color: 'bg-green-500' },
    { name: 'Blueprints', count: 8, color: 'bg-purple-500' },
    { name: 'Invoices', count: 12, color: 'bg-orange-500' },
    { name: 'Reports', count: 6, color: 'bg-red-500' },
  ];

  // Stats
  const totalDocs = documents.length;
  const totalSize = documents.reduce((sum: number, doc: Document) => sum + doc.fileSize, 0);
  const recentDocs = [...documents].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  ).slice(0, 5);

  if (isLoading) {
    return <div>Loading documents...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">{t('documents.title')}</h1>
          <p className="text-surface-500">{t('documents.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
            {t('documents.downloadAll')}
          </Button>
          <Button leftIcon={<Upload className="h-4 w-4" />} onClick={() => setShowUploadModal(true)}>
            {t('documents.upload')}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30">
              <FileText className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-surface-500">{t('documents.totalFiles')}</p>
              <p className="text-xl font-bold text-surface-900 dark:text-white">{totalDocs}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <Folder className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-surface-500">{t('documents.folders')}</p>
              <p className="text-xl font-bold text-surface-900 dark:text-white">{folders.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-surface-500">{t('documents.totalSize')}</p>
              <p className="text-xl font-bold text-surface-900 dark:text-white">{formatFileSize(totalSize)}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-surface-500">{t('documents.recent')}</p>
              <p className="text-xl font-bold text-surface-900 dark:text-white">{recentDocs.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <button 
          className="flex items-center gap-1 text-surface-500 hover:text-primary-600"
          onClick={() => setCurrentFolder(['All Documents'])}
        >
          <Home className="h-4 w-4" />
        </button>
        {currentFolder.map((folder, index) => (
          <React.Fragment key={index}>
            <ChevronRight className="h-4 w-4 text-surface-400" />
            <button 
              className={cn(
                index === currentFolder.length - 1 
                  ? 'text-surface-900 dark:text-white font-medium' 
                  : 'text-surface-500 hover:text-primary-600'
              )}
            >
              {folder}
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder={t('documents.searchDocuments')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select
              options={typeOptions}
              value={typeFilter}
              onChange={setTypeFilter}
              className="w-full sm:w-40"
            />
            <Select
              options={projectOptions}
              value={projectFilter}
              onChange={setProjectFilter}
              className="w-full sm:w-48"
            />
            <div className="flex border border-surface-200 dark:border-surface-700 rounded-lg">
              <button
                className={cn(
                  'p-2 rounded-l-lg',
                  viewMode === 'grid' 
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30' 
                    : 'text-surface-500 hover:text-surface-700'
                )}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-5 w-5" />
              </button>
              <button
                className={cn(
                  'p-2 rounded-r-lg',
                  viewMode === 'list' 
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30' 
                    : 'text-surface-500 hover:text-surface-700'
                )}
                onClick={() => setViewMode('list')}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Folders */}
      {currentFolder.length === 1 && (
        <div>
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">Folders</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {folderStats.map((folder, index) => (
              <button
                key={index}
                onClick={() => setCurrentFolder([...currentFolder, folder.name])}
                className="p-4 bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 hover:border-primary-500 hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', folder.color)}>
                    <Folder className="h-5 w-5 text-white" />
                  </div>
                  <ChevronRight className="h-4 w-4 text-surface-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </div>
                <h3 className="font-medium text-surface-900 dark:text-white">{folder.name}</h3>
                <p className="text-sm text-surface-500">{folder.count} files</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Documents */}
      <div>
        <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          {currentFolder.length > 1 ? `Files in ${currentFolder[currentFolder.length - 1]}` : 'Recent Files'}
        </h2>
        
        {filteredDocuments.length === 0 ? (
          <EmptyState
            icon={<FileText className="h-8 w-8" />}
            title="No documents found"
            description="Upload your first document or adjust your search"
            action={
              <Button onClick={() => setShowUploadModal(true)} leftIcon={<Upload className="h-4 w-4" />}>
                Upload Document
              </Button>
            }
          />
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredDocuments.map((doc: Document) => {
              const project = projects.find((p: Project) => p.id === doc.projectId);
              return (
                <div
                  key={doc.id}
                  className="p-4 bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 hover:border-primary-500 hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="flex justify-center mb-3">
                    {getFileIcon(doc.type)}
                  </div>
                  <h3 className="font-medium text-surface-900 dark:text-white text-center truncate" title={doc.name}>
                    {doc.name}
                  </h3>
                  <p className="text-xs text-surface-500 text-center mt-1">{formatFileSize(doc.fileSize)}</p>
                  <div className="flex items-center justify-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 hover:bg-surface-100 dark:hover:bg-surface-700 rounded">
                      <Eye className="h-4 w-4 text-surface-500" />
                    </button>
                    <button className="p-1.5 hover:bg-surface-100 dark:hover:bg-surface-700 rounded">
                      <Download className="h-4 w-4 text-surface-500" />
                    </button>
                    <button className="p-1.5 hover:bg-surface-100 dark:hover:bg-surface-700 rounded">
                      <Share2 className="h-4 w-4 text-surface-500" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Card className="p-0 overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-50 dark:bg-surface-800/50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-surface-500">Name</th>
                  <th className="text-left p-4 text-sm font-medium text-surface-500 hidden sm:table-cell">Project</th>
                  <th className="text-left p-4 text-sm font-medium text-surface-500 hidden md:table-cell">Size</th>
                  <th className="text-left p-4 text-sm font-medium text-surface-500 hidden lg:table-cell">Modified</th>
                  <th className="text-left p-4 text-sm font-medium text-surface-500">Status</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                {filteredDocuments.map((doc: Document) => {
                  const project = projects.find((p: Project) => p.id === doc.projectId);
                  return (
                    <tr key={doc.id} className="hover:bg-surface-50 dark:hover:bg-surface-800/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {getFileIconSmall(doc.type)}
                          <span className="font-medium text-surface-900 dark:text-white">{doc.name}</span>
                        </div>
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <span className="text-surface-600 dark:text-surface-400">{project?.name || '-'}</span>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <span className="text-surface-600 dark:text-surface-400">{formatFileSize(doc.fileSize)}</span>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <span className="text-surface-600 dark:text-surface-400">{formatDate(doc.updatedAt)}</span>
                      </td>
                      <td className="p-4">
                        <Badge variant="custom" className={DOCUMENT_STATUS_COLORS[doc.status]}>
                          {doc.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 hover:bg-surface-100 dark:hover:bg-surface-700 rounded">
                            <Eye className="h-4 w-4 text-surface-500" />
                          </button>
                          <button className="p-1.5 hover:bg-surface-100 dark:hover:bg-surface-700 rounded">
                            <Download className="h-4 w-4 text-surface-500" />
                          </button>
                          <button className="p-1.5 hover:bg-surface-100 dark:hover:bg-surface-700 rounded">
                            <MoreVertical className="h-4 w-4 text-surface-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        )}
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload Documents"
        size="lg"
      >
        <div className="space-y-4">
          <FileUpload
            accept="*/*"
            multiple
            maxSize={50 * 1024 * 1024}
            onFilesSelected={(files) => console.log('Selected files:', files)}
          />
          
          <Select
            label="Project (optional)"
            options={projectOptions}
            placeholder="Select project"
          />
          
          <Select
            label="Folder"
            options={folderStats.map(f => ({ value: f.name.toLowerCase(), label: f.name }))}
            placeholder="Select folder"
          />
          
          <Textarea label="Description" placeholder="Add a description for these documents..." />
        </div>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowUploadModal(false)}>Cancel</Button>
          <Button>Upload</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
