import React, { useState, useEffect } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaUser, FaInfoCircle } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation for routing
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

const ApplicationForm = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 12;

  // Retrieve projectId from the navigation state
  const location = useLocation();
  const { projectId } = location.state || {};

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProjects(userData.projects || []);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

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
                progress: Math.round((step / totalSteps) * 100), // Update progress
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
    return romanNumerals[number - 1];
  };

  const sectionNames = [
    { name: 'Respondent Details', icon: <FaUser /> },
    { name: 'Project Information', icon: <FaInfoCircle /> },
    ...Array.from({ length: 10 }, (_, i) => ({
      name: `Pathway ${i + 1}`,
      icon: getRomanNumeral(i + 1),
    })),
  ];

  const progress = Math.round((step / totalSteps) * 100);

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, []);

  const goToStep = (targetStep) => setStep(targetStep);
  const skipToEnd = () => setStep(totalSteps);
  const backToBeginning = () => setStep(1);

  const renderPathwayComponent = () => {
    switch (step) {
      case 3:
        return <Pathway1 onNext={handleNext} onBack={() => goToStep(step - 1)} projectId={projectId} />;
      case 4:
        return <Pathway2 onNext={handleNext} onBack={() => goToStep(step - 1)} projectId={projectId} />;
      case 5:
        return <Pathway3 onNext={handleNext} onBack={() => goToStep(step - 1)} projectId={projectId} />;
      case 6:
        return <Pathway4 onNext={handleNext} onBack={() => goToStep(step - 1)} projectId={projectId} />;
      case 7:
        return <Pathway5 onNext={handleNext} onBack={() => goToStep(step - 1)} projectId={projectId} />;
      case 8:
        return <Pathway6 onNext={handleNext} onBack={() => goToStep(step - 1)} projectId={projectId} />;
      case 9:
        return <Pathway7 onNext={handleNext} onBack={() => goToStep(step - 1)} projectId={projectId} />;
      case 10:
        return <Pathway8 onNext={handleNext} onBack={() => goToStep(step - 1)} projectId={projectId} />;
      case 11:
        return <Pathway9 onNext={handleNext} onBack={() => goToStep(step - 1)} projectId={projectId} />;
      case 12:
        return <Pathway10 onNext={handleNext} onBack={() => goToStep(step - 1)} projectId={projectId} />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    updateProjectProgress();
    goToStep(step + 1);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-gray-200 dark:bg-gray-800 fixed h-screen">
        <div className="p-6 flex flex-col items-start space-y-4 h-full overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Navigation</h2>

          {/* Navigation Links */}
          {sectionNames.map((section, index) => (
            <button
              key={index}
              onClick={() => goToStep(index + 1)}
              className={`w-full text-left py-1 px-4 rounded-md transition-colors duration-300 ${
                step === index + 1
                  ? 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {section.name}
            </button>
          ))}
          
          {/* Additional Actions */}
          <div className="mt-auto flex flex-col space-y-2 w-full">
            {/* <div className="flex space-x-2 w-full">
              <button
                onClick={backToBeginning}
                className="flex items-center justify-center w-1/2 py-2 px-4 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 transition-colors duration-300 shadow-md text-sm"
              >
                <FaAngleDoubleLeft className="mr-2 text-xs" />
                <span className="text-xs">Beginning</span>
              </button>
              <button
                onClick={skipToEnd}
                className="flex items-center justify-center w-1/2 py-2 px-4 rounded-md bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800 transition-colors duration-300 shadow-md text-sm"
              >
                <span className="text-xs">End</span>
                <FaAngleDoubleRight className="ml-2 text-xs" />
              </button>
            </div> */}
            <Link
              to="/dashboard"
              className="flex items-center justify-center w-full py-2 px-4 rounded-md bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 transition-colors duration-300 shadow-md text-sm mt-2"
            >
              Save & Exit
            </Link>
          </div>
          
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow ml-64 p-6">
        {/* Progress Bar */}
        <ProgressBar progress={progress} />

        {/* Horizontal Scrollable Logo List */}
        <div className="overflow-x-auto mb-6 px-6 mt-4">
          <div className="flex space-x-6 justify-center pb-4">
            {sectionNames.map((section, index) => (
              <div
                key={index}
                className={`flex items-center justify-center w-12 h-12 mt-4 rounded-full cursor-pointer transition-all duration-300 ease-in-out transform ${
                  step === index + 1
                    ? 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg scale-105'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-300'
                }`}
                onClick={() => goToStep(index + 1)}
              >
                <span className="text-lg font-bold">
                  {index < 2 ? section.icon : section.icon} {/* Display icons or Roman numerals */}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section Heading */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-700 text-white text-lg font-bold">
            {step <= 2 ? sectionNames[step - 1].icon : sectionNames[step - 1].icon}
          </div>
          <h2 className="text-2xl font-bold">{sectionNames[step - 1].name}</h2>
        </div>

        {/* Render form sections based on step */}
        {step === 1 && <RespondentDetails onNext={handleNext} projectId={projectId} />}
        {step === 2 && (
          <ProjectInformation onNext={handleNext} onBack={() => goToStep(step - 1)} projectId={projectId} />
        )}
        {step > 2 && step <= totalSteps && renderPathwayComponent()}
      </div>
    </div>
  );
};

export default ApplicationForm;