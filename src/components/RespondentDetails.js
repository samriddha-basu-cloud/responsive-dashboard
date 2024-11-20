import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Firestore imports
import { db, auth } from '../firebase'; // Firebase configuration

const RespondentDetails = ({ onNext, projectId }) => {
  const [details, setDetails] = useState({
    name: '',
    designation: '',
    email: '',
    phone: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!projectId) {
        console.error('No projectId provided.');
        return;
      }

      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const projects = userData.projects || [];

          const project = projects.find((proj) => proj.id === projectId);
          if (project) {
            if (project.sections?.RespondentDetails) {
              setDetails({
                name: project.sections.RespondentDetails.name || '',
                designation: project.sections.RespondentDetails.designation || '',
                email: project.sections.RespondentDetails.email || '',
                phone: project.sections.RespondentDetails.phone || '',
              });
            } else {
              console.log('No RespondentDetails section found for this project.');
            }
          } else {
            console.error('Project with matching projectId not found.');
          }
        } else {
          console.error('User document does not exist.');
        }
      } catch (error) {
        console.error('Error fetching respondent details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [projectId]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    const updatedDetails = { ...details, [name]: value };
    setDetails(updatedDetails);

    if (projectId) {
      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const updatedProjects = userData.projects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  sections: {
                    ...project.sections,
                    RespondentDetails: updatedDetails,
                  },
                }
              : project
          );

          await updateDoc(userDocRef, { projects: updatedProjects });
          console.log('Updated RespondentDetails:', updatedDetails);
        }
      } catch (error) {
        console.error('Error updating respondent details:', error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!details.name || !details.designation || !details.email) {
      alert('Please fill in all required fields.');
      return;
    }
    onNext(); // Proceed to the next step
  };

  if (isLoading) {
    return <p className="text-center text-sm sm:text-base">Loading...</p>;
  }

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Respondent's Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200 mb-2">
            Name of the Primary Respondent <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={details.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full p-3 border rounded-md text-gray-900 dark:bg-gray-800 dark:text-gray-100"
            required
          />
          <p className="text-xs bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 mt-1">
            This field is required
          </p>
        </div>

        {/* Designation */}
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200 mb-2">
            Designation of the Primary Respondent <span className="text-red-500">*</span>
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

        {/* Email */}
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200 mb-2">
            Email Address of the Primary Respondent <span className="text-red-500">*</span>
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

        {/* Phone Number */}
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200 mb-2">
           Phone number of primary respondent (Not mandatory)
          </label>
          <input
            type="tel"
            name="phone"
            value={details.phone}
            onChange={handleChange}
            placeholder="(+Country Code) (Region Code) Phone Number"
            className="w-full p-3 border rounded-md text-gray-900 dark:bg-gray-800 dark:text-gray-100"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Include the country and region code, e.g., <em>(+Country Code) (Region Code) Phone Number</em>.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 rounded-md bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 transition-colors duration-300"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default RespondentDetails;