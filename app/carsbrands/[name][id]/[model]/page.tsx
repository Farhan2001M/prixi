"use client"

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { data } from '../../../MyCarsData/TeslaData';

import Slider from './StatisticSlider'
import Navbar from './Navbar'

const SpecPage = () => {
  const searchParams = useSearchParams();
  const modelName = searchParams.get('model') || '';
  console.log(modelName)

  // Find the model data from the data array
  const modelData = data.find(item => item.model === modelName);

  return (

    <div>

      <Navbar/>
      {modelData ? ( <Slider modelName={modelName} modelData={modelData} /> ) : (<p>Data not found</p> )}

    </div>

    

  );
};

export default SpecPage;

