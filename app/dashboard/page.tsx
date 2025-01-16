"use client"

import React from 'react';
import Header from '../components/Header';
import { BarChartHero } from './BarChartHero'; // Import the BarChartHero component
import { HorizontalBarChartYearRanges } from './BarChartvertical'; // Import the BarChartHero component
import { DonutChartVehicleTypes } from './DonutChartVehicleTypes'; // Import the BarChartHero component
import { DonutChartEngineTypes } from './DonutChartEngineTypes'; // Import the BarChartHero component
import { Button } from '@nextui-org/react';

import dynamic from 'next/dynamic';

// Dynamically import html2pdf.js with ssr: false to ensure it's used only on the client-side
const html2pdf = dynamic(() => import('html2pdf.js').then((mod) => mod.default), { ssr: false });

const dashboard = () => {
  
  // Function to trigger the PDF download
  const handleDownload = () => {
    const element = document.getElementById("report-content"); // Get the container with all the charts

    if (element && html2pdf) {
      const options = {
        filename: 'charts-report.pdf', // Customize the file name
        html2canvas: { scale: 2 }, // Optional: adjust the scale for higher quality PDF
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }, // Customize PDF format
      };
      // Cast html2pdf to any to avoid the TypeScript error
      (html2pdf as any).from(element).set(options).save(); // Generate and save the PDF
    }
  };

  return (
    <div className="flex flex-col">
      
      <Header />
      <div className="bg-white px-12 py-10">
          <div id="report-content" className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <BarChartHero  /> {/* Use the BarChartHero component */}
              <DonutChartVehicleTypes  /> {/* Use the DonutChartVehicleTypes component */}
              <DonutChartEngineTypes  /> {/* Use the DonutChartEngineTypes component */}
              <HorizontalBarChartYearRanges  /> {/* Use the BarChartHero component */}
          </div>
          <Button
            size="lg"
            color="warning"
            className="absolute top-36 right-10"
            onClick={handleDownload} 
          >
            Generate Report
          </Button>
      </div>
    </div>
  );
};

export default dashboard;
