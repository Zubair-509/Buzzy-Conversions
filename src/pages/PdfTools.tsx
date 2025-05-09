import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  FileType, 
  Table, 
  PresentationIcon, 
  FilePlus,
  Scissors,
  Lock,
  Unlock,
  RotateCcw
} from 'lucide-react';
import ToolCard from '../components/features/ToolCard';

const PdfTools = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const tools = [
    {
      title: 'PDF to Word',
      description: 'Convert PDF files to editable Word documents with formatting preserved.',
      icon: <FileText size={24} />,
      path: '/tools/pdf-to-word',
      isPopular: true,
    },
    {
      title: 'PDF to PowerPoint',
      description: 'Transform PDF files into editable PowerPoint presentations.',
      icon: <PresentationIcon size={24} />,
      path: '/tools/pdf-to-powerpoint',
    },
    {
      title: 'PDF to Excel',
      description: 'Extract tables from PDF files and convert them to Excel spreadsheets.',
      icon: <Table size={24} />,
      path: '/tools/pdf-to-excel',
    },
    {
      title: 'Word to PDF',
      description: 'Convert Word documents to PDF format with perfect formatting.',
      icon: <FileText size={24} />,
      path: '/tools/word-to-pdf',
    },
    {
      title: 'PowerPoint to PDF',
      description: 'Convert PowerPoint presentations to PDF files.',
      icon: <PresentationIcon size={24} />,
      path: '/tools/powerpoint-to-pdf',
    },
    {
      title: 'Excel to PDF',
      description: 'Convert Excel spreadsheets to PDF format.',
      icon: <Table size={24} />,
      path: '/tools/excel-to-pdf',
    },
    {
      title: 'Merge PDFs',
      description: 'Combine multiple PDF files into a single document.',
      icon: <FilePlus size={24} />,
      path: '/tools/merge-pdf',
      isPopular: true,
    },
    {
      title: 'Split PDF',
      description: 'Split a PDF file into multiple documents by pages.',
      icon: <Scissors size={24} />,
      path: '/tools/split-pdf',
    },
    {
      title: 'Compress PDF',
      description: 'Reduce the file size of your PDF documents.',
      icon: <FileType size={24} />,
      path: '/tools/compress-pdf',
    },
    {
      title: 'Rotate PDF',
      description: 'Rotate pages in your PDF document as needed.',
      icon: <RotateCcw size={24} />,
      path: '/tools/rotate-pdf',
    },
    {
      title: 'Protect PDF',
      description: 'Add password protection to your PDF files.',
      icon: <Lock size={24} />,
      path: '/tools/protect-pdf',
      isPremium: true,
    },
    {
      title: 'Unlock PDF',
      description: 'Remove password protection from your PDF files.',
      icon: <Unlock size={24} />,
      path: '/tools/unlock-pdf',
      isPremium: true,
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            PDF Conversion Tools
          </motion.h1>
          
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Convert PDF files to Word, Excel, PowerPoint and more with our high-quality conversion tools.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              custom={index}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <ToolCard {...tool} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PdfTools;