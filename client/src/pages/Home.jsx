import React from 'react'
import Banner from '../components/banner/Banner'
import About from '../components/about/About'
import EducationTabs from '../components/tabs/EducationTabs'
import HowItWorks from '../components/HowItWork'
import AppSecurity from '../components/AppSecurity'
import PersonalizedLearning from '../components/PersonalizedLearning'
import RopewaySlider from '../components/Ropeway'
import Journey from '../components/Journey'
import LearnMoreVideo from '../components/LearnMoreVideo'
import Parteners from '../components/Parteners'
import ParentsReview from '../components/ParentsReview'
import FollowUs from '../components/FollowUs'
import Embark from '../components/Embark'
import './pages.css'
const Home = () => {
    return (
        <>
            <Banner />
            <About />
            <EducationTabs />
            <HowItWorks />
            <AppSecurity />
            <PersonalizedLearning />
            <RopewaySlider />
            <Journey />
            <LearnMoreVideo />
            <Parteners />
            <ParentsReview />
            <FollowUs />
            <Embark />
        </>
    )
}

export default Home