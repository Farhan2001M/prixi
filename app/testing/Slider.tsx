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
        // pagination={{
        //   clickable: true,
        // }}
        // navigation={{
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev',
        // }}
        modules={[ Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
       

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
      
      {/* Custom Navigation Buttons */}
      {/* <div
        className="swiper-button-next bg-black text-white p-2 rounded-full flex items-center justify-center w-8 h-8 absolute top-1/2 right-10 transform -translate-y-1/2 z-10 md:block"
        style={{ color: 'white', backgroundColor: 'black', padding: '1.2rem', borderRadius: '9999px' }}
      > */}
        {/* Next icon or text here */}
      {/* </div>
      <div
        className="swiper-button-prev bg-black text-white p-2 rounded-full flex items-center justify-center w-8 h-8 absolute top-1/2 left-10 transform -translate-y-1/2 z-10 md:block"
        style={{ color: 'white', backgroundColor: 'black', padding: '1.2rem', borderRadius: '9999px' }}
      > */}
        {/* Prev icon or text here */}
      {/* </div> */}
    </div> 
  )
}

export default Slider