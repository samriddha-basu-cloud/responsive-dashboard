import React, { useState } from 'react';

const ProjectList = ({ onOpenApplication, onAddNewProject }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    { id: 1, name: 'Project Alpha', details: 'This is a detailed description of Project Alpha.' },
    { id: 2, name: 'Project Beta', details: 'This is a detailed description of Project Beta.' },
    { id: 3, name: 'Project Gamma', details: 'This is a detailed description of Project Gamma.' },
    { id: 4, name: 'Project Delta', details: 'This is a detailed description of Project Delta.' },
  ];

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
            onClick={onAddNewProject} // Trigger function when button is clicked
            className="px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-all duration-300"
            style={{
              background: 'linear-gradient(to right, #C31A07, #9E1305)',
              boxShadow: '0 4px 14px rgba(195, 26, 7, 0.4)',
            }}
          >
            + Add New Project
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
      
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md transition-colors duration-300"
          >
            {/* Project Information */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{project.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.details}</p>
              <div className="flex space-x-2 mt-4">
                {/* Open Application Button */}
                <button
                  onClick={onOpenApplication} // Open Application Form
                  className="px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(to right, #C31A07, #9E1305)',
                    boxShadow: '0 4px 14px rgba(195, 26, 7, 0.4)',
                  }}
                >
                  Open Application
                </button>

                {/* Download Application Button */}
                <button
                  className="px-4 py-2 rounded-md text-white flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(to right, #C31A07, #9E1305)',
                    boxShadow: '0 4px 14px rgba(195, 26, 7, 0.4)',
                  }}
                >
                  {/* Download Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download Application</span>
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
    </div>
  );
};

export default ProjectList;