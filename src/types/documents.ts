// Document Types
export type DocumentType = 
  | 'contract' 
  | 'permit' 
  | 'blueprint' 
  | 'report' 
  | 'invoice' 
  | 'receipt' 
  | 'photo' 
  | 'safety' 
  | 'certification'
  | 'other';

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  fileType: string;
  fileSize: number;
  url: string;
  projectId?: string;
  projectName?: string;
  folderId?: string;
  uploadedBy: string;
  uploadedByName: string;
  tags: string[];
  description?: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Folder {
  id: string;
  name: string;
  parentId?: string;
  projectId?: string;
  color?: string;
  documentsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Document type labels and colors
export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  'contract': 'Contract',
  'permit': 'Permit',
  'blueprint': 'Blueprint',
  'report': 'Report',
  'invoice': 'Invoice',
  'receipt': 'Receipt',
  'photo': 'Photo',
  'safety': 'Safety Document',
  'certification': 'Certification',
  'other': 'Other',
};

export const DOCUMENT_TYPE_COLORS: Record<DocumentType, string> = {
  'contract': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  'permit': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'blueprint': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'report': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'invoice': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  'receipt': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  'photo': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
  'safety': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  'certification': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  'other': 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
};
