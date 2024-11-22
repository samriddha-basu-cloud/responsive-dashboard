import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import Ripple from './Ripple';
import GizLogo from '../assets/giz-logo.png';

const ErrorDialog = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 max-w-sm w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out z-50 mx-4">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm leading-5 font-bold text-gray-900 dark:text-white">
              Error
            </p>
            <p className="mt-1 text-sm leading-5 text-gray-500 dark:text-gray-400">
              {message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={onClose}
              className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none transition-colors duration-200"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-red-500/30 h-1">
        <div className="h-full bg-red-500 transition-all duration-5000 ease-linear" style={{ width: '0%', animation: 'progress 5s linear' }}></div>
      </div>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        navigate('/dashboard');
      } else {
        setError('Please verify your email before logging in.');
      }
    } catch (error) {
      let errorMessage = 'An error occurred during login.';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address format.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        default:
          errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden p-4">
      {/* Ripple Background */}
      <Ripple mainCircleSize={210} mainCircleOpacity={0.2} numCircles={8} className="z-0" />

      {error && <ErrorDialog message={error} onClose={() => setError('')} />}

      <form
        onSubmit={handleLogin}
        className="relative w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-8 md:p-10 rounded-2xl shadow-2xl z-10 transform transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-700/10 rounded-2xl pointer-events-none"></div>
        
        <div className="relative text-center">
          <img src={GizLogo} alt="GIZ Logo" className="h-12 w-auto mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 dark:text-white">Welcomes You Back</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Sign in to your account</p>

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

            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent dark:text-white transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Enter your password"
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
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">or</span>
              </div>
            </div>

            <div className="text-center text-gray-600 dark:text-gray-400">
              <p className="text-sm">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="text-red-500 hover:text-red-600 font-semibold transition-colors duration-300 hover:underline"
                >
                  Create an account
                </Link>
              </p>
              <Link 
                to="/forgot-password" 
                className="text-sm text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 mt-2 inline-block transition-colors duration-300 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </form>

      <style jsx>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }

        @media (max-width: 640px) {
          .max-w-md {
            margin: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;