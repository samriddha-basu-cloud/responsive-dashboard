import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import './PathwayStyles.css'; // Import custom styles

const Question = ({ question, questionId, onAnswerChange, answer, observation, placeholder }) => {
  return (
    <div className="mb-8">
      <p className="text-lg font-semibold mb-2">{question}</p>

      <div className="flex space-x-4 mb-2">
        {["Planned", "Ongoing", "Completed", "Not in Focus", "Not Applicable"].map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="radio"
              name={questionId}
              value={option}
              checked={answer === option}
              onChange={(e) => onAnswerChange(questionId, e.target.value, 'answer')}
              className="mr-2 custom-radio"
              required
            />
            {option}
          </label>
        ))}
      </div>

      <textarea
        placeholder={placeholder}
        value={observation || ''}
        className="w-full p-2 border rounded-md text-gray-700 dark:bg-gray-800 dark:text-gray-200 mt-2"
        rows="4"
        onChange={(e) => onAnswerChange(questionId, e.target.value, 'observation')}
      ></textarea>
    </div>
  );
};

const Pathway4 = ({ onNext, onBack, projectId }) => {
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPathwayData = async () => {
      if (!projectId) {
        console.log('No projectId provided');
        return;
      }

      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const projects = userData.projects || [];
          const project = projects.find((proj) => proj.id === projectId);

          if (project && project.sections?.Pathway4) {
            setAnswers(project.sections.Pathway4);
          }
        }
      } catch (error) {
        console.error('Error fetching Pathway4 data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPathwayData();
  }, [projectId]);

  const handleAnswerChange = async (questionId, value, type) => {
    const updatedAnswers = {
      ...answers,
      [questionId]: {
        ...answers[questionId],
        [type]: value,
      },
    };

    setAnswers(updatedAnswers);

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
                    Pathway4: updatedAnswers,
                  },
                }
              : project
          );

          await updateDoc(userDocRef, { projects: updatedProjects });
        }
      } catch (error) {
        console.error('Error updating Pathway4 answers:', error);
      }
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Pathway-4: Economic Gains</h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        If these changes in the food supply chain can be realized, then farmers and other business actors can save on external inputs and realize economic gains that can be invested in further improvements in agroecology and improved diets or other elements of the food system.
      </p>

      {/* Questions for Pathway 4 */}
      <h2 className="text-xl font-bold mb-4">Principle-1: Economic Gains</h2>
      <Question
        question="Q-4.1) Does the project actively focus on enhancing the incomes of producers and other participants in the food systems?"
        questionId="Q4_1"
        answer={answers?.Q4_1?.answer}
        observation={answers?.Q4_1?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-4.1"
      />

      <Question
        question="Q-4.2) Does the project actively focus on investing the monetary gains from the development of the food system for further development of healthy foods and the production systems?"
        questionId="Q4_2"
        answer={answers?.Q4_2?.answer}
        observation={answers?.Q4_2?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-4.2"
      />

      {/* Navigation Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          type="button"
          onClick={onBack}
          className="w-full py-3 px-4 rounded-md bg-gray-400 text-white hover:bg-gray-500 transition-colors duration-300"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="w-full py-3 px-4 rounded-md bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 transition-colors duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pathway4;