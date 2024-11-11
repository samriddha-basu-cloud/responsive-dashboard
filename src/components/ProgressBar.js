// ProgressBar.js
import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-6 mb-4 relative">
      <div
        className="bg-gradient-to-r from-red-500 to-red-700 h-6 rounded-full font-semibold text-white dark:text-white"
        style={{ width: `${progress}%` }}
      ></div>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-900 dark:text-gray-100">
        {progress}%
      </span>
    </div>
  );
};

export default ProgressBar;