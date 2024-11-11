// ProjectInformation.js
import React, { useState } from 'react';

const ProjectInformation = ({ onNext, onBack }) => {
  const [info, setInfo] = useState({
    projectName: '',
    locations: '',
    objectives: '',
    bmzCoreAreas: [],
    startDate: '',
    endDate: '',
    plannedBeneficiaries: '',
    coveredBeneficiaries: '',
  });

  const bmzCoreAreasOptions = [
    'PEACEFUL AND INCLUSIVE SOCIETIES (Good governance; Peacebuilding and conflict prevention; Displacement and migration)',
    'LIFE WITHOUT HUNGER - TRANSFORMING FOOD SYSTEMS (Food and nutrition security; Rural development; Agriculture)',
    'SUSTAINABLE ECONOMIC DEVELOPMENT, TRAINING AND EMPLOYMENT (Technical and vocational education and training; Private sector and financial sector development; Socially and environmentally responsible supply chains, trade and sustainable infrastructure)',
    'HEALTH, SOCIAL PROTECTION AND POPULATION POLICY (Health, pandemic response and the One Health approach; Social protection; Population policy, sexual and reproductive health and rights)',
    'PROTECTING THE NATURAL FOUNDATIONS OF LIFE ON EARTH (Biodiversity; Forest conservation; Water)',
    'CLIMATE AND ENERGY, JUST TRANSITION (Climate change mitigation and adaptation; Renewable energy and energy efficiency; Sustainable urban development)',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleBMZCoreAreaChange = (e) => {
    const { value, checked } = e.target;
    setInfo((prevState) => ({
      ...prevState,
      bmzCoreAreas: checked
        ? [...prevState.bmzCoreAreas, value]
        : prevState.bmzCoreAreas.filter((area) => area !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation for required fields
    if (!info.projectName || !info.locations || !info.objectives || !info.startDate || !info.endDate || !info.plannedBeneficiaries || !info.coveredBeneficiaries) {
      alert("Please fill in all required fields.");
      return;
    }
    onNext();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Basic Information of the Project</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name of Project */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
            Name of Project <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="projectName"
            value={info.projectName}
            onChange={handleChange}
            placeholder="Please enter full name of the project without abbreviations"
            className="w-full p-3 border rounded-md text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
          />
          <p className="text-xs bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 mt-1">
            This field is required
          </p>
        </div>

        {/* Locations covered under the project */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
            Locations covered under the project <span className="text-red-500">*</span>
          </label>
          <textarea
            name="locations"
            value={info.locations}
            onChange={handleChange}
            placeholder="e.g., Country-1 (Region-1, Region-2,...); Country-2 (Region-1, Region-2,...);"
            className="w-full p-3 border rounded-md text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            rows="3"
            required
          />
          <p className="text-xs bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 mt-1">
            This field is required
          </p>
        </div>

        {/* Objectives of the project */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
            Objectives of the project <span className="text-red-500">*</span>
          </label>
          <textarea
            name="objectives"
            value={info.objectives}
            onChange={handleChange}
            placeholder="e.g., 1) Objective-1; 2) Objective-2;..."
            className="w-full p-3 border rounded-md text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            rows="4"
            required
          />
          <p className="text-xs bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 mt-1">
            This field is required
          </p>
        </div>

        {/* BMZ Core Areas */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
            Which of the following 'BMZ core areas 2030' does the project address directly through its interventions? <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Please select all relevant options based on DIRECT contribution through the project's activities.</p>
          <div className="space-y-2">
            {bmzCoreAreasOptions.map((option, index) => (
              <div key={index} className="flex items-start">
                <input
                  type="checkbox"
                  id={`bmz-core-area-${index}`}
                  value={option}
                  checked={info.bmzCoreAreas.includes(option)}
                  onChange={handleBMZCoreAreaChange}
                  className="mr-2"
                />
                <label htmlFor={`bmz-core-area-${index}`} className="text-gray-700 dark:text-gray-200">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Project Start Date */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
            When did the project start? <span className="text-red-500">*</span>
          </label>
          <input
            type="month"
            name="startDate"
            value={info.startDate}
            onChange={handleChange}
            className="w-full p-3 border rounded-md text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
          />
          <p className="text-xs bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 mt-1">
            This field is required
          </p>
        </div>

        {/* Project End Date */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
            When was the project completed? <span className="text-red-500">*</span>
          </label>
          <input
            type="month"
            name="endDate"
            value={info.endDate}
            onChange={handleChange}
            className="w-full p-3 border rounded-md text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
          />
          <p className="text-xs bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 mt-1">
            This field is required
          </p>
        </div>

        {/* Planned Beneficiaries */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
            Total number of primary beneficiaries the project plans or planned to cover <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="plannedBeneficiaries"
            value={info.plannedBeneficiaries}
            onChange={handleChange}
            placeholder="Please mention in numerals"
            className="w-full p-3 border rounded-md text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
          />
          <p className="text-xs bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 mt-1">
            This field is required
          </p>
        </div>

        {/* Covered Beneficiaries */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
            Total number of primary beneficiaries the project has covered till 30 April 2024 <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="coveredBeneficiaries"
            value={info.coveredBeneficiaries}
            onChange={handleChange}
            placeholder="Please mention in numerals"
            className="w-full p-3 border rounded-md text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
          />
          <p className="text-xs bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 mt-1">
            This field is required
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="w-full py-3 px-4 rounded-md bg-gray-400 text-white hover:bg-gray-500 transition-colors duration-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-md bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 transition-colors duration-300"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectInformation;