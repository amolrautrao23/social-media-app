import Learn from "../assets/images/icons/how-it-works/learn.webp";
import Earn from "../assets/images/icons/how-it-works/earn.webp";
import Play from "../assets/images/icons/how-it-works/play.webp";
import ArrowRight from "../assets/images/icons/how-it-works/arrow-right.svg";
import SectionHeading from "./controls/SectionHeading";


const steps = [
  {
    title: 'Learn',
    description: 'Interactive lessons, quizzes and fun activities designed to spark curiosity and build real skills - one class at a time.',
    icon: Learn,
  },
  {
    title: 'Earn',
    description: 'Answer questions, pass tests, level up and earn points as you progress through your learning journey.',
    icon: Earn,
  },
  {
    title: 'Play',
    description: 'Use your earned points to unlock fun games, avatars, activities and exciting in-app features - learning has never been this rewarding!',
    icon: Play,
  },
];

const HowItWorks = () => {
  return (
    <section className=" section-space side-space" >
    <div className="px-[30px] md:px-[40px] bg-[var(--bg-yellow)] rounded-[20px] md:rounded-[30px] shadow-sm section-space">
      <SectionHeading className={'text-center'}>HOW IT WORKS</SectionHeading>
      <div className="hw-container">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col  items-center max-w-sm text-center relative">
            <h4 className="font-bold text-blue-800 mb-2">{step.title}</h4>
            <div className="hw-circle">
              <img src={step.icon} height={30} width={30} alt={step.title} loading="lazy" />
            </div>
            <p className="text-center">{step.description}</p>

            {/* Arrow (except last item) */}
            {index < steps.length - 1 && (
              <div className="after-arrow-right">
                <ArrowRight className="text-black w-6 h-6" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};

export default HowItWorks;
