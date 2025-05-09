import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-background-dark-primary text-gray-100' 
        : 'bg-background-light-primary text-gray-900'
    }`}>
      {/* Background pattern */}
      <div className="fixed inset-0 -z-20 bg-hero-pattern opacity-30" />
      
      {/* Background gradient */}
      <div className={`fixed inset-0 -z-10 ${
        theme === 'dark' 
          ? 'bg-dark-gradient opacity-95' 
          : 'bg-light-gradient'
      }`} />
      
      {/* Light mode glow effect */}
      {theme === 'light' && (
        <div className="fixed inset-0 -z-10 bg-light-glow" />
      )}
      
      {/* Content */}
      <div className="relative z-0">
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout; 