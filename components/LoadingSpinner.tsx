import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-500/20 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin absolute left-0 top-0"></div>
      </div>
      <p className="mt-4 text-lg font-semibold text-indigo-200">AI is finding your perfect stay...</p>
    </div>
  );
};
