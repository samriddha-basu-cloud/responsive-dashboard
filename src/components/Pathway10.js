import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import './PathwayStyles.css'; // Import custom styles
import { FaCheckCircle } from 'react-icons/fa';
import SurveyComponent from './SurveyComponent';
import html2pdf from 'html2pdf.js';

const Question = ({ question, questionId, onAnswerChange, answer, observation, placeholder }) => {
  return (
    <div className="mb-6 sm:mb-8">
      <p className="text-base sm:text-lg font-semibold mb-2">{question}</p>

      <div className="flex flex-wrap gap-2 sm:space-x-4 mb-2">
        {/* {["Planned", "Ongoing", "Completed", "Not in Focus", "Not Applicable"].map((option) => ( */}
        {["Planned", "Ongoing", "Completed", "Not in Focus"].map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="radio"
              name={questionId}
              value={option}
              checked={answer === option}
              onChange={(e) => onAnswerChange(questionId, e.target.value, 'answer')}
              className="mr-1 sm:mr-2 custom-radio"
              required
            />
            <span className="text-sm sm:text-base">{option}</span>
          </label>
        ))}
      </div>

      <textarea
        placeholder={placeholder}
        value={observation || ''}
        className="w-full p-2 border rounded-md text-sm sm:text-base text-gray-700 dark:bg-gray-800 dark:text-gray-200 mt-2"
        rows="3"
        onChange={(e) => onAnswerChange(questionId, e.target.value, 'observation')}
      ></textarea>
    </div>
  );
};

