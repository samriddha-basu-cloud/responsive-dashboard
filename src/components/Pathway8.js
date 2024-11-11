// Pathway8.js
import React from 'react';
import './PathwayStyles.css'; // Import custom styles for gradient radio button

const Question = ({ question, questionId, onAnswerChange, answer, placeholder }) => {
  return (
    <div className="mb-8">
      <p className="text-lg font-semibold mb-2">{question}</p>
      
      <div className="flex space-x-4 mb-2">
        {["Planned", "Ongoing", "Completed", "Not in Focus"].map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="radio"
              name={questionId}
              value={option}
              checked={answer === option}
              onChange={(e) => onAnswerChange(questionId, e.target.value)}
              className="mr-2 custom-radio" // Custom radio style for gradient
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

const Pathway8 = ({ onNext, onBack }) => {
  const [answers, setAnswers] = React.useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Pathway-8: Policy & Governance</h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        If appropriate policy and governance, taking these agroecological principles and food systems dimensions into account, is ensured, then the chances for agroecological transformation of food systems to become a success are much higher than without such a favourable political environment.
      </p>

      {/* Questions for Pathway 8 */}
      <h2 className="text-xl font-bold mb-4">Principle-1: Policy and Governance</h2>
      <Question
        question="Q-8.1) Does the project actively focus on governance aspects of natural resources within the landscape?"
        questionId="Q8.1"
        answer={answers["Q8.1"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <Question
        question="Q-8.2) Does the project actively focus on governance aspects related to equity and justice for producers and other stakeholders in the food system?"
        questionId="Q8.2"
        answer={answers["Q8.2"]}
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

export default Pathway8;