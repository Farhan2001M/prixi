"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import Slider from './StatisticSlider';
import Header from '../../../components/Header';

const SpecPage = () => {
  const searchParams = useSearchParams();
  const modelName = searchParams.get('model') || '';
  const [modelData, setModelData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Extract the car brand name from the pathname
  const pathname = usePathname();
  const pathSegments = pathname.split('/');

  // Assuming the URL structure is /carsbrands/[brandname]/page
  const brandname = pathSegments[pathSegments.length - 2] || '';

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      if (brandname && modelName) {
        try {
          const response = await fetch(`http://localhost:8000/get-brand-model/${brandname}/${modelName}`);
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }
          const data = await response.json();
          setModelData(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching model data:', error);
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [brandname, modelName]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* <Navbar /> */}
      <Header />
      {modelData ? (
        <Slider  modelData={modelData} brandname={brandname} />
      ) : (
        <p>Data not found</p>
      )}
    </div>
  );
};

export default SpecPage;




