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
      
      <canvas ref={canvasRef} className="mx-auto mt-8"></canvas>
    </div>
  );
}


