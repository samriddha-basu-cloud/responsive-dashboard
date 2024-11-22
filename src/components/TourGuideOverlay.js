import React, { useState } from 'react';

const TourGuideOverlay = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 'navigation',
      description: 'This is the navigation menu to switch between sections.',
      style: 'absolute top-1/2 left-5 transform -translate-y-1/2',
    },
    {
      id: 'save-and-exit',
      description: 'Use this to save your progress and exit the form.',
      style: 'absolute bottom-5 left-5',
    },
    {
      id: 'progress-bar',
      description: 'The progress bar shows your current completion status.',
      style: 'absolute top-5 left-1/2 transform -translate-x-1/2',
    },
    {
      id: 'middle-area',
      description: 'Here you will fill out the questionnaire for each step.',
      style: 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
    },
    {
      id: 'pathway-projection',
      description: 'Pathway projections provide insights into your responses.',
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
            <p className="text-lg font-semibold">{step.description}</p>
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
        <p>
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>
    </div>
  );
};

export default TourGuideOverlay;