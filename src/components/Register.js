// src/components/Register.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { FaCheckCircle } from 'react-icons/fa'; // Import check icon from react-icons

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
    
    // Define password criteria
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

      // Send email verification
      await sendEmailVerification(user);

      // Show verification popup
      setShowPopup(true);

      // Save user details in Firestore with empty projects array
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        createdAt: serverTimestamp(),
        projects: [] // Empty array for projects
      });

      // Automatically close the popup and navigate after 4 seconds
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
            <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Verification Email Sent</h3>
            <p className="text-gray-700 dark:text-gray-300">Please check your inbox and click the link to verify your email before logging in.</p>
          </div>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleRegister} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border rounded-md"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border rounded-md"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
          className="w-full mb-2 px-4 py-2 border rounded-md"
        />

        <div className="mb-4 text-sm text-gray-700 dark:text-gray-300">
          <p>Password must contain:</p>
          <ul className="list-disc list-inside">
            <li className={`${password.length >= 8 ? 'text-green-600' : 'text-red-600'}`}>At least 8 characters</li>
            <li className={`${/[A-Z]/.test(password) ? 'text-green-600' : 'text-red-600'}`}>An uppercase letter</li>
            <li className={`${/[a-z]/.test(password) ? 'text-green-600' : 'text-red-600'}`}>A lowercase letter</li>
            <li className={`${/[0-9]/.test(password) ? 'text-green-600' : 'text-red-600'}`}>A digit</li>
            <li className={`${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-600' : 'text-red-600'}`}>A special character</li>
          </ul>
        </div>

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
          className="w-full mb-2 px-4 py-2 border rounded-md"
          disabled={!isPasswordValid}
        />

        {!passwordMatch && confirmPassword && (
          <p className="text-red-500 text-sm mb-4">Passwords do not match</p>
        )}

        <button type="submit" className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white p-2 rounded-md">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;