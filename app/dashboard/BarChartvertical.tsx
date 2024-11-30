"use client";

import React, { useState, useEffect } from "react";
import { BarChart } from "../../components/tremor/Barcharts"; // Import your BarChart component

interface YearRangeData {
  yearRange: string;
  visits: number;
}

export const HorizontalBarChartYearRanges: React.FC = () => {
  const [chartData, setChartData] = useState<YearRangeData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchYearRanges = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to view year ranges data.");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/year-ranges-chart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch year ranges data.");
        }

        const data = await response.json(); // { yearRanges: [...], visits: [...] }

        // Transform backend data
        const transformedData = data.yearRanges.map((range: string, index: number) => ({
          yearRange: range,
          visits: data.visits[index],
        }));

        setChartData(transformedData);
      } catch (err) {
        console.error("Error fetching year ranges data:", err);
        setError("Could not load year ranges data.");
      }
    };

    fetchYearRanges();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (chartData.length === 0) {
    return <p>Loading year ranges data...</p>;
  }

  return (
    <BarChart
      className="h-80"
      data={chartData}
      index="yearRange" // Y-axis label
      categories={["visits"]} // X-axis value
      yAxisWidth={100} // Adjust width for year ranges
      layout="vertical" // Horizontal bar chart
      valueFormatter={(number: number) =>
        `${Intl.NumberFormat("us").format(number)} visits`
      }
    />
  );
};
