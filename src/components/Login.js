import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import Ripple from './Ripple'; // Adjust the import path as needed

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
        navigate('/dashboard'); // Allow access if verified
      } else {
        setError('Please verify your email before logging in.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Ripple Background */}
      <Ripple mainCircleSize={210} mainCircleOpacity={0.2} numCircles={8} className="z-0" />

      <form
        onSubmit={handleLogin}
        className="relative bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96 z-10"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}

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
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white p-2 rounded-md"
        >
          Login
        </button>

        <p className="mt-4 text-gray-700 dark:text-gray-300">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
