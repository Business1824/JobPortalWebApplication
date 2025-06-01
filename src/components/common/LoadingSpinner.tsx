import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  fullPage?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = '#0066cc',
  fullPage = false
}) => {
  const getSpinnerSize = () => {
    switch (size) {
      case 'small': return 'w-5 h-5';
      case 'large': return 'w-12 h-12';
      default: return 'w-8 h-8';
    }
  };

  const spinner = (
    <div className="flex justify-center items-center">
      <div 
        className={`${getSpinnerSize()} border-4 border-t-transparent rounded-full animate-spin`}
        style={{ borderTopColor: 'transparent', borderColor: color }}
      ></div>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;