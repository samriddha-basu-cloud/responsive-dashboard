// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProjectList from '../components/ProjectList';
import { useTheme } from '../context/ThemeContext';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Dashboard = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        }
      }
    };

    fetchUserName();
  }, []);

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

        {/* Welcome Message with Underlined Username
        <div className="mb-6 text-left">
          <h1 className="text-2xl font-semibold">
            Welcome,{' '}
            <span className="text-[#C31A07] dark:text-[#FF6B6B] underline decoration-[#C31A07] dark:decoration-[#FF6B6B]">
              {userName}
            </span>
          </h1>
        </div> */}

            {/* Welcome Message with Underlined Username */}
        <div className="mb-6 text-left">
          <h1 className="text-3xl font-comic text-[#C31A07] font-semibold">
            <span className="text-gray-800 dark:text-gray-200">Welcome,</span>{' '}
            <span
              className="bg-gradient-to-r from-[#C31A07] to-[#FF6B6B] bg-clip-text text-transparent underline decoration-[#C31A07] dark:decoration-[#FF6B6B] underline-offset-4"
            >
              {userName}
            </span>
          </h1>
        </div>
        {/* Project List with Navigation to Application Form */}
        <ProjectList onOpenApplication={() => navigate('/application-form')} />
      </div>
    </div>
  );
};

export default Dashboard;