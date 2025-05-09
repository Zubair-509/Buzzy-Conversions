import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Check, AlertCircle, Loader2, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConversionProcess, ConversionStep } from '../features/ConversionProcess';
import { Button } from '../ui/Button';

interface AudioConverterProps {
  inputFormat: string;
  outputFormat: string;
  maxSize?: number; // in MB
  title: string;
  description: string;
}

const AudioConverter: React.FC<AudioConverterProps> = ({
  inputFormat,
  outputFormat,
  maxSize = 100,
  title,
  description,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState('upload');
  const [progress, setProgress] = useState(0);

  const steps: ConversionStep[] = [
    { id: 'upload', label: 'Upload', description: 'Uploading your file to our secure servers...' },
    { id: 'converting', label: 'Converting', description: `Converting your ${inputFormat.toUpperCase()} to ${outputFormat.toUpperCase()} format...` },
    { id: 'optimizing', label: 'Optimizing', description: 'Optimizing audio quality...' },
    { id: 'complete', label: 'Complete', description: 'Your file is ready to download!' },
  ];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    setSuccess(false);
    setProgress(0);
    setCurrentStep('upload');
    
    const file = acceptedFiles[0];
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !inputFormat.toLowerCase().includes(fileExtension)) {
      setError(`Please upload a ${inputFormat} file`);
      return;
    }

    setFile(file);
  }, [inputFormat, maxSize]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': [`.${inputFormat}`],
      'video/*': inputFormat === 'mp4' ? ['.mp4'] : [],
    },
    maxFiles: 1,
  });

  const simulateStep = (step: string, delay: number, newProgress: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setCurrentStep(step);
        setProgress(newProgress);
        resolve();
      }, delay);
    });
  };

  const handleConversion = async () => {
    if (!file) return;

    setConverting(true);
    setError(null);
    setSuccess(false);
    setProgress(0);
    setCurrentStep('upload');

    try {
      // Simulate conversion process with steps
      await simulateStep('upload', 1500, 25);
      await simulateStep('converting', 2000, 50);
      await simulateStep('optimizing', 1500, 75);
      await simulateStep('complete', 1000, 100);
      
      setSuccess(true);
      // In real implementation, we would:
      // 1. Create a Web Worker for FFmpeg
      // 2. Load the file into FFmpeg
      // 3. Convert using appropriate FFmpeg command
      // 4. Return the converted file for download
      
    } catch (err) {
      setError('Conversion failed. Please try again.');
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    // In a real app, this would download the converted file
    console.log('Downloading converted file');
    alert('Download started! (This is a demo)');
  };

  const resetState = () => {
    setFile(null);
    setError(null);
    setSuccess(false);
    setProgress(0);
    setCurrentStep('upload');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div className="mb-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
              isDragActive
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-300 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-300">
              {isDragActive
                ? 'Drop the file here'
                : `Drag and drop your ${inputFormat.toUpperCase()} file here, or click to select`}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Maximum file size: {maxSize}MB
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {file && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg mb-6"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
                    <Upload className="w-5 h-5 text-primary-500" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={resetState}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Remove file"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6 flex items-center"
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {file && (
          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={handleConversion}
              disabled={converting || !file}
              isLoading={converting && !success}
            >
              {converting && !success ? 'Converting...' : 'Convert Now'}
            </Button>
          </div>
        )}
      </div>

      {(converting || success) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Conversion Progress
          </h2>
          
          <ConversionProcess
            steps={steps}
            currentStep={currentStep}
            isCompleted={success}
            progress={progress}
          />
          
          {success && (
            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="accent"
                size="lg"
                onClick={handleDownload}
                leftIcon={<Download size={18} />}
              >
                Download Converted File
              </Button>
            </motion.div>
          )}
        </motion.div>
      )}

      <motion.div
        className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          How to Use This Tool
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                <Check size={14} />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Step 1:</span> Upload your {inputFormat.toUpperCase()} file by dragging and dropping or selecting from your device.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                <Check size={14} />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Step 2:</span> Click the "Convert Now" button to start the conversion process.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                <Check size={14} />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Step 3:</span> Wait for the conversion to complete. This usually takes a few seconds.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                <Check size={14} />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Step 4:</span> Download your converted file once the process is complete.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AudioConverter; 