// Pathway.js
import React, { useState } from 'react';

const pathwaysData = [
  {
    title: 'Environmental Impact',
    questions: [
      "What environmental challenges does the project address?",
      "Describe any expected environmental impacts."
    ]
  },
  {
    title: 'Social Impact',
    questions: [
      "What are the social benefits of this project?",
      "How does the project engage with the local community?"
    ]
  },
  {
    title: 'Economic Viability',
    questions: [
      "What is the expected economic benefit of this project?",
      "How does the project contribute to economic development?"
    ]
  },
  {
    title: 'Economic Viability',
    questions: [
      "What is the expected economic benefit of this project?",
      "How does the project contribute to economic development?"
    ]
  },{
    title: 'Economic Viability',
    questions: [
      "What is the expected economic benefit of this project?",
      "How does the project contribute to economic development?"
    ]
  },{
    title: 'Economic Viability',
    questions: [
      "What is the expected economic benefit of this project?",
      "How does the project contribute to economic development?"
    ]
  },
  {
    title: 'Economic Viability',
    questions: [
      "What is the expected economic benefit of this project?",
      "How does the project contribute to economic development?"
    ]
  },
  {
    title: 'Economic Viability',
    questions: [
      "What is the expected economic benefit of this project?",
      "How does the project contribute to economic development?"
    ]
  },
  {
    title: 'Economic Viability',
    questions: [
      "What is the expected economic benefit of this project?",
      "How does the project contribute to economic development?"
    ]
  },
  {
    title: 'Economic Viability',
    questions: [
      "What is the expected economic benefit of this project?",
      "How does the project contribute to economic development?"
    ]
  },
  // Add similar objects for pathways 4 to 10
];

const Pathway = ({ pathwayIndex, onNext, onBack, onSubmit }) => {
  const pathway = pathwaysData[pathwayIndex] || { title: 'Unknown Pathway', questions: [] };
  const isLastPathway = pathwayIndex === pathwaysData.length - 1;
  const [answers, setAnswers] = useState(Array(pathway.questions.length).fill(""));

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{pathway.title}</h2>
      <div className="space-y-4">
        {pathway.questions && pathway.questions.map((question, index) => (
          <div key={index}>
            <p className="text-gray-800 dark:text-gray-100">{question}</p>
            <textarea
              className="w-full p-2 border rounded mt-2"
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              rows="3"
            />
          </div>
        ))}
      </div>
      <div className="flex space-x-2 mt-4">
        <button onClick={onBack} className="px-4 py-2 rounded-md text-white bg-gray-400">Back</button>
        {isLastPathway ? (
          <button
            onClick={() => onSubmit(answers)}
            className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-green-500 to-green-700"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={onNext}
            className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-red-500 to-red-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Pathway;