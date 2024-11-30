"use client"

import React from 'react';
import Header from '../components/Header';
import { BarChartHero } from './BarChartHero'; // Import the BarChartHero component
import { HorizontalBarChartYearRanges } from './BarChartvertical'; // Import the BarChartHero component
import { DonutChartVehicleTypes } from './DonutChartVehicleTypes'; // Import the BarChartHero component
import { DonutChartEngineTypes } from './DonutChartEngineTypes'; // Import the BarChartHero component

const dashboard = () => {
  return (
    <div className="flex flex-col">
      
      <Header />
      <div className="h-[90vh] bg-white px-12 py-10">
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <BarChartHero  /> {/* Use the BarChartHero component */}
              <DonutChartVehicleTypes  /> {/* Use the BarChartHero component */}
              <DonutChartEngineTypes  /> {/* Use the BarChartHero component */}
              <HorizontalBarChartYearRanges  /> {/* Use the BarChartHero component */}
          </div>
      </div>
    </div>
  );
};

export default dashboard;



