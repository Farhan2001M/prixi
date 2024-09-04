"use client"

import React, { useState } from 'react';
import Cards from '../../testing/CarCards';
import Range from './Filter';
import { data } from './ModelsData';

import Header from '../../components/Header';
import Accodion from '../../testing/Acoordion';
import Slider from '../../testing/Slider';

const page = () => {
  const [filters, setFilters] = useState({
    priceRange: [0, 250000],
    yearRange: [2000, 2024],
    vehicleTypes: [],
    minSeatingCapacity: 2,
    horsepowerRange: [0, 1500],
  });

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const extractSeatingCapacity = (seatingCapacity) => {
    // Extract the first number found in the seatingCapacity string
    const match = seatingCapacity.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0; // Default to 0 if no number is found
  };

  const filteredData = data.filter((car) => {
    const startingPrice = parseInt(car.startingPrice.replace(/[^0-9]/g, ''));
    const releaseYear = new Date(car.releaseDate).getFullYear();
    const horsepower = parseInt(car.horsepower?.replace(/[^0-9]/g, '') || '0');

    const carSeatingCapacity = extractSeatingCapacity(car.seatingCapacity || "");
    const vehicleTypeMatch = filters.vehicleTypes.length === 0 || filters.vehicleTypes.some(type => car.vehicleType?.toLowerCase().includes(type.toLowerCase()));

    return (
      startingPrice >= filters.priceRange[0] &&
      startingPrice <= filters.priceRange[1] &&
      releaseYear >= filters.yearRange[0] &&
      releaseYear <= filters.yearRange[1] &&
      vehicleTypeMatch &&
      carSeatingCapacity >= filters.minSeatingCapacity &&
      horsepower >= filters.horsepowerRange[0] &&
      horsepower <= filters.horsepowerRange[1]
    );
  });

  return (
    <div className="flex flex-col">

      <Header/>  

      <div className='m-8 w-10/12 mx-auto'>
        <Accodion/>
      </div>

      <div className='m-4 w-10/12 mx-auto'>
        <Slider/>
      </div>

      <div className='m-4 w-10/12 mx-auto'>
        <Range onFiltersChange={handleFiltersChange} />
      </div>
      <div className='m-4 w-10/12 mx-auto'>
        <Cards data={filteredData} />
      </div>
    </div>
  );
};

export default page;




      
































// "use client";

// import React from 'react'

// import Header from '../../components/Header';
// import Accodion from '../../testing/Acoordion'

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import { Pagination, Navigation } from 'swiper/modules';

// const page = () => {
//   return (
//     <div className="flex flex-col">

//       <Header/>  

//       <div className='m-5'>
//         <Accodion/>
//       </div>

//       <div className='m-5 border border-black max-h-80'>
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={30}
//           loop={true}
//           pagination={{
//             clickable: true,
//           }}
//           navigation={{
//             nextEl: '.swiper-button-next',
//             prevEl: '.swiper-button-prev',
//           }}
//           modules={[Pagination, Navigation]}
//           className="w-full h-full" >
          
     
//           <SwiperSlide>
//                 <img src="../../images/Cars/Tesla/2017-tesla-roadster-deck-model-petersen-automotive-museum.png" alt="Mikhali kalashikov" className="h-full " />
//           </SwiperSlide>

//           <SwiperSlide>
//                 <img src="../../images/Cars/Tesla/desktop-full-hd-tesla-model-s-background.png" alt="Alpha bravo v+charlie" className="h-full " />
//           </SwiperSlide>
          
//           {/* Add more SwiperSlides as needed */}
          
//         </Swiper>
//         {/* Custom Navigation Buttons */}
//         <div
//           className="swiper-button-next bg-black text-white p-2 rounded-full flex items-center justify-center w-8 h-8 absolute top-1/2 right-10 transform -translate-y-1/2 z-10 md:block "
//           style={{ color: 'white', backgroundColor: 'black', padding: '1.5rem',  borderRadius: '9999px' }}
//         >
//           {/* Next icon or text here */}
//         </div>
//         <div
//           className="swiper-button-prev bg-black text-white p-2 rounded-full flex items-center justify-center w-8 h-8 absolute top-1/2 left-10 transform -translate-y-1/2 z-10 md:block "
//           style={{ color: 'white', backgroundColor: 'black', padding: '1.5rem',  borderRadius: '9999px' }}
//         >
//           {/* Prev icon or text here */}
//         </div>

//       </div>
       
//     </div>
//   )
// }

// export default page