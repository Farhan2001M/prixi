import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import CommentsPart from './CommentsPart';


import MyComments from './MyComments';


interface CarouselProps {
  brandname:string
  modelData: {
    modelName?: string;
    vehicleType?: string;
    engineType?: string;
    description?: string;
    torque?: number;
    year?: number;
    launchPrice?: number;
    horsepower?: number;
    seatingCapacity?: number;
    variants?: string[];
    colors?: string[];
    images?: string[]; 
  };
}

const Carousel: React.FC<CarouselProps> = ({ modelData , brandname }) => {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);

  // Use images from modelData or fallback to a default image
  const fallbackImage = '../../images/Cars/Tesla/Standard'; 
  const images = modelData.images && modelData.images.length > 0 ? modelData.images.map(img => img.startsWith('data:') ? img : `data:image/jpeg;base64,${img}`) : [fallbackImage];

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <>
      <div className='flex border-y-1 border-black mt-8'>
        
        {/* Info Section */}
        <div className="flex flex-col justify-around w-[50vw] text-black p-4">
          <div className='flex flex-col gap-4'>
            <h1 className="text-4xl font-bold my-2">{modelData.modelName || "Model name not available"}</h1>
            <table className="max-w-full">
              <tbody className='text-lg'>
                <tr>
                  <td className="pr-5 py-2 font-semibold whitespace-nowrap">Vehicle Type</td>
                  <td className="pr-5 py-2">{modelData.vehicleType || "Vehicle type not available"}</td>
                </tr>
                <tr>
                  <td className="pr-5 py-2 font-semibold whitespace-nowrap">Engine Type</td>
                  <td className="pr-5 py-2">{modelData.engineType || "Engine type not available"}</td>
                </tr>
                <tr>
                  <td className="pr-5 py-2 font-semibold whitespace-nowrap">Torque</td>
                  <td className="pr-5 py-2">{modelData.torque || "Torque not available"}</td>
                </tr>
                <tr>
                  <td className="pr-5 py-2 font-semibold whitespace-nowrap">Production Year</td>
                  <td className="pr-5 py-2">{modelData.year || "Year not available"}</td>
                </tr>
                <tr>
                  <td className="pr-5 py-2 font-semibold whitespace-nowrap">Launch Price</td>
                  <td className="pr-5 py-2">{modelData.launchPrice || "Price not available"}</td>
                </tr>
                <tr>
                  <td className="pr-5 py-2 font-semibold whitespace-nowrap">Horsepower</td>
                  <td className="pr-5 py-2">{modelData.horsepower || "Horsepower not available"}</td>
                </tr>
                <tr>
                  <td className="pr-5 py-2 font-semibold whitespace-nowrap">Seating Capacity</td>
                  <td className="pr-5 py-2">{modelData.seatingCapacity || "Seating capacity not available"}</td>
                </tr>
                <tr>
                  <td className="pr-5 py-2 font-semibold whitespace-nowrap">Variants</td>
                  <td className="pr-5 py-2">{modelData.variants && modelData.variants.length > 0 ? modelData.variants.join(', ') : "Variants not available"}</td>
                </tr>
                <tr>
                  <td className="pr-5 py-2 font-semibold whitespace-nowrap">Colors</td>
                  <td className="pr-5 py-2">{modelData.colors && modelData.colors.length > 0 ? modelData.colors.join(', ') : "Colors not available"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex space-x-4">
            <button className="py-2 w-full bg-gray-500 text-white rounded hover:bg-gray-800" onClick={() => router.back()}>
              Go Back
            </button>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative h-[60vh] w-[50vw] my-auto ">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></div>
          ))}
        </div>
      </div>

      <div className='p-5 flex flex-col'>
        <h1 className='text-3xl font-bold my-4'>Expert Review of the vehicle</h1>
        <p className="text-lg text-justify">{modelData.description || "Description not available"}</p>
      </div>

      {/* <CommentsPart /> */}
      

      <MyComments brandName={brandname} modelName={modelData.modelName || "Unknown Model"}  />


    </>
  );
};

export default Carousel;


