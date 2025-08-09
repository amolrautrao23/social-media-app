import { SwiperSlide } from 'swiper/react'
import CommonSlider from './slider/CommonSlider'
import SectionHeading from './controls/SectionHeading'
import ParentalControl from '../assets/images/icons/app-security/parental-control.webp'
import Smartphone from '../assets/images/icons/app-security/smartphone.webp'
import SafeAds from '../assets/images/icons/app-security/safe-ads.webp'

const data= [
  { title: 'Parental Control', description: 'Manage screen time, set learning limits and track your child’s progress - all from one place.',icon: ParentalControl },
  { title: 'Works on Any Smartphone, even Offline', description: 'No Wi-Fi? No problem. Keep the learning going anytime, anywhere.',icon: Smartphone },
  { title: 'Let Kids Learn, Not Click', description: 'Ad-free and worry-free, a space where children can focus and grow.',icon: SafeAds },
  ]
const AppSecurity = () => {
  return (<section className="section-space side-space app-security-section">
  <SectionHeading className="text-center px-[15px]">Explore our app&#39;s security features!</SectionHeading>
    <CommonSlider
      pagination={{ clickable: true }}
      breakpoints={{
        0: { slidesPerView: 1.2 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {data.map((item, i) => (
        <SwiperSlide key={i} className="h-auto">
          <div className="app-security-card h-full">
            <div className="content">
                <h4 className='mb-2'>{item.title}</h4>
            <p>{item.description}</p>
            </div>
            <img src={item.icon} height={30} width={30} alt={item.title} loading="lazy"/>
          </div>
        </SwiperSlide>
      ))}
    </CommonSlider>
    </section>
  )
}

export default AppSecurity