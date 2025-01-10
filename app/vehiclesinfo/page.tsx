"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import BrandCard from "./Brandcard";
import { CustomToast, CustomToastContainer } from "../components/CustomToastService";
import { Card, Skeleton } from "@nextui-org/react";

interface BrandData {
  brandName: string;
  modelImages: string[];
}

const VehiclesInfo: React.FC = () => {
  const [brands, setBrands] = useState<BrandData[]>([]);
  const [visitedBrands, setVisitedBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const toastShownRef = useRef(false); // Ensure toast logic runs once

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchBrandsAndVisited = async () => {
      try {
        const brandResponse = await fetch(`${BASE_URL}/get-brands-with-images`);
        const allBrands = await brandResponse.json();
        setBrands(allBrands);

        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("User not logged in.");
          setLoading(false);
          return;
        }

        const visitedResponse = await fetch(`${BASE_URL}/get-user-visited-brands`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const visitedData = await visitedResponse.json();
        setVisitedBrands(visitedData.visitedBrands || []);

        const unvisitedBrands = allBrands.filter(
          (brand: BrandData) => !visitedData.visitedBrands.includes(brand.brandName)
        );

        // Show toast for unvisited brands (only once)
        if (unvisitedBrands.length > 0 && !toastShownRef.current) {
          toastShownRef.current = true; // Mark as shown
          if (!localStorage.getItem("toastShown")) {
            setTimeout(function() {
              CustomToast.success("New unvisited brands available! Check them out.");
              localStorage.setItem("toastShown", "true");
            }, 2500); // 2000 milliseconds = 2 seconds
          }
        }
      } catch (error) {
        console.error("Error fetching brands or visited data:", error);
      } finally {
        setTimeout(() => setLoading(false), 1000); // Simulate 1-second delay
      }
    };
    
    fetchBrandsAndVisited();
  }, []);

  return (
    <div className="flex flex-col">
      <Header />
      <div className="h-auto bg-gray-100 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? [...Array(4)].map((_, index) => (
                <Card
                  key={index}
                  className="w-full h-64 bg-gray-300 rounded-lg shadow-lg overflow-hidden"
                >
                  <Skeleton className="w-full h-64" />
                </Card>
              ))
            : brands.map((brand) => (
                <BrandCard
                  key={brand.brandName}
                  brand={brand}
                  isNew={!visitedBrands.includes(brand.brandName)}
                />
              ))}
        </div>
      </div>
      {/* ToastContainer for notifications */}
      <CustomToastContainer />
    </div>
  );
};

export default VehiclesInfo;






