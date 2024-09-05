"use client"

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { data } from '../../../MyCarsData/TeslaData';

import Slider from './StatisticSlider'
import TransparentNabar from './TransparentNabar'

const SpecPage = () => {
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

export default SpecPage;

