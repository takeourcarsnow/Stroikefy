'use client';

import React, { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Upload, File, X } from 'lucide-react';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  className?: string;
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesSelected,
  accept,
  multiple = false,
  maxSize = 10,
  className,
  disabled,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const validateFiles = (files: File[]): File[] => {
    return files.filter((file) => {
      if (maxSize && file.size > maxSize * 1024 * 1024) {
        console.warn(`File ${file.name} exceeds max size of ${maxSize}MB`);
        return false;
      }
      return true;
    });
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const validFiles = validateFiles(files);
      if (validFiles.length > 0) {
        onFilesSelected(multiple ? validFiles : [validFiles[0]]);
      }
    },
    [onFilesSelected, multiple, maxSize]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = validateFiles(files);
    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
    // Reset input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div
      className={cn(
        'relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
        isDragging
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
          : 'border-surface-300 dark:border-surface-600 hover:border-surface-400 dark:hover:border-surface-500',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={disabled ? undefined : handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
        disabled={disabled}
      />
      
      <Upload className="h-10 w-10 mx-auto mb-4 text-surface-400" />
      <p className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
        Drop files here or click to upload
      </p>
      <p className="text-xs text-surface-500">
        {accept ? `Accepted: ${accept}` : 'All file types accepted'} • Max {maxSize}MB
      </p>
    </div>
  );
};

// File Preview component
interface FilePreviewProps {
  files: File[];
  onRemove: (index: number) => void;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ files, onRemove }) => {
  if (files.length === 0) return null;

  return (
    <div className="mt-4 space-y-2">
      {files.map((file, index) => (
        <div
          key={`${file.name}-${index}`}
          className="flex items-center gap-3 p-3 rounded-lg bg-surface-50 dark:bg-surface-800"
        >
          <File className="h-5 w-5 text-surface-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-surface-700 dark:text-surface-300 truncate">
              {file.name}
            </p>
            <p className="text-xs text-surface-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(index);
            }}
            className="p-1 rounded hover:bg-surface-200 dark:hover:bg-surface-700"
          >
            <X className="h-4 w-4 text-surface-400" />
          </button>
        </div>
      ))}
    </div>
  );
};
