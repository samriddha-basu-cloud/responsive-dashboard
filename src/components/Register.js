import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { FaCheckCircle } from 'react-icons/fa';
import Ripple from './Ripple';
import GizLogo from '../assets/giz-logo.png';

const ErrorDialog = ({ message, onClose }) => {
  useState(() => {
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
            <p className="text-sm leading-5 font-bold text-gray-900 dark:text-white">Error</p>
            <p className="mt-1 text-sm leading-5 text-gray-500 dark:text-gray-400">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={onClose}
              className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none transition-colors duration-200"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    const isValid =
      /.{8,}/.test(passwordValue) &&
      /[A-Z]/.test(passwordValue) &&
      /[a-z]/.test(passwordValue) &&
      /[0-9]/.test(passwordValue) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue);

    setIsPasswordValid(isValid);
    if (confirmPassword) setPasswordMatch(passwordValue === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);
    setPasswordMatch(password === confirmPasswordValue);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!passwordMatch) {
      setError('Passwords do not match.');
      return;
    }
    setIsLoading(true);

    try {
      // Check if email already exists
      const emailDoc = await getDoc(doc(db, 'users', email));
      if (emailDoc.exists()) {
        setError('Email already registered. Please log in or reset your password.');
        return;
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Save user info in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email,
        createdAt: serverTimestamp(),
      });

      // Show success popup
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        navigate('/login');
      }, 4000);
    } catch (error) {
      let errorMessage = 'An error occurred during registration.';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use. Please log in or reset your password.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak.';
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

      {/* Error Dialog */}
      {error && <ErrorDialog message={error} onClose={() => setError('')} />}

      {/* Popup Modal */}
      {showPopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center w-80">
            <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Verification Email Sent</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Please check your inbox and verify your email before logging in.
            </p>
          </div>
        </div>
      )}

      {/* Registration Form */}
      <form
        onSubmit={handleRegister}
        className="relative w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-8 md:p-10 rounded-2xl shadow-2xl z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-700/10 rounded-2xl pointer-events-none"></div>
        <img src={GizLogo} alt="GIZ Logo" className="h-12 w-auto mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 text-center">Create an Account</h2>

        <div className="space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent dark:text-white transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent dark:text-white transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent dark:text-white transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
          />

          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>Password must contain:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li className={`${password.length >= 8 ? 'text-green-500' : 'text-red-500'}`}>At least 8 characters</li>
              <li className={`${/[A-Z]/.test(password) ? 'text-green-500' : 'text-red-500'}`}>An uppercase letter</li>
              <li className={`${/[a-z]/.test(password) ? 'text-green-500' : 'text-red-500'}`}>A lowercase letter</li>
              <li className={`${/[0-9]/.test(password) ? 'text-green-500' : 'text-red-500'}`}>A digit</li>
              <li
                className={`${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-500' : 'text-red-500'}`}
              >
                A special character
              </li>
            </ul>
          </div>

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent dark:text-white transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
          />

          {!passwordMatch && confirmPassword && (
            <p className="text-red-500 text-sm">Passwords do not match.</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-3 rounded-xl font-semibold transform transition-all duration-300 hover:from-red-600 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 disabled:opacity-50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>

          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-red-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;