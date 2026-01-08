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

export type DocumentStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'archived';

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  status: DocumentStatus;
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

export const DOCUMENT_STATUS_COLORS: Record<DocumentStatus, string> = {
  'draft': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'approved': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  'archived': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
};
