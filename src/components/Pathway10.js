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
              className="mr-2 custom-radio" // Custom radio style for gradient
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

const Pathway10 = ({ onNext, onBack, projectId }) => {
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

          if (project && project.sections?.Pathway10) {
            setAnswers(project.sections.Pathway10);
          }
        }
      } catch (error) {
        console.error('Error fetching Pathway10 data:', error);
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
                    Pathway10: updatedAnswers,
                  },
                }
              : project
          );

          await updateDoc(userDocRef, { projects: updatedProjects });
        }
      } catch (error) {
        console.error('Error updating Pathway10 answers:', error);
      }
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Pathway-10: Inclusive Growth</h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        If these key elements of the 'WHAT' are realised in such a way (the 'HOW') that gender sensitivity, inclusiveness,
        do-no-harm, co-creation and sharing of knowledge and innovations, social values of local communities and provision
        of healthy, diversified, seasonally and culturally appropriate diets, fairness, connectivity, strengthened social
        organization and participation in decision-making by food producers and consumers prevail, then the pathway to
        sustainable food systems is paved.
      </p>

      {/* Questions for Pathway 10 */}
      <h2 className="text-xl font-bold mb-4">Principle-1: Gender Sensitivity</h2>
      <Question
        question="Q-10.1) Does the project actively focus on addressing gender specific challenges?"
        questionId="Q10_1"
        answer={answers?.Q10_1?.answer}
        observation={answers?.Q10_1?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-10.1"
      />

      <h2 className="text-xl font-bold mb-4">Principle-2: Inclusiveness</h2>
      <Question
        question="Q-10.2) Does the project actively focus on enhancing agency of the poor, marginalised and vulnerable population in decision making, workforce participation and equitable benefit sharing?"
        questionId="Q10_2"
        answer={answers?.Q10_2?.answer}
        observation={answers?.Q10_2?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-10.2"
      />

      <h2 className="text-xl font-bold mb-4">Principle-3: Do-no-harm</h2>
      <Question
        question="Q-10.3) Does the project actively focus on identifying and reducing negative impacts of the interventions?"
        questionId="Q10_3"
        answer={answers?.Q10_3?.answer}
        observation={answers?.Q10_3?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-10.3"
      />

      <h2 className="text-xl font-bold mb-4">Principle-4: Co-creation of Knowledge</h2>
      <Question
        question="Q-10.4) Does the project actively focus on co-creation and sharing of knowledge?"
        questionId="Q10_4"
        answer={answers?.Q10_4?.answer}
        observation={answers?.Q10_4?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-10.4"
      />

      <h2 className="text-xl font-bold mb-4">Principle-5: Social Values</h2>
      <Question
        question="Q-10.5) Does the project actively focus on reducing the social disparities arising due to food system?"
        questionId="Q10_5"
        answer={answers?.Q10_5?.answer}
        observation={answers?.Q10_5?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-10.5"
      />

      <h2 className="text-xl font-bold mb-4">Principle-6: Diets (Healthy, Diversified, Seasonally and Culturally Appropriate)</h2>
      <Question
        question="Q-10.6) Does the project actively focus on adequacy and quality of food available to needy and the vulnerable segments of the society within the landscape?"
        questionId="Q10_6"
        answer={answers?.Q10_6?.answer}
        observation={answers?.Q10_6?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-10.6"
      />

      <Question
        question="Q-10.7) Does the project actively focus on ensuring food sovereignty among the producers?"
        questionId="Q10_7"
        answer={answers?.Q10_7?.answer}
        observation={answers?.Q10_7?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-10.7"
      />

      <h2 className="text-xl font-bold mb-4">Principle-7: Acceptability (P-10)</h2>
      <Question
        question="Q-10.8) Does the project actively focus on identifying the opportunities for participation and accrual of benefits to various social segments from the food system?"
        questionId="Q10_8"
        answer={answers?.Q10_8?.answer}
        observation={answers?.Q10_8?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-10.8"
      />

      <h2 className="text-xl font-bold mb-4">Principle-8: Fairness (P-10)</h2>
      <Question
        question="Q-10.9) Does the project actively focus on ensuring equality in terms of benefit sharing within the food systems within the landscape?"
        questionId="Q10_9"
        answer={answers?.Q10_9?.answer}
        observation={answers?.Q10_9?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-10.9"
      />

      <h2 className="text-xl font-bold mb-4">Principle-9: Connectivity (P-10)</h2>
      <Question
        question="Q-10.10) Does the project actively focus on creating socio-cultural linkages within different social groups within a landscape?"
        questionId="Q10_10"
        answer={answers?.Q10_10?.answer}
        observation={answers?.Q10_10?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-10.10"
      />

      <h2 className="text-xl font-bold mb-4">Principle-10: Participation (P-10)</h2>
      <Question
        question="Q-10.11) Does the project actively focus on promoting platforms, organisations or groups of people to develop, govern and manage the food systems at the local levels?"
        questionId="Q10_11"
        answer={answers?.Q10_11?.answer}
        observation={answers?.Q10_11?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-10.11"
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