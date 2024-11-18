import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

// Predefined questions for Pathway-1
const PREDEFINED_PATHWAY_QUESTIONS = {
  Q1_1: {
    question: "Q-1.1) Has the project considered closure (as far as possible) of nutrients and biomass resource cycles?",
    questionId: "Q1_1"
  },
  Q1_2: {
    question: "Q-1.2) Does the project actively focus on reducing use of external (originating outside the farm) inputs in agriculture and allied (animal husbandry, pisciculture, agroforestry etc.) activities at the farm level?",
    questionId: "Q1_2"
  },
  Q1_3: {
    question: "Q-1.3) Does the project actively focus on enhancing soil health?",
    questionId: "Q1_3"
  },
  Q1_4: {
    question:"Q-1.4) Has the project focused on actively bettering animal health and ensuring their welfare?",
    questionId:"Q1_4"
  },
  Q1_5: {
    question: "Q-1.5) Has the project focussed on actively enhancing or maintaining biodiversity at the farm or landscape level?",
    questionId: "Q1_5"
  },
  Q1_6: {
    question: "Q-1.6) Has the project actively focussed on connecting primary producers to local sources of sustainable farm inputs like vermicompost, animal manure, plant extracts etc.?",
    questionId: "Q1_6"
  },
  Q1_7: {
    question: "Q-1.7) Does the project actively focus on promoting principles of fairness at farm level?",
    questionId: "Q1_7"
  },
  Q1_8: {
    question: "Q-1.8)Does the project actively focus on improving the landscape and farm ecosystems through sustainable production practices?",
    questionId: "Q1_8"
  },
  Q1_9: {
    question: "Q-1.9) Does the project actively focus on sustenance of local agrobiodiversity contributing to traditional food systems?",
    questionId: "Q1_9"
  },
  Q1_10: {
    question: "Q-1.10) Does the project actively focus on promoting climate-smart, nutrition-sensitive production approaches?",
    questionId: "Q1_10"
  },
  Q1_11: {
    question: "Q-1.11) Does the project actively focus on ensuring adequate availability of food throughout the year among producer households?",
    questionId: "Q1_11"
  },
  Q1_12: {
    question: "Q-1.12) Does the project actively focus on promoting better nutrition among producer households sourced from their farms production?",
    questionId: "Q1_12"
  },
  Q2_1: {
    question: "Q-2.1) Does the project actively focus on promoting integration of crops and other plants, animals, soil, water to enhance sustainability and production at farm and landscape levels?",
    questionId: "Q2_1"
  },
  Q3_1: {
    question: "Q-3.1) Does the project actively focus on measures that lead to reduction in food loss and waste in the supply chain?",
    questionId: "Q3_1"
  },
  Q3_2: {
    question: "Q-3.2) Does the project actively focus on measures that lead to lessening environmental footprint of packaging and processing activities?",
    questionId: "Q3_2"
  },
  Q3_3: {
    question: "Q-3.3) Does the project actively focus on measures that lead to reduction in food waste at farm level?",
    questionId: "Q3_3"
  },
  Q3_4: {
    question: "Q-3.4) Does the project actively focus on measures that lead to reduction in food waste at farm level?",
    questionId: "Q3_4"
  },
  Q3_5: {
    question: "Q-3.5) Does the project actively focus on measures that lead to reduction in food waste at farm level?",
    questionId: "Q3_5"
  },
  Q3_6: {
    question: "Q-3.6) Does the project actively focus on measures that lead to reduction in food waste at farm level?",
    questionId: "Q3_6"
  },
  Q3_7: {
    question: "Q-3.7) Does the project actively focus on measures that lead to reduction in food waste at farm level?",
    questionId: "Q3_7"
  },
  Q3_8: {
    question: "Q-3.8) Does the project actively focus on measures that lead to reduction in food waste at farm level?",
    questionId: "Q3_8"
  },
  Q3_9: {
    question: "Q-3.9) Does the project actively focus on measures that lead to reduction in food waste at farm level?",
    questionId: "Q3_9"
  },
  Q3_10: {
    question: "Q-3.10) Does the project actively focus on measures that lead to reduction in food waste at farm level?",
    questionId: "XXXXX"
  },
  Q3_11: {
    question: "Q-3.11) Does the project actively focus on measures that lead to reduction in food waste at farm level?",
    questionId: "XXXXX"
  },
  Q3_12: {
    question: "Q-3.12) Does the project actively focus on measures that lead to reduction in food waste at farm level?",
    questionId: "XXXXX"
  },
  Q3_13: {
    question: "Q-3.13) Does the project actively focus on measures that lead to reduction in food waste at farm level?",
    questionId: "XXXXX"
  }
};

