"use client"

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { fetchUserOverview, fetchUserOverviewDetail } from './helperapis'; 

const SystemOverview = () => {
  const [userOverview, setUserOverview] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [vehicleData, setVehicleData] = useState<any>({});

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) { setError("Please log in to view your user overview."); return; }
    try { 
      const userOverviewData = await fetchUserOverview(token); 
      setUserOverview(userOverviewData); 
      const userDataSummary = await fetchUserOverviewDetail(token); 
      setVehicleData(userDataSummary); 
    } 
    catch (err: unknown) { 
      if (err instanceof Error) { setError(err.message); } 
      else { setError("An unknown error occurred.") ; } 
      console.error('Error fetching data:', err) ; 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  
  return (
    <div className="flex flex-col">
      
      <Header />

      <div className="h-[90vh] bg-red-400 px-12 py-10">
          
      <div className="flex gap-6 ">
        
        <div className='flex flex-col gap-4'>
          <div className="card w-52 h-auto bg-white text-black rounded-xl flex flex-col justify-between p-4 transition-all duration-1000 hover:bg-black hover:text-white shadow-lg">
            <div className="number text-5xl font-bold overflow-hidden text-ellipsis">
              <p>{userOverview.totalUniqueModels}</p>
            </div>
            <div className="description text-sm text-left">
              Total Unique Vehicle Models visited
            </div>
          </div>

          <div className="card w-52 h-auto bg-white text-black rounded-xl flex flex-col justify-between p-4 transition-all duration-1000 hover:bg-black hover:text-white shadow-lg">
            <div className="number text-5xl font-bold overflow-hidden text-ellipsis">
              <p>{vehicleData.totalModels}</p>
            </div>
            <div className="description text-sm text-left">
              Total Inventory of our Vehicles
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div className="card w-52 h-auto bg-white text-black rounded-xl flex flex-col justify-between p-4 transition-all duration-1000 hover:bg-black hover:text-white shadow-lg">
            <div className="number text-5xl font-bold overflow-hidden text-ellipsis">
              <p>{userOverview.averagePrice ? userOverview.averagePrice.toFixed(2) : '0.00'}</p>
            </div>
            <div className="description text-sm text-left">
              Average Price vehicles you've viewed
            </div>
          </div>

          <div className="card w-52 h-auto bg-white text-black rounded-xl flex flex-col justify-between p-4 transition-all duration-1000 hover:bg-black hover:text-white shadow-lg">
            <div className="number text-5xl font-bold overflow-hidden text-ellipsis">
              <p>{userOverview.averageTorque ? userOverview.averageTorque.toFixed(2) : '0.00'}</p>
            </div>
            <div className="description text-sm text-left">
              Average Torque of vehicles you've viewed
            </div>
          </div>

          <div className="card w-52 h-auto bg-white text-black rounded-xl flex flex-col justify-between p-4 transition-all duration-1000 hover:bg-black hover:text-white shadow-lg">
            <div className="number text-5xl font-bold overflow-hidden text-ellipsis">
              <p>{userOverview.averageHorsepower ? userOverview.averageHorsepower.toFixed(2) : '0.00'}</p>
            </div>
            <div className="description text-sm text-left">
              Average Horsepower of vehicles you've viewed
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div className="card w-52 h-auto bg-white text-black rounded-xl flex flex-col justify-between p-4 transition-all duration-1000 hover:bg-black hover:text-white shadow-lg">
            <div className="number text-5xl font-bold overflow-hidden text-ellipsis">
              <p>{userOverview.mostFavoriteEngineType || 'N/A'}</p>
            </div>
            <div className="description text-sm text-left">
              Your Most Favorite Engine Type
            </div>
          </div>

          <div className="card w-52 h-auto bg-white text-black rounded-xl flex flex-col justify-between p-4 transition-all duration-1000 hover:bg-black hover:text-white shadow-lg">
            <div className="number text-5xl font-bold overflow-hidden text-ellipsis">
              <p>{userOverview.mostFavoriteVehicleType || 'N/A'}</p>
            </div>
            <div className="description text-sm text-left">
              Your Most Favorite Vehicle Type
            </div>
          </div>
        </div>

        <div className="card w-52 h-auto bg-white text-black rounded-xl flex flex-col justify-between p-4 transition-all duration-1000 hover:bg-black hover:text-white shadow-lg">
          <div className="number text-3xl font-bold overflow-hidden text-ellipsis">
            <p>{userOverview.mostViewedYearRange || 'N/A'}</p>
          </div>
          <div className="description text-sm text-left">
            Your Most Viewed Vehicle Year Range
          </div>
        </div>          

        <div className='flex flex-col gap-4'>
          <div className="card w-52 h-auto bg-white text-black rounded-xl flex flex-col justify-between p-4 transition-all duration-1000 hover:bg-black hover:text-white shadow-lg">
            <div className="number text-5xl font-bold overflow-hidden text-ellipsis">
              <p>{vehicleData.totalComments}</p>
            </div>
            <div className="description text-sm text-left">
              Total Comments You Posted
            </div>
          </div>

          <div className="card w-52 h-auto bg-white text-black rounded-xl flex flex-col justify-between p-4 transition-all duration-1000 hover:bg-black hover:text-white shadow-lg">
            <div className="number text-5xl font-bold overflow-hidden text-ellipsis">
              <p>{vehicleData.totalReplies}</p>
            </div>
            <div className="description text-sm text-left">
              Total Replies You Posted
            </div>
          </div>

          <div className="card w-52 h-auto bg-white text-black rounded-xl flex flex-col justify-between p-4 transition-all duration-1000 hover:bg-black hover:text-white shadow-lg">
            <div className="number text-5xl font-bold overflow-hidden text-ellipsis">
              <p>{vehicleData.totalRepliesReceived}</p>
            </div>
            <div className="description text-sm text-left">
              Total Replies You Received
            </div>
          </div>
        </div>

        <div className="card w-52 h-auto bg-white text-black rounded-xl flex flex-col justify-between p-4 transition-all duration-1000 hover:bg-black hover:text-white shadow-lg">
          <div className="number text-5xl font-bold overflow-hidden text-ellipsis">
            <p>{userOverview.totalFavorites}</p>
          </div>
          <div className="description text-sm text-left">
            Your Total Favorites
          </div>
        </div>

        <div className="card w-80 h-auto bg-white text-black rounded-xl flex flex-col justify-between p-4 transition-all duration-1000 hover:bg-black hover:text-white shadow-lg">
          <div className="description text-lg text-left">
            My Top 3 Most Visited Brands:
          </div>
          <div className="number text-5xl font-bold">
            <ul>
              {userOverview.topBrands?.map(([brand, count]: [string, number], index: number) => (
                <li key={index}>{brand}: {count}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>

        {error && <p className="text-red-500">{error}</p>}
      
      </div>
    </div>
  );
};


export default SystemOverview;



// <div className='flex flex-col gap-4'>
//           <div className="card w-52 h-auto bg-white text-black rounded-xl flex flex-col justify-between p-4 transition-all duration-1000 hover:bg-black hover:text-white shadow-lg">
//             <div className="number text-5xl font-bold overflow-hidden text-ellipsis">
//               <p>{userOverview.averagePrice ? userOverview.averagePrice.toFixed(2) : '0.00'}</p>
//             </div>
//             <div className="description text-sm text-left">
//               Average Price vehicles you've viewed
//             </div>
//           </div>

//           <div className="card w-52 h-auto bg-white text-black rounded-xl flex flex-col justify-between p-4 transition-all duration-1000 hover:bg-black hover:text-white shadow-lg">
//             <div className="number text-5xl font-bold overflow-hidden text-ellipsis">
//               <p>{userOverview.averageTorque ? userOverview.averageTorque.toFixed(2) : '0.00'}</p>
//             </div>
//             <div className="description text-sm text-left">
//               Average Torque of vehicles you've viewed
//             </div>
//           </div>

//           <div className="card w-52 h-auto bg-white text-black rounded-xl flex flex-col justify-between p-4 transition-all duration-1000 hover:bg-black hover:text-white shadow-lg">
//             <div className="number text-5xl font-bold overflow-hidden text-ellipsis">
//               <p>{userOverview.averageHorsepower ? userOverview.averageHorsepower.toFixed(2) : '0.00'}</p>
//             </div>
//             <div className="description text-sm text-left">
//               Average Horsepower of vehicles you've viewed
//             </div>
//           </div>
//         </div>


// right now , the average price, torque and horsepower are showing as floating point numbers ..
// i want them to be converted to integers.. 
// also i want a small $ symbol right next to price integer, a small Nm symbol right next to integer torque and a small hp symbol right next to Integer horsepower. 

