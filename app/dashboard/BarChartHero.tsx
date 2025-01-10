"use client";

import React, { useState, useEffect } from "react";
import { BarChart } from "../../components/tremor/Barcharts"; // Import your BarChart component

interface BrandVisitsData {
  brands: string[];
  visits: number[];
}

export const BarChartHero: React.FC = () => {
  const [chartData, setChartData] = useState<{ date: string; Visits: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 

  useEffect(() => {
    const fetchBrandVisits = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to view your brand visits.");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/brand-visits-chart`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch brand visits data.");
        }

        const data: BrandVisitsData = await response.json();

        // Transform data for the BarChart
        const transformedData = data.brands.map((brand, index) => ({
          date: brand,
          Visits: data.visits[index],
        }));

        setChartData(transformedData);
      } catch (err) {
        console.error("Error fetching brand visits data:", err);
        setError("Could not load brand visits data.");
      }
    };

    fetchBrandVisits();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (chartData.length === 0) {
    return <p>Loading brand visits data...</p>;
  }

  return (
    <BarChart
      className="h-80"
      data={chartData}
      index="date"
      categories={["Visits"]}
      valueFormatter={(number: number) =>
        `${Intl.NumberFormat("us").format(number).toString()} visits`
      }
      onValueChange={(v) => console.log(v)}
    />
  );
};