const SurveyComponent = ({ projectId }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!projectId) {
      setError('No project ID provided');
      setIsLoading(false);
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
          // Merge predefined questions with existing data
          const mergedSections = { ...project.sections };
           for (let i = 1; i <= 10; i++) {
          const pathwayKey = `Pathway${i}`;
          mergedSections[pathwayKey] = {
            ...Object.fromEntries(
              Object.entries(PREDEFINED_PATHWAY_QUESTIONS).filter(([key]) =>
                key.startsWith(`Q${i}_`)
              )
            ),
            ...(project.sections?.[pathwayKey] || {})
          };
        }

          setData(mergedSections);
          setError(null);
        } else {
          setError('Project with matching projectId not found');
        }
      } else {
        setError('User document does not exist');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch survey data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectId]);

  const sortQuestions = (questions) => {
    // Comprehensive sorting method for questions
    return Object.keys(questions || {})
      .sort((a, b) => {
        // Split the key into parts
        const partsA = a.split('_').map(part => 
          isNaN(parseInt(part)) ? part : parseInt(part)
        );
        const partsB = b.split('_').map(part => 
          isNaN(parseInt(part)) ? part : parseInt(part)
        );

        // Compare parts sequentially
        for (let i = 0; i < Math.min(partsA.length, partsB.length); i++) {
          if (typeof partsA[i] !== typeof partsB[i]) {
            return typeof partsA[i] === 'string' ? 1 : -1;
          }
          if (partsA[i] !== partsB[i]) {
            return partsA[i] > partsB[i] ? 1 : -1;
          }
        }
        return partsA.length - partsB.length;
      });
  };

  const renderQuestionCard = (key, question) => {
    const predefinedQuestion = PREDEFINED_PATHWAY_QUESTIONS[key] || {};
    return (
      <div 
        key={key} 
        className="bg-red-50 border-l-4 border-red-600 p-4 mb-4 rounded-r-lg shadow-sm hover:bg-red-100 transition-colors duration-300"
      >
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          {predefinedQuestion.question || key.replace(/_/g, '. ')}
        </h3>
        <div className="space-y-2">
          <p className="flex">
            <span className="font-medium text-red-700 mr-2">Answer:</span>
            <span className="text-gray-800">{question?.answer || 'Not provided'}</span>
          </p>
          <p className="flex">
            <span className="font-medium text-red-700 mr-2">Observation:</span>
            <span className="text-gray-800">{question?.observation || 'No observations'}</span>
          </p>
        </div>
      </div>
    );
  };

  const renderSectionWithSortedQuestions = (sectionData, sectionTitle) => {
    const sortedQuestionKeys = sortQuestions(sectionData);
    return (
      <section className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-700 border-b-2 border-red-500 pb-3 mb-4">
          {sectionTitle}
        </h2>
        {sortedQuestionKeys.map(key => renderQuestionCard(key, sectionData[key]))}
      </section>
    );
  };

  const renderDetailSection = (sectionData, sectionTitle, fields) => (
    <section className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-red-700 border-b-2 border-red-500 pb-3 mb-4">
        {sectionTitle}
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {fields.map((field, index) => (
          <div key={index} className="space-y-1">
            <p className="font-semibold text-red-700">{field.label}</p>
            <p className="text-gray-800">
              {sectionData?.[field.key] || field.fallback}
            </p>
          </div>
        ))}
      </div>
    </section>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full text-red-600">
        <p className="text-xl font-semibold">Loading survey data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <p className="text-red-700 font-semibold">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <p className="text-red-700 font-semibold">No survey data available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 overflow-auto"
    style={{ height: '90%' }}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Respondent Details */}
        {renderDetailSection(
          data.RespondentDetails, 
          "Respondent's Details", 
          [
            { label: "Name", key: "name", fallback: "N/A" },
            { label: "Designation", key: "designation", fallback: "N/A" },
            { label: "Email", key: "email", fallback: "N/A" },
            { label: "Phone", key: "phone", fallback: "N/A" }
          ]
        )}

        {/* Project Information */}
        {renderDetailSection(
          data.ProjectInformation, 
          "Project Information", 
          [
            { label: "Project Name", key: "projectName", fallback: "N/A" },
            { label: "Locations", key: "locations", fallback: "N/A" },
            { label: "Objectives", key: "objectives", fallback: "N/A" },
            { label: "BMZ Core Areas", key: "bmzCoreAreas", fallback: "N/A" },
            { label: "Start Date", key: "startDate", fallback: "N/A" },
            { label: "End Date", key: "endDate", fallback: "N/A" },
            { label: "Planned Beneficiaries", key: "plannedBeneficiaries", fallback: "N/A" },
            { label: "Covered Beneficiaries", key: "coveredBeneficiaries", fallback: "N/A" }
          ]
        )}

        {/* Pathways */}
        {Object.keys(data)
          .filter(key => key.startsWith('Pathway'))
          .sort((a, b) => parseInt(a.replace('Pathway', ''), 10) - parseInt(b.replace('Pathway', ''), 10))
          .map(pathwayKey => 
            renderSectionWithSortedQuestions(data[pathwayKey], pathwayKey.replace(/Pathway/, 'Pathway-'))
          )}
      </div>
    </div>
  );
};

export default SurveyComponent;