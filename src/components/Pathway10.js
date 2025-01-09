import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import './PathwayStyles.css'; // Import custom styles
import { FaCheckCircle } from 'react-icons/fa';
import SurveyComponent from './SurveyComponent';
import gizLogo from '../assets/safsym.png';
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';
import { FaFileDownload, FaFileExcel, FaCheck } from 'react-icons/fa';

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
  const [projectName, setProjectName] = useState('');

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

          if (project) {
            setProjectName(project.name || ''); // Set project name
          }

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

  const PREDEFINED_PATHWAY_QUESTIONS = {
  Q1_1: {
    question: "Q-1.1) Has the project considered closure (as far as possible) of nutrients and biomass resource cycles?",
    questionId: "Q1_1"
  },
  Q1_2: {
    question: "Q-1.2) Does the project actively focus on reducing use of external (originating outside the farm) inputs in agriculture and allied (animal husbandry, pisciculture, agroforestry etc.) activities at the farm level?",
    questionId: "Q1_2"
  },
  Q1_3: {
    question: "Q-1.3) Does the project actively focus on enhancing soil health?",
    questionId: "Q1_3"
  },
  Q1_4: {
    question:"Q-1.4) Has the project focused on actively bettering animal health and ensuring their welfare?",
    questionId:"Q1_4"
  },
  Q1_5: {
    question: "Q-1.5) Has the project focussed on actively enhancing or maintaining biodiversity at the farm or landscape level?",
    questionId: "Q1_5"
  },
  Q1_6: {
    question: "Q-1.6) Has the project actively focussed on connecting primary producers to local sources of sustainable farm inputs like vermicompost, animal manure, plant extracts etc.?",
    questionId: "Q1_6"
  },
  Q1_7: {
    question: "Q-1.7) Does the project actively focus on promoting principles of fairness at farm level?",
    questionId: "Q1_7"
  },
  Q1_8: {
    question: "Q-1.8)Does the project actively focus on improving the landscape and farm ecosystems through sustainable production practices?",
    questionId: "Q1_8"
  },
  Q1_9: {
    question: "Q-1.9) Does the project actively focus on sustenance of local agrobiodiversity contributing to traditional food systems?",
    questionId: "Q1_9"
  },
  Q1_10: {
    question: "Q-1.10) Does the project actively focus on promoting climate-smart, nutrition-sensitive production approaches?",
    questionId: "Q1_10"
  },
  Q1_11: {
    question: "Q-1.11) Does the project actively focus on ensuring adequate availability of food throughout the year among producer households?",
    questionId: "Q1_11"
  },
  Q1_12: {
    question: "Q-1.12) Does the project actively focus on promoting better nutrition among producer households sourced from their farms production?",
    questionId: "Q1_12"
  },
  Q2_1: {
    question: "Q-2.1) Does the project actively focus on promoting integration of crops and other plants, animals, soil, water to enhance sustainability and production at farm and landscape levels?",
    questionId: "Q2_1"
  },
  Q3_1: {
    question: "Q-3.1) Does the project actively focus on measures that lead to reduction in food loss and waste in the supply chain?",
    questionId: "Q3_1"
  },
  Q3_2: {
    question: "Q-3.2) Does the project actively focus on measures that lead to lessening environmental footprint of packaging and processing activities?",
    questionId: "Q3_2"
  },
  Q3_3: {
    question: "Q-3.3) Does the project actively focus on food fortification in traditional and mixed food systems?",
    questionId: "Q3_3"
  },
  Q3_4: {
    question: "Q-3.4) Does the project actively focus on facilitating fair participation of the smallholders in the markets?",
    questionId: "Q3_4"
  },
  Q3_5: {
    question: "Q-3.5) Does the project actively focus on recycling of waste and effluents generated by the food supply chain within a landscape?",
    questionId: "Q3_5"
  },
  Q3_6: {
    question: "Q-3.6) Does the project actively focus on reducing the dependence of the food supply chain on external inputs within the landscape?",
    questionId: "Q3_6"
  },
  Q3_7: {
    question: "Q-3.7) Does the project actively focus on making the food supply chain more sustainable and robust?",
    questionId: "Q3_7"
  },
  Q3_8: {
    question: "Q-3.8) Does the project actively focus on promoting access points for healthy & safe foods within the landscape?",
    questionId: "Q3_8"
  },
  Q3_9: {
    question: "Q-3.9) Does the project actively focus on ensuring affordability of healthy & safe foods within the landscape?",
    questionId: "Q3_9"
  },
  Q3_10: {
    question: "Q-3.10) Does the project actively focus on matching the supply of local food to the preferences of people?",
    questionId: "Q3_10"
  },
  Q3_11: {
    question: "Q-3.11) Does the project actively focus on promoting healthy food through IEC?",
    questionId: "Q3_11"
  },
  Q3_12: {
    question: "Q-3.12) Does the project actively focus on building direct connection between producers and local consumers?",
    questionId: "Q3_12"
  },
  Q3_13: {
    question: "Q-3.13) Does the project actively focus on promoting fair trade practices?",
    questionId: "Q3_13"
  },
  Q4_1: {
    question: "Q-4.1) Does the project actively focus on enhancing the incomes of producers and other participants in the food systems?",
    questionId: "Q4_1"
  },
  Q4_2: {
    question: "Q-4.2) Does the project actively focus on investing the monetary gains from the development of the food system for further development of healthy foods and the production systems?",
    questionId: "Q4_2"
  },
  Q5_1: {
    question: "Q-5.1) Does the project actively focus on promoting multiple income streams from farm-based activities?",
    questionId: "Q5_1"
  },
  Q6_1:{
    question: "Q-6.1) Does the project actively focus on behaviour change among consumers within the landscape by influencing their knowledge, attitude, and practice towards healthy foods?",
    questionId: "Q6_1"
  },
  Q6_2:{
    question: "Q-6.2) Does the project actively focus on adequacy of food for people within the landscape?",
    questionId: "Q6_2"
  },
  Q6_3:{
    question: "Q-6.3) Does the project actively focus on quality of food for people within the landscape?",
    questionId: "Q6_3"
  },
  Q6_4:{
    question: "Q-6.4)  Does the project actively focus on enabling the community to understand the labelling information and advertisements related to food?",
    questionId: "Q6_4"
  },
  Q7_1:{
    question: "Q-7.1) Does the project actively focus on achieving specific nutrition-related goals across various population segments?",
    questionId: "Q7_1"
  },
  Q7_2:{
    question: "Q-7.2) Does the project actively focus on achieving specific diet-linked health goals across various population segments?",
    questionId: "Q7_2"
  },
  Q7_3:{
    question: "Q-7.3) Does the project actively focus on leveraging gains to create large-scale positive economic impacts?",
    questionId: "Q7_3"
  },
  Q7_4:{
    question: "Q-7.4) Does the project actively focus on promoting social equity by positively impacting vulnerable groups?",
    questionId: "Q7_4"
  },
  Q7_5:{
    question: "Q-7.5) Does the project actively focus on reducing the negative ecological impacts of food production and consumption?",
    questionId: "Q7_5"
  },
  Q8_1:{
    question: "Q-8.1) Does the project actively focus on governance aspects of natural resources within the landscape?",
    questionId: "Q8_1"
  },
  Q8_2:{
    question: "Q-8.2) Does the project actively focus on governance aspects related to equity and justice for producers and other stakeholders in the food system?",
    questionId: "Q8_2"
  },
  Q9_1:{
    question: "Q-9.1) Ecosystem support",
    questionId: "Q9_1"
  },
  Q9_2:{
    question: "Q-9.2) Economic system support: agriculture",
    questionId: "Q9_2"
  },
  Q9_3:{
    question: "Q-9.3) Economic system support: agribusiness",
    questionId: "Q9_3"
  },
  Q9_4:{
    question: "Q-9.4) Energy system support",
    questionId: "Q9_4"
  },
  Q9_5:{
    question: "Q-9.5) Others (if relevant): human system, health system",
    questionId: "Q9_5"
  },
  Q9_6:{
    question: "Q-9.6) Which principles of AE are under active focus of the project?",
    questionId: "Q9_6"
  },
  Q10_1:{
    question: "Q-10.1) Does the project actively focus on addressing gender specific challenges?",
    questionId: "Q10_1"
  },
  Q10_2:{
    question: "Q-10.2) Does the project actively focus on enhancing agency of the poor, marginalised and vulnerable population in decision making, workforce participation and equitable benefit sharing?",
    questionId: "Q10_2"
  },
  Q10_3:{
    question: "Q-10.3) Does the project actively focus on identifying and reducing negative impacts of the interventions?",
    questionId: "Q10_3"
  },
  Q10_4:{
    question: "Q-10.4) Does the project actively focus on co-creation and sharing of knowledge?",
    questionId: "Q10_4"
  },
  Q10_5:{
    question: "Q-10.5) Does the project actively focus on reducing the social disparities arising due to food system?",
    questionId: "Q10_5"
  },
  Q10_6:{
    question: "Q-10.6) Does the project actively focus on adequacy and quality of food available to needy and the vulnerable segments of the society within the landscape?",
    questionId: "Q10_6"
  },
  Q10_7:{
    question: "Q-10.7) Does the project actively focus on ensuring food sovereignty among the producers?",
    questionId: "Q10_7"
  },
  Q10_8:{
    question: "Q-10.8) Does the project actively focus on identifying the opportunities for participation and accrual of benefits to various social segments from the food system?",
    questionId: "Q10_8"
  },
  Q10_9:{
    question: "Q-10.9) Does the project actively focus on ensuring equality in terms of benefit sharing within the food systems within the landscape?",
    questionId: "Q10_9"
  },
  Q10_10:{
    question: "Q-10.10) Does the project actively focus on creating socio-cultural linkages within different social groups within a landscape?",
    questionId: "Q10_10"
  },
  Q10_11:{
    question: "Q-10.11) Does the project actively focus on promoting platforms, organisations or groups of people to develop, govern and manage the food systems at the local levels?",
    questionId: "Q10_11"
  }


};

