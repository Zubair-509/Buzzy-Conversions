import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  isPremium?: boolean;
  isPopular?: boolean;
}

const ToolCard = ({ title, description, icon, path, isPremium = false, isPopular = false }: ToolCardProps) => {
  return (
    <Link to={path} className="block">
      <Card 
        interactive 
        className="h-full transition-all duration-300 group overflow-visible"
      >
        <div className="relative p-6">
          {isPremium && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200">
                Premium
              </span>
            </div>
          )}
          
          {isPopular && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200">
                Popular
              </span>
            </div>
          )}

          <div className="relative">
            <motion.div
              className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/40 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {icon}
            </motion.div>
            
            <motion.div
              className="absolute -inset-3 bg-primary-500/10 dark:bg-primary-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
              whileHover={{ scale: 1.2 }}
            />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
          
          <div className="mt-4 text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform duration-300">
            Use tool →
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ToolCard;