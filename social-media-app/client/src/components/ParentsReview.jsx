import SectionHeading from './controls/SectionHeading'
import CommonSlider from './slider/CommonSlider'
import { SwiperSlide } from 'swiper/react'
import Star from '../assets/images/icons/review-star-icon.webp'
import ReviewFrame from "../assets/images/review-frame.webp"
const Reviews = [
    {
        reviewCount: 5,
        review: 'Wonderful learning app for kids. And its FREEE😍😍My daughter loves to play on this, and she gets to learn her lessons too without any effort. Good curriculum and amazing user interface. Recommended!!',
        auther: 'Priyanka Bihani'
    },
    {
        reviewCount: 5,
        review: 'Finally children will have a platform which is good for them. It will wean them away from harmful gaming mobile apps and will encourage positive learnings and behavior too. Our congratulations to the KitmeK team. May their good work grow and spread across the countries',
        auther: 'D S Kadian'
    },
    {
        reviewCount: 5,
        review: 'My 8 year old son loved to play this game as it has best learning techniques that is gamified learning, Very good app for kids to learn.',
        auther: 'Ashish Jain'
    },
    {
        reviewCount: 5,
        review: 'Amazing app',
        auther: 'Subodh Jain'
    },
    {
        reviewCount: 5,
        review: 'Wow the best game ever',
        auther: 'Tahasan Nafis'
    },
    {
        reviewCount: 5,
        review: 'Best app for students',
        auther: 'Learn All'
    },
    {
        reviewCount: 5,
        review: 'It’s a fun learning app which keeps the child motivated to learn more. I strongly recommend this app for each and every kid for better learning outcomes.',
        auther: 'Camera wali'
    },
]

const ParentsReview = () => {
    return (
        <section className="section-space parents-review-section">
            <SectionHeading className={"text-center"}>what parents say’s about turbokids</SectionHeading>
            <CommonSlider
                pagination={{ clickable: true }}
                centeredSlides={true}
                breakpoints={{
                    0: { slidesPerView: 1.2 },
                    768: { slidesPerView: 2.4 },
                }}
                autoHeight
                navigation
            >
                {Reviews.map((item, i) => (
                    <SwiperSlide key={i} className="h-auto transform md:!translate-x-[25%]" >
                        <div className="parents-review-card h-full " >
                            <img src={ReviewFrame} alt="review frame" className='review-frame' height={100} width={100} loading="lazy" />
                            <div className="content">
                                <div className="review-container flex justify-center items-center gap-[10px] mb-4">
                                    {Array.from({ length: item.reviewCount }).map((_, i) => (
                                        <span key={i}>
                                            <img src={Star} height={25} width={25} alt="star" loading="lazy" />
                                            </span>
                                    ))}
                                </div>
                                <p className='review mb-[10px]'>{item.review}</p>
                                <h4 className='review-auther'>{item.auther}</h4>
                            </div>
                            {item.icon}
                        </div>
                    </SwiperSlide>
                ))}
            </CommonSlider>
        </section>
    )
}

export default ParentsReview