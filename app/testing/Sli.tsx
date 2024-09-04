import React, { useState, useEffect } from 'react';

const images = [
  '../../images/Cars/Tesla/teop.png',
  '../../images/Cars/Tesla/toto.png',
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

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
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl font-bold">Mercedes-Benz E-Class</h1>
            <p className="text-lg">The Mercedes-Benz E-Class is a range of executive cars...</p>
            <div className="mt-4 flex space-x-4">
              <button className="px-4 py-2 bg-white text-black rounded">Specifications</button>
              <button className="px-4 py-2 bg-white text-black rounded">Leasing</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
