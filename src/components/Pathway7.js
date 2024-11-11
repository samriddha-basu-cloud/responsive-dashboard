// Pathway7.js
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

const Pathway7 = ({ onNext, onBack }) => {
  const [answers, setAnswers] = React.useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Pathway-7: Nutrition & Health</h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        If diets are improved in this way, positive nutrition and diet-related health outcomes as well as broader economic, social, and environmental impacts can be expected.
      </p>

      {/* Questions for Pathway 7 */}
      <h2 className="text-xl font-bold mb-4">Principle-1: Nutrition Outcomes</h2>
      <Question
        question="Q-7.1) Does the project actively focus on achieving specific nutrition-related goals across various population segments?"
        questionId="Q7.1"
        answer={answers["Q7.1"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-2: Health Outcomes (Diet Related)</h2>
      <Question
        question="Q-7.2) Does the project actively focus on achieving specific diet-linked health goals across various population segments?"
        questionId="Q7.2"
        answer={answers["Q7.2"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-3: Broader Economic Impacts</h2>
      <Question
        question="Q-7.3) Does the project actively focus on leveraging gains to create large-scale positive economic impacts?"
        questionId="Q7.3"
        answer={answers["Q7.3"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-4: Broader Social Impacts</h2>
      <Question
        question="Q-7.4) Does the project actively focus on promoting social equity by positively impacting vulnerable groups?"
        questionId="Q7.4"
        answer={answers["Q7.4"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-5: Broader Environmental Impacts</h2>
      <Question
        question="Q-7.5) Does the project actively focus on reducing the negative ecological impacts of food production and consumption?"
        questionId="Q7.5"
        answer={answers["Q7.5"]}
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

export default Pathway7;