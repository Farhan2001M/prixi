import React, { useState, useEffect } from "react";
import { Card, CardBody,CardFooter, Image } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { VehicleModel } from '../../MyCarsData/Types';
import { FaHeart } from "react-icons/fa";

interface CardsProps {
  filter: VehicleModel[];
  brandname: string;
}

const Cards: React.FC<CardsProps> = ({ filter, brandname }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 

  useEffect(() => {
    // Fetch user's favorite vehicles on load
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token'); // Retrieve token
      if (!token) {
        console.warn("No token found.");
        return;
      }
      
      try {
        const response = await fetch(`${BASE_URL}/favorites`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include token in headers
          }
        });
        if (!response.ok) {
          if (response.status === 401) {
            setError(null);
            return;
          }
          throw new Error('Failed to fetch favorites');
        }
        const data = await response.json();
        setFavorites(data.favorites ? data.favorites.map((fav: any) => fav.modelName) : []);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError("Could not load favorite vehicles.");
      }
    };
    fetchFavorites();
  }, []);

  const handleFavoriteClick = async (modelName: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Please log in to add favorites.");
      return;
    }

    const isFavorited = favorites.includes(modelName);
    const apiUrl = isFavorited ? `${BASE_URL}/favorites/remove` : `${BASE_URL}/favorites/add`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token in headers
        },
        body: JSON.stringify({
          modelName: modelName,
          brandName: brandname,
        }),
      });
      if (!response.ok) {
        throw new Error(`Failed to ${isFavorited ? 'remove' : 'add'} favorite`);
      }
      if (isFavorited) {
        setFavorites(favorites.filter(fav => fav !== modelName));  // Remove from favorites
      } else {
        setFavorites([...favorites, modelName]);  // Add to favorites
      }
    } catch (err) {
      console.error(`Error ${isFavorited ? 'removing' : 'adding'} favorite:`, err);
      setError(`Could not ${isFavorited ? 'remove' : 'add'} favorite.`);
    }
  };

  const handleCardClick = async ( modelName: string, vehicleType: string, engineType: string, price: number, horsepower: number, torque: number , year: number ) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Please log in to track visits.");
      return;
    }
    // Track the visit in the backend
    try {
      await fetch(`${BASE_URL}/track-model-visit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          brandName: brandname,
          modelName: modelName,
          vehicleType: vehicleType,
          engineType: engineType,
          price: price,
          horsepower: horsepower,
          torque: torque,
          year: year ,
        }),
      });
    } catch (error) {
      console.error("Error tracking visit:", error);
    }
    router.push(`/carsbrands/${brandname}/page?model=${encodeURIComponent(modelName)}`);
  };
  
  return (
    <div className="gap-3 grid grid-cols-2 sm:grid-cols-3">
      {error && <p className="text-red-500">{error}</p>}
      {filter.length > 0 ? (
        filter.map((item, index) => (
          <Card shadow="sm" key={index} isPressable className="hover:bg-black hover:text-white relative" >
            <CardBody
              className="overflow-visible p-0 bg-slate-200"
              onClick={() => handleCardClick(
                item.modelName,                 // Pass model name
                item.vehicleType || "unknown",  // Pass vehicle type
                item.engineType || "unknown",   // Pass engine type
                item.launchPrice || 0,          // Pass price, defaulting to 0 if undefined
                item.horsepower || 0,           // Pass horsepower, defaulting to 0 if undefined
                item.torque || 0 ,              // Pass torque, defaulting to 0 if undefined
                item.year || 2024 ,             // Pass year, defaulting to 2023 if undefined
              )}
            >
              {item.images && item.images[0] ? (
                <Image
                  isZoomed
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.modelName}
                  className="object-cover h-[240px] w-full"
                  src={item.images[0]} 
                />
              ) : (
                <div className="flex items-center justify-center h-[240px] w-full bg-gray-200">
                  <span className="text-gray-500">Image not available</span>
                </div>
              )}
            </CardBody>

            <CardFooter className="text-small justify-between">
              <b>{item.modelName}</b>
              <p>{item.launchPrice ? `$${item.launchPrice.toLocaleString()}` : "Coming Soon"}</p>
              <button
                onClick={(e) => {
                  // e.stopPropagation();  // Prevent click event from bubbling up to the card
                  handleFavoriteClick(item.modelName);
                }}
                className={`absolute top-2 left-2 z-10 p-1 rounded-full transition-colors duration-200
                  ${favorites.includes(item.modelName) ? 'text-red-500 hover:text-gray-500' :'text-gray-500 hover:text-red-500' }
                `}
              >
                <FaHeart className="h-8 w-8" />
              </button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="text-center py-4">No cars available in this Category.</div>
      )}
    </div>
  );
}

export default Cards;
