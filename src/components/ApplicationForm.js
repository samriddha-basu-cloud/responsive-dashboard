import React, { useState, useEffect } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaUser, FaInfoCircle, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import RespondentDetails from './RespondentDetails';
import ProjectInformation from './ProjectInformation';
import Pathway1 from './Pathway1';
import Pathway2 from './Pathway2';
import Pathway3 from './Pathway3';
import Pathway4 from './Pathway4';
import Pathway5 from './Pathway5';
import Pathway6 from './Pathway6';
import Pathway7 from './Pathway7';
import Pathway8 from './Pathway8';
import Pathway9 from './Pathway9';
import Pathway10 from './Pathway10';
import ProgressBar from './ProgressBar';
import PathwayProjections from './PathwayProjections';

const ApplicationForm = () => {
  const [step, setStep] = useState(1);
  const [showProjections, setShowProjections] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [projectionTrigger, setProjectionTrigger] = useState(0); // NEW
  const totalSteps = 12;
  const location = useLocation();
  const { projectId } = location.state || {};
  const [completedSteps, setCompletedSteps] = useState([]);
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!projectId) return;

      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const project = userData.projects.find((p) => p.id === projectId);

          if (project && project.sections) {
            setProjectName(project.name || 'Unnamed Project');
            const sectionKeys = Object.keys(project.sections);
            const completedIndexes = sectionKeys.map((key) =>
              key.startsWith('Pathway') ? parseInt(key.replace('Pathway', '')) + 2 : 2
            );
            const lastCompletedStep = Math.max(1, ...completedIndexes);
            setStep(lastCompletedStep);
            setCompletedSteps(Array.from({ length: lastCompletedStep }, (_, i) => i + 1));
          }
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjectData();
  }, [projectId]);

  const updateProjectProgress = async () => {
    if (!projectId) {
      console.error('No projectId provided');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedProjects = userData.projects.map((project) =>
          project.id === projectId
            ? {
                ...project,
                progress: Math.round((step / totalSteps) * 100),
              }
            : project
        );

        await updateDoc(userDocRef, { projects: updatedProjects });
        console.log('Project progress updated successfully');
      }
    } catch (error) {
      console.error('Error updating project progress:', error);
    }
  };

  const getRomanNumeral = (number) => {
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    return number > 0 && number <= romanNumerals.length ? romanNumerals[number - 1] : '';
  };

  const sectionNames = [
    { name: 'Respondent Details', icon: <FaUser /> },
    { name: 'Project Information', icon: <FaInfoCircle /> },
    ...Array.from({ length: 10 }, (_, i) => ({
      name: `Pathway ${i + 1}`,
      icon: <span>{getRomanNumeral(i + 1)}</span>,
    })),
  ];

  const progress = Math.round((step / totalSteps) * 100);

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, [step]);

  const goToStep = (targetStep) => {
    if (targetStep > 1 && !completedSteps.includes(targetStep - 1)) {
      return;
    }
    setStep(targetStep);
    setIsMobileNavOpen(false);
  };

  const skipToEnd = () => setStep(totalSteps);
  const backToBeginning = () => setStep(1);

  const handlePathwayCompletion = (pathwayStep) => {
    setCompletedSteps((prev) => {
      const updatedSteps = [...new Set([...prev, pathwayStep])];
      updateProjectProgress();
      setStep(pathwayStep + 1);
      setProjectionTrigger((prev) => prev + 1); // Increment to trigger re-render
      return updatedSteps;
    });
  };

  const renderPathwayComponent = () => {
    const pathwayProps = {
      onNext: () => handlePathwayCompletion(step),
      onBack: () => goToStep(step - 1),
      projectId,
    };

    switch (step) {
      case 3:
        return <Pathway1 {...pathwayProps} />;
      case 4:
        return <Pathway2 {...pathwayProps} />;
      case 5:
        return <Pathway3 {...pathwayProps} />;
      case 6:
        return <Pathway4 {...pathwayProps} />;
      case 7:
        return <Pathway5 {...pathwayProps} />;
      case 8:
        return <Pathway6 {...pathwayProps} />;
      case 9:
        return <Pathway7 {...pathwayProps} />;
      case 10:
        return <Pathway8 {...pathwayProps} />;
      case 11:
        return <Pathway9 {...pathwayProps} />;
      case 12:
        return <Pathway10 {...pathwayProps} />;
      default:
        return null;
    }
  };


  return (
  <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
    {/* Mobile Header with Navigation Toggle */}
    <div className="md:hidden flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800">
      <h2 className="text-xl font-bold">{projectName || 'Navigation'}</h2>
      <button 
        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} 
        className="text-2xl"
      >
        {isMobileNavOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>

    {/* Mobile Navigation Sidebar */}
    {isMobileNavOpen && (
      <div className="fixed md:hidden inset-0 z-50 bg-white dark:bg-gray-900 overflow-y-auto">
        <div className="p-4 space-y-2">
          <button 
            onClick={() => setIsMobileNavOpen(false)} 
            className="text-2xl absolute top-4 right-4"
          >
            <FaTimes />
          </button>

          <h2 className="text-2xl font-bold mb-4 mt-8">Sections</h2>
          {sectionNames.map((section, index) => (
            <button
              key={index}
              onClick={() => goToStep(index + 1)}
              className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-300 ${
                step === index + 1
                  ? 'bg-red-500 text-white'
                  : completedSteps.includes(index + 1) || index + 1 < step
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              disabled={!completedSteps.includes(index) && index + 1 > step}
            >
              {section.name}
            </button>
          ))}

          <div className="flex space-x-2 mt-4">
            <button
              onClick={backToBeginning}
              className="flex items-center justify-center w-1/2 py-2 px-4 rounded-md bg-blue-500 text-white text-sm"
            >
              {/* <FaAngleDoubleLeft className="mr-2" /> */}
              Beginning
            </button>
            <button
              onClick={skipToEnd}
              className={`w-1/2 py-2 px-4 rounded-md ${
                completedSteps.includes(9)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } text-sm`}
              disabled={!completedSteps.includes(9)}
            >
              End
              {/* <FaAngleDoubleRight className="ml-2" /> */}
            </button>
          </div>

          <Link
            to="/dashboard"
            className="block text-center w-full py-2 px-4 mt-4 rounded-md bg-red-500 text-white text-sm"
          >
            Save & Exit
          </Link>
        </div>
      </div>
    )}

    {/* Desktop Navigation */}
    <div className="hidden md:block w-64 bg-gray-200 dark:bg-gray-800 fixed h-screen overflow-y-auto">
      <div className="p-6 flex flex-col items-start space-y-4 h-full">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {projectName || 'Navigation'}
        </h2>

        {sectionNames.map((section, index) => (
          <button
            key={index}
            onClick={() => goToStep(index + 1)}
            className={`relative w-full text-left py-1 px-4 rounded-md transition-colors duration-300 ${
              step === index + 1
                ? 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg'
                : completedSteps.includes(index + 1) || index + 1 < step
                ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                : 'text-gray-400 cursor-not-allowed'
            }`}
            disabled={!completedSteps.includes(index) && index + 1 > step}
          >
            {section.name}
          </button>
        ))}

        <div className="flex space-x-2 w-full">
          <button
            onClick={backToBeginning}
            className="flex items-center justify-center w-1/2 py-2 px-4 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 transition-colors duration-300 shadow-md text-sm"
          >
            {/* <FaAngleDoubleLeft className="mr-2" /> */}
            Beginning
          </button>
          <div className="relative group w-1/2">
            <button
              onClick={skipToEnd}
              className={`flex items-center justify-center w-full py-2 px-4 rounded-md ${
                completedSteps.includes(9)
                  ? 'bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } transition-colors duration-300 shadow-md text-sm`}
              disabled={!completedSteps.includes(9)}
            >
              End
              {/* <FaAngleDoubleRight className="ml-2" /> */}
            </button>
          </div>
        </div>

        <Link
          to="/dashboard"
          className="flex items-center justify-center w-full py-2 px-4 rounded-md bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 transition-colors duration-300 shadow-md text-sm mt-2"
        >
          Save & Exit
        </Link>
      </div>
    </div>

    {/* Main Content Area */}
    <div className="flex-grow md:ml-64 p-4 md:p-6">
      <ProgressBar progress={progress} />

      <div className="overflow-x-auto mb-4 px-2 md:px-6 mt-4">
        <div className="flex space-x-2 md:space-x-6 justify-center pb-4">
          {sectionNames.map((section, index) => (
            <div
              key={index}
              className={`flex items-center justify-center w-8 h-8 md:w-12 md:h-12 mt-4 rounded-full cursor-pointer transition-all duration-300 ease-in-out transform ${
                step === index + 1
                  ? 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg scale-105'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-300'
              }`}
              onClick={() => goToStep(index + 1)}
            >
              <span className="text-xs md:text-lg font-bold">{index < 2 ? section.icon : section.icon}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4 mb-4">
        <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-red-500 to-red-700 text-white text-sm md:text-lg font-bold">
          {step <= 2 ? sectionNames[step - 1].icon : sectionNames[step - 1].icon}
        </div>
        <h2 className="text-xl md:text-2xl font-bold">{sectionNames[step - 1].name}</h2>
      </div>

      {step === 1 && <RespondentDetails onNext={() => handlePathwayCompletion(step)} projectId={projectId} />}
      {step === 2 && (
        <ProjectInformation 
          onNext={() => handlePathwayCompletion(step)} 
          onBack={() => goToStep(step - 1)} 
          projectId={projectId} 
        />
      )}
      {step > 2 && step <= totalSteps && renderPathwayComponent()}

      {/* Button to Toggle PathwayProjections */}
        {completedSteps.includes(3) && (
          <div className="mt-4">
            <button
              onClick={() => setShowProjections(!showProjections)}
              className="w-full py-2 px-4 rounded-md bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 transition-colors duration-300 shadow-md text-sm"
            >
              {showProjections ? 'Hide Pathway Projections' : 'Show Pathway Projections'}
            </button>
          </div>
        )}

      {/* Render PathwayProjections */}
      {showProjections && <PathwayProjections projectId={projectId} trigger={projectionTrigger} />}
    </div>
  </div>
);
};

export default ApplicationForm;