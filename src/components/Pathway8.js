import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import './PathwayStyles.css'; // Import custom styles

const Question = ({ question, questionId, onAnswerChange, answer, observation, placeholder }) => {
  return (
    <div className="mb-6 sm:mb-8">
      <p className="text-base sm:text-lg font-semibold mb-2">{question}</p>

      <div className="flex flex-wrap gap-2 sm:space-x-4 mb-2">
        {/* {["Planned", "Ongoing", "Completed", "Not in Focus", "Not Applicable"].map((option) => ( */}
        {["Planned", "Ongoing", "Completed", "Not in Focus"].map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="radio"
              name={questionId}
              value={option}
              checked={answer === option}
              onChange={(e) => onAnswerChange(questionId, e.target.value, 'answer')}
              className="mr-1 sm:mr-2 custom-radio"
              required
            />
            <span className="text-sm sm:text-base">{option}</span>
          </label>
        ))}
      </div>

      <textarea
        placeholder={placeholder}
        value={observation || ''}
        className="w-full p-2 border rounded-md text-sm sm:text-base text-gray-700 dark:bg-gray-800 dark:text-gray-200 mt-2"
        rows="3"
        onChange={(e) => onAnswerChange(questionId, e.target.value, 'observation')}
      ></textarea>
    </div>
  );
};

const Pathway8 = ({ onNext, onBack, projectId }) => {
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const isAllQuestionsAnswered = () => {
    return answers?.Q8_1?.answer !== undefined && answers?.Q8_2?.answer !== undefined;
  };

  useEffect(() => {
    const fetchPathwayData = async () => {
      if (!projectId) {
        console.error('No projectId provided');
        return;
      }

      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const projects = userData.projects || [];
          const project = projects.find((proj) => proj.id === projectId);

          if (project && project.sections?.Pathway8) {
            setAnswers(project.sections.Pathway8);
          }
        }
      } catch (error) {
        console.error('Error fetching Pathway8 data:', error);
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
                    Pathway8: updatedAnswers,
                  },
                }
              : project
          );

          await updateDoc(userDocRef, { projects: updatedProjects });
        }
      } catch (error) {
        console.error('Error updating Pathway8 answers:', error);
      }
    }
  };

  if (isLoading) {
    return <p className="text-center text-sm sm:text-base">Loading...</p>;
  }

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-md">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Pathway-8: Policy & Governance</h1>
        <p className="mb-6 sm:mb-8 text-lg sm:text-xl text-gray-700 dark:text-gray-300 p-6 rounded-xl bg-gray-200 dark:bg-gray-800 leading-relaxed tracking-wide shadow-[inset_6px_6px_12px_#c2c2c2,inset_-6px_-6px_12px_#ffffff] dark:shadow-[inset_6px_6px_12px_#404040,inset_-6px_-6px_12px_#606060] font-serif font-bold">
        <span className="text-red-500 italic">Def.</span> If appropriate policy and governance, taking these agroecological principles and food systems dimensions into account, is ensured, then the chances for agroecological transformation of food systems to become a success are much higher than without such a favourable political environment.
      </p>

      {/* Questions for Pathway 8 */}
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-1: Policy and Governance</h2>
      <Question
        question="Q-8.1) Does the project actively focus on governance aspects of natural resources within the landscape?"
        questionId="Q8_1"
        answer={answers?.Q8_1?.answer}
        observation={answers?.Q8_1?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-8.1"
      />

      <Question
        question="Q-8.2) Does the project actively focus on governance aspects related to equity and justice for producers and other stakeholders in the food system?"
        questionId="Q8_2"
        answer={answers?.Q8_2?.answer}
        observation={answers?.Q8_2?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-8.2"
      />

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-6">
        <button
          type="button"
          onClick={onBack}
          className="w-full py-2 sm:py-3 px-4 rounded-md bg-gray-400 text-white hover:bg-gray-500 transition-colors duration-300 text-sm sm:text-base"
        >
          Back
        </button>
        <button
          type="submit"
          onClick={onNext}
          className={`w-full py-2 sm:py-3 px-4 rounded-md text-white transition-colors duration-300 text-sm sm:text-base ${
            isAllQuestionsAnswered()
              ? 'bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          disabled={!isAllQuestionsAnswered()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pathway8;