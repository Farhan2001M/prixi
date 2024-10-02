"use client";

import React, { useEffect, useState } from 'react';
import Cards from '../../components/CarBrands/CarCards';
import Range from './Filter';
import Header from '../../components/Header';
import Accodion from '../../components/CarBrands/Acoordion';
import Slider from '../../components/CarBrands/Slider';
import { usePathname } from 'next/navigation';
import { VehicleModel } from '../../MyCarsData/Types';  // Updated to use the new VehicleModel interface
import {Input} from "@nextui-org/react";

const MainPage = () => {
  const [MyData, setMyData] = useState<VehicleModel[]>([]);
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState('');  // New state for search term
  
  // Extract car brand name from URL (e.g., /carsbrands/Tesla)
  const pathParts = pathname.split('/');
  const BrandName = pathParts[pathParts.length - 1];  // Get the brand name

  // Fetch data from the backend based on the car brand name
  useEffect(() => {
    const fetchCarModels = async () => {
      if (BrandName) {
        try {
          const response = await fetch(`http://localhost:8000/get-car-brand/${BrandName}`);
          if (!response.ok) {
            throw new Error(`Error fetching car data: ${response.statusText}`);
          }
          const data = await response.json();
          setMyData(data.models);  // Assuming `models` is the key in the document that holds car models
        } catch (err) {
          console.error('Error fetching car models:', err);
        }
      }
    };
    fetchCarModels();
  }, [BrandName]);

  const [filters, setFilters] = useState({
    priceRange: [0, 2500000],
    yearRange: [1980, 2030],
    vehicleTypes: [] as string[],
    minSeatingCapacity: 1,
    horsepowerRange: [0, 2500],
  });

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  // Apply filters to the data
  const filteredData = MyData.filter((car: VehicleModel) => {
    const launchPrice = car.launchPrice || 0;
    const year = car.year || 0;
    const horsepower = car.horsepower || 0;
    const seatingCapacity = car.seatingCapacity || 0;

    const vehicleTypeMatch = filters.vehicleTypes.length === 0 || 
      filters.vehicleTypes.some(type => car.vehicleType?.toLowerCase().includes(type.toLowerCase()));

      // Filter by model name based on searchTerm
    const modelNameMatch = car.modelName.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      launchPrice >= filters.priceRange[0] &&
      launchPrice <= filters.priceRange[1] &&
      vehicleTypeMatch &&
      seatingCapacity >= filters.minSeatingCapacity &&
      horsepower >= filters.horsepowerRange[0] &&
      horsepower <= filters.horsepowerRange[1] &&
      year >= filters.yearRange[0] &&
      year <= filters.yearRange[1] &&
      modelNameMatch  // Include modelName filter
    );
  });

  return (
    <div className="flex flex-col">
      <Header />

      <div className='m-8 w-10/12 mx-auto'>
        <div className='flex justify-between'>
          <Accodion /> 

          {/* New Search Bar */}
          
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-md shadow-sm w-1/3"
            placeholder="Search by model name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}  // Update search term on input change
          />
          
          <Range onFiltersChange={handleFiltersChange} brandName={BrandName} />
        </div>
      
      </div>

      <div className='m-4 w-10/12 mx-auto'>
        <Slider />
      </div>

      <div className='m-4 w-10/12 mx-auto'>
        
      </div>

      <div className='m-4 w-10/12 mx-auto'>
        <Cards filter={filteredData} brandname={BrandName} />
      </div>
    </div>
  );
};

export default MainPage;



































// "use client";

// import React, { useEffect, useState } from 'react';
// import Cards from '../../components/CarBrands/CarCards';
// import Range from './Filter';
// import Header from '../../components/Header';
// import Accodion from '../../components/CarBrands/Acoordion';
// import Slider from '../../components/CarBrands/Slider';
// import { usePathname } from 'next/navigation';
// import { Models } from '../../MyCarsData/Types';

// const MainPage = () => {
//   const [MyData, setMyData] = useState<Models[]>([]);
//   const pathname = usePathname();
  
