import React, { useState } from 'react';
import { 
  FaArrowRight, 
  FaArrowLeft, 
  FaTimes, 
  FaQuestionCircle 
} from 'react-icons/fa';

const TourGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const tourSteps = [
    {
      title: 'Navigation Setup',
      description: 'Use the sidebar to navigate through different sections of the application. Completed sections are clickable, and the current section is highlighted.',
      selector: '.navigation-sidebar'
    },
    {
      title: 'Save and Exit',
      description: 'At any point, you can save your progress and return to the dashboard using the "Save & Exit" button at the bottom of the navigation.',
      selector: '.save-and-exit-button'
    },
    {
      title: 'Progress Bar',
      description: 'Track your overall progress through the application with this visual indicator at the top of the main content area.',
      selector: '.progress-bar'
    },
    {
      title: 'Questionnaire Area',
      description: 'Each section requires you to fill out specific information. Complete each section to unlock the next one.',
      selector: '.questionnaire-area'
    },
    {
      title: 'Pathway Projections',
      description: 'After moving on from the first pathway, you can view pathway projections to get insights into your project\'s potential outcomes.',
      selector: '.projections-toggle'
    }
  ];

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const startTour = () => {
    setIsOpen(true);
    setCurrentStep(0);
  };

  const closeTour = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={startTour}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
      >
        <FaQuestionCircle className="text-2xl" />
      </button>
    );
  }

  const currentTourStep = tourSteps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full relative shadow-xl">
        <button 
          onClick={closeTour} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <FaTimes className="text-2xl" />
        </button>
        
        <h2 className="text-2xl font-bold mb-4">{currentTourStep.title}</h2>
        <p className="mb-6">{currentTourStep.description}</p>
        
        <div className="flex justify-between">
          <button 
            onClick={prevStep} 
            disabled={currentStep === 0}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            <FaArrowLeft />
          </button>
          
          <div className="flex space-x-2">
            {tourSteps.map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <button 
            onClick={nextStep} 
            disabled={currentStep === tourSteps.length - 1}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourGuide;