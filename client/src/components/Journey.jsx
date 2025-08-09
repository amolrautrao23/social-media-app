import { useState } from 'react';
import SectionHeading from './controls/SectionHeading';
import Character from '../assets/images/icons/journey-charecter.webp';
import Rainbow from '../assets/images/rainbow-img.webp';
import PlanetRed from '../assets/images/PlanetRed.webp';
import EarthTelescope from '../assets/images/icons/earth-telescope.webp';
import CharacterMessage from '../assets/images/icons/journey-charecter-message.webp';
import Planet from '../assets/images/icons/personalized/planet-icon.webp';
import ButtonPrimary from '../components/controls/ButtonPrimary'
// Step labels
const tabs = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5','Step 6'];

// Step content
const tabContents = {
    'Step 1': {
        title: 'Download app from play store or app store',
        },
    'Step 2': {
        title: 'Create a new user using email, google or facebook login',
        },
    'Step 3': {
        title: 'Create child profile enter- First Name, Gender, Grade and select avatar',
        },
    'Step 4': {
        title: 'Wait while school content gets downloaded',
         },
    'Step 5': {
        title: 'Start learning at the Turbokids academy. Learn and earn coins',
        },
    'Step 6': {
        title: 'Subscribe to get access for all extracurricular classes and entertainment features',
        },
};

const Journey = () => {
    const [activeTab, setActiveTab] = useState('Step 1');

    return (
        <section className="journey-section relative section-space py-12">
            <div className="journey-inner side-space">
                <SectionHeading className="text-white text-center lg:text-left">How to start?</SectionHeading>

                <div className="journey-tabs-container">
                    <img src={PlanetRed} height={30} width={30} className="planet-red hidden lg:block" alt={"red planet"} loading="lazy" />
                    <img src={EarthTelescope} height={30} width={30} className="earth-tele hidden lg:block" alt={"earth telescope"} loading="lazy" />
                    <img src={Planet} alt='rainbow' height={30} width={30} className="journey-planet" loading="lazy" />
                    <img src={Rainbow} alt='rainbow' height={30} width={30} className="rainbow" loading="lazy" />
                    <div className="clip-panel-shadow flex-1 journey-tabs-outer">
                        <div className="clip-blue-panel ">
                            <div className="journey-tabs">
                                {tabs.map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} className={`steps-tab-button ${activeTab === tab ? 'is-active' : ''}`}> {tab} </button>))}
                            </div>
                        </div>
                    </div>
                    <div className="journey-right-content-main relative">
                        <img src={Character} height={30} width={30} className="character" alt={"Character"} loading="lazy" />
                        <img src={CharacterMessage} height={30} width={30} className="character-message" alt={"Character message"} loading="lazy" />
                        <img src={PlanetRed} alt="planet red" className="planet-red block lg:hidden" loading="lazy" />
                        <img src={EarthTelescope} alt="planet red" className="earth-tele block lg:hidden" loading="lazy" />
                        <div className="clip-white-panel journey-tabs-contents">
                            <div className="journey-character">
                            </div>
                            <div className="flex flex-col justify-center items-start gap-[15px] lg:max-w-[70%]">
                                <h3 className={'!mb-0'}>
                                    {tabContents[activeTab].title}
                                </h3>
                                <ButtonPrimary>
                                    DOWNLOAD APP
                                </ButtonPrimary>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Journey;
