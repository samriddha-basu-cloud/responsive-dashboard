// src/pages/Settings.js
import React from 'react';
import Sidebar from '../components/Sidebar';

const Settings = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <Sidebar active="settings" />
      <div className="flex-grow p-6 overflow-auto">
        <h1 className="text-3xl font-bold text-[#C31A07] dark:text-[#FF6B6B]">Settings</h1>
        <div className="mt-4">
          <p>This is the settings page. It is Coming Soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;