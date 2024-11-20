import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [userName, setUserName] = useState('');
  const [newName, setNewName] = useState('');
  const [initials, setInitials] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [feedback, setFeedback] = useState(null); // Feedback for success or failure
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.name);
          setNewName(userData.name);
          setInitials(
            userData.name
              .split(' ')
              .slice(0, 2)
              .map((n) => n.charAt(0).toUpperCase())
              .join('')
          );
        }
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateName = async () => {
    try {
      const user = auth.currentUser;
      if (user && newName !== userName) {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { name: newName });
        setUserName(newName);
        showFeedback('success', 'Name updated successfully!');
      }
    } catch (error) {
      showFeedback('error', 'Error updating name. Please try again.');
    }
  };

  const validatePassword = (password) => {
    const rules = [
      { regex: /.{8,}/, message: 'At least 8 characters' },
      { regex: /[A-Z]/, message: 'An uppercase letter' },
      { regex: /[a-z]/, message: 'A lowercase letter' },
      { regex: /\d/, message: 'A digit' },
      { regex: /[!@#$%^&*(),.?":{}|<>]/, message: 'A special character' },
    ];

    const errors = rules.filter((rule) => !rule.regex.test(password)).map((rule) => rule.message);
    return errors;
  };

  const handlePasswordChange = (password) => {
    setNewPassword(password);
    const errors = validatePassword(password);
    setPasswordError(errors.length > 0 ? errors.join(', ') : '');
  };

  const handleUpdatePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        showFeedback('error', 'Passwords do not match!');
        return;
      }

      if (newPassword === oldPassword) {
        showFeedback('error', 'New password cannot be the same as the old password.');
        return;
      }

      if (passwordError) {
        showFeedback('error', 'Password does not meet requirements.');
        return;
      }

      const user = auth.currentUser;
      if (user && oldPassword && newPassword) {
        const credential = EmailAuthProvider.credential(user.email, oldPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);

        // Clear password fields
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');

        showFeedback('success', 'Password updated successfully!');
      }
    } catch (error) {
      showFeedback('error', 'Error updating password. Please check your old password and try again.');
    }
  };

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const isNameUnchanged = newName === userName;
  const isPasswordInvalid = !newPassword || !confirmPassword || newPassword !== confirmPassword || passwordError;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen
            ? 'md:ml-72 ml-20'
            : 'ml-20'
        } flex-grow p-4 md:p-6 overflow-auto`}
      >
        {/* Feedback Notification */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-4 right-4 px-4 py-3 rounded shadow-lg text-white flex items-center space-x-2 ${
                feedback.type === 'success' ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {feedback.type === 'success' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2a9 9 0 110 18 9 9 0 010-18z"
                  />
                </svg>
              )}
              <span className="font-medium">{feedback.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="rounded-full bg-gradient-to-br from-[#C31A07] to-[#FF6B6B] text-white text-xl font-bold flex items-center justify-center w-24 h-24">
            {initials}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#C31A07] dark:text-[#FF6B6B]">Profile</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account details below</p>
          </div>
        </div>

        {/* Update Name */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Update Name</h2>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          />
          <button
            onClick={handleUpdateName}
            disabled={isNameUnchanged}
            className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 ${
              isNameUnchanged
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#C31A07] hover:bg-[#A31505]'
            }`}
          >
            Update Name
          </button>
        </div>

        {/* Update Password */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Update Password</h2>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Old Password"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => handlePasswordChange(e.target.value)}
            placeholder="New Password"
            className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          />
          {passwordError && <p className="text-sm text-red-600 mb-2">{passwordError}</p>}
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          />
          <button
            onClick={handleUpdatePassword}
            disabled={isPasswordInvalid}
            className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 ${
              isPasswordInvalid
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#C31A07] hover:bg-[#A31505]'
            }`}
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;