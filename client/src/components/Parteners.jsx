import SectionHeading from './controls/SectionHeading'
import Marquee from 'react-fast-marquee'
import Partner1 from '../assets/images/partners/partner-1.webp'
import Partner2 from '../assets/images/partners/partner-2.webp'
import Partner3 from '../assets/images/partners/partner-3.webp'
import Partner4 from '../assets/images/partners/partner-4.webp'
import Partner5 from '../assets/images/partners/partner-5.webp'
import Planet from '../assets/images/icons/personalized/planet-icon.webp';
import Cloud from '../assets/images/cloud.webp';
import StarImg from '../assets/images/star-img.png';
import LeftStar from '../assets/images/icons/personalized/lite-star.webp';
const PartnersImages=[Partner1,Partner2,Partner3,Partner4,Partner5,]
const Parteners = () => {
  return (
    <section className='partners-section section-space bg-[#FCD605] relative section-top-space section-bottom-space'>
        <img src={Planet} height={30} width={30} alt={'planet'} className="partners-planet" loading="lazy" />
        <img src={LeftStar} height={30} width={30} alt={'start'} className="partners-star hidden lg:block" loading="lazy" />
        <img src={Cloud} alt="cloud" className='clouds' loading="lazy" />
        <img src={StarImg} alt="cloud" className='partners-star lg:hidden block' loading="lazy" />
        <SectionHeading className={"text-center relative z-10 !mb-[10px] px-[15px]"}>our collaboration partners </SectionHeading>
         <Marquee
          gradient={false}
          speed={40}
          pauseOnHover={true}
          direction="left"
          autoFill
          
        >
          {PartnersImages.map((item, i) => (
            <img key={i} src={item} className="partner-img" alt='partner' loading="lazy" />
          ))}
        </Marquee>
    </section>
  )
}

export default Parteners