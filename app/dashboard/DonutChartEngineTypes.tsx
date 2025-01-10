"use client";

import React, { useState, useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface EngineTypeData {
  type: string;
  percentage: number;
}

export function DonutChartEngineTypes() {
  const [data, setData] = useState<EngineTypeData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 

  useEffect(() => {
    const fetchEngineTypes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to view engine types data.");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/engine-types-donut`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch engine types data.");
        }

        const data = await response.json(); 

        // Transform backend data
        const transformedData = data.engineTypes.map((type: string, index: number) => ({
          type,
          percentage: data.percentages[index],
        }));

        setData(transformedData);
      } catch (err) {
        console.error("Error fetching engine types data:", err);
        setError("Could not load engine types data.");
      }
    };

    fetchEngineTypes();
  }, []);

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return; // Ensure ctx is valid

    const engineTypes = data.map((item) => item.type);
    const percentages = data.map((item) => item.percentage);

    // Define the colors as per your original component
    const colors: { [key: string]: string } = {
      Diesel: "#FFD700",   // Yellow
      Hybrid: "#0000FF",   // Blue
      Electric: "#008000", // Green
      Petrol: "#00FF00",   // Black
      Unknown: "#808080",  // Gray for unknown types
    };

    // Map the colors to the types, defaulting to gray if the type is not in the map
    const chartColors = engineTypes.map(type => colors[type] || colors["Unknown"]);

    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: engineTypes,
        datasets: [
          {
            data: percentages,
            backgroundColor: chartColors,
            hoverBackgroundColor: chartColors,
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

  if (error) return <p className="text-red-500">{error}</p>;
  if (data.length === 0) return <p>Loading engine types data...</p>;

  return (
    <div className="mb-3">
      <p className="text-center text-xl font-bold text-black dark:text-gray-300">
        Engine Types Visited
      </p>
      <p className="mt-2 w-full text-center text-xl font-semibold text-gray-900 dark:text-gray-50">
        {`${Intl.NumberFormat("us").format(data.reduce((sum, item) => sum + item.percentage, 0))}%`}
      </p>
      <canvas ref={canvasRef} className="mx-auto mt-5"></canvas>
    </div>
  );
}

























// "use client";

// import React, { useState, useEffect } from "react";
// import { DonutChart, TooltipProps } from "../../components/tremor/DonotChart";

// interface EngineTypeData {
//   type: string;
//   percentage: number;
// }

// export function DonutChartEngineTypes() {
//   const [data, setData] = useState<EngineTypeData[]>([]);
//   const [tooltipData, setTooltipData] = useState<TooltipProps | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchEngineTypes = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Please log in to view engine types data.");
//         return;
//       }

//       try {
//         const response = await fetch("http://localhost:8000/engine-types-donut", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch engine types data.");
//         }

//         const data = await response.json(); 

//         // Transform backend data
//         const transformedData = data.engineTypes.map((type: string, index: number) => ({
//           type,
//           percentage: data.percentages[index],
//         }));

//         setData(transformedData);
//       } catch (err) {
//         console.error("Error fetching engine types data:", err);
//         setError("Could not load engine types data.");
//       }
//     };

//     fetchEngineTypes();
//   }, []);

//   const sumValues = (arr: number[]) => arr.reduce((sum, val) => sum + val, 0);
//   const percentageFormatter = (number: number) => `${Intl.NumberFormat("us").format(number)}%`;

//   const payload = tooltipData?.payload?.[0];
//   const value = payload?.value ?? 0;

//   const formattedValue = payload
//     ? percentageFormatter(value)
//     : percentageFormatter(sumValues(data.map((item) => item.percentage)));

//   if (error) return <p className="text-red-500">{error}</p>;
//   if (data.length === 0) return <p>Loading engine types data...</p>;

//   // Define the predefined color names available in Tremor
//   const predefinedColors: ("blue" | "emerald" | "violet" | "amber" | "gray" | "cyan" | "pink" | "lime" | "fuchsia")[] = [
//     "blue", "emerald", "violet", "amber", "gray", "cyan", "pink", "lime", "fuchsia"
//   ];
  
//   // Map the dynamic data count to the predefined color list
//   const colors = predefinedColors.slice(0, data.length);

//   return (
//     <div className="mt-7">
//       <p className="text-center text-xl font-bold text-black dark:text-gray-300">
//         Engine Types Visited
//       </p>
//       <p className="mt-2 w-full text-center text-xl font-semibold text-gray-900 dark:text-gray-50">
//         {formattedValue}
//       </p>
//       <DonutChart
//         data={data}
//         category="type"
//         value="percentage"
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



