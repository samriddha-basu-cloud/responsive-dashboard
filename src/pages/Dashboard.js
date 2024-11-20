import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProjectList from '../components/ProjectList';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track sidebar state

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        }
      }
    };

    fetchUserName();
  }, []);

  const handleOpenApplication = (projectId) => {
    navigate('/application-form', { state: { projectId } });
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen
            ? 'md:ml-72 ml-20' // Adjust the margin for sidebar in desktop and mobile view
            : 'ml-20'
        } flex-grow p-4 md:p-6 overflow-auto`}
      >
        {/* Welcome Message */}
        <div className="mb-6 mt-16 text-left">
          <h1 className="text-2xl md:text-3xl font-comic text-[#C31A07] font-semibold">
            <span className="text-gray-800 dark:text-gray-200">Welcome,</span>{' '}
            <span
              className="bg-gradient-to-r from-[#C31A07] to-[#FF6B6B] bg-clip-text text-transparent underline decoration-[#C31A07] dark:decoration-[#FF6B6B] underline-offset-4"
            >
              {userName}
            </span>
          </h1>
        </div>

        {/* Project List */}
        <div>
          <ProjectList onOpenApplication={handleOpenApplication} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;