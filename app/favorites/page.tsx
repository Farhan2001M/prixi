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

  useEffect(() => {
    const fetchDetailedFavorites = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Please log in to view your favorites.");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/favorites/details", {
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
      const response = await fetch("http://localhost:8000/favorites/remove", {
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
            >
              <CardBody
                className="overflow-visible p-0 bg-slate-200"
                onClick={() => {
                  if (item.model) {
                    handleCardClick(item.brandName, item.model.modelName);
                  }
                }}
              >
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
            className="mt-8 h-80 w-auto" // Adjust the height as needed
          />
        </div>
      )}
    </div>
  );
  

  // return (
  //   <div className="flex flex-col">
  //     <Header />
  //     <div className=" mt-12 mx-24 gap-3 grid grid-cols-2 sm:grid-cols-3">
  //       {error && <p className="text-red-500">{error}</p>}
  //       {favorites.length > 0 ? (
  //         favorites.map((item, index) => (
  //           <Card
  //             shadow="sm"
  //             key={index}
  //             isPressable
  //             className="hover:bg-black hover:text-white relative"
  //           >
  //             <CardBody
  //               className="overflow-visible p-0 bg-slate-200"
  //               onClick={() => {
  //                 if (item.model) {
  //                   handleCardClick(item.brandName, item.model.modelName);
  //                 }
  //               }}
  //             >
  //               {item.model?.images && item.model.images[0] ? (
  //                 <Image
  //                   isZoomed
  //                   shadow="sm"
  //                   radius="lg"
  //                   width="100%"
  //                   alt={item.model.modelName}
  //                   className="object-cover h-[240px] w-full"
  //                   src={`data:image/jpeg;base64,${item.model.images[0]}`}
  //                 />
  //               ) : (
  //                 <div className="flex items-center justify-center h-[240px] w-full bg-gray-200">
  //                   <span className="text-gray-500">Image not available</span>
  //                 </div>
  //               )}
  //             </CardBody>
  //             <CardFooter className="text-small justify-between p-2">
  //               <b>{item.model?.modelName || "Model name not available"}</b>
  //               <p>{item.model?.launchPrice ? `$${item.model.launchPrice.toLocaleString()}` : "Coming Soon"}</p>
  //               <button
  //                 onClick={(e) => {
  //                   e.stopPropagation();
  //                   handleRemoveFavorite(item.brandName, item.model?.modelName || "");
  //                 }}
  //                 className={`absolute top-2 left-2 z-10 p-1 rounded-full transition-colors duration-200 
  //                   text-red-500 hover:text-gray-500
  //                 `}
  //               >
  //                 <FaHeart className="h-8 w-8" />
  //               </button>
  //             </CardFooter>
  //           </Card>
  //         ))
  //       ) : (
  //         <div className="flex flex-col items-center justify-center w-full h-4/5">
  //           <div className="text-3xl">No favorite cars to display.</div>
  //           <img
  //             src="/images/oops.png" 
  //             alt="No favorites"
  //             className="mt-4 h-64 w-auto" // Adjust the height as needed
  //           />
  //         </div>
  //       )}
  //     </div>

  //   </div>
  // );

};

export default FavoriteCards;






// "use client"
// import React, { useState, useEffect } from "react";
// import { Card, CardBody, Image } from "@nextui-org/react";
// import { useRouter } from 'next/navigation';
// import { CiHeart } from "react-icons/ci";

// interface FavoriteVehicle {
//   brandName: string;
//   model?: {
//     modelName: string;
//     launchPrice?: number;
//     images?: string[];
//   };
// }

// const FavoriteCards: React.FC = () => {
//   const [favorites, setFavorites] = useState<FavoriteVehicle[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchDetailedFavorites = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError("Please log in to view your favorites.");
//         return;
//       }

//       try {
//         const response = await fetch("http://localhost:8000/favorites/details", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch detailed favorite vehicles");
//         }

//         const data = await response.json();
//         setFavorites(data.favorites || []);
//       } catch (err) {
//         console.error("Error fetching detailed favorites:", err);
//         setError("Could not load favorite vehicles.");
//       }
//     };

//     fetchDetailedFavorites();
//   }, []);


//   const handleCardClick = (brandName: string, modelName: string) => {
//     router.push(`/carsbrands/${brandName}/page?model=${encodeURIComponent(modelName)}`);
//   };

//   const handleRemoveFavorite = async (brandName: string, modelName: string) => {
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     try {
//       const response = await fetch("http://localhost:8000/favorites/remove", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           brandName: brandName,
//           modelName: modelName,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to remove favorite vehicle");
//       }

//       // Remove the vehicle from local state
//       setFavorites(favorites.filter(fav => !(fav.brandName === brandName && fav.model?.modelName === modelName)));
//     } catch (err) {
//       console.error("Error removing favorite:", err);
//       setError("Could not remove vehicle from favorites.");
//     }
//   };

//   return (
//     <div className="gap-3 grid grid-cols-2 sm:grid-cols-3">
//       {error && <p className="text-red-500">{error}</p>}
//       {favorites.length > 0 ? (
//         favorites.map((item, index) => (
//           <Card
//             shadow="sm"
//             key={index}
//             isPressable
//             className="hover:bg-black hover:text-white relative"
//           >
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();  // Prevent click event from bubbling up to the card
//                 handleRemoveFavorite(item.brandName, item.model?.modelName || "");
//               }}
//               className={`absolute top-2 left-2 z-10 p-1 rounded-full transition-colors duration-200 
//                 ${item.model ? 'text-red-500 hover:text-gray-500' : 'text-gray-500 hover:text-red-500'}
//               `}
//             >
//               <CiHeart className="h-6 w-6" />
//             </button>
//             <CardBody
//               className="overflow-visible p-0 bg-slate-200"
//               onClick={() => {
//                 if (item.model) {
//                   handleCardClick(item.brandName, item.model.modelName);
//                 }
//               }}
//             >
//               {item.model?.images && item.model.images[0] ? (
//                 <Image
//                   isZoomed
//                   shadow="sm"
//                   radius="lg"
//                   width="100%"
//                   alt={item.model.modelName}
//                   className="object-cover h-[240px] w-full"
//                   src={`data:image/jpeg;base64,${item.model.images[0]}`}
//                 />
//               ) : (
//                 <div className="flex items-center justify-center h-[240px] w-full bg-gray-200">
//                   <span className="text-gray-500">Image not available</span>
//                 </div>
//               )}
//             </CardBody>
//             <div className="text-small justify-between p-2">
//               <b>{item.model?.modelName || "Model name not available"}</b>
//               <p>{item.model?.launchPrice ? `$${item.model.launchPrice.toLocaleString()}` : "Coming Soon"}</p>
//             </div>
//           </Card>
//         ))
//       ) : (
//         <div className="text-center py-4">No favorite cars found.</div>
//       )}
//     </div>
//   );
// };

// export default FavoriteCards;
