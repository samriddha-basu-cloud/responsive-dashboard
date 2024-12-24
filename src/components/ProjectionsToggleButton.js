import React from 'react';

const ProjectionsToggleButton = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <style>
        {`
          .text-xxs {
            font-size: 0.65rem; 
          }
        `}
      </style>
      <button
        onClick={onClick}
        className="group relative flex items-center justify-center rounded-full text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300 p-8"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full" />
        
        {/* Circular Rotating Text */}
        <svg 
          className="absolute w-full h-full animate-spin"
          style={{ animationDuration: '10s' }}
          viewBox="0 0 100 100"
        >
          <defs>
            <path
              id="textCircle"
              d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
          </defs>
          <text className="text-xxs fill-current font-bold">
            <textPath 
              href="#textCircle"
              className="tracking-wider"
            >
              DATA REPRESENTATION • CLICK HERE • 
            </textPath>
          </text>
        </svg>

        {/* Center Icon */}
        <div className="relative z-10">
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
      </button>
    </div>
  );
};

export default ProjectionsToggleButton;