import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader } from 'lucide-react';

export type ConversionStep = {
  id: string;
  label: string;
  description: string;
};

interface ConversionProcessProps {
  steps: ConversionStep[];
  currentStep: string;
  isCompleted: boolean;
  progress: number;
}

export const ConversionProcess = ({
  steps,
  currentStep,
  isCompleted,
  progress,
}: ConversionProcessProps) => {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
  
  return (
    <div className="w-full">
      <div className="relative">
        {/* Progress bar */}
        <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {/* Steps */}
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => {
            const isActive = index === currentStepIndex;
            const isPast = index < currentStepIndex || isCompleted;
            const isFuture = index > currentStepIndex && !isCompleted;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div className="relative">
                  <motion.div
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 ${
                      isPast 
                        ? 'bg-primary-500 text-white' 
                        : isActive 
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-500 dark:text-primary-400 border-2 border-primary-500 dark:border-primary-400' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600'
                    }`}
                    initial={false}
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 2 }}
                  >
                    {isPast ? (
                      <Check className="h-4 w-4" />
                    ) : isActive ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <span className="text-xs font-medium">{index + 1}</span>
                    )}
                  </motion.div>
                </div>
                
                <div className="mt-2 flex flex-col items-center text-center w-24">
                  <span className={`text-xs font-medium ${
                    isActive || isPast 
                      ? 'text-primary-600 dark:text-primary-400' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Current step description */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isCompleted 
            ? 'Conversion completed! You can now download your file.' 
            : steps[currentStepIndex]?.description || ''}
        </p>
      </div>
    </div>
  );
};