import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Slider = () => {
  return (
    <div className='my-5 border border-black h-96 relative overflow-hidden rounded-xl'>
      <Swiper
        navigation={false}
        pagination={false}
        centeredSlides={true}
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[ Autoplay, Pagination, Navigation]}
        className="w-full h-full" >

        <SwiperSlide className="relative">
          <img
            src="../../images/Cars/Tesla/desktop-full-hd-tesla-model-s-background.png"
            alt="Alpha bravo v+charlie"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="../../images/Cars/Tesla/teop.png"
            alt="Alpha bravo charlie"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="../../images/Cars/Tesla/toto.png"
            alt="Alpha bravo charlie"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
          />
        </SwiperSlide>
        {/* Add more SwiperSlides as needed */}  
      </Swiper>
      
    </div> 
  )
}

export default Slider

