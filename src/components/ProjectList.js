import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { FiTrash, FiEdit } from 'react-icons/fi';
import { FaRegStickyNote } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [editProjectId, setEditProjectId] = useState(null);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [newProjectIds, setNewProjectIds] = useState(new Set());
  const [clickedButtons, setClickedButtons] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProjects = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProjects(userData.projects || []);
        }
      }
    };

    fetchUserProjects();
  }, []);

  const handleAddNewProject = async () => {
    if (!projectName || !projectDescription) return;

    const newProjectId = uuidv4();
    const newProject = {
      id: newProjectId,
      name: projectName,
      details: projectDescription,
      progress: 0,
    };

    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        projects: arrayUnion(newProject),
      });

      setProjects((prevProjects) => [...prevProjects, newProject]);
      setNewProjectIds(prev => new Set(prev).add(newProjectId));
    }

    setProjectName('');
    setProjectDescription('');
    setIsModalOpen(false);
  };

  const handleOpenApplication = (projectId) => {
    setClickedButtons(prev => new Set(prev).add(projectId));
    navigate('/application-form', { state: { projectId } });
  };

const SurveyButton = ({ project }) => {
  const isNew = newProjectIds.has(project.id);
  const hasBeenClicked = clickedButtons.has(project.id);
  const [showTooltip, setShowTooltip] = useState(isNew);

  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  return (
    <div className="relative group">
      <button
        onClick={() => handleOpenApplication(project.id)}
        className={`flex-1 sm:flex-none px-4 py-2 rounded-md text-white flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-all duration-300 relative overflow-hidden ${
          isNew && !hasBeenClicked 
            ? 'animate-golden-pulse' 
            : ''
        }`}
        style={{
          background: 'linear-gradient(to right, #C31A07, #9E1305)',
          boxShadow: '0 4px 14px rgba(195, 26, 7, 0.4)',
        }}
      >
        {/* Golden Glow Effect */}
        {isNew && !hasBeenClicked && (
          <>
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-gold-500 to-yellow-600 opacity-30 animate-golden-glow"></span>
            <span className="absolute inset-0 border-1 border-yellow-300 rounded-md animate-border-pulse"></span>
          </>
        )}
        <FaRegStickyNote className="h-5 w-5 relative z-10" />
        <span className="hidden sm:inline ml-2 relative z-10">Survey Form</span>
      </button>
      {showTooltip && (
        <div className="absolute bottom-full left-2/3 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-50">
          Please, Fill the survey form for Projections
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
        </div>
      )}
    </div>
  );
};
  const handleDeleteProject = async () => {
    const user = auth.currentUser;
    if (user && deleteProjectId) {
      const userDocRef = doc(db, 'users', user.uid);
      const projectToDelete = projects.find((project) => project.id === deleteProjectId);

      if (projectToDelete) {
        await updateDoc(userDocRef, {
          projects: arrayRemove(projectToDelete),
        });

        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== deleteProjectId)
        );
      }
    }

    setIsDeleteDialogOpen(false);
    setDeleteProjectId(null);
  };

  const handleEditProject = (project) => {
    setEditProjectId(project.id);
    setProjectName(project.name);
    setProjectDescription(project.details);
    setIsEditModalOpen(true);
  };

  const handleUpdateProject = async () => {
    if (!projectName || !projectDescription || !editProjectId) return;

    const updatedProject = {
      id: editProjectId,
      name: projectName,
      details: projectDescription,
      progress: projects.find((p) => p.id === editProjectId)?.progress || 0,
    };

    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const oldProject = projects.find((p) => p.id === editProjectId);

      if (oldProject) {
        await updateDoc(userDocRef, {
          projects: arrayRemove(oldProject),
        });
        await updateDoc(userDocRef, {
          projects: arrayUnion(updatedProject),
        });

        setProjects((prevProjects) =>
          prevProjects.map((p) => (p.id === editProjectId ? updatedProject : p))
        );
      }
    }

    setProjectName('');
    setProjectDescription('');
    setEditProjectId(null);
    setIsEditModalOpen(false);
  };
  

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {/* Search and Add Project section remains the same */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">Projects</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-all duration-300"
            style={{
              background: 'linear-gradient(to right, #C31A07, #9E1305)',
              boxShadow: '0 4px 14px rgba(195, 26, 7, 0.4)',
            }}
          >
            + Add Project
          </button>
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 w-full sm:w-auto border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute h-5 w-5 top-2.5 left-3 text-gray-400"
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
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md transition-all duration-300"
          >
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">{project.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.details}</p>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <SurveyButton project={project} />
                  
                  {/* Edit Button - Icon on mobile, Icon+text on desktop */}
                  <button
                    onClick={() => handleEditProject(project)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-md text-white flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-all duration-300"
                    style={{
                      background: 'linear-gradient(to right, #C31A07, #9E1305)',
                      boxShadow: '0 4px 14px rgba(195, 26, 7, 0.4)',
                    }}
                  >
                    <FiEdit className="h-5 w-5"/>
                    <span className="hidden sm:inline ml-2">Edit</span>
                  </button>

                  {/* Delete Button - Icon on mobile, Icon+text on desktop */}
                  <button
                    onClick={() => {
                      setDeleteProjectId(project.id);
                      setIsDeleteDialogOpen(true);
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-md text-white flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-all duration-300"
                    style={{
                      background: 'linear-gradient(to right, #C31A07, #9E1305)',
                      boxShadow: '0 4px 14px rgba(195, 26, 7, 0.4)',
                    }}
                  >
                    <FiTrash className="h-5 w-5" />
                    <span className="hidden sm:inline ml-2">Delete</span>
                  </button>
                </div>
            </div>

            {/* Progress Timeline - Vertical on desktop, horizontal on mobile */}
            <div className="flex flex-col sm:ml-6 mt-4 sm:mt-0">
              {/* Mobile Timeline (Horizontal) */}
              <div className="flex sm:hidden items-center w-full justify-between px-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-700 rounded-full shadow-md"></div>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 mt-1">Started</span>
                </div>
                
                <div className="relative flex-1 mx-4 h-0.5 bg-gray-300 dark:bg-gray-600">
                  <div
                    className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-red-700 rounded-full shadow"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  ></div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-700 rounded-full shadow-md"></div>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 mt-1">Completed</span>
                </div>
              </div>
              
              {/* Desktop Timeline (Vertical) */}
              <div className="hidden sm:flex flex-col items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-700 rounded-full shadow-md"></div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Application Started</span>
                </div>
                <div className="relative w-0.5 h-12 bg-gray-300 dark:bg-gray-600 my-2">
                  <div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-red-500 to-red-700 rounded-full shadow"
                    style={{
                      height: `${project.progress}%`,
                    }}
                  ></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-700 rounded-full shadow-md"></div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Application Completed</span>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-2 text-center">
                {project.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modals remain unchanged */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-1/3 relative">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setProjectName('');
                setProjectDescription('');
              }}
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500 text-2xl"
            >
              &times;
            </button>
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

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-1/3 relative">
            <button
              onClick={() => {
                setIsEditModalOpen(false);
                setProjectName('');
                setProjectDescription('');
              }}
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
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
              onClick={handleUpdateProject}
              className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white p-2 rounded-md"
            >
              Update Project
            </button>
          </div>
        </div>
      )}

      {isDeleteDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Do you want to delete this project? This action cannot be undone.
            </p>
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => {
                  setIsDeleteDialogOpen(false);
                  setDeleteProjectId(null);
                }}
                className="w-full bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProject}
                className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;