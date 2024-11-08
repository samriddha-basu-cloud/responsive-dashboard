import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProjectList from '../components/ProjectList';
import ApplicationForm from '../components/ApplicationForm';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <Sidebar />
      <div className="flex-grow p-6 overflow-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 transition-all duration-300"
            style={{
              background: 'linear-gradient(to right, #C31A07, #9E1305)',
              boxShadow: '0 4px 14px rgba(195, 26, 7, 0.4)',
            }}
          >
            {/* SVG Icon for Theme Toggle */}
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>
        {/* Pass function to open the form to ProjectList */}
        <ProjectList onOpenApplication={() => setShowForm(true)} />
      </div>
      {/* Conditionally render ApplicationForm */}
      {showForm && <ApplicationForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default Dashboard;