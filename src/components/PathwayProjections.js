import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Bar, Pie, Line, Radar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { 
  ChevronDown, 
  ChevronUp, 
  BarChart, 
  PieChart, 
  LineChart, 
  RadarIcon,
  AlertCircle 
} from 'lucide-react';

  const convertChartsToImages = async () => {
    const canvasElements = document.querySelectorAll('canvas');
    canvasElements.forEach((canvas) => {
      const imageData = canvas.toDataURL('image/png');
      const img = document.createElement('img');
      img.src = imageData;
      img.style.width = canvas.style.width; // Preserve original width
      img.style.height = canvas.style.height; // Preserve original height
      canvas.parentNode.replaceChild(img, canvas);
    });
  };

  // Expose this method for external PDF preparation
  export const prepareForPDF = async () => {
    await convertChartsToImages();
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

const GraphTypeIcons = {
  Bar: BarChart,
  Pie: PieChart,
  Line: LineChart,
  Radar: RadarIcon
};

const INTERVENTION_STATUS_COLORS = {
  Planned: 'text-orange-600',
  'Not in Focus': 'text-red-600'
};

const PathwayProjections = ({ projectId, trigger }) => {
  const [projectData, setProjectData] = useState(null);
  const [activityCounts, setActivityCounts] = useState({});
  const [interventionList, setInterventionList] = useState([]);
  const [graphType, setGraphType] = useState('Bar');
  const [expanded, setExpanded] = useState({
    overallStatus: false,
    activityStatus: false,
    interventions: false,
  });

  const generatePieChartData = () => {
    const pathwayColors = [
      'rgba(255, 99, 132, 0.6)',   // Red
      'rgba(54, 162, 235, 0.6)',   // Blue
      'rgba(255, 206, 86, 0.6)',   // Yellow
      'rgba(75, 192, 192, 0.6)',   // Teal
      'rgba(153, 102, 255, 0.6)',  // Purple
      'rgba(255, 159, 64, 0.6)',   // Orange
      'rgba(199, 199, 199, 0.6)',  // Grey
      'rgba(83, 102, 255, 0.6)',   // Indigo
      'rgba(40, 159, 64, 0.6)',    // Green
      'rgba(210, 99, 132, 0.6)'    // Dark Pink
    ];

    const orderedPathways = PATHWAY_ORDER.filter(key => activityCounts[key]);

    // Calculate total activities per pathway
    const pathwayTotals = orderedPathways.map((key) => 
      Object.values(activityCounts[key]).reduce((acc, value) => acc + value, 0)
    );

    return {
      labels: orderedPathways,
      datasets: [
        {
          label: 'Total Activities per Pathway',
          data: pathwayTotals,
          backgroundColor: pathwayColors.slice(0, orderedPathways.length),
          borderColor: pathwayColors.slice(0, orderedPathways.length).map(color => color.replace('0.6', '1')),
          borderWidth: 1
        },
      ],
    };
  };

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const project = userDoc
            .data()
            .projects.find((p) => p.id === projectId);

          if (project && project.sections) {
            setProjectData(project);
            calculateActivityStatus(project.sections);
          }
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjectData();
  }, [projectId, trigger]);

  const calculateActivityStatus = (sections) => {
    const activityStatus = {};
    const interventions = [];

    // Use the predefined order to ensure consistent pathway sorting
    PATHWAY_ORDER.forEach((key) => {
      if (sections[key]) {
        const pathwayActivities = sections[key];
        const counts = { 
          Completed: 0, 
          Ongoing: 0, 
          Planned: 0, 
          'Not Applicable': 0, 
          'Not in Focus': 0 
        };

        Object.entries(pathwayActivities).forEach(([questionKey, activity]) => {
          if (activity.answer) {
            counts[activity.answer] = (counts[activity.answer] || 0) + 1;
            if (activity.answer === 'Planned' || activity.answer === 'Not in Focus') {
              interventions.push({ 
                pathway: key, 
                activity: {
                  ...activity,
                  question: PREDEFINED_PATHWAY_QUESTIONS[questionKey]?.question || 'Unknown Question',
                  questionId: questionKey
                }
              });
            }
          }
        });

        activityStatus[key] = counts;
      }
    });

    setActivityCounts(activityStatus);
    setInterventionList(interventions);
  };

  const generateChartData = (statusKey) => {
  const pathwayColors = [
    'rgba(255, 99, 132, 0.6)',   // Red
    'rgba(54, 162, 235, 0.6)',   // Blue
    'rgba(255, 206, 86, 0.6)',   // Yellow
    'rgba(75, 192, 192, 0.6)',   // Teal
    'rgba(153, 102, 255, 0.6)',  // Purple
    'rgba(255, 159, 64, 0.6)',   // Orange
    'rgba(199, 199, 199, 0.6)',  // Grey
    'rgba(83, 102, 255, 0.6)',   // Indigo
    'rgba(40, 159, 64, 0.6)',    // Green
    'rgba(210, 99, 132, 0.6)'    // Dark Pink
  ];

  const statusColorMap = {
    'Completed': 'rgba(75, 192, 192, 0.6)',      // Teal
    'Ongoing': 'rgba(54, 162, 235, 0.6)',        // Blue
    'Planned': 'rgba(255, 206, 86, 0.6)',        // Yellow
    'Not Applicable': 'rgba(153, 102, 255, 0.6)',// Purple
    'Not in Focus': 'rgba(255, 99, 132, 0.6)'    // Red
  };

  // Use predefined order for labels
  const orderedLabels = PATHWAY_ORDER.filter(key => activityCounts[key]);

  // If pie chart is selected, return data for the specific status across all pathways
  if (graphType === 'Pie') {
    return {
      labels: orderedLabels,
      datasets: [
        {
          label: statusKey,
          data: orderedLabels.map((key) => activityCounts[key][statusKey] || 0),
          backgroundColor: pathwayColors.slice(0, orderedLabels.length),
          borderColor: pathwayColors.slice(0, orderedLabels.length).map(color => color.replace('0.6', '1')),
          borderWidth: 1
        },
      ],
    };
  }

  // Existing bar/line/radar chart logic with distinct status colors
  return {
    labels: orderedLabels,
    datasets: [
      {
        label: statusKey,
        data: orderedLabels.map((key) => activityCounts[key][statusKey] || 0),
        backgroundColor: statusColorMap[statusKey],
        borderColor: statusColorMap[statusKey].replace('0.6', '1'),
        borderWidth: 1
      },
    ],
  };
};

  const generateOverallPercentageData = () => {
    const orderedPathways = PATHWAY_ORDER.filter(key => activityCounts[key]);

    const pathwayCompletion = orderedPathways.map((key) => {
      const total = Object.values(activityCounts[key]).reduce((acc, value) => acc + value, 0);
      const completed = activityCounts[key]['Completed'] || 0;
      return { 
        pathway: key, 
        percentage: Math.round((completed / total) * 100) 
      };
    });

    return {
      labels: pathwayCompletion.map((p) => p.pathway),
      datasets: [
        {
          label: '% Completed',
          data: pathwayCompletion.map((p) => p.percentage),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
      ],
    };
  };

  const renderGraph = (data, graphType) => {
    const GraphComponent = {
      Bar: Bar,
      Pie: Pie,
      Line: Line,
      Radar: Radar
    }[graphType];

    return (
      <GraphComponent
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: `${graphType} Chart View`
            }
          }
        }}
        height={300}
      />
    );
  };

  const renderInterventionDetails = (activity) => {
    const details = [
      { label: 'Question', value: activity.question },
    //   { label: 'Question ID', value: activity.questionId },
      { label: 'Status', value: activity.answer },
      { label: 'Additional Notes', value: activity.notes || 'No additional notes' }
    ];

    return (
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
        {details.map((detail, idx) => (
          <div key={idx} className="mb-2">
            <span className="font-semibold text-blue-600 dark:text-blue-400 mr-2">
              {detail.label}:
            </span>
            <span className="text-gray-700 dark:text-gray-200">
              {detail.value}
            </span>
          </div>
        ))}
      </div>
    );
  };



  const GraphTypeSelector = () => (
    <div className="flex justify-center space-x-4 mb-4">
      {Object.keys(GraphTypeIcons).map((type) => {
        const Icon = GraphTypeIcons[type];
        return (
          <button
            key={type}
            onClick={() => setGraphType(type)}
            className={`p-2 rounded-full transition-all duration-300 ${
              graphType === type 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
            }`}
          >
            <Icon className="w-6 h-6" />
          </button>
        );
      })}
    </div>
  );

  if (!projectData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        Pathway Projections
      </h2>
    </div>

    {/* Overall Pathway Status */}
    <div className="mb-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(prev => ({ ...prev, overallStatus: !prev.overallStatus }))}
      >
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Overall Pathway Status
        </h3>
        {expanded.overallStatus ? <ChevronUp /> : <ChevronDown />}
      </div>
      
      {expanded.overallStatus && (
        <div className="mt-4">
          <GraphTypeSelector />
          <div className="h-80">
            {graphType === 'Pie' 
              ? renderGraph(generatePieChartData(), 'Pie')
              : renderGraph(generateOverallPercentageData(), graphType)
            }
          </div>
        </div>
      )}
    </div>

    {/* Activity Status */}
    <div className="mb-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(prev => ({ ...prev, activityStatus: !prev.activityStatus }))}
      >
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Activity Status by Type
        </h3>
        {expanded.activityStatus ? <ChevronUp /> : <ChevronDown />}
      </div>
      
      {expanded.activityStatus && (
        <div className="mt-4">
          <GraphTypeSelector />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Completed', 'Ongoing', 'Planned', 'Not Applicable', 'Not in Focus'].map((status) => (
              <div key={status} className="h-64">
                {renderGraph(generateChartData(status), graphType)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Interventions Section with Enhanced Styling */}
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(prev => ({ ...prev, interventions: !prev.interventions }))}
      >
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
          <AlertCircle className="mr-2 text-red-500" /> 
          Interventions Needed
        </h3>
        {expanded.interventions ? <ChevronUp /> : <ChevronDown />}
      </div>
      
      {expanded.interventions && (
        <div className="mt-4">
          {interventionList.length > 0 ? (
            <div className="space-y-4">
              {interventionList.map((intervention, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-600 p-4 rounded-lg shadow-md border-l-4 border-orange-500"
                >
                  <div className="flex items-center mb-2">
                    <span className="font-bold text-orange-600 dark:text-orange-400 mr-2">
                      {intervention.pathway}:
                    </span>
                    <span 
                      className={`font-semibold ${
                        INTERVENTION_STATUS_COLORS[intervention.activity.answer] || 'text-gray-600'
                      }`}
                    >
                      {intervention.activity.answer}
                    </span>
                  </div>
                  {renderInterventionDetails(intervention.activity)}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 flex items-center justify-center">
              <AlertCircle className="mr-2 text-green-500" />
              No interventions needed at this time.
            </p>
          )}
        </div>
      )}
    </div>
  </div>
);
};

export default PathwayProjections;