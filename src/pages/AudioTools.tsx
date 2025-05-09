import React from 'react';
import { motion } from 'framer-motion';
import { FileMusic, FileAudio, Video, FileVideo } from 'lucide-react';
import SEO from '../components/SEO';

const audioTools = [
  {
    id: 'mp4-to-mp3',
    title: 'MP4 to MP3',
    description: 'Extract audio from video files. Convert MP4 videos to MP3 audio format.',
    icon: Video,
    popular: true,
  },
  {
    id: 'wav-to-mp3',
    title: 'WAV to MP3',
    description: 'Convert WAV audio files to compressed MP3 format without significant quality loss.',
    icon: FileMusic,
    popular: false,
  },
  {
    id: 'mp3-to-wav',
    title: 'MP3 to WAV',
    description: 'Convert MP3 files to uncompressed WAV format for high-quality audio editing.',
    icon: FileAudio,
    popular: false,
  },
  {
    id: 'aac-converter',
    title: 'AAC Converter',
    description: 'Convert audio files to and from AAC format. Supports multiple input formats.',
    icon: FileMusic,
    popular: true,
  },
  {
    id: 'audio-compressor',
    title: 'Audio Compressor',
    description: 'Reduce audio file size while maintaining good quality. Perfect for sharing.',
    icon: FileAudio,
    popular: true,
  },
  {
    id: 'video-audio-extractor',
    title: 'Video Audio Extractor',
    description: 'Extract audio tracks from various video formats (MKV, AVI, MOV, etc.).',
    icon: FileVideo,
    popular: false,
  }
];

const AudioTools = () => {
  return (
    <>
      <SEO 
        title="Audio Conversion Tools"
        description="Convert audio files online. MP4 to MP3, WAV to MP3, audio compression, and more. Free online audio converter tools."
        keywords="audio converter, mp4 to mp3, wav to mp3, audio compression, extract audio, mp3 converter"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Audio Conversion Tools
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Convert, compress, and extract audio with our free online tools
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audioTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                {tool.popular && (
                  <span className="absolute top-4 right-4 px-2 py-1 text-xs font-semibold text-white bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full">
                    Popular
                  </span>
                )}
                
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <tool.icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                    {tool.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {tool.description}
                </p>
                
                <button 
                  onClick={() => window.location.href = `/tools/${tool.id}`}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors duration-300"
                >
                  Convert Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AudioTools; 