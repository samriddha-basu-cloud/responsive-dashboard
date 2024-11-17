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

const Pathway3 = ({ onNext, onBack, projectId }) => {
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

          if (project && project.sections?.Pathway3) {
            setAnswers(project.sections.Pathway3);
          }
        }
      } catch (error) {
        console.error('Error fetching Pathway3 data:', error);
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
                    Pathway3: updatedAnswers,
                  },
                }
              : project
          );

          await updateDoc(userDocRef, { projects: updatedProjects });
        }
      } catch (error) {
        console.error('Error updating Pathway3 answers:', error);
      }
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Pathway-3: Food Supply Chain</h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        If in addition to primary production, storage, trade, packaging, and processing, retail and marketing of food also follow the principles of recycling and reduction of external inputs, the whole food supply chain will be more sustainable...
      </p>

      {/* Questions for Pathway 3 */}
      <h2 className="text-xl font-bold mb-4">Principle-1: Storage and Trade</h2>
      <Question
        question="Q-3.1) Does the project actively focus on measures that lead to reduction in food loss and waste in the supply chain?"
        questionId="Q3_1"
        answer={answers?.Q3_1?.answer}
        observation={answers?.Q3_1?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-3.1"
      />

      <h2 className="text-xl font-bold mb-4">Principle-2: Packaging and Processing</h2>
      <Question
        question="Q-3.2) Does the project actively focus on measures that lead to lessening environmental footprint of packaging and processing activities?"
        questionId="Q3_2"
        answer={answers?.Q3_2?.answer}
        observation={answers?.Q3_2?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-3.2"
      />

      <Question
        question="Q-3.3) Does the project actively focus on food fortification in traditional and mixed food systems?"
        questionId="Q3_3"
        answer={answers?.Q3_3?.answer}
        observation={answers?.Q3_3?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-3.3"
      />

      <h2 className="text-xl font-bold mb-4">Principle-3: Retail and Marketing</h2>
      <Question
        question="Q-3.4) Does the project actively focus on facilitating fair participation of the smallholders in the markets?"
        questionId="Q3_4"
        answer={answers?.Q3_4?.answer}
        observation={answers?.Q3_4?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-3.4"
      />

      <h2 className="text-xl font-bold mb-4">Principle-4: Recycling (P-3)</h2>
      <Question
        question="Q-3.5) Does the project actively focus on recycling of waste and effluents generated by the food supply chain within a landscape?"
        questionId="Q3_5"
        answer={answers?.Q3_5?.answer}
        observation={answers?.Q3_5?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-3.5"
      />

      <h2 className="text-xl font-bold mb-4">Principle-5: Reduction of External Inputs (P-3)</h2>
      <Question
        question="Q-3.6) Does the project actively focus on reducing the dependence of the food supply chain on external inputs within the landscape?"
        questionId="Q3_6"
        answer={answers?.Q3_6?.answer}
        observation={answers?.Q3_6?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-3.6"
      />

      <h2 className="text-xl font-bold mb-4">Principle-6: Food Supply Chains</h2>
      <Question
        question="Q-3.7) Does the project actively focus on making the food supply chain more sustainable and robust?"
        questionId="Q3_7"
        answer={answers?.Q3_7?.answer}
        observation={answers?.Q3_7?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-3.7"
      />

      <h2 className="text-xl font-bold mb-4">Principle-7: Physical Access to Food</h2>
      <Question
        question="Q-3.8) Does the project actively focus on promoting access points for healthy & safe foods within the landscape?"
        questionId="Q3_8"
        answer={answers?.Q3_8?.answer}
        observation={answers?.Q3_8?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-3.8"
      />

      <h2 className="text-xl font-bold mb-4">Principle-8: Economic Access to Food (Affordability)</h2>
      <Question
        question="Q-3.9) Does the project actively focus on ensuring affordability of healthy & safe foods within the landscape?"
        questionId="Q3_9"
        answer={answers?.Q3_9?.answer}
        observation={answers?.Q3_9?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-3.9"
      />

      <h2 className="text-xl font-bold mb-4">Principle-9: Acceptability (P-3)</h2>
      <Question
        question="Q-3.10) Does the project actively focus on matching the supply of local food to the preferences of people?"
        questionId="Q3_10"
        answer={answers?.Q3_10?.answer}
        observation={answers?.Q3_10?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-3.10"
      />

      <h2 className="text-xl font-bold mb-4">Principle-10: Promotion, Information, Guidelines, and Advertising (P-3)</h2>
      <Question
        question="Q-3.11) Does the project actively focus on promoting healthy food through IEC?"
        questionId="Q3_11"
        answer={answers?.Q3_11?.answer}
        observation={answers?.Q3_11?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-3.11"
      />

      <h2 className="text-xl font-bold mb-4">Principle-11: Connectivity (P-3)</h2>
      <Question
        question="Q-3.12) Does the project actively focus on building direct connection between producers and local consumers?"
        questionId="Q3_12"
        answer={answers?.Q3_12?.answer}
        observation={answers?.Q3_12?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-3.12"
      />

      <h2 className="text-xl font-bold mb-4">Principle-12: Fairness (P-3)</h2>
      <Question
        question="Q-3.13) Does the project actively focus on promoting fair trade practices?"
        questionId="Q3_13"
        answer={answers?.Q3_13?.answer}
        observation={answers?.Q3_13?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-3.13"
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

export default Pathway3;