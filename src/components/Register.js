import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { FaCheckCircle } from 'react-icons/fa';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    
    const minLength = /.{8,}/;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const digit = /[0-9]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    const isValid =
      minLength.test(passwordValue) &&
      uppercase.test(passwordValue) &&
      lowercase.test(passwordValue) &&
      digit.test(passwordValue) &&
      specialChar.test(passwordValue);

    setIsPasswordValid(isValid);

    if (confirmPassword) {
      setPasswordMatch(passwordValue === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);
    setPasswordMatch(password === confirmPasswordValue);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!passwordMatch) {
      setError('Passwords do not match');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      setShowPopup(true);

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        createdAt: serverTimestamp(),
        projects: []
      });

      setTimeout(() => {
        setShowPopup(false);
        navigate('/login');
      }, 4000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 relative">
      {/* Popup Modal */}
      {showPopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center w-80">
            <FaCheckCircle className="text-red-500 text-4xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Verification Email Sent</h3>
            <p className="text-gray-700 dark:text-gray-300">Please check your inbox and click the link to verify your email before logging in.</p>
          </div>
        </div>
      )}

      {/* Main Container with Shine Effect */}
      <div className="relative">
        {/* Animated border gradient */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-white to-red-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
        
        {/* Registration Form */}
        <div className="relative bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-96">
          <form onSubmit={handleRegister}>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Create Account</h2>
            {error && <p className="text-red-500 mb-4 p-3 bg-red-50 dark:bg-red-900/30 rounded-md">{error}</p>}

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mb-4 px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mb-4 px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full mb-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200"
            />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              <p className="font-medium mb-1">Password must contain:</p>
              <ul className="space-y-1">
                <li className={`flex items-center ${password.length >= 8 ? 'text-green-500' : 'text-gray-400'}`}>
                  <span className="mr-2">{password.length >= 8 ? '✓' : '○'}</span>
                  At least 8 characters
                </li>
                <li className={`flex items-center ${/[A-Z]/.test(password) ? 'text-green-500' : 'text-gray-400'}`}>
                  <span className="mr-2">{/[A-Z]/.test(password) ? '✓' : '○'}</span>
                  An uppercase letter
                </li>
                <li className={`flex items-center ${/[a-z]/.test(password) ? 'text-green-500' : 'text-gray-400'}`}>
                  <span className="mr-2">{/[a-z]/.test(password) ? '✓' : '○'}</span>
                  A lowercase letter
                </li>
                <li className={`flex items-center ${/[0-9]/.test(password) ? 'text-green-500' : 'text-gray-400'}`}>
                  <span className="mr-2">{/[0-9]/.test(password) ? '✓' : '○'}</span>
                  A digit
                </li>
                <li className={`flex items-center ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-500' : 'text-gray-400'}`}>
                  <span className="mr-2">{/[!@#$%^&*(),.?":{}|<>]/.test(password) ? '✓' : '○'}</span>
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
              className="w-full mb-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200"
              disabled={!isPasswordValid}
            />

            {!passwordMatch && confirmPassword && (
              <p className="text-red-500 text-sm mb-4">Passwords do not match</p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 px-4 rounded-md transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Register
            </button>

            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-red-500 hover:text-red-600 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;