import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AestheticLoader from '../components/AestheticLoader';
import gizLogo from '../assets/safsym.png';
import photo1 from '../assets/photo1-giz.jpg';
import photo2 from '../assets/photo2-giz.png';
import { motion } from 'framer-motion';
import report from '../assets/Project_Report(Giz).pdf';
import { FaDownload } from 'react-icons/fa'; // Import the download icon


const Home = () => {
  const [loading, setLoading] = useState(true);
  const [readMore, setReadMore] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const downloadButtonRef = useRef(null);

  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      setShowFloatingButton(!entry.isIntersecting); // Show floating button when download button is out of view
    },
    { threshold: 1.0 } // Trigger only when fully out of view
  );

  if (downloadButtonRef.current) {
    observer.observe(downloadButtonRef.current);
  }

  return () => {
    if (downloadButtonRef.current) {
      observer.unobserve(downloadButtonRef.current);
    }
  };
}, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggleReadMore = (sectionId) => {
    setReadMore(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const truncateText = (text, sectionId) => {
    const words = text.split(' ');
    if (words.length > 100) {
      if (readMore[sectionId]) {
        return (
          <div>
            {text}
            <button 
              onClick={() => toggleReadMore(sectionId)}
              className="ml-2 text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
            >
              Read Less
            </button>
          </div>
        );
      }
      return (
        <div>
          {words.slice(0, 100).join(' ')}...
          <button 
            onClick={() => toggleReadMore(sectionId)}
            className="ml-2 text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
          >
            Read More
          </button>
        </div>
      );
    }
    return text;
  };


  const tables = [
    {
      title: "10 Pathways for Food Systems Transformation through Agroecology",
      headers: ["Pathway", "Explanation"],
      rows: [
        ["Production Systems", "If the primary production systems of agricultural and food products – focussing on small-scale producers, herders, and fisher folk – are based on an efficient use and recyclingof local renewable resources, reduction of external inputs, preservation of soil health, animal health, biodiversity, and diversification without destroying hunters’, gatherers’ and indigenous people’s livelihoods, then more sustainably produced and nutritious food is available and accessible for the primary producers."],
        ["Agroecosystems' Synergy", "If positive ecological interaction, integration and complementarity among the elements of agroecosystems (animals, crops, trees, soil and water) with a landscape approach can create synergies, then the effects for sustainable food supply will be even further enhanced."],
        ["Food Supply Chain", "If in addition to the primary production, storage and trade, packaging and processing, retail and marketing of food also follow the principles of recycling and reduction of external inputs and will ensure food quality and safety while preventing food losses, then the whole food supply chain will be more sustainable. Markets need to ensure physical access to acceptable and affordable food (economic access) for those consumers who do not produce themselves. Appropriate information, guidelines and advertising can and must be designed to support this connectivity and fairness as well as the functioning of markets. A proactive approach to connectivity links producers and consumers both in rural areas and from rural to urban areas and ensures proximity and confidence between them (i) through promotion of fair and short distribution networks and market access and (ii) by re-embedding food systems into local economies."],
        ["Economic Gains", "If these changes in the food supply chain can be realised, then farmers and other business actors can save on external inputs and realise economic gains that can be invested in further improvements in agroecology and improved diets or other elements of the food system."],
        ["Economic Diversification", "If economic diversification of on-farm incomes is realised, then small-scale farmers have greater financial independence, value addition opportunities, and choices while enabling them to respond to demand from consumers."],
        ["Food Consumption Behaviour ", "If the consumer behaviour positively reacts to the more sustainable and nutritious food supply, diets will be improved in quality, quantity, diversity, safety and adequacy – either directly through the consumption of own production or indirectly through savings from less external input or incomes that are generated in the food supply chain or through economic diversification (see pathway 4)."],
        ["Nutrition and Health", "Improved diets lead to better health and social outcomes, reducing malnutrition and related diseases."],
        ["Policy and Governance ", "If appropriate policy and governance, taking these agroecological principles and food systems dimensions into account, is ensured, then the chances for agroecological transformation of food systems to become a success are much higher than without such a favourable political environment"],
        ["Support System – AE Adoption ", "If other systems supporting food production/the food supply chains, e.g., economic systems (including agriculture and agribusiness) and energy systems, also apply the 13 principles of agroecology, then the transformative effects on food systems will even be stronger."],
        ["Inclusive Growth", "If these key elements of the ‘WHAT’ are realised in such a way (the ‘HOW’) that gender sensitivity, inclusiveness, do-no-harm, co-creation and sharing of knowledge and innovations, social values of local communities and provision of healthy, diversified, seasonally and culturally appropriate diets (see pathway 6), fairness (see pathway 1), connectivity (see pathway 1), strengthened social organization and participation in decision-making by food producers and consumers prevail, then the pathway to sustainable food systems is paved."],
      ],
    },
    {
      title: "Summary List of Principles against the Pathways",
      headers: ["Pathway", "Principles"],
      rows: [
        ["Pathway 1: Production Systems", "Recycling, Reduction of external inputs, Soil health, Animal health, Biodiversity, Connectivity, Fairness, Production systems, Availability of food, and Access to food"],
        ["Pathway 2: Agroecosystems' Synergy", "Synergies "],
        ["Pathway 3: Food supply chain", "Storage and trade, Packaging and processing, Retail and marketing, Recycling, Reduction of external inputs, Food supply chains, Physical access to food, Economic access to food (affordability), Acceptability, ‘Promotion, information, guidelines & advt.’, Connectivity, and Fairness "],
        ["Pathway 4: Economic gains", "Economic gains "],
        ["Pathway 5: Economic diversification", "Economic diversification "],
        ["Pathway 6: Food Consumption Behaviour", "Consumer behaviour, Diets, Promotion, Information, and Guidelines and advertising"],
        ["Pathway 7: Nutrition & Health", "Nutrition outcomes, Health outcomes (diet related), Broader economic impacts, Broader social impacts, and Broader environmental impacts"],
        ["Pathway 8: Policy and Governance", "Policy integration for sustainable agroecology adoption"],
        ["Pathway 9: Support systems – AE adoption", "Systems supporting food production/food supply chains, and 13 principles of AE (as relevant)"],
        ["Pathway 10: Inclusive Growth", "Gender Sensitivity, Inclusiveness, Do-no-harms, Co-creation of knowledges, Social values, Diets (healthy, diversified, seasonally and culturally appropriate), Acceptability, Fairness, Connectivity, and Participation "],
      ],
    },
  ];


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <AestheticLoader size="lg" />
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  

  return (

    
  <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
    {/* Navbar */}
<nav className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-xl border-b border-red-200/20 dark:border-red-500/10 backdrop-blur-lg sticky top-0 z-50">
  <div className="container mx-auto px-4 py-3 md:py-4">
    <div className="flex justify-between items-center">
      {/* Logo Container */}
      <div className="flex items-center space-x-2">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <img 
            src={gizLogo} 
            alt="GIZ Logo" 
            className="h-8 md:h-12 w-auto relative transform group-hover:scale-105 transition duration-300" 
          />
        </div>
      </div>

      {/* Right side - can be used for additional nav items */}
      <div className="flex items-center space-x-4">
        {/* Add navigation items here if needed */}
      </div>
    </div>
  </div>
</nav>

    {/* Main Content */}
   <div className="container mx-auto px-4 md:px-8 py-8 md:py-16">
  {/* Animated Header */}
  <motion.h1
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: 'easeInOut' }}
    className="text-3xl md:text-5xl font-extrabold text-center mb-8 md:mb-16 
               bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent py-2 md:py-4 
               shadow-lg hover:shadow-2xl transition-shadow duration-500"
  >
    Mapping Tool - Integrated Framework for Sustainable Agricultural & Food Systems Transformation
  </motion.h1>

  {/* Centered Link with Animation */}
  <div className="flex justify-center mb-8 md:mb-16">
    <Link
      to="/login"
      className="px-8 py-4 md:px-10 md:py-5 text-lg md:text-2xl font-medium text-white rounded-lg 
                 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 
                 transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/50"
    >
      Take a Survey of your Project
    </Link>
  </div>
  <div ref={downloadButtonRef} className="flex justify-center mb-8">
  <button className="px-8 py-4 text-lg font-medium text-white rounded-lg 
                     bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 
                     transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/50 
                     shadow-lg hover:shadow-2xl flex items-center space-x-2">
    <FaDownload className="text-white" /> {/* Download icon */}
    <a href={report} download="report" className="inline-block">
      Download: Tool Description
    </a>
  </button>
</div>
      

        {/* About Section */}
       <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900 p-8 rounded-2xl border border-red-500/30 backdrop-blur-xl relative overflow-hidden group">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:30px_30px]" />
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-red-500/10 dark:bg-red-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-red-400/10 dark:bg-red-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Header section */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 p-6 rounded-xl text-center transform group-hover:scale-[1.02] transition-all duration-500 relative z-10 border border-red-200/20 dark:border-white/10">
        <h2 className="text-3xl font-bold tracking-wider text-white">Purpose of this Tool</h2>
      </div>
      
      {/* Content section */}
      <div className="bg-white/80 dark:bg-white/5 p-8 rounded-xl mt-6 backdrop-blur-xl border border-red-200/20 dark:border-white/10 relative z-10">
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-100">
            <span className="float-left text-8xl font-serif mr-4 mt-1 leading-[0.8] text-red-600 dark:text-red-500">
              T
            </span>
            he purpose of this tool is to present the results of a mapping exercise on developmental projects across the Asia-Pacific region.
            It highlights how these projects are implementing sustainable farming practices through the Food Systems  framework.
            This tool is intended to help programs to apply principles and activities related to sustainable agriculture and food systems by showcasing practical pathways.
            It also aims to foster learning in various projects to build stronger, more sustainable food systems in the region.
          </p>
        </div>
      </div>
      
      {/* Interactive highlight effects */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-400/5 dark:from-red-500/10 dark:to-red-400/10 rounded-2xl" />
      </div>
    </div>

       {/* <div className="flex justify-center my-12">
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-7/12 xl:w-7/12"
  >
    <img
      src={photo1}
      alt="Descriptive Alt Text"
      className="w-full rounded-lg shadow-lg transition-shadow duration-500 hover:shadow-2xl"
    />
  </motion.div>
</div> */}
      {/* Image Display */}
      <div className="flex justify-center my-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-7/12 xl:w-7/12 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={photo1}
            alt="Descriptive Alt Text"
            className="w-full rounded-lg shadow-lg transition-shadow duration-500 hover:shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-4/5" // 80% of the screen width
          >
            <img
              src={photo1}
              alt="Zoomed Image"
              className="w-full rounded-lg"
            />
          </motion.div>
        </div>
      )}

