"use client";

import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image, Skeleton } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";

interface TrendingVehicle {
  brandName: string;
  modelName: string;
  image?: string;
  launchPrice?: number;
}

const TrendingVehicles: React.FC = () => {
  const [trendingVehicles, setTrendingVehicles] = useState<TrendingVehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [loaded, setLoaded] = useState<boolean>(false); // Track if data is loaded
  const router = useRouter();

  useEffect(() => {
    const fetchTrendingVehicles = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        setLoaded(true);
        return;
      }

      try {
        const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 
        const response = await fetch(`${BASE_URL}/trending-vehicles`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setLoading(false);
          setLoaded(true);
          return;
        }

        const data = await response.json();
        setTrendingVehicles(data.trendingVehicles || []); // Assuming the response structure
        setLoaded(true);
      } catch (err) {
        console.error("Error fetching trending vehicles:", err);
        setLoading(false);
        setLoaded(true);
      }
    };

    fetchTrendingVehicles();
  }, []);

  useEffect(() => {
    if (loading) {
      setLoading(false); 
      return ; 
    }
  }, [loading]);

  const handleCardClick = (brandName: string, modelName: string) => {
    router.push(`/carsbrands/${brandName}/page?model=${encodeURIComponent(modelName)}`);
  };

  // Determine margin class based on whether recommendations exist
  const marginClass = trendingVehicles.length === 0 ? "m-6" : "mx-12 my-6";

  return (
    <div className={`${marginClass} mt-2`}>
      {/* If no trending vehicles, show the "No trending vehicles" message */}
      {!loading && trendingVehicles.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full sm:mt-3 md:mt-7 lg:mt-12">
          <div className="text-md sm:text-2xl md:text-3xl lg:text-4xl text-center">No trending vehicles to display.</div>
          <img
            src="/images/oops.png"
            alt="No trending vehicles"
            className="mt-8 h-48 sm:h-64 md:h-80 w-auto"
          />
        </div>
      )}

      {/* Only apply the grid layout when there are trending vehicles */}
      {loading ? (
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {/* Display Skeleton Cards while loading */}
          {[...Array(3)].map((_, index) => (
            <Card
              key={index}
              shadow="sm"
              isPressable
              className="w-full hover:bg-black hover:text-white relative"
            >
              <CardBody className="overflow-visible p-0 bg-slate-200">
                <Skeleton className="rounded-lg">
                  <div className="h-48 rounded-lg bg-default-300"></div> {/* Increased height for body */}
                </Skeleton>
              </CardBody>
              <CardFooter className="text-small justify-between p-2">
                <div className="space-y-3">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {trendingVehicles.map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              className="w-full hover:bg-black hover:text-white relative"
            >
              <CardBody
                className="overflow-visible p-0 bg-slate-200"
                onClick={() => handleCardClick(item.brandName, item.modelName)}
              >
                {item.image ? (
                  <Image
                    isZoomed
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={item.modelName}
                    className="object-cover h-[240px] w-full"
                    src={item.image}  // Assumes item.image is a valid Base64 string
                  />
                ) : (
                  <div className="flex items-center justify-center h-[240px] w-full bg-gray-200">
                    <span className="text-gray-500">Image not available</span>
                  </div>
                )}
              </CardBody>
              <CardFooter className="text-small justify-between p-2">
                <b>{item.brandName || "Brand name not available"} {item.modelName || "Model name not available"}</b>
                <p>{item.launchPrice ? `$${item.launchPrice.toLocaleString()}` : "Coming Soon"}</p>
                <button
                  onClick={(e) => e.stopPropagation()} // Prevent card click
                  className={`absolute top-2 left-2 z-10 p-1 rounded-full transition-colors duration-200 text-red-500 hover:text-gray-500`}
                >
                  <FaHeart className="h-8 w-8" />
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingVehicles;
