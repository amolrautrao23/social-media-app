import { useState } from 'react';
import English from "../../assets/images/icons/education-tabs/english.webp";
import EVS from "../../assets/images/icons/education-tabs/evs.webp";
import Maths from "../../assets/images/icons/education-tabs/maths.webp";
import Science from "../../assets/images/icons/education-tabs/science.webp";
import Phonics from "../../assets/images/icons/education-tabs/Phonics.webp";
import Communicationskills from "../../assets/images/icons/education-tabs/Communicationskills.webp";
import LifeSkills from "../../assets/images/icons/education-tabs/LifeSkills.webp";
import Financialliteracy from "../../assets/images/icons/education-tabs/Financialliteracy.webp";
import Sansrit from "../../assets/images/icons/education-tabs/Sansrit.webp";
import German from "../../assets/images/icons/education-tabs/German.webp";
import French from "../../assets/images/icons/education-tabs/French.webp";
import TiltCard from './TiltCard';

const tabs = ['Kindergarten',"1st Grade","2nd Grade","3rd Grade","4th Grade","5th Grade", 'Extra-Curriculum', 'Languages'];

const Kindergarten = [
  {
    icon: English,
    title: 'English',
    desc: 'Let’s learn letters, words, and rhymes in a super fun way!',
  },
  {
    icon: Maths,
    title: 'Math’s',
    desc:"Count, compare, and explore numbers all around us!"
  },
  {
    icon: Science,
    title: 'Science',
    desc:"Discover good habits, family, animals, and yummy fruits!"
  },
];
const Grade1 = [
  {
    icon: English,
    title: 'English',
    desc: 'Build stronger vocabulary with rhymes, sight words, and fun word games!',
  },
  {
    icon: Maths,
    title: 'Math’s',
    desc:"Learn numbers, time, and comparisons to understand the world around you!"
  },
  {
    icon: EVS,
    title: 'EVS',
    desc:"Understand how we grow, how we live, and how nature plays a part in it all!"
  },
];
const Grade2 = [
  {
    icon: English,
    title: 'English',
    desc: 'Strengthen writing, speaking, and grammar skills through structured lessons and creative expression.',
  },
  {
    icon: Maths,
    title: 'Math’s',
    desc:"Build a strong foundation in numbers, geometry, and measurements with real-world applications."
  },
  {
    icon: EVS,
    title: 'EVS',
    desc:"Understand personal identity, family roles, nutrition, nature, and basic space science through integrated learning."
  },
];
const Grade3 = [
  {
    icon: English,
    title: 'English',
    desc: 'Strengthen grammar and communication skills through structured lessons and thoughtful discussions.',
  },
  {
    icon: Maths,
    title: 'Math’s',
    desc:"Master core arithmetic, geometry, and measurements with a focus on real-world application and mental math."
  },
  {
    icon: Science,
    title: 'Science',
    desc:"Explore the human body, animal world, natural resources, and basic physical science through inquiry-based learning."
  },
  {
    icon: EVS,
    title: 'EVS',
    desc:"Understand family, community, and social systems while building awareness of safety, environment, and global perspectives."
  },
];
const Grade4 = [
  {
    icon: English,
    title: 'English',
    desc: 'Enhance reading, writing, and grammar through age-appropriate themes and topics.',
  },
  {
    icon: Maths,
    title: 'Math’s',
    desc:" Master arithmetic operations, circle geometry, time, and real-world measurements."
  },
  {
    icon: Science,
    title: 'Science',
    desc:"Study human systems, adaptation, matter, light, and mechanical forces."
  },
  {
    icon: EVS,
    title: 'EVS',
    desc:"Explore geography, continents, maps, and environmental care."
  },
];
const Grade5 = [
  {
    icon: English,
    title: 'English',
    desc: 'Advance fluency through grammar, structured writing formats, and vocabulary building.',
  },
  {
    icon: Maths,
    title: 'Math’s',
    desc:"Master operations with large numbers, fractions, decimals, and geometry fundamentals."
  },
  {
    icon: Science,
    title: 'Science',
    desc:"Explore human systems, plant biology, states of matter, energy, and simple machines."
  },
  {
    icon: EVS,
    title: 'EVS',
    desc:"Understand early human history, geography, climate, and environmental awareness."
  },
];
const ExtraCurriculum = [
  {
    icon: Phonics,
    title: 'Phonics',
    desc:"Learn the relationship between letters and sounds to build strong reading and decoding skills."
  },
  {
    icon: Communicationskills,
    title: 'Communication skills',
    desc:"Develop clear expression and confident interaction to enhance learning and personal growth.",
  },
  {
    icon: LifeSkills,
    title: 'Life skills',
    desc: "Build adaptive, positive behaviors to handle everyday challenges with confidence."
  },
  {
    icon: Financialliteracy,
    title: 'Financial literacy',
    desc: "Understand the basics of money management — earning, saving, spending, and investing wisely."
  },
];
const Languages = [
  {
    icon: French,
    title: 'French',
    desc: "Learn basic French words and phrases to build early language and cultural skills."
  },
  {
    icon: German,
    title: 'German',
    desc: "Explore beginner German vocabulary and sentence formation for global communication."
  },
  {
    icon: Sansrit,
    title: 'Sanskrit',
    desc: "Understand simple Sanskrit words and shlokas to connect with cultural roots."
  },
];
// Reuse the same content for now
const tabContents = {
  Kindergarten: Kindergarten,
  "1st Grade": Grade1,
  "2nd Grade": Grade2,
  "3rd Grade": Grade3,
  "4th Grade": Grade4,
  "5th Grade": Grade5,
  'Extra-Curriculum': ExtraCurriculum,
  Languages: Languages,
};

const EducationTabs = () => {
  const [activeTab, setActiveTab] = useState('Kindergarten');

  return (
    <section className="section-space text-center side-space">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 uppercase">Our Education Solutions</h2>

      {/* Tabs */}
      <div className="edu-tab-menus">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`edu-tab-button ${
              activeTab === tab
                ? 'text-black'
                : 'text-gray-500 hover:text-black'
            }`}
            style={activeTab === tab ? { background: 'var(--bg-yellow-gradient)' } : {}}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="edu-tab-contents">
        {tabContents[activeTab].map(({ icon, title,desc }) => (
          <TiltCard key={title} icon={icon} title={title} desc={desc} />
        ))}
      </div>
    </section>
  );
};

export default EducationTabs;
