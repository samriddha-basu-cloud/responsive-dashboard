// Pathway9.js
import React from 'react';
import './PathwayStyles.css'; // Import custom styles for gradient radio button

const Question = ({ question, questionId, onAnswerChange, answer, placeholder, isMultiple = false, options = [] }) => {
  return (
    <div className="mb-8">
      <p className="text-lg font-semibold mb-2">{question}</p>
      
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
                  onAnswerChange(questionId, updatedAnswer);
                }}
                className="mr-2 custom-checkbox" // Custom checkbox style for gradient
              />
              {option}
            </label>
          ))}
        </div>
      ) : (
        <div className="flex space-x-4 mb-2">
          {["Planned", "Ongoing", "Completed", "Not in Focus", "Not Applicable"].map((option) => (
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
      )}

      <textarea
        placeholder={placeholder}
        className="w-full p-2 border rounded-md text-gray-700 dark:bg-gray-800 dark:text-gray-200 mt-2"
        rows="4"
        onChange={(e) => onAnswerChange(`${questionId}_observation`, e.target.value)}
      ></textarea>
    </div>
  );
};

const Pathway9 = ({ onNext, onBack }) => {
  const [answers, setAnswers] = React.useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Pathway-9: Support Systems – Agroecology Adoption</h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        If other systems supporting food production/the food supply chains, such as economic systems (including agriculture and agribusiness) and energy systems, also apply the 13 principles of agroecology, then the transformative effects on food systems will be even stronger.
      </p>

      {/* Questions for Pathway 9 */}
      <h2 className="text-xl font-bold mb-4">Principle-1: Systems Supporting Food Production/Food Supply Chains</h2>
      <Question
        question="Q-9.1) Ecosystem support"
        questionId="Q9.1"
        answer={answers["Q9.1"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <Question
        question="Q-9.2) Economic system support: agriculture"
        questionId="Q9.2"
        answer={answers["Q9.2"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <Question
        question="Q-9.3) Economic system support: agribusiness"
        questionId="Q9.3"
        answer={answers["Q9.3"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <Question
        question="Q-9.4) Energy system support"
        questionId="Q9.4"
        answer={answers["Q9.4"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <Question
        question="Q-9.5) Others (if relevant): human system, health system"
        questionId="Q9.5"
        answer={answers["Q9.5"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-2: 13 Principles of Agroecology (as relevant)</h2>
      <Question
        question="Q-9.6) Which principles of AE are under active focus of the project?"
        questionId="Q9.6"
        answer={answers["Q9.6"]}
        onAnswerChange={handleAnswerChange}
        isMultiple={true}
        options={[
          "Recycling",
          "Input reduction",
          "Soil health",
          "Animal health",
          "Biodiversity",
          "Synergy",
          "Economic diversification",
          "Co-creation of knowledge",
          "Social values and diets",
          "Fairness",
          "Connectivity",
          "Land and natural resource governance",
          "Participation",
        ]}
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

export default Pathway9;