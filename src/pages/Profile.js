// src/pages/Profile.js
import React from 'react';
import Sidebar from '../components/Sidebar';

const Profile = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <Sidebar active="profile" />
      <div className="flex-grow p-6 overflow-auto">
        <h1 className="text-3xl font-bold text-[#C31A07] dark:text-[#FF6B6B]">Profile</h1>
        <div className="mt-4">
          <p>This is the profile page. Add your profile details here.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;