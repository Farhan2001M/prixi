

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CarouselProps {
  modelName:  string | null;
  modelData: {
    description?: string;
    launchPrice?: string;
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

const Carousel: React.FC<CarouselProps> = ({ modelName, modelData }) => {

  const router = useRouter(); // Initialize the useRouter hook
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = modelData.img && modelData.img.length > 0 ? modelData.img : ['../../images/default.png'];

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <div className="relative h-screen">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>

          <div className="absolute inset-0 flex flex-col justify-center items-start text-white ml-8">

            <h1 className="text-4xl font-bold">{modelName || "Model name not available"}</h1>
            <p className="text-lg">{modelData.description || "Description not available"}</p>
            <p className="text-lg">{modelData.vehicleType || "Vehicle type not available"}</p>
            <p className="text-lg">{modelData.seatingCapacity || "Seating capacity not available"}</p>
            <p className="text-lg">{modelData.engineType || "Engine type not available"}</p>
            <p className="text-lg">{modelData.horsepower || "Horsepower not available"}</p>
            <p className="text-lg">{modelData.torque || "Torque not available"}</p>
            <p className="text-lg">{modelData.transmission || "Transmission not available"}</p>
            <p className="text-lg">{modelData.releaseDate || "Release date not available"}</p>
            <p className="text-lg">{modelData.startingPrice || "Starting price not available"}</p>
            <p className="text-lg">{modelData.variants && modelData.variants.length > 0 ? modelData.variants.join(', ') : "Variants not available"}</p>

            <div className="mt-4 flex space-x-4">
              
              <button className="px-4 py-2 bg-white text-black rounded" onClick={() => router.back()} >
                Go Back  
              </button>

            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default Carousel;

