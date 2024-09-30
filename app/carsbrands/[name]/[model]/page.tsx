"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import Slider from './StatisticSlider';
import Navbar from '../../../components/Navbar';
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






// "use client";

// import React, { useEffect, useState } from 'react';
// import { useSearchParams, usePathname } from 'next/navigation';
// import Slider from './StatisticSlider';
// import Navbar from './Navbar';

// const SpecPage = () => {
//   const searchParams = useSearchParams();
//   const modelName = searchParams.get('model') || '';
//   const [modelData, setModelData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   // Extract the carname and carid from the pathname
//   const pathname = usePathname();
//   const pathSegments = pathname.split('/');

//   // Assuming the URL structure is /carsbrands/[carname][carid]/page
//   const carnameWithId = pathSegments[pathSegments.length - 2] || '';
//   const brandname = carnameWithId.replace(/\d+$/, ''); // Remove numeric part to get carname
//   const id = carnameWithId.match(/\d+$/) ? parseInt(carnameWithId.match(/\d+$/)?.[0] as string, 10) : null; // Extract numeric part for carid

//   console.log('Brand name:', brandname);
//   console.log('Car ID:', id);
//   console.log('Model Name:', modelName);

//   // Fetch data from the backend
//   useEffect(() => {
//     const fetchData = async () => {
//       if (brandname && id !== null && modelName) {
//         try {
//           const response = await fetch(`http://localhost:8000/get-brand-model/${brandname}/${id}/${modelName}`);
//           if (!response.ok) {
//             throw new Error(`Error fetching data: ${response.statusText}`);
//           }
//           const data = await response.json();
//           setModelData(data);
//           setLoading(false);
//         } catch (error) {
//           console.error('Error fetching model data:', error);
//           setLoading(false);
//         }
//       }
//     };
//     fetchData();
//   }, [brandname, id, modelName]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       <Navbar />
//       {modelData ? (
//         <Slider modelName={modelName} modelData={modelData} />
//       ) : (
//         <p>Data not found</p>
//       )}
//     </div>
//   );
// };

// export default SpecPage;
















// "use client"

// import React, { useEffect, useState } from 'react';
// import { useSearchParams , usePathname} from 'next/navigation';
// import Slider from './StatisticSlider';
// import Navbar from './Navbar';

// const SpecPage = () => {

//   const searchParams = useSearchParams();
//   const modelName = searchParams.get('model') || '';
//   const [modelData, setModelData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   // Extract the carname and carid from the pathname
//   const pathname = usePathname()
//   // const path = router.asPath;
//   const pathSegments = pathname.split('/');
  
//   // Assuming the URL structure is /carsbrands/[carname][carid]/page
//   const carnameWithId = pathSegments[pathSegments.length - 2] || '';
//   // const carid = pathSegments[pathSegments.length - 1].replace(/[^a-zA-Z0-9]/g, '');

//   // Split the carnameWithId into carname and carid based on your naming conventions
//   const brandname = carnameWithId.replace(/\d+$/, ''); // Remove numeric part to get carname
//   const id = carnameWithId.match(/\d+$/); // Extract numeric part for carid

//   console.log('Brand name:', brandname);
//   console.log('Car ID:', id ? id[0] : 'Unknown');
//   console.log('Model Name' , modelName )

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Dynamically import the data module
//         const module = await import(`../../../MyCarsData/${brandname}${id}`);
//         const data = module.data;

//         // Find the model data from the data array
//         const foundData = data.find((item: any) => item.model === modelName);
//         setModelData(foundData);
//       } catch (error) {
//         console.error('Failed to load data module:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [brandname, id, modelName]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       <Navbar />
//       {modelData ? (
//         <Slider modelName={modelName} modelData={modelData} />
//       ) : (
//         <p>Data not found</p>
//       )}
//     </div>
//   );
// };

// export default SpecPage;

