import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const LPTestimonials = () => {
  return (
    <section className='w-full max-w-[1920px] mx-auto relative'>
        <h1 className='text-center text-5xl font-bold mt-16 text-slate-700'>
          &quot;Client Testimonials&quot;
        </h1>
        
        <div className="relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            modules={[Pagination, Navigation]}
            className="w-full min-h-[500px]"
          >
            
            <SwiperSlide>
              <div className="flex flex-col items-center p-10 text-center bg-white">
                <p className="text-3xl font-semibold text-black mb-6 max-w-[1300px] leading-snug">
                  &quot;My Prixi experience was nothing short of incredible. The pristine car and impeccable service made my trip unforgettable. I&apos;ll be back for more.&quot;
                </p>
                <div className="flex flex-col items-center">
                  <img src="./images/clientTestimonial/customer.png" alt="James Bond" className="h-72 mb-5 rounded-full" />
                  <span className="text-3xl font-bold text-gray-600">James Bond</span>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center p-10 text-center bg-white">
                <p className="text-3xl font-semibold text-black mb-6 max-w-[1300px] leading-snug">
                  &quot;Another testimonial here. The service was fantastic, and I highly recommend it to anyone looking for a reliable car rental.&quot;
                </p>
                <div className="flex flex-col items-center">
                  <img src="./images/clientTestimonial/customerfemale.png" alt="Alexa Baji" className="h-72 mb-5 rounded-full" />
                  <span className="text-3xl font-bold text-gray-600">Alexa Baji</span>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col items-center p-10 text-center bg-white">
                <p className="text-3xl font-semibold text-black mb-6 max-w-[1300px] leading-snug">
                  &quot;Another testimonial here. The service was fantastic, and I highly recommend it to anyone looking for a reliable car rental.&quot;
                </p>
                <div className="flex flex-col items-center">
                  <img src="./images/clientTestimonial/tommy.jpg" alt="Tom Bhai" className="h-72 mb-5 rounded-full" />
                  <span className="text-3xl font-bold text-gray-600">Tom Bhai</span>
                </div>
              </div>
            </SwiperSlide>
            
            {/* Add more SwiperSlides as needed */}
            
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div
            className="swiper-button-next bg-black text-white p-2 rounded-full flex items-center justify-center w-8 h-8 absolute top-1/2 right-10 transform -translate-y-1/2 z-10 md:block "
            style={{ color: 'white', backgroundColor: 'black', padding: '1.5rem',  borderRadius: '9999px' }}
          >
            {/* Next icon or text here */}
          </div>
          <div
            className="swiper-button-prev bg-black text-white p-2 rounded-full flex items-center justify-center w-8 h-8 absolute top-1/2 left-10 transform -translate-y-1/2 z-10 md:block "
            style={{ color: 'white', backgroundColor: 'black', padding: '1.5rem',  borderRadius: '9999px' }}
          >
            {/* Prev icon or text here */}
          </div>
        </div>
    </section>
  );
}

export default LPTestimonials;
