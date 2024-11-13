import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import AuthContainer from './AuthContainer.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        navigate('/dashboard');
      } else {
        setError('Please verify your email before logging in.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AuthContainer>
      <form onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-2 rounded-md transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Login
        </button>

        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-red-500 hover:text-red-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </AuthContainer>
  );
};

export default Login;