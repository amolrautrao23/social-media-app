import { useRef, useState, useEffect } from 'react';
import { Swiper } from 'swiper/react';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const CommonSlider = ({
    children,
    spaceBetween = 30,
    slidesPerView = 1,
    breakpoints = {
        0: { slidesPerView: 1.2 },
        768: { slidesPerView: 1 }
    },
    className = '',
    navigation = false,
    isLeft = false,
initialSlide=0
}) => {
    const paginationRef = useRef(null);
    const [swiperInstance, setSwiperInstance] = useState(null);

    useEffect(() => {
        if (swiperInstance && paginationRef.current) {
            swiperInstance.params.pagination.el = paginationRef.current;
            swiperInstance.pagination.destroy();
            swiperInstance.pagination.init();
            swiperInstance.pagination.update();
        }
    }, [swiperInstance]);

    return (
        <div className="common-slider">
            <Swiper
                slidesPerView={slidesPerView}
                spaceBetween={spaceBetween}
                keyboard={{ enabled: true }}
                navigation={navigation ?
                    {
                        prevEl: '.custom-prev',
                        nextEl: '.custom-next'
                    } : false}
                pagination={{
                    el: paginationRef.current,
                    clickable: true
                }}
                breakpoints={breakpoints}
                modules={[Keyboard, Pagination, Navigation]}
                className={`px-[10px] ${className}`}
                onSwiper={setSwiperInstance}
                loop={true}
                initialSlide={initialSlide}
            >
                {children}
            </Swiper>

            {/* Arrows and pagination in one line */}
            <div className={`slider-controls flex items-center ${isLeft ? "justify-start" : "justify-center"} gap-2 mt-2`}>
                {navigation && <div className="swiper-button-prev custom-prev" />}
                <div className="swiper-pagination custom-pagination" ref={paginationRef} />
                {navigation && <div className="swiper-button-next custom-next" />}
            </div>
        </div>
    );
};

export default CommonSlider;
