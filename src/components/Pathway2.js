// Pathway2.js
import React from 'react';
import './PathwayStyles.css'; // Import custom styles for gradient radio button

const Question = ({ question, questionId, onAnswerChange, answer, placeholder }) => {
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
              onChange={(e) => onAnswerChange(questionId, e.target.value)}
              className="mr-2 custom-radio" // Add the custom class for the gradient effect
              required
            />
            {option}
          </label>
        ))}
      </div>

      <textarea
        placeholder={placeholder}
        className="w-full p-2 border rounded-md text-gray-700 dark:bg-gray-800 dark:text-gray-200 mt-2"
        rows="4"
        onChange={(e) => onAnswerChange(`${questionId}_observation`, e.target.value)}
      ></textarea>
    </div>
  );
};

const Pathway2 = ({ onNext, onBack }) => {
  const [answers, setAnswers] = React.useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Pathway-2: Agroecosystems' Synergy</h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        If positive ecological interaction, integration and complementarity among the elements of agroecosystems (animals, crops, trees, soil, and water) with a landscape approach can create synergies, then the effects for sustainable food supply will be even further enhanced.
      </p>

      {/* Questions for Pathway 2 */}
      <h2 className="text-xl font-bold mb-4">Principle-1: Synergies</h2>
      <Question
        question="Q-2.1) Does the project actively focus on promoting integration of crops and other plants, animals, soil, water to enhance sustainability and production at farm and landscape levels?"
        questionId="Q2.1"
        answer={answers["Q2.1"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
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

export default Pathway2;