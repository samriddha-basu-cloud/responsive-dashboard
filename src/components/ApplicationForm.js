import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const ApplicationForm = ({ onClose }) => {
  const { isDarkMode } = useTheme();
  const [progress, setProgress] = useState(50); // Example progress
  const [step, setStep] = useState(1);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
      }`}
    >
      <div className="w-full max-w-4xl p-6 rounded-lg shadow-lg">
        {/* Header with Close Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Happy Folks Club Form</h2>
          <button onClick={onClose} className="text-red-500">
            Close
          </button>
        </div>

        {/* Tabs for Navigation */}
        <div className="flex justify-between border-b border-gray-300 mb-4">
          <button
            className={`flex-1 py-2 ${
              step === 1 ? 'border-b-4 border-red-600' : ''
            }`}
            onClick={() => setStep(1)}
          >
            Basic Details
          </button>
          <button
            className={`flex-1 py-2 ${
              step === 2 ? 'border-b-4 border-red-600' : ''
            }`}
            onClick={() => setStep(2)}
          >
            Payment
          </button>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-4">
          <div className="w-full h-2 bg-gray-300 dark:bg-gray-600">
            <div
              className="h-2 bg-red-600"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="absolute right-0 -top-6 text-sm bg-red-600 text-white px-2 py-1 rounded">
            {progress}% Complete (mandatory fields)
          </span>
        </div>

        {/* Step 1: Basic Details Form */}
        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Details</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold">Name *</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold">Email ID *</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold">Mobile No. *</label>
                  <input
                    type="tel"
                    placeholder="Enter your mobile number"
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold">Age (in years) *</label>
                  <input
                    type="number"
                    placeholder="Enter your age"
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>

              {/* Address Section */}
              <h4 className="text-lg font-semibold">Address for Correspondence</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold">Country *</label>
                  <input
                    type="text"
                    placeholder="Country"
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                    value="India"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block font-semibold">State *</label>
                  <input
                    type="text"
                    placeholder="State"
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                    value="West Bengal"
                    readOnly
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold">District *</label>
                  <input
                    type="text"
                    placeholder="District"
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold">City *</label>
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold">Pincode *</label>
                  <input
                    type="text"
                    placeholder="Pincode"
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Save & Exit
          </button>
          <div className="space-x-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Preview
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;