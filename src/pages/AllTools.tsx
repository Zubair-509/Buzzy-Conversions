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
  RotateCcw,
  Image,
  File,
  Images,
  Layers,
  FileMusic,
  FileAudio,
  Video,
  FileVideo
} from 'lucide-react';
import ToolCard from '../components/features/ToolCard';
import SEO from '../components/SEO';

const AllTools = () => {
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

  const categoryFadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
      },
    }),
  };

  const pdfTools = [
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
    }
  ];

  const imageTools = [
    {
      title: 'JPG to PNG',
      description: 'Convert JPG images to PNG format without losing quality.',
      icon: <Image size={24} />,
      path: '/tools/jpg-to-png',
      isPopular: true,
    },
    {
      title: 'PNG to JPG',
      description: 'Convert PNG images to JPG format with compression options.',
      icon: <Image size={24} />,
      path: '/tools/png-to-jpg',
    },
    {
      title: 'WEBP to JPG',
      description: 'Convert WEBP images to JPG format for better compatibility.',
      icon: <Image size={24} />,
      path: '/tools/webp-to-jpg',
    },
    {
      title: 'Image to PDF',
      description: 'Convert images to PDF files individually or merge multiple images.',
      icon: <FileType size={24} />,
      path: '/tools/image-to-pdf',
    },
    {
      title: 'Resize Image',
      description: 'Resize your images to specific dimensions while maintaining quality.',
      icon: <Images size={24} />,
      path: '/tools/resize-image',
    }
  ];

  const audioTools = [
    {
      title: 'MP4 to MP3',
      description: 'Extract audio from video files. Convert MP4 videos to MP3 audio format.',
      icon: <Video size={24} />,
      path: '/tools/mp4-to-mp3',
      isPopular: true,
    },
    {
      title: 'WAV to MP3',
      description: 'Convert WAV audio files to compressed MP3 format without significant quality loss.',
      icon: <FileMusic size={24} />,
      path: '/tools/wav-to-mp3',
    },
    {
      title: 'MP3 to WAV',
      description: 'Convert MP3 files to uncompressed WAV format for high-quality audio editing.',
      icon: <FileAudio size={24} />,
      path: '/tools/mp3-to-wav',
    },
    {
      title: 'Audio Compressor',
      description: 'Reduce audio file size while maintaining good quality. Perfect for sharing.',
      icon: <FileAudio size={24} />,
      path: '/tools/audio-compressor',
      isPopular: true,
    }
  ];

  const premiumTools = [
    {
      title: 'Batch Converter',
      description: 'Convert multiple files at once with our powerful batch processing tool.',
      icon: <FilePlus size={24} />,
      path: '/tools/batch-converter',
      isPremium: true,
    },
    {
      title: 'PDF Password Protector',
      description: 'Add password protection and encryption to your PDF files.',
      icon: <Lock size={24} />,
      path: '/tools/protect-pdf',
      isPremium: true,
    },
    {
      title: 'PDF Unlock',
      description: 'Remove password protection from your PDF files securely.',
      icon: <Unlock size={24} />,
      path: '/tools/unlock-pdf',
      isPremium: true,
    },
    {
      title: 'Advanced Image Editor',
      description: 'Professional image editing tools with filters, effects, and more.',
      icon: <Images size={24} />,
      path: '/tools/advanced-image-editor',
      isPremium: true,
    },
    {
      title: 'Audio Effects Suite',
      description: 'Add professional audio effects, equalizer, and enhance sound quality.',
      icon: <FileMusic size={24} />,
      path: '/tools/audio-effects',
      isPremium: true,
    },
    {
      title: 'OCR Converter',
      description: 'Extract text from images and PDFs with advanced OCR technology.',
      icon: <FileText size={24} />,
      path: '/tools/ocr-converter',
      isPremium: true,
    }
  ];

  const categories = [
    {
      title: 'Premium Tools',
      description: 'Access our advanced features and professional-grade tools with a premium subscription.',
      tools: premiumTools,
      gradient: 'from-purple-500 to-pink-500',
      darkGradient: 'dark:from-purple-600 dark:to-pink-600',
    },
    {
      title: 'PDF Tools',
      description: 'Convert, merge, split, and modify PDF files with our professional tools.',
      tools: pdfTools,
      gradient: 'from-red-500 to-orange-500',
      darkGradient: 'dark:from-red-600 dark:to-orange-600',
    },
    {
      title: 'Image Tools',
      description: 'Convert and optimize images with our high-quality image processing tools.',
      tools: imageTools,
      gradient: 'from-blue-500 to-cyan-500',
      darkGradient: 'dark:from-blue-600 dark:to-cyan-600',
    },
    {
      title: 'Audio Tools',
      description: 'Convert, compress, and extract audio with our professional audio tools.',
      tools: audioTools,
      gradient: 'from-green-500 to-teal-500',
      darkGradient: 'dark:from-green-600 dark:to-teal-600',
    }
  ];

  return (
    <>
      <SEO 
        title="All Conversion Tools"
        description="Access all our file conversion tools. Convert PDFs, images, audio files, and more with our free online tools."
        keywords="file converter, pdf converter, image converter, audio converter, online tools, file conversion, premium tools"
      />
      
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
              All Conversion Tools
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Find the perfect tool for your file conversion needs. Access both free and premium tools for professional results.
            </p>
          </motion.div>

          <div className="space-y-16">
            {categories.map((category, categoryIndex) => (
              <motion.section
                key={category.title}
                custom={categoryIndex}
                variants={categoryFadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative"
              >
                <div className="mb-8">
                  <h2 className={`text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${category.gradient} ${category.darkGradient}`}>
                    {category.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {category.description}
                  </p>
                  {category.title === 'Premium Tools' && (
                    <div className="mt-4">
                      <motion.div
                        className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="mr-2">✨</span>
                        Upgrade to Premium
                      </motion.div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.tools.map((tool, toolIndex) => (
                    <motion.div
                      key={tool.title}
                      custom={toolIndex}
                      variants={fadeIn}
                      viewport={{ once: true }}
                    >
                      <ToolCard {...tool} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllTools; 