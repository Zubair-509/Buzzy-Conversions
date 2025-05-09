'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileType, ArrowRight, Download, Loader2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

export default function ConvertPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFormat, setSelectedFormat] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      setDownloadUrl(null);
      setError(null);
      setIsDownloadReady(false);
    },
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'audio/*': ['.mp3', '.wav', '.ogg', '.m4a'],
    }
  });

  const handleConvert = async () => {
    if (files.length === 0 || !selectedFormat) return;
    setIsUploading(true);
    setIsConverting(false);
    setIsDownloadReady(false);
    setDownloadUrl(null);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('format', selectedFormat);
      // Upload and conversion
      const res = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });
      setIsUploading(false);
      setIsConverting(true);
      const data = await res.json();
      setIsConverting(false);
      if (!res.ok) throw new Error(data.error || 'Conversion failed');
      setDownloadUrl(data.url);
      setIsDownloadReady(true);
    } catch (err: any) {
      setIsUploading(false);
      setIsConverting(false);
      setIsDownloadReady(false);
      setError(err.message || 'Conversion failed');
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = files[0]?.name?.replace(/\.[^.]+$/, '') + '.' + selectedFormat;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Convert Your Files
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Drop your files below and choose your desired output format
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8"
        >
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors duration-200 ${
              isDragActive
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'border-gray-300 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              {isDragActive ? (
                "Drop the files here..."
              ) : (
                "Drag 'n' drop files here, or click to select files"
              )}
            </p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Support for PDF, images, and audio files
            </p>
          </div>

          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Selected File
              </h3>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <FileType className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-700 dark:text-gray-200">
                      {file.name}
                    </span>
                    <span className="ml-auto text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Convert to:
                </label>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  aria-label="Select conversion format"
                >
                  <option value="">Select format</option>
                  <option value="pdf">PDF</option>
                  <option value="docx">DOCX</option>
                  <option value="jpg">JPG</option>
                  <option value="png">PNG</option>
                  <option value="mp3">MP3</option>
                  <option value="mp4">MP4</option>
                </select>

                <button
                  onClick={handleConvert}
                  disabled={files.length === 0 || !selectedFormat || isUploading || isConverting}
                  className={`mt-4 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                    (files.length === 0 || !selectedFormat || isUploading || isConverting) &&
                    'opacity-50 cursor-not-allowed'
                  }`}
                >
                  {(isUploading || isConverting) ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {isUploading && 'Uploading...'}
                      {isConverting && 'Converting...'}
                    </>
                  ) : (
                    <>
                      Convert Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>

                {isDownloadReady && downloadUrl && (
                  <button
                    onClick={handleDownload}
                    className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Converted File
                  </button>
                )}
                {error && (
                  <div className="mt-4 text-red-600 dark:text-red-400 font-semibold">
                    {error}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
} 