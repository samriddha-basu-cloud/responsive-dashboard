// Pathway6.js
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

const Pathway6 = ({ onNext, onBack }) => {
  const [answers, setAnswers] = React.useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Pathway-6: Food Consumption Behaviour</h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        If consumer behaviour positively reacts to the more sustainable and nutritious food supply, diets will be improved in quality, quantity, diversity, safety, and adequacy – either directly through consumption of own production or indirectly through savings from less external input or incomes generated in the food supply chain or through economic diversification.
      </p>

      {/* Questions for Pathway 6 */}
      <h2 className="text-xl font-bold mb-4">Principle-1: Consumer Behaviour</h2>
      <Question
        question="Q-6.1) Does the project actively focus on behaviour change among consumers within the landscape by influencing their knowledge, attitude, and practice towards healthy foods?"
        questionId="Q6.1"
        answer={answers["Q6.1"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-2: Diets</h2>
      <Question
        question="Q-6.2) Does the project actively focus on adequacy of food for people within the landscape?"
        questionId="Q6.2"
        answer={answers["Q6.2"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <Question
        question="Q-6.3) Does the project actively focus on quality of food for people within the landscape?"
        questionId="Q6.3"
        answer={answers["Q6.3"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-3: Promotion, Information, Guidelines, and Advertising (P-6)</h2>
      <Question
        question="Q-6.4) Does the project actively focus on enabling the community to understand the labelling information and advertisements related to food?"
        questionId="Q6.4"
        answer={answers["Q6.4"]}
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

export default Pathway6;