//   // Extract car name and ID from URL (e.g., /carsbrands/Tesla53)
//   const pathParts = pathname.split('/');
//   const carBrandWithId = pathParts[pathParts.length - 1];
//   const BrandName = carBrandWithId.replace(/\d+$/, ''); // Extract car name (e.g., Tesla)
//   const BrandId = parseInt(carBrandWithId.replace(/^\D+/, ''), 10); // Extract car ID as a number (e.g., 3,6,10 etc)

//   // Fetch data from the backend based on the car name and ID
//   useEffect(() => {
//     const fetchCarModels = async () => {
//       if (BrandName && BrandId) {
//         try {
//           const response = await fetch(`http://localhost:8000/get-car-brand/${BrandName}/${BrandId}`);
//           if (!response.ok) {
//             throw new Error(`Error fetching car data: ${response.statusText}`);
//           }
//           const data = await response.json();
//           setMyData(data.models);  // Assuming `models` is the key in the document that holds car models
//         } catch (err) {
//           console.error('Error fetching car models:', err);
//         }
//       }
//     };
//     fetchCarModels();
//   }, [BrandName, BrandId]);

//   const [filters, setFilters] = useState({
//     priceRange: [0, 2500000],
//     yearRange: [1900, 2030],
//     vehicleTypes: [] as string[],
//     minSeatingCapacity: 1,
//     horsepowerRange: [0, 2500],
//   });

//   const handleFiltersChange = (newFilters: any) => {
//     setFilters(newFilters);
//   };

//   const extractSeatingCapacity = (seatingCapacity: any) => {
//     const match = seatingCapacity.match(/\d+/);
//     return match ? parseInt(match[0], 10) : 0;
//   };

//   console.log(MyData)

//   // Apply filters to the data
//   const filteredData = MyData.filter((car: any) => {
//     const startingPrice = car.startingPrice ? parseInt(car.startingPrice.replace(/[^0-9]/g, '')) : 0;
        
//     // Extract release year, handling both single years and ranges
//     let releaseYear = 0;
//     if (filters.yearRange.length === 2) {
//       const yearRange = filters.yearRange.join('-');
//       if (yearRange.includes('-')) {
//         // If there's a range, take the first part
//         releaseYear = parseInt(yearRange.split('-')[0]);
//       } else {
//         // If it's a single year, parse it normally
//         releaseYear = parseInt(yearRange);
//       }
//     }

//     // Extract horsepower, handling both single numbers and ranges
//     const horsepowerString = car.horsepower?.replace(/[^0-9-]/g, '') || '0';
//     let horsepower = 0;
//     if (horsepowerString.includes('-')) {
//       // If there's a range, take the first part
//       horsepower = parseInt(horsepowerString.split('-')[0]);
//     } else {
//       // If it's a single number, parse it normally
//       horsepower = parseInt(horsepowerString);
//     }
  
//     const carSeatingCapacity = extractSeatingCapacity(car.seatingCapacity || "");
//     const vehicleTypeMatch = filters.vehicleTypes.length === 0 || filters.vehicleTypes.some(type => car.vehicleType?.toLowerCase().includes(type.toLowerCase()));
  
//     return (
//       startingPrice >= filters.priceRange[0] &&
//       startingPrice <= filters.priceRange[1] &&
//       releaseYear >= filters.yearRange[0] &&
//       releaseYear <= filters.yearRange[1] &&
//       vehicleTypeMatch &&
//       carSeatingCapacity >= filters.minSeatingCapacity &&
//       horsepower >= filters.horsepowerRange[0] &&
//       horsepower <= filters.horsepowerRange[1]
//     );
//   });
  
//   console.log(filteredData);
  

//   return (
//     <div className="flex flex-col">
//       <Header />

//       <div className='m-8 w-10/12 mx-auto'>
//         <Accodion />
//       </div>

//       <div className='m-4 w-10/12 mx-auto'>
//         <Slider />
//       </div>

//       <div className='m-4 w-10/12 mx-auto'>
//         <Range onFiltersChange={handleFiltersChange} />
//       </div>

//       <div className='m-4 w-10/12 mx-auto'>
//         <Cards filter={filteredData} brandname={BrandName} brandid={BrandId.toString()} />
//       </div>

//       <h1>In Dynamic MainPage</h1>
//     </div>
//   );
// };

// export default MainPage;




// import { data } from '../../MyCarsData/Tesla53'; /// Know how it is coming in BRcakets and wothout it