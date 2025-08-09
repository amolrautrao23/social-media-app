// components/PersonalizedLearning.jsx
import Character from '../assets/images/icons/personalized/charector.webp';
import Rainbow from '../assets/images/icons/personalized/Rainbow.webp';    
import MusicIcon from '../assets/images/icons/personalized/MusicConcerts.webp';    
import HideIcon from '../assets/images/icons/personalized/Hide-Seek.webp';      
import InteractiveClassroom from '../assets/images/icons/personalized/InteractiveClassroom.webp';
import Planet from '../assets/images/icons/personalized/planet-icon.webp';
import RightStar from '../assets/images/icons/personalized/star-icon.webp';
import LeftStar from '../assets/images/icons/personalized/lite-star.webp';
import CommonSlider from './slider/CommonSlider';
import { SwiperSlide } from 'swiper/react';
import ButtonPrimary from './controls/ButtonPrimary';
import SectionHeading from './controls/SectionHeading';
const data = [
    { title: 'Global Curriculum, Made Simple', description: 'TurboKids blends the best of ICSE, IB, CBSE & State Boards into one fun-packed platform for KG to Grade 5. With 800+ lessons in math, science, social studies, English & more, kids learn in a playful, interactive way.', },
    { title: 'Gamified Learning = Self-Motivation', description: 'Our tech-powered, game-based approach gets kids excited to learn! It boosts focus, memory, and understanding—so learning feels like play, not pressure.', },
    { title: 'Personalized Learning for Every Child', description: 'Every child is unique—and so is their learning path at TurboKids. With repeatable interactive lessons and custom plans, we make sure your child grows confidently at their own level.', },
    { title: 'Learn at Your Own Pace', description: 'Built with input from top child psychologists, TurboKids lets kids learn slowly, deeply, and stress-free. No rush—just real understanding.', },
    { title: 'Learn with Friends, Anytime, Anywhere', description: 'Your child can team up with friends from around the world for real-time group study, digital playdates, and collaborative fun—all online, all at TurboKids!', },
]

const PersonalizedLearning = () => {
    return (
        <div className="personalized-learning-section section-space side-space">
            {/* Left Card */}
            <div className="left-learning-container-outer-div clip-panel-shadow">
                <div className="flex items-center gap-4 left-learning-container clip-white-panel px-[40px]">
                    <img src={Planet} className="planet-icon" height={30} width={30} alt={"planet"} loading="lazy" />
                    <img src={Rainbow} height={30} width={30} className="rainbow-icon" alt={"Rainbow"} loading="lazy" />
                    <img src={Character} height={30} width={30} className="character-icon" alt={"Character"} loading="lazy" />
                    <img src={LeftStar} height={30} width={30} className="left-star-icon" alt={"LeftStar"} loading="lazy" />
                    <img src={RightStar} height={30} width={30} className="right-star-icon" alt={"RightStar"} loading="lazy" />
                    <CommonSlider
                        pagination={{ clickable: true }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                        }}
                        navigation
                        className='w-full lg:max-w-[300px] xl:max-w-[500px]'
                        isLeft                  >
                        {data.map((item, i) => (
                            <SwiperSlide key={i} className="h-auto w-full">
                                    <div className="flex flex-col justify-start personlized-learning-card">
                                        <div className="star-rating">
                                        </div>
                                        <SectionHeading className='mb-2'>{item.title}</SectionHeading>
                                        <p>{item.description}</p>
                                        <ButtonPrimary className="mt-4">DOWNLOAD APP</ButtonPrimary>
                                    </div>
                            </SwiperSlide>
                        ))}
                    </CommonSlider>
                </div>
            </div>

            <div className="right-learning-container clip-blue-panel">
                <Feature icon={MusicIcon} title="Interactive Classrooms" text="Where learning feels like play and every click sparks curiosity!" />
                <Feature icon={HideIcon} title="Unit Test to Final Exams" text="From quick quizzes to big wins — assessments that keep kids ahead!" />
                <Feature icon={InteractiveClassroom} title="Detailed Report Cards" text="Smart insights, not just scores — track growth like never before!" />
            </div>
        </div>
    );
};

const Feature = ({ icon, title, text }) => (
    <div className="personalized-learning-card">
        <img src={icon} height={30} width={30} className="personalize-right-icon" alt={title} loading="lazy"/>
        <div className='text-white'>
            <h4 className="mb-[10px] ">{title}</h4>
            <p>{text}</p>
        </div>
    </div>
);

export default PersonalizedLearning;
