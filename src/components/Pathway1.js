// Pathway1.js
import React from 'react';
import './PathwayStyles.css'; // Import custom styles

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
              className="mr-2 custom-radio"
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

const Pathway1 = ({ onNext, onBack }) => {
  const [answers, setAnswers] = React.useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };


  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Pathway-1: Production Systems</h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        If the primary production systems of agricultural and food products – focusing on small-scale producers, herders, and fisher folk – are based on an efficient use and recycling of local renewable resources...
      </p>

      {/* Questions for Pathway 1 */}
      <h2 className="text-xl font-bold mb-4">Principle-1: Recycling (P-1)</h2>
      <Question
        question="Q-1.1) Has the project considered closure (as far as possible) of nutrients and biomass resource cycles?"
        questionId="Q1.1"
        answer={answers["Q1.1"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-2: Reduction of external inputs (P-1)</h2>
      <Question
        question="Q-1.2) Does the project actively focus on reducing use of external (originating outside the farm) inputs in agriculture and allied (animal husbandry, pisciculture, agroforestry etc.) activities at the farm level?"
        questionId="Q1.2"
        answer={answers["Q1.2"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-3: Soil health</h2>
      <Question
        question="Q-1.3) Does the project actively focus on enhancing soil health?"
        questionId="Q1.3"
        answer={answers["Q1.3"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      {/* Additional Principles */}
      <h2 className="text-xl font-bold mb-4">Principle-4: Animal health</h2>
      <Question
        question="Q-1.4) Has the project focused on actively bettering animal health and ensuring their welfare?"
        questionId="Q1.4"
        answer={answers["Q1.4"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-5: Biodiversity</h2>
      <Question
        question="Q-1.5) Has the project focussed on actively enhancing or maintaining biodiversity at the farm or landscape level?"
        questionId="Q1.5"
        answer={answers["Q1.5"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-6: Connectivity (P-1)</h2>
      <Question
        question="Q-1.6) Has the project actively focussed on connecting primary producers to local sources of sustainable farm inputs like vermicompost, animal manure, plant extracts etc.?"
        questionId="Q1.6"
        answer={answers["Q1.6"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-7: Fairness (P-1)</h2>
      <Question
        question="Q-1.7) Does the project actively focus on promoting principles of fairness at farm level?"
        questionId="Q1.7"
        answer={answers["Q1.7"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-8: Production systems</h2>
      <Question
        question="Q-1.8) Does the project actively focus on improving the landscape and farm ecosystems through sustainable production practices?"
        questionId="Q1.8"
        answer={answers["Q1.8"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <Question
        question="Q-1.9) Does the project actively focus on sustenance of local agrobiodiversity contributing to traditional food systems?"
        questionId="Q1.9"
        answer={answers["Q1.9"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <Question
        question="Q-1.10) Does the project actively focus on promoting climate-smart, nutrition-sensitive production approaches?"
        questionId="Q1.10"
        answer={answers["Q1.10"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-9: Availability of food</h2>
      <Question
        question="Q-1.11) Does the project actively focus on ensuring adequate availability of food throughout the year among producer households?"
        questionId="Q1.11"
        answer={answers["Q1.11"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-10: Access to food</h2>
      <Question
        question="Q-1.12) Does the project actively focus on promoting better nutrition among producer households sourced from their farms production?"
        questionId="Q1.12"
        answer={answers["Q1.12"]}
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

export default Pathway1;