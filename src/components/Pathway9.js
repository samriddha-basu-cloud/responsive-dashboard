import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import './PathwayStyles.css'; // Import custom styles

const Question = ({
  question,
  questionId,
  onAnswerChange,
  answer,
  observation,
  placeholder,
  isMultiple = false,
  options = [],
}) => {
  return (
    <div className="mb-6 sm:mb-8">
      <p className="text-base sm:text-lg font-semibold mb-2">{question}</p>

      {isMultiple ? (
        <div className="flex flex-col space-y-2 mb-2">
          {options.map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                name={`${questionId}_${option}`}
                value={option}
                checked={answer?.includes(option) || false}
                onChange={(e) => {
                  const value = e.target.value;
                  const updatedAnswer = e.target.checked
                    ? [...(answer || []), value]
                    : (answer || []).filter((item) => item !== value);
                  onAnswerChange(questionId, updatedAnswer, 'answer');
                }}
                className="mr-2 custom-checkbox"
              />
              {option}
            </label>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 sm:space-x-4 mb-2">
          {["Planned", "Ongoing", "Completed", "Not in Focus", "Not Applicable"].map((option) => (
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
      )}

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

const Pathway9 = ({ onNext, onBack, projectId }) => {
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const isAllQuestionsAnswered = () => {
    return answers?.Q9_1?.answer !== undefined && answers?.Q9_2?.answer !== undefined && answers?.Q9_3?.answer !== undefined && answers?.Q9_4?.answer !== undefined && answers?.Q9_5?.answer !== undefined && answers?.Q9_6?.answer !== undefined;
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

          if (project && project.sections?.Pathway9) {
            setAnswers(project.sections.Pathway9);
          }
        }
      } catch (error) {
        console.error('Error fetching Pathway9 data:', error);
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
                    Pathway9: updatedAnswers,
                  },
                }
              : project
          );

          await updateDoc(userDocRef, { projects: updatedProjects });
        }
      } catch (error) {
        console.error('Error updating Pathway9 answers:', error);
      }
    }
  };

  if (isLoading) {
    return <p className="text-center text-sm sm:text-base">Loading...</p>;
  }

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-md">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Pathway-9: Support Systems – Agroecology Adoption
      </h1>
      <p className="mb-4 sm:mb-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        If other systems supporting food production/the food supply chains, such as economic systems (including
        agriculture and agribusiness) and energy systems, also apply the 13 principles of agroecology, then the
        transformative effects on food systems will be even stronger.
      </p>

      {/* Questions for Pathway 9 */}
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
        Principle-1: Systems Supporting Food Production/Food Supply Chains
      </h2>
      <Question
        question="Q-9.1) Ecosystem support"
        questionId="Q9_1"
        answer={answers?.Q9_1?.answer}
        observation={answers?.Q9_1?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-9.1"
      />

      <Question
        question="Q-9.2) Economic system support: agriculture"
        questionId="Q9_2"
        answer={answers?.Q9_2?.answer}
        observation={answers?.Q9_2?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-9.2"
      />

      <Question
        question="Q-9.3) Economic system support: agribusiness"
        questionId="Q9_3"
        answer={answers?.Q9_3?.answer}
        observation={answers?.Q9_3?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-9.3"
      />

      <Question
        question="Q-9.4) Energy system support"
        questionId="Q9_4"
        answer={answers?.Q9_4?.answer}
        observation={answers?.Q9_4?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-9.4"
      />

      <Question
        question="Q-9.5) Others (if relevant): human system, health system"
        questionId="Q9_5"
        answer={answers?.Q9_5?.answer}
        observation={answers?.Q9_5?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-9.5"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-2: 13 Principles of Agroecology (as relevant)</h2>
      <Question
        question="Q-9.6) Which principles of AE are under active focus of the project?"
        questionId="Q9_6"
        answer={answers?.Q9_6?.answer}
        observation={answers?.Q9_6?.observation}
        onAnswerChange={handleAnswerChange}
        isMultiple={true}
        options={[
          'Recycling',
          'Input reduction',
          'Soil health',
          'Animal health',
          'Biodiversity',
          'Synergy',
          'Economic diversification',
          'Co-creation of knowledge',
          'Social values and diets',
          'Fairness',
          'Connectivity',
          'Land and natural resource governance',
          'Participation',
        ]}
        placeholder="Please note your observations (if any) related to Q-9.6"
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

export default Pathway9;