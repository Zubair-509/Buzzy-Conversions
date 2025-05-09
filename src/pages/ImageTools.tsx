import React from 'react';
import { motion } from 'framer-motion';
import { Image, FileType, File, Images, Layers } from 'lucide-react';
import ToolCard from '../components/features/ToolCard';

const ImageTools = () => {
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
      title: 'WEBP to PNG',
      description: 'Convert WEBP images to PNG format with transparency preserved.',
      icon: <Image size={24} />,
      path: '/tools/webp-to-png',
    },
    {
      title: 'Image to PDF',
      description: 'Convert images to PDF files individually or merge multiple images.',
      icon: <FileType size={24} />,
      path: '/tools/image-to-pdf',
    },
    {
      title: 'HEIC to JPG',
      description: 'Convert iPhone HEIC photos to universally compatible JPG format.',
      icon: <File size={24} />,
      path: '/tools/heic-to-jpg',
    },
    {
      title: 'Resize Image',
      description: 'Resize your images to specific dimensions while maintaining quality.',
      icon: <Images size={24} />,
      path: '/tools/resize-image',
    },
    {
      title: 'Convert to SVG',
      description: 'Convert raster images to scalable vector graphics format.',
      icon: <Layers size={24} />,
      path: '/tools/convert-to-svg',
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
            Image Conversion Tools
          </motion.h1>
          
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Convert between different image formats with our high-quality conversion tools.
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

export default ImageTools;