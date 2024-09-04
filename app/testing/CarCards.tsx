import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { Models } from '../carsbrands/Tesla53/ModelsData';

// Define the props for the Cards component
interface CardsProps {
  data: Models[]; // Array of car data
}

const Cards: React.FC<CardsProps> = ({ data }) => {
  const [selectedCar, setSelectedCar] = React.useState<string>("");
  const router = useRouter();

  const handleCardClick = (model: string) => {
    setSelectedCar(model);
    router.push(`/carsbrands/Tesla53/page?model=${encodeURIComponent(model)}`);
  };

  return (
    <div className="gap-3 grid grid-cols-2 sm:grid-cols-3">
      {data.length > 0 ? (
        data.map((item: Models, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            className="hover:bg-black hover:text-white"
            onClick={() => handleCardClick(item.model)}
          >
            <CardBody className="overflow-visible p-0 bg-slate-200">
              {item.img && item.img[0] ? (
                <Image
                  isZoomed
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.model}
                  className="object-cover h-[240px] w-[640px]"
                  src={item.img[0]}
                />
              ) : (
                <div className="flex items-center justify-center h-[240px] w-[640px] bg-gray-200">
                  <span className="text-gray-500">Image not available</span>
                </div>
              )}
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.model}</b>
              <p>{item.startingPrice ? item.startingPrice : "Coming Soon"}</p>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="text-center py-4">No cars available in this price range.</div>
      )}
    </div>
  );
}

export default Cards;





// import React, { useState } from "react";
// import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
// import { useRouter } from 'next/navigation';

// import { data } from '../carsbrands/Tesla53/ModelsData';

// export default function App() {

//   const [selectedCar, setSelectedCar] = useState<string>("");

//   const router = useRouter();

//   const handleCardClick = (model: string) => {
//     setSelectedCar(model);
//     router.push(`/carsbrands/Tesla53/page?model=${encodeURIComponent(model)}`);
//   };

//   return (
//     <div className="gap-3 grid grid-cols-2 sm:grid-cols-3">
//       {data.map((item, index) => (
//         <Card
//           shadow="sm"
//           key={index}
//           isPressable
//           className="hover:bg-black hover:text-white"
//           onPress={() => console.log("I'm pressed")}
//           onClick={() => handleCardClick(item.model)}
//         >
//           <CardBody className="overflow-visible p-0 bg-slate-200">
//             {item.img && item.img[0] ? (
//               <Image
//                 isZoomed
//                 shadow="sm"
//                 radius="lg"
//                 width="100%"
//                 alt={item.model}
//                 className="object-cover h-[240px] w-[640px]"
//                 src={item.img[0]}
//               />
//             ) : (
//               <div className="flex items-center justify-center h-[240px] w-[640px] bg-gray-200">
//                 <span className="text-gray-500">Image not available</span>
//               </div>
//             )}
//           </CardBody>
//           <CardFooter className="text-small justify-between">
//             <b>{item.model}</b>
//             <p>{item.startingPrice ? item.startingPrice : "Coming Soon"}</p>
//           </CardFooter>
//         </Card>
//       ))}
//     </div>
//   );
// }















// import React , { useState }  from "react";
// import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
// import { useRouter  } from 'next/navigation';

// import {data} from '../carsbrands/Tesla53/ModelsData'

// export default function App() {

//   const [selectedCar, setSelectedCar] = useState("");

//   const router = useRouter();

//   const handleCardClick = (model:any) => {
//     setSelectedCar(model);
//     // router.push(`/carsbrands/Tesla53/${model}`);
//     router.push(`/carsbrands/Tesla53/page?model=${encodeURIComponent(model)}`);
//   };


//   return (
//     <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 ">
//       {data.map((item, index) => (
//         <Card shadow="sm" key={index} isPressable className="hover:bg-black hover:text-white" onPress={() => console.log("I'm pressed")} onClick={() => handleCardClick(item.model)}>  
//           <CardBody className="overflow-visible p-0  bg-slate-200">
//             <Image
//               isZoomed
//               shadow="sm"
//               radius="lg"
//               width="100%"
//               alt={item.model}
//               className=" object-cover h-[240px] w-[640px]"
//               src={item.img[0]}
//             />
//           </CardBody>
//           <CardFooter className="text-small justify-between">
//             <b>{item.model}</b>
//             <p >{item.startingPrice?  item.startingPrice: "Coming Soon" }</p>
//           </CardFooter>
//         </Card>
//       ))}
//     </div>
//   );
// }