{/* Background Section */}
<div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900 p-8 rounded-2xl border border-red-500/30 backdrop-blur-xl relative overflow-hidden group">
  {/* Animated background elements */}
  <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:30px_30px]" />
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-red-500/10 dark:bg-red-500/20 rounded-full blur-3xl animate-pulse" />
  <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-red-400/10 dark:bg-red-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

  {/* Header section */}
  <div className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 p-6 rounded-xl text-center transform group-hover:scale-[1.02] transition-all duration-500 relative z-10 border border-red-200/20 dark:border-white/10">
    <h2 className="text-2xl font-bold tracking-wider text-white">Background - The Genesis</h2>
  </div>

  {/* Content section */}
  <div className="bg-white/80 dark:bg-white/5 p-8 rounded-xl mt-6 backdrop-blur-xl border border-red-200/20 dark:border-white/10 relative z-10">
    <div className="space-y-6">
      <span className="float-left text-8xl font-serif mr-4 mt-1 leading-[0.8] text-red-600 dark:text-red-500">
              T
            </span>
      <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-100">
        he global shift towards comprehensive and holistic approaches to agriculture and food systems is rapidly gaining traction. Notable initiatives, such as BMZ's flagship program, <em className="text-red-600 dark:text-red-500">"Transformation of Agricultural and Food Systems"</em>, and its Asia Strategy, exemplify this evolving paradigm. Similarly, within GIZ India, the Environment, Climate Change & Biodiversity Cluster prioritizes sustainable development and ecological principles to conserve natural resources and address resource degradation, ultimately aiming to enhance human quality of life.
      </p>
      
      <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-100">
      Building on insights from the GIZ India Green Cluster analysis, the Working Group (WG) on Agriculture conducted a mapping exercise for relevant GIZ projects in the Asia-Pacific region. This exercise utilized an integrated framework that combined a theory of change narrative with a Sustainable Agriculture and Food Systems approach to outline pathways for sustainable food systems transformation.
      </p>
      
      <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-100">
      This framework was developed collaboratively by GIZ India's Food Systems Transformation (FST) core group, an international expert and an Indian Consultant, incorporating input from project teams, sector experts, GIZ HQ sector projects (Food and Nutrition Security and Agroecology), and international agencies.
      </p>
    </div>
  </div>

  {/* Interactive highlight effects */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-400/5 dark:from-red-500/10 dark:to-red-400/10 rounded-2xl" />
  </div>
</div>
        

        {/* Theory of Change Section */}
<div className="mt-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900 p-8 rounded-2xl border border-red-500/30 backdrop-blur-xl relative overflow-hidden group">
  {/* Animated background elements */}
  <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:30px_30px]" />
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-red-500/10 dark:bg-red-500/20 rounded-full blur-3xl animate-pulse" />
  <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-red-400/10 dark:bg-red-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

  {/* Header section */}
  <div className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 p-6 rounded-xl text-center transform group-hover:scale-[1.02] transition-all duration-500 relative z-10 border border-red-200/20 dark:border-white/10">
    <h2 className="text-2xl font-bold tracking-wider text-white">Theory of Change</h2>
  </div>

  {/* Content section */}
  <div className="bg-white/80 dark:bg-white/5 p-8 rounded-xl mt-6 backdrop-blur-xl border border-red-200/20 dark:border-white/10 relative z-10">
    <div className="space-y-6">
      <span className="float-left text-8xl font-serif mr-4 mt-1 leading-[0.8] text-red-600 dark:text-red-500">
              T
            </span>
      <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-100">
        he Theory of Change (ToC) within the <span className="text-red-600 dark:text-red-500">Integrated Sustainable Agriculture and Food Systems Framework (SA-FS Framework)</span> outlines 10 key pathways that are necessary for achieving transformation, focussing on crucial aspects such as sustainable and resilient production systems, efficient and inclusive supply chain management, connecting consumers and producers, addressing food security and nutrition, and strengthening policy environment. 
      </p>
      
      <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-100">
      Each pathway has derived from Sub-dimensions of the food systems framework and the 13 agroecological principles outlined by the HLPE. 
      </p>
      
      <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-100">
      10 Pathways for Food Systems Transformation through Agroecology (formulated as hypotheses) are elaborated in the following table.
      </p>
    </div>
  </div>

  {/* Interactive highlight effects */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-400/5 dark:from-red-500/10 dark:to-red-400/10 rounded-2xl" />
  </div>
</div>

        {/* Enhanced Tables Section */}
<div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900 p-8 rounded-2xl border border-red-500/30 backdrop-blur-xl relative overflow-hidden group mt-12">
  {/* Animated background elements */}
  <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:30px_30px]" />
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-red-500/10 dark:bg-red-500/20 rounded-full blur-3xl animate-pulse" />
  <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-red-400/10 dark:bg-red-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

  {/* Table Navigation */}
  <div className="flex justify-center mb-6 relative z-10">
    {tables.map((table, index) => (
      <button
        key={index}
        onClick={() => setActiveTab(index)}
        className={`
          px-6 py-3 md:px-8 md:py-4 text-sm md:text-lg font-medium rounded-xl mr-2 md:mr-4 
          transition-all duration-300 transform hover:scale-105
          border border-red-200/20 dark:border-white/10 backdrop-blur-sm
          ${
            activeTab === index
              ? 'bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white shadow-lg'
              : 'bg-white/80 dark:bg-white/5 text-gray-700 dark:text-gray-200 hover:bg-red-50/80 dark:hover:bg-red-900/20'
          }
        `}
      >
        {table.title}
      </button>
    ))}
  </div>

  {/* Table Content */}
  {tables.map((table, index) => (
    <motion.div
      key={index}
      initial={false}
      animate={{
        opacity: activeTab === index ? 1 : 0,
        x: activeTab === index ? 0 : 20,
      }}
      className={`relative z-10 ${activeTab === index ? 'block' : 'hidden'}`}
    >
      <div className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-xl overflow-hidden border border-red-200/20 dark:border-white/10 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm md:text-base">
            <thead>
              <tr className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700">
                {table.headers.map((header, i) => (
                  <th
                    key={i}
                    className="px-4 md:px-6 py-3 md:py-4 text-center text-white font-semibold tracking-wider text-lg md:text-xl"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-red-100/20 dark:divide-gray-700">
              {table.rows.map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-colors duration-200"
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="px-4 md:px-6 py-3 md:py-4 text-gray-700 dark:text-gray-200 text-center text-base md:text-lg"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  ))}

  {/* Interactive highlight effects */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-400/5 dark:from-red-500/10 dark:to-red-400/10 rounded-2xl" />
  </div>
</div>

            {/* Methodology Section */}
<div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900 p-8 rounded-2xl border border-red-500/30 backdrop-blur-xl relative overflow-hidden group mt-12">
  {/* Animated background elements */}
  <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:30px_30px]" />
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-red-500/10 dark:bg-red-500/20 rounded-full blur-3xl animate-pulse" />
  <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-red-400/10 dark:bg-red-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

  {/* Header section */}
  <div className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 p-6 rounded-xl text-center transform group-hover:scale-[1.02] transition-all duration-500 relative z-10 border border-red-200/20 dark:border-white/10">
    <h2 className="text-2xl font-bold tracking-wider text-white">Methodology for FS/AE Project Profiling</h2>
  </div>

  {/* Content section */}
  <div className="bg-white/80 dark:bg-white/5 p-8 rounded-xl mt-6 backdrop-blur-xl border border-red-200/20 dark:border-white/10 relative z-10">
    <div className="space-y-8">
      {/* Introduction */}
      <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-100">
        A tailored methodology was developed to align with the FS/AE framework, employing a self-appreciative inquiry approach. This approach empowers participating projects to share relevant data, which is systematically analyzed and compiled to support the dissemination of FS/AE perspectives among project stakeholders.
      </p>

      {/* Framework Basis */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-red-600 dark:text-red-500">Framework Basis and Questionnaire Design</h3>
        <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-100">
          The SA/FS framework forms the foundation of this methodology, featuring 10 pathways (outlined in the previous section) and 46 principles that are further subdivided into 57 actionable activities promoting agroecology. Each activity is crafted into a question to assess its relevance and applicability to projects. The questionnaire remains adaptable, allowing customization to address specific sector needs while preserving its core pathways and principles. Most questions are close-ended, enabling respondents to select predefined options or input numerical values.
        </p>
        
        <div className="relative group mt-6 mb-8">
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img 
              src={photo2} 
              alt="Framework Illustration" 
              className="w-full transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        
        <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-100">
          This methodology encourages voluntary participation from projects and stakeholders. An open call can be issued to invite relevant participants across the region or beyond. Project teams are encouraged to assign 2–3 members to collaborate with the consultant and ensure accurate and comprehensive data collection through the questionnaire.
        </p>
      </div>

      {/* Tool Development */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-red-600 dark:text-red-500">Tool Development and Analysis Plan</h3>
        <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-100">
          A structured digital tool has been designed to facilitate the data collection process. This tool allows respondents to efficiently input data, with all responses being automatically saved for analysis. The digital approach ensures streamlined data management and enhances the overall accuracy of findings.
        </p>
      </div>

      {/* Method for Questionnaire */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-red-600 dark:text-red-500">Method to Fill the Questionnaire</h3>
        <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-100">
          Respondents are advised to carefully read each question and categorize activities as ongoing, planning, completed, or not in focus. To ensure accurate and detailed responses, project teams should involve multiple members and consult the advisor when clarification is needed.
        </p>
      </div>
    </div>
  </div>

  {/* Interactive highlight effects */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-400/5 dark:from-red-500/10 dark:to-red-400/10 rounded-2xl" />
  </div>
</div>


          {/* Dos and Don'ts Section */}
<div className="mt-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900 p-8 rounded-2xl border border-red-500/30 backdrop-blur-xl relative overflow-hidden group">
 {/* Animated background elements */}
 <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:30px_30px]" />
 <div className="absolute -top-20 -left-20 w-72 h-72 bg-red-500/10 dark:bg-red-500/20 rounded-full blur-3xl animate-pulse" />
 <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-red-400/10 dark:bg-red-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

 {/* Header section */}
 <div className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 p-6 rounded-xl text-center transform group-hover:scale-[1.02] transition-all duration-500 relative z-10 border border-red-200/20 dark:border-white/10">
   <h2 className="text-2xl font-bold tracking-wider text-white">Dos and Don'ts</h2>
 </div>

 {/* Table section */}
 <div className="bg-white/80 dark:bg-white/5 p-8 rounded-xl mt-6 backdrop-blur-xl border border-red-200/20 dark:border-white/10 relative z-10">
   <div className="overflow-x-auto">
     <table className="min-w-full">
       <thead>
         <tr className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700">
           <th className="px-6 py-4 text-left text-lg font-semibold text-white tracking-wider">Dos</th>
           <th className="px-6 py-4 text-left text-lg font-semibold text-white tracking-wider">Don'ts</th>
         </tr>
       </thead>
       <tbody className="divide-y divide-red-100/20 dark:divide-gray-700">
         <tr className="hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-colors duration-200">
           <td className="px-6 py-4 text-gray-800 dark:text-gray-100 text-lg">
             Carefully read each question before answering.
           </td>
           <td className="px-6 py-4 text-gray-800 dark:text-gray-100 text-lg">
             Do not skip questions or leave responses blank.
           </td>
         </tr>
         <tr className="hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-colors duration-200">
           <td className="px-6 py-4 text-gray-800 dark:text-gray-100 text-lg">
             Involve team members for accurate inputs.
           </td>
           <td className="px-6 py-4 text-gray-800 dark:text-gray-100 text-lg">
             Avoid guessing or assuming information.
           </td>
         </tr>
         <tr className="hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-colors duration-200">
           <td className="px-6 py-4 text-gray-800 dark:text-gray-100 text-lg">
             Provide responses that reflect the current status accurately.
           </td>
           <td className="px-6 py-4 text-gray-800 dark:text-gray-100 text-lg">
             Do not overstate or exaggerate activities.
           </td>
         </tr>
         <tr className="hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-colors duration-200">
           <td className="px-6 py-4 text-gray-800 dark:text-gray-100 text-lg">
             Wherever needed, include observations with examples.
           </td>
           <td className="px-6 py-4 text-gray-800 dark:text-gray-100 text-lg">
             Do not rush through the questionnaire.
           </td>
         </tr>
       </tbody>
     </table>
   </div>
 </div>

 {/* Interactive highlight effects */}
 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
   <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-400/5 dark:from-red-500/10 dark:to-red-400/10 rounded-2xl" />
 </div>
</div>
    </div>

         <div className="mt-6 md:mt-12 text-center">
          <Link
            to="/login"
            className="inline-block px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl text-white rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition transform hover:scale-105 animate-bounce"
          >
            Take a Survey of your Project
          </Link>
        </div>

    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-8 md:mt-16 py-8 md:py-12">
  <div className="container mx-auto px-4 md:px-8">
    <div className="flex flex-wrap justify-center md:justify-between text-center md:text-left">
      {/* Logo and Description */}
      <div className="w-full md:w-1/3 mb-8 md:mb-0">
        <img
          src={gizLogo}
          alt="GIZ Logo"
          className="h-10 md:h-14 w-auto mx-auto md:mx-0 mb-4 hover:scale-110 transition-transform duration-300"
        />
        <p className="text-sm md:text-base text-gray-400 hover:text-gray-300 transition duration-300">
          Sustainable Agriculture & Food System Mapping Tool
        </p>
      </div>

      {/* Contact Section */}
      <div className="w-full md:w-1/3 mb-8 md:mb-0">
        <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-300 border-b border-gray-600 pb-2">
          Contact
        </h3>
        <p className="text-sm text-gray-400">Sudhir Shukla</p>
        <p className="text-sm text-gray-400">Email:</p>
        <p className="text-sm">
          <a
            href="mailto:admin@ecociate.com?subject=SAFSYM&priority=high"
            className="text-red-400 hover:text-red-300 transition duration-300"
          >
            admin@ecociate.com
          </a>
        </p>
        <p className="text-sm">
          <a
            href="mailto:sudhir@ecociate.com?subject=SAFSYM&priority=high"
            className="text-red-400 hover:text-red-300 transition duration-300"
          >
            sudhir@ecociate.com
          </a>
        </p>
      </div>

      {/* Links Section */}
      <div className="w-full md:w-1/3">
        <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-300 border-b border-gray-600 pb-2">
          Links
        </h3>
        <ul className="text-sm text-gray-400">
          <li className="mb-2">
            <a
              href="#"
              className="hover:text-red-300 transition duration-300"
            >
              Privacy Policy
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="hover:text-red-300 transition duration-300"
            >
              Terms of Service
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-red-300 transition duration-300"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="text-center mt-8 pt-8 border-t border-gray-700">
      <p className="text-xs md:text-sm text-gray-400 hover:text-gray-300 transition duration-300">
        &copy; 2024 SAFSYM. All rights reserved.
      </p>
    </div>
  </div>
</footer>

{showFloatingButton && (
  <div className="fixed sm:bottom-24 bottom-20 right-6">
    <a
      href={report}
      download="Project_Report(Giz).pdf"
      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 shadow-lg transition-transform transform hover:scale-110"
    >
      <FaDownload className="text-white text-2xl animate-pulse" />
    </a>
  </div>
)}
  </div>

);
};

export default Home;

