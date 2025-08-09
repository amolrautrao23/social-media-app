import SectionHeading from './controls/SectionHeading'
import Follous1 from '../assets/images/follous/follous1.webp'
import Follous2 from '../assets/images/follous/follous2.webp'
import Follous3 from '../assets/images/follous/follous3.webp'
import Follous4 from '../assets/images/follous/follous4.webp'
import Follous5 from '../assets/images/follous/follous5.webp'

const FollowUs = () => {
  return (
    <section className='section-space side-space followus-section'>
        <SectionHeading className={'text-center'}>Follow us on Instagram!</SectionHeading>
        <div className="followus-img-wrapper">
            <img src={Follous1} alt="follow us 1" width="100" height="150"loading="lazy" />
            <img src={Follous2} alt="follow us 2" width="100" height="150"loading="lazy" />
            <img src={Follous3} alt="follow us 3" width="100" height="150"loading="lazy" />
            <img src={Follous4} alt="follow us 4" width="100" height="150"loading="lazy" />
            <img src={Follous5} alt="follow us 5" width="100" height="150"loading="lazy" />
        </div>
    </section>
  )
}

export default FollowUs