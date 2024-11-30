"use client";

import React, { useState, useEffect } from "react";
import { DonutChart, TooltipProps } from "../../components/tremor/DonotChart";

interface VehicleTypeData {
  type: string;
  percentage: number;
  color: string;
}

export function DonutChartVehicleTypes() {
  const [data, setData] = useState<VehicleTypeData[]>([]);
  const [tooltipData, setTooltipData] = useState<TooltipProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to view vehicle types data.");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/vehicle-types-donut", {
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
        const colors = generateDynamicColors(data.vehicleTypes.length);

        // Transform backend data
        const transformedData = data.vehicleTypes.map((type: string, index: number) => ({
          type,
          percentage: data.percentages[index],
          color: colors[index],
        }));

        setData(transformedData);
      } catch (err) {
        console.error("Error fetching vehicle types data:", err);
        setError("Could not load vehicle types data.");
      }
    };

    fetchVehicleTypes();
  }, []);

  const generateDynamicColors = (count: number) => {
    // Dynamically generate 'count' colors
    const colors = [];
    const hueStep = 360 / count; // Distribute hues evenly
    for (let i = 0; i < count; i++) {
      colors.push(`hsl(${i * hueStep}, 70%, 50%)`);
    }
    return colors;
  };

  const sumValues = (arr: number[]) => arr.reduce((sum, val) => sum + val, 0);
  const percentageFormatter = (number: number) => `${Intl.NumberFormat("us").format(number)}%`;

  const payload = tooltipData?.payload?.[0];
  const value = payload?.value ?? 0;

  const formattedValue = payload
    ? percentageFormatter(value)
    : percentageFormatter(sumValues(data.map((item) => item.percentage)));

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
      <DonutChart
        data={data}
        category="type"
        value="percentage"
        className="mx-auto mt-8"
        // colors={data.map((item) => item.color)} // Dynamic colors
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
