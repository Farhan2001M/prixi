"use client"

import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { FaHeart } from "react-icons/fa";
import Header from '../components/Header';

interface FavoriteVehicle {
  brandName: string;
  model?: {
    modelName: string;
    launchPrice?: number;
    images?: string[];
  };
}

const FavoriteCards: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteVehicle[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 

  useEffect(() => {
    const fetchDetailedFavorites = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Please log in to view your favorites.");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/favorites/details`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch detailed favorite vehicles");
        }
        const data = await response.json();
        console.log(data)
        setFavorites(data.favorites || []);
      } catch (err) {
        console.error("Error fetching detailed favorites:", err);
        setError("Could not load favorite vehicles.");
      }
    };

    fetchDetailedFavorites();
  }, []);

  const handleCardClick = (brandName: string, modelName: string) => {
    router.push(`/carsbrands/${brandName}/page?model=${encodeURIComponent(modelName)}`);
  };

  const handleRemoveFavorite = async (brandName: string, modelName: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`${BASE_URL}/favorites/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          brandName: brandName,
          modelName: modelName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove favorite vehicle");
      }
      
      setFavorites(favorites.filter(fav => !(fav.brandName === brandName && fav.model?.modelName === modelName)));
    } catch (err) {
      console.error("Error removing favorite:", err);
      setError("Could not remove vehicle from favorites.");
    }
  };

  return (
    <div className="flex flex-col">
      <Header />
      {favorites.length > 0 ? (
        <div className="mt-12 mx-24 gap-3 grid grid-cols-2 sm:grid-cols-3">
          {error && <p className="text-red-500">{error}</p>}
          {favorites.map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              className="hover:bg-black hover:text-white relative"
              onClick={() => {
                if (item.model) {
                  handleCardClick(item.brandName, item.model.modelName);
                }
              }}
            >
              <CardBody className="overflow-visible p-0 bg-slate-200" >
                {item.model?.images && item.model.images[0] ? (
                  <Image
                    isZoomed
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={item.model.modelName}
                    className="object-cover h-[240px] w-full"
                    src={`data:image/jpeg;base64,${item.model.images[0]}`}
                  />
                ) : (
                  <div className="flex items-center justify-center h-[240px] w-full bg-gray-200">
                    <span className="text-gray-500">Image not available</span>
                  </div>
                )}
              </CardBody>
              <CardFooter className="text-small justify-between p-2">
                <b>{item.model?.modelName || "Model name not available"}</b>
                <p>{item.model?.launchPrice ? `$${item.model.launchPrice.toLocaleString()}` : "Coming Soon"}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFavorite(item.brandName, item.model?.modelName || "");
                  }}
                  className={`absolute top-2 left-2 z-10 p-1 rounded-full transition-colors duration-200 
                    text-red-500 hover:text-gray-500
                  `}
                >
                  <FaHeart className="h-8 w-8" />
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full mt-40">
          <div className="text-5xl">No favorite cars to display.</div>
          <img
            src="/images/oops.png" 
            alt="No favorites"
            className="mt-8 h-80 w-auto"
          />
        </div>
      )}
    </div>
  );
};

export default FavoriteCards;

