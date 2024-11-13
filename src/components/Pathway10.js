// Pathway10.js
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

const Pathway10 = ({ onNext, onBack }) => {
  const [answers, setAnswers] = React.useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Pathway-10: Inclusive Growth</h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        If these key elements of the 'WHAT' are realised in such a way (the 'HOW') that gender sensitivity, inclusiveness, do-no-harm, co-creation and sharing of knowledge and innovations, social values of local communities and provision of healthy, diversified, seasonally and culturally appropriate diets, fairness, connectivity, strengthened social organization and participation in decision-making by food producers and consumers prevail, then the pathway to sustainable food systems is paved.
      </p>

      {/* Questions for Pathway 10 */}
      <h2 className="text-xl font-bold mb-4">Principle-1: Gender Sensitivity</h2>
      <Question
        question="Q-10.1) Does the project actively focus on addressing gender specific challenges?"
        questionId="Q10.1"
        answer={answers["Q10.1"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-2: Inclusiveness</h2>
      <Question
        question="Q-10.2) Does the project actively focus on enhancing agency of the poor, marginalised and vulnerable population in decision making, workforce participation and equitable benefit sharing?"
        questionId="Q10.2"
        answer={answers["Q10.2"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-3: Do-no-harm</h2>
      <Question
        question="Q-10.3) Does the project actively focus on identifying and reducing negative impacts of the interventions?"
        questionId="Q10.3"
        answer={answers["Q10.3"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-4: Co-creation of Knowledge</h2>
      <Question
        question="Q-10.4) Does the project actively focus on reducing the negative ecological impacts of food production and consumption?"
        questionId="Q10.4"
        answer={answers["Q10.4"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-5: Social Values</h2>
      <Question
        question="Q-10.5) Does the project actively focus on reducing the social disparities arising due to food system?"
        questionId="Q10.5"
        answer={answers["Q10.5"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-6: Diets (Healthy, Diversified, Seasonally and Culturally Appropriate)</h2>
      <Question
        question="Q-10.6) Does the project actively focus on adequacy and quality of food available to needy and the vulnerable segments of the society within the landscape?"
        questionId="Q10.6"
        answer={answers["Q10.6"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <Question
        question="Q-10.7) Does the project actively focus on ensuring food sovereignty among the producers?"
        questionId="Q10.7"
        answer={answers["Q10.7"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-7: Acceptability (P-10)</h2>
      <Question
        question="Q-10.8) Does the project actively focus on identifying the opportunities for participation and accrual of benefits to various social segments from the food system?"
        questionId="Q10.8"
        answer={answers["Q10.8"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-8: Fairness (P-10)</h2>
      <Question
        question="Q-10.9) Does the project actively focus on ensuring equality in terms of benefit sharing within the food systems within the landscape?"
        questionId="Q10.9"
        answer={answers["Q10.9"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-9: Connectivity (P-10)</h2>
      <Question
        question="Q-10.10) Does the project actively focus on creating socio-cultural linkages within different social groups within a landscape?"
        questionId="Q10.10"
        answer={answers["Q10.10"]}
        onAnswerChange={handleAnswerChange}
        placeholder="You may skip this question. If you wish to substantiate your choice of response..."
      />

      <h2 className="text-xl font-bold mb-4">Principle-10: Participation (P-10)</h2>
      <Question
        question="Q-10.11) Does the project actively focus on promoting platforms, organisations or groups of people to develop, govern and manage the food systems at the local levels?"
        questionId="Q10.11"
        answer={answers["Q10.11"]}
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
          type="submit" // Set as submit button
          onClick={() => alert('Submitted!')}
          className="w-full py-3 px-4 rounded-md bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800 transition-colors duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Pathway10;