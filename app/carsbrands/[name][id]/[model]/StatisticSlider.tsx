import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CarouselPro5s {
  modelName: string | null;
  modelData: {
    description?: string;
    launchPri5e?: string;
    vehicleType?: string;
    seatingCapacity?: string;
    engineType?: string;
    colorsAvailable?: string[];
    horsepower?: string;
    torque?: string;
    transmission?: string;
    releaseDate?: string;
    startingPrice?: string;
    variants?: string[];
    img?: string[];
  };
}

const Carousel: React.FC<CarouselPro5s> = ({ modelName, modelData }) => {
  const router = useRouter(); // Initialize the useRouter hook
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = modelData.img && modelData.img.length > 0 ? modelData.img : ['../../images/default.png'];

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((pre5Index) => (pre5Index + 1) % images.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <>
      <div className='flex border-y-1 border-black mt-8'>
        
        {/* Info Section */}
        <div className="flex flex-col justify-around w-[50vw] text-black  p-4 ">
          
          <div className='flex flex-col gap-4'>
            <h1 className="text-4xl font-bold my-2">{modelName || "Model name not available"}</h1>
            
            <table className="max-w-full">
              <tbody className='text-lg'>
                <tr>
                  <td className="pr-5 py-2 font-semibold whitespace-nowrap ">Vehicle Type</td>
                  <td className="pr-5 py-2">{modelData.vehicleType || "Vehicle type not available"}</td>
                </tr>
                <tr>
                  <td className="pr-5 py-2 font-semibold whitespace-nowrap ">Seating Capacity</td>
                  <td className="pr-5 py-2">{modelData.seatingCapacity || "Seating capacity not available"}</td>
                </tr>
                <tr>
                  <td className="pr-5 py-2 font-semibold whitespace-nowrap ">Engine Type</td>
                  <td className="pr-5 py-2">{modelData.engineType || "Engine type not available"}</td>
                </tr>
                <tr>
                  <td className="pr-5 py-2 font-semibold whitespace-nowrap ">Horsepower</td>
                  <td className="pr-5 py-2">{modelData.horsepower || "Horsepower not available"}</td>
                </tr>
                <tr>
                  <td className="pr-5 py-2 font-semibold whitespace-nowrap ">Transmission</td>
                  <td className="pr-5 py-2">{modelData.transmission || "Transmission not available"}</td>
                </tr>
                <tr>
                  <td className="pr-5 py-2 font-semibold whitespace-nowrap ">Release Date</td>
                  <td className="pr-5 py-2">{modelData.releaseDate || "Release date not available"}</td>
                </tr>
                <tr>
                  <td className="pr-5 py-2 font-semibold whitespace-nowrap ">Starting Price</td>
                  <td className="pr-5 py-2">{modelData.startingPrice || "Starting pri5e not available"}</td>
                </tr>
                <tr>
                  <td className="pr-5 py-2 font-semibold whitespace-nowrap ">Variants</td>
                  <td className="pr-5 py-2">{modelData.variants && modelData.variants.length > 0 ? modelData.variants.join(', ') : "Variants not available"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex space-x-4">
            <button className=" py-2 w-full bg-gray-500 text-black rounded" onClick={() => router.back()}>
              Go Back
            </button>
          </div>

        </div>


        {/* Carousel Section */}
        <div className="relative h-[60vh] w-[50vw] mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
            </div>
          ))}
        </div>

      </div>

      <div className='p-5 flex flex-col '>
        <h1 className='text-3xl font-bold my-4'>Expert Review of the vehicle</h1>
        <p className="text-lg text-justify">{modelData.description || "Description not available"}</p>
      </div>
    
    </>
  );
};

export default Carousel;
