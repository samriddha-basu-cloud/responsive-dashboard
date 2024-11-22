import React, { useState } from 'react';

const TourGuideOverlayMobile = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 'navigation-save-exit',
      description: 'Access navigation and save your progress via the hamburger menu in the top-right corner.',
      style: 'absolute top-5 right-5',
    },
    {
      id: 'progress-bar',
      description: 'The progress bar at the top shows your completion status.',
      style: 'absolute top-32 left-16',
    },
    {
      id: 'middle-area',
      description: 'Fill out the questionnaire here in the middle area.',
      style: 'absolute top-80 left-16',
    },
    {
      id: 'pathway-projection',
      description: 'View projections and insights in the bottom-right corner.',
      style: 'absolute bottom-5 right-5',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
  <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex flex-col items-center justify-center">
    {steps.map((step, index) => (
      <div
        key={index}
        className={`transition-opacity duration-500 ease-in-out ${
          currentStep === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } ${step.style}`}
      >
        <div className="bg-white dark:bg-gray-800 text-black dark:text-gray-200 p-6 rounded-lg shadow-xl w-4/5 max-w-sm">
          <p className="text-sm font-semibold">{step.description}</p>
          <div className="flex justify-between mt-6">
            <button
              className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
              onClick={handleSkip}
            >
              Skip
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
              onClick={handleNext}
            >
              {currentStep < steps.length - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        </div>
      </div>
    ))}

    <div className="absolute bottom-4 text-center text-white dark:text-gray-200">
      <p className="text-sm">
        Step {currentStep + 1} of {steps.length}
      </p>
    </div>
  </div>
);
};

export default TourGuideOverlayMobile;