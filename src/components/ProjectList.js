// src/components/ProjectList.js
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'; // Import uuid to generate unique project IDs
import { FiDownload } from 'react-icons/fi'; // Import download icon
import { FaUser } from 'react-icons/fa'; // Import user icon for Profile Form

const ProjectList = ({ onOpenApplication }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projects, setProjects] = useState([]); // Projects state for user's projects

  // Fetch the user's projects from Firestore on component mount
  useEffect(() => {
    const fetchUserProjects = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProjects(userData.projects || []); // Set projects to user's projects or empty array
        }
      }
    };

    fetchUserProjects();
  }, []);

  const handleAddNewProject = async () => {
    if (!projectName || !projectDescription) return; // Basic validation

    const newProject = {
      id: uuidv4(), // Generate unique ID
      name: projectName,
      details: projectDescription,
    };

    // Add project to Firestore and update UI
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        projects: arrayUnion(newProject), // Add new project to the user's projects array in Firestore
      });

      // Update the local state with the new project
      setProjects((prevProjects) => [...prevProjects, newProject]);
    }

    // Clear inputs and close modal
    setProjectName('');
    setProjectDescription('');
    setIsModalOpen(false);
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Projects</h2>

        {/* Button and Search Bar in a Flex Container */}
        <div className="flex items-center space-x-2">
          {/* Add New Project Button */}
          <button
            onClick={() => setIsModalOpen(true)} // Open modal on button click
            className="px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-all duration-300"
            style={{
              background: 'linear-gradient(to right, #C31A07, #9E1305)',
              boxShadow: '0 4px 14px rgba(195, 26, 7, 0.4)',
            }}
          >
            + Add Project
          </button>

          {/* Search Bar */}
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Project Cards */}
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md transition-colors duration-300"
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{project.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.details}</p>
              <div className="flex space-x-2 mt-4">
                {/* Profile Form Button */}
                <button
                  onClick={onOpenApplication}
                  className="px-4 py-2 rounded-md text-white flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(to right, #C31A07, #9E1305)',
                    boxShadow: '0 4px 14px rgba(195, 26, 7, 0.4)',
                  }}
                >
                  <FaUser className="h-5 w-5" />
                  <span>Profile Form</span>
                </button>

                {/* Download Form Button */}
                <button
                  className="px-4 py-2 rounded-md text-white flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(to right, #C31A07, #9E1305)',
                    boxShadow: '0 4px 14px rgba(195, 26, 7, 0.4)',
                  }}
                >
                  <FiDownload className="h-5 w-5" />
                  <span>Download Form</span>
                </button>
              </div>
            </div>

            {/* Enhanced Timeline Marker */}
            <div className="flex flex-col items-center ml-6">
              {/* Application Started */}
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-700 rounded-full shadow-md"></div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Application Started</span>
              </div>

              {/* Connector with Progress */}
              <div className="relative w-0.5 h-12 bg-gray-300 dark:bg-gray-600 my-2">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1/2 bg-gradient-to-b from-red-500 to-red-700 rounded-full shadow"></div>
              </div>

              {/* Application Completed */}
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-700 rounded-full shadow-md"></div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Application Completed</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding New Project */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Add Project</h2>
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            />
            <textarea
              placeholder="Project Description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            />
            <button
              onClick={handleAddNewProject}
              className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white p-2 rounded-md"
            >
              Add Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;