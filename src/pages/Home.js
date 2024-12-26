import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AestheticLoader from '../components/AestheticLoader';
import gizLogo from '../assets/safsym.png';
import photo1 from '../assets/photo1-giz.jpg';
import photo2 from '../assets/photo2-giz.jpg';
import { motion } from 'framer-motion';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [readMore, setReadMore] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggleReadMore = (index) => {
    setReadMore((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getContentWithDropCap = (text) => {
    if (!text) return '';
    return (
      <>
        <span className="float-left text-6xl font-bold text-red-700 mr-2 mt-2 leading-none">
          {text.charAt(0)}
        </span>
        {text.slice(1)}
      </>
    );
  };

  const content = [
    `The global movement toward systematic and holistic approaches to agriculture and food systems is gaining significant momentum. Initiatives such as BMZ's special initiative, "Transformation of Agricultural and Food Systems," and its Asia Strategy illustrate this shift. Similarly, within GIZ India, the Environment, Climate Change & Biodiversity Cluster prioritizes sustainable development and ecological principles to conserve natural resources and address resource degradation, ultimately aiming to enhance human quality of life.
      Building on insights from the GIZ India Green Cluster analysis, the Working Group (WG) on Agriculture conducted a mapping exercise for relevant GIZ projects in the Asia-Pacific region. This exercise utilized an integrated framework that combined a theory of change narrative with a Sustainable Agriculture and Food Systems approach to outline pathways for sustainable food systems transformation. This framework was developed collaboratively by GIZ India's Food Systems Transformation (FST) core group, an international expert and an Indian Consultant, incorporating input from project teams, sector experts, GIZ HQ sector projects (Food and Nutrition Security and Agroecology), and international agencies.`,

  `A methodology was developed to gather infrmation aligned with the FS/AE framework, using a self-appreciative inquiry approach. This approach enables participating projects to share relevant information, which is then analyzed and compiled. The findings aim to support the dissemination of FS/AE perspectives within project stakeholders..’.`,

  `There is neither a single consensual definition for agroecology nor an agreement on all the aspects embedded in this concept, a consolidated set of 13 principles – taking FAO’s 10 elements of agroecology into consideration – was elaborated by the High-level Panel of Experts (HLPE) on Food Security and Nutrition of the United Nations Committee on World Food Security (CFS) in 2019 (see Annex 1). Some of these principles are related to the agroecological management and development of agri-food systems (principles 1 through 7, i.e., recycling, input reduction, soil health, animal health, biodiversity, synergy, and economic diversification), others to the wider ranging socioeconomic, cultural and political approach (principles 8 through 13, i.e., co-creation of knowledge, social values and diets, fairness, connectivity, land and natural resource governance, and participation). The 13 principles thus integrate the ‘WHAT’ and the ‘HOW’ of a sustainable transformation of food systems. All agroecological principles contribute, in different direct and indirect ways, to food and nutrition security. The systematic integration of agroecological principles into the food systems framework has the potential to effectively support the progressive achievement of sustainable food and nutrition security as defined in the SDG 2. To make this a reality, multiple stakeholders from the public and private sector, civil society, academia, and parliaments need to work together at various levels, starting and focusing on local level supported by the national and global level.
`,
    `The theory of change (ToC) of an integrated agroecology-food systems framework (FS/ AE framework) outlines 10 key pathways that are necessary for achieving transformation, focussing on crucial aspects such as sustainable and resilient production systems, efficient and inclusive supply chain management, connecting consumers and producers, addressing food security and nutrition, and strengthening policy environment. Each pathway has derived from Sub-dimensions of the food systems framework and the 13 agroecological principles outlined by the HLPE. 10 Pathways for Food Systems Transformation through Agroecology (formulated as hypotheses) are elaborated in the following table. If development measures, including projects, are implemented throughout all the above-described pathways in such a way that they strengthen people’s, organisations and societies capacities for anticipation, absorption, adaptation and/or transformation of in the context of crises (be it acute shocks or chronic stresses), then they are more resilient to further crises in future. A diagrammatic elucidation of the theory of change follows.

`,
    `The German Government subscribes to agroecology and a food systems approach in its development cooperation with partner countries in its core area strategy “Sustainable Agri-Food Systems”. In this core area, conflicts of interest such as those that exist between intensification and extensification, food and the protection of resources, economic activity and nature are weighed up and decided upon on a case-by-case basis. BMZ’s Core Area Strategy as outlined in ‘Sustainable Agri-Food Systems - A World Without Hunger’ mention that, the key guidelines for dealing with these conflicts are sustainability in all its dimensions and the six quality criteria which are 1) human rights, 2) gender equality and disability inclusion, 3) anti-corruption and integrity, 4) poverty reduction and inequality reduction, 5) environmental and climate impact assessment, 6) conflict sensitivity (“Do Not Harm”), and 7) digital technology. The GIZ India Environment, Climate Change & Biodiversity Cluster aimed for the development of an analytical framework (based on the Food Systems and Agroecology approaches by the HLPE) to analyse GIZ’s projects for their contribution to a sustainable transformation of food systems through agroecology. This framework is now being used to map projects across South-East and South Asian countries having GIZ’s projects.`,

    `The theory of change (ToC) of an integrated sustainable agriculture and food systems framework (SA-FS framework) outlines 10 key pathways that are necessary for achieving transformation, focussing on crucial aspects such as sustainable and resilient production systems, efficient and inclusive supply chain management, connecting consumers and producers, addressing food security and nutrition, and strengthening policy environment. Each pathway has derived from Sub-dimensions of the food systems framework and the 13 agroecological principles outlined by the HLPE. 10 Pathways for Food Systems Transformation through Agroecology (formulated as hypotheses) are elaborated in the following table.
`,
  ];

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
    <nav className="bg-white dark:bg-gray-800 shadow-lg p-2 md:p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={gizLogo} alt="GIZ Logo" className="h-8 md:h-12 w-auto" />
        </div>
      </div>
    </nav>

    {/* Main Content */}
    <div className="container mx-auto px-2 md:px-4 py-6 md:py-12">
      {/* Enhanced Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-4xl font-extrabold text-center mb-6 md:mb-12 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent py-1 md:py-2"
      >
        Integrated Food Systems and Agroecology Framework
      </motion.h1>

      {/* Centered Link */}
            <div className="flex justify-center mb-6 md:mb-12">
              <Link
                to="/login"
                className="px-6 py-3 md:px-8 md:py-4 text-lg md:text-xl text-white rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition transform hover:scale-105"
                style={{
                  animation: 'pop 1.5s infinite',
                  '@keyframes pop': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                  },
                }}
              >
                Take a Survey of your Project
              </Link>
            </div>
      
      


        {/* Enhanced Content Sections */}
        <div className="container mx-auto p-2 md:p-4 space-y-8 md:space-y-12">
          {content.map((text, index) => {
            const isExpanded = readMore[index] || false;
            const handleReadMoreToggle = () => toggleReadMore(index);
            const truncatedText = text.length > 1000 ? `${text.slice(0, 1000)}...` : text;
        
            if (index < 2) {
              // Only first two sections have images
              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-stretch"
                >
                  {index % 2 === 0 ? (
                    <>
                      {/* Text Left, Photo Right */}
                      <div className="flex-1 space-y-3 md:space-y-6">
                        <motion.div
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="group relative overflow-hidden"
                        >
                          <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 md:p-8 border border-gray-100 dark:border-gray-700">
                            <div className="absolute top-0 left-0 w-1 md:w-2 h-full bg-gradient-to-b from-red-500 to-red-700" />
                            <p className="text-sm md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed pl-2 md:pl-4 first-letter:text-3xl md:first-letter:text-5xl first-letter:font-bold first-letter:mr-1 md:first-letter:mr-2 first-letter:text-red-700" style={{ textIndent: '1.5em' }}>
                              {isExpanded ? text : truncatedText}
                            </p>
                            {text.length > 200 && (
                              <button onClick={handleReadMoreToggle} className="text-red-500 hover:text-red-700 transition mt-1 md:mt-2 text-sm md:text-base">
                                {isExpanded ? 'Read less' : 'Read more...'}
                              </button>
                            )}
                          </div>
                        </motion.div>
                      </div>
                      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="w-full md:w-auto flex items-center">
                        <div className="bg-gray-200 rounded-lg md:rounded-xl overflow-hidden w-full h-auto">
                          <img src={photo1} alt="Image for content 1" className="w-full h-full object-contain" />
                        </div>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      {/* Photo Left, Text Right */}
                      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="w-full md:w-auto flex items-center">
                        <div className="bg-gray-200 rounded-lg md:rounded-xl overflow-hidden w-full h-auto">
                          <img src={photo2} alt="Image for content 2" className="w-full h-full object-contain" />
                        </div>
                      </motion.div>
                      <div className="flex-1 space-y-3 md:space-y-6">
                        <motion.div
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="group relative overflow-hidden"
                        >
                          <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 md:p-8 border border-gray-100 dark:border-gray-700">
                            <div className="absolute top-0 left-0 w-1 md:w-2 h-full bg-gradient-to-b from-red-500 to-red-700" />
                            <p className="text-sm md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed pl-2 md:pl-4 first-letter:text-3xl md:first-letter:text-5xl first-letter:font-bold first-letter:mr-1 md:first-letter:mr-2 first-letter:text-red-700" style={{ textIndent: '1.5em' }}>
                              {isExpanded ? text : truncatedText}
                            </p>
                            {text.length > 200 && (
                              <button onClick={handleReadMoreToggle} className="text-red-500 hover:text-red-700 transition mt-1 md:mt-2 text-sm md:text-base">
                                {isExpanded ? 'Read less' : 'Read more...'}
                              </button>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </>
                  )}
                </div>
              );
            } else {
              return (
                <div className="group relative overflow-hidden">
                  <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 md:p-8 border border-gray-100 dark:border-gray-700">
                    <div className="absolute top-0 left-0 w-1 md:w-2 h-full bg-gradient-to-b from-red-500 to-red-700" />
                    <p className="text-sm md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed pl-2 md:pl-4 first-letter:text-3xl md:first-letter:text-5xl first-letter:font-bold first-letter:mr-1 md:first-letter:mr-2 first-letter:text-red-700" style={{ textIndent: '1.5em' }}>
                      {isExpanded ? text : truncatedText}
                    </p>
                    {text.length > 200 && (
                      <button onClick={handleReadMoreToggle} className="text-red-500 hover:text-red-700 transition mt-1 md:mt-2 text-sm md:text-base">
                        {isExpanded ? 'Read less' : 'Read more...'}
                      </button>
                    )}
                  </div>
                </div>
              );
            }
          })}
        </div>

            {/* Enhanced Tables Section */}
            <div className="space-y-6 md:space-y-12">
              <div className="flex justify-center mb-3 md:mb-6 pb-1 md:pb-2">
                {tables.map((table, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-6 py-3 md:px-8 md:py-4 text-sm md:text-lg font-medium rounded-lg mr-2 md:mr-4 transition-all duration-200
                      ${
                        activeTab === index
                          ? 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg'
                          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20'
                      }`}
                  >
                    {table.title}
                  </button>
                ))}
              </div>
            
              {tables.map((table, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    opacity: activeTab === index ? 1 : 0,
                    x: activeTab === index ? 0 : 20,
                  }}
                  className={`${activeTab === index ? 'block' : 'hidden'}`}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm md:text-base">
                        <thead>
                          <tr className="bg-gradient-to-r from-red-500 to-red-700">
                            {table.headers.map((header, i) => (
                              <th
                                key={i}
                                className="px-4 md:px-6 py-2 md:py-4 text-center text-white font-semibold tracking-wider text-lg md:text-xl"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {table.rows.map((row, i) => (
                            <tr
                              key={i}
                              className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                            >
                              {row.map((cell, j) => (
                                <td
                                  key={j}
                                  className="px-4 md:px-6 py-2 md:py-4 text-gray-700 dark:text-gray-200 text-center text-base md:text-lg"
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

    {/* Footer */}
    <footer className="bg-gray-800 text-white mt-8 md:mt-16 py-4 md:py-8">
  <div className="container mx-auto px-2 md:px-4">
    <div className="flex flex-wrap justify-center md:justify-between text-center md:text-left">
      <div className="w-full md:w-1/3 mb-4 md:mb-0">
        <img src={gizLogo} alt="GIZ Logo" className="h-8 md:h-12 w-auto mx-auto md:mx-0 mb-2 md:mb-4" />
        <p className="text-xs md:text-sm">
          Sustainable Agriculture & Food System Mapping Tool
        </p>
      </div>
      <div className="w-full md:w-1/3 mb-4 md:mb-0">
        <h3 className="text-sm md:text-lg font-semibold mb-2 md:mb-4">Contact</h3>
        <p className="text-xs md:text-sm">Sudhir Shukla</p>
        <p className="text-xs md:text-sm">Email:</p>
        <p className="text-xs md:text-sm">
          <a href="mailto:admin@ecociate.com?subject=SAFSYM&priority=high" className="hover:text-red-400">admin@ecociate.com</a>
        </p>
        <p className="text-xs md:text-sm">
          <a href="mailto:sudhir@ecociate.com?subject=SAFSYM&priority=high" className="hover:text-red-400">sudhir@ecociate.com</a>
        </p>
      </div>
      <div className="w-full md:w-1/3">
        <h3 className="text-sm md:text-lg font-semibold mb-2 md:mb-4">Links</h3>
        <ul className="text-xs md:text-sm">
          <li className="mb-1 md:mb-2">
            <a href="#" className="hover:text-red-400">
              Privacy Policy
            </a>
          </li>
          <li className="mb-1 md:mb-2">
            <a href="#" className="hover:text-red-400">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-red-400">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="text-center mt-4 md:mt-8 pt-4 md:pt-8 border-t border-gray-700">
      <p className="text-xs md:text-sm">&copy; 2024 SAFSYM. All rights reserved.</p>
    </div>
  </div>
</footer>
  </div>
);
};

export default Home;

