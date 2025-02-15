import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import './PathwayStyles.css';

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

const Pathway1 = ({ onNext, onBack, projectId }) => {
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const isAllQuestionsAnswered = () => {
    return answers?.Q1_1?.answer !== undefined && answers?.Q1_2?.answer !== undefined && answers?.Q1_3?.answer !== undefined && answers?.Q1_4?.answer !== undefined && answers?.Q1_5?.answer !== undefined && answers?.Q1_6?.answer !== undefined && answers?.Q1_7?.answer !== undefined && answers?.Q1_8?.answer !== undefined && answers?.Q1_9?.answer !== undefined && answers?.Q1_10?.answer !== undefined && answers?.Q1_11?.answer !== undefined && answers?.Q1_12?.answer !== undefined;
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

          if (project && project.sections?.Pathway1) {
            setAnswers(project.sections.Pathway1);
          }
        }
      } catch (error) {
        console.error('Error fetching Pathway1 data:', error);
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
                    Pathway1: updatedAnswers,
                  },
                }
              : project
          );

          await updateDoc(userDocRef, { projects: updatedProjects });
        }
      } catch (error) {
        console.error('Error updating Pathway1 answers:', error);
      }
    }
  };

  if (isLoading) {
    return <p className="text-center text-sm sm:text-base">Loading...</p>;
  }

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-md">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Pathway-1: Production Systems</h1>
      <p className="mb-6 sm:mb-8 text-lg sm:text-xl text-gray-700 dark:text-gray-300 p-6 rounded-xl bg-gray-200 dark:bg-gray-800 leading-relaxed tracking-wide shadow-[inset_6px_6px_12px_#c2c2c2,inset_-6px_-6px_12px_#ffffff] dark:shadow-[inset_6px_6px_12px_#404040,inset_-6px_-6px_12px_#606060] font-serif font-bold">
        <span className="text-red-500 italic">Def.</span> If the primary production systems of agricultural and food products – focussing on small-scale producers, herders, and fisher folk – are based on an efficient use and recycling of local renewable resources, reduction of external inputs, preservation of soil health, animal health, biodiversity, and diversification without destroying hunters', gatherers' and indigenous people's livelihoods, then more sustainably produced and nutritious food is available and accessible for the primary producers. 

      </p>

      {/* Questions for Pathway 1 */}
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-1: Recycling (P-1)</h2>
      <Question
        question="Q-1.1) Has the project considered closure (as far as possible) of nutrients and biomass resource cycles?"
        questionId="Q1_1"
        answer={answers?.Q1_1?.answer}
        observation={answers?.Q1_1?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-1.1"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-2: Reduction of external inputs (P-1)</h2>
      <Question
        question="Q-1.2) Does the project actively focus on reducing use of external (originating outside the farm) inputs in agriculture and allied (animal husbandry, pisciculture, agroforestry etc.) activities at the farm level?"
        questionId="Q1_2"
        answer={answers?.Q1_2?.answer}
        observation={answers?.Q1_2?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-1.2"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-3: Soil health</h2>
      <Question
        question="Q-1.3) Does the project actively focus on enhancing soil health?"
        questionId="Q1_3"
        answer={answers?.Q1_3?.answer}
        observation={answers?.Q1_3?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-1.3"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-4: Animal health</h2>
      <Question
        question="Q-1.4) Has the project focused on actively bettering animal health and ensuring their welfare?"
        questionId="Q1_4"
        answer={answers?.Q1_4?.answer}
        observation={answers?.Q1_4?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-1.4"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-5: Biodiversity</h2>
      <Question
        question="Q-1.5) Has the project focussed on actively enhancing or maintaining biodiversity at the farm or landscape level?"
        questionId="Q1_5"
        answer={answers?.Q1_5?.answer}
        observation={answers?.Q1_5?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-1.5"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-6: Connectivity (P-1)</h2>
      <Question
        question="Q-1.6) Has the project actively focussed on connecting primary producers to local sources of sustainable farm inputs like vermicompost, animal manure, plant extracts etc.?"
        questionId="Q1_6"
        answer={answers?.Q1_6?.answer}
        observation={answers?.Q1_6?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-1.6"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-7: Fairness (P-1)</h2>
      <Question
        question="Q-1.7) Does the project actively focus on promoting principles of fairness at farm level?"
        questionId="Q1_7"
        answer={answers?.Q1_7?.answer}
        observation={answers?.Q1_7?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-1.7"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-8: Production systems</h2>
      <Question
        question="Q-1.8) Does the project actively focus on improving the landscape and farm ecosystems through sustainable production practices?"
        questionId="Q1_8"
        answer={answers?.Q1_8?.answer}
        observation={answers?.Q1_8?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-1.8"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4"></h2>
      <Question
        question="Q-1.9) Does the project actively focus on sustenance of local agrobiodiversity contributing to traditional food systems?"
        questionId="Q1_9"
        answer={answers?.Q1_9?.answer}
        observation={answers?.Q1_9?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-1.9"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4"></h2>
      <Question
        question="Q-1.10) Does the project actively focus on promoting climate-smart, nutrition-sensitive production approaches?"
        questionId="Q1_10"
        answer={answers?.Q1_10?.answer}
        observation={answers?.Q1_10?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-1.10"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-9: Availability of food</h2>
      <Question
        question="Q-1.11) Does the project actively focus on ensuring adequate availability of food throughout the year among producer households?"
        questionId="Q1_11"
        answer={answers?.Q1_11?.answer}
        observation={answers?.Q1_11?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-1.11"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-10: Access to food</h2>
      <Question
        question="Q-1.12) Does the project actively focus on promoting better nutrition among producer households sourced from their farms production?"
        questionId="Q1_12"
        answer={answers?.Q1_12?.answer}
        observation={answers?.Q1_12?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-1.12"
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

export default Pathway1;