const PATHWAY_ORDER = [
  'Pathway1', 'Pathway2', 'Pathway3', 'Pathway4', 'Pathway5',
  'Pathway6', 'Pathway7', 'Pathway8', 'Pathway9', 'Pathway10'
];

const downloadDetailedSpreadsheet = async () => {
  try {
    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      console.error('User document not found');
      return;
    }

    const project = userDoc.data().projects.find(p => p.id === projectId);
    if (!project || !project.sections) {
      console.error('Project or sections not found');
      return;
    }

    // Create detailed data structure
    let detailedData = [];

    // Style configurations
    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "4472C4" } },
      alignment: { horizontal: "center", vertical: "center", wrapText: true },
      border: {
        top: { style: "thin" },
        right: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" }
      }
    };

    const cellStyle = {
      alignment: { horizontal: "center", vertical: "center", wrapText: true },
      border: {
        top: { style: "thin" },
        right: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" }
      }
    };

    // Sort pathways and process data
    PATHWAY_ORDER.forEach((pathwayKey) => {
      const pathwayData = project.sections[pathwayKey];
      if (!pathwayData) return;

      // Get all questions for this pathway and sort them
      const questions = Object.entries(pathwayData)
        .filter(([questionKey]) => PREDEFINED_PATHWAY_QUESTIONS[questionKey])
        .sort(([keyA], [keyB]) => {
          const numA = parseInt(keyA.match(/\d+/g).join(''));
          const numB = parseInt(keyB.match(/\d+/g).join(''));
          return numA - numB;
        });

      questions.forEach(([questionKey, questionData]) => {
        if (PREDEFINED_PATHWAY_QUESTIONS[questionKey]) {
          detailedData.push({
            Pathway: pathwayKey,
            'Question ID': questionKey,
            Question: PREDEFINED_PATHWAY_QUESTIONS[questionKey].question,
            Status: questionData.answer || 'Not Set',
            Notes: questionData.observation || ''
          });
        }
      });
    });

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(detailedData);

    // Set column widths
    worksheet['!cols'] = [
      { wch: 15 },  // Pathway
      { wch: 12 },  // Question ID
      { wch: 85 },  // Question
      { wch: 15 },  // Status
      { wch: 30 }   // Notes
    ];

    // Apply styles and merge cells for pathways
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    let currentPathway = '';
    let startRow = 1; // Skip header row

    // Apply header styles
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!worksheet[address]) continue;
      worksheet[address].s = headerStyle;
    }

    // Apply cell styles and merge pathway cells
    for (let R = 1; R <= range.e.r; ++R) {
      const pathwayCell = worksheet[XLSX.utils.encode_cell({ r: R, c: 0 })];

      if (pathwayCell) {
        const pathwayValue = pathwayCell.v;

        // Apply style to all cells in the row
        for (let C = 0; C <= range.e.c; ++C) {
          const address = XLSX.utils.encode_cell({ r: R, c: C });
          if (!worksheet[address]) continue;
          worksheet[address].s = cellStyle;
        }

        // Handle pathway cell merging
        if (pathwayValue !== currentPathway) {
          if (R > startRow) {
            worksheet['!merges'] = worksheet['!merges'] || [];
            worksheet['!merges'].push({
              s: { r: startRow, c: 0 },
              e: { r: R - 1, c: 0 }
            });
          }
          currentPathway = pathwayValue;
          startRow = R;
        }
      }
    }

    // Merge the last pathway section
    if (startRow < range.e.r) {
      worksheet['!merges'] = worksheet['!merges'] || [];
      worksheet['!merges'].push({
        s: { r: startRow, c: 0 },
        e: { r: range.e.r, c: 0 }
      });
    }

    // Create summary data
    const summaryData = PATHWAY_ORDER.map(pathway => {
      const data = project.sections[pathway] || {};
      const counts = {
        Completed: 0,
        Ongoing: 0,
        Planned: 0,
        'Not in Focus': 0
      };

      Object.values(data).forEach(question => {
        if (question.answer) {
          counts[question.answer] = (counts[question.answer] || 0) + 1;
        }
      });

      return {
        Pathway: pathway,
        ...counts,
        'Total Questions': Object.values(counts).reduce((a, b) => a + b, 0)
      };
    });

    const summarySheet = XLSX.utils.json_to_sheet(summaryData);

    // Apply styles to summary sheet
    const summaryRange = XLSX.utils.decode_range(summarySheet['!ref']);
    for (let R = summaryRange.s.r; R <= summaryRange.e.r; ++R) {
      for (let C = summaryRange.s.c; C <= summaryRange.e.c; ++C) {
        const address = XLSX.utils.encode_cell({ r: R, c: C });
        if (!summarySheet[address]) continue;
        summarySheet[address].s = R === 0 ? headerStyle : cellStyle;
      }
    }

    // Create workbook and add sheets
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Detailed Status');
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

    // Export the file
    XLSX.writeFile(workbook, `${projectName}_Pathway_Analysis_Detailed.xlsx`);
  } catch (error) {
    console.error('Error generating spreadsheet:', error);
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
         <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 mx-auto" style={{maxWidth: '70%'}}>
          <div
            id="review-modal-content"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-3/4 h-5/6 p-6 relative flex flex-col justify-between"
            style={{
              maxWidth: '100%',
              overflow: 'hidden',
              boxSizing: 'border-box',
              margin: '0 auto',
              padding: '16px',
              transform: 'scale(1)',
              transformOrigin: 'top left',
              width: '100%',
            }}
          >
            {/* Header Section */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-300 dark:border-gray-700">
              <img src={gizLogo} alt="GIZ Logo" className="h-8 w-auto" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex-grow text-center tracking-wider">
                Review Responses of <span className="tracking-wider">{projectName}</span>
              </h2>
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
           <div className="max-w-7xl mx-auto px-2 sm:px-4">
    <div className="py-2 sm:py-3 space-y-2 sm:space-y-3">
      {/* Project Name Section */}
      <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-2">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">
          Project: <span className="font-bold text-blue-600 dark:text-blue-400">{projectName}</span>
        </h3>
      </div>

      {/* Buttons Container */}
      <div className="flex justify-center items-center gap-2 sm:gap-3 pt-2">
        {/* Download Spreadsheet Button */}
        <button
          onClick={downloadDetailedSpreadsheet}
          className="p-2 sm:px-4 sm:py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          title="Download Spreadsheet"
        >
          <FaFileExcel className="text-lg sm:text-base" />
          <span className="hidden sm:inline text-sm">Download Spreadsheet</span>
        </button>

        {/* Download Survey Button */}
        <button
          onClick={async () => {
            const element = document.getElementById('review-modal-content');
            await prepareChartsForPDF();
            const opt = {
              margin: 0.2,
              filename: `Survey_Review_of_${projectName}.pdf`,
              image: { type: 'jpeg', quality: 0.99 },
              html2canvas: {
                scale: 4,
                useCORS: true,
              },
              jsPDF: {
                unit: 'in',
                format: 'letter',
                orientation: 'landscape',
              },
            };
            html2pdf().set(opt).from(element).save();
          }}
          className="p-2 sm:px-4 sm:py-2 rounded-md bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          title="Download Survey"
        >
          <FaFileDownload className="text-lg sm:text-base" />
          <span className="hidden sm:inline text-sm">Download Survey</span>
        </button>

        {/* Submit Button */}
        <button
          onClick={() => {
            window.location.href = "/dashboard";
          }}
          className="p-2 sm:px-4 sm:py-2 rounded-md bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          title="Submit"
        >
          <FaCheck className="text-lg sm:text-base" />
          <span className="hidden sm:inline text-sm">Submit</span>
        </button>
      </div>
    </div>
  </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pathway10;