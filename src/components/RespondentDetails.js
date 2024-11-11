// RespondentDetails.js
import React, { useState } from 'react';

const RespondentDetails = ({ onNext }) => {
  const [details, setDetails] = useState({
    name: '',
    designation: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!details.name || !details.designation || !details.email) {
      alert("Please fill in all required fields.");
      return;
    }
    onNext();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Respondent's Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name of the Primary Respondent */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
            Name of the primary respondent <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={details.name}
            onChange={handleChange}
            placeholder="Please enter your full name"
            className="w-full p-3 border rounded-md text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
          />
          <p className="text-xs bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 mt-1">
            This field is required
          </p>
        </div>

        {/* Designation of the Primary Respondent */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
            Designation of the primary respondent <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="designation"
            value={details.designation}
            onChange={handleChange}
            placeholder="e.g., Designation, Project Name (if applicable), City, Country"
            className="w-full p-3 border rounded-md text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            If you use multiple designations, please use the one most relevant to this project profiling survey.
            Please also mention the GIZ office and country to which this designation belongs. E.g.,
            <em> Designation, Project Name (if applicable), City, Country</em>.
          </p>
          <p className="text-xs bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 mt-1">
            This field is required
          </p>
        </div>

        {/* Email Address of the Primary Respondent */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
            Email address of the primary respondent <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={details.email}
            onChange={handleChange}
            placeholder="Please recheck to ensure correctness of the email address"
            className="w-full p-3 border rounded-md text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
          />
          <p className="text-xs bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 mt-1">
            This field is required
          </p>
        </div>

        {/* Phone Number of the Primary Respondent (Optional) */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
            Phone number of primary respondent (Not mandatory)
          </label>
          <input
            type="tel"
            name="phone"
            value={details.phone}
            onChange={handleChange}
            placeholder="e.g., (+Country code) (Region code) Phone number"
            className="w-full p-3 border rounded-md text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            You may skip this question. Please mention country code (ISD) and region code before the phone number. E.g., <em>(+Country code) (Region code) Phone number</em>.
          </p>
        </div>

        {/* Next Button */}
        <button
          type="submit"
          className="mt-6 w-full py-3 px-4 rounded-md bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 transition-colors duration-300"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default RespondentDetails;