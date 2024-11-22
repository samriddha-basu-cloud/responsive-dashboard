import React from 'react';

const ProgressBar = ({ progress }) => {
  // Ensure progress stays within 0-100 range
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  const getTextColorClass = () => {
    if (normalizedProgress === 50) {
      return 'flex';  // Use flex to position number and symbol side by side
    }
    return normalizedProgress > 50 ? 'text-white' : 'text-gray-700';
  };

  return (
    <div className="relative w-full h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl backdrop-blur-sm border border-white/20 shadow-lg overflow-hidden">
      {/* Glass background container */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/10" />
      
      {/* Progress fill */}
      <div
        className="absolute h-full transition-all duration-500 ease-out rounded-xl bg-gradient-to-r from-red-600 to-red-800 backdrop-blur-sm"
        style={{ width: `${normalizedProgress}%` }}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
      </div>

      {/* Progress text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-sm font-bold ${getTextColorClass()} drop-shadow-md`}>
          {normalizedProgress === 50 ? (
            <>
              <span className="text-white">{normalizedProgress}</span>
              <span className="text-gray-700">%</span>
            </>
          ) : (
            `${normalizedProgress}%`
          )}
        </span>
      </div>
      
      {/* Subtle inner shadow */}
      <div className="absolute inset-0 rounded-xl shadow-inner" />
    </div>
  );
};

export default ProgressBar;