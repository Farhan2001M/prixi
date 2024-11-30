"use client";

import React, { useState, useEffect } from "react";
import { DonutChart, TooltipProps } from "../../components/tremor/DonotChart";

interface EngineTypeData {
  type: string;
  percentage: number;
}

export function DonutChartEngineTypes() {
  const [data, setData] = useState<EngineTypeData[]>([]);
  const [tooltipData, setTooltipData] = useState<TooltipProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEngineTypes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to view engine types data.");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/engine-types-donut", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch engine types data.");
        }

        const data = await response.json(); // { engineTypes: [...], percentages: [...] }

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

  const sumValues = (arr: number[]) => arr.reduce((sum, val) => sum + val, 0);
  const percentageFormatter = (number: number) => `${Intl.NumberFormat("us").format(number)}%`;

  const payload = tooltipData?.payload?.[0];
  const value = payload?.value ?? 0;

  const formattedValue = payload
    ? percentageFormatter(value)
    : percentageFormatter(sumValues(data.map((item) => item.percentage)));

  if (error) return <p className="text-red-500">{error}</p>;
  if (data.length === 0) return <p>Loading engine types data...</p>;

  // Define the predefined color names available in Tremor
  const predefinedColors: ("blue" | "emerald" | "violet" | "amber" | "gray" | "cyan" | "pink" | "lime" | "fuchsia")[] = [
    "blue", "emerald", "violet", "amber", "gray", "cyan", "pink", "lime", "fuchsia"
  ];

  // Map the dynamic data count to the predefined color list
  const colors = predefinedColors.slice(0, data.length);

  return (
    <div className="mt-7">
      <p className="text-center text-xl font-bold text-black dark:text-gray-300">
        Engine Types Visited
      </p>
      <p className="mt-2 w-full text-center text-xl font-semibold text-gray-900 dark:text-gray-50">
        {formattedValue}
      </p>
      <DonutChart
        data={data}
        category="type"
        value="percentage"
        className="mx-auto mt-8"
        colors={colors} // Use predefined colors
        tooltipCallback={(props) => {
          if (props.active) {
            setTooltipData(props);
          } else {
            setTooltipData(null);
          }
          return null;
        }}
      />
    </div>
  );
}




// "use client";

// import React, { useState, useEffect } from "react";
// import { DonutChart, TooltipProps } from "../../components/tremor/DonotChart";

// interface EngineTypeData {
//   type: string;
//   percentage: number;
//   color: string;
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

//         const data = await response.json(); // { engineTypes: [...], percentages: [...] }

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
