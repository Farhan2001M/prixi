"use client"

import React, { useState } from 'react';
import Cards from '../../components/CarBrands/CarCards';
import Range from './Filter';
import { data } from '../../MyCarsData/TeslaData';

import Header from '../../components/Header';
import Accodion from '../../components/CarBrands/Acoordion';
import Slider from '../../components/CarBrands/Slider';

const page = () => {
  const [filters, setFilters] = useState({
    priceRange: [0, 250000],
    yearRange: [2000, 2024],
    vehicleTypes: [] as string[],
    minSeatingCapacity: 2,
    horsepowerRange: [0, 1500],
  });

  const handleFiltersChange = (newFilters:any) => {
    setFilters(newFilters);
  };

  const extractSeatingCapacity = (seatingCapacity:any) => {
    // Extract the first number found in the seatingCapacity string
    const match = seatingCapacity.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0; // Default to 0 if no number is found
  };

  const filteredData = data.filter((car) => {

    // Safely handle optional startingPrice, defaulting to 0 if undefined
    const startingPrice = car.startingPrice ? parseInt(car.startingPrice.replace(/[^0-9]/g, '')) : 0;
    // Safely handle optional releaseDate, skipping this filter if undefined
    const releaseYear = car.releaseDate ? new Date(car.releaseDate).getFullYear() : 0;

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

      <h1>In Dynamic page</h1>
    </div>
  );
};

export default page;