import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import gizLogo from '../assets/giz-logo.png';

const LogoutDialog = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm mx-4 shadow-xl"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Confirm Logout
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to logout? You'll need to sign in again to access your account.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-[#C31A07] hover:bg-[#A31505] dark:bg-[#FF6B6B] dark:hover:bg-[#FF5151] rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [userName, setUserName] = useState('');
  const [userInitials, setUserInitials] = useState('');
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.name);
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
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    {
      name: 'Dashboard',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      route: '/dashboard',
      key: 'dashboard'
    },
    {
      name: 'Profile',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      route: '/profile',
      key: 'profile'
    },
    {
      name: 'Settings',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
      route: '/settings',
      key: 'settings'
    },
  ];

  const isActiveRoute = (route) => {
    return location.pathname === route;
  };

  return (
    <>
      <motion.div
        initial={false}
        animate={{ width: isOpen ? 280 : 88 }}
        className="h-full flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg"
      >
        {/* Header */}
        <div className="px-4 py-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle sidebar"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            {isOpen && (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={gizLogo}
                alt="Company Logo"
                className="h-14 w-auto ml-2"
              />
            )}
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center py-8 border-b border-gray-200 dark:border-gray-700">
          <motion.div
            animate={{ scale: isOpen ? 1 : 0.8 }}
            className={`rounded-full bg-gradient-to-br from-[#C31A07] to-[#FF6B6B] flex items-center justify-center text-white font-bold shadow-lg ${
              isOpen ? 'w-24 h-24 text-3xl' : 'w-14 h-14 text-xl'
            }`}
          >
            {userInitials}
          </motion.div>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{userName}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Main Author</p>
            </motion.div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <motion.button
              key={item.key}
              whileHover={{ x: 4 }}
              onClick={() => navigate(item.route)}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActiveRoute(item.route)
                  ? 'bg-[#C31A07] text-white dark:bg-[#FF6B6B] dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {isOpen && (
                <span className="ml-4 text-sm font-medium">
                  {item.name}
                </span>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowLogoutDialog(true)}
            className="w-full flex items-center px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiLogOut className="h-5 w-5" />
            {isOpen && <span className="ml-4 text-sm text-red-700 dark:text-red-500 font-medium">Log Out</span>}
          </button>
          {isOpen && (
            <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
              Version 1.0.1 &middot; © 2024 Company
            </p>
          )}
        </div>
      </motion.div>

      {/* Custom Logout Dialog */}
      <AnimatePresence>
        <LogoutDialog
          isOpen={showLogoutDialog}
          onClose={() => setShowLogoutDialog(false)}
          onConfirm={() => {
            handleLogout();
            setShowLogoutDialog(false);
          }}
        />
      </AnimatePresence>
    </>
  );
};

export default Sidebar;