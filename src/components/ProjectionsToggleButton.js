import React from 'react';

const ProjectionsToggleButton = ({ onClick }) => {
  return (
    <div className="fixed bottom-16 right-16 z-40">
      <button
        onClick={onClick}
        className="group relative flex items-center justify-center rounded-full text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full" />
        
        <div className="flex items-center">
          {/* Icon Container */}
          <div className="p-3">
            <svg 
              className="w-12 h-12"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
              />
            </svg>
          </div>
          
          {/* Text Container */}
          <div className="w-0 overflow-hidden group-hover:w-40 transition-all duration-300 ease-in-out pr-0 group-hover:pr-4">
            <span className="text-lg font-semibold whitespace-nowrap">
              View Projections
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ProjectionsToggleButton;