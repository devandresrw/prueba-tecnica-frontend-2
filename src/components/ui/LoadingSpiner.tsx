import React from 'react';

interface LoadingSpinnerProps {
    message?: string;
    fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    message = 'Cargando...',
    fullScreen = true
}) => {
    return (
        <div className={`
      flex items-center justify-center bg-mybg dark:bg-mybgdark
      ${fullScreen ? 'min-h-screen' : 'py-10'}
    `}>
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-400 mb-2"></div>
                <p className="text-lg text-gray-700 dark:text-gray-300">{message}</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;