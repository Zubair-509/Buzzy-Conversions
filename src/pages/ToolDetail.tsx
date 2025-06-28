import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { FileUploader } from '../components/features/FileUploader';
import { ConversionProcess, ConversionStep } from '../components/features/ConversionProcess';
import { Card } from '../components/ui/Card';
import { PDFDocument } from 'pdf-lib';

// Add supported conversions for frontend use
const SUPPORTED_CONVERSIONS: Record<string, string[]> = {
  'application/pdf': [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg'
  ],
  'image/jpeg': [
    'image/png',
    'image/webp'
  ],
  'image/png': [
    'image/jpeg',
    'image/webp'
  ],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    'application/pdf'
  ]
};

// Mock data - in a real app, this would come from an API or database
const toolsData = {
  'pdf-to-word': {
    title: 'PDF to Word Converter',
    description: 'Convert PDF files to editable Word documents with formatting preserved.',
    acceptedFiles: { 'application/pdf': ['.pdf'] },
    outputFormat: '.docx',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your file to our secure servers...' },
      { id: 'converting', label: 'Converting', description: 'Converting your PDF to Word format...' },
      { id: 'optimizing', label: 'Optimizing', description: 'Optimizing formatting and layout...' },
      { id: 'complete', label: 'Complete', description: 'Your file is ready to download!' },
    ],
  },
  'pdf-to-powerpoint': {
    title: 'PDF to PowerPoint Converter',
    description: 'Transform PDF files into editable PowerPoint presentations.',
    acceptedFiles: { 'application/pdf': ['.pdf'] },
    outputFormat: '.pptx',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your file...' },
      { id: 'converting', label: 'Converting', description: 'Converting PDF to PowerPoint...' },
      { id: 'complete', label: 'Complete', description: 'Your file is ready!' },
    ],
  },
  'pdf-to-excel': {
    title: 'PDF to Excel Converter',
    description: 'Extract tables from PDF files and convert them to Excel spreadsheets.',
    acceptedFiles: { 'application/pdf': ['.pdf'] },
    outputFormat: '.xlsx',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your file...' },
      { id: 'converting', label: 'Converting', description: 'Extracting tables and converting to Excel...' },
      { id: 'complete', label: 'Complete', description: 'Your file is ready!' },
    ],
  },
  'word-to-pdf': {
    title: 'Word to PDF Converter',
    description: 'Convert Word documents to PDF format with perfect formatting.',
    acceptedFiles: { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'], 'application/msword': ['.doc'] },
    outputFormat: '.pdf',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your file...' },
      { id: 'converting', label: 'Converting', description: 'Converting Word to PDF...' },
      { id: 'complete', label: 'Complete', description: 'Your file is ready!' },
    ],
  },
  'powerpoint-to-pdf': {
    title: 'PowerPoint to PDF Converter',
    description: 'Convert PowerPoint presentations to PDF files.',
    acceptedFiles: { 'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'], 'application/vnd.ms-powerpoint': ['.ppt'] },
    outputFormat: '.pdf',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your file...' },
      { id: 'converting', label: 'Converting', description: 'Converting PowerPoint to PDF...' },
      { id: 'complete', label: 'Complete', description: 'Your file is ready!' },
    ],
  },
  'excel-to-pdf': {
    title: 'Excel to PDF Converter',
    description: 'Convert Excel spreadsheets to PDF format.',
    acceptedFiles: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'], 'application/vnd.ms-excel': ['.xls'] },
    outputFormat: '.pdf',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your file...' },
      { id: 'converting', label: 'Converting', description: 'Converting Excel to PDF...' },
      { id: 'complete', label: 'Complete', description: 'Your file is ready!' },
    ],
  },
  'merge-pdf': {
    title: 'Merge PDF Files',
    description: 'Combine multiple PDF files into a single document.',
    acceptedFiles: { 'application/pdf': ['.pdf'] },
    maxFiles: 10,
    outputFormat: '.pdf',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your files...' },
      { id: 'processing', label: 'Processing', description: 'Processing your PDF files...' },
      { id: 'merging', label: 'Merging', description: 'Merging files into a single PDF...' },
      { id: 'complete', label: 'Complete', description: 'Your merged file is ready!' },
    ],
  },
  'split-pdf': {
    title: 'Split PDF',
    description: 'Split a PDF file into multiple documents by pages.',
    acceptedFiles: { 'application/pdf': ['.pdf'] },
    outputFormat: '.pdf',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your file...' },
      { id: 'processing', label: 'Processing', description: 'Splitting PDF...' },
      { id: 'complete', label: 'Complete', description: 'Your split files are ready!' },
    ],
  },
  'compress-pdf': {
    title: 'Compress PDF',
    description: 'Reduce the file size of your PDF documents.',
    acceptedFiles: { 'application/pdf': ['.pdf'] },
    outputFormat: '.pdf',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your file...' },
      { id: 'processing', label: 'Processing', description: 'Compressing PDF...' },
      { id: 'complete', label: 'Complete', description: 'Your compressed file is ready!' },
    ],
  },
  'rotate-pdf': {
    title: 'Rotate PDF',
    description: 'Rotate pages in your PDF document as needed.',
    acceptedFiles: { 'application/pdf': ['.pdf'] },
    outputFormat: '.pdf',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your file...' },
      { id: 'processing', label: 'Processing', description: 'Rotating PDF...' },
      { id: 'complete', label: 'Complete', description: 'Your rotated file is ready!' },
    ],
  },
  'protect-pdf': {
    title: 'Protect PDF',
    description: 'Add password protection to your PDF files.',
    acceptedFiles: { 'application/pdf': ['.pdf'] },
    outputFormat: '.pdf',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your file...' },
      { id: 'processing', label: 'Processing', description: 'Adding password protection...' },
      { id: 'complete', label: 'Complete', description: 'Your protected file is ready!' },
    ],
  },
  'unlock-pdf': {
    title: 'Unlock PDF',
    description: 'Remove password protection from your PDF files.',
    acceptedFiles: { 'application/pdf': ['.pdf'] },
    outputFormat: '.pdf',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your file...' },
      { id: 'processing', label: 'Processing', description: 'Removing password protection...' },
      { id: 'complete', label: 'Complete', description: 'Your unlocked file is ready!' },
    ],
  },
  'jpg-to-png': {
    title: 'JPG to PNG Converter',
    description: 'Convert JPG images to PNG format without losing quality.',
    acceptedFiles: { 'image/jpeg': ['.jpg', '.jpeg'] },
    outputFormat: '.png',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your file...' },
      { id: 'converting', label: 'Converting', description: 'Converting JPG to PNG...' },
      { id: 'complete', label: 'Complete', description: 'Your file is ready!' },
    ],
  },
  'png-to-jpg': {
    title: 'PNG to JPG Converter',
    description: 'Convert PNG images to JPG format with compression options.',
    acceptedFiles: { 'image/png': ['.png'] },
    outputFormat: '.jpg',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your file...' },
      { id: 'converting', label: 'Converting', description: 'Converting PNG to JPG...' },
      { id: 'complete', label: 'Complete', description: 'Your file is ready!' },
    ],
  },
  'webp-to-jpg': {
    title: 'WEBP to JPG Converter',
    description: 'Convert WEBP images to JPG format for better compatibility.',
    acceptedFiles: { 'image/webp': ['.webp'] },
    outputFormat: '.jpg',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your file...' },
      { id: 'converting', label: 'Converting', description: 'Converting WEBP to JPG...' },
      { id: 'complete', label: 'Complete', description: 'Your file is ready!' },
    ],
  },
  'webp-to-png': {
    title: 'WEBP to PNG Converter',
    description: 'Convert WEBP images to PNG format with transparency preserved.',
    acceptedFiles: { 'image/webp': ['.webp'] },
    outputFormat: '.png',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your file...' },
      { id: 'converting', label: 'Converting', description: 'Converting WEBP to PNG...' },
      { id: 'complete', label: 'Complete', description: 'Your file is ready!' },
    ],
  },
  'image-to-pdf': {
    title: 'Image to PDF Converter',
    description: 'Convert images to PDF files individually or merge multiple images.',
    acceptedFiles: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] },
    outputFormat: '.pdf',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your images...' },
      { id: 'converting', label: 'Converting', description: 'Converting images to PDF...' },
      { id: 'complete', label: 'Complete', description: 'Your PDF is ready!' },
    ],
  },
  'heic-to-jpg': {
    title: 'HEIC to JPG Converter',
    description: 'Convert iPhone HEIC photos to universally compatible JPG format.',
    acceptedFiles: { 'image/heic': ['.heic'] },
    outputFormat: '.jpg',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your file...' },
      { id: 'converting', label: 'Converting', description: 'Converting HEIC to JPG...' },
      { id: 'complete', label: 'Complete', description: 'Your file is ready!' },
    ],
  },
  'resize-image': {
    title: 'Resize Image',
    description: 'Resize your images to specific dimensions while maintaining quality.',
    acceptedFiles: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] },
    outputFormat: '.jpg',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your image...' },
      { id: 'processing', label: 'Processing', description: 'Resizing image...' },
      { id: 'complete', label: 'Complete', description: 'Your resized image is ready!' },
    ],
  },
  'convert-to-svg': {
    title: 'Convert to SVG',
    description: 'Convert raster images to scalable vector graphics format.',
    acceptedFiles: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'], 'image/webp': ['.webp'] },
    outputFormat: '.svg',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your image...' },
      { id: 'converting', label: 'Converting', description: 'Converting image to SVG...' },
      { id: 'complete', label: 'Complete', description: 'Your SVG is ready!' },
    ],
  },
  'mp4-to-mp3': {
    title: 'MP4 to MP3 Converter',
    description: 'Extract audio from video files. Convert MP4 videos to MP3 audio format.',
    acceptedFiles: { 'video/mp4': ['.mp4'] },
    outputFormat: '.mp3',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your video...' },
      { id: 'converting', label: 'Converting', description: 'Extracting audio and converting to MP3...' },
      { id: 'complete', label: 'Complete', description: 'Your MP3 is ready!' },
    ],
  },
  'wav-to-mp3': {
    title: 'WAV to MP3 Converter',
    description: 'Convert WAV audio files to compressed MP3 format without significant quality loss.',
    acceptedFiles: { 'audio/wav': ['.wav'] },
    outputFormat: '.mp3',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your audio...' },
      { id: 'converting', label: 'Converting', description: 'Converting WAV to MP3...' },
      { id: 'complete', label: 'Complete', description: 'Your MP3 is ready!' },
    ],
  },
  'mp3-to-wav': {
    title: 'MP3 to WAV Converter',
    description: 'Convert MP3 files to uncompressed WAV format for high-quality audio editing.',
    acceptedFiles: { 'audio/mpeg': ['.mp3'] },
    outputFormat: '.wav',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your audio...' },
      { id: 'converting', label: 'Converting', description: 'Converting MP3 to WAV...' },
      { id: 'complete', label: 'Complete', description: 'Your WAV is ready!' },
    ],
  },
  'aac-converter': {
    title: 'AAC Converter',
    description: 'Convert audio files to and from AAC format. Supports multiple input formats.',
    acceptedFiles: { 'audio/aac': ['.aac'], 'audio/mpeg': ['.mp3'], 'audio/wav': ['.wav'] },
    outputFormat: '.aac',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your audio...' },
      { id: 'converting', label: 'Converting', description: 'Converting to/from AAC...' },
      { id: 'complete', label: 'Complete', description: 'Your file is ready!' },
    ],
  },
  'audio-compressor': {
    title: 'Audio Compressor',
    description: 'Reduce audio file size while maintaining good quality. Perfect for sharing.',
    acceptedFiles: { 'audio/mpeg': ['.mp3'], 'audio/wav': ['.wav'], 'audio/aac': ['.aac'] },
    outputFormat: '.mp3',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your audio...' },
      { id: 'processing', label: 'Processing', description: 'Compressing audio...' },
      { id: 'complete', label: 'Complete', description: 'Your compressed file is ready!' },
    ],
  },
  'video-audio-extractor': {
    title: 'Video Audio Extractor',
    description: 'Extract audio tracks from various video formats (MKV, AVI, MOV, etc.).',
    acceptedFiles: { 'video/mp4': ['.mp4'], 'video/x-matroska': ['.mkv'], 'video/avi': ['.avi'], 'video/quicktime': ['.mov'] },
    outputFormat: '.mp3',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your video...' },
      { id: 'converting', label: 'Converting', description: 'Extracting audio...' },
      { id: 'complete', label: 'Complete', description: 'Your audio file is ready!' },
    ],
  },
  // Default tool data for demo purposes
  'default': {
    title: 'File Converter',
    description: 'Convert your files to different formats.',
    acceptedFiles: { 'application/pdf': ['.pdf'], 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] },
    outputFormat: '.docx',
    steps: [
      { id: 'upload', label: 'Upload', description: 'Uploading your file to our secure servers...' },
      { id: 'converting', label: 'Converting', description: 'Converting your file...' },
      { id: 'optimizing', label: 'Optimizing', description: 'Optimizing your file...' },
      { id: 'complete', label: 'Complete', description: 'Your file is ready to download!' },
    ],
  }
};

