import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FileType, 
  Image, 
  FileVideo, 
  Zap, 
  ArrowRight, 
  Shield, 
  Rocket, 
  Sparkles 
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import ToolCard from '../components/features/ToolCard';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { theme } = useTheme();
  
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

  const popularTools = [
    {
      title: 'PDF to Word',
      description: 'Convert PDF files to editable Word documents with formatting preserved.',
      icon: <FileType size={24} />,
      path: '/tools/pdf-to-word',
      isPopular: true,
    },
    {
      title: 'JPG to PNG',
      description: 'Convert JPG images to PNG format without losing quality.',
      icon: <Image size={24} />,
      path: '/tools/jpg-to-png',
      isPopular: true,
    },
    {
      title: 'Merge PDFs',
      description: 'Combine multiple PDF files into a single document easily.',
      icon: <FileType size={24} />,
      path: '/tools/merge-pdf',
    },
    {
      title: 'Video to MP3',
      description: 'Extract audio from video files and save as MP3.',
      icon: <FileVideo size={24} />,
      path: '/tools/video-to-mp3',
      isPremium: true,
    },
  ];

  const features = [
    {
      icon: <Zap size={28} />,
      title: 'Lightning Fast',
      description: 'Our optimized conversion engine processes your files in seconds, not minutes.',
    },
    {
      icon: <Shield size={28} />,
      title: 'Secure & Private',
      description: 'Your files are encrypted and automatically deleted after processing.',
    },
    {
      icon: <Sparkles size={28} />,
      title: 'High Quality',
      description: 'Maintain the highest possible quality in all your converted files.',
    },
    {
      icon: <Rocket size={28} />,
      title: 'Easy to Use',
      description: 'Simple drag-and-drop interface makes converting files effortless.',
    },
  ];

  const renderGradientBackground = () => {
    return theme === 'dark' ? (
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500/30 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-40 -right-40 w-80 h-80 bg-cyan-500/30 rounded-full filter blur-[100px]" />
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-red-500/20 rounded-full filter blur-[100px]" />
        <div className="bg-neon-gradient absolute inset-0" />
      </div>
    ) : null;
  };

  return (
    <div className="relative min-h-screen">
      {renderGradientBackground()}
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 pt-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Convert Any File Format with Ease
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Fast, secure, and high-quality file conversion tools for all your needs. No installation required.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button size="lg" variant="primary" rightIcon={<ArrowRight size={18} />}>
                Start Converting
              </Button>
              <Button size="lg" variant="outline">
                View All Tools
              </Button>
            </motion.div>
          </div>
          
          <motion.div
            className="mt-16 relative max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {/* App Preview/Screenshot */}
            <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
              <img
                src="https://images.pexels.com/photos/5926393/pexels-photo-5926393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Buzzy Conversions File Converter"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            
            {/* Floating elements */}
            <motion.div
              className="absolute -top-8 -right-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">100% Secure</span>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Lightning Fast</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Popular Tools Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Popular Conversion Tools
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Convert your files with our most popular tools. Fast, easy, and high-quality.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTools.map((tool, index) => (
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
          
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/tools">
              <Button variant="outline" rightIcon={<ArrowRight size={18} />}>
                View All Tools
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Why Choose Buzzy Conversions?
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our platform is designed with user experience in mind. Here's what sets us apart.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                custom={index}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl">
            <div className="relative">
              {theme === 'dark' && (
                <div className="absolute inset-0 bg-neon-gradient-intense" />
              )}
              
              <div className={`bg-gradient-to-br ${
                theme === 'dark' 
                  ? 'from-gray-900/90 to-gray-900/90' 
                  : 'from-primary-600 to-secondary-600'
              } p-8 md:p-12 relative`}>
                <div className="max-w-3xl mx-auto text-center">
                  <motion.h2
                    className="text-3xl md:text-4xl font-bold text-white mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    Ready to Convert Your Files?
                  </motion.h2>
                  
                  <motion.p
                    className="text-lg text-white/90 mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Get started for free today. Upgrade anytime to access premium features.
                  </motion.p>
                  
                  <motion.div
                    className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Button 
                      size="lg" 
                      variant="accent"
                    >
                      Get Started Free
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="bg-transparent border-white text-white hover:bg-white/10"
                    >
                      View Pricing
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;