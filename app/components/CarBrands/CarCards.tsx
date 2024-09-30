import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { VehicleModel } from '../../MyCarsData/Types';  // Updated to use the new VehicleModel interface

// Define the props for the Cards component
interface CardsProps {
  filter: VehicleModel[]; // Array of filtered vehicle models
  brandname: string;
}

const Cards: React.FC<CardsProps> = ({ filter, brandname }) => {
  const router = useRouter();

  const handleCardClick = (modelName: string) => {
    // Navigate to the model's specific page when a card is clicked
    router.push(`/carsbrands/${brandname}/page?model=${encodeURIComponent(modelName)}`);
  };

  return (
    <div className="gap-3 grid grid-cols-2 sm:grid-cols-3">
      {filter.length > 0 ? (
        filter.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            className="hover:bg-black hover:text-white"
            onClick={() => handleCardClick(item.modelName)}  // Using `modelName` from the updated interface
          >
            <CardBody className="overflow-visible p-0 bg-slate-200">
              {item.images && item.images[0] ? (
                <Image
                  isZoomed
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.modelName}
                  className="object-cover h-[240px] w-[640px]"
                  src={`data:image/jpeg;base64,${item.images[0]}`}  // Display the first base64 image
                />
              ) : (
                <div className="flex items-center justify-center h-[240px] w-[640px] bg-gray-200">
                  <span className="text-gray-500">Image not available</span>
                </div>
              )}
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.modelName}</b>  {/* Using `modelName` */}
              <p>{item.launchPrice ? `$${item.launchPrice.toLocaleString()}` : "Coming Soon"}</p>  {/* Format launchPrice */}
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

















// import React from "react";
// import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
// import { useRouter } from 'next/navigation';
// import { Models } from '../../MyCarsData/Types';

// // Define the props for the Cards component
// interface CardsProps {
//   filter: Models[]; // Array of car data
//   brandname:string;
//   brandid:string
// }

// const Cards: React.FC<CardsProps> = ({ filter , brandname , brandid}) => {
//   // const [selectedCar, setSelectedCar] = React.useState<string>("");
//   const router = useRouter();

//   const handleCardClick = (model: string) => {
//     console.log(filter)
//     console.log(model)
//     // setSelectedCar(model);
//     router.push(`/carsbrands/${brandname}${brandid}/page?model=${encodeURIComponent(model)}`);
//   };

//   return (
//     <div className="gap-3 grid grid-cols-2 sm:grid-cols-3">
//       {filter.length > 0 ? (
//         filter.map((item: Models, index) => (
//           <Card
//             shadow="sm"
//             key={index}
//             isPressable
//             className="hover:bg-black hover:text-white"
//             onClick={() => handleCardClick(item.model)}
//           >
//             <CardBody className="overflow-visible p-0 bg-slate-200">
//               {item.img && item.img[0] ? (
//                 <Image
//                   isZoomed
//                   shadow="sm"
//                   radius="lg"
//                   width="100%"
//                   alt={item.model}
//                   className="object-cover h-[240px] w-[640px]"
//                   src={item.img[0]}
//                 />
//               ) : (
//                 <div className="flex items-center justify-center h-[240px] w-[640px] bg-gray-200">
//                   <span className="text-gray-500">Image not available</span>
//                 </div>
//               )}
//             </CardBody>
//             <CardFooter className="text-small justify-between">
//               <b>{item.model}</b>
//               <p>{item.startingPrice ? item.startingPrice : "Coming Soon"}</p>
//             </CardFooter>
//           </Card>
//         ))
//       ) : (
//         <div className="text-center py-4">No cars available in this Category.</div>
//       )}
//     </div>
//   );
// }

// export default Cards;

