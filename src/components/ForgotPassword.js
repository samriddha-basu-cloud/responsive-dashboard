import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '../firebase'; // Firestore instance
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Ripple from './Ripple';
import GizLogo from '../assets/giz-logo.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Check if the email exists in Firestore
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setErrorMessage('No account found with this email.');
        setIsLoading(false);
        return;
      }

      // Email exists, proceed to send password reset email
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Password reset email sent! Check your inbox.');
    } catch (error) {
      let errorMsg = 'An error occurred. Please try again.';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMsg = 'Invalid email address format.';
          break;
        default:
          errorMsg = error.message;
      }
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden p-4">
      {/* Ripple Background */}
      <Ripple mainCircleSize={210} mainCircleOpacity={0.2} numCircles={8} className="z-0" />

      <form
        onSubmit={handlePasswordReset}
        className="relative w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-8 md:p-10 rounded-2xl shadow-2xl z-10 transform transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-700/10 rounded-2xl pointer-events-none"></div>
        
        <div className="relative">
          <img src={GizLogo} alt="GIZ Logo" className="h-12 w-auto mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800 dark:text-white text-center">
            Reset Password
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Enter your email to receive a password reset link.
          </p>

          {successMessage && (
            <div className="text-sm text-green-600 dark:text-green-400 mb-4 text-center">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="text-sm text-red-600 dark:text-red-400 mb-4 text-center">
              {errorMessage}
            </div>
          )}

          <div className="space-y-6">
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ml-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent dark:text-white transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Enter your email"
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-300 dark:ring-gray-600 pointer-events-none"></div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-3 rounded-xl font-semibold transform transition-all duration-300 hover:from-red-600 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 disabled:opacity-50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : 'Send Reset Link'}
            </button>

            <div className="text-center text-gray-600 dark:text-gray-400">
              <Link
                to="/login"
                className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 mt-2 inline-block transition-colors duration-300 hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;