const Pathway10 = ({ onNext, onBack, projectId }) => {
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const isAllQuestionsAnswered = () => {
    return answers?.Q10_1?.answer !== undefined && answers?.Q10_2?.answer !== undefined && answers?.Q10_3?.answer !== undefined && answers?.Q10_4?.answer !== undefined && answers?.Q10_5?.answer !== undefined && answers?.Q10_6?.answer !== undefined && answers?.Q10_7?.answer !== undefined && answers?.Q10_8?.answer !== undefined && answers?.Q10_9?.answer !== undefined && answers?.Q10_10?.answer !== undefined && answers?.Q10_11?.answer !== undefined;
  };

  useEffect(() => {
    const fetchPathwayData = async () => {
      if (!projectId) {
        console.error('No projectId provided');
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

  const handleSubmit = async () => {
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
                  progress: 100, // Update progress to 100%
                }
              : project
          );

          await updateDoc(userDocRef, { projects: updatedProjects });
          setShowThankYouModal(true);
        }
      } catch (error) {
        console.error('Error submitting the form:', error);
      }
    }
  };

  const prepareChartsForPDF = async () => {
  const canvasElements = document.querySelectorAll('canvas');
  canvasElements.forEach((canvas) => {
    const imageData = canvas.toDataURL('image/png');
    const img = document.createElement('img');
    img.src = imageData;
    img.style.width = canvas.width + 'px';
    img.style.height = canvas.height + 'px';
    canvas.parentNode.replaceChild(img, canvas); // Replace canvas with the image
  });
};

  if (isLoading) {
    return <p className="text-center text-sm sm:text-base">Loading...</p>;
  }

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-md">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Pathway-10: Inclusive Growth</h1>
       <p className="mb-6 sm:mb-8 text-lg sm:text-xl text-gray-700 dark:text-gray-300 p-6 rounded-xl bg-gray-200 dark:bg-gray-800 leading-relaxed tracking-wide shadow-[inset_6px_6px_12px_#c2c2c2,inset_-6px_-6px_12px_#ffffff] dark:shadow-[inset_6px_6px_12px_#404040,inset_-6px_-6px_12px_#606060] font-serif font-bold">
        <span className="text-red-500 italic">Def.</span> If these key elements of the 'WHAT' are realised in such a way (the 'HOW') that gender sensitivity, inclusiveness, do-no-harm, co-creation and sharing of knowledge and innovations, social values of local communities and provision of healthy, diversified, seasonally and culturally appropriate diets (see pathway 6), fairness (see pathway 1), connectivity (see pathway 1), strengthened social organization and participation in decision-making by food producers and consumers prevail, then the pathway to sustainable food systems is paved.
      </p>

      {/* Questions for Pathway 10 */}
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-1: Gender Sensitivity</h2>
      <Question
        question="Q-10.1) Does the project actively focus on addressing gender-specific challenges?"
        questionId="Q10_1"
        answer={answers?.Q10_1?.answer}
        observation={answers?.Q10_1?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-10.1"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-2: Inclusiveness</h2>
      <Question
        question="Q-10.2) Does the project actively focus on enhancing agency of the poor, marginalised and vulnerable population in decision making, workforce participation and equitable benefit sharing?"
        questionId="Q10_2"
        answer={answers?.Q10_2?.answer}
        observation={answers?.Q10_2?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-10.2"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-3: Do-no-harm</h2>
      <Question
        question="Q-10.3) Does the project actively focus on identifying and reducing negative impacts of the interventions?"
        questionId="Q10_3"
        answer={answers?.Q10_3?.answer}
        observation={answers?.Q10_3?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-10.3"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-4: Co-creation of Knowledge</h2>
      <Question
        question="Q-10.4) Does the project actively focus on co-creation and sharing of knowledge?"
        questionId="Q10_4"
        answer={answers?.Q10_4?.answer}
        observation={answers?.Q10_4?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-10.4"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-5: Social Values</h2>
      <Question
        question="Q-10.5) Does the project actively focus on reducing the social disparities arising due to food system?"
        questionId="Q10_5"
        answer={answers?.Q10_5?.answer}
        observation={answers?.Q10_5?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-10.5"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-6: Diets (Healthy, Diversified, Seasonally and Culturally Appropriate)</h2>
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

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-7: Acceptability (P-10)</h2>
      <Question
        question="Q-10.8) Does the project actively focus on identifying the opportunities for participation and accrual of benefits to various social segments from the food system?"
        questionId="Q10_8"
        answer={answers?.Q10_8?.answer}
        observation={answers?.Q10_8?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-10.8"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-8: Fairness (P-10)</h2>
      <Question
        question="Q-10.9) Does the project actively focus on ensuring equality in terms of benefit sharing within the food systems within the landscape?"
        questionId="Q10_9"
        answer={answers?.Q10_9?.answer}
        observation={answers?.Q10_9?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-10.9"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-9: Connectivity (P-10)</h2>
      <Question
        question="Q-10.10) Does the project actively focus on creating socio-cultural linkages within different social groups within a landscape?"
        questionId="Q10_10"
        answer={answers?.Q10_10?.answer}
        observation={answers?.Q10_10?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-10.10"
      />

      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Principle-10: Participation (P-10)</h2>
      <Question
        question="Q-10.11) Does the project actively focus on promoting platforms, organisations or groups of people to develop, govern and manage the food systems at the local levels?"
        questionId="Q10_11"
        answer={answers?.Q10_11?.answer}
        observation={answers?.Q10_11?.observation}
        onAnswerChange={handleAnswerChange}
        placeholder="Please note your observations (if any) related to Q-10.11"
      />

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-6">
        <button
          type="button"
          onClick={onBack}
          className="w-full py-2 sm:py-3 px-4 rounded-md bg-gray-400 text-white hover:bg-gray-500 transition-colors duration-300 text-sm sm:text-base"
        >
          Back
        </button>

        <button
          type="submit"
          onClick={handleSubmit}
          className={`w-full py-2 sm:py-3 px-4 rounded-md text-white transition-colors duration-300 text-sm sm:text-base ${
            isAllQuestionsAnswered()
              ? 'bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          disabled={!isAllQuestionsAnswered()}
        >
          Submit
        </button>
      </div>

      {/* Thank You Modal */}
      {showThankYouModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Thank you for the responses.</h2>
            <p className="text-gray-700 dark:text-zinc-100">You can review your answers by clicking the Review button.</p>
            <button
              onClick={() => {
                setShowThankYouModal(false);
              }}
              className="mt-4 px-6 py-2 rounded-md bg-gradient-to-r from-gray-500 to-gray-700 text-white hover:from-gray-600 hover:to-gray-800 transition-colors duration-300"
            >
              Close
            </button>
            <button
              onClick={() => {
                setShowThankYouModal(false);
                setShowReviewModal(true);
              }}
              className="mt-4 ml-4 px-6 py-2 rounded-md bg-gradient-to-r from-yellow-500 to-yellow-700 text-white hover:from-yellow-600 hover:to-yellow-800 transition-colors duration-300"
            >
              Review
            </button>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            id="review-modal-content"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-3/4 h-5/6 p-6 relative flex flex-col justify-between"
            style={{ height: '90%' }}
          >
            {/* Header Section */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-300 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Review Responses</h2>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 text-2xl transition-all duration-300"
                title="Close Review Modal"
              >
                &times; {/* Close button */}
              </button>
            </div>

            {/* Main Content */}
            <div className="overflow-y-auto mt-4 flex-grow">
              {/* Render the SurveyComponent */}
              <SurveyComponent projectId={projectId} />
            </div>

            {/* Footer Section */}
            <div className="flex justify-end items-center pt-4 border-t border-gray-300 dark:border-gray-700 space-x-4">
              {/* Close Button */}
              {/* <button
                onClick={() => setShowReviewModal(false)}
                className="px-6 py-2 rounded-md bg-gradient-to-r from-gray-400 to-gray-600 text-white hover:from-gray-500 hover:to-gray-700 transition-all duration-300"
                title="Close Modal"
              >
                Close
              </button> */}
              {/* Download Button */}
              <button
                onClick={async () => {
                  const element = document.getElementById('review-modal-content');

                  // Convert charts to images
                  await prepareChartsForPDF();

                  // Configure PDF generation options
                  const opt = {
                    margin: 0.2,
                    filename: 'Survey_Review.pdf',
                    image: { type: 'jpeg', quality: 0.99 },
                    html2canvas: {
                      scale: 4, // Higher resolution
                      useCORS: true, // Allow cross-origin resources
                    },
                    jsPDF: {
                      unit: 'in',
                      format: 'letter',
                      orientation: 'landscape', // Fit content to a single page
                    },
                  };

                  html2pdf().set(opt).from(element).save();
                }}
                className="px-6 py-2 rounded-md bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 transition-all duration-300"
              >
                Download Survey
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pathway10;