'use client';

import { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Loader2, Download, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface ConversionProcessProps {
  format: string;
  title: string;
  description: string;
}

export function ConversionProcess({ format, title, description }: ConversionProcessProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'text/plain': ['.txt'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        setDownloadUrl(null);
      }
    },
  });

  const handleConvert = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setIsConverting(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('format', format);

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      const data = await response.json();
      setDownloadUrl(data.url);
      toast.success('File converted successfully!');
    } catch (error) {
      toast.error('Failed to convert file. Please try again.');
      console.error('Conversion error:', error);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = async () => {
    if (downloadUrl) {
      try {
        const proxyUrl = `/api/download?url=${encodeURIComponent(downloadUrl)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error('Failed to download file');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        // Try to extract a filename from the original downloadUrl
        const urlParts = downloadUrl.split('/');
        link.download = urlParts[urlParts.length - 1] || 'converted-file';
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        toast.error('Failed to download file. Please try again.');
      }
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
        }`}
      >
        <input {...getInputProps()} ref={fileInputRef} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          {isDragActive
            ? 'Drop the file here'
            : 'Drag and drop a file here, or click to select'}
        </p>
        {file && (
          <p className="mt-2 text-sm font-medium">
            Selected: {file.name}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleConvert}
          disabled={!file || isConverting}
          className="flex-1"
        >
          {isConverting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Converting...
            </>
          ) : (
            'Convert'
          )}
        </Button>
        {downloadUrl && (
          <Button
            variant="outline"
            onClick={handleDownload}
            className="flex-1"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        )}
      </div>
    </Card>
  );
} 