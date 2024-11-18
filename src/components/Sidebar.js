import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { FiLogOut } from 'react-icons/fi';
import gizLogo from '../assets/giz-logo.gif';

const Sidebar = ({ active }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [userName, setUserName] = useState('');
  const [userInitials, setUserInitials] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.name);

          // Generate initials from the user's full name
          const nameParts = userData.name.split(' ');
          const initials = nameParts
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase())
            .join('');
          setUserInitials(initials);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: 'M3 7h18M3 12h18m-9 5h9', route: '/dashboard', key: 'dashboard' },
    { name: 'Profile', icon: 'M12 8c-1.38 0-2.74.35-3.9.97a8.962 8.962 0 00-2.6 2.6C4.35 13.26 4 14.62 4 16m8-4a4 4 0 014 4m0 0v1m0-1a4 4 0 014-4m0 0H5m14 0a4 4 0 014 4m0 0H6m-2 0a4 4 0 014-4', route: '/profile', key: 'profile' },
    { name: 'Settings', icon: 'M16 7v-2a4 4 0 10-8 0v2M5 12h14v10H5V12zm4 5h6', route: '/settings', key: 'settings' },
  ];

  return (
    <div
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } transition-all duration-300 ease-in-out h-full flex flex-col items-center bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
    >
      {/* Header with Toggle Button and Logo */}
      <div className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-white to-gray-200 dark:from-gray-800 dark:to-gray-700 shadow-md">
        <button
          className="p-2 focus:outline-none hover:text-gray-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800 dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800 dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
        {isOpen && <img src={gizLogo} alt="Company Logo" className="h-12 w-auto ml-2" />}
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center mt-8">
        {/* Display initials as placeholder instead of profile picture */}
        <div
          className={`rounded-full bg-[#C31A07] dark:bg-[#FF6B6B] flex items-center justify-center text-white font-bold ${
            isOpen ? 'w-20 h-20 text-2xl' : 'w-12 h-12 text-lg'
          }`}
        >
          {userInitials}
        </div>
        {isOpen && (
          <div className="mt-4 text-center">
            <p className="text-lg font-medium text-[#C31A07] dark:text-[#FF6B6B]">{userName}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Confused Developer</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-grow mt-10 w-full">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li
              key={item.key}
              className={`rounded-lg transition duration-200 ${
                active === item.key
                  ? 'bg-gray-300 dark:bg-gray-700'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => navigate(item.route)}
            >
              <a
                href="#"
                className="flex items-center p-4 space-x-4 text-[#C31A07] dark:text-[#FF6B6B] transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {isOpen && <span className="text-sm font-medium">{item.name}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center w-full p-4 space-x-4 text-red-500 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
      >
        <FiLogOut className="h-6 w-6" />
        {isOpen && <span className="text-sm font-medium">Log Out</span>}
      </button>
      {isOpen && <p className="mt-2 mb-4 text-xs text-gray-500 dark:text-gray-400">Version 1.0.1 &middot; © 2024 Company</p>}
    </div>
  );
};

export default Sidebar;