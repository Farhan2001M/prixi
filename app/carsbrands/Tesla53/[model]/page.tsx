"use client"

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { data } from '../ModelsData';


import Slider from './StatisticSlider'
import TransparentNabar from './TransparentNabar'

const Page = () => {
  const searchParams = useSearchParams();
  const modelName = searchParams.get('model') || '';
  console.log(modelName)

  // Find the model data from the data array
  const modelData = data.find(item => item.model === modelName);

  // Function to safely get a value or return a default message
  // const getValueOrDefault = (value:any, defaultMessage:any) => {
  //   return value ? value : defaultMessage;
  // };

  return (

    <div>

      <TransparentNabar/>
      {modelData ? ( <Slider modelName={modelName} modelData={modelData} /> ) : (<p>Data not found</p> )}

      {/* <div className='' >
        {modelData ? (
          <>
            <h1>Model Name: {modelName ? modelName : "Loading..."}</h1>
            <h1>Description: {getValueOrDefault(modelData.description, "Description not available")}</h1>
            <h1>Launch Price: {getValueOrDefault(modelData.launchPrice, "Launch price not available")}</h1>
            <h1>Colors Available: {modelData.colorsAvailable && modelData.colorsAvailable.length > 0 ? modelData.colorsAvailable.join(', ') : "Colors not available"}</h1>
            <h1>Starting Price: {getValueOrDefault(modelData.startingPrice, "Starting price not available")}</h1>
          </>
        ) : (
          <p>Data not found</p>
        )}
      </div> */}

    </div>

    

  );
};

export default Page;

































 {/* <div className=' border border-black h-[90vh] relative overflow-hidden rounded-xl'>
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
                    
          </Swiper>
          
        </div>  */}