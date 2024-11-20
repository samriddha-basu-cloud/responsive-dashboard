import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import './PathwayStyles.css'; // Import custom styles

const Question = ({ question, questionId, onAnswerChange, answer, observation, placeholder }) => {
  return (
    <div className="mb-6 sm:mb-8">
      <p className="text-base sm:text-lg font-semibold mb-2">{question}</p>

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

const Pathway7 = ({ onNext, onBack, projectId }) => {
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const isAllQuestionsAnswered = () => {
    return answers?.Q7_1?.answer !== undefined && answers?.Q7_2?.answer !== undefined && answers?.Q7_3?.answer !== undefined && answers?.Q7_4?.answer !== undefined && answers?.Q7_5?.answer !== undefined;
  };

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

          if (project && project.sections?.Pathway7) {
            setAnswers(project.sections.Pathway7);
          }
        }
      } catch (error) {
        console.error('Error fetching Pathway7 data:', error);
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
                    Pathway7: updatedAnswers,
                  },
                }
              : project
          );

          await updateDoc(userDocRef, { projects: updatedProjects });
        }
      } catch (error) {
        console.error('Error updating Pathway7 answers:', error);
      }
    }
  };

  if (isLoading) {
    return <p className="text-center text-sm sm:text-base">Loading...</p>;
  }

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-md">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Pathway-7: Nutrition & Health</h1>
      <p className="mb-4 sm:mb-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        If diets are improved in this way, positive nutrition and diet-related health outcomes as well as broader economic, social, and environmental impacts can be expected.
      </p>

      {/* Questions for Pathway 7 */}
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-1: Nutrition Outcomes</h2>
      <Question
        question="Q-7.1) Does the project actively focus on achieving specific nutrition-related goals across various population segments?"
        questionId="Q7_1"
        answer={answers?.Q7_1?.answer}
        observation={answers?.Q7_1?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-7.1"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-2: Health Outcomes (Diet Related)</h2>
      <Question
        question="Q-7.2) Does the project actively focus on achieving specific diet-linked health goals across various population segments?"
        questionId="Q7_2"
        answer={answers?.Q7_2?.answer}
        observation={answers?.Q7_2?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-7.2"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-3: Broader Economic Impacts</h2>
      <Question
        question="Q-7.3) Does the project actively focus on leveraging gains to create large-scale positive economic impacts?"
        questionId="Q7_3"
        answer={answers?.Q7_3?.answer}
        observation={answers?.Q7_3?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-7.3"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-4: Broader Social Impacts</h2>
      <Question
        question="Q-7.4) Does the project actively focus on promoting social equity by positively impacting vulnerable groups?"
        questionId="Q7_4"
        answer={answers?.Q7_4?.answer}
        observation={answers?.Q7_4?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-7.4"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-5: Broader Environmental Impacts</h2>
      <Question
        question="Q-7.5) Does the project actively focus on reducing the negative ecological impacts of food production and consumption?"
        questionId="Q7_5"
        answer={answers?.Q7_5?.answer}
        observation={answers?.Q7_5?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-7.5"
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

export default Pathway7;