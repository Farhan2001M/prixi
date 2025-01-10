"use client";

import React, { useState, useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface VehicleTypeData {
  name: string;  // Vehicle type name
  value: number; // Percentage value
}

// Define a color mapping for vehicle types
const vehicleTypeColors: { [key: string]: string } = {
  Sedan: '#000000',        // Black
  'Pickup-Truck': '#EEA200', // Yellow
  Coupe: '#FFCE56',         // Yellow
  SUV: '#4BC0C0',           // Teal
  Hatchback: '#9966FF',     // Purple
  Compact: '#FF9F40',       // Orange
  Unknown: '#808080',      // Gray for unknown types
};

export function DonutChartVehicleTypes() {
  const [data, setData] = useState<VehicleTypeData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to view vehicle types data.");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/vehicle-types-donut`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch vehicle types data.");
        }

        const data = await response.json(); // { vehicleTypes: [...], percentages: [...] }

        console.log(data); // Check the structure of the fetched data

        // Transform the backend data into the structure needed by the chart
        const transformedData = data.vehicleTypes.map((type: string, index: number) => ({
          name: type, // Vehicle type (e.g., 'Sedan')
          value: data.percentages[index], // Corresponding percentage value
        }));

        setData(transformedData);
      } catch (err) {
        console.error("Error fetching vehicle types data:", err);
        setError("Could not load vehicle types data.");
      }
    };

    fetchVehicleTypes();
  }, []);

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return; // Ensure ctx is valid

    const vehicleTypes = data.map((item) => item.name);
    const percentages = data.map((item) => item.value);

    // Map the colors based on the vehicle type
    const colors = vehicleTypes.map(type => vehicleTypeColors[type] || vehicleTypeColors['Unknown']);

    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: vehicleTypes,
        datasets: [
          {
            data: percentages,
            backgroundColor: colors,
            hoverBackgroundColor: colors,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const value = tooltipItem.raw;
                return `${tooltipItem.label}: ${value}%`;
              },
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [data]);

  const sumValues = (arr: number[]) => arr.reduce((sum, val) => sum + val, 0);
  const percentageFormatter = (number: number) => `${Intl.NumberFormat("us").format(number)}%`;

  const formattedValue = percentageFormatter(sumValues(data.map((item) => item.value)));

  if (error) return <p className="text-red-500">{error}</p>;
  if (data.length === 0) return <p>Loading vehicle types data...</p>;

  return (
    <div className="mt-7">
      <p className="text-center text-xl font-bold text-black dark:text-gray-300">
        Vehicle Types Visited
      </p>
      <p className="mt-2 w-full text-center text-3xl font-semibold text-gray-900 dark:text-gray-50">
        {formattedValue}
      </p>
      <canvas ref={canvasRef} className="mx-auto mt-8"></canvas>
    </div>
  );
}



















































// "use client";

// import React, { useState, useEffect } from "react";
// import { DonutChart, TooltipProps } from "../../components/tremor/DonotChart"; // Assuming you have your own DonutChart component

// interface VehicleTypeData {
//   name: string;  // Vehicle type name
//   value: number; // Percentage value
// }

// export function DonutChartVehicleTypes() {
//   const [data, setData] = useState<VehicleTypeData[]>([]);
//   const [tooltipData, setTooltipData] = useState<TooltipProps | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchVehicleTypes = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Please log in to view vehicle types data.");
//         return;
//       }

//       try {
//         const response = await fetch("http://localhost:8000/vehicle-types-donut", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch vehicle types data.");
//         }

//         const data = await response.json(); // { vehicleTypes: [...], percentages: [...] }

//         console.log(data); // Check the structure of the fetched data

//         // Transform the backend data into the structure needed by the chart
//         const transformedData = data.vehicleTypes.map((type: string, index: number) => ({
//           name: type, // Vehicle type (e.g., 'Sedan')
//           value: data.percentages[index], // Corresponding percentage value
//         }));

//         setData(transformedData);
//       } catch (err) {
//         console.error("Error fetching vehicle types data:", err);
//         setError("Could not load vehicle types data.");
//       }
//     };

//     fetchVehicleTypes();
//   }, []);

//   const sumValues = (arr: number[]) => arr.reduce((sum, val) => sum + val, 0);
//   const percentageFormatter = (number: number) => `${Intl.NumberFormat("us").format(number)}%`;

//   const payload = tooltipData?.payload?.[0];
//   const value = payload?.value ?? 0;

//   const formattedValue = payload
//     ? percentageFormatter(value)
//     : percentageFormatter(sumValues(data.map((item) => item.value)));

//   if (error) return <p className="text-red-500">{error}</p>;
//   if (data.length === 0) return <p>Loading vehicle types data...</p>;

//   // Define the predefined color names available in Tremor
//   const predefinedColors: ("blue" | "emerald" | "violet" | "amber" | "gray" | "cyan" | "pink" | "lime" | "fuchsia")[] = [
//     "blue", "emerald", "violet", "amber", "gray", "cyan", "pink", "lime", "fuchsia"
//   ];

//   // Map the dynamic data count to the predefined color list
//   const colors = predefinedColors.slice(0, data.length);

//   return (
//     <div className="mt-7">
//       <p className="text-center text-xl font-bold text-black dark:text-gray-300">
//         Vehicle Types Visited
//       </p>
//       <p className="mt-2 w-full text-center text-3xl font-semibold text-gray-900 dark:text-gray-50">
//         {formattedValue}
//       </p>
//       <DonutChart
//         data={data} // Use the transformed data
//         category="name" // The field to represent categories (vehicle types)
//         value="value" // The field to represent values (percentages)
//         className="mx-auto mt-8"
//         colors={colors} // Use predefined colors
//         tooltipCallback={(props) => {
//           if (props.active) {
//             setTooltipData(props);
//           } else {
//             setTooltipData(null);
//           }
//           return null;
//         }}
//       />
//     </div>
//   );
// }