const ToolDetail = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const [files, setFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState('upload');
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [showErrorDetails, setShowErrorDetails] = useState(false);
  const [targetFormat, setTargetFormat] = useState<string>('');
  const [supportedFormats, setSupportedFormats] = useState<string[]>([]);
  const [conversionInfo, setConversionInfo] = useState<{
    size: string;
    pages?: number;
    dimensions?: { width: number; height: number };
  } | null>(null);
  
  // Get tool data based on toolId, or use default if not found
  const toolData = toolsData[toolId as keyof typeof toolsData] || toolsData.default;
  
  const handleFilesSelected = async (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setIsConverting(false);
    setIsCompleted(false);
    setCurrentStep('upload');
    setProgress(0);
    setDownloadError(null);
    setErrorDetails(null);
    setShowErrorDetails(false);
    setConversionInfo(null);

    if (selectedFiles.length > 0) {
      const file = selectedFiles[0];
      const fileType = file.type;
      
      // Get supported target formats for this file type
      const formats = Object.keys(SUPPORTED_CONVERSIONS[fileType] || {});
      setSupportedFormats(formats);
      
      if (formats.length > 0) {
        setTargetFormat(formats[0]);
      }

      // Get file information
      try {
        const info: any = {};
        
        if (fileType === 'application/pdf') {
          const arrayBuffer = await file.arrayBuffer();
          const pdfDoc = await PDFDocument.load(arrayBuffer);
          info.pages = pdfDoc.getPageCount();
        } else if (fileType.startsWith('image/')) {
          const img = new window.Image();
          img.onload = () => {
            setConversionInfo({
              ...info,
              dimensions: {
                width: img.width,
                height: img.height,
              },
              size: info.size || formatFileSize(file.size),
              pages: info.pages
            });
          };
          img.src = URL.createObjectURL(file);
        }

        info.size = formatFileSize(file.size);
        setConversionInfo(info);
      } catch (error) {
        console.error('Error getting file info:', error);
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleConvert = async () => {
    if (files.length === 0 || !targetFormat) return;
    
    setIsConverting(true);
    setCurrentStep('upload');
    setProgress(0);
    setDownloadError(null);
    setErrorDetails(null);
    setShowErrorDetails(false);
    
    try {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('targetFormat', targetFormat);
      
      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        let errorMessage = 'Conversion failed';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } else {
            errorMessage = await response.text();
          }
        } catch (e) {
          // fallback to default error message
        }
        throw new Error(errorMessage);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      
      await simulateStep('upload', 1000, 25);
      await simulateStep('converting', 2000, 50);
      await simulateStep('optimizing', 1500, 75);
      await simulateStep('complete', 1000, 100);
      
      setIsCompleted(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Conversion failed. Please try again.';
      setDownloadError(errorMessage);
      
      if (process.env.NODE_ENV === 'development' && error instanceof Error) {
        setErrorDetails(error.stack || error.message);
      }
    } finally {
      setIsConverting(false);
    }
  };
  
  const simulateStep = (step: string, delay: number, newProgress: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setCurrentStep(step);
        setProgress(newProgress);
        resolve();
      }, delay);
    });
  };
  
  const handleDownload = async () => {
    if (!downloadUrl) return;
    
    setIsDownloading(true);
    setDownloadError(null);
    
    try {
      const proxyUrl = `/api/download?url=${encodeURIComponent(downloadUrl)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      // Extract filename from URL or use a default
      const urlParts = downloadUrl.split('/');
      const filename = urlParts[urlParts.length - 1] || 'converted-file';
      link.download = filename;
      link.href = url;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setDownloadError(error instanceof Error ? error.message : 'Failed to download file. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link to="/tools" className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline">
            <ArrowLeft size={16} className="mr-1" /> Back to Tools
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {toolData.title}
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {toolData.description}
            </p>
          </motion.div>
          
          <Card className="p-6 md:p-8 mb-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Upload Your File
              </h2>
              
              <FileUploader
                accept={toolData.acceptedFiles}
                maxFiles={1}
                maxSize={10485760} // 10MB
                onFilesSelected={handleFilesSelected}
                helperText="Drag and drop your file here, or click to browse."
              />

              {files.length > 0 && (
                <div className="mt-4 space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="text-gray-700 dark:text-gray-300">
                      <p>File: <span className="font-medium">{files[0].name}</span></p>
                      {conversionInfo && (
                        <>
                          <p>Size: <span className="font-medium">{conversionInfo.size}</span></p>
                          {conversionInfo.pages && (
                            <p>Pages: <span className="font-medium">{conversionInfo.pages}</span></p>
                          )}
                          {conversionInfo.dimensions && (
                            <p>Dimensions: <span className="font-medium">
                              {conversionInfo.dimensions.width}x{conversionInfo.dimensions.height}
                            </span></p>
                          )}
                        </>
                      )}
                    </div>

                    {supportedFormats.length > 0 && (
                      <div className="flex items-center gap-2">
                        <label className="text-gray-700 dark:text-gray-300">Convert to:</label>
                        <select
                          value={targetFormat}
                          onChange={(e) => setTargetFormat(e.target.value)}
                          className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800"
                          aria-label="Select target format for conversion"
                        >
                          {supportedFormats.map(format => (
                            <option key={format} value={format}>
                              {format.split('/').pop()?.toUpperCase()}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="primary"
                    onClick={handleConvert}
                    disabled={isConverting || !targetFormat}
                    isLoading={isConverting}
                  >
                    {isConverting ? 'Converting...' : 'Convert Now'}
                  </Button>
                </div>
              )}
            </div>
          </Card>
          
          {(isConverting || isCompleted) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 md:p-8 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Conversion Progress
                </h2>
                
                <ConversionProcess
                  steps={toolData.steps as ConversionStep[]}
                  currentStep={currentStep}
                  isCompleted={isCompleted}
                  progress={progress}
                />
                
                {isCompleted && (
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
                      disabled={isDownloading}
                      leftIcon={<Download size={18} />}
                    >
                      {isDownloading ? 'Downloading...' : 'Download Converted File'}
                    </Button>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          )}
          
          {downloadError && (
            <div className="mt-4">
              <div className="text-center text-red-500 mb-2">
                {downloadError}
              </div>
              {errorDetails && (
                <div className="text-center">
                  <button
                    onClick={() => setShowErrorDetails(!showErrorDetails)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    {showErrorDetails ? 'Hide Details' : 'Show Details'}
                  </button>
                  {showErrorDetails && (
                    <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                      {errorDetails}
                    </pre>
                  )}
                  
                </div>
              )}
            </div>
          )}
          
          <motion.div
            className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 md:p-8"
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
                    <span className="font-medium">Step 1:</span> Upload your file by dragging and dropping or selecting from your device.
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
                    <span className="font-medium">Step 2:</span> Select the target format for conversion.
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
                    <span className="font-medium">Step 3:</span> Click the "Convert Now" button to start the conversion process.
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
      </div>
    </div>
  );
};

export default ToolDetail;