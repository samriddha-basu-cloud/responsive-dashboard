import React from 'react';

const SunspotLoader = ({ size = "md" }) => {
  // Size mappings using Tailwind classes
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      {/* Outer ping animation */}
      <div className="absolute inset-0 rounded-full bg-red-600 opacity-20 animate-ping" />
      {/* Middle pulse animation */}
      <div className="absolute inset-0 rounded-full bg-red-600 opacity-40 animate-pulse" />
      {/* Center circle */}
      <div className="absolute inset-2 rounded-full bg-red-600" />
    </div>
  );
};

export default SunspotLoader;