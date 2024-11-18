// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <h1 className="text-4xl font-bold text-[#C31A07] dark:text-[#FF6B6B] mb-4">
        Welcome to Our Application
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Manage your projects efficiently and stay organized.
      </p>
      <div className="space-x-4">
        <Link
          to="/register"
          className="px-6 py-2 text-white rounded-lg bg-gradient-to-r from-red-500 to-red-700 shadow-md hover:shadow-lg transition"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="px-6 py-2 text-white rounded-lg bg-gradient-to-r from-gray-600 to-gray-800 shadow-md hover:shadow-lg transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;