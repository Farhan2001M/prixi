

import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';



const LPHowItWorks = () => {
  return (
    <section id="next-section" className="w-full max-w-[1920px] mx-auto h-[950px] mb-0 ">

        <div className='max-w-[1700px] p-12 pt-9  mx-auto text-center '>

          <div className='max-w-[1000px] mx-auto flex flex-col gap-5'>
            <h1 className='text-5xl font-bold mt-3 '>How it works</h1>
            <p className='text-2xl mb-10 leading-9 '>Renting a luxury car has never been easier. Our streamlined process makes it simple for you to book and confirm your vehicle of choice online</p>
          </div>

          <div className='max-w-[1700px] flex text-left  relative '>
            
            <div className='w-3/6 flex flex-col gap-4 m-5 absolute top-16 left-28'>

              <div className='flex bg-white pl-4 py-5 border-2 rounded-3xl mx-4  max-w-[680px] '>
                <div className='w-16 bg-gray-300 rounded-3xl flex justify-center items-center mr-6'>  <img src="/images/hwtIcons/search.png" alt="" /> </div>
                <div className='flex flex-col gap-4 max-w-[580px]'>
                  <div><h2 className='text-2xl text-black font-bold'>Find vehicle info</h2></div>
                  <div><p className='text-lg'>Choose what best suits you & your needs.</p></div>
                </div>
              </div>

              <div className='flex bg-white pl-4 py-5 border-2 rounded-3xl mx-4 max-w-[680px]'>
                <div className='w-16 bg-gray-300 rounded-3xl flex justify-center items-center mr-6'>  <img className='w-[40px]' src="/images/hwtIcons/ai-brain.png" alt="" />  </div>
                <div className='flex flex-col gap-4 max-w-[580px]'>
                  <div><h2 className='text-2xl text-black font-bold'>Instant Price prediction </h2></div>
                  <div><p className='text-lg'>Select ythew clicks using our latest AI tech for its evaluation.</p></div>
                </div>
              </div>

              <div className='flex bg-white pl-4 py-5 border-2 rounded-3xl mx-4 max-w-[680px]'>
                <div className='w-16 bg-gray-300 rounded-3xl flex justify-center items-center mr-6' > <img src="/images/hwtIcons/face-happy.png" alt="" /> </div>
                <div className='flex flex-col gap-4 max-w-[580px]'>
                  <div><h2 className='text-2xl text-black font-bold'>Discover Latest Automotive Trends</h2></div>
                  <div><p className='text-lg'>With our interactive dashboards and realtime interactions.</p></div>
                </div>
              </div>
              
            </div>

            <div className='w-3/6 bg-transparent'>

            </div>

            <div className='w-3/6 bg-gray-200 rounded-3xl m-6 mt-2 h-[600px] flex justify-center items-center'>

              <div className='w-4/5 h-4/5  ml-12'>
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  navigation={false}
                  pagination={false}

                  // pagination={{
                  //   clickable: false,
                  // }}
                  // navigation={false}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide><img src="./images/carslider/LPSlider/audi.png" alt=""  className=" h-4/5 mx-auto  my-24"/></SwiperSlide>
                  <SwiperSlide><img src="./images/carslider/LPSlider/vigo.png" alt=""  className=" h-4/5 mx-auto  my-24"/></SwiperSlide>
                  <SwiperSlide><img src="./images/carslider/LPSlider/corola.png" alt=""className=" h-4/5 mx-auto  my-24"/></SwiperSlide>
                  <SwiperSlide><img src="./images/carslider/LPSlider/Tesla.png" alt="" className=" h-4/5 mx-auto  my-24"/></SwiperSlide>

                  
                </Swiper> 
              </div>
              
            </div>
          </div>

        </div>

      </section>
  )
}

export default LPHowItWorks