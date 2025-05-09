'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, Image, Music } from 'lucide-react';

const tools = [
  {
    category: 'PDF Tools',
    icon: <FileText className="w-6 h-6" />,
    tools: [
      { name: 'PDF to Word', path: '/tools/pdf/to-word' },
      { name: 'PDF to Image', path: '/tools/pdf/to-image' },
      { name: 'Merge PDF', path: '/tools/pdf/merge' },
      { name: 'Compress PDF', path: '/tools/pdf/compress' },
    ],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    category: 'Image Tools',
    icon: <Image className="w-6 h-6" />,
    tools: [
      { name: 'Image Format Converter', path: '/tools/image/convert' },
      { name: 'Image Compressor', path: '/tools/image/compress' },
      { name: 'Image Resizer', path: '/tools/image/resize' },
      { name: 'Bulk Image Converter', path: '/tools/image/bulk' },
    ],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    category: 'Audio Tools',
    icon: <Music className="w-6 h-6" />,
    tools: [
      { name: 'Audio Converter', path: '/tools/audio/convert' },
      { name: 'Audio Compressor', path: '/tools/audio/compress' },
      { name: 'Audio Trimmer', path: '/tools/audio/trim' },
      { name: 'Format Converter', path: '/tools/audio/format' },
    ],
    gradient: 'from-orange-500 to-red-500',
  },
];

export default function ToolsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            All Conversion Tools
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choose from our wide range of file conversion and manipulation tools
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((category) => (
            <motion.div
              key={category.category}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className={`p-6 bg-gradient-to-r ${category.gradient}`}>
                <div className="flex items-center text-white">
                  {category.icon}
                  <h2 className="text-xl font-semibold ml-3">{category.category}</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4">
                  {category.tools.map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.path}
                      className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <span className="text-gray-700 dark:text-gray-200">{tool.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 
 