import React from 'react';

const AuthContainer = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="relative">
        {/* Animated border gradient */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-white to-red-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
        {/* Container */}
        <div className="relative bg-white dark:bg-gray-800 p-8 rounded-lg w-96 shadow-xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;