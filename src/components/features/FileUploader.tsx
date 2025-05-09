import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, File, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface FileUploaderProps {
  accept?: Record<string, string[]>;
  maxFiles?: number;
  maxSize?: number;
  onFilesSelected: (files: File[]) => void;
  className?: string;
  helperText?: string;
}

export const FileUploader = ({
  accept,
  maxFiles = 1,
  maxSize = 10485760, // 10MB
  onFilesSelected,
  className = '',
  helperText = '',
}: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      // If we already have max files, replace them
      const newFiles = [...files];
      
      acceptedFiles.forEach((file, index) => {
        if (index + newFiles.length < maxFiles) {
          newFiles.push(file);
        }
      });
      
      // Only keep up to maxFiles
      const finalFiles = newFiles.slice(0, maxFiles);
      setFiles(finalFiles);
      onFilesSelected(finalFiles);
    },
    [files, maxFiles, onFilesSelected]
  );

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const clearFiles = () => {
    setFiles([]);
    onFilesSelected([]);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
    onDropRejected: (fileRejections) => {
      const errors: string[] = [];
      fileRejections.forEach((rejection) => {
        rejection.errors.forEach((error) => {
          if (error.code === 'file-too-large') {
            errors.push(`File is too large. Max size is ${maxSize / 1048576}MB`);
          } else if (error.code === 'file-invalid-type') {
            errors.push('File type not accepted');
          } else if (error.code === 'too-many-files') {
            errors.push(`Too many files. Max is ${maxFiles}`);
          } else {
            errors.push(error.message);
          }
        });
      });
      setError(errors[0] || 'Invalid file');
    },
  });

  const getAcceptedFileTypes = () => {
    if (!accept) return 'any files';
    
    const types = Object.keys(accept).map(type => {
      // Clean up MIME types for display
      return type.replace('application/', '')
        .replace('image/', '')
        .replace('video/', '')
        .replace('audio/', '')
        .toUpperCase();
    });
    
    return types.join(', ');
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 transition-colors duration-200 cursor-pointer
          ${
            isDragActive
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
              : isDragReject
              ? 'border-error-500 bg-error-50 dark:bg-error-900/10'
              : 'border-gray-300 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500'
          }
          ${files.length > 0 ? 'bg-gray-50 dark:bg-gray-900/50' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center text-center">
          {files.length === 0 ? (
            <>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <div className="rounded-full bg-primary-100 dark:bg-primary-900/20 p-3">
                  <Upload className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
              </motion.div>
              
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {isDragActive ? (
                  <span>Drop your files here</span>
                ) : (
                  <span>
                    <span className="text-primary-600 dark:text-primary-400">Click to upload</span> or drag and drop
                  </span>
                )}
              </motion.p>
              
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-1 text-xs text-gray-500 dark:text-gray-400"
              >
                {helperText || `Upload ${maxFiles === 1 ? 'a file' : `up to ${maxFiles} files`} (${getAcceptedFileTypes()})`}
              </motion.p>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-1 text-xs text-gray-500 dark:text-gray-400"
              >
                Max {maxSize / 1048576}MB per file
              </motion.p>
            </>
          ) : (
            <div className="w-full">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {files.length} {files.length === 1 ? 'file' : 'files'} selected
                </h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFiles();
                  }}
                >
                  Clear all
                </Button>
              </div>
              
              <ul className="space-y-2 max-h-40 overflow-y-auto">
                {files.map((file, index) => (
                  <li
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded-md shadow-sm"
                  >
                    <div className="flex items-center overflow-hidden">
                      <File className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 truncate">
                        {file.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                      className="ml-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-error-600 dark:text-error-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};